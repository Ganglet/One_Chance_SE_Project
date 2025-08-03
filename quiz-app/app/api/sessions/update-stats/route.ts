import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'

// POST /api/sessions/update-stats - Update participant statistics
export async function POST(req: NextRequest) {
  try {
    const { code, username, stats } = await req.json()
    
    if (!code || !username || !stats) {
      return NextResponse.json({ error: 'code, username, and stats required' }, { status: 400 })
    }

    // Find the session
    const session = await prisma.quiz_sessions.findFirst({
      where: { code: code },
    })
    
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    // Find the user
    const user = await prisma.users.findFirst({
      where: { username },
    })
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Find and update the participant
    const participant = await prisma.session_participants.findFirst({
      where: {
        session_id: session.id,
        user_id: user.id,
      },
    })
    
    if (!participant) {
      return NextResponse.json({ error: 'Participant not found in session' }, { status: 404 })
    }

    // Update the participant with enhanced statistics
    const updatedParticipant = await prisma.session_participants.update({
      where: { id: participant.id },
      data: {
        score: stats.score || participant.score,
        streak: stats.streak || participant.streak,
        accuracy: stats.accuracy || participant.accuracy,
        // Enhanced statistics fields
        totalAnswers: stats.totalAnswered || 0,
        correctAnswers: stats.correctAnswers || 0,
        incorrectAnswers: (stats.totalAnswered || 0) - (stats.correctAnswers || 0),
        averageTimeTaken: stats.averageTimeTaken || 0,
        totalTimeTaken: stats.totalTimeTaken || 0,
        totalPointsEarned: stats.totalPointsEarned || stats.score || 0,
        fastestAnswer: stats.fastestAnswer || 0,
        slowestAnswer: stats.slowestAnswer || 0,
        questionsAnswered: stats.questionsAnswered || stats.totalAnswered || 0,
        questionsCorrect: stats.questionsCorrect || stats.correctAnswers || 0,
        questionsIncorrect: stats.questionsIncorrect || ((stats.totalAnswered || 0) - (stats.correctAnswers || 0)),
        averagePointsPerQuestion: stats.averagePointsPerQuestion || 0,
        efficiency: stats.efficiency || stats.accuracy || 0,
      },
    })

    return NextResponse.json({ 
      success: true, 
      participant: updatedParticipant 
    })
  } catch (error) {
    console.error('Error updating participant stats:', error)
    return NextResponse.json({ error: 'Failed to update participant stats' }, { status: 500 })
  }
} 