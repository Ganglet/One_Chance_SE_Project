import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";

// GET /api/participants/history?userId=123
// Returns distinct quizzes the participant has joined, with the latest session code and last played date
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userIdParam = searchParams.get("userId");

    if (!userIdParam) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const userId = parseInt(userIdParam, 10);
    if (Number.isNaN(userId)) {
      return NextResponse.json({ error: "userId must be a number" }, { status: 400 });
    }

    // Find all sessions this user has participated in, newest first
    const participations = await prisma.session_participants.findMany({
      where: { user_id: userId },
      include: {
        quiz_sessions: {
          include: {
            quizzes: true,
          },
        },
      },
      orderBy: [{ joined_at: "desc" }],
    });

    // Build distinct quiz list using the most recent participation per quiz
    const seenQuizIds = new Set<number>();
    const history = [] as Array<{
      id: number; // quizId
      title: string;
      code: string; // latest session code
      date: string; // ISO date string
      teamMode: boolean;
    }>;

    for (const p of participations) {
      const session = p.quiz_sessions;
      if (!session) continue;
      const quiz = session.quizzes;
      if (!quiz) continue;
      if (seenQuizIds.has(quiz.id)) continue;
      seenQuizIds.add(quiz.id);

      history.push({
        id: quiz.id,
        title: quiz.title,
        code: session.code,
        date: (p.joined_at || session.started_at || new Date()).toISOString(),
        teamMode: !!quiz.team_mode,
      });
    }

    return NextResponse.json({ history });
  } catch (error) {
    console.error("[participants/history] error", error);
    return NextResponse.json({ error: "Failed to fetch participant history" }, { status: 500 });
  }
} 