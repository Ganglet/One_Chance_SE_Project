"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Trophy, Clock, BarChart3, Home, Download } from "lucide-react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface Question {
  id: string
  question: string
  type: "multiple-choice" | "multiple_choice" | "true-false" | "true_false" | "matching-pairs" | "matching_pairs" | "ordering" | "short-answer" | "short_answer"
  options?: string[]
  timeLimit: number
  points: number
  correct_answer?: string
  matchingPairs?: Array<{ left: string; right: string }>
  orderingItems?: string[]
}

interface Answer {
  id: string
  question_id: string
  selected_option: string | null
  is_correct: boolean
  time_taken: number
  points_awarded: number
  streak_at_time: number
  answered_at: string
}

interface ParticipantStats {
  score: number
  streak: number
  accuracy: number
  totalAnswered: number
  correctAnswers: number
  totalQuestions: number
}

export default function ParticipantReview() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const playerName = (typeof window !== 'undefined' && (new URLSearchParams(window.location.search)).get('name'))
    || (typeof window !== 'undefined' ? localStorage.getItem('username') : null)
    || 'Anonymous'
  const quizCode = params.code as string

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Answer[]>([])
  const [participantStats, setParticipantStats] = useState<ParticipantStats>({
    score: 0,
    streak: 0,
    accuracy: 0,
    totalAnswered: 0,
    correctAnswers: 0,
    totalQuestions: 0
  })
  const [quizTitle, setQuizTitle] = useState<string>("")
  const [sessionInfo, setSessionInfo] = useState<any>(null)

  useEffect(() => {
    window.history.pushState(null, '', window.location.href)
    window.onpopstate = function () {
      window.history.pushState(null, '', window.location.href)
    }
    return () => {
      window.onpopstate = null
    }
  }, [])

  useEffect(() => {
    async function fetchReviewData() {
      try {
        setLoading(true)
        
        // Fetch session details
        const sessionRes = await fetch(`/api/sessions?code=${quizCode}`)
        if (!sessionRes.ok) {
          throw new Error("Failed to fetch session details")
        }
        const sessionData = await sessionRes.json()
        setSessionInfo(sessionData.session)

        // Fetch quiz details
        const quizRes = await fetch(`/api/quizzes/${sessionData.session.quiz_id}`)
        if (quizRes.ok) {
          const quizData = await quizRes.json()
          const quiz = quizData.quiz || quizData
          setQuizTitle(quiz?.title || 'Quiz')
        }

        // Fetch questions
        const questionsRes = await fetch(`/api/sessions/questions?code=${quizCode}`)
        let questionsData: any = null
        if (questionsRes.ok) {
          questionsData = await questionsRes.json()
          // Ensure options is always an array of strings
          const processedQuestions = (questionsData.questions || []).map((q: any) => ({
            ...q,
            options: q.options ? q.options.map((opt: any) => typeof opt === 'string' ? opt : opt.option_text) : [],
            matchingPairs: q.matching_pairs?.map((pair: any) => ({ left: pair.left_item, right: pair.right_item })) || q.matchingPairs || [],
            orderingItems: q.ordering_items?.map((item: any) => item.item_text) || q.orderingItems || [],
          }))
          setQuestions(processedQuestions)
        } else {
          console.warn("Failed to fetch questions:", questionsRes.status)
        }

        // Fetch participant's answers
        const answersRes = await fetch(`/api/sessions/answers?code=${quizCode}&username=${playerName}`)
        let answersData: any = null
        if (answersRes.ok) {
          answersData = await answersRes.json()
          setAnswers(answersData.answers || [])
        } else {
          console.warn("Failed to fetch answers:", answersRes.status)
        }

        // Calculate stats using the data we already fetched
        const questions = questionsData?.questions || []
        const answers = answersData?.answers || []
        
        const totalQuestions = questions.length
        const totalAnswered = answers.length
        const correctAnswers = answers.filter((a: Answer) => a.is_correct).length
        const score = answers.reduce((sum: number, a: Answer) => sum + a.points_awarded, 0)
        const accuracy = totalAnswered > 0 ? (correctAnswers / totalAnswered) * 100 : 0
        
        // Calculate best streak
        let currentStreak = 0
        let bestStreak = 0
        answers.forEach((answer: Answer) => {
          if (answer.is_correct) {
            currentStreak++
            bestStreak = Math.max(bestStreak, currentStreak)
          } else {
            currentStreak = 0
          }
        })

        setParticipantStats({
          score,
          streak: bestStreak,
          accuracy,
          totalAnswered,
          correctAnswers,
          totalQuestions
        })

        // If no answers found, show a message
        if (answers.length === 0) {
          console.log("No answers found for participant:", playerName)
        }

        setLoading(false)
      } catch (err) {
        console.error("Error fetching review data:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        setLoading(false)
      }
    }

    fetchReviewData()
  }, [quizCode, playerName])

  const handleExportResults = () => {
    const resultsData = {
      playerName,
      quizTitle,
      stats: participantStats,
      questions: questions.map((q, index) => {
        const answer = answers.find(a => a.question_id === q.id)
        return {
          questionNumber: index + 1,
          question: q.question,
          type: q.type,
          options: q.options,
          correctAnswer: q.correct_answer,
          selectedAnswer: answer?.selected_option || "Not answered",
          isCorrect: answer?.is_correct || false,
          timeTaken: answer?.time_taken || 0,
          pointsAwarded: answer?.points_awarded || 0
        }
      })
    }

    const blob = new Blob([JSON.stringify(resultsData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${quizTitle}_${playerName}_results.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Results exported!",
      description: "Your quiz results have been downloaded.",
      variant: "success",
    })
  }

  const handleGoHome = () => {
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
          <p className="mt-4 text-lg">Loading your results...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error Loading Results</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  // Add a helper to map type to user-friendly label
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "multiple-choice":
      case "multiple_choice":
        return "Multiple Choice";
      case "true-false":
      case "true_false":
        return "True/False";
      case "matching-pairs":
      case "matching_pairs":
        return "Matching Pairs";
      case "ordering":
        return "Ordering";
      case "short-answer":
      case "short_answer":
        return "Short Answer";
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 fade-in-up">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 slide-in-left">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quiz Review</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {quizTitle} - {playerName}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={handleExportResults} variant="outline" className="transition-element">
              <Download className="w-4 h-4 mr-2" />
              Export Results
            </Button>
            <Button onClick={handleGoHome} variant="outline" className="transition-element">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Summary */}
            <Card className="card-hover fade-in-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Performance Summary
                </CardTitle>
                <CardDescription>
                  Your overall performance in this quiz
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {participantStats.score}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Score</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {participantStats.correctAnswers}/{participantStats.totalAnswered}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Correct Answers</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {participantStats.accuracy.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {participantStats.streak}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Best Streak</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {participantStats.totalAnswered}/{participantStats.totalQuestions} questions
                    </span>
                  </div>
                  <Progress 
                    value={(participantStats.totalAnswered / participantStats.totalQuestions) * 100} 
                    className="h-2" 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Questions Review */}
            <Card className="card-hover fade-in-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Questions Review
                </CardTitle>
                <CardDescription>
                  Review all questions and your answers
                </CardDescription>
              </CardHeader>
              <CardContent>
                {answers.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-gray-500 dark:text-gray-400 mb-4">
                      <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium mb-2">No Answers Found</h3>
                      <p className="text-sm">
                        It looks like you haven't answered any questions yet, or the session hasn't started.
                      </p>
                    </div>
                    <Button onClick={handleGoHome} variant="outline">
                      <Home className="w-4 h-4 mr-2" />
                      Go Home
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {questions.map((question, index) => {
                      const answer = answers.find(a => a.question_id === question.id)
                      const isCorrect = answer?.is_correct || false
                      const selectedAnswer = answer?.selected_option || "Not answered"
                      
                      return (
                        <div
                          key={question.id}
                          className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                            isCorrect 
                              ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' 
                              : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                          }`}
                          style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                        >
                          <div className="flex items-start gap-3 mb-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isCorrect 
                                ? 'bg-green-100 dark:bg-green-900' 
                                : 'bg-red-100 dark:bg-red-900'
                            }`}>
                              {isCorrect ? (
                                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  Question {index + 1}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {getTypeLabel(question.type)}
                                </Badge>
                                {answer && (
                                  <Badge variant="outline" className="text-xs">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {answer.time_taken}s
                                  </Badge>
                                )}
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                {question.question}
                              </h3>
                              
                              {/* Options for multiple choice */}
                              { (question.type === "multiple-choice" || question.type === "multiple_choice") && question.options && (
                                <div className="space-y-2 mb-4">
                                  {question.options.map((option, optionIndex) => (
                                    <div
                                      key={optionIndex}
                                      className={`p-3 rounded-lg border ${
                                        option === question.correct_answer
                                          ? 'border-green-500 bg-green-100 dark:bg-green-900/30'
                                          : option === selectedAnswer && !isCorrect
                                          ? 'border-red-500 bg-red-100 dark:bg-red-900/30'
                                          : 'border-gray-200 dark:border-gray-700'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium">
                                          {String.fromCharCode(65 + optionIndex)}.
                                        </span>
                                        <span>{option}</span>
                                        {option === question.correct_answer && (
                                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 ml-auto" />
                                        )}
                                        {option === selectedAnswer && !isCorrect && (
                                          <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 ml-auto" />
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* True/False options */}
                              { (question.type === "true-false" || question.type === "true_false") && (
                                <div className="space-y-2 mb-4">
                                  {["True", "False"].map((option) => (
                                    <div
                                      key={option}
                                      className={`p-3 rounded-lg border ${
                                        option === question.correct_answer
                                          ? 'border-green-500 bg-green-100 dark:bg-green-900/30'
                                          : option === selectedAnswer && !isCorrect
                                          ? 'border-red-500 bg-red-100 dark:bg-red-900/30'
                                          : 'border-gray-200 dark:border-gray-700'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <span>{option}</span>
                                        {option === question.correct_answer && (
                                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 ml-auto" />
                                        )}
                                        {option === selectedAnswer && !isCorrect && (
                                          <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 ml-auto" />
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Matching pairs */}
                              { (question.type === "matching-pairs" || question.type === "matching_pairs") && (
                                <div className="space-y-2 mb-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <div className="font-semibold mb-2">Left</div>
                                      {question.matchingPairs?.map((pair, idx) => (
                                        <div key={idx} className="p-2 border rounded mb-1 bg-gray-50 dark:bg-gray-800">{pair.left}</div>
                                      ))}
                                    </div>
                                    <div>
                                      <div className="font-semibold mb-2">Matched Right (Your Answer)</div>
                                      {question.matchingPairs?.map((pair, idx) => {
                                        let userMatchIdx = undefined;
                                        if (answer && answer.selected_option) {
                                          try {
                                            const userMap = JSON.parse(answer.selected_option);
                                            userMatchIdx = userMap[idx];
                                          } catch {}
                                        }
                                        const userRight = typeof userMatchIdx === 'number' && question.matchingPairs?.[userMatchIdx]?.right;
                                        return (
                                          <div key={idx} className="p-2 border rounded mb-1 bg-gray-50 dark:bg-gray-800">
                                            {userRight || <span className="italic text-gray-400">Not matched</span>}
                                          </div>
                                        );
                                      })}
                                    </div>
                                    <div>
                                      <div className="font-semibold mb-2">Correct Right</div>
                                      {(() => {
                                        let correctPairs: Array<{ left: string; right: string }> = [];
                                        try {
                                          correctPairs = JSON.parse(question.correct_answer || '[]');
                                        } catch {}
                                        return correctPairs.map((pair, idx) => (
                                          <div key={idx} className="p-2 border rounded mb-1 bg-green-50 dark:bg-green-900/30">{pair.right}</div>
                                        ));
                                      })()}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Ordering */}
                              { question.type === "ordering" && question.orderingItems && (
                                <div className="space-y-2 mb-4">
                                  <div className="font-semibold mb-2">Your Order</div>
                                  {(() => {
                                    let userOrder: string[] = [];
                                    if (answer && answer.selected_option) {
                                      try {
                                        userOrder = JSON.parse(answer.selected_option);
                                      } catch {}
                                    }
                                    return userOrder.map((item, idx) => (
                                      <div key={idx} className="p-2 border rounded mb-1 bg-gray-50 dark:bg-gray-800">{item}</div>
                                    ));
                                  })()}
                                  <div className="font-semibold mb-2 mt-4">Correct Order</div>
                                  {(() => {
                                    let correctOrder: string[] = [];
                                    try {
                                      correctOrder = JSON.parse(question.correct_answer || '[]');
                                    } catch {}
                                    return correctOrder.map((item, idx) => (
                                      <div key={idx} className="p-2 border rounded mb-1 bg-green-50 dark:bg-green-900/30">{item}</div>
                                    ));
                                  })()}
                                </div>
                              )}

                              {/* Short answer */}
                              {question.type === "short-answer" && (
                                <div className="space-y-2 mb-4">
                                  <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                      Your answer:
                                    </div>
                                    <div className="font-medium">
                                      {selectedAnswer || "No answer provided"}
                                    </div>
                                  </div>
                                  <div className="p-3 rounded-lg border border-green-500 bg-green-100 dark:bg-green-900/30">
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                      Correct answer:
                                    </div>
                                    <div className="font-medium">
                                      {question.correct_answer}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Answer summary */}
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-4">
                                  <span className={`font-medium ${
                                    isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                  }`}>
                                    {isCorrect ? 'Correct' : 'Incorrect'}
                                  </span>
                                  {answer && (
                                    <span className={
                                      answer.points_awarded < 0
                                        ? "text-red-600 dark:text-red-400 font-bold"
                                        : "text-gray-600 dark:text-gray-400"
                                    }>
                                      Points: {answer.points_awarded}
                                    </span>
                                  )}
                                </div>
                                {answer && (
                                  <span className="text-gray-600 dark:text-gray-400">
                                    Streak: {answer.streak_at_time}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 card-hover fade-in-up" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Quick Stats
                </CardTitle>
                <CardDescription>Your performance breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Questions Answered</span>
                    <span className="font-bold">{participantStats.totalAnswered}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Correct Answers</span>
                    <span className="font-bold text-green-600">{participantStats.correctAnswers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Wrong Answers</span>
                    <span className="font-bold text-red-600">
                      {participantStats.totalAnswered - participantStats.correctAnswers}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Accuracy Rate</span>
                    <span className="font-bold">{participantStats.accuracy.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button onClick={handleExportResults} className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Complete Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 