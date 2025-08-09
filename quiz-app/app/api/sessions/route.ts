import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

// Helper to generate a unique 6-character code
function generateSessionCode(length = 6) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

// POST /api/sessions - Create a new session for a quiz
export async function POST(req: NextRequest) {
  const { quizId, hostId } = await req.json()
  if (!quizId || !hostId) {
    return NextResponse.json({ error: 'quizId and hostId required' }, { status: 400 })
  }
  // Validate quiz exists and is active
  const quiz = await prisma.quizzes.findUnique({ where: { id: quizId } })
  if (!quiz) {
    return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
  }
  if (quiz.status !== 'active') {
    return NextResponse.json({ error: 'Quiz is not active. Please activate the quiz first.' }, { status: 400 })
  }
  // Validate host exists
  const host = await prisma.users.findUnique({ where: { id: hostId } })
  if (!host) {
    return NextResponse.json({ error: 'Host user not found' }, { status: 404 })
  }
  let code = ''
  let exists = true
  // Ensure code is unique
  while (exists) {
    code = generateSessionCode()
    exists = !!(await prisma.quiz_sessions.findFirst({ where: { code } }))
  }
  try {
    const session = await prisma.quiz_sessions.create({
      data: {
        quiz_id: quizId,
        host_id: hostId,
        code: code,
        status: 'waiting',
        started_at: new Date(),
      },
    })
    return NextResponse.json({ session })
  } catch (err) {
    console.error('Session creation error:', err)
    return NextResponse.json({ error: 'Failed to start session', details: err }, { status: 500 })
  }
}

// GET /api/sessions?code=XXXXXX - Get session info by code
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'code required' }, { status: 400 })
  const session = await prisma.quiz_sessions.findFirst({
    where: { code },
    include: { session_participants: true },
  })
  if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  return NextResponse.json({ session })
}

// PATCH /api/sessions - End a session (set status to completed)
export async function PATCH(req: NextRequest) {
  const { code } = await req.json()
  if (!code) return NextResponse.json({ error: 'code required' }, { status: 400 })
  const session = await prisma.quiz_sessions.update({
    where: { code },
    data: { status: 'completed', ended_at: new Date() },
  })
  return NextResponse.json({ session })
}
