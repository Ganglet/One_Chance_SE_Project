"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BarChart3, Users, Trophy, Clock, Target, TrendingUp } from "lucide-react"
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts"

interface QuizStats {
  id: string
  title: string
  description: string
  totalSessions: number
  totalParticipants: number
  totalQuestions: number
  averageScore: number
  averageAccuracy: number
  averageTimePerQuestion: number
  totalAnswers: number
  correctAnswers: number
  sessions: SessionStats[]
  questionStats: QuestionStats[]
}

interface SessionStats {
  id: string
  code: string
  status: string
  startedAt: string
  endedAt: string
  participantCount: number
  averageScore: number
}

interface QuestionStats {
  id: string
  question: string
  type: string
  totalAttempts: number
  correctAttempts: number
  successRate: number
  averageTime: number
}

export default function QuizStatistics() {
  const params = useParams()
  const router = useRouter()
  const [stats, setStats] = useState<QuizStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch(`/api/quizzes/${params.id}/statistics`)
        if (!response.ok) {
          throw new Error('Failed to fetch statistics')
        }
        const data = await response.json()
        console.log('Statistics data received:', data)
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
          <p className="mt-4 text-lg">Loading statistics...</p>
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error Loading Statistics</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error || 'Statistics not found'}</p>
          <Button onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.back()} className="transition-element">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quiz Statistics</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{stats.title}</p>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Sessions</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSessions}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Participants</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalParticipants}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.averageScore.toFixed(1)}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.averageAccuracy.toFixed(1)}%</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Session History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Session History
            </CardTitle>
            <CardDescription>All quiz sessions and their performance</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.sessions.length === 0 ? (
              <div className="text-center py-8">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No sessions found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {stats.sessions.map((session) => (
                  <div key={session.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Session {session.code}</h4>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => router.push(`/host/quiz/${params.id}/session?code=${session.code}`)}
                        className="text-xs"
                      >
                        Show Details
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div>
                        <span className="font-medium">Participants:</span> {session.participantCount}
                      </div>
                      <div>
                        <span className="font-medium">Avg Score:</span> {session.averageScore.toFixed(1)}
                      </div>
                      <div>
                        <span className="font-medium">Started:</span> {new Date(session.startedAt).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Ended:</span> {session.endedAt ? new Date(session.endedAt).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Question Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Question Performance
            </CardTitle>
            <CardDescription>How each question performed</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.questionStats.length === 0 ? (
              <div className="text-center py-8">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No question data available</p>
              </div>
            ) : (
              <div className="space-y-4">
                {stats.questionStats.map((question, index) => (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Question {index + 1}</h4>
                      <Badge variant="outline">{question.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {question.question}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600 dark:text-gray-400">Success Rate:</span>
                        <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                          {question.successRate.toFixed(1)}%
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600 dark:text-gray-400">Avg Time:</span>
                        <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                          {question.averageTime.toFixed(1)}s
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600 dark:text-gray-400">Attempts:</span>
                        <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                          {question.totalAttempts}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600 dark:text-gray-400">Correct:</span>
                        <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                          {question.correctAttempts}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Charts and Analytics Section */}
        <div className="mt-8 space-y-8">
          {/* Performance Trends Chart */}
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Performance Trends
                </CardTitle>
                <CardDescription>Session performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats.sessions.map(session => ({
                      name: `Session ${session.code}`,
                      avgScore: session.averageScore || 0, // Use actual score or 0
                      participants: session.participantCount || 0, // Use actual count or 0
                      date: new Date(session.startedAt).toLocaleDateString()
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="avgScore" stroke="#8884d8" strokeWidth={2} name="Average Score" />
                      <Line type="monotone" dataKey="participants" stroke="#82ca9d" strokeWidth={2} name="Participants" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Question Success Rate Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Question Success Rates
                </CardTitle>
                <CardDescription>Success rate comparison across questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.questionStats.map((question, index) => ({
                      name: `Q${index + 1}`,
                      successRate: question.successRate || 0, // Use actual success rate or 0
                      avgTime: question.averageTime || 0, // Use actual average time or 0
                      attempts: question.totalAttempts || 0 // Use actual attempts or 0
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="successRate" fill="#8884d8" name="Success Rate (%)" />
                      <Bar dataKey="avgTime" fill="#82ca9d" name="Avg Time (s)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Type Distribution and Radar Chart */}
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Question Type Distribution
                </CardTitle>
                <CardDescription>Breakdown of question types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={(() => {
                          const typeCount = stats.questionStats.reduce((acc, question) => {
                            acc[question.type] = (acc[question.type] || 0) + 1
                            return acc
                          }, {} as Record<string, number>)
                          return Object.entries(typeCount).map(([type, count]) => ({
                            name: type,
                            value: count
                          }))
                        })()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {(() => {
                          const typeCount = stats.questionStats.reduce((acc, question) => {
                            acc[question.type] = (acc[question.type] || 0) + 1
                            return acc
                          }, {} as Record<string, number>)
                          return Object.entries(typeCount).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658', '#ff7300'][index % 4]} />
                          ))
                        })()}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Participant Performance Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Participant Performance Radar
                </CardTitle>
                <CardDescription>Performance comparison across different metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={(() => {
                      // Create radar chart data based on overall quiz performance
                      const avgSuccessRate = stats.questionStats.length > 0 
                        ? stats.questionStats.reduce((sum, q) => sum + q.successRate, 0) / stats.questionStats.length 
                        : 0
                      const avgTime = stats.questionStats.length > 0 
                        ? stats.questionStats.reduce((sum, q) => sum + q.averageTime, 0) / stats.questionStats.length 
                        : 0
                      const normalizedScore = Math.min((stats.averageScore / 100) * 100, 100) // Normalize to 0-100
                      const normalizedAccuracy = Math.min(stats.averageAccuracy, 100)
                      const participationRate = stats.totalSessions > 0 ? Math.min((stats.totalParticipants / (stats.totalSessions * 10)) * 100, 100) : 0
                      const efficiency = Math.min(((avgSuccessRate / 100) * (100 - avgTime / 60)) * 100, 100) // Efficiency metric
                      
                      return [
                        {
                          subject: 'Accuracy',
                          A: normalizedAccuracy,
                          fullMark: 100,
                        },
                        {
                          subject: 'Speed',
                          A: Math.max(0, 100 - avgTime),
                          fullMark: 100,
                        },
                        {
                          subject: 'Score',
                          A: normalizedScore,
                          fullMark: 100,
                        },
                        {
                          subject: 'Participation',
                          A: participationRate,
                          fullMark: 100,
                        },
                        {
                          subject: 'Efficiency',
                          A: efficiency,
                          fullMark: 100,
                        },
                        {
                          subject: 'Success Rate',
                          A: avgSuccessRate,
                          fullMark: 100,
                        },
                      ]
                    })()}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="Performance" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Overview */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Session Performance Area Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AreaChart className="w-5 h-5" />
                  Session Performance Area
                </CardTitle>
                <CardDescription>Performance trends with area visualization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats.sessions.map(session => ({
                      name: `Session ${session.code}`,
                      score: session.averageScore || 0, // Use actual score or 0
                      participants: session.participantCount || 0 // Use actual count or 0
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="score" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="participants" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Question Difficulty Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Question Difficulty Analysis
                </CardTitle>
                <CardDescription>Success rate vs average time analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.questionStats.map((question, index) => ({
                      name: `Q${index + 1}`,
                      successRate: question.successRate || 0, // Use actual success rate or 0
                      avgTime: question.averageTime || 0, // Use actual average time or 0
                      correct: question.correctAttempts || 0, // Use actual correct attempts or 0
                      total: question.totalAttempts || 0 // Use actual total attempts or 0
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="successRate" fill="#8884d8" name="Success Rate (%)" />
                      <Bar yAxisId="right" dataKey="avgTime" fill="#82ca9d" name="Avg Time (s)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 