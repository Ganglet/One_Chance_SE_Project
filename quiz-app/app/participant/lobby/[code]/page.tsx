"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, User, Clock, Trophy, UserCheck, Loader2 } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

interface Participant {
  id: string
  name: string
  joinedAt: string
  status: "waiting" | "ready"
}

export default function ParticipantLobby() {
  const params = useParams()
  const router = useRouter()
  const [participants, setParticipants] = useState<Participant[]>([])
  const [playerName, setPlayerName] = useState("")
  const [hasJoined, setHasJoined] = useState(false)
  const [loading, setLoading] = useState(true)
  const [joining, setJoining] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionInfo, setSessionInfo] = useState<any>(null)
  const [participantCount, setParticipantCount] = useState(0)

  const joinCode = params.code as string

  // Check if session exists and get initial data
  useEffect(() => {
    async function checkSession() {
      try {
        if (!joinCode) {
          setError("No join code provided")
          setLoading(false)
          return
        }

        console.log("Checking session with code:", joinCode)
        
        // Fetch session details
        const res = await fetch(`/api/sessions?code=${joinCode}`)
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}))
          throw new Error(`Session not found: ${errorData.error || res.statusText}`)
        }
        
        const data = await res.json()
        console.log("Session data:", data)
        
        if (data.session.status === "completed" || data.session.status === "paused") {
          // Redirect to review page if session is completed or paused
          router.push(`/participant/review/${joinCode}`)
          return
        }
        
        setSessionInfo(data.session)
        
        // Check if this is a team quiz and redirect to team lobby
        const quizRes = await fetch(`/api/quizzes/${data.session.quiz_id}`)
        if (quizRes.ok) {
          const quizData = await quizRes.json()
          const quiz = quizData.quiz || quizData
          
          if (quiz?.is_team_quiz || quiz?.team_mode) {
            // Redirect to team lobby
            router.push(`/participant/team-lobby/${joinCode}`)
            return
          }
        }
        
        // Fetch current participants
        const pres = await fetch(`/api/sessions/participants?code=${joinCode}`)
        if (pres.ok) {
          const pdata = await pres.json()
          console.log("Participants data:", pdata)
          const transformedParticipants = pdata.participants.map((p: any) => ({
            id: p.users.id.toString(),
            name: p.users.username,
            joinedAt: p.joined_at || new Date().toISOString(),
            status: "waiting" as const
          }))
          setParticipants(transformedParticipants)
          setParticipantCount(transformedParticipants.length)
        }
        
        setLoading(false)
        setError(null)
      } catch (err) {
        console.error("Error checking session:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        setLoading(false)
      }
    }
    
    checkSession()
  }, [joinCode])

  // Poll for session status and participants
  useEffect(() => {
    if (!hasJoined || !joinCode) return

    const interval = setInterval(async () => {
      try {
        // Check if session has started
        const sessionRes = await fetch(`/api/sessions?code=${joinCode}`)
        if (sessionRes.ok) {
          const sessionData = await sessionRes.json()
          if (sessionData.session.status === "active") {
            // Redirect to quiz page
            router.push(`/participant/quiz/${joinCode}?name=${encodeURIComponent(playerName)}`)
            return
          } else if (sessionData.session.status === "completed" || sessionData.session.status === "paused") {
            // Redirect to review page if session is completed or paused
            router.push(`/participant/review/${joinCode}?name=${encodeURIComponent(playerName)}`)
            return
          }
        }

        // Fetch updated participants
        const pres = await fetch(`/api/sessions/participants?code=${joinCode}`)
        if (pres.ok) {
          const pdata = await pres.json()
          const transformedParticipants = pdata.participants.map((p: any) => ({
            id: p.users.id.toString(),
            name: p.users.username,
            joinedAt: p.joined_at || new Date().toISOString(),
            status: "waiting" as const
          }))
          setParticipants(transformedParticipants)
          setParticipantCount(transformedParticipants.length)
        }
      } catch (error) {
        console.error("Error polling session:", error)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [hasJoined, joinCode, playerName, router])

  useEffect(() => {
    // Load username from localStorage as a default value but allow editing
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('username') || ''
      setPlayerName(stored)
    }
  }, [])

  const handleJoinLobby = async () => {
    if (!playerName.trim()) {
      setError("Please enter your name to join.")
      return
    }

    setJoining(true)
    setError(null)

    try {
      // Join the session
      const res = await fetch("/api/sessions/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          code: joinCode, 
          username: playerName.trim() 
        })
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to join session")
      }

      const data = await res.json()
      console.log("Joined session:", data)
      
      setHasJoined(true)
      
      // Add current user to participants list
      const newParticipant: Participant = {
        id: data.userId?.toString() || Date.now().toString(),
        name: playerName.trim(),
        joinedAt: new Date().toISOString(),
        status: "waiting"
      }
      
      setParticipants(prev => [...prev, newParticipant])
      setParticipantCount(prev => prev + 1)
      
    } catch (err) {
      console.error("Error joining session:", err)
      setError(err instanceof Error ? err.message : "Failed to join session")
    } finally {
      setJoining(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
          <p className="mt-4 text-lg">Loading lobby...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <Button onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 fade-in-up">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 slide-in-left">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Quiz Lobby</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join Code: <span className="font-mono font-bold text-lg">{joinCode}</span>
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!hasJoined ? (
            <Card className="card-hover fade-in-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 scale-in">
                  <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-2xl">Join Quiz Session</CardTitle>
                <CardDescription>Enter your name to join the quiz lobby</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="playerName" className="text-sm font-medium">
                    Your Name
                  </label>
                  <Input
                    id="playerName"
                    placeholder="Enter your name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                  />
                </div>
                <Button onClick={handleJoinLobby} disabled={joining || !playerName.trim()} className="w-full" size="lg">
                  {joining ? 'Joining...' : 'Join Lobby'}
                </Button>
              </CardContent>
            </Card>
          ) : (
            /* Waiting Room */
            <Card className="card-hover fade-in-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <UserCheck className="w-5 h-5 text-green-600" />
                  Welcome, {playerName}!
                </CardTitle>
                <CardDescription>
                  You've successfully joined the quiz lobby. Wait for the host to start the quiz.
                </CardDescription>
              </CardHeader>

              {/* Participants List */}
              <Card className="card-hover fade-in-up" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Participants ({participantCount})
                  </CardTitle>
                  <CardDescription>
                    Other participants in the lobby
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {participantCount === 0 ? (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">No other participants yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {participants.map((participant, index) => (
                        <div
                          key={participant.id}
                          className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                            participant.name === playerName
                              ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                              : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                          style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            participant.name === playerName
                              ? "bg-blue-100 dark:bg-blue-900"
                              : "bg-gray-100 dark:bg-gray-700"
                          }`}>
                            <span className={`text-sm font-bold ${
                              participant.name === playerName
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-gray-600 dark:text-gray-400"
                            }`}>
                              {index + 1}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900 dark:text-white">
                                {participant.name}
                              </span>
                              {participant.name === playerName && (
                                <Badge variant="secondary" className="text-xs">
                                  You
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              Joined {new Date(participant.joinedAt).toLocaleTimeString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              <UserCheck className="w-3 h-3 mr-1" />
                              Ready
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Status Card */}
              <Card className="card-hover fade-in-up" style={{ animationDelay: '0.4s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Session Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-blue-900 dark:text-blue-100">Waiting for Host</span>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      The host will start the quiz when ready. You'll be automatically redirected when the quiz begins.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Participants</span>
                      <span className="font-bold">{participantCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Your Position</span>
                      <span className="font-bold text-blue-600">
                        {participants.findIndex(p => p.name === playerName) + 1}
                      </span>
                    </div>
                  </div>

                  <Progress value={100} className="h-2" />

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Waiting for quiz to start...
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
} 