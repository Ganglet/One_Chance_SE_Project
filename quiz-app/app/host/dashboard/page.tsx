"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Play, BarChart3, Settings, Users, Trophy, HelpCircle, CheckCircle, RotateCcw, Circle, Edit, Download, BarChart, MoreVertical, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Quiz {
  id: string
  title: string
  description: string
  questions: number
  participants: number
  status: "inactive" | "active" | "stopped" | "completed" | "terminated"
  createdAt: string
  teamMode?: boolean
}

export default function HostDashboard() {
  const router = useRouter()
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingQuiz, setUpdatingQuiz] = useState<string | null>(null)

  useEffect(() => {
    async function fetchQuizzes() {
      setLoading(true)
      // Get user ID from localStorage
      const userId = localStorage.getItem("userId")
      
      if (!userId) {
        console.error("No user ID found")
        setLoading(false)
        return
      }

      const res = await fetch(`/api/quizzes?userId=${userId}`)
      const data = await res.json()
      
      if (data.error) {
        console.error("Error fetching quizzes:", data.error)
        setLoading(false)
        return
      }

      // Process quizzes - properly map status values
      const processedQuizzes = (data.quizzes || []).map((q: any) => ({
        id: q.id,
        title: q.title,
        description: q.description,
        questions: q.questions.length,
        participants: 0, // You can update this if you have participant data
        status: q.status || "inactive", // Use the actual status from database
        createdAt: q.created_at ? q.created_at.split("T")[0] : "",
        teamMode: q.team_mode || false
      }))

      setQuizzes(processedQuizzes)
      setLoading(false)
    }
    fetchQuizzes()
  }, [])

  const handleCreateQuiz = () => {
    router.push("/host/create-quiz")
  }

  const handleStartQuiz = async (quizId: string) => {
    setUpdatingQuiz(quizId)
    try {
      // Get hostId from local/session storage
      const hostId = Number(localStorage.getItem("userId"))
      if (!hostId) {
        alert("No host user ID found. Please log in again.")
        return
      }

      // First, update quiz status to active
      const updateRes = await fetch(`/api/quizzes/${quizId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "active" }),
      })

      if (!updateRes.ok) {
        throw new Error("Failed to update quiz status")
      }

      // Then create a session
      const sessionRes = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId, hostId }),
      })

      if (sessionRes.ok) {
        const data = await sessionRes.json()
        // Update local state
        setQuizzes(prev => prev.map(q => 
          q.id === quizId ? { ...q, status: "active" } : q
        ))
        
        // Check if this is a team quiz and redirect accordingly
        const quiz = quizzes.find(q => q.id === quizId)
        if (quiz?.teamMode) {
          // Redirect to team quiz lobby
          router.push(`/host/quiz/${quizId}/team-lobby?code=${data.session.code}`)
        } else {
          // Redirect to regular quiz lobby
          router.push(`/host/quiz/${quizId}/lobby?code=${data.session.code}`)
        }
      } else {
        // If session creation fails, revert quiz status
        await fetch(`/api/quizzes/${quizId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "inactive" }),
        })
        alert("Failed to start session")
      }
    } catch (error) {
      console.error("Error starting quiz:", error)
      alert("Failed to start quiz")
    } finally {
      setUpdatingQuiz(null)
    }
  }

  const handleStopQuiz = async (quizId: string) => {
    setUpdatingQuiz(quizId)
    try {
      const res = await fetch(`/api/quizzes/${quizId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "stopped" }),
      })

      if (res.ok) {
        // Update local state
        setQuizzes(prev => prev.map(q => 
          q.id === quizId ? { ...q, status: "stopped" } : q
        ))
      } else {
        alert("Failed to stop quiz")
      }
    } catch (error) {
      console.error("Error stopping quiz:", error)
      alert("Failed to stop quiz")
    } finally {
      setUpdatingQuiz(null)
    }
  }

  const handleRestartQuiz = async (quizId: string) => {
    setUpdatingQuiz(quizId)
    try {
      const res = await fetch(`/api/quizzes/${quizId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "inactive" }),
      })

      if (res.ok) {
        // Update local state
        setQuizzes(prev => prev.map(q => 
          q.id === quizId ? { ...q, status: "inactive" } : q
        ))
      } else {
        alert("Failed to restart quiz")
      }
    } catch (error) {
      console.error("Error restarting quiz:", error)
      alert("Failed to restart quiz")
    } finally {
      setUpdatingQuiz(null)
    }
  }

  const handleViewResults = (quizId: string) => {
    router.push(`/host/quiz/${quizId}/results`)
  }

  const handleEditQuiz = (quizId: string) => {
    router.push(`/host/edit-quiz/${quizId}`)
  }

  const handleDownloadCSV = async (quizId: string) => {
    try {
      const response = await fetch(`/api/quizzes/${quizId}/export-csv`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `quiz-${quizId}-all-sessions-complete-analytics-${new Date().toISOString().split('T')[0]}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        alert('Failed to download CSV. Please try again.')
      }
    } catch (error) {
      console.error('Error downloading CSV:', error)
      alert('Failed to download CSV. Please try again.')
    }
  }

  const handleDownloadComprehensiveReport = async (quizId: string) => {
    try {
      // First get the CSV data
      const csvResponse = await fetch(`/api/quizzes/${quizId}/export-csv`)
      if (!csvResponse.ok) {
        throw new Error('Failed to fetch CSV data')
      }
      
      // Then get the chart data
      const chartResponse = await fetch(`/api/quizzes/${quizId}/export-charts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionCode: null }) // All sessions
      })
      
      if (!chartResponse.ok) {
        throw new Error('Failed to fetch chart data')
      }

      const chartData = await chartResponse.json()
      
      // Create a comprehensive HTML report
      const reportContent = generateComprehensiveReport(chartData.data)
      
      // Create and download the report
      const blob = new Blob([reportContent], { type: 'text/html' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `quiz-${quizId}-comprehensive-report-${new Date().toISOString().split('T')[0]}.html`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading comprehensive report:', error)
      alert('Failed to download comprehensive report. Please try again.')
    }
  }

  const generateComprehensiveReport = (data: any) => {
    const { quizInfo, overallStats, participants, questions, sessions } = data
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comprehensive Quiz Report - ${quizInfo.title}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f8fafc;
            color: #1e293b;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 3rem;
            font-weight: 700;
        }
        .header p {
            margin: 15px 0 0 0;
            font-size: 1.2rem;
            opacity: 0.9;
        }
        .content {
            padding: 40px;
        }
        .section {
            margin-bottom: 50px;
        }
        .section h2 {
            color: #374151;
            border-bottom: 3px solid #e5e7eb;
            padding-bottom: 15px;
            margin-bottom: 25px;
            font-size: 1.8rem;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 25px;
            margin-bottom: 40px;
        }
        .stat-card {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 25px;
            border-radius: 15px;
            text-align: center;
            border: 1px solid #e2e8f0;
            transition: transform 0.2s ease;
        }
        .stat-card:hover {
            transform: translateY(-2px);
        }
        .stat-card h3 {
            margin: 0;
            font-size: 2.5rem;
            color: #1e40af;
            font-weight: 700;
        }
        .stat-card p {
            margin: 8px 0 0 0;
            color: #64748b;
            font-size: 1rem;
            font-weight: 500;
        }
        .table-container {
            overflow-x: auto;
            margin: 25px 0;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 12px;
            overflow: hidden;
        }
        th, td {
            padding: 15px 20px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
        }
        th {
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            font-weight: 600;
            color: #374151;
            font-size: 0.95rem;
        }
        tr:hover {
            background-color: #f8fafc;
        }
        .badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 8px;
            font-size: 0.8rem;
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
            border: 3px dashed #cbd5e1;
            border-radius: 15px;
            padding: 50px;
            text-align: center;
            margin: 25px 0;
        }
        .chart-placeholder h3 {
            color: #64748b;
            margin-bottom: 15px;
            font-size: 1.3rem;
        }
        .chart-placeholder p {
            color: #94a3b8;
            margin: 0;
            font-size: 1rem;
        }
        .footer {
            background: #f8fafc;
            padding: 30px;
            text-align: center;
            color: #64748b;
            border-top: 1px solid #e2e8f0;
        }
        .summary-box {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 1px solid #bae6fd;
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
        }
        .summary-box h3 {
            color: #0369a1;
            margin: 0 0 15px 0;
            font-size: 1.4rem;
        }
        .summary-box p {
            color: #0c4a6e;
            margin: 8px 0;
            font-size: 1rem;
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
            <p>Comprehensive Quiz Analytics Report</p>
            <p>Generated on ${quizInfo.exportDate} at ${quizInfo.exportTime}</p>
        </div>
        
        <div class="content">
            <!-- Executive Summary -->
            <div class="section">
                <h2>📋 Executive Summary</h2>
                <div class="summary-box">
                    <h3>🎯 Key Performance Indicators</h3>
                    <p><strong>Total Sessions:</strong> ${overallStats.totalSessions} | <strong>Total Participants:</strong> ${overallStats.totalParticipants}</p>
                    <p><strong>Overall Success Rate:</strong> ${overallStats.overallSuccessRate}% | <strong>Average Time per Answer:</strong> ${overallStats.averageTimePerAnswer} seconds</p>
                    <p><strong>Total Questions:</strong> ${quizInfo.totalQuestions} | <strong>Quiz Status:</strong> ${quizInfo.status}</p>
                </div>
            </div>

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
                <h2>👥 Participant Performance Analysis</h2>
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
                                <th>Performance</th>
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
                                    <td>${p.efficiency >= 80 ? 'Excellent' : p.efficiency >= 60 ? 'Good' : p.efficiency >= 40 ? 'Average' : 'Needs Improvement'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Question Analysis -->
            <div class="section">
                <h2>❓ Question Analysis & Difficulty Assessment</h2>
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
                                <th>Performance</th>
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
                                    <td>${q.successRate >= 80 ? 'Excellent' : q.successRate >= 60 ? 'Good' : q.successRate >= 40 ? 'Challenging' : 'Very Difficult'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Session Details -->
            <div class="section">
                <h2>📅 Session Performance Details</h2>
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
                                <th>Performance</th>
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
                                    <td>${parseFloat(s.successRate) >= 80 ? 'Excellent' : parseFloat(s.successRate) >= 60 ? 'Good' : parseFloat(s.successRate) >= 40 ? 'Average' : 'Needs Improvement'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Performance Charts -->
            <div class="section">
                <h2>📈 Performance Charts & Visualizations</h2>
                <div class="chart-placeholder">
                    <h3>📊 Score Distribution Chart</h3>
                    <p>Interactive bar chart showing participant score distribution with gradient fills and hover effects</p>
                </div>
                <div class="chart-placeholder">
                    <h3>🥧 Performance Distribution Pie Chart</h3>
                    <p>Color-coded pie chart showing distribution by performance categories (Excellent, Good, Average, Needs Improvement)</p>
                </div>
                <div class="chart-placeholder">
                    <h3>🎯 Accuracy vs Response Time Scatter Plot</h3>
                    <p>Interactive scatter plot showing relationship between accuracy and response speed with color-coded performance levels</p>
                </div>
                <div class="chart-placeholder">
                    <h3>📈 Performance Trends Area Chart</h3>
                    <p>Gradient-filled area chart showing participant performance progression over time</p>
                </div>
                <div class="chart-placeholder">
                    <h3>🔥 Question Performance Heatmap</h3>
                    <p>Gradient-colored bar chart showing success rates and difficulty analysis by question</p>
                </div>
                <div class="chart-placeholder">
                    <h3>🔄 Top Performers Radar Analysis</h3>
                    <p>Multi-dimensional radar chart showing score, accuracy, speed, and completion metrics for top performers</p>
                </div>
            </div>

            <!-- Recommendations -->
            <div class="section">
                <h2>💡 Insights & Recommendations</h2>
                <div class="summary-box">
                    <h3>🎯 Key Insights</h3>
                    <p><strong>Overall Performance:</strong> ${overallStats.overallSuccessRate >= 80 ? 'Excellent' : overallStats.overallSuccessRate >= 60 ? 'Good' : overallStats.overallSuccessRate >= 40 ? 'Average' : 'Needs Improvement'} with ${overallStats.overallSuccessRate}% success rate</p>
                    <p><strong>Question Difficulty:</strong> ${(() => {
                        const easyQuestions = questions.filter((q: any) => q.difficulty === 'Easy').length;
                        const hardQuestions = questions.filter((q: any) => q.difficulty === 'Hard' || q.difficulty === 'Very Hard').length;
                        return easyQuestions > hardQuestions ? 'Well-balanced with more easy questions' : hardQuestions > easyQuestions ? 'Challenging with more difficult questions' : 'Balanced difficulty distribution';
                    })()}</p>
                    <p><strong>Participant Engagement:</strong> ${participants.length > 10 ? 'High engagement with many participants' : participants.length > 5 ? 'Moderate engagement' : 'Low engagement - consider promoting the quiz'}</p>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>Comprehensive Report generated by Quiz App Analytics | ${quizInfo.exportDate}</p>
            <p>This report includes detailed analytics, performance metrics, and visualizations for comprehensive quiz analysis.</p>
        </div>
    </div>
</body>
</html>
    `
  }

  const handleViewStatistics = (quizId: string) => {
    router.push(`/host/quiz/${quizId}/statistics`)
  }

  const handleDeleteQuiz = async (quizId: string) => {
    const quiz = quizzes.find(q => q.id === quizId)
    const quizTitle = quiz?.title || 'this quiz'
    
    if (!confirm(`Are you sure you want to delete "${quizTitle}"?\n\nThis action cannot be undone and will permanently remove:\n• The quiz and all its questions\n• All quiz sessions and participant data\n• All answer history and statistics\n\nType "DELETE" to confirm:`)) {
      return
    }

    const confirmation = prompt('Please type "DELETE" to confirm deletion:')
    if (confirmation !== 'DELETE') {
      alert('Deletion cancelled.')
      return
    }

    setUpdatingQuiz(quizId)
    try {
      const res = await fetch(`/api/quizzes/${quizId}`, {
        method: "DELETE",
      })

      if (res.ok) {
        // Remove from local state
        setQuizzes(prev => prev.filter(q => q.id !== quizId))
        alert(`Quiz "${quizTitle}" deleted successfully`)
      } else {
        const errorData = await res.json().catch(() => ({}))
        const errorMessage = errorData.error || res.statusText
        alert(`Failed to delete quiz: ${errorMessage}`)
      }
    } catch (error) {
      console.error('Error deleting quiz:', error)
      alert("Failed to delete quiz. Please try again.")
    } finally {
      setUpdatingQuiz(null)
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "inactive":
        return "secondary"
      case "stopped":
        return "outline"
      case "terminated":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-700"
      case "inactive":
        return "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200 border-slate-200 dark:border-slate-700"
      case "stopped":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-700"
      case "terminated":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-700"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200 border-slate-200 dark:border-slate-700"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-emerald-600 dark:text-emerald-400"
      case "inactive":
        return "text-slate-600 dark:text-slate-400"
      case "stopped":
        return "text-amber-600 dark:text-amber-400"
      case "terminated":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-slate-600 dark:text-slate-400"
    }
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-glow">Host Dashboard</h1>
            <p className="mt-2 text-balance">Manage your quizzes and view performance analytics</p>
          </div>
          <Button onClick={handleCreateQuiz} size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Create Quiz
          </Button>
        </div>

        {/* Quiz Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Quizzes</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{quizzes.length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {quizzes.filter(q => q.status === "active").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Stopped</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {quizzes.filter(q => q.status === "stopped").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center">
                  <RotateCcw className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Terminated</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {quizzes.filter(q => q.status === "terminated").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quizzes List */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Your Quizzes
            </CardTitle>
            <CardDescription>
              Manage and monitor your quiz sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-8"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : quizzes.length === 0 ? (
              <div className="text-center py-12">
                <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No quizzes yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Create your first quiz to get started
                </p>
                <Button onClick={handleCreateQuiz}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Quiz
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {quizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className={`flex items-center justify-between p-4 border rounded-lg transition-all duration-200 card-hover ${
                      quiz.teamMode 
                        ? 'bg-gray-900 border-cyan-500/30 hover:bg-gray-800 text-cyan-50' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-semibold ${quiz.teamMode ? 'text-cyan-50' : 'text-gray-900 dark:text-white'}`}>
                          {quiz.title}
                        </h3>
                        {quiz.teamMode && (
                          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50 text-xs">
                            Team Quiz
                          </Badge>
                        )}
                      </div>
                      <p className={`text-sm mt-1 ${quiz.teamMode ? 'text-cyan-300' : 'text-gray-600 dark:text-gray-400'}`}>
                        {quiz.description || "No description"}
                      </p>
                      <div className={`flex items-center gap-4 mt-2 text-xs ${quiz.teamMode ? 'text-cyan-400' : 'text-gray-500 dark:text-gray-400'}`}>
                        <span>{quiz.questions} questions</span>
                        <span>{quiz.participants} participants</span>
                        <span>Created {quiz.createdAt}</span>
                        <Badge className={`${getStatusBadgeStyle(quiz.status)} border`}>
                          {quiz.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {quiz.status === "inactive" && (
                        <Button 
                          onClick={() => handleStartQuiz(quiz.id)} 
                          disabled={updatingQuiz === quiz.id}
                        >
                          {updatingQuiz === quiz.id ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          ) : (
                            <Play className="w-4 h-4 mr-2" />
                          )}
                          Start
                        </Button>
                      )}
                      {quiz.status === "active" && (
                        <>
                          <Button 
                            onClick={() => handleStartQuiz(quiz.id)} 
                            disabled={updatingQuiz === quiz.id}
                          >
                            {updatingQuiz === quiz.id ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            ) : (
                              <Play className="w-4 h-4 mr-2" />
                            )}
                            Continue
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => handleStopQuiz(quiz.id)} 
                            disabled={updatingQuiz === quiz.id}
                          >
                            {updatingQuiz === quiz.id ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            ) : (
                              <RotateCcw className="w-4 h-4 mr-2" />
                            )}
                            Stop
                          </Button>
                        </>
                      )}
                      {quiz.status === "stopped" && (
                        <Button 
                          variant="outline"
                          onClick={() => handleRestartQuiz(quiz.id)} 
                          disabled={updatingQuiz === quiz.id}
                        >
                          {updatingQuiz === quiz.id ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          ) : (
                            <RotateCcw className="w-4 h-4 mr-2" />
                          )}
                          Restart
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" side="bottom" sideOffset={4} className="w-48">
                          <DropdownMenuItem onClick={() => handleEditQuiz(quiz.id)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Quiz
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewStatistics(quiz.id)}>
                            <BarChart className="w-4 h-4 mr-2" />
                            View Statistics
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDownloadCSV(quiz.id)}>
                            <Download className="w-4 h-4 mr-2" />
                            Download Complete Analytics
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteQuiz(quiz.id)}
                            className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                            disabled={updatingQuiz === quiz.id}
                          >
                            {updatingQuiz === quiz.id ? (
                              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-2" />
                            ) : (
                              <Trash2 className="w-4 h-4 mr-2" />
                            )}
                            {updatingQuiz === quiz.id ? 'Deleting...' : 'Delete Quiz'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
