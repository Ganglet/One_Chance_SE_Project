import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'

// POST /api/sessions/assign-team - Assign a participant to a team
export async function POST(req: NextRequest) {
  try {
    const { code, username, teamName } = await req.json()
    
    if (!code || !username || !teamName) {
      return NextResponse.json({ error: 'code, username, and teamName required' }, { status: 400 })
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

    // Verify team exists
    const team = session.quizzes.teams.find((t: any) => t.name === teamName)
    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 })
    }

    // Find user
    const user = await prisma.users.findFirst({
      where: { username }
    })
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Find participant
    const participant = await prisma.session_participants.findFirst({
      where: {
        session_id: session.id,
        user_id: user.id
      }
    })
    
    if (!participant) {
      return NextResponse.json({ error: 'Participant not found in session' }, { status: 404 })
    }

    // Update participant with team assignment
    const updatedParticipant = await prisma.session_participants.update({
      where: { id: participant.id },
      data: { team: teamName }
    })

    return NextResponse.json({ 
      success: true,
      participant: updatedParticipant,
      message: `Assigned ${username} to ${teamName}`
    })

  } catch (error) {
    console.error('Error assigning team:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/sessions/assign-team/auto - Automatically assign all participants to teams
export async function PATCH(req: NextRequest) {
  try {
    const { code } = await req.json()
    
    if (!code) {
      return NextResponse.json({ error: 'code required' }, { status: 400 })
    }

    console.log('Auto-assigning teams for session code:', code)

    // Find session
    const session = await prisma.quiz_sessions.findFirst({
      where: { code },
      include: {
        quizzes: {
          include: {
            teams: true
          }
        },
        session_participants: {
          include: {
            users: true
          }
        }
      }
    })
    
    if (!session) {
      console.log('Session not found for code:', code)
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    const teams = session.quizzes.teams
    const participants = session.session_participants.filter((p: any) => !p.team) // Only unassigned participants
    
    console.log('Found teams:', teams.length, teams.map((t: any) => t.name))
    console.log('Found participants:', participants.length, participants.map((p: any) => p.users.username))
    
    if (teams.length === 0) {
      console.log('No teams found for this quiz')
      return NextResponse.json({ error: 'No teams found for this quiz' }, { status: 400 })
    }

    // Simple round-robin assignment
    const assignments = []
    for (let i = 0; i < participants.length; i++) {
      const teamIndex = i % teams.length
      const team = teams[teamIndex]
      const participant = participants[i]
      
      console.log(`Assigning ${participant.users.username} to team ${team.name}`)
      
      const updatedParticipant = await prisma.session_participants.update({
        where: { id: participant.id },
        data: { team: team.name }
      })
      
      assignments.push({
        username: participant.users.username,
        team: team.name
      })
    }

    console.log('Team assignments completed:', assignments)

    return NextResponse.json({ 
      success: true,
      assignments,
      message: `Automatically assigned ${assignments.length} participants to teams`
    })

  } catch (error) {
    console.error('Error auto-assigning teams:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 