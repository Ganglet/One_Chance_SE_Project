import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'

// POST /api/sessions/update-stats - Update participant statistics
export async function POST(req: NextRequest) {
  try {
    const { code, username, stats, disqualificationReason } = await req.json()
    
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

    // Prepare update data
    const updateData: any = {
      score: stats.score || participant.score,
      streak: stats.streak || participant.streak,
      accuracy: stats.accuracy || participant.accuracy,
    }

    // If this is a disqualification, log it for the host
    if (stats.accuracy === -1) {
      console.log(`🚫 PARTICIPANT DISQUALIFIED: ${username} in session ${code}`)
      if (disqualificationReason) {
        console.log(`📋 Disqualification reason: ${disqualificationReason}`)
      }
      
      // You could also store this in a separate table for audit purposes
      // For now, we'll use the accuracy field as a flag
    }

    // Update the participant
    const updatedParticipant = await prisma.session_participants.update({
      where: { id: participant.id },
      data: updateData,
    })

    return NextResponse.json({ 
      success: true, 
      participant: updatedParticipant,
      isDisqualified: stats.accuracy === -1
    })
  } catch (error) {
    console.error('Error updating participant stats:', error)
    return NextResponse.json({ error: 'Failed to update participant stats' }, { status: 500 })
  }
} 