console.log('--- SEED SCRIPT STARTED ---')

// Use CommonJS require syntax for macOS compatibility
const { PrismaClient } = require('../generated/prisma')
const bcrypt = require('bcryptjs')
require('dotenv/config')

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })

async function main() {
  try {
    // Remove all data for a clean slate
    console.log('Cleaning up existing data...')
    await prisma.answers.deleteMany({})
    await prisma.session_participants.deleteMany({})
    await prisma.quiz_sessions.deleteMany({})
    await prisma.options.deleteMany({})
    await prisma.questions.deleteMany({})
    await prisma.participant_history.deleteMany({})
    await prisma.quizzes.deleteMany({})
    await prisma.users.deleteMany({})
    console.log('All data deleted.')

    // Create users with different roles
    const users = [
      { username: 'Angshuman', email: 'angshuman@example.com', role: 'host' },
      { username: 'Anshuman', email: 'anshuman@example.com', role: 'host' },
      { username: 'Rayyan', email: 'rayyan@example.com', role: 'host' },
      { username: 'Sarah', email: 'sarah@example.com', role: 'participant' },
      { username: 'Mike', email: 'mike@example.com', role: 'participant' },
    ]

    const createdUsers = []
    for (const user of users) {
      try {
        const hashedPassword = await bcrypt.hash('password123', 10)
        const created = await prisma.users.create({
          data: {
            username: user.username,
            password: hashedPassword,
            email: user.email,
            role: user.role,
          },
        })
        console.log(`Created user: ${created.username} (${created.role})`)
        createdUsers.push(created)
      } catch (err) {
        console.error(`Error creating user ${user.username}:`, err)
      }
    }

    // Get host users
    const hostUsers = createdUsers.filter(u => u.role === 'host')
    const participantUsers = createdUsers.filter(u => u.role === 'participant')

    // Quiz data for each host user
    const quizTemplates = [
      {
        title: 'General Knowledge Quiz',
        description: 'Test your knowledge across various subjects',
        questions: [
          {
            question: 'What is the capital of France?',
            correct_answer: 'Paris',
            category: 'Geography',
            options: ['London', 'Berlin', 'Paris', 'Madrid']
          },
          {
            question: 'Which planet is known as the Red Planet?',
            correct_answer: 'Mars',
            category: 'Science',
            options: ['Mars', 'Venus', 'Jupiter', 'Saturn']
          },
          {
            question: 'Who painted the Mona Lisa?',
            correct_answer: 'Leonardo da Vinci',
            category: 'Art',
            options: ['Leonardo da Vinci', 'Michelangelo', 'Picasso', 'Van Gogh']
          },
          {
            question: 'What is the largest ocean on Earth?',
            correct_answer: 'Pacific Ocean',
            category: 'Geography',
            options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean']
          },
          {
            question: 'Which element has the chemical symbol "O"?',
            correct_answer: 'Oxygen',
            category: 'Science',
            options: ['Osmium', 'Oxygen', 'Oganesson', 'Osmium']
          }
        ]
      },
      {
        title: 'Computer Science Fundamentals',
        description: 'Test your knowledge of programming and computer science',
        questions: [
          {
            question: 'What does HTML stand for?',
            correct_answer: 'HyperText Markup Language',
            category: 'Programming',
            options: ['High Tech Modern Language', 'HyperText Markup Language', 'Home Tool Markup Language', 'Hyperlink and Text Markup Language']
          },
          {
            question: 'Which programming language is known as the "language of the web"?',
            correct_answer: 'JavaScript',
            category: 'Programming',
            options: ['Python', 'Java', 'JavaScript', 'C++']
          },
          {
            question: 'What is the primary function of CSS?',
            correct_answer: 'Styling and layout',
            category: 'Programming',
            options: ['Database management', 'Styling and layout', 'Server-side logic', 'Security']
          },
          {
            question: 'Which data structure operates on LIFO principle?',
            correct_answer: 'Stack',
            category: 'Data Structures',
            options: ['Queue', 'Stack', 'Tree', 'Graph']
          },
          {
            question: 'What does API stand for?',
            correct_answer: 'Application Programming Interface',
            category: 'Programming',
            options: ['Application Programming Interface', 'Advanced Programming Interface', 'Automated Programming Interface', 'Application Process Integration']
          }
        ]
      },
      {
        title: 'History Quiz',
        description: 'Journey through time with these historical questions',
        questions: [
          {
            question: 'In which year did World War II end?',
            correct_answer: '1945',
            category: 'History',
            options: ['1943', '1944', '1945', '1946']
          },
          {
            question: 'Who was the first President of the United States?',
            correct_answer: 'George Washington',
            category: 'History',
            options: ['Thomas Jefferson', 'John Adams', 'George Washington', 'Benjamin Franklin']
          },
          {
            question: 'Which ancient wonder was located in Alexandria?',
            correct_answer: 'Lighthouse of Alexandria',
            category: 'History',
            options: ['Hanging Gardens', 'Lighthouse of Alexandria', 'Colossus of Rhodes', 'Temple of Artemis']
          },
          {
            question: 'What year did Christopher Columbus reach the Americas?',
            correct_answer: '1492',
            category: 'History',
            options: ['1490', '1491', '1492', '1493']
          },
          {
            question: 'Which empire was ruled by Emperor Augustus?',
            correct_answer: 'Roman Empire',
            category: 'History',
            options: ['Greek Empire', 'Roman Empire', 'Persian Empire', 'Egyptian Empire']
          }
        ]
      }
    ]

    // Create quizzes for each host user
    for (let i = 0; i < hostUsers.length; i++) {
      const hostUser = hostUsers[i]
      
      // Give each host user 1-2 quizzes
      const quizzesForUser = quizTemplates.slice(i, i + 1)
      
      for (const quizTemplate of quizzesForUser) {
        try {
          const quiz = await prisma.quizzes.create({
            data: {
              user_id: hostUser.id,
              title: quizTemplate.title,
              description: quizTemplate.description,
              negative_marking: false,
              team_mode: false,
              status: 'active',
              questions: {
                create: quizTemplate.questions.map((q, qIndex) => ({
                  type: 'multiple_choice',
                  question: q.question,
                  correct_answer: q.correct_answer,
                  time_limit: 30,
                  points: 100,
                  category: q.category,
                  options: {
                    create: q.options.map((option, optIndex) => ({
                      option_text: option,
                      option_index: optIndex
                    }))
                  }
                }))
              }
            }
          })
          console.log(`Created quiz "${quiz.title}" for user ${hostUser.username}`)
        } catch (err) {
          console.error(`Error creating quiz for ${hostUser.username}:`, err)
        }
      }
    }

    // Create some quiz sessions for testing
    const allQuizzes = await prisma.quizzes.findMany()
    
    for (const quiz of allQuizzes.slice(0, 2)) { // Create sessions for first 2 quizzes
      try {
        const session = await prisma.quiz_sessions.create({
          data: {
            quiz_id: quiz.id,
            host_id: quiz.user_id,
            code: Math.random().toString(36).substring(2, 8).toUpperCase(),
            status: 'waiting',
            started_at: null,
            ended_at: null,
          }
        })

        // Add some participants to the session
        for (const participant of participantUsers.slice(0, 2)) {
          await prisma.session_participants.create({
            data: {
              session_id: session.id,
              user_id: participant.id,
              join_code: session.code,
              score: 0,
              streak: 0,
              accuracy: 0,
            }
          })

          // Create participant history
          await prisma.participant_history.create({
            data: {
              user_id: participant.id,
              quiz_id: quiz.id,
              total_sessions: 1,
              total_score: 0,
              total_correct: 0,
              total_questions: 0,
              best_streak: 0,
              last_played: new Date(),
            }
          })
        }

        console.log(`Created session for quiz "${quiz.title}" with code: ${session.code}`)
      } catch (err) {
        console.error(`Error creating session for quiz ${quiz.id}:`, err)
      }
    }

    console.log('Seed completed successfully!')
    console.log('\n--- LOGIN CREDENTIALS ---')
    console.log('Host Users:')
    hostUsers.forEach(user => {
      console.log(`  Username: ${user.username}, Password: password123`)
    })
    console.log('\nParticipant Users:')
    participantUsers.forEach(user => {
      console.log(`  Username: ${user.username}, Password: password123`)
    })
    console.log('\nEach host user now has their own independent dashboard with multiple quizzes!')
  } catch (error) {
    console.error('Error during seeding:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
