import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/db'

// POST /api/quizzes/[id]/export-charts - Export quiz charts as images
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const quizId = parseInt(params.id)
    if (!quizId) {
      return NextResponse.json({ error: 'Invalid quiz ID' }, { status: 400 })
    }

    const body = await req.json()
    const { sessionCode, chartData } = body

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

    // Get sessions for this quiz (filter by session code if provided)
    const sessionsWhere = sessionCode 
      ? { quiz_id: quizId, code: sessionCode }
      : { quiz_id: quizId }

    const sessions = await prisma.quiz_sessions.findMany({
      where: sessionsWhere,
      include: {
        session_participants: {
          include: {
            users: true,
          },
        },
      },
    })

    if (sessionCode && sessions.length === 0) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

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
            users: true,
          },
        },
        questions: true,
      },
    })

    // Filter answers by session if session code is provided
    const filteredAnswers = sessionCode 
      ? answers.filter(a => {
          const sessionParticipant = sessions
            .flatMap(s => s.session_participants)
            .find(sp => sp.id === a.session_participant_id)
          return sessionParticipant !== undefined
        })
      : answers

    // Process participants data for charts
    const participants = sessions.flatMap(s => s.session_participants.map(p => ({
      id: p.id.toString(),
      name: p.users.username,
      score: p.score || 0,
      streak: p.streak || 0,
      accuracy: p.accuracy || 0,
      answered: p.answered || false,
      totalAnswers: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      averageTimeTaken: 0,
      totalTimeTaken: 0,
      totalPointsEarned: p.score || 0,
      fastestAnswer: 0,
      slowestAnswer: 0,
      questionsAnswered: 0,
      questionsCorrect: 0,
      questionsIncorrect: 0,
      averagePointsPerQuestion: 0,
      efficiency: p.accuracy || 0,
    })))

    // Calculate enhanced statistics for each participant
    participants.forEach(participant => {
      const participantAnswers = filteredAnswers.filter(a => 
        sessions.flatMap(s => s.session_participants).find(p => p.id.toString() === participant.id)?.id === a.session_participant_id
      )
      
      participant.totalAnswers = participantAnswers.length
      participant.correctAnswers = participantAnswers.filter(a => a.is_correct).length
      participant.incorrectAnswers = participantAnswers.filter(a => !a.is_correct).length
      participant.questionsAnswered = participantAnswers.length
      participant.questionsCorrect = participant.correctAnswers
      participant.questionsIncorrect = participant.incorrectAnswers
      
      if (participantAnswers.length > 0) {
        participant.totalTimeTaken = participantAnswers.reduce((sum, a) => sum + (a.time_taken || 0), 0)
        participant.averageTimeTaken = participant.totalTimeTaken / participantAnswers.length
        participant.fastestAnswer = Math.min(...participantAnswers.map(a => a.time_taken || 0))
        participant.slowestAnswer = Math.max(...participantAnswers.map(a => a.time_taken || 0))
        participant.averagePointsPerQuestion = participant.totalPointsEarned / participantAnswers.length
      }
    })

    // Generate chart data
    const chartExportData = {
      quizInfo: {
        title: quiz.title,
        description: quiz.description,
        totalQuestions: quiz.questions.length,
        status: quiz.status,
        sessionCode: sessionCode || 'All Sessions',
        exportDate: new Date().toISOString().split('T')[0],
        exportTime: new Date().toLocaleTimeString(),
      },
      overallStats: {
        totalSessions: sessions.length,
        totalParticipants: participants.length,
        totalAnswers: filteredAnswers.length,
        totalCorrectAnswers: filteredAnswers.filter(a => a.is_correct).length,
        overallSuccessRate: filteredAnswers.length > 0 ? ((filteredAnswers.filter(a => a.is_correct).length / filteredAnswers.length) * 100).toFixed(2) : '0',
        averageTimePerAnswer: filteredAnswers.length > 0 ? (filteredAnswers.reduce((sum, a) => sum + (a.time_taken || 0), 0) / filteredAnswers.length).toFixed(2) : '0',
      },
      participants: participants.sort((a, b) => b.score - a.score),
      questions: quiz.questions.map((q, index) => {
        const questionAnswers = filteredAnswers.filter(a => a.question_id === q.id)
        const correctAttempts = questionAnswers.filter(a => a.is_correct).length
        const successRate = questionAnswers.length > 0 ? (correctAttempts / questionAnswers.length) * 100 : 0
        const avgTime = questionAnswers.length > 0 ? questionAnswers.reduce((sum, a) => sum + (a.time_taken || 0), 0) / questionAnswers.length : 0
        
        let difficulty = 'Unknown'
        if (successRate >= 80) difficulty = 'Easy'
        else if (successRate >= 60) difficulty = 'Medium'
        else if (successRate >= 40) difficulty = 'Hard'
        else difficulty = 'Very Hard'

        return {
          number: index + 1,
          question: q.question,
          type: q.type,
          correctAnswer: q.correct_answer,
          options: q.options?.map(opt => opt.option_text) || [],
          totalAttempts: questionAnswers.length,
          correctAttempts,
          successRate: successRate.toFixed(2),
          averageTime: avgTime.toFixed(2),
          difficulty,
          points: q.points || 100,
          timeLimit: q.time_limit || 30,
        }
      }),
      sessions: sessions.map(session => {
        const sessionParticipants = session.session_participants
        const sessionAnswers = filteredAnswers.filter(a => 
          sessionParticipants.some(p => p.id === a.session_participant_id)
        )
        
        const avgScore = sessionParticipants.length > 0 
          ? sessionParticipants.reduce((sum, p) => sum + (p.score || 0), 0) / sessionParticipants.length 
          : 0
        
        const avgAccuracy = sessionParticipants.length > 0
          ? sessionParticipants.reduce((sum, p) => sum + (p.accuracy || 0), 0) / sessionParticipants.length
          : 0

        const successRate = sessionAnswers.length > 0
          ? (sessionAnswers.filter(a => a.is_correct).length / sessionAnswers.length) * 100
          : 0

        const duration = session.started_at && session.ended_at
          ? Math.round((new Date(session.ended_at).getTime() - new Date(session.started_at).getTime()) / (1000 * 60))
          : 0

        return {
          code: session.code,
          status: session.status,
          startedAt: session.started_at,
          endedAt: session.ended_at,
          duration,
          totalParticipants: sessionParticipants.length,
          averageScore: avgScore.toFixed(2),
          averageAccuracy: avgAccuracy.toFixed(2),
          totalQuestionsAnswered: sessionAnswers.length,
          successRate: successRate.toFixed(2),
        }
      }),
    }

    return NextResponse.json({
      success: true,
      data: chartExportData,
      message: 'Chart data exported successfully'
    })

  } catch (error) {
    console.error('Error exporting charts:', error)
    return NextResponse.json({ error: 'Failed to export charts' }, { status: 500 })
  }
} 