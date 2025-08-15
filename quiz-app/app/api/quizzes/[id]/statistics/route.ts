import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/db'

// GET /api/quizzes/[id]/statistics - Get quiz statistics
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const quizId = parseInt(id)
    if (!quizId) {
      return NextResponse.json({ error: 'Invalid quiz ID' }, { status: 400 })
    }

    // Get quiz details
    const quiz = await prisma.quizzes.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: {
            options: true
          }
        },
      },
    })

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
    }

    // Get all sessions for this quiz
    const sessions = await prisma.quiz_sessions.findMany({
      where: { quiz_id: quizId },
      include: {
        session_participants: {
          include: {
            users: true,
          },
        },
      },
    })

    console.log(`Found ${sessions.length} sessions for quiz ${quizId}:`, sessions.map(s => s.code))

    // Get all answers for this quiz with proper session information
    const answers = await prisma.answers.findMany({
      where: {
        questions: {
          quiz_id: quizId,
        },
      },
      include: {
        session_participants: {
          include: {
            quiz_sessions: true,
            users: true,
          },
        },
        questions: true,
      },
    })

    console.log(`Found ${answers.length} total answers across all sessions for quiz ${quizId}`)

    // Calculate overall statistics
    const totalSessions = sessions.length
    const totalParticipants = sessions.reduce((sum, session) => sum + session.session_participants.length, 0)
    const totalAnswers = answers.length
    const correctAnswers = answers.filter(a => a.is_correct).length

    // Calculate average score and accuracy
    let totalScore = 0
    let totalAccuracy = 0
    let participantCount = 0

    sessions.forEach(session => {
      session.session_participants.forEach(participant => {
        totalScore += participant.score || 0
        totalAccuracy += participant.accuracy || 0
        participantCount++
      })
    })

    const averageScore = participantCount > 0 ? totalScore / participantCount : 0
    const averageAccuracy = participantCount > 0 ? totalAccuracy / participantCount : 0

    // Calculate average time per question
    const totalTime = answers.reduce((sum, a) => sum + (a.time_taken || 0), 0)
    const averageTimePerQuestion = totalAnswers > 0 ? totalTime / totalAnswers : 0

    // Process session statistics
    const sessionStats = sessions.map(session => {
      const participants = session.session_participants
      const sessionAvgScore = participants.length > 0 
        ? participants.reduce((sum, p) => sum + (p.score || 0), 0) / participants.length 
        : 0

      return {
        id: session.id.toString(),
        code: session.code,
        status: session.status,
        startedAt: session.started_at || '',
        endedAt: session.ended_at || '',
        participantCount: participants.length,
        averageScore: sessionAvgScore,
      }
    })

    // Process question statistics
    const questionStats = quiz.questions.map(question => {
      const questionAnswers = answers.filter(a => a.question_id === question.id)
      const correctAttempts = questionAnswers.filter(a => a.is_correct).length
      const successRate = questionAnswers.length > 0 ? (correctAttempts / questionAnswers.length) * 100 : 0
      const avgTime = questionAnswers.length > 0 ? questionAnswers.reduce((sum, a) => sum + (a.time_taken || 0), 0) / questionAnswers.length : 0

      console.log(`Question ${question.id} stats:`, {
        question: question.question,
        totalAnswers: questionAnswers.length,
        correctAttempts,
        successRate,
        avgTime,
        answers: questionAnswers.map(a => ({
          isCorrect: a.is_correct,
          timeTaken: a.time_taken,
          pointsAwarded: a.points_awarded,
          sessionCode: a.session_participants?.quiz_sessions?.code || 'unknown'
        }))
      })

      return {
        id: question.id.toString(),
        question: question.question,
        type: question.type,
        totalAttempts: questionAnswers.length,
        correctAttempts,
        successRate,
        averageTime: avgTime,
      }
    })

    const statistics = {
      id: quiz.id.toString(),
      title: quiz.title,
      description: quiz.description,
      totalSessions,
      totalParticipants,
      totalQuestions: quiz.questions.length,
      averageScore,
      averageAccuracy,
      averageTimePerQuestion,
      totalAnswers,
      correctAnswers,
      sessions: sessionStats,
      questionStats,
    }

    return NextResponse.json(statistics)
  } catch (error) {
    console.error('Error fetching statistics:', error)
    return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 })
  }
} 