import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

// GET /api/sessions/participants?code=XXXXXX - List participants for a session
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'code required' }, { status: 400 })
  const session = await prisma.quiz_sessions.findFirst({ where: { code } })
  if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  const participants = await prisma.session_participants.findMany({
    where: { session_id: session.id },
    include: { users: true },
  })
  return NextResponse.json({ participants })
}
