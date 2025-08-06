import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'

// GET /api/sessions/events - Server-Sent Events for real-time session updates
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  
  if (!code) {
    return NextResponse.json({ error: 'code parameter required' }, { status: 400 })
  }

  // Set up SSE headers
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      let isConnected = true

      const sendEvent = (data: any) => {
        if (!isConnected) return
        try {
          const event = `data: ${JSON.stringify(data)}\n\n`
          controller.enqueue(encoder.encode(event))
        } catch (error) {
          console.error('Error sending SSE event:', error)
          isConnected = false
        }
      }

      const sendHeartbeat = () => {
        if (!isConnected) return
        sendEvent({ type: 'heartbeat', timestamp: Date.now() })
      }

      const checkSessionStatus = async () => {
        if (!isConnected) return
        try {
          const session = await prisma.quiz_sessions.findFirst({
            where: { code },
            include: {
              quizzes: true,
              session_participants: {
                include: {
                  users: true
                }
              }
            }
          })

          if (session) {
            // Get participant statistics
            const participantsWithStats = await Promise.all(
              session.session_participants.map(async (participant) => {
                const answers = await prisma.answers.findMany({
                  where: { session_participant_id: participant.id }
                })
                
                const totalAnswers = answers.length
                const correctAnswers = answers.filter(a => a.is_correct).length
                const totalTimeTaken = answers.reduce((sum, a) => sum + (a.time_taken || 0), 0)
                const averageTimeTaken = totalAnswers > 0 ? totalTimeTaken / totalAnswers : 0
                const totalPointsEarned = answers.reduce((sum, a) => sum + (a.points_awarded || 0), 0)
                const fastestAnswer = answers.length > 0 ? Math.min(...answers.map(a => a.time_taken || 0)) : 0
                const slowestAnswer = answers.length > 0 ? Math.max(...answers.map(a => a.time_taken || 0)) : 0
                
                return {
                  id: participant.id,
                  username: participant.users.username,
                  score: participant.score || 0,
                  streak: participant.streak || 0,
                  accuracy: participant.accuracy || 0,
                  team: participant.team,
                  totalAnswers,
                  correctAnswers,
                  totalTimeTaken,
                  averageTimeTaken,
                  totalPointsEarned,
                  fastestAnswer,
                  slowestAnswer
                }
              })
            )

            sendEvent({
              type: 'session_update',
              session: {
                id: session.id,
                status: session.status,
                quiz_status: session.quizzes.status,
                participants_count: session.session_participants?.length || 0
              },
              participants: participantsWithStats,
              timestamp: Date.now()
            })
          } else {
            sendEvent({
              type: 'session_not_found',
              message: 'Session not found',
              timestamp: Date.now()
            })
          }
        } catch (error) {
          console.error('Error checking session status:', error)
          if (isConnected) {
            sendEvent({
              type: 'error',
              message: 'Failed to check session status',
              timestamp: Date.now()
            })
          }
        }
      }

      // Send initial status
      await checkSessionStatus()

      // Set up interval to check status every 2 seconds (reduced frequency)
      const statusInterval = setInterval(async () => {
        if (isConnected) {
          await checkSessionStatus()
        }
      }, 2000)

      // Send heartbeat every 30 seconds to keep connection alive
      const heartbeatInterval = setInterval(() => {
        if (isConnected) {
          sendHeartbeat()
        }
      }, 30000)

      // Clean up function
      const cleanup = () => {
        isConnected = false
        clearInterval(statusInterval)
        clearInterval(heartbeatInterval)
        try {
          controller.close()
        } catch (error) {
          console.log('Controller already closed')
        }
      }

      // Handle client disconnect
      req.signal.addEventListener('abort', cleanup)

      // Handle request close
      req.signal.addEventListener('close', cleanup)
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control',
      'X-Accel-Buffering': 'no' // Disable nginx buffering
    }
  })
} 