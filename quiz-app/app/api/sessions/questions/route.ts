import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'

// GET /api/sessions/questions?code=XXXXXX - Get questions for a session's quiz
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'code required' }, { status: 400 })
  
  try {
    // Find session by code
    const session = await prisma.quiz_sessions.findFirst({
      where: { code },
    })
    if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    
    // Fetch the related quiz and its questions (with options)
    const quiz = await prisma.quizzes.findUnique({
      where: { id: session.quiz_id },
      include: { 
        questions: { 
          include: { 
            options: true,
            matching_pairs: true,
            drag_drop_items: true,
            ordering_items: true
          } 
        } 
      },
    })
    if (!quiz) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
    
    // Return questions regardless of session status - host needs to see questions even in waiting status
    return NextResponse.json({ questions: quiz.questions })
  } catch (error) {
    console.error('Error fetching questions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
