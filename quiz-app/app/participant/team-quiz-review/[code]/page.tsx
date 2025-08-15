"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Users, Target, Clock, Star, Medal, Award, BarChart3, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { useParams, useSearchParams, useRouter } from "next/navigation"

interface PlayerStats {
  score: number
  accuracy: number
  totalAnswered: number
  correctAnswers: number
  position: number
  streak: number
}

interface Team {
  id: string
  name: string
  color: string
  members: string[]
  score: number
  accuracy: number
}

export default function TeamQuizReview() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const playerName = searchParams.get("name") || "Anonymous"
  const quizCode = params.code as string

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sessionInfo, setSessionInfo] = useState<any>(null)
  const [quizInfo, setQuizInfo] = useState<any>(null)
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    score: 0,
    accuracy: 0,
    totalAnswered: 0,
    correctAnswers: 0,
    position: 1,
    streak: 0
  })
  const [teams, setTeams] = useState<Team[]>([])
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null)
  const [leaderboard, setLeaderboard] = useState<any[]>([])

  // Prevent back button navigation
  useEffect(() => {
    window.history.pushState(null, '', window.location.href)
    window.onpopstate = function () {
      window.history.pushState(null, '', window.location.href)
    }
    return () => {
      window.onpopstate = null
    }
  }, [])

  // Fetch session and quiz data
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        
        // Fetch session info
        const sessionRes = await fetch(`/api/sessions?code=${quizCode}`)
        if (!sessionRes.ok) {
          throw new Error("Session not found")
        }
        const sessionData = await sessionRes.json()
        setSessionInfo(sessionData.session)

        // Fetch quiz info
        const quizRes = await fetch(`/api/quizzes/${sessionData.session.quiz_id}`)
        if (quizRes.ok) {
          const quizData = await quizRes.json()
          const quiz = quizData.quiz || quizData
          setQuizInfo(quiz)
          
          // Set up teams
          if (quiz?.teams && Array.isArray(quiz.teams)) {
            const mappedTeams = quiz.teams.map((team: any) => ({
              id: team.id.toString(),
              name: team.name,
              color: team.color,
              members: [],
              score: 0,
              accuracy: 0
            }))
            setTeams(mappedTeams)
          }
        }

        // Fetch participants
        const participantsRes = await fetch(`/api/sessions/participants?code=${quizCode}`)
        if (participantsRes.ok) {
          const participantsData = await participantsRes.json()
          console.log("Participants data:", participantsData)
          
          // Update teams with actual member data and calculate scores
          if (quizInfo?.teams && Array.isArray(quizInfo.teams)) {
            const updatedTeams = quizInfo.teams.map((team: any) => {
              // Filter out anonymous/empty/null usernames
              const teamMembers = participantsData.participants.filter((p: any) => p.team === team.name && p.users.username && p.users.username.trim() !== '' && p.users.username.toLowerCase() !== 'anonymous')
              const memberUsernames = teamMembers.map((p: any) => p.users.username)
              // Calculate team score from participant data
              const teamScore = teamMembers.reduce((sum: number, p: any) => sum + (p.score || 0), 0)
              const teamAccuracy = teamMembers.length > 0 
                ? Math.round(teamMembers.reduce((sum: number, p: any) => sum + (p.accuracy || 0), 0) / teamMembers.length)
                : 0
              console.log(`Team ${team.name}:`, {
                members: memberUsernames,
                scores: teamMembers.map((p: any) => ({ username: p.users.username, score: p.score })),
                totalScore: teamScore,
                accuracy: teamAccuracy
              })
              return {
                id: team.id.toString(),
                name: team.name,
                color: team.color,
                members: memberUsernames,
                score: teamScore,
                accuracy: teamAccuracy
              }
            })
            setTeams(updatedTeams)
            // Find current user's team
            const currentParticipant = participantsData.participants.find((p: any) => p.users.username === playerName)
            if (currentParticipant && currentParticipant.team) {
              const userTeam = updatedTeams.find((t: any) => t.name === currentParticipant.team)
              if (userTeam) {
                setCurrentTeam(userTeam)
              }
            }
          }
        }

        // Fetch player stats
        const statsRes = await fetch(`/api/sessions/stats?code=${quizCode}&username=${encodeURIComponent(playerName)}`)
        if (statsRes.ok) {
          const statsData = await statsRes.json()
          setPlayerStats(statsData.stats || {
            score: 0,
            accuracy: 0,
            totalAnswered: 0,
            correctAnswers: 0,
            position: 1,
            streak: 0
          })
        }

        // Fetch leaderboard for individual rankings
        const leaderboardRes = await fetch(`/api/sessions/leaderboard?code=${quizCode}`)
        if (leaderboardRes.ok) {
          const leaderboardData = await leaderboardRes.json()
          // Filter out anonymous/empty/null usernames from leaderboard
          const filteredLeaderboard = (leaderboardData.leaderboard || []).filter((p: any) => p.username && p.username.trim() !== '' && p.username.toLowerCase() !== 'anonymous')
          setLeaderboard(filteredLeaderboard)
          console.log("Leaderboard data:", filteredLeaderboard)
        }

        setLoading(false)
        
        // Debug logging
        console.log("Final teams data:", teams)
        console.log("Final current team:", currentTeam)
        console.log("Final leaderboard:", leaderboard)
        console.log("Final player stats:", playerStats)
        
      } catch (err) {
        console.error("Error fetching review data:", err)
        setError(err instanceof Error ? err.message : "Failed to load review data")
        setLoading(false)
      }
    }

    fetchData()
  }, [quizCode, playerName])

  // Separate effect to update teams when quizInfo changes
  useEffect(() => {
    if (quizInfo?.teams && Array.isArray(quizInfo.teams)) {
      const mappedTeams = quizInfo.teams.map((team: any) => ({
        id: team.id.toString(),
        name: team.name,
        color: team.color,
        members: [],
        score: 0,
        accuracy: 0
      }))
      setTeams(mappedTeams)
    }
  }, [quizInfo])

  // Separate effect to update teams with participant data
  useEffect(() => {
    async function updateTeamsWithParticipants() {
      if (teams.length > 0) {
        try {
          const participantsRes = await fetch(`/api/sessions/participants?code=${quizCode}`)
          if (participantsRes.ok) {
            const participantsData = await participantsRes.json()
            
            const updatedTeams = teams.map((team) => {
              const teamMembers = participantsData.participants.filter((p: any) => p.team === team.name)
              const memberUsernames = teamMembers.map((p: any) => p.users.username)
              
              // Calculate team score from participant data
              const teamScore = teamMembers.reduce((sum: number, p: any) => sum + (p.score || 0), 0)
              const teamAccuracy = teamMembers.length > 0 
                ? Math.round(teamMembers.reduce((sum: number, p: any) => sum + (p.accuracy || 0), 0) / teamMembers.length)
                : 0
              
              return {
                ...team,
                members: memberUsernames,
                score: teamScore,
                accuracy: teamAccuracy
              }
            })
            setTeams(updatedTeams)
            
            // Find current user's team
            const currentParticipant = participantsData.participants.find((p: any) => p.users.username === playerName)
            if (currentParticipant && currentParticipant.team) {
              const userTeam = updatedTeams.find((t: any) => t.name === currentParticipant.team)
              if (userTeam) {
                setCurrentTeam(userTeam)
              }
            }
          }
        } catch (error) {
          console.error("Error updating teams with participants:", error)
        }
      }
    }
    
    updateTeamsWithParticipants()
  }, [teams.length, quizCode, playerName])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-300">Loading quiz results...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error Loading Results</h1>
          <p className="text-gray-300 mb-6">{error}</p>
          <Button onClick={() => router.push("/participant/dashboard")} className="bg-blue-600 hover:bg-blue-700">
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const sortedTeams = [...teams].sort((a, b) => b.score - a.score)
  const playerRank = leaderboard.findIndex((p: any) => p.username === playerName) + 1

  // Safety check for current team
  const currentTeamRank = currentTeam ? sortedTeams.findIndex(t => t.name === currentTeam.name) + 1 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl font-bold text-cyan-500">Team Quiz Results</h1>
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-gray-400 text-lg">
            {quizInfo?.title || "Team Quiz"} • Code: {quizCode}
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Player Performance Summary */}
          <Card className="bg-gray-800 border-gray-700 shadow-xl">
            <CardHeader className="text-center">
            <CardTitle className="text-2xl text-black flex items-center justify-center gap-2">
            <Star className="w-6 h-6 text-yellow-400" />
                Your Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{playerStats.score}</div>
                  <p className="text-gray-400">Total Score</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{playerStats.accuracy}%</div>
                  <p className="text-gray-400">Accuracy</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{playerStats.correctAnswers}/{playerStats.totalAnswered}</div>
                  <p className="text-gray-400">Correct Answers</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">#{playerRank}</div>
                  <p className="text-gray-400">Rank</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{playerStats.streak}</div>
                  <p className="text-gray-400">Best Streak</p>
                </div>
              </div>
              
              {currentTeam && (
                <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: currentTeam.color === '#00ffff' || currentTeam.color === 'cyan' ? '#3b82f6' : currentTeam.color }}
                    />
                    <span className="text-white font-medium">Your Team: {currentTeam.name}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Team Score:</span>
                      <div className="text-white font-bold">{currentTeam.score}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Team Rank:</span>
                      <div className="text-white font-bold">
                        #{currentTeamRank}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400">Members:</span>
                      <div className="text-white font-bold">{currentTeam.members.length}</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Team Rankings */}
          <Card className="bg-gray-800 border-gray-700 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-black flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Team Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedTeams.map((team, index) => (
                  <div
                    key={team.id}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      "border-gray-600 bg-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {index === 0 && <Medal className="w-5 h-5 text-yellow-400" />}
                          {index === 1 && <Medal className="w-5 h-5 text-gray-400" />}
                          {index === 2 && <Medal className="w-5 h-5 text-amber-600" />}
                          {index > 2 && (
                            <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: team.color === '#00ffff' || team.color === 'cyan' ? '#3b82f6' : team.color }}
                          />
                          <div>
                            <h3 className="font-semibold text-white text-lg">{team.name}</h3>
                            <p className="text-sm text-gray-400">{team.members.length} members</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{team.score}</div>
                        <p className="text-sm text-gray-400">points</p>
                      </div>
                    </div>
                    
                    {/* Team Members List */}
                    <div className="mt-3 pt-3 border-t border-gray-600">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Team Members:</h4>
                      <div className="space-y-1">
                        {team.members && team.members.length > 0 ? (
                          team.members.map((member, memberIndex) => {
                            const memberData = leaderboard.find((p: any) => p.username === member)
                            return (
                              <div key={memberIndex} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                  <span className={`${member === playerName ? 'text-blue-400 font-medium' : 'text-gray-300'}`}>
                                    {member}
                                    {member === playerName && <span className="ml-1 text-xs text-blue-400">(You)</span>}
                                  </span>
                                </div>
                                {memberData && (
                                  <div className="text-right">
                                    <span className="text-white">{memberData.score} pts</span>
                                    <span className="text-gray-500 ml-1">({memberData.accuracy}%)</span>
                                  </div>
                                )}
                              </div>
                            )
                          })
                        ) : (
                          <p className="text-sm text-gray-500 italic">No members assigned</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Team Stats Summary */}
                    <div className="mt-3 pt-3 border-t border-gray-600">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-400">Avg Accuracy:</span>
                          <div className="text-white font-medium">{team.accuracy}%</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Total Members:</span>
                          <div className="text-white font-medium">{team.members.length}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Individual Leaderboard */}
          <Card className="bg-gray-800 border-gray-700 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-black flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-400" />
                Individual Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.slice(0, 10).map((participant: any, index: number) => (
                  <div
                    key={participant.username}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      participant.username === playerName
                        ? "border-green-400 bg-green-900/20"
                        : "border-gray-600 bg-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {index === 0 && <Award className="w-6 h-6 text-yellow-400" />}
                          {index === 1 && <Award className="w-6 h-6 text-gray-400" />}
                          {index === 2 && <Award className="w-6 h-6 text-amber-600" />}
                          {index > 2 && (
                            <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white flex items-center gap-2">
                            {participant.username}
                            {participant.username === playerName && (
                              <Badge className="bg-green-600 text-white">You</Badge>
                            )}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {participant.team || "No team"} • {participant.accuracy}% accuracy • Best Streak: {participant.streak || 0}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-white">{participant.score}</div>
                        <p className="text-sm text-gray-400">points</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => router.push("/participant/dashboard")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 