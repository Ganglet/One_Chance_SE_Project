import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/debug/quiz/[id] - Debug endpoint to check database data
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const quizId = parseInt(params.id)
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
            answers: {
              include: {
                questions: true
              }
            }
          },
        },
      },
    })

    // Get all answers for this quiz
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

    // Get all participants across all sessions
    const allParticipants = await prisma.session_participants.findMany({
      where: {
        quiz_sessions: {
          quiz_id: quizId
        }
      },
      include: {
        users: true,
        answers: {
          include: {
            questions: true
          }
        },
        quiz_sessions: true
      }
    })

    const debugData = {
      quiz: {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        status: quiz.status,
        questionCount: quiz.questions.length
      },
      sessions: sessions.map(session => ({
        id: session.id,
        code: session.code,
        status: session.status,
        startedAt: session.started_at,
        endedAt: session.ended_at,
        participantCount: session.session_participants.length,
        participants: session.session_participants.map(p => ({
          id: p.id,
          userId: p.user_id,
          username: p.users.username,
          score: p.score,
          streak: p.streak,
          accuracy: p.accuracy,
          answerCount: p.answers.length,
          answers: p.answers.map(a => ({
            id: a.id,
            questionId: a.question_id,
            question: a.questions.question,
            isCorrect: a.is_correct,
            timeTaken: a.time_taken,
            pointsAwarded: a.points_awarded,
            answeredAt: a.answered_at
          }))
        }))
      })),
      totalAnswers: answers.length,
      answersBySession: answers.reduce((acc, answer) => {
        const sessionCode = answer.session_participants?.quiz_sessions?.code || 'unknown'
        if (!acc[sessionCode]) {
          acc[sessionCode] = []
        }
        acc[sessionCode].push({
          id: answer.id,
          questionId: answer.question_id,
          question: answer.questions.question,
          isCorrect: answer.is_correct,
          timeTaken: answer.time_taken,
          pointsAwarded: answer.points_awarded,
          participant: answer.session_participants?.users?.username || 'unknown'
        })
        return acc
      }, {} as Record<string, any[]>),
      allParticipants: allParticipants.map(p => ({
        id: p.id,
        userId: p.user_id,
        username: p.users.username,
        sessionCode: p.quiz_sessions.code,
        score: p.score,
        streak: p.streak,
        accuracy: p.accuracy,
        answerCount: p.answers.length,
        answers: p.answers.map(a => ({
          id: a.id,
          questionId: a.question_id,
          question: a.questions.question,
          isCorrect: a.is_correct,
          timeTaken: a.time_taken,
          pointsAwarded: a.points_awarded
        }))
      }))
    }

    return NextResponse.json(debugData)
  } catch (error) {
    console.error('Error in debug endpoint:', error)
    return NextResponse.json({ error: 'Failed to fetch debug data', details: error }, { status: 500 })
  }
} 