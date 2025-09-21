"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, BarChart3, Users, Trophy, Clock, Target, Download, Shield, CheckCircle, XCircle, Activity } from "lucide-react"
import { useRouter } from "next/navigation"
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  ScatterChart,
  Scatter
} from "recharts"

interface TeamQuizStats {
  id: string
  title: string
  totalSessions: number
  totalParticipants: number
  totalTeams: number
  averageScore: number
  averageAccuracy: number
  sessionComplete: boolean
  teams: TeamStats[]
  participants: ParticipantStats[]
  responseStats: ResponseStats
}

interface TeamStats {
  id: string
  name: string
  color: string
  totalScore: number
  accuracy: number
  memberCount: number
  wins: number
}

interface ParticipantStats {
  id: string
  name: string
  team: string
  totalScore: number
  accuracy: number
  responseTime: number
}

interface ResponseStats {
  totalResponses: number
  correctResponses: number
  responseRate: number
  averageResponseTime: number
}

export default function TeamQuizStatistics() {
  const params = useParams()
  const router = useRouter()
  const [stats, setStats] = useState<TeamQuizStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch(`/api/quizzes/${params.id}/team-statistics`)
        if (!response.ok) {
          throw new Error('Failed to fetch team statistics')
        }
        const data = await response.json()
        console.log('Team statistics data received:', data)
        setStats(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Loading team statistics...</p>
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Team Statistics</h1>
          <p className="text-gray-600 mb-4">{error || 'Team statistics not found'}</p>
          <Button onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
  <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.back()} className="transition-element bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Team Quiz Statistics</h1>
              <p className="text-gray-600 mt-2">{stats.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-white border-gray-300 text-gray-700">
              {stats.sessionComplete ? (
                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
              ) : (
                <XCircle className="w-4 h-4 mr-2 text-red-600" />
              )}
              {stats.sessionComplete ? 'Session Complete' : 'Session Active'}
            </Badge>
            <Button 
              variant="outline"
              className="border-blue-500 text-blue-600 hover:bg-blue-50 bg-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Analytics
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="card-hover bg-white border-gray-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Teams</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalTeams}</p>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover bg-white border-gray-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Participants</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalParticipants}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover bg-white border-gray-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.averageScore.toFixed(1)}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover bg-white border-gray-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.averageAccuracy.toFixed(1)}%</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Response Statistics */}
        <Card className="mb-8 bg-white border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Response Statistics
            </CardTitle>
            <CardDescription className="text-gray-600">Detailed analysis of team response patterns and performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-gray-700">Total Responses</p>
                <p className="text-2xl font-bold text-blue-600">{stats.responseStats.totalResponses}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-medium text-gray-700">Correct Responses</p>
                <p className="text-2xl font-bold text-green-600">{stats.responseStats.correctResponses}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm font-medium text-gray-700">Response Rate</p>
                <p className="text-2xl font-bold text-purple-600">{stats.responseStats.responseRate.toFixed(1)}%</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm font-medium text-gray-700">Avg Response Time</p>
                <p className="text-2xl font-bold text-orange-600">{stats.responseStats.averageResponseTime.toFixed(1)}s</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Team Performance Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.teams}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="totalScore" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Team Accuracy Rates</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.teams}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="accuracy" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Performance Analytics */}
        <Card className="mb-8 bg-white border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-blue-600" />
              Team Performance Analytics
            </CardTitle>
            <CardDescription className="text-gray-600">Comprehensive team performance metrics and rankings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Team Rankings</h3>
                <div className="space-y-3">
                  {stats.teams
                    .sort((a, b) => b.totalScore - a.totalScore)
                    .map((team, index) => (
                      <div key={team.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-300 bg-gray-50">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                               style={{ backgroundColor: team.color }}>
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900" style={{ color: team.color }}>
                              {team.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {team.memberCount} members • {team.accuracy.toFixed(1)}% accuracy • {team.wins} wins
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-blue-600">{team.totalScore}</div>
                          <div className="text-sm text-gray-600">points</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Participant Analytics */}
        <Card className="mb-8 bg-white border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Detailed Participant Analytics
            </CardTitle>
            <CardDescription className="text-gray-600">Individual participant performance and team contributions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Top Individual Performers</h3>
                <div className="space-y-3">
                  {stats.participants
                    .sort((a, b) => b.totalScore - a.totalScore)
                    .slice(0, 10)
                    .map((participant, index) => (
                      <div key={participant.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-300 bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{participant.name}</p>
                            <p className="text-sm text-gray-600">{participant.team}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-blue-600">{participant.totalScore}</div>
                          <div className="text-xs text-gray-600">{participant.accuracy.toFixed(1)}% accuracy</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Participant Score Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stats.participants.slice(0, 15)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="totalScore" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Response Time vs Accuracy</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart data={stats.participants}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="responseTime" name="Response Time (s)" />
                      <YAxis dataKey="accuracy" name="Accuracy (%)" />
                      <Tooltip />
                      <Scatter dataKey="accuracy" fill="#8884d8" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 