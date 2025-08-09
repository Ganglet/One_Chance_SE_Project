import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

// POST /api/sessions/join - Join a session by code and username
export async function POST(req: NextRequest) {
  const { code, username } = await req.json()
  if (!code || !username) {
    return NextResponse.json({ error: 'code and username required' }, { status: 400 })
  }
  // Find session
  const session = await prisma.quiz_sessions.findFirst({ where: { code } })
  if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 })

  // Find or create user
  let user = await prisma.users.findFirst({ where: { username } })
  if (!user) {
    user = await prisma.users.create({ data: { username, password: '', email: `${username}@example.com`, role: 'participant' } })
  }

  // Check if already joined
  let participant = await prisma.session_participants.findFirst({ where: { session_id: session.id, user_id: user.id } })
  if (!participant) {
    participant = await prisma.session_participants.create({
      data: {
        session_id: session.id,
        user_id: user.id,
        score: 0,
        streak: 0,
        accuracy: 0,
      },
    })
  }
  return NextResponse.json({ participant })
}
