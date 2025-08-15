import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'

// POST /api/sessions/join - Join a session by code and username
export async function POST(req: NextRequest) {
  try {
    const { code, username } = await req.json()
    
    if (!code || !username) {
      return NextResponse.json({ error: 'code and username required' }, { status: 400 })
    }

    // Prevent joining with anonymous/empty usernames
    if (!username.trim() || username.toLowerCase() === 'anonymous') {
      return NextResponse.json({ error: 'Invalid username. Please provide a valid name.' }, { status: 400 })
    }

    // Find session by code
    const session = await prisma.quiz_sessions.findFirst({
      where: { code },
    })
    
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    // Only block if the session is completed; allow joining during waiting/active/paused
    if (session.status === 'completed') {
      return NextResponse.json({ error: 'Session has already ended' }, { status: 400 })
    }

    // Find or create user by username
    let user = await prisma.users.findFirst({
      where: { username },
    })

    if (!user) {
      user = await prisma.users.create({
        data: {
          username,
          email: `${username}@participant.local`,
          password: 'participant',
          role: 'participant',
        },
      })
    }

    // Check if user is already in this session
    const existingParticipant = await prisma.session_participants.findFirst({
      where: {
        session_id: session.id,
        user_id: user.id,
      },
    })

    if (existingParticipant) {
      return NextResponse.json({ 
        success: true,
        message: 'Already joined',
        userId: user.id,
        participantId: existingParticipant.id
      })
    }

    // Add user to session
    const participant = await prisma.session_participants.create({
      data: {
        session_id: session.id,
        user_id: user.id,
        join_code: code,
        score: 0,
        streak: 0,
        accuracy: 0,
      },
    })

    return NextResponse.json({ 
      success: true,
      userId: user.id,
      participantId: participant.id,
      message: 'Successfully joined session'
    })

  } catch (error) {
    console.error('Error joining session:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
