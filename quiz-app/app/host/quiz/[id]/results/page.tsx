"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Download, Trophy, Users, Target, Clock, TrendingUp, BarChart3 } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

interface ParticipantResult {
  id: string
  name: string
  score: number
  accuracy: number
  totalAnswered: number
  correctAnswers: number
  averageTime: number
  maxStreak: number
  position: number
}

interface QuestionAnalytics {
  id: string
  question: string
  correctRate: number
  averageTime: number
  responses: { [key: string]: number }
  category: string
}

export default function QuizResults() {
  const params = useParams()
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState("overview")

  const participants: ParticipantResult[] = [
    {
      id: "1",
      name: "Alice Johnson",
      score: 1250,
      accuracy: 90,
      totalAnswered: 15,
      correctAnswers: 14,
      averageTime: 12.5,
      maxStreak: 8,
      position: 1,
    },
    {
      id: "2",
      name: "Bob Smith",
      score: 1100,
      accuracy: 80,
      totalAnswered: 15,
      correctAnswers: 12,
      averageTime: 15.2,
      maxStreak: 5,
      position: 2,
    },
    {
      id: "3",
      name: "Carol Davis",
      score: 950,
      accuracy: 73,
      totalAnswered: 15,
      correctAnswers: 11,
      averageTime: 18.7,
      maxStreak: 4,
      position: 3,
    },
    {
      id: "4",
      name: "David Wilson",
      score: 850,
      accuracy: 67,
      totalAnswered: 15,
      correctAnswers: 10,
      averageTime: 20.1,
      maxStreak: 3,
      position: 4,
    },
    {
      id: "5",
      name: "Eva Brown",
      score: 720,
      accuracy: 60,
      totalAnswered: 15,
      correctAnswers: 9,
      averageTime: 22.3,
      maxStreak: 2,
      position: 5,
    },
  ]

  const questionAnalytics: QuestionAnalytics[] = [
    {
      id: "1",
      question: "What is the capital of France?",
      correctRate: 95,
      averageTime: 8.5,
      responses: { Paris: 19, London: 1, Berlin: 0, Madrid: 0 },
      category: "Geography",
    },
    {
      id: "2",
      question: "Which planet is known as the Red Planet?",
      correctRate: 85,
      averageTime: 12.3,
      responses: { Mars: 17, Venus: 2, Jupiter: 1, Saturn: 0 },
      category: "Science",
    },
    {
      id: "3",
      question: "Who painted the Mona Lisa?",
      correctRate: 70,
      averageTime: 18.7,
      responses: { "Leonardo da Vinci": 14, Michelangelo: 4, Picasso: 2, "Van Gogh": 0 },
      category: "Art",
    },
  ]

  const quizStats = {
    totalParticipants: participants.length,
    averageScore: Math.round(participants.reduce((sum, p) => sum + p.score, 0) / participants.length),
    averageAccuracy: Math.round(participants.reduce((sum, p) => sum + p.accuracy, 0) / participants.length),
    completionRate: 100,
    totalQuestions: 15,
    averageTime: Math.round(participants.reduce((sum, p) => sum + p.averageTime, 0) / participants.length),
  }

  const handleExportResults = () => {
    // Export functionality
    console.log("Exporting results...")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quiz Results</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Comprehensive analytics and participant performance
              </p>
            </div>
          </div>
          <Button onClick={handleExportResults}>
            <Download className="w-4 h-4 mr-2" />
            Export Results
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Participants</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{quizStats.totalParticipants}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Score</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{quizStats.averageScore}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Accuracy</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{quizStats.averageAccuracy}%</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Time</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{quizStats.averageTime}s</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Results */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Leaderboard</TabsTrigger>
            <TabsTrigger value="questions">Question Analysis</TabsTrigger>
            <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-glow">Final Leaderboard</CardTitle>
                <CardDescription className="text-balance">Complete ranking of all participants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {participants.map((participant, index) => (
                    <div
                      key={participant.id}
                      className={
                        `flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-md shadow-xl transition-all` +
                        (index === 0 ? " ring-2 ring-yellow-400/40" : index === 1 ? " ring-2 ring-gray-400/30" : index === 2 ? " ring-2 ring-orange-400/30" : "")
                      }
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                          index === 0
                            ? "bg-yellow-500 text-white"
                            : index === 1
                              ? "bg-gray-400 text-white"
                              : index === 2
                                ? "bg-orange-400 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {participant.position}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{participant.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>
                            {participant.correctAnswers}/{participant.totalAnswered} correct
                          </span>
                          <span>{participant.accuracy}% accuracy</span>
                          <span>Max streak: {participant.maxStreak}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{participant.score}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{participant.averageTime}s avg</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Question Performance Analysis</CardTitle>
                <CardDescription>Detailed breakdown of how participants performed on each question</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {questionAnalytics.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">
                            Question {index + 1}: {question.question}
                          </h3>
                          <Badge variant="secondary">{question.category}</Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{question.correctRate}%</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Correct Rate</div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Response Distribution</h4>
                          <div className="space-y-2">
                            {Object.entries(question.responses).map(([answer, count]) => (
                              <div key={answer} className="flex items-center justify-between">
                                <span className="text-sm">{answer}</span>
                                <div className="flex items-center gap-2">
                                  <Progress value={(count / participants.length) * 100} className="w-20 h-2" />
                                  <span className="text-sm font-medium w-8">{count}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Performance Metrics</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Average Time</span>
                              <span className="font-medium">{question.averageTime}s</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Difficulty Level</span>
                              <Badge
                                variant={
                                  question.correctRate > 80
                                    ? "default"
                                    : question.correctRate > 60
                                      ? "secondary"
                                      : "destructive"
                                }
                              >
                                {question.correctRate > 80 ? "Easy" : question.correctRate > 60 ? "Medium" : "Hard"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Performance Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Excellent (90-100%)</span>
                        <span>{participants.filter((p) => p.accuracy >= 90).length} participants</span>
                      </div>
                      <Progress
                        value={(participants.filter((p) => p.accuracy >= 90).length / participants.length) * 100}
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Good (70-89%)</span>
                        <span>
                          {participants.filter((p) => p.accuracy >= 70 && p.accuracy < 90).length} participants
                        </span>
                      </div>
                      <Progress
                        value={
                          (participants.filter((p) => p.accuracy >= 70 && p.accuracy < 90).length /
                            participants.length) *
                          100
                        }
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Average (50-69%)</span>
                        <span>
                          {participants.filter((p) => p.accuracy >= 50 && p.accuracy < 70).length} participants
                        </span>
                      </div>
                      <Progress
                        value={
                          (participants.filter((p) => p.accuracy >= 50 && p.accuracy < 70).length /
                            participants.length) *
                          100
                        }
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Below Average (&lt;50%)</span>
                        <span>{participants.filter((p) => p.accuracy < 50).length} participants</span>
                      </div>
                      <Progress
                        value={(participants.filter((p) => p.accuracy < 50).length / participants.length) * 100}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Category Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Geography", "Science", "Art", "History", "Sports"].map((category) => {
                      const categoryQuestions = questionAnalytics.filter((q) => q.category === category)
                      const avgCorrectRate =
                        categoryQuestions.length > 0
                          ? Math.round(
                              categoryQuestions.reduce((sum, q) => sum + q.correctRate, 0) / categoryQuestions.length,
                            )
                          : 0

                      return (
                        <div key={category}>
                          <div className="flex justify-between text-sm mb-2">
                            <span>{category}</span>
                            <span>{avgCorrectRate}% avg</span>
                          </div>
                          <Progress value={avgCorrectRate} />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{quizStats.completionRate}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {Math.round(participants.reduce((sum, p) => sum + p.maxStreak, 0) / participants.length)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Avg Max Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {Math.round(
                        (participants.reduce((sum, p) => sum + p.averageTime, 0) / participants.length / 60) * 10,
                      ) / 10}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Avg Time (min)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
