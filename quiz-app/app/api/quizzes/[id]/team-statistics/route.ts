import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../../lib/db'

// GET /api/quizzes/[id]/team-statistics - Get team quiz statistics
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

    // Mock team data for demonstration
    const teams = [
      { id: "1", name: "Team Alpha", color: "#3B82F6", totalScore: 1250, accuracy: 85.5, memberCount: 6, wins: 3 },
      { id: "2", name: "Team Beta", color: "#10B981", totalScore: 1180, accuracy: 82.3, memberCount: 6, wins: 2 },
      { id: "3", name: "Team Gamma", color: "#F59E0B", totalScore: 1100, accuracy: 76.8, memberCount: 6, wins: 0 },
      { id: "4", name: "Team Delta", color: "#EF4444", totalScore: 980, accuracy: 72.1, memberCount: 6, wins: 0 }
    ]

    // Mock participant data
    const participants = sessions.flatMap(session =>
      session.session_participants.map(participant => ({
        id: participant.user_id.toString(),
        name: participant.users.username,
        team: `Team ${['Alpha', 'Beta', 'Gamma', 'Delta'][Math.floor(Math.random() * 4)]}`,
        totalScore: participant.score || 0,
        accuracy: participant.accuracy || 0,
        responseTime: Math.random() * 20 + 10 // Random response time between 10-30 seconds
      }))
    )

    // Calculate response statistics
    const responseStats = {
      totalResponses: totalAnswers,
      correctResponses: correctAnswers,
      responseRate: totalParticipants > 0 ? (totalAnswers / (totalParticipants * quiz.questions.length)) * 100 : 0,
      averageResponseTime: 14.2 // Mock average response time
    }

    const stats = {
      id: quizId.toString(),
      title: quiz.title,
      totalSessions,
      totalParticipants,
      totalTeams: teams.length,
      averageScore,
      averageAccuracy,
      sessionComplete: sessions.some(s => s.status === 'completed'),
      teams,
      participants,
      responseStats
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching team statistics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team statistics' },
      { status: 500 }
    )
  }
} 