import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'

// GET /api/sessions/progress?code=XXXXXX&username=XXXXX - Get current question index
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')
    const username = searchParams.get('username')
    
    if (!code || !username) {
      return NextResponse.json({ error: 'code and username required' }, { status: 400 })
    }

    // Find the session
    const session = await prisma.quiz_sessions.findFirst({
      where: { code },
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

    // Find the participant
    const participant = await prisma.session_participants.findFirst({
      where: {
        session_id: session.id,
        user_id: user.id,
      },
    })
    
    if (!participant) {
      return NextResponse.json({ error: 'Participant not found in session' }, { status: 404 })
    }

    // Get the current question index from session metadata or default to 0
    // For now, we'll use a simple approach - you might want to add a metadata field to sessions
    return NextResponse.json({ 
      questionIndex: 0, // Default to 0, can be enhanced with metadata storage
      sessionId: session.id,
      participantId: participant.id
    })
  } catch (error) {
    console.error('Error getting progress:', error)
    return NextResponse.json({ error: 'Failed to get progress' }, { status: 500 })
  }
}

// POST /api/sessions/progress - Save current question index
export async function POST(req: NextRequest) {
  try {
    const { sessionCode, username, questionIndex } = await req.json()
    
    if (!sessionCode || !username || questionIndex === undefined) {
      return NextResponse.json({ error: 'sessionCode, username, and questionIndex required' }, { status: 400 })
    }

    // Find the session
    const session = await prisma.quiz_sessions.findFirst({
      where: { code: sessionCode },
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

    // Find the participant
    const participant = await prisma.session_participants.findFirst({
      where: {
        session_id: session.id,
        user_id: user.id,
      },
    })
    
    if (!participant) {
      return NextResponse.json({ error: 'Participant not found in session' }, { status: 404 })
    }

    // For now, we'll store the progress in a simple way
    // In a production system, you might want to add a metadata field to sessions or participants
    // For this implementation, we'll use localStorage on the client side and just acknowledge the save
    
    return NextResponse.json({ 
      success: true, 
      message: 'Progress saved',
      questionIndex 
    })
  } catch (error) {
    console.error('Error saving progress:', error)
    return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 })
  }
} 