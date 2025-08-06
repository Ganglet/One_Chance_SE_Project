import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'

// GET /api/sessions/teams?code=XXX - Get teams with scores and members for a session
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')
    
    if (!code) {
      return NextResponse.json({ error: 'Session code required' }, { status: 400 })
    }

    // Find session
    const session = await prisma.quiz_sessions.findFirst({
      where: { code },
      include: {
        quizzes: {
          include: {
            teams: true
          }
        }
      }
    })
    
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    // Get all participants for this session
    const participants = await prisma.session_participants.findMany({
      where: { session_id: session.id },
      include: {
        users: true
      }
    })

    // Map teams with their members and calculate scores
    const teamsWithMembers = session.quizzes.teams.map((team: any) => {
      const teamMembers = participants.filter((p: any) => p.team === team.name)
      const memberUsernames = teamMembers.map((p: any) => p.users.username)
      const teamScore = teamMembers.reduce((sum: number, p: any) => sum + (p.score || 0), 0)
      
      return {
        id: team.id.toString(),
        name: team.name,
        color: team.color,
        members: memberUsernames,
        score: teamScore
      }
    })

    return NextResponse.json({ 
      teams: teamsWithMembers,
      sessionCode: code
    })

  } catch (error) {
    console.error('Error fetching teams:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 