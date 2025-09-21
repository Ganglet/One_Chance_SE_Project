"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Play, X, Trophy, Clock, UserCheck, UserX, Shield, Zap, Target } from "lucide-react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface Participant {
  id: string
  name: string
  joinedAt: string
  status: "waiting" | "ready"
  team?: string
}

interface Team {
  id: string
  name: string
  color: string
  members: string[]
  maxMembers: number
}

export default function HostTeamLobby() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const [participants, setParticipants] = useState<Participant[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [joinCode, setJoinCode] = useState<string>("")
  const [sessionId, setSessionId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quizTitle, setQuizTitle] = useState<string>("")
  const [participantCount, setParticipantCount] = useState(0)

  // Fetch session and participants on mount
  useEffect(() => {
    async function fetchSession() {
      try {
        const code = searchParams.get("code")
        if (!code) {
          setError("No session code provided")
          setLoading(false)
          return
        }

        console.log("Fetching team session with code:", code)
        
        // Fetch session details
        const res = await fetch(`/api/sessions?code=${code}`)
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}))
          throw new Error(`Failed to fetch session: ${res.status} ${errorData.error || res.statusText}`)
        }
        
        const data = await res.json()
        console.log("Session data:", data)
        
        setJoinCode(data.session.code)
        setSessionId(data.session.id)

        // Fetch quiz details
        const quizRes = await fetch(`/api/quizzes/${data.session.quiz_id}`)
        if (quizRes.ok) {
          const quizData = await quizRes.json()
          const quiz = quizData.quiz || quizData
          setQuizTitle(quiz?.title || 'Team Quiz')
          
          // Set up teams from quiz data
          if (quiz?.teams && Array.isArray(quiz.teams)) {
            const mappedTeams = quiz.teams.map((team: any) => ({
              id: team.id.toString(),
              name: team.name,
              color: team.color,
              members: [], // Will be populated from participants
              maxMembers: team.max_members
            }))
            setTeams(mappedTeams)
          }
        }
        
        // Fetch participants
        const pres = await fetch(`/api/sessions/participants?code=${data.session.code}`)
        if (pres.ok) {
          const pdata = await pres.json()
          console.log("Participants data:", pdata)
          // Filter out anonymous/empty/null usernames
          const transformedParticipants = pdata.participants
            .map((p: any) => ({
              id: p.users.id.toString(),
              name: p.users.username,
              joinedAt: p.joined_at || new Date().toISOString(),
              status: "waiting" as const,
              team: p.team || null
            }))
            .filter((p: any) => p.name && p.name.trim() !== '' && p.name.toLowerCase() !== 'anonymous')
          setParticipants(transformedParticipants)
          setParticipantCount(transformedParticipants.length)
          // Update teams with member information
          setTeams(prevTeams => 
            prevTeams.map(team => ({
              ...team,
              members: transformedParticipants
                .filter((p: Participant) => p.team === team.name)
                .map((p: Participant) => p.name)
            }))
          )
        } else {
          console.error("Failed to fetch participants:", pres.status, pres.statusText)
        }
        
        setLoading(false)
        setError(null)
      } catch (err) {
        console.error("Error in fetchSession:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        setLoading(false)
      }
    }
    
    fetchSession()
    // Poll for new participants every 8 seconds
    const interval = setInterval(fetchSession, 8000)
    return () => clearInterval(interval)
  }, [searchParams])

  const handleStartQuiz = async () => {
    if (!joinCode) return
    
    // Check if all participants have joined a team
    const participantsWithoutTeam = participants.filter(p => !p.team)
    if (participantsWithoutTeam.length > 0) {
      toast({
        title: "Cannot Start Quiz",
        description: `All participants must join a team first. ${participantsWithoutTeam.length} participant(s) still need to join a team.`,
        variant: "destructive",
      })
      return
    }
    
    // Check if at least one team has members (changed from requiring all teams to have members)
    const teamsWithMembers = teams.filter(t => t.members.length > 0)
    if (teamsWithMembers.length === 0) {
      toast({
        title: "Cannot Start Quiz",
        description: "At least one team must have members to start the quiz.",
        variant: "destructive",
      })
      return
    }
    
    try {
      // Update session status to active
      const res = await fetch("/api/sessions/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: joinCode, status: "active" })
      })
      
      if (res.ok) {
        // Redirect to team session page
        router.push(`/host/quiz/${params.id}/team-session?code=${joinCode}`)
      } else {
        alert("Failed to start team quiz")
      }
    } catch (error) {
      console.error("Error starting team quiz:", error)
      alert("Failed to start team quiz")
    }
  }

  const handleStopQuiz = async () => {
    if (!joinCode) return
    
    if (!confirm("Are you sure you want to stop this team quiz session? You can restart it later from the dashboard.")) {
      return
    }
    
    try {
      // First, get the quiz ID from the session
      const sessionRes = await fetch(`/api/sessions?code=${joinCode}`)
      if (!sessionRes.ok) {
        throw new Error("Failed to fetch session details")
      }
      const sessionData = await sessionRes.json()
      const quizId = sessionData.session.quiz_id

      // Update session status to completed
      const sessionUpdateRes = await fetch("/api/sessions/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: joinCode, status: "completed" })
      })
      
      if (!sessionUpdateRes.ok) {
        throw new Error("Failed to update session status")
      }

      // Update quiz status to stopped
      const quizUpdateRes = await fetch(`/api/quizzes/${quizId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "stopped" })
      })
      
      if (!quizUpdateRes.ok) {
        console.warn("Failed to update quiz status, but session was stopped")
      }
      
      // Redirect back to host dashboard
      router.push("/host/dashboard")
    } catch (error) {
      console.error("Error stopping team quiz:", error)
      alert("Failed to stop team quiz")
    }
  }

  const handleTerminateQuiz = async () => {
    if (!joinCode) return
    
    if (!confirm("Are you sure you want to terminate this team quiz session? This action cannot be undone.")) {
      return
    }
    
    try {
      // First, get the quiz ID from the session
      const sessionRes = await fetch(`/api/sessions?code=${joinCode}`)
      if (!sessionRes.ok) {
        throw new Error("Failed to fetch session details")
      }
      const sessionData = await sessionRes.json()
      const quizId = sessionData.session.quiz_id

      // Update session status to completed
      const sessionUpdateRes = await fetch("/api/sessions/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: joinCode, status: "completed" })
      })
      
      if (!sessionUpdateRes.ok) {
        throw new Error("Failed to update session status")
      }

      // Update quiz status to terminated
      const quizUpdateRes = await fetch(`/api/quizzes/${quizId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "terminated" })
      })
      
      if (!quizUpdateRes.ok) {
        console.warn("Failed to update quiz status, but session was terminated")
      }
      
      // Redirect back to host dashboard
      router.push("/host/dashboard")
    } catch (error) {
      console.error("Error terminating team quiz:", error)
      alert("Failed to terminate team quiz")
    }
  }

  const handleCopyCode = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(joinCode)
        toast({
          title: "Code copied!",
          description: "Team quiz join code has been copied to clipboard.",
          variant: "success",
        })
      } else {
        const textArea = document.createElement("textarea")
        textArea.value = joinCode
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        textArea.style.top = "-999999px"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        
        try {
          document.execCommand('copy')
          toast({
            title: "Code copied!",
            description: "Team quiz join code has been copied to clipboard.",
            variant: "success",
          })
        } catch (err) {
          console.error('Fallback copy failed:', err)
          toast({
            title: "Copy failed",
            description: `Join code: ${joinCode}\n\nPlease copy this code manually.`,
            variant: "destructive",
          })
        }
        
        document.body.removeChild(textArea)
      }
    } catch (err) {
      console.error('Copy failed:', err)
      toast({
        title: "Copy failed",
        description: `Join code: ${joinCode}\n\nPlease copy this code manually.`,
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-white">Loading team quiz lobby...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error Loading Team Quiz Lobby</h1>
          <p className="text-white mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 fade-in-up">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 slide-in-left">
          <div>
            <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              Team Quiz Lobby
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {quizTitle || "Team Quiz Session"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Join Code</p>
              <p className="text-2xl font-mono font-bold bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-blue-500 text-blue-600 dark:text-blue-400">
                {joinCode}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Join Code Card */}
            <Card className="card-hover fade-in-up bg-white border-gray-200 shadow-lg" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Team Quiz Join Code
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Share this code with team members to join the competitive quiz
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="p-4 rounded-lg bg-gray-100 border border-gray-300">
                      <span className="font-mono text-2xl font-bold text-center block text-gray-900">
                        {joinCode}
                      </span>
                    </div>
                  </div>
                  <Button 
                    onClick={handleCopyCode} 
                    variant="outline" 
                    className="transition-element border-blue-500 text-blue-600 hover:bg-blue-50"
                  >
                    Copy Code
                  </Button>
                </div>
                <p className="text-sm mt-2 text-gray-600">
                  Team members can join by entering this code at the dashboard
                </p>
              </CardContent>
            </Card>

            {/* Teams Overview */}
            <Card className="card-hover fade-in-up bg-white border-gray-200 shadow-lg" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Users className="w-5 h-5 text-blue-600" />
                  Teams Overview
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Monitor team formation and member distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {teams.map((team, index) => (
                    <div
                      key={team.id}
                      className="p-4 rounded-lg border border-gray-300 bg-gray-50"
                      style={{ 
                        borderColor: team.color,
                        boxShadow: `0 0 10px ${team.color}20`
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900" style={{ color: team.color }}>
                          {team.name}
                        </h3>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          {team.members.length}/{team.maxMembers}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        {Array.from({ length: team.maxMembers }).map((_, memberIndex) => (
                          <div
                            key={memberIndex}
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                              memberIndex < team.members.length
                                ? 'bg-green-500 border-green-400 text-white shadow-lg'
                                : 'bg-gray-300 border-gray-400 text-gray-600'
                            }`}
                          >
                            {memberIndex < team.members.length ? team.members[memberIndex].charAt(0).toUpperCase() : '?'}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Participants List */}
            <Card className="card-hover fade-in-up bg-white border-gray-200 shadow-lg" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Users className="w-5 h-5 text-blue-600" />
                  Participants ({participantCount})
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Team members who have joined the lobby
                </CardDescription>
              </CardHeader>
              <CardContent>
                {participantCount === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">No team members yet</h3>
                    <p className="text-gray-600">
                      Share the join code with team members to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {participants.map((participant, index) => (
                      <div
                        key={participant.id}
                        className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 bg-gray-50 border border-gray-200 hover:bg-gray-100"
                        style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {participant.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            Joined {new Date(participant.joinedAt).toLocaleTimeString()}
                            {participant.team && ` • Team: ${participant.team}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 border-green-200">
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
          </div>

          {/* Control Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 card-hover fade-in-up bg-white border-gray-200 shadow-lg" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Trophy className="w-5 h-5 text-blue-600" />
                  Team Host Controls
                </CardTitle>
                <CardDescription className="text-gray-600">Manage the competitive team quiz session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Session Status */}
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-gray-900">Session Status</span>
                  </div>
                  <Badge variant="default" className="bg-blue-600 text-white">
                    Waiting for Teams
                  </Badge>
                </div>

                {/* Team Stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Joined</span>
                    <span className="font-bold text-gray-900">{participantCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Teams Ready</span>
                    <span className="font-bold text-blue-600">{teams.filter(t => t.members.length > 0).length}/{teams.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">All Participants in Teams</span>
                    <span className="font-bold text-blue-600">{participants.filter(p => p.team).length}/{participantCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Ready to Start</span>
                    <span className="font-bold text-blue-600">
                      {participantCount > 0 && participants.filter(p => p.team).length === participantCount && teams.filter(t => t.members.length > 0).length > 0 ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>

                <Progress value={
                  participantCount > 0 
                    ? Math.min(100, (participants.filter(p => p.team).length / participantCount) * 100)
                    : 0
                } className="h-2 [&>div]:bg-blue-500" />

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button 
                    onClick={handleStartQuiz} 
                    className="w-full transition-element bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    size="lg"
                    disabled={
                      participantCount === 0 || 
                      participants.filter(p => p.team).length !== participantCount ||
                      teams.filter(t => t.members.length > 0).length === 0
                    }
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Team Quiz
                  </Button>
                  
                  <Button 
                    onClick={handleStopQuiz} 
                    variant="outline" 
                    className="w-full transition-element border-gray-300 text-gray-700 hover:bg-gray-50"
                    size="lg"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Stop Quiz
                  </Button>

                  <Button 
                    onClick={handleTerminateQuiz} 
                    variant="destructive" 
                    className="w-full transition-element"
                    size="lg"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Terminate Quiz
                  </Button>
                </div>

                {/* Instructions */}
                <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <h4 className="font-medium mb-2 text-gray-900">Team Quiz Instructions</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Share the join code with team members</li>
                    <li>• Wait for teams to form and join</li>
                    <li>• Monitor team member distribution</li>
                    <li>• Click "Start Team Quiz" when ready</li>
                    <li>• Teams will compete for points</li>
                    <li>• Use "Stop Quiz" to pause and restart later</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 