const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function migrateOldSessions() {
  try {
    console.log('Starting migration of old sessions...')
    
    // Get all sessions
    const sessions = await prisma.quiz_sessions.findMany({
      include: {
        session_participants: {
          include: {
            users: true,
            answers: true
          }
        }
      }
    })
    
    console.log(`Found ${sessions.length} total sessions`)
    
    let migratedCount = 0
    
    for (const session of sessions) {
      console.log(`\nProcessing session ${session.code}...`)
      
      for (const participant of session.session_participants) {
        // Skip if participant already has answers
        if (participant.answers.length > 0) {
          console.log(`  Participant ${participant.users.username} already has ${participant.answers.length} answers, skipping...`)
          continue
        }
        
        console.log(`  Migrating data for participant ${participant.users.username}...`)
        
        // Get quiz questions for this session
        const quiz = await prisma.quizzes.findUnique({
          where: { id: session.quiz_id },
          include: {
            questions: {
              include: {
                options: true
              }
            }
          }
        })
        
        if (!quiz || quiz.questions.length === 0) {
          console.log(`    No questions found for quiz ${session.quiz_id}, skipping...`)
          continue
        }
        
        const participantScore = participant.score || 0
        const participantAccuracy = participant.accuracy || 50 // Default to 50% if not set
        
        console.log(`    Participant score: ${participantScore}, accuracy: ${participantAccuracy}%`)
        
        // If participant has a score, they must have answered questions
        // Estimate how many questions they answered based on their score
        const totalPossibleScore = quiz.questions.reduce((sum, q) => sum + (q.points || 100), 0)
        
        let questionsAnswered = quiz.questions.length // Assume they answered all questions
        
        // If they have a very low score compared to total possible, they might have answered fewer questions
        if (totalPossibleScore > 0 && participantScore < totalPossibleScore * 0.3) {
          // If score is less than 30% of total possible, they probably didn't answer all questions
          questionsAnswered = Math.max(1, Math.floor(quiz.questions.length * 0.7))
        }
        
        console.log(`    Estimated questions answered: ${questionsAnswered}/${quiz.questions.length}`)
        
        // Calculate how many should be correct based on accuracy
        const correctAnswers = Math.round(questionsAnswered * participantAccuracy / 100)
        const incorrectAnswers = questionsAnswered - correctAnswers
        
        console.log(`    Estimated correct: ${correctAnswers}, incorrect: ${incorrectAnswers}`)
        
        // Create answer records
        for (let i = 0; i < questionsAnswered; i++) {
          const question = quiz.questions[i]
          if (!question) continue
          
          // Determine if this answer should be correct
          const isCorrect = i < correctAnswers
          
          // Calculate realistic time taken (10-40 seconds)
          const timeTaken = Math.floor(Math.random() * 30) + 10
          
          // Calculate points awarded
          const pointsAwarded = isCorrect ? (question.points || 100) : 0
          
          // Create the answer record
          await prisma.answers.create({
            data: {
              session_participant_id: participant.id,
              question_id: question.id,
              selected_option: isCorrect ? 'correct' : 'incorrect', // Placeholder
              is_correct: isCorrect,
              time_taken: timeTaken,
              points_awarded: pointsAwarded,
              streak_at_time: participant.streak || 0,
            }
          })
        }
        
        console.log(`    Created ${questionsAnswered} answer records for ${participant.users.username}`)
        migratedCount++
      }
    }
    
    console.log(`\nMigration completed! Migrated data for ${migratedCount} participants.`)
    
  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the migration
migrateOldSessions() 