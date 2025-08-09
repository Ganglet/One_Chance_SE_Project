import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Expecting: { title, description, negativeMarking, teamMode, questions, userId, teams, maxTeams, teamSize }
    const { title, description, negativeMarking, teamMode, questions, userId, teams, maxTeams, teamSize } = data;
    if (!title || !userId || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Create quiz
    const quiz = await prisma.quizzes.create({
      data: {
        title,
        description,
        negative_marking: negativeMarking,
        team_mode: teamMode,
        user_id: userId,
        status: 'active', // New quizzes start as active
        questions: {
          create: questions.map((q: any) => ({
            type: q.type,
            question: q.question,
            correct_answer: q.correctAnswer?.toString() ?? '',
            time_limit: q.timeLimit,
            points: q.points,
            category: q.category,
            media_type: q.media?.type,
            media_url: q.media?.url,
            options: q.options
              ? {
                  create: q.options.map((optionText: string, idx: number) => ({
                    option_text: optionText,
                    option_index: idx,
                  })),
                }
              : undefined,
            matching_pairs: q.matchingPairs
              ? {
                  create: q.matchingPairs.map((pair: any, idx: number) => ({
                    left_item: pair.left,
                    right_item: pair.right,
                    pair_index: idx,
                  })),
                }
              : undefined,
            drag_drop_items: q.dragDropItems
              ? {
                  create: q.dragDropItems.map((item: any, idx: number) => ({
                    item_text: item.text,
                    category: item.category,
                    item_index: idx,
                  })),
                }
              : undefined,
            ordering_items: q.orderingItems
              ? {
                  create: q.orderingItems.map((item: string, idx: number) => ({
                    item_text: item,
                    correct_order: idx,
                  })),
                }
              : undefined,
          })),
        },
        // Create teams if teamMode is true
        ...(teamMode && teams && Array.isArray(teams) && {
          teams: {
            create: teams.map((team: any) => ({
              name: team.name,
              color: team.color,
              max_members: team.maxMembers || teamSize || 4,
            })),
          },
        }),
      },
      include: { 
        questions: { 
          include: { 
            options: true,
            matching_pairs: true,
            drag_drop_items: true,
            ordering_items: true
          } 
        },
        teams: true
      },
    });
    return NextResponse.json({ quiz }, { status: 201 });
  } catch (err) {
    console.error('Error creating quiz:', err);
    return NextResponse.json({ error: 'Failed to create quiz', details: err }, { status: 500 });
  }
}

// GET all quizzes for dashboard
export async function GET(req: NextRequest) {
  try {
    // Get user ID from query parameters
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Filter quizzes by user_id
    const quizzes = await prisma.quizzes.findMany({
      where: {
        user_id: parseInt(userId),
      },
      include: {
        questions: {
          include: {
            options: true,
            matching_pairs: true,
            drag_drop_items: true,
            ordering_items: true
          }
        },
      },
      orderBy: { created_at: 'desc' },
    });
    return NextResponse.json({ quizzes }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch quizzes', details: err }, { status: 500 });
  }
}
