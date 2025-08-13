"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, Target, Clock, Star, Medal, Award, BarChart3, CheckCircle, XCircle, AlertTriangle, Shield, Download, X, TrendingUp, TrendingDown, Activity, Zap, Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react"
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
import { useToast } from "@/components/ui/use-toast"

interface Participant {
  id: string
  name: string
  score: number
  streak: number
  accuracy: number
  answered: boolean
  timeRemaining?: number
  team?: string
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

interface Team {
  id: string
  name: string
  color: string
  members: string[]
  maxMembers: number
  score: number
  totalAnswers: number
  correctAnswers: number
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

export default function TeamQuizSession() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [sessionStatus, setSessionStatus] = useState<"waiting" | "active" | "paused" | "completed">("waiting")
  const [participants, setParticipants] = useState<Participant[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [joinCode, setJoinCode] = useState<string>("")
  const [sessionId, setSessionId] = useState<number | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showSessionCompleted, setShowSessionCompleted] = useState(false)
  const [disqualificationNotifications, setDisqualificationNotifications] = useState<Array<{id: string, participantName: string, timestamp: Date}>>([])
  const router = useRouter()
  const { toast } = useToast()

  // Function to format correct answers for display
  const formatCorrectAnswer = (correctAnswer: string | number, questionType: string) => {
    if (typeof correctAnswer === 'string') {
      try {
        const parsed = JSON.parse(correctAnswer)
        
        if (Array.isArray(parsed)) {
          if (parsed.length > 0 && typeof parsed[0] === 'object' && 'left' in parsed[0] && 'right' in parsed[0]) {
            return parsed.map((pair, index) => `${pair.left} → ${pair.right}`).join(', ')
          } else if (parsed.length > 0 && typeof parsed[0] === 'object' && 'text' in parsed[0] && 'category' in parsed[0]) {
            return parsed.map((item, index) => `${item.text} (${item.category})`).join(', ')
          } else if (Array.isArray(parsed) && parsed.every(item => typeof item === 'string')) {
            return parsed.join(' → ')
          }
        }
      } catch (e) {
        return correctAnswer
      }
    }
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

        console.log("Fetching team session with code:", code)
        
        // Fetch session details
        const sessionUrl = `/api/sessions?code=${code}`
        const res = await fetch(sessionUrl)
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}))
          throw new Error(`Failed to fetch session: ${res.status} ${errorData.error || res.statusText}`)
        }
        
        const data = await res.json()
        console.log("Session data:", data)
        
        setJoinCode(data.session.code)
        setSessionId(data.session.id)
        setSessionStatus(data.session.status)
        
        // Check if session is completed and show completion message
        if (data.session.status === "completed") {
          setShowSessionCompleted(true)
        }
        
        // Fetch quiz details to get teams
        const quizRes = await fetch(`/api/quizzes/${data.session.quiz_id}`)
        if (quizRes.ok) {
          const quizData = await quizRes.json()
          const quiz = quizData.quiz || quizData
          
          // Set up teams from quiz data
          if (quiz?.teams) {
            const teamsWithStats = quiz.teams.map((team: any) => ({
              ...team,
              score: 0,
              totalAnswers: 0,
              correctAnswers: 0
            }))
            setTeams(teamsWithStats)
          }
        }
        
        // Fetch participants
        const participantsUrl = `/api/sessions/participants?code=${data.session.code}`
        console.log('Fetching participants from:', participantsUrl)
        const pres = await fetch(participantsUrl)
        console.log('Participants response status:', pres.status)
        
        if (pres.ok) {
          const pdata = await pres.json()
          console.log("Participants data:", pdata)
          console.log("Number of participants:", pdata.participants?.length || 0)
          
          if (pdata.participants && pdata.participants.length > 0) {
            console.log("First participant sample:", pdata.participants[0])
          }
          
          const newParticipants = pdata.participants.map((p: any) => ({
            id: p.user_id.toString(),
            name: p.users.username,
            score: p.score || 0,
            streak: p.streak || 0,
            accuracy: p.accuracy || 0,
            answered: p.answered || false,
            timeRemaining: undefined,
            team: p.team || null,
            // Enhanced statistics - use actual database values
            totalAnswers: p.totalAnswers || p.total_answers || 0,
            correctAnswers: p.correctAnswers || p.correct_answers || 0,
            incorrectAnswers: p.incorrectAnswers || p.incorrect_answers || 0,
            averageTimeTaken: p.averageTimeTaken || p.average_time_taken || 0,
            totalTimeTaken: p.totalTimeTaken || p.total_time_taken || 0,
            totalPointsEarned: p.totalPointsEarned || p.total_points_earned || p.score || 0,
            fastestAnswer: p.fastestAnswer || p.fastest_answer || 0,
            slowestAnswer: p.slowestAnswer || p.slowest_answer || 0,
            questionsAnswered: p.questionsAnswered || p.questions_answered || p.totalAnswers || p.total_answers || 0,
            questionsCorrect: p.questionsCorrect || p.questions_correct || p.correctAnswers || p.correct_answers || 0,
            questionsIncorrect: p.questionsIncorrect || p.questions_incorrect || p.incorrectAnswers || p.incorrect_answers || 0,
            averagePointsPerQuestion: p.averagePointsPerQuestion || p.average_points_per_question || 0,
            efficiency: p.efficiency || p.accuracy || 0,
          }))

          // Check for new disqualifications
          const currentDisqualified = participants.filter((p: Participant) => p.accuracy === -1).map((p: Participant) => p.id)
          const newDisqualified = newParticipants.filter((p: Participant) => p.accuracy === -1 && !currentDisqualified.includes(p.id))
          
          if (newDisqualified.length > 0) {
            const newNotifications = newDisqualified.map((p: Participant) => ({
              id: `${p.id}-${Date.now()}`,
              participantName: p.name,
              timestamp: new Date()
            }))
            setDisqualificationNotifications(prev => [...prev, ...newNotifications])
          }

          setParticipants(newParticipants)
        } else {
          console.error("Failed to fetch participants:", pres.status, pres.statusText)
          const errorText = await pres.text()
          console.error("Error response:", errorText)
        }

        // Fetch questions for this session
        const questionsUrl = `/api/sessions/questions?code=${data.session.code}`
        const qres = await fetch(questionsUrl)
        
        if (qres.ok) {
          const qdata = await qres.json()
          console.log("Questions data:", qdata)
          
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
          setQuestions(transformedQuestions)
        } else {
          const errorData = await qres.json().catch(() => ({}))
          throw new Error(`Failed to fetch questions: ${qres.status} ${errorData.error || qres.statusText}`)
        }
        
        setLoading(false)
        setError(null)
        console.log("Team session fetch completed successfully")
      } catch (err) {
        console.error("Error in fetchSession:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        setLoading(false)
      }
    }
    
    fetchSession()
    // Poll for session updates every 30 seconds to reduce blinking
    const interval = setInterval(fetchSession, 30000)
    return () => clearInterval(interval)
  }, [searchParams])

  const answeredCount = participants.filter((p) => p.answered).length

  // Calculate team statistics
  const calculateTeamStats = () => {
    const updatedTeams = teams.map(team => {
      const teamParticipants = participants.filter(p => p.team === team.name)
      const teamScore = teamParticipants.reduce((sum, p) => sum + p.score, 0)
      const teamTotalAnswers = teamParticipants.reduce((sum, p) => sum + p.totalAnswers, 0)
      const teamCorrectAnswers = teamParticipants.reduce((sum, p) => sum + p.correctAnswers, 0)
      
      return {
        ...team,
        score: teamScore,
        totalAnswers: teamTotalAnswers,
        correctAnswers: teamCorrectAnswers
      }
    })
    
    setTeams(updatedTeams)
  }

  // Handle automatic team assignment
  const handleAssignTeams = async () => {
    try {
      const res = await fetch("/api/sessions/assign-team", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: joinCode })
      })
      
      if (res.ok) {
        const data = await res.json()
        console.log("Team assignment result:", data)
        
        // Refresh participants data to get updated team assignments
        const participantsRes = await fetch(`/api/sessions/participants?code=${joinCode}`)
        if (participantsRes.ok) {
          const participantsData = await participantsRes.json()
          setParticipants(participantsData.participants.map((p: any) => ({
            id: p.id,
            name: p.users.username,
            score: p.score,
            streak: p.streak,
            accuracy: p.accuracy,
            answered: p.answered,
            team: p.team,
            totalAnswers: p.totalAnswers,
            correctAnswers: p.correctAnswers,
            incorrectAnswers: p.incorrectAnswers,
            averageTimeTaken: p.averageTimeTaken,
            totalTimeTaken: p.totalTimeTaken,
            totalPointsEarned: p.totalPointsEarned,
            fastestAnswer: p.fastestAnswer,
            slowestAnswer: p.slowestAnswer,
            questionsAnswered: p.questionsAnswered,
            questionsCorrect: p.questionsCorrect,
            questionsIncorrect: p.questionsIncorrect,
            averagePointsPerQuestion: p.averagePointsPerQuestion,
            efficiency: p.efficiency
          })))
        }
        
        toast({
          title: "Teams Assigned",
          description: data.message,
          variant: "default",
        })
      } else {
        const errorData = await res.json()
        toast({
          title: "Assignment Failed",
          description: errorData.error || "Failed to assign teams",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error assigning teams:", error)
      toast({
        title: "Assignment Failed",
        description: "An error occurred while assigning teams",
        variant: "destructive",
      })
    }
  }

  // Update team stats when participants change
  useEffect(() => {
    if (participants.length > 0 && teams.length > 0) {
      calculateTeamStats()
    }
  }, [participants, teams.length])

  const handleStopSession = async () => {
    if (!confirm("Are you sure you want to stop this team quiz session? You can restart it later from the dashboard.")) {
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

      // Get quiz ID and update quiz status
      const sessionDataRes = await fetch(`/api/sessions?code=${joinCode}`)
      if (sessionDataRes.ok) {
        const sessionData = await sessionDataRes.json()
        const quizId = sessionData.session.quiz_id

        const quizUpdateRes = await fetch(`/api/quizzes/${quizId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "stopped" })
        })
        
        if (!quizUpdateRes.ok) {
          console.warn("Failed to update quiz status, but session was stopped")
        }
      }
      
      // Set session as completed and show completion message
      setSessionStatus("completed")
      setShowSessionCompleted(true)
      
      // Don't redirect immediately, let user see the completion message
      setTimeout(() => {
        router.push("/host/dashboard")
      }, 3000)
    } catch (error) {
      console.error("Error stopping session:", error)
      alert("Failed to stop session")
    }
  }

  const handleTerminateSession = async () => {
    if (!confirm("Are you sure you want to terminate this team quiz session? This action cannot be undone.")) {
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

      // Get quiz ID and update quiz status
      const sessionDataRes = await fetch(`/api/sessions?code=${joinCode}`)
      if (sessionDataRes.ok) {
        const sessionData = await sessionDataRes.json()
        const quizId = sessionData.session.quiz_id

        const quizUpdateRes = await fetch(`/api/quizzes/${quizId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "terminated" })
        })
        
        if (!quizUpdateRes.ok) {
          console.warn("Failed to update quiz status, but session was terminated")
        }
      }
      
      // Set session as completed and show completion message
      setSessionStatus("completed")
      setShowSessionCompleted(true)
      
      // Don't redirect immediately, let user see the completion message
      setTimeout(() => {
        router.push("/host/dashboard")
      }, 3000)
    } catch (error) {
      console.error("Error terminating session:", error)
      alert("Failed to terminate session")
    }
  }

  const handleDownloadSessionData = async () => {
    try {
      const response = await fetch(`/api/sessions/${sessionId}/export-csv`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `team-quiz-${joinCode}-session-data-${new Date().toISOString().split('T')[0]}.csv`
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
      a.download = `team-quiz-${params.id}-session-${joinCode}-charts-${new Date().toISOString().split('T')[0]}.html`
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
    const { quizInfo, overallStats, participants, questions, sessions, teams } = data
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Quiz Session Report - ${quizInfo?.title || 'Team Quiz'}</title>
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
            margin: 0 0 10px 0;
            color: #64748b;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .stat-card .value {
            font-size: 2rem;
            font-weight: 700;
            color: #1e293b;
        }
        .team-section {
            background: #f8fafc;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 20px;
        }
        .team-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
        }
        .team-color {
            width: 20px;
            height: 20px;
            border-radius: 50%;
        }
        .team-name {
            font-size: 1.2rem;
            font-weight: 600;
            color: #374151;
        }
        .participant-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
        }
        .participant-card {
            background: white;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
        }
        .participant-name {
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 5px;
        }
        .participant-stats {
            font-size: 0.9rem;
            color: #64748b;
        }
        .chart-placeholder {
            background: #f1f5f9;
            border: 2px dashed #cbd5e1;
            border-radius: 8px;
            padding: 40px;
            text-align: center;
            color: #64748b;
            margin: 20px 0;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        .table th, .table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
        }
        .table th {
            background: #f8fafc;
            font-weight: 600;
            color: #374151;
        }
        .table tr:hover {
            background: #f8fafc;
        }
        .badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        .badge-success { background: #dcfce7; color: #166534; }
        .badge-warning { background: #fef3c7; color: #92400e; }
        .badge-danger { background: #fee2e2; color: #991b1b; }
        .badge-info { background: #dbeafe; color: #1e40af; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Team Quiz Session Report</h1>
            <p>${quizInfo?.title || 'Team Quiz'} • Session Code: ${joinCode} • Generated on ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>Session Overview</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <h3>Total Participants</h3>
                        <div class="value">${participants?.length || 0}</div>
                    </div>
                    <div class="stat-card">
                        <h3>Teams</h3>
                        <div class="value">${teams?.length || 0}</div>
                    </div>
                    <div class="stat-card">
                        <h3>Questions</h3>
                        <div class="value">${questions?.length || 0}</div>
                    </div>
                    <div class="stat-card">
                        <h3>Average Score</h3>
                        <div class="value">${overallStats?.averageScore || 0}</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>Team Performance</h2>
                ${teams?.map((team: any) => `
                    <div class="team-section">
                        <div class="team-header">
                            <div class="team-color" style="background-color: ${team.color}"></div>
                            <div class="team-name">${team.name}</div>
                        </div>
                        <div class="participant-list">
                            ${participants?.filter((p: any) => p.team === team.name).map((participant: any) => `
                                <div class="participant-card">
                                    <div class="participant-name">${participant.name}</div>
                                    <div class="participant-stats">
                                        Score: ${participant.score} • Accuracy: ${participant.efficiency}% • 
                                        Questions: ${participant.questionsAnswered}/${questions?.length || 0}
                                    </div>
                                </div>
                            `).join('') || '<p>No participants in this team</p>'}
                        </div>
                    </div>
                `).join('') || '<p>No teams data available</p>'}
            </div>

            <div class="section">
                <h2>Performance Analytics</h2>
                <div class="chart-placeholder">
                    <h3>📊 Interactive Charts</h3>
                    <p>This report includes comprehensive charts and analytics that would be displayed in the web interface.</p>
                    <p>Charts include: Score Distribution, Performance Distribution, Radar Analysis, Accuracy vs Time, Performance Trends, Question Performance Heatmap, and Team Comparisons.</p>
                </div>
            </div>

            <div class="section">
                <h2>Detailed Participant Statistics</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Team</th>
                            <th>Score</th>
                            <th>Accuracy</th>
                            <th>Questions</th>
                            <th>Avg Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${participants?.sort((a: any, b: any) => b.score - a.score).map((participant: any, index: any) => `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${participant.name}</td>
                                <td>${participant.team || 'Unassigned'}</td>
                                <td>${participant.score}</td>
                                <td>${participant.efficiency}%</td>
                                <td>${participant.questionsAnswered}/${questions?.length || 0}</td>
                                <td>${participant.averageTimeTaken}s</td>
                                <td>
                                    <span class="badge ${participant.efficiency >= 80 ? 'badge-success' : participant.efficiency >= 60 ? 'badge-warning' : 'badge-danger'}">
                                        ${participant.efficiency >= 80 ? 'Excellent' : participant.efficiency >= 60 ? 'Good' : 'Needs Improvement'}
                                    </span>
                                </td>
                            </tr>
                        `).join('') || '<tr><td colspan="8">No participant data available</td></tr>'}
                    </tbody>
                </table>
            </div>

            <div class="section">
                <h2>Question Analysis</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Question</th>
                            <th>Type</th>
                            <th>Points</th>
                            <th>Time Limit</th>
                            <th>Difficulty</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${questions?.map((question: any, index: any) => `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${question.question}</td>
                                <td>
                                    <span class="badge badge-info">${question.type}</span>
                                </td>
                                <td>${question.points}</td>
                                <td>${question.timeLimit}s</td>
                                <td>
                                    <span class="badge badge-warning">Medium</span>
                                </td>
                            </tr>
                        `).join('') || '<tr><td colspan="6">No question data available</td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>
</html>
    `
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-white">Loading team quiz session...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error Loading Team Quiz Session</h1>
          <p className="text-gray-300 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">No Questions Found</h1>
          <p className="text-gray-300">This team quiz doesn't have any questions yet.</p>
        </div>
      </div>
    )
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

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Session Completed Message */}
        {showSessionCompleted && (
          <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-green-800">Session Completed!</h2>
                  <p className="text-green-600">The team quiz session has been successfully completed. Redirecting to dashboard in 3 seconds...</p>
                </div>
              </div>
              <Button 
                onClick={() => router.push("/host/dashboard")}
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50"
              >
                Go to Dashboard Now
              </Button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Team Quiz Session</h1>
            <p className="text-gray-300 mt-2">
              Join Code: <span className="font-mono font-bold text-lg text-white">{joinCode}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-lg px-4 py-2 border-gray-300 text-gray-700 bg-white">
              {participants.length} Participants
            </Badge>
            {!showSessionCompleted && (
              <>
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
                  className="border-blue-500 text-blue-600 hover:bg-blue-50 bg-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Complete Analytics
                </Button>
                <Button 
                  onClick={() => handleDownloadCharts()} 
                  variant="outline"
                  className="border-green-500 text-green-600 hover:bg-green-50 bg-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Charts Report
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Recent Disqualifications */}
        {disqualificationNotifications.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <XCircle className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold text-red-800">Recent Disqualifications</h3>
            </div>
            <div className="space-y-2">
              {disqualificationNotifications.slice(-3).map((notification) => (
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
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Session Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white border-blue-200 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600">Total Participants</p>
                      <p className="text-2xl font-bold text-blue-700">{participants.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-green-200 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-green-600">Active Participants</p>
                      <p className="text-2xl font-bold text-green-700">
                        {participants.filter(p => p.accuracy !== -1).length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-red-200 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <XCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-red-600">Disqualified</p>
                      <p className="text-2xl font-bold text-red-700">
                        {participants.filter(p => p.accuracy === -1).length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Team Leaderboard */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-blue-600" />
                  Team Leaderboard
                </CardTitle>
                <CardDescription className="text-gray-600">Live team rankings and scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teams.map((team, index) => (
                    <div
                      key={team.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-300 bg-gray-50"
                      style={{ 
                        borderColor: team.color,
                        boxShadow: `0 0 10px ${team.color}20`
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                             style={{ backgroundColor: team.color }}>
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900" style={{ color: team.color }}>
                            {team.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {team.members?.length || 0} members • {team.correctAnswers || 0}/{team.totalAnswers || 0} correct
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{team.score}</div>
                        <div className="text-sm text-gray-600">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Response Statistics */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Response Statistics
                </CardTitle>
                <CardDescription className="text-gray-600">Detailed analysis of team response patterns and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Basic Response Stats */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Responses Received</span>
                      <span className="font-bold text-gray-900">
                        {answeredCount} / {participants.length}
                      </span>
                    </div>
                    <Progress value={participants.length > 0 ? (answeredCount / participants.length) * 100 : 0} className="h-2 [&>div]:bg-blue-500" />
                  </div>

                  {/* Enhanced Statistics Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-2xl font-bold text-green-600">
                        {participants.length > 0 ? Math.round((answeredCount / participants.length) * 100) : 0}%
                      </p>
                      <p className="text-sm text-gray-600">Response Rate</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-2xl font-bold text-blue-600">
                        {participants.length}
                      </p>
                      <p className="text-sm text-gray-600">Total Participants</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-2xl font-bold text-purple-600">
                        {participants.reduce((sum, p) => sum + p.streak, 0)}
                      </p>
                      <p className="text-sm text-gray-600">Total Streaks</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="text-2xl font-bold text-orange-600">
                        {participants.reduce((sum, p) => sum + p.questionsAnswered, 0)}
                      </p>
                      <p className="text-sm text-gray-600">Questions Answered</p>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Performance Overview</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-3 border rounded-lg bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Average Accuracy</span>
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
                          className="h-2 [&>div]:bg-blue-500" 
                        />
                      </div>
                      
                      <div className="p-3 border rounded-lg bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Avg Response Time</span>
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
                      
                      <div className="p-3 border rounded-lg bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Total Points</span>
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
                    <h4 className="font-medium text-gray-900">Top Individual Performers</h4>
                    <div className="space-y-2">
                      {participants
                        .sort((a, b) => b.efficiency - a.efficiency)
                        .slice(0, 3)
                        .map((participant, index) => (
                          <div key={participant.id} className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200">
                            <div className="flex items-center gap-2">
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                index === 0 ? 'bg-yellow-500 text-white' :
                                index === 1 ? 'bg-gray-400 text-white' :
                                'bg-orange-400 text-white'
                              }`}>
                                {index + 1}
                              </span>
                              <span className="font-medium text-gray-900">{participant.name}</span>
                              {renderDisqualifiedTag(participant)}
                              {participant.team && (
                                <span className="text-xs text-gray-600">({participant.team})</span>
                              )}
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

            {/* Questions Preview */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Team Quiz Questions</CardTitle>
                <CardDescription className="text-gray-600">All questions in this competitive quiz</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {questions.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-4 border-gray-300 bg-gray-50">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">Question {index + 1}</Badge>
                        <Badge variant="outline" className="border-gray-300 text-gray-700">{question.type}</Badge>
                        <Badge variant="outline" className="border-gray-300 text-gray-700">{question.points} pts</Badge>
                      </div>
                      <p className="text-lg font-medium mb-3 text-gray-900">{question.question}</p>
                      
                      {question.type === "multiple-choice" && question.options && (
                        <div className="grid grid-cols-2 gap-2">
                          {question.options.map((option, optIndex) => (
                            <div key={optIndex} className="p-2 border rounded bg-white text-gray-900 border-gray-300">
                              <span className="font-medium">{String.fromCharCode(65 + optIndex)}.</span> {option}
                            </div>
                          ))}
                        </div>
                      )}

                      {question.type === "true-false" && (
                        <div className="flex gap-4">
                          <div className="flex-1 p-2 border rounded bg-white text-gray-900 text-center border-gray-300">True</div>
                          <div className="flex-1 p-2 border rounded bg-white text-gray-900 text-center border-gray-300">False</div>
                        </div>
                      )}

                      {question.type === "matching-pairs" && (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 font-medium">Matching pairs question</p>
                          <div className="p-2 border rounded bg-white text-gray-900 border-gray-300">
                            <span className="text-sm">Match items from left column to right column</span>
                          </div>
                        </div>
                      )}

                      {question.type === "ordering" && (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 font-medium">Ordering question</p>
                          <div className="p-2 border rounded bg-white text-gray-900 border-gray-300">
                            <span className="text-sm">Arrange items in the correct order</span>
                          </div>
                        </div>
                      )}

                      {question.type === "drag-drop" && (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 font-medium">Drag and drop question</p>
                          <div className="p-2 border rounded bg-white text-gray-900 border-gray-300">
                            <span className="text-sm">Drag items to their correct categories</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
                        <span className="text-sm font-medium text-gray-700">Correct Answer: </span>
                        <span className="text-gray-900">{formatCorrectAnswer(question.correctAnswer, question.type)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Disqualified Participants Section */}
            {participants.filter(p => p.accuracy === -1).length > 0 && (
              <Card className="bg-white border-red-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-red-700 flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    Disqualified Participants
                  </CardTitle>
                  <CardDescription className="text-red-600">
                    Participants disqualified due to proctoring violations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {participants
                      .filter(p => p.accuracy === -1)
                      .map((participant, index) => (
                        <div key={participant.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center">
                              <XCircle className="w-4 h-4 text-red-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-red-800">
                                {participant.name}
                              </h4>
                              <p className="text-sm text-red-600">
                                Disqualified due to proctoring violations
                                {participant.team && ` • Team: ${participant.team}`}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="destructive" className="bg-red-600 text-white">
                              Disqualified
                            </Badge>
                            <p className="text-xs text-red-500 mt-1">
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
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Detailed Participant Analytics
                </CardTitle>
                <CardDescription className="text-gray-600">Comprehensive performance breakdown for each participant</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {participants
                    .sort((a, b) => b.score - a.score)
                    .map((participant, index) => (
                      <div key={participant.id} className="border rounded-lg p-4 bg-gray-50 border-gray-300">
                        {/* Participant Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              index === 0 ? 'bg-yellow-500 text-white' :
                              index === 1 ? 'bg-gray-400 text-white' :
                              index === 2 ? 'bg-orange-400 text-white' :
                              'bg-gray-200 text-gray-700'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900">{participant.name}</h3>
                              <p className="text-sm text-gray-600">
                                Rank #{index + 1} • {participant.score} points
                                {participant.team && ` • ${participant.team}`}
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
                          <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="text-2xl font-bold text-blue-600">{participant.questionsAnswered}</div>
                            <div className="text-sm text-gray-600">Questions</div>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="text-2xl font-bold text-green-600">{participant.questionsCorrect}</div>
                            <div className="text-sm text-gray-600">Correct</div>
                          </div>
                          <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                            <div className="text-2xl font-bold text-red-600">{participant.questionsIncorrect}</div>
                            <div className="text-sm text-gray-600">Incorrect</div>
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <div className="text-2xl font-bold text-purple-600">{participant.streak}</div>
                            <div className="text-sm text-gray-600">Streak</div>
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                          <div className="p-3 border rounded-lg bg-white">
                            <h4 className="font-medium mb-2 text-gray-900">Time Performance</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Average Time:</span>
                                <span className="font-medium text-gray-900">{participant.averageTimeTaken}s</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Fastest Answer:</span>
                                <span className="font-medium text-gray-900">{participant.fastestAnswer}s</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Slowest Answer:</span>
                                <span className="font-medium text-gray-900">{participant.slowestAnswer}s</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Total Time:</span>
                                <span className="font-medium text-gray-900">{participant.totalTimeTaken}s</span>
                              </div>
                            </div>
                          </div>

                          <div className="p-3 border rounded-lg bg-white">
                            <h4 className="font-medium mb-2 text-gray-900">Points Analysis</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Total Earned:</span>
                                <span className="font-medium text-gray-900">{participant.totalPointsEarned}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Average per Q:</span>
                                <span className="font-medium text-gray-900">{participant.averagePointsPerQuestion}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Points per Min:</span>
                                <span className="font-medium text-gray-900">
                                  {participant.totalTimeTaken > 0 
                                    ? Math.round((participant.totalPointsEarned / participant.totalTimeTaken) * 60)
                                    : 0}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="p-3 border rounded-lg bg-white">
                            <h4 className="font-medium mb-2 text-gray-900">Efficiency Metrics</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Accuracy Rate:</span>
                                <span className="font-medium text-gray-900">{participant.efficiency}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Success Rate:</span>
                                <span className="font-medium text-gray-900">
                                  {participant.questionsAnswered > 0 
                                    ? Math.round((participant.questionsCorrect / participant.questionsAnswered) * 100)
                                    : 0}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Completion:</span>
                                <span className="font-medium text-gray-900">
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
                              <span className="text-gray-700">Overall Performance</span>
                              <span className="text-gray-900">{participant.efficiency}%</span>
                            </div>
                            <div className="w-full bg-gray-300 rounded-full h-3">
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

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Session Status */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Session Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-gray-900">Status</span>
                  </div>
                  <Badge variant="default" className="bg-blue-600 text-white">
                    {sessionStatus === "active" ? "Active" : "Waiting"}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Teams</span>
                    <span className="font-bold text-gray-900">{teams.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Participants</span>
                    <span className="font-bold text-gray-900">{participants.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Questions</span>
                    <span className="font-bold text-gray-900">{questions.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Answered</span>
                    <span className="font-bold text-blue-600">{answeredCount}</span>
                  </div>
                </div>
                
                {/* Team Assignment Button */}
                {sessionStatus === "waiting" && participants.length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <Button 
                      onClick={handleAssignTeams}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      size="sm"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Auto-Assign Teams
                    </Button>
                    <p className="text-xs text-gray-500 mt-1 text-center">
                      Assign participants to teams automatically
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Live Leaderboard */}
            <Card className="bg-white border-gray-200 shadow-lg sticky top-8">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-blue-600" />
                  Live Leaderboard
                </CardTitle>
                <CardDescription className="text-gray-600">Real-time participant rankings with detailed stats</CardDescription>
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
                            ? "bg-yellow-50 border-yellow-200"
                            : "bg-gray-50 border-gray-200"
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
                                    : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate text-gray-900">{participant.name}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <span className="font-bold text-lg">{participant.score} pts</span>
                              {participant.streak > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                  🔥 {participant.streak}
                                </Badge>
                              )}
                              {participant.team && (
                                <span className="text-xs">({participant.team})</span>
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
                                    : "bg-gray-300"
                              }`}
                            />
                          </div>
                        </div>

                        {/* Detailed Statistics */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Accuracy:</span>
                            <span className="font-medium text-gray-900">{participant.efficiency}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Questions:</span>
                            <span className="font-medium text-gray-900">{participant.questionsCorrect}/{participant.questionsAnswered}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Avg Time:</span>
                            <span className="font-medium text-gray-900">{participant.averageTimeTaken}s</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Avg Points:</span>
                            <span className="font-medium text-gray-900">{participant.averagePointsPerQuestion}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={handleStopSession} 
                  variant="outline" 
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Stop Session
                </Button>
                <Button 
                  onClick={handleTerminateSession} 
                  variant="destructive" 
                  className="w-full"
                >
                  <X className="w-4 h-4 mr-2" />
                  Terminate Session
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Comprehensive Charts and Analytics Section */}
        <div className="mt-8 space-y-8">
          {/* Enhanced Score Distribution with Bar Chart */}
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-white border-gray-200 shadow-lg">
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
            <Card className="bg-white border-gray-200 shadow-lg">
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
          <Card className="bg-white border-gray-200 shadow-lg">
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
          <Card className="bg-white border-gray-200 shadow-lg">
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
          <Card className="bg-white border-gray-200 shadow-lg">
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
          <Card className="bg-white border-gray-200 shadow-lg">
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
            <Card className="bg-white border-gray-200 shadow-lg">
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
            <Card className="bg-white border-gray-200 shadow-lg">
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

          {/* Team Performance Comparison */}
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Team Performance Comparison
              </CardTitle>
              <CardDescription>Detailed team statistics and rankings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={teams.map((team, index) => ({
                    name: team.name,
                    score: team.score || 0,
                    totalAnswers: team.totalAnswers || 0,
                    correctAnswers: team.correctAnswers || 0,
                    accuracy: team.totalAnswers > 0 ? Math.round((team.correctAnswers / team.totalAnswers) * 100) : 0,
                    members: team.members?.length || 0
                  }))}>
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
                    />
                    <Legend />
                    <Bar 
                      dataKey="score" 
                      fill="url(#teamScoreGradient)"
                      radius={[4, 4, 0, 0]}
                      name="Team Score"
                    />
                    <Bar 
                      dataKey="accuracy" 
                      fill="url(#teamAccuracyGradient)"
                      radius={[4, 4, 0, 0]}
                      name="Accuracy %"
                    />
                    <defs>
                      <linearGradient id="teamScoreGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.3}/>
                      </linearGradient>
                      <linearGradient id="teamAccuracyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 