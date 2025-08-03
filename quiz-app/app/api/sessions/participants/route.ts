import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'

// GET /api/sessions/participants?code=XXXXXX - List participants for a session
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')
    if (!code) return NextResponse.json({ error: 'code required' }, { status: 400 })
    
    console.log('Fetching participants for session code:', code)
    
    // First find the session
    const session = await prisma.quiz_sessions.findFirst({ 
      where: { code }
    })
    
    if (!session) {
      console.log('Session not found for code:', code)
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }
    
    console.log('Found session:', session.id, 'quiz_id:', session.quiz_id)
    
    // Get the total number of questions for this quiz
    const totalQuestions = await prisma.questions.count({
      where: { quiz_id: session.quiz_id }
    })
    
    console.log('Total questions for quiz:', totalQuestions)
    
    // Then fetch participants with their related data
    const participants = await prisma.session_participants.findMany({
      where: { session_id: session.id },
      include: { 
        users: true
      },
    })
    
    console.log('Found participants:', participants.length)
    participants.forEach(p => {
      console.log('Participant:', p.users.username, 'team:', p.team, 'score:', p.score)
    })
    
    // Transform the data to include more detailed statistics
    const transformedParticipants = await Promise.all(participants.map(async (participant) => {
      // Fetch answers for this specific participant
      const answers = await prisma.answers.findMany({
        where: { session_participant_id: participant.id },
        include: {
          questions: true
        }
      })
      
      console.log(`Participant ${participant.users.username} has ${answers.length} answers`)
      
      const totalAnswers = answers.length
      const correctAnswers = answers.filter(a => a.is_correct).length
      const totalTimeTaken = answers.reduce((sum, a) => sum + (a.time_taken || 0), 0)
      const averageTimeTaken = totalAnswers > 0 ? Math.round(totalTimeTaken / totalAnswers) : 0
      const totalPointsEarned = answers.reduce((sum, a) => sum + (a.points_awarded || 0), 0)
      const fastestAnswer = answers.length > 0 ? Math.min(...answers.map(a => a.time_taken || 0)) : 0
      const slowestAnswer = answers.length > 0 ? Math.max(...answers.map(a => a.time_taken || 0)) : 0
      
      console.log(`Participant ${participant.users.username} stats:`, {
        totalAnswers,
        correctAnswers,
        totalTimeTaken,
        averageTimeTaken,
        totalPointsEarned,
        fastestAnswer,
        slowestAnswer,
        answers: answers.map(a => ({
          questionId: a.question_id,
          isCorrect: a.is_correct,
          timeTaken: a.time_taken,
          pointsAwarded: a.points_awarded
        }))
      })
      
      return {
        id: participant.id,
        user_id: participant.user_id,
        session_id: participant.session_id,
        score: totalPointsEarned, // Use calculated score from answers instead of database field
        streak: participant.streak || 0,
        accuracy: totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0, // Calculate accuracy from answers
        team: participant.team || null,
        joined_at: participant.joined_at,
        users: participant.users,
        answered: totalAnswers >= totalQuestions,
        // Enhanced statistics (REAL DATA ONLY)
        totalAnswers,
        correctAnswers,
        incorrectAnswers: totalAnswers - correctAnswers,
        averageTimeTaken,
        totalTimeTaken,
        totalPointsEarned,
        fastestAnswer,
        slowestAnswer,
        questionsAnswered: totalAnswers,
        questionsCorrect: correctAnswers,
        questionsIncorrect: totalAnswers - correctAnswers,
        averagePointsPerQuestion: totalAnswers > 0 ? Math.round(totalPointsEarned / totalAnswers) : 0,
        efficiency: totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0
      }
    }))
    
    console.log('Returning transformed participants:', transformedParticipants.length)
    
    return NextResponse.json({ participants: transformedParticipants })
  } catch (error) {
    console.error('Error fetching participants:', error)
    return NextResponse.json({ error: 'Failed to fetch participants' }, { status: 500 })
  }
}
