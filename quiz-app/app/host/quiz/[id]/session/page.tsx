"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, BarChart3, CheckCircle, RotateCcw, X, Download, XCircle, Users } from "lucide-react"
import { useParams, useSearchParams } from "next/navigation"
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
  Radar,
  ScatterChart,
  Scatter
} from "recharts"

interface Participant {
  id: string
  name: string
  score: number
  streak: number
  accuracy: number
  answered: boolean
  timeRemaining?: number
  // Enhanced statistics
  totalAnswers: number
  correctAnswers: number
  incorrectAnswers: number
  averageTimeTaken: number
  totalTimeTaken: number
  totalPointsEarned: number
  fastestAnswer: number
  slowestAnswer: number
  questionsAnswered: number
  questionsCorrect: number
  questionsIncorrect: number
  averagePointsPerQuestion: number
  efficiency: number
}

interface Question {
  id: string
  question: string
  type: "multiple-choice" | "true-false" | "short-answer" | "matching-pairs" | "ordering" | "drag-drop"
  options?: string[]
  correctAnswer: string | number
  timeLimit: number
  points: number
}

export default function QuizSession() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [joinCode, setJoinCode] = useState("")
  const [sessionId, setSessionId] = useState("")
  const [sessionStatus, setSessionStatus] = useState("")
  const [participants, setParticipants] = useState<Participant[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [isTeamQuiz, setIsTeamQuiz] = useState(false)
  const [disqualificationNotifications, setDisqualificationNotifications] = useState<Array<{id: string, participantName: string, timestamp: Date}>>([])
  // Add tracking for disqualified participants to prevent duplicate notifications
  const [trackedDisqualifiedIds, setTrackedDisqualifiedIds] = useState<Set<string>>(new Set())
  // Use ref for immediate access to prevent race conditions
  const trackedDisqualifiedIdsRef = useRef<Set<string>>(new Set())

  // Initialize tracking from localStorage if available
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionId) {
      const stored = localStorage.getItem(`disqualified-${sessionId}`)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          const storedSet = new Set<string>(parsed)
          setTrackedDisqualifiedIds(storedSet)
          trackedDisqualifiedIdsRef.current = storedSet
          console.log(`📥 Loaded ${storedSet.size} tracked team disqualifications from localStorage`)
        } catch (e) {
          console.error('Failed to parse stored team disqualifications:', e)
        }
      }
    }
  }, [sessionId])

  // Function to format correct answers for display
  const formatCorrectAnswer = (correctAnswer: string | number, questionType: string) => {
    if (typeof correctAnswer === 'string') {
      try {
        // Try to parse JSON for complex question types
        const parsed = JSON.parse(correctAnswer)
        
        if (Array.isArray(parsed)) {
          if (parsed.length > 0 && typeof parsed[0] === 'object' && 'left' in parsed[0] && 'right' in parsed[0]) {
            // Matching pairs
            return parsed.map((pair, index) => `${pair.left} → ${pair.right}`).join(', ')
          } else if (parsed.length > 0 && typeof parsed[0] === 'object' && 'text' in parsed[0] && 'category' in parsed[0]) {
            // Drag and drop
            return parsed.map((item, index) => `${item.text} (${item.category})`).join(', ')
          } else if (Array.isArray(parsed) && parsed.every(item => typeof item === 'string')) {
            // Ordering
            return parsed.join(' → ')
          }
        }
      } catch (e) {
        // If parsing fails, return as is
        return correctAnswer
      }
    }
    
    // For simple types, return as is
    return correctAnswer
  }

  // Fetch session, participants, and questions on mount
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
        console.log("Current URL:", window.location.href)
        
        // Fetch session details
        const sessionUrl = `/api/sessions?code=${code}`
        console.log("Fetching session from:", sessionUrl)
        
        const res = await fetch(sessionUrl)
        console.log("Session response status:", res.status)
        console.log("Session response ok:", res.ok)
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}))
          console.error("Session fetch error:", errorData)
          throw new Error(`Failed to fetch session: ${res.status} ${errorData.error || res.statusText}`)
        }
        
        const data = await res.json()
        console.log("Session data:", data)
        
        setJoinCode(data.session.code)
        setSessionId(data.session.id)
        setSessionStatus(data.session.status)
        
        // Fetch quiz details to check if it's a team quiz
        const quizRes = await fetch(`/api/quizzes/${data.session.quiz_id}`)
        if (quizRes.ok) {
          const quizData = await quizRes.json()
          const quiz = quizData.quiz || quizData
          setIsTeamQuiz(quiz?.team_mode || false)
        }
        
        // Fetch participants
        const participantsUrl = `/api/sessions/participants?code=${data.session.code}`
        console.log("Fetching participants from:", participantsUrl)
        
        const pres = await fetch(participantsUrl)
        console.log("Participants response status:", pres.status)
        
        if (pres.ok) {
          const pdata = await pres.json()
          console.log("Participants data:", pdata)
          // Filter out participants with empty, null, or 'anonymous' names
          const newParticipants = pdata.participants
            .map((p: any) => ({
              id: p.user_id.toString(),
              name: p.users.username,
              score: p.score || 0,
              streak: p.streak || 0,
              accuracy: p.accuracy || 0,
              answered: p.answered || false,
              timeRemaining: undefined, // We'll implement this later
              // Enhanced statistics
              totalAnswers: p.totalAnswers || 0,
              correctAnswers: p.correctAnswers || 0,
              incorrectAnswers: p.incorrectAnswers || 0,
              averageTimeTaken: p.averageTimeTaken || 0,
              totalTimeTaken: p.totalTimeTaken || 0,
              totalPointsEarned: p.totalPointsEarned || 0,
              fastestAnswer: p.fastestAnswer || 0,
              slowestAnswer: p.slowestAnswer || 0,
              questionsAnswered: p.questionsAnswered || 0,
              questionsCorrect: p.questionsCorrect || 0,
              questionsIncorrect: p.questionsIncorrect || 0,
              averagePointsPerQuestion: p.averagePointsPerQuestion || 0,
              efficiency: p.efficiency || 0,
            }))
            .filter((p: Participant) => p.name && p.name.trim() !== '' && p.name.toLowerCase() !== 'anonymous')

          // Check for new disqualifications using tracked IDs to prevent duplicates
          const newDisqualified = newParticipants.filter((p: Participant) => 
            p.accuracy === -1 && !trackedDisqualifiedIdsRef.current.has(p.id)
          )
          // Additional safety check: filter out participants already in notifications
          const existingNotificationNames = new Set(disqualificationNotifications.map(n => n.participantName))
          const trulyNewDisqualified = newDisqualified.filter((p: Participant) => !existingNotificationNames.has(p.name))
          console.log(`🔍 Disqualification check: ${newParticipants.filter((p: Participant) => p.accuracy === -1).length} total disqualified, ${newDisqualified.length} new disqualified, ${trulyNewDisqualified.length} truly new, ${trackedDisqualifiedIdsRef.current.size} tracked IDs`)
          if (trulyNewDisqualified.length > 0) {
            // Add new disqualifications to tracking set IMMEDIATELY to prevent race conditions
            const newDisqualifiedIds = trulyNewDisqualified.map((p: Participant) => p.id)
            const updatedTrackedIds = new Set<string>([...trackedDisqualifiedIdsRef.current, ...newDisqualifiedIds])
            trackedDisqualifiedIdsRef.current = updatedTrackedIds
            setTrackedDisqualifiedIds(updatedTrackedIds)
            // Persist to localStorage for reliability
            if (typeof window !== 'undefined' && sessionId) {
              localStorage.setItem(`disqualified-${sessionId}`, JSON.stringify(Array.from(updatedTrackedIds)))
            }
            // Create notifications only for newly disqualified participants
            const newNotifications = trulyNewDisqualified.map((p: Participant) => ({
              id: `${p.id}-${Date.now()}`,
              participantName: p.name,
              timestamp: new Date()
            }))
            setDisqualificationNotifications(prev => [...prev, ...newNotifications])
            console.log(`🚫 New disqualifications detected: ${trulyNewDisqualified.map((p: Participant) => p.name).join(', ')}`)
            console.log(`📊 Updated tracked IDs: ${Array.from(updatedTrackedIds).join(', ')}`)
          }

          setParticipants(newParticipants)
        } else {
          console.error("Failed to fetch participants:", pres.status, pres.statusText)
        }

        // Fetch questions for this session
        const questionsUrl = `/api/sessions/questions?code=${data.session.code}`
        console.log("Fetching questions from:", questionsUrl)
        
        const qres = await fetch(questionsUrl)
        console.log("Questions response status:", qres.status)
        console.log("Questions response ok:", qres.ok)
        
        if (qres.ok) {
          const qdata = await qres.json()
          console.log("Questions data:", qdata)
          console.log("Number of questions:", qdata.questions?.length || 0)
          
          // Transform the database questions to match our interface
          const transformedQuestions: Question[] = qdata.questions.map((q: any) => ({
            id: q.id.toString(),
            question: q.question,
            type: q.type === 'multiple_choice' ? 'multiple-choice' : 
                  q.type === 'true_false' ? 'true-false' : 
                  q.type === 'matching_pairs' ? 'matching-pairs' :
                  q.type === 'ordering' ? 'ordering' :
                  q.type === 'drag_drop' ? 'drag-drop' : 'short-answer',
            options: q.options?.map((opt: any) => opt.option_text) || [],
            correctAnswer: q.correct_answer || '',
            timeLimit: q.time_limit || 30,
            points: q.points || 100,
          }))
          console.log("Transformed questions:", transformedQuestions)
          setQuestions(transformedQuestions)
        } else {
          const errorData = await qres.json().catch(() => ({}))
          console.error("Failed to fetch questions:", qres.status, errorData)
          throw new Error(`Failed to fetch questions: ${qres.status} ${errorData.error || qres.statusText}`)
        }
        
        setLoading(false)
        setError(null)
        console.log("Session fetch completed successfully")
      } catch (err) {
        console.error("Error in fetchSession:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        setLoading(false)
      }
    }
    
    fetchSession()
    // Poll for session updates every 10 seconds (increased frequency to reduce race conditions)
    const interval = setInterval(fetchSession, 10000)
    return () => clearInterval(interval)
  }, [searchParams])

  // Cleanup disqualification notifications to prevent memory issues
  useEffect(() => {
    if (disqualificationNotifications.length > 20) {
      setDisqualificationNotifications(prev => prev.slice(-20))
    }
  }, [disqualificationNotifications])

  // Function to reset disqualification tracking (for debugging)
  const resetDisqualificationTracking = () => {
    setTrackedDisqualifiedIds(new Set())
    trackedDisqualifiedIdsRef.current = new Set()
    setDisqualificationNotifications([])
    // Clear localStorage as well
    if (typeof window !== 'undefined' && sessionId) {
      localStorage.removeItem(`disqualified-${sessionId}`)
    }
    console.log('🔄 Disqualification tracking reset')
  }

  const answeredCount = participants.filter((p) => p.answered).length

  const handleStopSession = async () => {
    if (!confirm("Are you sure you want to stop this session? You can restart it later from the dashboard.")) {
      return
    }
    
    try {
      // Update session status to completed
      const sessionRes = await fetch("/api/sessions/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: joinCode, status: "paused" })
      })
      
      if (!sessionRes.ok) {
        throw new Error("Failed to update session status")
      }

      // Update quiz status to stopped
      const quizRes = await fetch(`/api/quizzes/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "stopped" })
      })
      
      if (!quizRes.ok) {
        console.warn("Failed to update quiz status, but session was stopped")
      }
      
      // Redirect back to host dashboard
  const router = useRouter();
  router.push("/host/dashboard")
    } catch (error) {
      console.error("Error stopping session:", error)
      alert("Failed to stop session")
    }
  }

  const handleTerminateSession = async () => {
    if (!confirm("Are you sure you want to terminate this session? This action cannot be undone.")) {
      return
    }
    
    try {
      // Update session status to completed
      const sessionRes = await fetch("/api/sessions/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: joinCode, status: "completed" })
      })
      
      if (!sessionRes.ok) {
        throw new Error("Failed to update session status")
      }

      // Update quiz status to terminated
      const quizRes = await fetch(`/api/quizzes/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "terminated" })
      })
      
      if (!quizRes.ok) {
        console.warn("Failed to update quiz status, but session was terminated")
      }
      
      // Redirect back to host dashboard
  const router = useRouter();
  router.push("/host/dashboard")
    } catch (error) {
      console.error("Error terminating session:", error)
      alert("Failed to terminate session")
    }
  }

  const handleDownloadSessionData = async () => {
    try {
      const response = await fetch(`/api/quizzes/${params.id}/export-csv?sessionCode=${joinCode}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `quiz-${params.id}-session-${joinCode}-complete-analytics-${new Date().toISOString().split('T')[0]}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        alert('Failed to download session data. Please try again.')
      }
    } catch (error) {
      console.error('Error downloading session data:', error)
      alert('Failed to download session data. Please try again.')
    }
  }

  const handleDownloadCharts = async () => {
    try {
      // Export chart data
      const chartResponse = await fetch(`/api/quizzes/${params.id}/export-charts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionCode: joinCode })
      })
      
      if (!chartResponse.ok) {
        throw new Error('Failed to export chart data')
      }

      const chartData = await chartResponse.json()
      
      // Create a comprehensive report with charts
      const reportContent = generateChartReport(chartData.data)
      
      // Create and download the report
      const blob = new Blob([reportContent], { type: 'text/html' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `quiz-${params.id}-session-${joinCode}-charts-${new Date().toISOString().split('T')[0]}.html`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading charts:', error)
      alert('Failed to download charts. Please try again.')
    }
  }

  const generateChartReport = (data: any) => {
    const { quizInfo, overallStats, participants, questions, sessions } = data
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Session Report - ${quizInfo.title}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f8fafc;
            color: #1e293b;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5rem;
            font-weight: 700;
        }
        .header p {
            margin: 10px 0 0 0;
            font-size: 1.1rem;
            opacity: 0.9;
        }
        .content {
            padding: 30px;
        }
        .section {
            margin-bottom: 40px;
        }
        .section h2 {
            color: #374151;
            border-bottom: 3px solid #e5e7eb;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 20px;
            border-radius: 12px;
            text-align: center;
            border: 1px solid #e2e8f0;
        }
        .stat-card h3 {
            margin: 0;
            font-size: 2rem;
            color: #1e40af;
            font-weight: 700;
        }
        .stat-card p {
            margin: 5px 0 0 0;
            color: #64748b;
            font-size: 0.9rem;
        }
        .table-container {
            overflow-x: auto;
            margin: 20px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
        }
        th {
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            font-weight: 600;
            color: #374151;
        }
        tr:hover {
            background-color: #f8fafc;
        }
        .badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
        }
        .badge-excellent { background: #dcfce7; color: #166534; }
        .badge-good { background: #dbeafe; color: #1e40af; }
        .badge-average { background: #fef3c7; color: #92400e; }
        .badge-poor { background: #fee2e2; color: #991b1b; }
        .badge-easy { background: #dcfce7; color: #166534; }
        .badge-medium { background: #fef3c7; color: #92400e; }
        .badge-hard { background: #fee2e2; color: #991b1b; }
        .badge-very-hard { background: #fecaca; color: #7f1d1d; }
        .chart-placeholder {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border: 2px dashed #cbd5e1;
            border-radius: 12px;
            padding: 40px;
            text-align: center;
            margin: 20px 0;
        }
        .chart-placeholder h3 {
            color: #64748b;
            margin-bottom: 10px;
        }
        .chart-placeholder p {
            color: #94a3b8;
            margin: 0;
        }
        .footer {
            background: #f8fafc;
            padding: 20px;
            text-align: center;
            color: #64748b;
            border-top: 1px solid #e2e8f0;
        }
        @media print {
            body { background: white; }
            .container { box-shadow: none; }
            .header { background: #374151 !important; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${quizInfo.title}</h1>
            <p>Quiz Session Report - ${quizInfo.sessionCode}</p>
            <p>Generated on ${quizInfo.exportDate} at ${quizInfo.exportTime}</p>
        </div>
        
        <div class="content">
            <!-- Overall Statistics -->
            <div class="section">
                <h2>📊 Overall Statistics</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <h3>${overallStats.totalSessions}</h3>
                        <p>Total Sessions</p>
                    </div>
                    <div class="stat-card">
                        <h3>${overallStats.totalParticipants}</h3>
                        <p>Total Participants</p>
                    </div>
                    <div class="stat-card">
                        <h3>${overallStats.totalAnswers}</h3>
                        <p>Total Answers</p>
                    </div>
                    <div class="stat-card">
                        <h3>${overallStats.overallSuccessRate}%</h3>
                        <p>Success Rate</p>
                    </div>
                    <div class="stat-card">
                        <h3>${overallStats.averageTimePerAnswer}s</h3>
                        <p>Avg Time/Answer</p>
                    </div>
                    <div class="stat-card">
                        <h3>${quizInfo.totalQuestions}</h3>
                        <p>Total Questions</p>
                    </div>
                </div>
            </div>

            <!-- Participant Performance -->
            <div class="section">
                <h2>👥 Participant Performance</h2>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Score</th>
                                <th>Accuracy</th>
                                <th>Questions</th>
                                <th>Success Rate</th>
                                <th>Avg Time</th>
                                <th>Streak</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${participants.map((p: any, index: number) => `
                                <tr>
                                    <td><strong>#${index + 1}</strong></td>
                                    <td>${p.name}</td>
                                    <td>${p.score}</td>
                                    <td>
                                        <span class="badge ${p.efficiency >= 80 ? 'badge-excellent' : p.efficiency >= 60 ? 'badge-good' : p.efficiency >= 40 ? 'badge-average' : 'badge-poor'}">
                                            ${p.efficiency}%
                                        </span>
                                    </td>
                                    <td>${p.questionsCorrect}/${p.questionsAnswered}</td>
                                    <td>${p.questionsAnswered > 0 ? ((p.questionsCorrect / p.questionsAnswered) * 100).toFixed(1) : 0}%</td>
                                    <td>${p.averageTimeTaken.toFixed(1)}s</td>
                                    <td>${p.streak}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Question Analysis -->
            <div class="section">
                <h2>❓ Question Analysis</h2>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Question</th>
                                <th>Type</th>
                                <th>Success Rate</th>
                                <th>Difficulty</th>
                                <th>Avg Time</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${questions.map((q: any) => `
                                <tr>
                                    <td><strong>${q.number}</strong></td>
                                    <td>${q.question}</td>
                                    <td>${q.type}</td>
                                    <td>${q.successRate}%</td>
                                    <td>
                                        <span class="badge ${q.difficulty === 'Easy' ? 'badge-easy' : q.difficulty === 'Medium' ? 'badge-medium' : q.difficulty === 'Hard' ? 'badge-hard' : 'badge-very-hard'}">
                                            ${q.difficulty}
                                        </span>
                                    </td>
                                    <td>${q.averageTime}s</td>
                                    <td>${q.points}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Session Details -->
            <div class="section">
                <h2>📅 Session Details</h2>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Session Code</th>
                                <th>Status</th>
                                <th>Participants</th>
                                <th>Avg Score</th>
                                <th>Avg Accuracy</th>
                                <th>Success Rate</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${sessions.map((s: any) => `
                                <tr>
                                    <td>${s.code}</td>
                                    <td>${s.status}</td>
                                    <td>${s.totalParticipants}</td>
                                    <td>${s.averageScore}</td>
                                    <td>${s.averageAccuracy}%</td>
                                    <td>${s.successRate}%</td>
                                    <td>${s.duration} min</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Chart Placeholders -->
            <div class="section">
                <h2>Performance Charts</h2>
                <div class="chart-placeholder">
                    <h3> Score Distribution Chart</h3>
                    <p>Interactive chart showing participant score distribution</p>
                </div>
                <div class="chart-placeholder">
                    <h3>Performance Distribution</h3>
                    <p>Pie chart showing performance categories</p>
                </div>
                <div class="chart-placeholder">
                    <h3>Accuracy vs Time Analysis</h3>
                    <p>Scatter plot showing accuracy vs response time</p>
                </div>
                <div class="chart-placeholder">
                    <h3>Performance Trends</h3>
                    <p>Area chart showing performance progression</p>
                </div>
                <div class="chart-placeholder">
                    <h3>Question Performance Heatmap</h3>
                    <p>Heatmap showing question difficulty and success rates</p>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>Report generated by Quiz App Analytics | ${quizInfo.exportDate}</p>
        </div>
    </div>
</body>
</html>
    `
  }

  const renderDisqualifiedTag = (p: any) => {
    if (p.accuracy === -1) {
      return (
        <span className="ml-2 inline-block text-xs px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-300">
          Disqualified
        </span>
      )
    }
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 mx-auto border-gray-300"></div>
          <p className="mt-4 text-lg text-gray-700">Loading quiz session...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Error Loading Session</h1>
          <p className="mb-4 text-gray-600">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">No Questions Found</h1>
          <p className="text-gray-600">This quiz doesn't have any questions yet.</p>
        </div>
      </div>
    )
  }

  return (
  <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quiz Session</h1>
            <p className="mt-2 text-gray-600">
              Join Code: <span className="font-mono font-bold text-lg text-gray-700">{joinCode}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className={`text-lg px-4 py-2 ${isTeamQuiz ? 'border-cyan-500/50 text-cyan-400' : ''}`}>
              {participants.length} Participants
            </Badge>
            <Button 
              onClick={() => handleStopSession()} 
              variant="destructive" 
              className="transition-element"
              size="sm"
            >
              <X className="w-4 h-4 mr-2" />
              End Quiz
            </Button>
            <Button 
              onClick={() => handleDownloadSessionData()} 
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-100"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Complete Analytics
            </Button>
          </div>
        </div>

        {/* Disqualification Notifications */}
        {disqualificationNotifications.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-red-800">Recent Disqualifications</h3>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetDisqualificationTracking}
                  className="text-orange-600 border-orange-300 hover:bg-orange-100"
                >
                  Reset Tracking
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDisqualificationNotifications([])}
                  className="text-red-600 border-red-300 hover:bg-red-100"
                >
                  Clear
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              {disqualificationNotifications.slice(-5).map((notification) => (
                <div key={notification.id} className="flex items-center justify-between text-sm">
                  <span className="text-red-700">
                    <strong>{notification.participantName}</strong> was disqualified
                  </span>
                  <span className="text-red-500">
                    {notification.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
            {disqualificationNotifications.length > 5 && (
              <p className="text-xs text-red-500 mt-2">
                Showing last 5 of {disqualificationNotifications.length} notifications
              </p>
            )}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Session Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Total Participants</p>
                      <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{participants.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-green-600 dark:text-green-400">Active Participants</p>
                      <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                        {participants.filter(p => p.accuracy !== -1).length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center">
                      <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm text-red-600 dark:text-red-400">Disqualified</p>
                      <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                        {participants.filter(p => p.accuracy === -1).length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Questions Preview */}
            <Card className={isTeamQuiz ? 'bg-gray-800 border-cyan-500/30' : ''}>
              <CardHeader>
                <CardTitle className={`text-xl ${isTeamQuiz ? 'text-cyan-50' : ''}`}>Quiz Questions Preview</CardTitle>
                <CardDescription className={isTeamQuiz ? 'text-cyan-300' : ''}>All questions in this quiz</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {questions.map((question, index) => (
                    <div key={question.id} className={`border rounded-lg p-4 ${isTeamQuiz ? 'border-cyan-500/30 bg-gray-700/50' : ''}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className={isTeamQuiz ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50' : ''}>Question {index + 1}</Badge>
                        <Badge variant="outline" className={isTeamQuiz ? 'border-cyan-500/50 text-cyan-400' : ''}>{question.type}</Badge>
                        <Badge variant="outline" className={isTeamQuiz ? 'border-cyan-500/50 text-cyan-400' : ''}>{question.points} pts</Badge>
                      </div>
                      <p className={`text-lg font-medium mb-3 ${isTeamQuiz ? 'text-cyan-50' : ''}`}>{question.question}</p>
                      
                      {question.type === "multiple-choice" && question.options && (
                        <div className="grid grid-cols-2 gap-2">
                          {question.options.map((option, optIndex) => (
                            <div key={optIndex} className={`p-2 border rounded ${isTeamQuiz ? 'border-cyan-500/30 bg-gray-700 text-cyan-50' : 'bg-gray-50 dark:bg-gray-800'}`}>
                              <span className="font-medium">{String.fromCharCode(65 + optIndex)}.</span> {option}
                            </div>
                          ))}
                        </div>
                      )}

                      {question.type === "true-false" && (
                        <div className="flex gap-4">
                          <div className="flex-1 p-2 border rounded bg-gray-50 dark:bg-gray-800 text-center">True</div>
                          <div className="flex-1 p-2 border rounded bg-gray-50 dark:bg-gray-800 text-center">False</div>
                        </div>
                      )}

                      {question.type === "matching-pairs" && (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Matching pairs question</p>
                          <div className="p-2 border rounded bg-gray-50 dark:bg-gray-800">
                            <span className="text-sm">Match items from left column to right column</span>
                          </div>
                        </div>
                      )}

                      {question.type === "ordering" && (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Ordering question</p>
                          <div className="p-2 border rounded bg-gray-50 dark:bg-gray-800">
                            <span className="text-sm">Arrange items in the correct order</span>
                          </div>
                        </div>
                      )}

                      {question.type === "drag-drop" && (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Drag and drop question</p>
                          <div className="p-2 border rounded bg-gray-50 dark:bg-gray-800">
                            <span className="text-sm">Drag items to their correct categories</span>
                          </div>
                        </div>
                      )}

                      <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                        <span>Time Limit: {question.timeLimit}s</span>
                        {question.correctAnswer && (
                          <span className="ml-4">Correct Answer: {formatCorrectAnswer(question.correctAnswer, question.type)}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Response Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Response Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Basic Response Stats */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Responses Received</span>
                      <span className="font-bold">
                        {answeredCount} / {participants.length}
                      </span>
                    </div>
                    <Progress value={participants.length > 0 ? (answeredCount / participants.length) * 100 : 0} className="h-2" />
                  </div>

                  {/* Enhanced Statistics Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">
                        {participants.length > 0 ? Math.round((answeredCount / participants.length) * 100) : 0}%
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Response Rate</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">
                        {participants.length}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Participants</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">
                        {participants.reduce((sum, p) => sum + p.streak, 0)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Streaks</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">
                        {participants.reduce((sum, p) => sum + p.questionsAnswered, 0)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Questions Answered</p>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">Performance Overview</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Average Accuracy</span>
                          <span className="font-bold text-lg">
                            {participants.length > 0 
                              ? Math.round(participants.reduce((sum, p) => sum + p.efficiency, 0) / participants.length)
                              : 0}%
                          </span>
                        </div>
                        <Progress 
                          value={participants.length > 0 
                            ? participants.reduce((sum, p) => sum + p.efficiency, 0) / participants.length
                            : 0} 
                          className="h-2 bg-gray-300 dark:bg-gray-700" 
                        />
                      </div>
                      
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Avg Response Time</span>
                          <span className="font-bold text-lg">
                            {participants.length > 0 
                              ? Math.round(participants.reduce((sum, p) => sum + p.averageTimeTaken, 0) / participants.length)
                              : 0}s
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Fastest: {participants.length > 0 ? Math.min(...participants.map(p => p.fastestAnswer || 0)) : 0}s
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Total Points</span>
                          <span className="font-bold text-lg">
                            {participants.reduce((sum, p) => sum + p.totalPointsEarned, 0)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Avg: {participants.length > 0 
                            ? Math.round(participants.reduce((sum, p) => sum + p.averagePointsPerQuestion, 0) / participants.length)
                            : 0} per question
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top Performers */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">Top Performers</h4>
                    <div className="space-y-2">
                      {participants
                        .sort((a, b) => b.efficiency - a.efficiency)
                        .slice(0, 3)
                        .map((participant, index) => (
                          <div key={participant.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                            <div className="flex items-center gap-2">
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                index === 0 ? 'bg-yellow-500 text-white' :
                                index === 1 ? 'bg-gray-400 text-white' :
                                'bg-orange-400 text-white'
                              }`}>
                                {index + 1}
                              </span>
                              <span className="font-medium">{participant.name}</span>
                              {renderDisqualifiedTag(participant)}
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-green-600">{participant.efficiency}%</span>
                              <div className="text-xs text-gray-500">{participant.questionsCorrect}/{participant.questionsAnswered}</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Disqualified Participants Section */}
            {participants.filter(p => p.accuracy === -1).length > 0 && (
              <Card className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
                    <XCircle className="w-5 h-5" />
                    Disqualified Participants
                  </CardTitle>
                  <CardDescription className="text-red-600 dark:text-red-400">
                    Participants disqualified due to proctoring violations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {participants
                      .filter(p => p.accuracy === -1)
                      .map((participant, index) => (
                        <div key={participant.id} className="flex items-center justify-between p-4 bg-red-100 dark:bg-red-800/30 rounded-lg border border-red-200 dark:border-red-700">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-200 dark:bg-red-700 flex items-center justify-center">
                              <XCircle className="w-4 h-4 text-red-600 dark:text-red-300" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-red-800 dark:text-red-200">
                                {participant.name}
                              </h4>
                              <p className="text-sm text-red-600 dark:text-red-400">
                                Disqualified due to proctoring violations
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="destructive" className="bg-red-600 text-white">
                              Disqualified
                            </Badge>
                            <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                              Final Score: {participant.score}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Detailed Participant Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Detailed Participant Analytics
                </CardTitle>
                <CardDescription>Comprehensive performance breakdown for each participant</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {participants
                    .sort((a, b) => b.score - a.score)
                    .map((participant, index) => (
                      <div key={participant.id} className="border rounded-lg p-4">
                        {/* Participant Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              index === 0 ? 'bg-yellow-500 text-white' :
                              index === 1 ? 'bg-gray-400 text-white' :
                              index === 2 ? 'bg-orange-400 text-white' :
                              'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{participant.name} {renderDisqualifiedTag(participant)}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Rank #{index + 1} • {participant.score} points
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${
                              participant.efficiency >= 80 ? 'text-green-600' :
                              participant.efficiency >= 60 ? 'text-yellow-600' :
                              participant.efficiency >= 40 ? 'text-orange-600' : 'text-red-600'
                            }`}>
                              {participant.efficiency}%
                            </div>
                            <div className="text-xs text-gray-500">Accuracy</div>
                          </div>
                        </div>

                        {/* Statistics Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{participant.questionsAnswered}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Questions</div>
                          </div>
                          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{participant.questionsCorrect}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Correct</div>
                          </div>
                          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <div className="text-2xl font-bold text-red-600">{participant.questionsIncorrect}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Incorrect</div>
                          </div>
                          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">{participant.streak}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Streak</div>
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                          <div className="p-3 border rounded-lg">
                            <h4 className="font-medium mb-2">Time Performance</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Average Time:</span>
                                <span className="font-medium">{participant.averageTimeTaken}s</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Fastest Answer:</span>
                                <span className="font-medium">{participant.fastestAnswer}s</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Slowest Answer:</span>
                                <span className="font-medium">{participant.slowestAnswer}s</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Total Time:</span>
                                <span className="font-medium">{participant.totalTimeTaken}s</span>
                              </div>
                            </div>
                          </div>

                          <div className="p-3 border rounded-lg">
                            <h4 className="font-medium mb-2">Points Analysis</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Total Earned:</span>
                                <span className="font-medium">{participant.totalPointsEarned}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Average per Q:</span>
                                <span className="font-medium">{participant.averagePointsPerQuestion}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Points per Min:</span>
                                <span className="font-medium">
                                  {participant.totalTimeTaken > 0 
                                    ? Math.round((participant.totalPointsEarned / participant.totalTimeTaken) * 60)
                                    : 0}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="p-3 border rounded-lg">
                            <h4 className="font-medium mb-2">Efficiency Metrics</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Accuracy Rate:</span>
                                <span className="font-medium">{participant.efficiency}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Success Rate:</span>
                                <span className="font-medium">
                                  {participant.questionsAnswered > 0 
                                    ? Math.round((participant.questionsCorrect / participant.questionsAnswered) * 100)
                                    : 0}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Completion:</span>
                                <span className="font-medium">
                                  {questions.length > 0 
                                    ? Math.round((participant.questionsAnswered / questions.length) * 100)
                                    : 0}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Performance Progress Bar */}
                        {participant.questionsAnswered > 0 && (
                          <div className="mt-4">
                            <div className="flex justify-between text-sm mb-2">
                              <span>Overall Performance</span>
                              <span>{participant.efficiency}%</span>
                            </div>
                            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3">
                              <div 
                                className={`h-3 rounded-full transition-all duration-300 ${
                                  participant.efficiency >= 80 ? 'bg-green-500' :
                                  participant.efficiency >= 60 ? 'bg-yellow-500' :
                                  participant.efficiency >= 40 ? 'bg-orange-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${participant.efficiency}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Live Leaderboard
                </CardTitle>
                <CardDescription>Real-time participant rankings with detailed stats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {participants
                    .sort((a, b) => b.score - a.score)
                    .map((participant, index) => (
                      <div
                        key={participant.id}
                        className={`p-4 rounded-lg border ${
                          index === 0
                            ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
                            : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        {/* Participant Header */}
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              index === 0
                                ? "bg-yellow-500 text-white"
                                : index === 1
                                  ? "bg-gray-400 text-white"
                                  : index === 2
                                    ? "bg-orange-400 text-white"
                                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{participant.name}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                              <span className="font-bold text-lg">{participant.score} pts</span>
                              {participant.streak > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                  🔥 {participant.streak}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                participant.answered
                                  ? "bg-green-500"
                                  : sessionStatus === "active"
                                    ? "bg-yellow-500"
                                    : "bg-gray-300 dark:bg-gray-600"
                              }`}
                            />
                          </div>
                        </div>

                        {/* Detailed Statistics */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Accuracy:</span>
                            <span className="font-medium">{participant.efficiency}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Questions:</span>
                            <span className="font-medium">{participant.questionsCorrect}/{participant.questionsAnswered}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Avg Time:</span>
                            <span className="font-medium">{participant.averageTimeTaken}s</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Avg Points:</span>
                            <span className="font-medium">{participant.averagePointsPerQuestion}</span>
                          </div>
                        </div>

                        {/* Progress Bar for Accuracy */}
                        {participant.questionsAnswered > 0 && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                              <span>Performance</span>
                              <span>{participant.efficiency}%</span>
                            </div>
                            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-1.5">
                              <div 
                                className={`h-1.5 rounded-full ${
                                  participant.efficiency >= 80 ? 'bg-green-500' :
                                  participant.efficiency >= 60 ? 'bg-yellow-500' :
                                  participant.efficiency >= 40 ? 'bg-orange-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${participant.efficiency}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* End of Session Section */}
        {(() => {
          const allCompleted = participants.length > 0 && participants.every(p => p.questionsAnswered >= questions.length)
          const completionDetails = participants.map(p => ({
            name: p.name,
            questionsAnswered: p.questionsAnswered,
            totalQuestions: questions.length,
            completed: p.questionsAnswered >= questions.length
          }))
          
          console.log('Session Complete Debug:', {
            participantsLength: participants.length,
            questionsLength: questions.length,
            completionDetails,
            allCompleted,
            participants: participants.map(p => ({
              name: p.name,
              questionsAnswered: p.questionsAnswered,
              answered: p.answered
            }))
          })
          return allCompleted
        })() && (
          <div className="mt-8">
            <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                  <CheckCircle className="w-5 h-5" />
                  Session Complete
                </CardTitle>
                <CardDescription className="text-green-700 dark:text-green-300">
                  All participants have completed the quiz. You can now manage the session.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    onClick={() => handleStopSession()} 
                    variant="outline"
                    className="border-amber-200 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/30"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Stop Session
                  </Button>
                  
                  <Button 
                    onClick={() => handleTerminateSession()} 
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Terminate Session
                  </Button>
                  
                  <Button 
                    onClick={() => handleDownloadSessionData()} 
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Complete Analytics
                  </Button>

                  <Button 
                    onClick={() => handleDownloadCharts()} 
                    className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Charts
                  </Button>
                </div>
                
                <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Session Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Total Participants:</span>
                      <span className="ml-2 font-medium">{participants.length}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Completed:</span>
                      <span className="ml-2 font-medium text-green-600">{participants.filter(p => p.questionsAnswered >= questions.length).length}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Average Score:</span>
                      <span className="ml-2 font-medium">
                        {participants.length > 0 
                          ? Math.round(participants.reduce((sum, p) => sum + p.score, 0) / participants.length)
                          : 0} pts
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Average Accuracy:</span>
                      <span className="ml-2 font-medium">
                        {participants.length > 0 
                          ? Math.round(participants.reduce((sum, p) => sum + p.efficiency, 0) / participants.length)
                          : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Enhanced Charts and Analytics Section */}
      <div className="mt-8 space-y-8">
        {/* Performance Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Average Score</p>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                    {participants.length > 0 
                      ? Math.round(participants.reduce((sum, p) => sum + p.score, 0) / participants.length)
                      : 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Average Accuracy</p>
                  <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                    {participants.length > 0 
                      ? Math.round(participants.reduce((sum, p) => sum + p.efficiency, 0) / participants.length)
                      : 0}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Response Rate</p>
                  <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                    {participants.length > 0 ? Math.round((answeredCount / participants.length) * 100) : 0}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Avg Response Time</p>
                  <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">
                    {participants.length > 0 
                      ? Math.round(participants.reduce((sum, p) => sum + p.averageTimeTaken, 0) / participants.length)
                      : 0}s
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <RotateCcw className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Score Distribution with Pie Chart */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Score Distribution
              </CardTitle>
              <CardDescription>Detailed breakdown of participant scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={participants
                    .sort((a, b) => b.score - a.score)
                    .map((participant, index) => ({
                      name: participant.name,
                      score: participant.score || 0,
                      rank: index + 1,
                      accuracy: participant.efficiency || 0,
                      questionsAnswered: participant.questionsAnswered || 0
                    }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      height={80}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar 
                      dataKey="score" 
                      fill="url(#scoreGradient)"
                      radius={[4, 4, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Performance Distribution Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Performance Distribution
              </CardTitle>
              <CardDescription>Distribution by performance categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={(() => {
                        const excellent = participants.filter(p => p.efficiency >= 80).length;
                        const good = participants.filter(p => p.efficiency >= 60 && p.efficiency < 80).length;
                        const average = participants.filter(p => p.efficiency >= 40 && p.efficiency < 60).length;
                        const needsImprovement = participants.filter(p => p.efficiency < 40).length;
                        
                        return [
                          { name: 'Excellent (80%+)', value: excellent, color: '#10b981' },
                          { name: 'Good (60-79%)', value: good, color: '#3b82f6' },
                          { name: 'Average (40-59%)', value: average, color: '#f59e0b' },
                          { name: 'Needs Improvement (<40%)', value: needsImprovement, color: '#ef4444' }
                        ].filter(item => item.value > 0);
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
                        const excellent = participants.filter(p => p.efficiency >= 80).length;
                        const good = participants.filter(p => p.efficiency >= 60 && p.efficiency < 80).length;
                        const average = participants.filter(p => p.efficiency >= 40 && p.efficiency < 60).length;
                        const needsImprovement = participants.filter(p => p.efficiency < 40).length;
                        
                        const data = [
                          { name: 'Excellent (80%+)', value: excellent, color: '#10b981' },
                          { name: 'Good (60-79%)', value: good, color: '#3b82f6' },
                          { name: 'Average (40-59%)', value: average, color: '#f59e0b' },
                          { name: 'Needs Improvement (<40%)', value: needsImprovement, color: '#ef4444' }
                        ].filter(item => item.value > 0);
                        
                        return data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ));
                      })()}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Radar Chart for Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RadarChart className="w-5 h-5" />
              Top Performers Radar Analysis
            </CardTitle>
            <CardDescription>Multi-dimensional analysis of top 5 performers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={participants
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 5)
                  .map(participant => ({
                    name: participant.name,
                    score: Math.min(100, (participant.score || 0) / 10), // Normalize to 0-100
                    accuracy: participant.efficiency || 0,
                    speed: Math.max(0, 100 - (participant.averageTimeTaken || 0) * 2),
                    completion: ((participant.questionsAnswered || 0) / questions.length) * 100,
                    efficiency: participant.efficiency || 0
                  }))}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Accuracy"
                    dataKey="accuracy"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Speed"
                    dataKey="speed"
                    stroke="#ffc658"
                    fill="#ffc658"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Completion"
                    dataKey="completion"
                    stroke="#ff7300"
                    fill="#ff7300"
                    fillOpacity={0.3}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

        {/* Accuracy vs Time Scatter Plot */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScatterChart className="w-5 h-5" />
              Accuracy vs Response Time Analysis
            </CardTitle>
            <CardDescription>Relationship between accuracy and response speed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    type="number" 
                    dataKey="avgTime" 
                    name="Average Time (s)"
                    domain={[0, 'dataMax + 5']}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="accuracy" 
                    name="Accuracy (%)"
                    domain={[0, 100]}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value, name, props) => [
                      `${props.payload.name}: ${value}${name === 'accuracy' ? '%' : 's'}`,
                      name === 'accuracy' ? 'Accuracy' : 'Avg Time'
                    ]}
                  />
                  <Scatter 
                    data={participants.map(participant => ({
                      name: participant.name,
                      accuracy: participant.efficiency || 0,
                      avgTime: participant.averageTimeTaken || 0,
                      score: participant.score || 0,
                      questionsAnswered: participant.questionsAnswered || 0
                    }))}
                    fill="#8884d8"
                  >
                    {participants.map((participant, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={(() => {
                          const efficiency = participant.efficiency || 0;
                          if (efficiency >= 80) return '#10b981';
                          if (efficiency >= 60) return '#3b82f6';
                          if (efficiency >= 40) return '#f59e0b';
                          return '#ef4444';
                        })()}
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
        </div>
          </CardContent>
        </Card>

        {/* Performance Trends Area Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AreaChart className="w-5 h-5" />
              Performance Trends Over Time
            </CardTitle>
            <CardDescription>Participant performance progression</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={participants
                  .sort((a, b) => b.score - a.score)
                  .map((participant, index) => ({
                    name: participant.name,
                    score: participant.score || 0,
                    accuracy: participant.efficiency || 0,
                    questionsAnswered: participant.questionsAnswered || 0,
                    rank: index + 1,
                    avgTime: participant.averageTimeTaken || 0
                  }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={80}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stackId="1" 
                    stroke="#8884d8" 
                    fill="url(#scoreAreaGradient)"
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="accuracy" 
                    stackId="2" 
                    stroke="#82ca9d" 
                    fill="url(#accuracyAreaGradient)"
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="scoreAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="accuracyAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Question Performance Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
              Question Performance Heatmap
              </CardTitle>
            <CardDescription>Success rates and difficulty analysis by question</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={questions.map((question, index) => {
                  const questionStats = participants.reduce((acc, p) => {
                    // Simplified calculation - in real app this would come from answers table
                    const successRate = p.questionsAnswered > 0 ? (p.questionsCorrect / p.questionsAnswered) * 100 : 0;
                    return {
                      totalSuccess: acc.totalSuccess + successRate,
                      totalParticipants: acc.totalParticipants + (p.questionsAnswered > 0 ? 1 : 0),
                      avgTime: acc.avgTime + (p.averageTimeTaken || 0)
                    };
                  }, { totalSuccess: 0, totalParticipants: 0, avgTime: 0 });
                  
                  const avgSuccessRate = questionStats.totalParticipants > 0 
                    ? questionStats.totalSuccess / questionStats.totalParticipants 
                    : 0;
                  const avgTime = questionStats.totalParticipants > 0 
                    ? questionStats.avgTime / questionStats.totalParticipants 
                    : 0;
                    
                    return {
                      name: `Q${index + 1}`,
                    successRate: Math.round(avgSuccessRate),
                    points: question.points,
                    timeLimit: question.timeLimit,
                    avgTime: Math.round(avgTime),
                    difficulty: avgSuccessRate >= 80 ? 'Easy' : avgSuccessRate >= 60 ? 'Medium' : 'Hard'
                  };
                })}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value, name, props) => [
                      `${value}${name === 'successRate' ? '%' : name === 'avgTime' ? 's' : ''}`,
                      name === 'successRate' ? 'Success Rate' : name === 'avgTime' ? 'Avg Time' : name
                    ]}
                  />
                  <Bar 
                    dataKey="successRate" 
                    fill="url(#heatmapGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="heatmapGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="50%" stopColor="#f59e0b" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

        {/* Comparative Analysis */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Speed vs Accuracy Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="w-5 h-5" />
                Speed vs Accuracy Comparison
              </CardTitle>
              <CardDescription>Balanced performance analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={participants
                    .sort((a, b) => b.efficiency - a.efficiency)
                    .map((participant, index) => ({
                      name: participant.name,
                      accuracy: participant.efficiency || 0,
                      speed: Math.max(0, 100 - (participant.averageTimeTaken || 0) * 2),
                      score: participant.score || 0,
                      rank: index + 1
                    }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      height={80}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="accuracy" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                      name="Accuracy (%)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="speed" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      name="Speed Score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Question Type Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Question Type Performance
            </CardTitle>
              <CardDescription>Success rates by question type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={(() => {
                        const multipleChoice = questions.filter(q => q.type === 'multiple-choice').length;
                        const trueFalse = questions.filter(q => q.type === 'true-false').length;
                        const matchingPairs = questions.filter(q => q.type === 'matching-pairs').length;
                        const ordering = questions.filter(q => q.type === 'ordering').length;
                        
                        return [
                          { name: 'Multiple Choice', value: multipleChoice, color: '#3b82f6' },
                          { name: 'True/False', value: trueFalse, color: '#10b981' },
                          { name: 'Matching Pairs', value: matchingPairs, color: '#f59e0b' },
                          { name: 'Ordering', value: ordering, color: '#ff7300' }
                        ].filter(item => item.value > 0);
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
                        const multipleChoice = questions.filter(q => q.type === 'multiple-choice').length;
                        const trueFalse = questions.filter(q => q.type === 'true-false').length;
                        const matchingPairs = questions.filter(q => q.type === 'matching-pairs').length;
                        const ordering = questions.filter(q => q.type === 'ordering').length;
                        
                        const data = [
                          { name: 'Multiple Choice', value: multipleChoice, color: '#3b82f6' },
                          { name: 'True/False', value: trueFalse, color: '#10b981' },
                          { name: 'Matching Pairs', value: matchingPairs, color: '#f59e0b' },
                          { name: 'Ordering', value: ordering, color: '#ff7300' }
                        ].filter(item => item.value > 0);
                        
                        return data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ));
                      })()}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  )
}
