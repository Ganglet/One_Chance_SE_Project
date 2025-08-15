import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")

    if (!code) {
      return NextResponse.json({ error: "Missing code" }, { status: 400 })
    }

    // Get session
    const session = await prisma.quiz_sessions.findFirst({
      where: { code },
    })

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    // Get participants with their answers
    const participants = await prisma.session_participants.findMany({
      where: { session_id: session.id },
      include: {
        users: true
      }
    })

    // Calculate leaderboard for each participant
    const leaderboard = await Promise.all(participants.map(async (participant) => {
      // Get answers for this participant
      const answers = await prisma.answers.findMany({
        where: { session_participant_id: participant.id }
      })

      const totalAnswered = answers.length
      const correctAnswers = answers.filter(a => a.is_correct).length
      const score = answers.reduce((sum, a) => sum + (a.points_awarded || 0), 0)
      const accuracy = totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0

      return {
        username: participant.users.username,
        team: participant.team,
        score,
        accuracy,
        totalAnswered,
        correctAnswers,
        streak: participant.streak || 0
      }
    }))

    // Sort by score (descending)
    leaderboard.sort((a, b) => b.score - a.score)

    return NextResponse.json({ leaderboard })
  } catch (error) {
    console.error("Error fetching leaderboard:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 