const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

async function analyzeQuizData() {
  console.log('🔍 Analyzing quiz data for potential data loss...\n')

  try {
    // Get all quizzes
    const quizzes = await prisma.quizzes.findMany({
      include: {
        questions: {
          include: {
            options: true,
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
                users: true,
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
      
      // Check for questions with no answers
      const questionsWithNoAnswers = quiz.questions.filter(q => q.answers.length === 0)
      const questionsWithAnswers = quiz.questions.filter(q => q.answers.length > 0)
      
      console.log(`   Questions with answers: ${questionsWithAnswers.length}`)
      console.log(`   Questions without answers: ${questionsWithNoAnswers.length}`)
      
      // Check for sessions with no participants
      const sessionsWithParticipants = quiz.quiz_sessions.filter(s => s.session_participants.length > 0)
      const sessionsWithoutParticipants = quiz.quiz_sessions.filter(s => s.session_participants.length === 0)
      
      console.log(`   Sessions with participants: ${sessionsWithParticipants.length}`)
      console.log(`   Sessions without participants: ${sessionsWithoutParticipants.length}`)
      
      // Check for orphaned answers (answers without questions)
      const allAnswerIds = new Set()
      quiz.questions.forEach(q => {
        q.answers.forEach(a => allAnswerIds.add(a.id))
      })
      
      // Find answers that might be orphaned
      const totalAnswersInSessions = quiz.quiz_sessions.reduce((sum, session) => {
        return sum + session.session_participants.reduce((sessionSum, participant) => {
          return sessionSum + participant.answers.length
        }, 0)
      }, 0)
      
      console.log(`   Total answers in sessions: ${totalAnswersInSessions}`)
      console.log(`   Answers linked to questions: ${allAnswerIds.size}`)
      
      if (totalAnswersInSessions > allAnswerIds.size) {
        console.log(`   ⚠️  Potential orphaned answers: ${totalAnswersInSessions - allAnswerIds.size}`)
      }
      
      // Check for recent activity
      const recentSessions = quiz.quiz_sessions.filter(s => {
        const sessionDate = new Date(s.started_at || s.created_at)
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        return sessionDate > oneWeekAgo
      })
      
      if (recentSessions.length > 0) {
        console.log(`   Recent sessions (last 7 days): ${recentSessions.length}`)
      }
    }

    // Check for orphaned answers across all quizzes
    console.log('\n🔍 Checking for orphaned answers...')
    const orphanedAnswers = await prisma.answers.findMany({
      where: {
        question_id: null
      },
      include: {
        session_participants: {
          include: {
            quiz_sessions: true,
            users: true
          }
        }
      }
    })

    if (orphanedAnswers.length > 0) {
      console.log(`⚠️  Found ${orphanedAnswers.length} orphaned answers!`)
      console.log('These answers exist but their questions have been deleted.')
      
      // Group by session
      const orphanedBySession = {}
      orphanedAnswers.forEach(answer => {
        const sessionCode = answer.session_participants?.quiz_sessions?.code || 'unknown'
        if (!orphanedBySession[sessionCode]) {
          orphanedBySession[sessionCode] = []
        }
        orphanedBySession[sessionCode].push(answer)
      })
      
      console.log('\nOrphaned answers by session:')
      Object.entries(orphanedBySession).forEach(([sessionCode, answers]) => {
        console.log(`  Session ${sessionCode}: ${answers.length} answers`)
      })
    } else {
      console.log('✅ No orphaned answers found')
    }

  } catch (error) {
    console.error('Error analyzing quiz data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

async function restoreOrphanedAnswers() {
  console.log('\n🔄 Attempting to restore orphaned answers...\n')

  try {
    // Find orphaned answers
    const orphanedAnswers = await prisma.answers.findMany({
      where: {
        question_id: null
      },
      include: {
        session_participants: {
          include: {
            quiz_sessions: true
          }
        }
      }
    })

    if (orphanedAnswers.length === 0) {
      console.log('✅ No orphaned answers to restore')
      return
    }

    console.log(`Found ${orphanedAnswers.length} orphaned answers`)

    // Group by quiz and session
    const answersByQuiz = {}
    orphanedAnswers.forEach(answer => {
      const quizId = answer.session_participants?.quiz_sessions?.quiz_id
      const sessionCode = answer.session_participants?.quiz_sessions?.code
      
      if (!answersByQuiz[quizId]) {
        answersByQuiz[quizId] = {}
      }
      if (!answersByQuiz[quizId][sessionCode]) {
        answersByQuiz[quizId][sessionCode] = []
      }
      answersByQuiz[quizId][sessionCode].push(answer)
    })

    // For each quiz, try to match orphaned answers with questions
    for (const [quizId, sessions] of Object.entries(answersByQuiz)) {
      console.log(`\nProcessing quiz ${quizId}...`)
      
      const quiz = await prisma.quizzes.findUnique({
        where: { id: parseInt(quizId) },
        include: {
          questions: true
        }
      })

      if (!quiz) {
        console.log(`Quiz ${quizId} not found, skipping...`)
        continue
      }

      for (const [sessionCode, answers] of Object.entries(sessions)) {
        console.log(`  Session ${sessionCode}: ${answers.length} orphaned answers`)
        
        // Try to match answers with questions based on question order
        // This is a best-effort restoration
        for (let i = 0; i < answers.length && i < quiz.questions.length; i++) {
          const answer = answers[i]
          const question = quiz.questions[i]
          
          try {
            await prisma.answers.update({
              where: { id: answer.id },
              data: { question_id: question.id }
            })
            console.log(`    Restored answer ${answer.id} to question ${question.id}`)
          } catch (error) {
            console.log(`    Failed to restore answer ${answer.id}: ${error.message}`)
          }
        }
      }
    }

    console.log('\n✅ Restoration attempt completed')

  } catch (error) {
    console.error('Error restoring orphaned answers:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the analysis
if (require.main === module) {
  const command = process.argv[2]
  
  if (command === 'restore') {
    restoreOrphanedAnswers()
  } else {
    analyzeQuizData()
  }
}

module.exports = { analyzeQuizData, restoreOrphanedAnswers } 