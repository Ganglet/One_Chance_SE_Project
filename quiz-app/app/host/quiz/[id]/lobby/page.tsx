"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Play, X, Trophy, Clock, UserCheck, UserX, Shield } from "lucide-react"
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

export default function HostLobby() {
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
  const [isTeamQuiz, setIsTeamQuiz] = useState(false)

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

        console.log("Fetching session with code:", code)
        
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
          // Handle both formats: direct quiz object or wrapped in quiz property
          const quiz = quizData.quiz || quizData
          setQuizTitle(quiz?.title || 'Quiz')
          setIsTeamQuiz(quiz?.team_mode || false)
          
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
          const transformedParticipants = pdata.participants.map((p: any) => ({
            id: p.users.id.toString(),
            name: p.users.username,
            joinedAt: p.joined_at || new Date().toISOString(),
            status: "waiting" as const,
            team: p.team || null
          }))
          setParticipants(transformedParticipants)
          setParticipantCount(transformedParticipants.length)
          
          // Update teams with member information
          setTeams(prevTeams => 
            prevTeams.map(team => ({
              ...team,
              members: transformedParticipants
                .filter(p => p.team === team.name)
                .map(p => p.name)
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
    // Poll for new participants every 8 seconds (reduced frequency)
    const interval = setInterval(fetchSession, 8000)
    return () => clearInterval(interval)
  }, [searchParams])

  const handleStartQuiz = async () => {
    if (!joinCode) return
    
    try {
      // Update session status to active
      const res = await fetch("/api/sessions/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: joinCode, status: "active" })
      })
      
      if (res.ok) {
        // Redirect to appropriate session page based on quiz type
        if (isTeamQuiz) {
          router.push(`/host/quiz/${params.id}/team-session?code=${joinCode}`)
        } else {
          router.push(`/host/quiz/${params.id}/session?code=${joinCode}`)
        }
      } else {
        alert("Failed to start quiz")
      }
    } catch (error) {
      console.error("Error starting quiz:", error)
      alert("Failed to start quiz")
    }
  }

  const handleStopQuiz = async () => {
    if (!joinCode) return
    
    if (!confirm("Are you sure you want to stop this quiz session? You can restart it later from the dashboard.")) {
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
      console.error("Error stopping quiz:", error)
      alert("Failed to stop quiz")
    }
  }

  const handleTerminateQuiz = async () => {
    if (!joinCode) return
    
    if (!confirm("Are you sure you want to terminate this quiz session? This action cannot be undone.")) {
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
      console.error("Error terminating quiz:", error)
      alert("Failed to terminate quiz")
    }
  }

  const handleCopyCode = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(joinCode)
        toast({
          title: "Code copied!",
          description: "Join code has been copied to clipboard.",
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
            description: "Join code has been copied to clipboard.",
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-900">Loading quiz lobby...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Quiz Lobby</h1>
          <p className="text-gray-700 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 fade-in-up">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 slide-in-left">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isTeamQuiz ? 'Team Quiz Lobby' : 'Quiz Lobby'}
            </h1>
            <p className="mt-2 text-gray-600">
              {quizTitle || "Quiz Session"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Join Code</p>
              <p className="text-2xl font-mono font-bold text-gray-900">
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
                  {isTeamQuiz ? 'Team Quiz Join Code' : 'Quiz Join Code'}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Share this code with {isTeamQuiz ? 'team members' : 'participants'} to join the quiz
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
                  {isTeamQuiz ? 'Team members' : 'Participants'} can join by entering this code at the dashboard
                </p>
              </CardContent>
            </Card>

            {/* Teams Overview (for team quizzes) */}
            {isTeamQuiz && teams.length > 0 && (
              <Card className="card-hover fade-in-up bg-white border-gray-200 shadow-lg" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Tournament Team Management
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    BGMI-style tournament lobby - Drag participants to teams or click to assign
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Tournament Grid Layout */}
                  <div className="space-y-6">
                    {/* Teams Grid */}
                    <div className="grid grid-cols-2 gap-6">
                      {teams.map((team, teamIndex) => (
                        <div
                          key={team.id}
                          className="p-6 rounded-xl border-2 border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100"
                          style={{ 
                            borderColor: team.color,
                            boxShadow: `0 4px 20px ${team.color}30`
                          }}
                        >
                          {/* Team Header */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                                style={{ backgroundColor: team.color }}
                              >
                                {teamIndex + 1}
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900" style={{ color: team.color }}>
                                  {team.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {team.members.length}/{team.maxMembers} Members
                                </p>
                              </div>
                            </div>
                            <Badge className={`text-sm font-semibold ${
                              team.members.length === team.maxMembers 
                                ? 'bg-green-100 text-green-800 border-green-200' 
                                : 'bg-blue-100 text-blue-800 border-blue-200'
                            }`}>
                              {team.members.length === team.maxMembers ? 'Full' : 'Open'}
                            </Badge>
                          </div>

                          {/* Team Members Grid */}
                          <div className="grid grid-cols-2 gap-3">
                            {Array.from({ length: team.maxMembers }).map((_, memberIndex) => {
                              const member = team.members[memberIndex]
                              const participant = participants.find(p => p.name === member)
                              
                              return (
                                <div
                                  key={memberIndex}
                                  className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-200 ${
                                    member 
                                      ? 'border-green-400 bg-green-50 shadow-md' 
                                      : 'border-gray-300 bg-gray-200 border-dashed'
                                  }`}
                                  style={{
                                    borderColor: member ? team.color : undefined,
                                    boxShadow: member ? `0 2px 10px ${team.color}40` : undefined
                                  }}
                                >
                                  {member ? (
                                    <>
                                      <div 
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mb-1"
                                        style={{ backgroundColor: team.color }}
                                      >
                                        {member.charAt(0).toUpperCase()}
                                      </div>
                                      <p className="text-xs font-medium text-gray-900 text-center truncate w-full px-1">
                                        {member}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {participant ? new Date(participant.joinedAt).toLocaleTimeString() : ''}
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mb-1">
                                        <span className="text-gray-500 text-sm">?</span>
                                      </div>
                                      <p className="text-xs text-gray-500 text-center">Empty Slot</p>
                                    </>
                                  )}
                                </div>
                              )
                            })}
                          </div>

                          {/* Team Stats */}
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Ready:</span>
                              <span className="font-semibold text-green-600">
                                {team.members.length}/{team.maxMembers}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div 
                                className="h-2 rounded-full transition-all duration-300"
                                style={{ 
                                  width: `${(team.members.length / team.maxMembers) * 100}%`,
                                  backgroundColor: team.color
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Unassigned Participants */}
                    {participants.filter(p => !p.team).length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Unassigned Participants</h4>
                        <div className="grid grid-cols-4 gap-3">
                          {participants.filter(p => !p.team).map((participant, index) => (
                            <div
                              key={participant.id}
                              className="p-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center"
                            >
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                                <span className="text-blue-600 font-bold text-sm">
                                  {index + 1}
                                </span>
                              </div>
                              <p className="text-sm font-medium text-gray-900 text-center truncate w-full">
                                {participant.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(participant.joinedAt).toLocaleTimeString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">Quick Actions</h4>
                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-blue-300 text-blue-700 hover:bg-blue-100"
                          onClick={() => {
                            // Auto-assign participants to teams
                            const unassigned = participants.filter(p => !p.team)
                            const availableTeams = teams.filter(t => t.members.length < t.maxMembers)
                            
                            if (unassigned.length > 0 && availableTeams.length > 0) {
                              toast({
                                title: "Auto-assignment",
                                description: "Feature coming soon! Participants can join teams manually.",
                                variant: "default",
                              })
                            }
                          }}
                        >
                          Auto-Assign Teams
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-green-300 text-green-700 hover:bg-green-100"
                          onClick={() => {
                            toast({
                              title: "Team Management",
                              description: "Participants can join teams from their lobby. Host can monitor here.",
                              variant: "default",
                            })
                          }}
                        >
                          View Team Instructions
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Participants List */}
            <Card className="card-hover fade-in-up bg-white border-gray-200 shadow-lg" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Users className="w-5 h-5 text-blue-600" />
                  Participants ({participantCount})
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {isTeamQuiz ? 'Team members' : 'Participants'} who have joined the lobby
                </CardDescription>
              </CardHeader>
              <CardContent>
                {participantCount === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">No {isTeamQuiz ? 'team members' : 'participants'} yet</h3>
                    <p className="text-gray-600">
                      Share the join code with {isTeamQuiz ? 'team members' : 'participants'} to get started
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
                            {isTeamQuiz && participant.team && ` • Team: ${participant.team}`}
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
                  {isTeamQuiz ? 'Team Host Controls' : 'Host Controls'}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Manage the {isTeamQuiz ? 'team ' : ''}quiz session
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Session Status */}
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-gray-900">Session Status</span>
                  </div>
                  <Badge variant="default" className="bg-blue-600 text-white">
                    Waiting for {isTeamQuiz ? 'Teams' : 'Participants'}
                  </Badge>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Joined</span>
                    <span className="font-bold text-gray-900">{participantCount}</span>
                  </div>
                  {isTeamQuiz && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Teams Ready</span>
                        <span className="font-bold text-blue-600">{teams.filter(t => t.members.length > 0).length}/{teams.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Ready to Start</span>
                        <span className="font-bold text-blue-600">{participantCount > 0 ? 'Yes' : 'No'}</span>
                      </div>
                    </>
                  )}
                </div>

                <Progress value={participantCount > 0 ? 100 : 0} className="h-2 [&>div]:bg-blue-500" />

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button 
                    onClick={handleStartQuiz} 
                    className="w-full transition-element bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    size="lg"
                    disabled={participantCount === 0}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start {isTeamQuiz ? 'Team ' : ''}Quiz
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
                  <h4 className="font-medium mb-2 text-gray-900">{isTeamQuiz ? 'Team Quiz' : 'Quiz'} Instructions</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Share the join code with {isTeamQuiz ? 'team members' : 'participants'}</li>
                    {isTeamQuiz && <li>• Wait for teams to form and join</li>}
                    {isTeamQuiz && <li>• Monitor team member distribution</li>}
                    <li>• Click "Start {isTeamQuiz ? 'Team ' : ''}Quiz" when ready</li>
                    <li>• {isTeamQuiz ? 'Teams will compete for points' : 'Participants will answer questions'}</li>
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