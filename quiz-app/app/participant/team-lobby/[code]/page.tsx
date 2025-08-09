"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, User, Clock, Trophy, UserCheck, Loader2, Shield } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
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

export default function TeamParticipantLobby() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [participants, setParticipants] = useState<Participant[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [playerName, setPlayerName] = useState("")
  const [hasJoined, setHasJoined] = useState(false)
  const [loading, setLoading] = useState(true)
  const [joining, setJoining] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionInfo, setSessionInfo] = useState<any>(null)
  const [participantCount, setParticipantCount] = useState(0)
  const [currentTeam, setCurrentTeam] = useState<string | null>(null)

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

        console.log("Checking team session with code:", joinCode)
        
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
          router.push(`/participant/review/${joinCode}?name=${encodeURIComponent(playerName)}`)
          return
        }
        
        setSessionInfo(data.session)
        
        // Fetch quiz details to get teams
        const quizRes = await fetch(`/api/quizzes/${data.session.quiz_id}`)
        if (quizRes.ok) {
          const quizData = await quizRes.json()
          const quiz = quizData.quiz || quizData
          
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
        
        // Fetch current participants
        const pres = await fetch(`/api/sessions/participants?code=${joinCode}`)
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
            // Redirect to team quiz page
            router.push(`/participant/team-quiz/${joinCode}?name=${encodeURIComponent(playerName)}`)
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
        }
      } catch (error) {
        console.error("Error polling session:", error)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [hasJoined, joinCode, playerName, router])

  const handleJoinLobby = async () => {
    if (!playerName.trim()) {
      setError("Please enter your name")
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

  const handleJoinTeam = async (teamName: string) => {
    if (!hasJoined || !playerName) return

    try {
      // Update participant's team
      const res = await fetch("/api/sessions/participants/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          code: joinCode, 
          username: playerName,
          team: teamName
        })
      })

      if (res.ok) {
        setCurrentTeam(teamName)
        toast({
          title: "Team joined!",
          description: `You have joined ${teamName}`,
          variant: "success",
        })
        
        // Update local participants list
        setParticipants(prev => 
          prev.map(p => 
            p.name === playerName 
              ? { ...p, team: teamName }
              : p
          )
        )
      } else {
        toast({
          title: "Failed to join team",
          description: "Please try again",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error joining team:", error)
      toast({
        title: "Failed to join team",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-white">Loading team lobby...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error</h1>
          <p className="text-white mb-4">{error}</p>
          <Button onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 fade-in-up">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 slide-in-left">
          <h1 className="text-3xl font-bold text-cyan-500 mb-2" style={{ color: '#06b6d4' }}>Team Quiz Lobby</h1>
          <p className="text-gray-300 text-lg">
            Join Code: <span className="font-mono font-bold text-xl bg-gray-800 px-3 py-2 rounded-lg border" style={{ color: '#06b6d4', borderColor: '#06b6d4' }}>{joinCode}</span>
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!hasJoined ? (
            /* Join Form */
            <Card className="card-hover fade-in-up bg-white border-gray-200 shadow-lg" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 scale-in">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Join Team Quiz Session</CardTitle>
                <CardDescription className="text-gray-600">
                  Enter your name to join the team quiz lobby
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="playerName" className="text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <Input
                    id="playerName"
                    placeholder="Enter your name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="text-center text-lg transition-element"
                    maxLength={20}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleJoinLobby()
                      }
                    }}
                  />
                </div>
                
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <Button 
                  onClick={handleJoinLobby} 
                  className="w-full transition-element" 
                  size="lg"
                  disabled={!playerName.trim() || joining}
                >
                  {joining ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      <Users className="w-4 h-4 mr-2" />
                      Join Team Lobby
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ) : (
            /* Lobby View */
            <div className="space-y-6">
              {/* Welcome Card */}
              <Card className="card-hover fade-in-up bg-white border-gray-200 shadow-lg" style={{ animationDelay: '0.1s' }}>
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2 text-gray-900">
                    <UserCheck className="w-5 h-5 text-green-600" />
                    Welcome, {playerName}!
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    You've successfully joined the team quiz lobby. Choose your team and wait for the host to start the quiz.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Teams Selection */}
              <Card className="card-hover fade-in-up bg-white border-gray-200 shadow-lg" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Tournament Teams
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Click on a team to join. You can change teams anytime before the quiz starts.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* BGMI Tournament Style Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    {teams.map((team, teamIndex) => (
                      <div
                        key={team.id}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                          currentTeam === team.name
                            ? 'border-green-500 bg-green-50 shadow-lg'
                            : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md'
                        }`}
                        style={{ 
                          borderColor: currentTeam === team.name ? undefined : (team.color === '#00ffff' || team.color === 'cyan' ? '#3b82f6' : team.color),
                          boxShadow: currentTeam === team.name ? `0 8px 25px ${team.color}40` : `0 4px 15px ${(team.color === '#00ffff' || team.color === 'cyan' ? '#3b82f6' : team.color)}20`
                        }}
                        onClick={() => handleJoinTeam(team.name)}
                      >
                        {/* Team Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                              style={{ backgroundColor: team.color === '#00ffff' || team.color === 'cyan' ? '#3b82f6' : team.color }}
                            >
                              {teamIndex + 1}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900" style={{ color: team.color === '#00ffff' || team.color === 'cyan' ? '#3b82f6' : team.color }}>
                                {team.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {team.members.length}/{team.maxMembers} Members
                              </p>
                            </div>
                          </div>
                          <Badge className={`text-sm font-semibold ${
                            currentTeam === team.name
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : team.members.length === team.maxMembers 
                                ? 'bg-red-100 text-red-800 border-red-200' 
                                : 'bg-blue-100 text-blue-800 border-blue-200'
                          }`}>
                            {currentTeam === team.name ? 'Your Team' : 
                             team.members.length === team.maxMembers ? 'Full' : 'Join'}
                          </Badge>
                        </div>

                        {/* Team Members Grid - BGMI Style */}
                        <div className="grid grid-cols-2 gap-3">
                          {Array.from({ length: team.maxMembers }).map((_, memberIndex) => {
                            const member = team.members[memberIndex]
                            const isCurrentUser = member === playerName
                            
                            return (
                              <div
                                key={memberIndex}
                                className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-200 ${
                                  member 
                                    ? isCurrentUser
                                      ? 'border-green-500 bg-green-100 shadow-lg'
                                      : 'border-blue-400 bg-blue-50 shadow-md'
                                    : 'border-gray-300 bg-gray-200 border-dashed'
                                }`}
                                style={{
                                  borderColor: member ? (isCurrentUser ? undefined : (team.color === '#00ffff' || team.color === 'cyan' ? '#3b82f6' : team.color)) : undefined,
                                  boxShadow: member ? `0 2px 10px ${(team.color === '#00ffff' || team.color === 'cyan' ? '#3b82f6' : team.color)}40` : undefined
                                }}
                              >
                                {member ? (
                                  <>
                                    <div 
                                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mb-1 ${
                                        isCurrentUser ? 'bg-green-500' : ''
                                      }`}
                                      style={{ backgroundColor: isCurrentUser ? undefined : (team.color === '#00ffff' || team.color === 'cyan' ? '#3b82f6' : team.color) }}
                                    >
                                      {member.charAt(0).toUpperCase()}
                                    </div>
                                    <p className="text-xs font-medium text-gray-900 text-center truncate w-full px-1">
                                      {member}
                                    </p>
                                    {isCurrentUser && (
                                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 border-green-200 mt-1">
                                        You
                                      </Badge>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mb-1">
                                      <span className="text-gray-700 text-sm font-bold">?</span>
                                    </div>
                                    <p className="text-xs text-gray-700 text-center font-medium">Empty</p>
                                  </>
                                )}
                              </div>
                            )
                          })}
                        </div>

                        {/* Team Status */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700 font-medium">Ready:</span>
                            <span className="font-semibold text-green-600">
                              {team.members.length}/{team.maxMembers}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className="h-2 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${(team.members.length / team.maxMembers) * 100}%`,
                                backgroundColor: team.color === '#00ffff' || team.color === 'cyan' ? '#3b82f6' : team.color
                              }}
                            />
                          </div>
                        </div>

                        {/* Join Button for Non-Selected Teams */}
                        {currentTeam !== team.name && team.members.length < team.maxMembers && (
                          <div className="mt-4">
                            <Button 
                              className="w-full transition-all duration-200"
                              style={{ backgroundColor: team.color === '#00ffff' || team.color === 'cyan' ? '#3b82f6' : team.color }}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleJoinTeam(team.name)
                              }}
                            >
                              Join {team.name}
                            </Button>
                          </div>
                        )}

                        {/* Current Team Indicator */}
                        {currentTeam === team.name && (
                          <div className="mt-4 text-center">
                            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                              <UserCheck className="w-3 h-3 mr-1" />
                              Your Team
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Tournament Instructions */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Tournament Instructions</h4>
                    <ul className="text-sm space-y-1 text-blue-800">
                      <li>• Click on any team to join it</li>
                      <li>• You can change teams before the quiz starts</li>
                      <li>• Teams compete against each other for points</li>
                      <li>• Wait for the host to start the tournament</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Participants List */}
              <Card className="card-hover fade-in-up bg-white border-gray-200 shadow-lg" style={{ animationDelay: '0.3s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Users className="w-5 h-5 text-blue-600" />
                    Team Members ({participantCount})
                  </CardTitle>
                  <CardDescription className="text-gray-700">
                    All participants in the lobby
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {participantCount === 0 ? (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-700">No other team members yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Group by teams */}
                      {teams.map((team) => {
                        const teamMembers = participants.filter(p => p.team === team.name)
                        if (teamMembers.length === 0) return null
                        
                        return (
                          <div key={team.id} className="border rounded-lg p-4" style={{ borderColor: team.color === '#00ffff' || team.color === 'cyan' ? '#3b82f6' : team.color }}>
                            <div className="flex items-center gap-2 mb-3">
                              <div 
                                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                                style={{ backgroundColor: team.color === '#00ffff' || team.color === 'cyan' ? '#3b82f6' : team.color }}
                              >
                                {teams.findIndex(t => t.id === team.id) + 1}
                              </div>
                              <h4 className="font-semibold text-gray-900" style={{ color: team.color === '#00ffff' || team.color === 'cyan' ? '#3b82f6' : team.color }}>
                                {team.name} ({teamMembers.length}/{team.maxMembers})
                              </h4>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              {teamMembers.map((participant, index) => (
                                <div
                                  key={`${team.name}-${participant.id}`}
                                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                                    participant.name === playerName
                                      ? "bg-green-50 border border-green-200"
                                      : "bg-gray-50 border border-gray-200"
                                  }`}
                                >
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    participant.name === playerName
                                      ? "bg-green-500 text-white"
                                      : "bg-gray-200 text-gray-700"
                                  }`}>
                                    <span className="text-sm font-bold">
                                      {index + 1}
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium text-gray-900">
                                        {participant.name}
                                      </span>
                                      {participant.name === playerName && (
                                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 border-green-200">
                                          You
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-xs text-gray-700">
                                      Joined {new Date(participant.joinedAt).toLocaleTimeString()}
                                    </p>
                                  </div>
                                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 border-green-200">
                                    <UserCheck className="w-3 h-3 mr-1" />
                                    Ready
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                      
                      {/* Unassigned participants */}
                      {participants.filter(p => !p.team).length > 0 && (
                        <div className="border rounded-lg p-4 border-dashed border-gray-300">
                          <h4 className="font-semibold text-gray-900 mb-3">Unassigned Participants</h4>
                          <div className="grid grid-cols-2 gap-3">
                            {participants.filter(p => !p.team).map((participant, index) => (
                              <div
                                key={`unassigned-${participant.id}`}
                                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                                  participant.name === playerName
                                    ? "bg-blue-50 border border-blue-200"
                                    : "bg-gray-50 border border-gray-200"
                                }`}
                              >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  participant.name === playerName
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                                }`}>
                                  <span className="text-sm font-bold">
                                    {index + 1}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-900">
                                      {participant.name}
                                    </span>
                                    {participant.name === playerName && (
                                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 border-blue-200">
                                        You
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-700">
                                    Joined {new Date(participant.joinedAt).toLocaleTimeString()}
                                  </p>
                                </div>
                                <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
                                  No Team
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Status Card */}
              <Card className="card-hover fade-in-up bg-white border-gray-200 shadow-lg" style={{ animationDelay: '0.4s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Clock className="w-5 h-5" />
                    Session Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-900">Waiting for Host</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      The host will start the team quiz when ready. You'll be automatically redirected when the quiz begins.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 font-medium">Total Team Members</span>
                      <span className="font-bold text-gray-900">{participantCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 font-medium">Your Position</span>
                      <span className="font-bold text-blue-600">
                        {participants.findIndex(p => p.name === playerName) + 1}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 font-medium">Your Team</span>
                      <span className="font-bold text-gray-900">
                        {currentTeam || 'Not selected'}
                      </span>
                    </div>
                  </div>

                  <Progress value={100} className="h-2 [&>div]:bg-blue-500" />

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Waiting for team quiz to start...
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 