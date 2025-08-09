import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const username = searchParams.get("username")

    if (!code || !username) {
      return NextResponse.json({ error: "Missing code or username" }, { status: 400 })
    }

    // Get session
    const session = await prisma.quiz_sessions.findFirst({
      where: { code },
    })

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    // Get participant
    const participant = await prisma.session_participants.findFirst({
      where: {
        session_id: session.id,
        users: {
          username: username
        }
      },
      include: {
        users: true
      }
    })

    if (!participant) {
      return NextResponse.json({ error: "Participant not found" }, { status: 404 })
    }

    // Get participant's answers
    const answers = await prisma.answers.findMany({
      where: {
        session_participant_id: participant.id
      },
      orderBy: {
        answered_at: "asc"
      }
    })

    // Calculate stats
    const totalAnswered = answers.length
    const correctAnswers = answers.filter(a => a.is_correct).length
    const totalScore = answers.reduce((sum, a) => sum + (a.points_awarded || 0), 0)
    const accuracy = totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0

    // Get position from leaderboard
    const allParticipants = await prisma.session_participants.findMany({
      where: { session_id: session.id },
      include: {
        users: true
      }
    })

    const participantsWithScores = await Promise.all(allParticipants.map(async (p) => {
      const participantAnswers = await prisma.answers.findMany({
        where: { session_participant_id: p.id }
      })
      const score = participantAnswers.reduce((sum, a) => sum + (a.points_awarded || 0), 0)
      
      return {
        username: p.users.username,
        score
      }
    }))

    participantsWithScores.sort((a, b) => b.score - a.score)
    const position = participantsWithScores.findIndex(p => p.username === username) + 1

    const stats = {
      score: totalScore,
      accuracy,
      totalAnswered,
      correctAnswers,
      position
    }

    return NextResponse.json({ stats })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 