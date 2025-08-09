import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

// GET /api/sessions/questions?code=XXXXXX - Get questions for a session's quiz
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'code required' }, { status: 400 })
  // Find session by code
  const session = await prisma.quiz_sessions.findFirst({
    where: { code },
  })
  if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  if (session.status !== 'active') {
    // Only return questions if session is active
    return NextResponse.json({ questions: [] })
  }
  // Fetch the related quiz and its questions (with options)
  const quiz = await prisma.quizzes.findUnique({
    where: { id: session.quiz_id },
    include: { questions: { include: { options: true } } },
  })
  if (!quiz) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
  return NextResponse.json({ questions: quiz.questions })
}
