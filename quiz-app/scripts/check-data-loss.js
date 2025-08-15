const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

async function checkDataLoss() {
  console.log('🔍 Checking for data loss in quizzes...\n')

  try {
    // Get all quizzes with their questions and answers
    const quizzes = await prisma.quizzes.findMany({
      include: {
        questions: {
          include: {
            answers: {
              include: {
                session_participants: {
                  include: {
                    quiz_sessions: true,
                    users: true
                  }
                }
              }
            }
          }
        },
        quiz_sessions: {
          include: {
            session_participants: {
              include: {
                answers: true
              }
            }
          }
        }
      }
    })

    console.log(`📊 Found ${quizzes.length} quizzes\n`)

    for (const quiz of quizzes) {
      console.log(`\n📝 Quiz: ${quiz.title} (ID: ${quiz.id})`)
      console.log(`   Status: ${quiz.status}`)
      console.log(`   Questions: ${quiz.questions.length}`)
      console.log(`   Sessions: ${quiz.quiz_sessions.length}`)
      
      // Count total answers in sessions
      let totalAnswersInSessions = 0
      quiz.quiz_sessions.forEach(session => {
        session.session_participants.forEach(participant => {
          totalAnswersInSessions += participant.answers.length
        })
      })
      
      // Count answers linked to questions
      let totalAnswersLinked = 0
      quiz.questions.forEach(question => {
        totalAnswersLinked += question.answers.length
      })
      
      console.log(`   Total answers in sessions: ${totalAnswersInSessions}`)
      console.log(`   Answers linked to questions: ${totalAnswersLinked}`)
      
      if (totalAnswersInSessions > totalAnswersLinked) {
        console.log(`   ⚠️  DATA LOSS DETECTED: ${totalAnswersInSessions - totalAnswersLinked} answers are orphaned!`)
        
        // Show details of orphaned answers
        const orphanedAnswers = []
        quiz.quiz_sessions.forEach(session => {
          session.session_participants.forEach(participant => {
            participant.answers.forEach(answer => {
              const isLinked = quiz.questions.some(q => 
                q.answers.some(a => a.id === answer.id)
              )
              if (!isLinked) {
                orphanedAnswers.push({
                  answerId: answer.id,
                  sessionCode: session.code,
                  participantId: participant.id,
                  questionId: answer.question_id
                })
              }
            })
          })
        })
        
        console.log(`   Orphaned answers:`, orphanedAnswers)
      } else if (totalAnswersInSessions === 0 && quiz.quiz_sessions.length > 0) {
        console.log(`   ⚠️  POTENTIAL DATA LOSS: Sessions exist but no answers found`)
      } else {
        console.log(`   ✅ Data integrity looks good`)
      }
    }

  } catch (error) {
    console.error('Error checking data loss:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the check
checkDataLoss() 