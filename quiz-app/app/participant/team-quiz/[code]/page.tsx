"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Clock, Trophy, CheckCircle, XCircle, AlertTriangle, Users, Shield } from "lucide-react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

interface Question {
  id: string
  question: string
  type: "multiple-choice" | "true-false" | "matching-pairs" | "ordering"
  options?: string[]
  timeLimit: number
  points: number
  correct_answer?: string | number
  matchingPairs?: Array<{ left: string; right: string }>
  orderingItems?: string[]
}

interface PlayerStats {
  score: number
  streak: number
  accuracy: number
  position: number
  totalAnswered: number
  correctAnswers: number
  // Enhanced statistics
  averageTimeTaken?: number
  totalTimeTaken?: number
  fastestAnswer?: number
  slowestAnswer?: number
}

interface Team {
  id: string
  name: string
  color: string
  members: string[]
  score: number
}

export default function TeamParticipantQuiz() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const playerName = searchParams.get("name") || "Anonymous"
  const quizCode = params.code as string

  const [gameState, setGameState] = useState<"waiting" | "active" | "answered" | "results" | "completed">("waiting")
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [powerUps, setPowerUps] = useState({ fiftyFifty: 1, extraTime: 1, doublePoints: 1 })
  const [activePowerUp, setActivePowerUp] = useState<string | null>(null)
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([])
  
  const [matchingAnswers, setMatchingAnswers] = useState<{[key: number]: number}>({})
  const [orderingAnswers, setOrderingAnswers] = useState<string[]>([])
  const [selectedLeftItem, setSelectedLeftItem] = useState<number | null>(null)

  const matchedRightItems = useMemo(() => {
    return new Set(Object.values(matchingAnswers))
  }, [matchingAnswers])

  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    score: 0,
    streak: 0,
    accuracy: 0,
    position: 1,
    totalAnswered: 0,
    correctAnswers: 0,
    // Enhanced statistics
    averageTimeTaken: 0,
    totalTimeTaken: 0,
    fastestAnswer: 0,
    slowestAnswer: 0,
  })

  const [proctorViolations, setProctorViolations] = useState(0)
  const [showProctorModal, setShowProctorModal] = useState(false)
  const [proctorTimer, setProctorTimer] = useState(10)
  const proctorIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const violationTriggeredRef = useRef(false)

  const [questions, setQuestions] = useState<Question[]>([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [teams, setTeams] = useState<Team[]>([])
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null)
  
  const [showTerminationModal, setShowTerminationModal] = useState(false)
  const [sessionStatus, setSessionStatus] = useState<string>("waiting")
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected">("connecting")
  const [showProctoringWarning, setShowProctoringWarning] = useState(false)
  const [showRestrictionPage, setShowRestrictionPage] = useState(false)

  // Check if participant is already in session
  useEffect(() => {
    async function checkSessionStatus() {
      try {
        const res = await fetch(`/api/sessions?code=${quizCode}`)
        if (res.ok) {
          const data = await res.json()
          console.log("Session info:", data.session)
          
          // Check if current user is already a participant
          const isParticipant = data.session.session_participants?.some((p: any) => 
            p.users && p.users.username === playerName
          ) || false
          
          if (!isParticipant) {
            // Join the session if not already a participant
            try {
              const joinRes = await fetch("/api/sessions/join", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                  code: quizCode, 
                  username: playerName 
                })
              })
              
              if (!joinRes.ok) {
                const errorData = await joinRes.json().catch(() => ({}))
                if (errorData.error === "Session has already started") {
                  console.log("Session already started - continuing as participant")
                  // Continue with the flow even if session has started
                } else {
                  console.warn("Failed to join session:", errorData.error || "Unknown error")
                }
              } else {
                console.log("Successfully joined session")
              }
            } catch (joinError) {
              console.warn("Error joining session:", joinError)
              // Continue with the flow even if joining fails
            }
          } else {
            console.log("User is already a participant")
          }
        }
      } catch (error) {
        console.error("Error checking session status:", error)
      }
    }
    
    checkSessionStatus()
  }, [quizCode, playerName])

  // Fetch questions
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(`/api/sessions/questions?code=${quizCode}`)
        if (res.ok) {
          const data = await res.json()
          console.log("Raw questions data:", data.questions)
          
          // Process questions to match the expected format
          const processedQuestions = data.questions.map((q: any) => {
            console.log("Processing question:", q)
            console.log("Question options:", q.options)
            
            // Sort options by option_index to maintain order
            const sortedOptions = q.options ? q.options.sort((a: any, b: any) => a.option_index - b.option_index) : []
            console.log("Sorted options:", sortedOptions)
            
            const processedQuestion = {
              id: q.id.toString(),
              question: q.question,
              type: q.type === 'multiple_choice' ? 'multiple-choice' : 
                    q.type === 'true_false' ? 'true-false' : 
                    q.type === 'matching_pairs' ? 'matching-pairs' :
                    q.type === 'ordering' ? 'ordering' : 'multiple-choice',
              options: sortedOptions.map((opt: any) => opt.option_text),
              timeLimit: q.time_limit || 30,
              points: q.points || 100,
              correct_answer: q.correct_answer,
              // Add new question type data
              matchingPairs: q.matching_pairs?.map((pair: any) => ({ left: pair.left_item, right: pair.right_item })) || [],
              orderingItems: q.ordering_items?.map((item: any) => item.item_text) || [],
            }
            
            console.log("Raw question type from DB:", q.type)
            console.log("Processed question:", processedQuestion)
            return processedQuestion
          })
          
          console.log("Processed questions:", processedQuestions)
          setQuestions(processedQuestions)
        } else {
          console.error("Failed to fetch questions:", res.status, res.statusText)
        }
      } catch (error) {
        console.error("Error fetching questions:", error)
      }
    }
    
    fetchQuestions()
  }, [quizCode])

  // Fetch teams and current team
  useEffect(() => {
    async function fetchTeams() {
      try {
        const res = await fetch(`/api/sessions/participants?code=${quizCode}`)
        if (res.ok) {
          const data = await res.json()
          const participants = data.participants || []
          
          // Find current user's team
          const currentParticipant = participants.find((p: any) => p.users.username === playerName)
          if (currentParticipant && currentParticipant.team) {
            // Get team info from quiz
            const sessionRes = await fetch(`/api/sessions?code=${quizCode}`)
            if (sessionRes.ok) {
              const sessionData = await sessionRes.json()
              const quizRes = await fetch(`/api/quizzes/${sessionData.session.quiz_id}`)
              if (quizRes.ok) {
                const quizData = await quizRes.json()
                const quiz = quizData.quiz || quizData
                
                if (quiz?.teams) {
                  const userTeam = quiz.teams.find((t: any) => t.name === currentParticipant.team)
                  if (userTeam) {
                    setCurrentTeam({
                      id: userTeam.id.toString(),
                      name: userTeam.name,
                      color: userTeam.color,
                      members: participants
                        .filter((p: any) => p.team === userTeam.name)
                        .map((p: any) => p.users.username),
                      score: 0
                    })
                  }
                }
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching teams:", error)
      }
    }
    
    fetchTeams()
  }, [quizCode, playerName])

  // Setup event source for real-time updates
  useEffect(() => {
    const setupEventSource = () => {
      try {
        const eventSource = new EventSource(`/api/sessions/events?code=${quizCode}`)
        
        eventSource.onopen = () => {
          console.log("EventSource connected")
          setConnectionStatus("connected")
        }
        
        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data)
          console.log("Event received:", data)
          
          if (data.type === 'session_update') {
            const sessionStatus = data.session.status
            console.log(`Session status: ${sessionStatus}`)
            setSessionStatus(sessionStatus)
            
            // Start the quiz when session becomes active
            if (sessionStatus === "active" && gameState === "waiting" && questions.length > 0) {
              console.log("Session is now active, starting quiz...")
              console.log("Current state:", { sessionStatus, gameState, questionsLength: questions.length, questionIndex })
              
              // Start from the first question
              const startIndex = 0
              
              console.log(`Starting quiz from question ${startIndex + 1}`)
              
              setQuestionIndex(startIndex)
              setCurrentQuestion(questions[startIndex])
              setGameState("active")
              setTimeRemaining(questions[startIndex].timeLimit || 30)
              setSelectedAnswer(null)
              setShowFeedback(false)
              setHiddenOptions([])
              setMatchingAnswers({})
              setOrderingAnswers([])
              setActivePowerUp(null)
              setShowProctoringWarning(true)
            } else if (sessionStatus === "completed" && gameState !== "completed") {
              setGameState("completed")
              setSessionStatus("completed")
              // Redirect to team quiz review
              router.push(`/participant/team-quiz-review/${quizCode}?name=${encodeURIComponent(playerName)}`)
            } else if (sessionStatus === "terminated") {
              setShowTerminationModal(true)
            }
          } else if (data.type === "session_started") {
            setGameState("active")
            setSessionStatus("active")
            setShowProctoringWarning(true)
          } else if (data.type === "question_started") {
            setCurrentQuestion(data.question)
            setQuestionIndex(data.questionIndex || 0)
            setTimeRemaining(data.question.timeLimit || 30)
            setSelectedAnswer(null)
            setShowFeedback(false)
            setHiddenOptions([])
            setMatchingAnswers({})
            setOrderingAnswers([])
            setActivePowerUp(null)
          } else if (data.type === "question_ended") {
            setGameState("answered")
            setShowFeedback(true)
          } else if (data.type === "session_ended") {
            setGameState("completed")
            setSessionStatus("completed")
            // Redirect to team quiz review
            router.push(`/participant/team-quiz-review/${quizCode}?name=${encodeURIComponent(playerName)}`)
          } else if (data.type === "session_terminated") {
            setShowTerminationModal(true)
          }
        }
        
        eventSource.onerror = (error) => {
          console.error("EventSource error:", error)
          setConnectionStatus("disconnected")
          eventSource.close()
          
          // Fallback to polling
          setTimeout(setupPolling, 1000)
        }
        
        return eventSource
      } catch (error) {
        console.error("Error setting up EventSource:", error)
        setConnectionStatus("disconnected")
        return null
      }
    }
    
    const eventSource = setupEventSource()
    
    return () => {
      if (eventSource) {
        eventSource.close()
      }
    }
  }, [quizCode, gameState, questions.length, questionIndex, router, playerName])

  // Fallback polling mechanism
  const setupPolling = () => {
    const interval = setInterval(async () => {
      try {
        const sessionRes = await fetch(`/api/sessions?code=${quizCode}`)
        if (sessionRes.ok) {
          const sessionData = await sessionRes.json()
          const sessionStatus = sessionData.session.status
          setSessionStatus(sessionStatus)
          
          if (sessionStatus === "active" && gameState === "waiting" && questions.length > 0) {
            console.log("Session is now active (polling), starting quiz...")
            console.log("Current state:", { sessionStatus, gameState, questionsLength: questions.length, questionIndex })
            
            // Start from the first question
            const startIndex = 0
            
            setQuestionIndex(startIndex)
            setCurrentQuestion(questions[startIndex])
            setGameState("active")
            setTimeRemaining(questions[startIndex].timeLimit || 30)
            setSelectedAnswer(null)
            setShowFeedback(false)
            setHiddenOptions([])
            setMatchingAnswers({})
            setOrderingAnswers([])
            setActivePowerUp(null)
            setShowProctoringWarning(true)
          } else if (sessionStatus === "completed" && gameState !== "completed") {
            setGameState("completed")
            router.push(`/participant/team-quiz-review/${quizCode}?name=${encodeURIComponent(playerName)}`)
          } else if (sessionStatus === "terminated") {
            setShowTerminationModal(true)
          }
        }
      } catch (error) {
        console.error("Error polling session:", error)
      }
    }, 2000)
    
    return interval
  }

  useEffect(() => {
    if (connectionStatus === "disconnected") {
      const interval = setupPolling()
      return () => clearInterval(interval)
    }
  }, [quizCode, gameState, connectionStatus, router, playerName])

  // Timer countdown
  useEffect(() => {
    if (gameState === "active" && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // When timer runs out, show wrong answer and go to next question
            handleTimeUp()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [gameState, timeRemaining])

  // Proctoring system - improved implementation from regular quiz
  useEffect(() => {
    let fullscreenRequestInProgress = false
    
    function triggerProctorViolation() {
      if (violationTriggeredRef.current || fullscreenRequestInProgress) return; // Prevent double trigger
      violationTriggeredRef.current = true;
      
      console.log("Proctoring violation detected!")
      setProctorViolations((prev) => {
        const newCount = prev + 1
        console.log(`Violation count: ${newCount}`)
        
        if (newCount >= 3) {
          console.log("Max violations reached, showing restriction page")
          setShowRestrictionPage(true)
          return newCount
        } else {
          console.log("Showing proctor modal")
          setShowProctorModal(true)
          return newCount
        }
      })
    }
    
    function handleVisibilityChange() {
      if (document.visibilityState === "hidden" && (gameState === "active" || gameState === "answered")) {
        console.log("Tab/window hidden - proctoring violation")
        triggerProctorViolation()
      }
    }
    
    function handleBlur() {
      if (gameState === "active" || gameState === "answered") {
        console.log("Window lost focus - proctoring violation")
        triggerProctorViolation()
      }
    }
    
    function handleFullscreenChange() {
      // Add a small delay to prevent false triggers during fullscreen entry
      setTimeout(() => {
        if (!document.fullscreenElement && (gameState === "active" || gameState === "answered") && !fullscreenRequestInProgress) {
          console.log("Exited fullscreen - proctoring violation")
          triggerProctorViolation()
        }
      }, 500)
    }
    
    // Start proctoring immediately when quiz becomes active
    if (gameState === "active" || gameState === "answered") {
      console.log("Starting proctoring system for team quiz...")
      
      // Set flag when requesting fullscreen
      fullscreenRequestInProgress = true
      setTimeout(() => {
        fullscreenRequestInProgress = false
        console.log("Fullscreen establishment period ended, proctoring fully active")
      }, 2000) // Allow 2 seconds for fullscreen to be established
      
      // Add event listeners immediately
      window.addEventListener("blur", handleBlur)
      document.addEventListener("visibilitychange", handleVisibilityChange)
      document.addEventListener("fullscreenchange", handleFullscreenChange)
      
      console.log("Proctoring event listeners added")
      
      return () => {
        console.log("Removing proctoring event listeners")
        window.removeEventListener("blur", handleBlur)
        document.removeEventListener("visibilitychange", handleVisibilityChange)
        document.removeEventListener("fullscreenchange", handleFullscreenChange)
      }
    } else {
      console.log("Quiz not active, proctoring disabled. Game state:", gameState)
    }
  }, [gameState])

  // Proctoring modal logic (force quit site when timer runs out or after 2 warnings)
  useEffect(() => {
    if (showProctorModal) {
      setProctorTimer(10)
      if (proctorIntervalRef.current) clearInterval(proctorIntervalRef.current)
      proctorIntervalRef.current = setInterval(() => {
        setProctorTimer((prev) => {
          if (prev <= 1) {
            clearInterval(proctorIntervalRef.current!)
            setShowProctorModal(false)
            // Force quit site when timer runs out
            setGameState("completed")
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
      return () => {
        if (proctorIntervalRef.current) {
          clearInterval(proctorIntervalRef.current)
        }
      }
    }
  }, [showProctorModal])

  // Restriction page auto-redirect
  useEffect(() => {
    if (showRestrictionPage) {
      const timeout = setTimeout(() => {
        setShowRestrictionPage(false)
        router.push("/participant/dashboard")
      }, 5000)
      
      return () => clearTimeout(timeout)
    }
  }, [showRestrictionPage, router])

  // Request fullscreen when quiz starts
  useEffect(() => {
    if (gameState === "active") {
      const requestFullscreen = async () => {
        try {
          const elem = document.documentElement
          if (elem.requestFullscreen) {
            await elem.requestFullscreen()
          } else if ((elem as any).webkitRequestFullscreen) {
            await (elem as any).webkitRequestFullscreen()
          } else if ((elem as any).msRequestFullscreen) {
            await (elem as any).msRequestFullscreen()
          }
        } catch (error) {
          console.log("Fullscreen request failed:", error)
          // Don't show error to user, just continue without fullscreen
        }
      }
      
      // Add a small delay to ensure the page is fully loaded
      setTimeout(requestFullscreen, 500)
    }
    // Exit fullscreen when quiz ends
    if (gameState === "completed" || gameState === "waiting") {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(console.log)
      }
    }
  }, [gameState])

  // Safety timeout to prevent getting stuck in answered state
  useEffect(() => {
    if (gameState === "answered") {
      const timeout = setTimeout(() => {
        console.log("Safety timeout triggered - auto-advancing to next question")
        handleNextQuestion()
      }, currentQuestion?.type === "multiple-choice" || currentQuestion?.type === "true-false" ? 5000 : 30000) // 5 seconds for MCQ/True-False, 30 seconds for others
      
      return () => clearTimeout(timeout)
    }
  }, [gameState, questionIndex, currentQuestion?.type])

  const handleNextQuestion = () => {
    setShowFeedback(false)
    setSelectedAnswer(null)
    setHiddenOptions([])
    setMatchingAnswers({})
    setOrderingAnswers([])
    setActivePowerUp(null)
    
    if (questionIndex < questions.length - 1) {
      const nextIndex = questionIndex + 1
      console.log(`Moving to question ${nextIndex + 1} of ${questions.length}`)
      setQuestionIndex(nextIndex)
      setCurrentQuestion(questions[nextIndex])
      setTimeRemaining(questions[nextIndex].timeLimit || 30)
      setGameState("active") // Ensure we're back in active state
    } else {
      // Quiz completed
      console.log("Quiz completed - all questions answered")
      setGameState("completed")
      // Redirect to results
      router.push(`/participant/team-quiz-review/${quizCode}?name=${encodeURIComponent(playerName)}`)
    }
  }

  const handleSkipQuestion = () => {
    console.log("Skip question triggered")
    console.log("Current game state:", gameState)
    if (gameState === "active") {
      console.log("Submitting skip answer")
      // Submit answer as incorrect when skipping
      const timeTaken = (currentQuestion?.timeLimit || 30) - timeRemaining
      const basePoints = currentQuestion?.points || 10
      const pointsMultiplier = activePowerUp === "doublePoints" ? 2 : 1
      const streakBonus = Math.floor(playerStats.streak / 3) * 5
      const pointsAwarded = 0 // No points for skipping
      
      // Update time statistics
      const newTotalTime = (playerStats.totalTimeTaken || 0) + timeTaken
      const newFastestAnswer = (playerStats.fastestAnswer || 0) === 0 ? timeTaken : Math.min((playerStats.fastestAnswer || 0), timeTaken)
      const newSlowestAnswer = Math.max((playerStats.slowestAnswer || 0), timeTaken)
      const newAverageTime = Math.round(newTotalTime / (playerStats.totalAnswered + 1))
      
      const newStats = {
        ...playerStats,
        score: playerStats.score, // No points added
        streak: 0, // Reset streak
        totalAnswered: playerStats.totalAnswered + 1,
        correctAnswers: playerStats.correctAnswers, // No correct answer
        accuracy: Math.round((playerStats.correctAnswers / (playerStats.totalAnswered + 1)) * 100),
        // Update time statistics
        totalTimeTaken: newTotalTime,
        averageTimeTaken: newAverageTime,
        fastestAnswer: newFastestAnswer,
        slowestAnswer: newSlowestAnswer,
      }
      
      setPlayerStats(newStats)
      setIsCorrect(false)
      setShowFeedback(true)
      setGameState("answered")
      
      // Save answer to server
      saveAnswer(
        currentQuestion?.id || "",
        null,
        false,
        timeTaken,
        0,
        playerStats.streak
      )
      
      // Update participant stats
      updateParticipantStats(newStats)
      
      console.log(`Question skipped, Points: 0`)
      console.log(`Question ${questionIndex + 1} of ${questions.length} completed`)
      
      // Auto-advance after 2 seconds
      setTimeout(() => {
        handleNextQuestion()
      }, 2000)
    } else {
      console.log("Cannot skip - game state is:", gameState)
    }
  }

  const usePowerUp = (powerUp: string) => {
    if (powerUps[powerUp as keyof typeof powerUps] <= 0 || gameState !== "active") return
    
    setPowerUps(prev => ({ ...prev, [powerUp]: prev[powerUp as keyof typeof powerUps] - 1 }))
    
    switch (powerUp) {
      case "fiftyFifty":
        if (currentQuestion && currentQuestion.options) {
          const correctIndex = currentQuestion.correct_answer
          const wrongOptions = currentQuestion.options
            .map((_, index) => index)
            .filter(index => index !== correctIndex)
          
          // Hide 2 wrong options
          const optionsToHide = wrongOptions
            .sort(() => Math.random() - 0.5)
            .slice(0, 2)
          
          setHiddenOptions(optionsToHide)
        }
        break
      case "extraTime":
        setTimeRemaining(prev => prev + 15)
        break
      case "doublePoints":
        setActivePowerUp("doublePoints")
        setTimeout(() => setActivePowerUp(null), 30000) // 30 seconds
        break
    }
  }

  const handleAnswerSelect = (answer: string | number) => {
    if (gameState === "active") {
      setSelectedAnswer(answer)
      
      // For MCQ and True/False questions, provide immediate feedback and auto-advance
      if (currentQuestion && (currentQuestion.type === "multiple-choice" || currentQuestion.type === "true-false")) {
        // Check if answer is correct
        const isCorrect = answer === currentQuestion.correct_answer
        
        // Calculate points and stats
        const timeTaken = (currentQuestion.timeLimit || 30) - timeRemaining
        const basePoints = currentQuestion.points || 10
        const pointsMultiplier = activePowerUp === "doublePoints" ? 2 : 1
        const streakBonus = Math.floor(playerStats.streak / 3) * 5
        const pointsAwarded = (basePoints + streakBonus) * pointsMultiplier
        
        // Update time statistics
        const newTotalTime = (playerStats.totalTimeTaken || 0) + timeTaken
        const newFastestAnswer = (playerStats.fastestAnswer || 0) === 0 ? timeTaken : Math.min((playerStats.fastestAnswer || 0), timeTaken)
        const newSlowestAnswer = Math.max((playerStats.slowestAnswer || 0), timeTaken)
        const newAverageTime = Math.round(newTotalTime / (playerStats.totalAnswered + 1))
        
        const newStats = {
          ...playerStats,
          score: playerStats.score + (isCorrect ? pointsAwarded : 0),
          streak: isCorrect ? playerStats.streak + 1 : 0,
          totalAnswered: playerStats.totalAnswered + 1,
          correctAnswers: playerStats.correctAnswers + (isCorrect ? 1 : 0),
          accuracy: Math.round(((playerStats.correctAnswers + (isCorrect ? 1 : 0)) / (playerStats.totalAnswered + 1)) * 100),
          // Update time statistics
          totalTimeTaken: newTotalTime,
          averageTimeTaken: newAverageTime,
          fastestAnswer: newFastestAnswer,
          slowestAnswer: newSlowestAnswer,
        }
        
        setPlayerStats(newStats)
        setIsCorrect(isCorrect)
        setShowFeedback(true)
        setGameState("answered")
        
        // Save answer to server
        saveAnswer(
          currentQuestion.id,
          answer,
          isCorrect,
          timeTaken,
          isCorrect ? pointsAwarded : 0,
          playerStats.streak
        )
        
        // Update participant stats
        updateParticipantStats(newStats)
        
        console.log(`Answer submitted: ${answer}, Correct: ${isCorrect}, Points: ${isCorrect ? pointsAwarded : 0}`)
        console.log(`Question ${questionIndex + 1} of ${questions.length} completed`)
        
        // Auto-advance after 2 seconds
        setTimeout(() => {
          handleNextQuestion()
        }, 2000)
      }
    }
  }

  const handleMatchingPairSelect = (leftIndex: number, rightIndex: number) => {
    if (gameState !== "active") return
    
    console.log("Matching pair select:", { leftIndex, rightIndex, selectedLeftItem, matchingAnswers })
    
    if (rightIndex === -1) {
      // Clicking on a left item
      if (selectedLeftItem === leftIndex) {
        // Deselect if clicking the same left item
        console.log("Deselecting left item:", leftIndex)
        setSelectedLeftItem(null)
      } else {
        // Select this left item (deselect any previously selected)
        console.log("Selecting left item:", leftIndex)
        setSelectedLeftItem(leftIndex)
      }
    } else {
      // Clicking on a right item
      if (selectedLeftItem !== null && !matchedRightItems.has(rightIndex)) {
        // Create a new match when right item is clicked and a left item is selected
        console.log("Creating match:", selectedLeftItem, "->", rightIndex)
        setMatchingAnswers(prev => {
          const newMatches = { ...prev, [selectedLeftItem]: rightIndex }
          console.log("New matches:", newMatches)
          return newMatches
        })
        setSelectedLeftItem(null)
      }
    }
  }

  const handleOrderingSelect = (itemIndex: number, newPosition: number) => {
    if (gameState !== "active") return
    
    setOrderingAnswers(prev => {
      const newOrder = [...prev]
      newOrder[newPosition] = currentQuestion?.orderingItems?.[itemIndex] || ""
      return newOrder
    })
  }

  const handleSubmitNewQuestionType = () => {
    if (gameState !== "active") return
    
    let answer: string | number | null = null
    let isCorrect = false
    
    if (currentQuestion?.type === "matching-pairs") {
      // Check if all pairs are matched
      const allMatched = currentQuestion.matchingPairs?.every((_, index) => 
        matchingAnswers[index] !== undefined
      )
      
      if (allMatched) {
        // Check correctness by comparing the matched pairs with the correct pairs
        isCorrect = currentQuestion.matchingPairs?.every((pair, index) => {
          const matchedRightIndex = matchingAnswers[index]
          const correctRightIndex = currentQuestion.matchingPairs?.findIndex(p => p.right === pair.right)
          return matchedRightIndex === correctRightIndex
        }) || false
        
        answer = JSON.stringify(matchingAnswers)
      } else {
        // Not all pairs matched, show error
        toast({
          title: "Incomplete Matching",
          description: "Please match all items before submitting.",
          variant: "destructive",
        })
        return
      }
    } else if (currentQuestion?.type === "ordering") {
      // Check if all items are ordered
      const allOrdered = currentQuestion.orderingItems?.every((_, index) => 
        orderingAnswers[index] !== undefined
      )
      
      if (allOrdered) {
        // Check correctness
        isCorrect = currentQuestion.orderingItems?.every((item, index) => 
          orderingAnswers[index] === item
        ) || false
        
        answer = JSON.stringify(orderingAnswers)
      } else {
        // Not all items ordered, show error
        toast({
          title: "Incomplete Ordering",
          description: "Please arrange all items before submitting.",
          variant: "destructive",
        })
        return
      }
    }
    
    if (answer !== null) {
      handleSubmitAnswer(answer, isCorrect)
    }
  }

  const handleSubmitAnswer = (answer?: string | number, isCorrect?: boolean) => {
    if (gameState !== "active" && gameState !== "answered") return
    
    const finalAnswer = answer ?? selectedAnswer
    const finalIsCorrect = isCorrect ?? (finalAnswer === currentQuestion?.correct_answer)
    
    if (finalAnswer === null) return
    
    const timeTaken = (currentQuestion?.timeLimit || 30) - timeRemaining
    const basePoints = currentQuestion?.points || 10
    const pointsMultiplier = activePowerUp === "doublePoints" ? 2 : 1
    const streakBonus = Math.floor(playerStats.streak / 3) * 5
    const pointsAwarded = (basePoints + streakBonus) * pointsMultiplier
    
    // Update time statistics
    const newTotalTime = (playerStats.totalTimeTaken || 0) + timeTaken
    const newFastestAnswer = (playerStats.fastestAnswer || 0) === 0 ? timeTaken : Math.min((playerStats.fastestAnswer || 0), timeTaken)
    const newSlowestAnswer = Math.max((playerStats.slowestAnswer || 0), timeTaken)
    const newAverageTime = Math.round(newTotalTime / (playerStats.totalAnswered + 1))
    
    const newStats = {
      ...playerStats,
      score: playerStats.score + (finalIsCorrect ? pointsAwarded : 0),
      streak: finalIsCorrect ? playerStats.streak + 1 : 0,
      totalAnswered: playerStats.totalAnswered + 1,
      correctAnswers: playerStats.correctAnswers + (finalIsCorrect ? 1 : 0),
      accuracy: Math.round(((playerStats.correctAnswers + (finalIsCorrect ? 1 : 0)) / (playerStats.totalAnswered + 1)) * 100),
      // Update time statistics
      totalTimeTaken: newTotalTime,
      averageTimeTaken: newAverageTime,
      fastestAnswer: newFastestAnswer,
      slowestAnswer: newSlowestAnswer,
    }
    
    setPlayerStats(newStats)
    setIsCorrect(finalIsCorrect)
    setShowFeedback(true)
    setGameState("answered")
    
    // Save answer to server
    saveAnswer(
      currentQuestion?.id || "",
      finalAnswer,
      finalIsCorrect,
      timeTaken,
      finalIsCorrect ? pointsAwarded : 0,
      playerStats.streak
    )
    
    // Update participant stats
    updateParticipantStats(newStats)
    
    console.log(`Answer submitted: ${finalAnswer}, Correct: ${finalIsCorrect}, Points: ${finalIsCorrect ? pointsAwarded : 0}`)
    console.log(`Question ${questionIndex + 1} of ${questions.length} completed`)
  }

  const updateParticipantStats = async (stats: PlayerStats) => {
    try {
      // Calculate enhanced statistics
      const enhancedStats = {
        ...stats,
        // Enhanced statistics for better analytics
        totalAnswered: stats.totalAnswered,
        correctAnswers: stats.correctAnswers,
        incorrectAnswers: stats.totalAnswered - stats.correctAnswers,
        averageTimeTaken: stats.averageTimeTaken || 0,
        totalTimeTaken: stats.totalTimeTaken || 0,
        totalPointsEarned: stats.score,
        fastestAnswer: stats.fastestAnswer || 0,
        slowestAnswer: stats.slowestAnswer || 0,
        questionsAnswered: stats.totalAnswered,
        questionsCorrect: stats.correctAnswers,
        questionsIncorrect: stats.totalAnswered - stats.correctAnswers,
        averagePointsPerQuestion: stats.totalAnswered > 0 ? Math.round(stats.score / stats.totalAnswered) : 0,
        efficiency: stats.accuracy
      }

      await fetch("/api/sessions/update-stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: quizCode,
          username: playerName,
          stats: enhancedStats
        })
      })
    } catch (error) {
      console.error("Error updating stats:", error)
    }
  }

  const saveAnswer = async (questionId: string, selectedOption: string | number | null, isCorrect: boolean, timeTaken: number, pointsAwarded: number, streakAtTime: number) => {
    try {
      await fetch("/api/sessions/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionCode: quizCode,
          username: playerName,
          questionId: parseInt(questionId),
          selectedOption: selectedOption?.toString() || null,
          isCorrect,
          timeTaken,
          pointsAwarded,
          streakAtTime
        })
      })
    } catch (error) {
      console.error("Error saving answer:", error)
    }
  }

  const handleTimeUp = () => {
    console.log("Time up for question", questionIndex + 1)
    if (gameState === "active") {
      // Show wrong answer feedback and then go to next question
      const timeTaken = currentQuestion?.timeLimit || 30
      
      // Update time statistics
      const newTotalTime = (playerStats.totalTimeTaken || 0) + timeTaken
      const newFastestAnswer = (playerStats.fastestAnswer || 0) === 0 ? timeTaken : Math.min((playerStats.fastestAnswer || 0), timeTaken)
      const newSlowestAnswer = Math.max((playerStats.slowestAnswer || 0), timeTaken)
      const newAverageTime = Math.round(newTotalTime / (playerStats.totalAnswered + 1))
      
      const newStats = {
        ...playerStats,
        totalAnswered: playerStats.totalAnswered + 1,
        // Update time statistics
        totalTimeTaken: newTotalTime,
        averageTimeTaken: newAverageTime,
        fastestAnswer: newFastestAnswer,
        slowestAnswer: newSlowestAnswer,
      }
      
      setPlayerStats(newStats)
      setIsCorrect(false)
      setShowFeedback(true)
      setGameState("answered")
      
      // Save answer as incorrect
      saveAnswer(
        currentQuestion?.id || "",
        null,
        false,
        timeTaken,
        0,
        playerStats.streak
      )
      
      // Update participant stats
      updateParticipantStats(newStats)
      
      // Auto-advance after 2 seconds
      setTimeout(() => {
        handleNextQuestion()
      }, 2000)
    }
  }

  const handleProctorModalClose = () => {
    setShowProctorModal(false)
    violationTriggeredRef.current = false
    setProctorTimer(10)
    
    // Request fullscreen again
    const requestFullscreen = async () => {
      try {
        const elem = document.documentElement
        if (elem.requestFullscreen) {
          await elem.requestFullscreen()
        } else if ((elem as any).webkitRequestFullscreen) {
          await (elem as any).webkitRequestFullscreen()
        } else if ((elem as any).msRequestFullscreen) {
          await (elem as any).msRequestFullscreen()
        }
      } catch (error) {
        console.log("Fullscreen request failed:", error)
      }
    }
    
    if (gameState === "active" || gameState === "answered") {
      requestFullscreen()
    }
  }

  // Keyboard and security restrictions
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (gameState === "active" || gameState === "answered") {
        e.preventDefault()
        e.returnValue = "Are you sure you want to leave? Your progress will be lost."
        return "Are you sure you want to leave? Your progress will be lost."
      }
    }

    const handleContextMenu = (e: MouseEvent) => {
      if (gameState === "active" || gameState === "answered") {
        e.preventDefault()
        return false
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === "active" || gameState === "answered") {
        // Prevent common shortcuts
        if (
          (e.ctrlKey || e.metaKey) && (
            e.key === 'c' || // Copy
            e.key === 'v' || // Paste
            e.key === 'x' || // Cut
            e.key === 'a' || // Select all
            e.key === 'z' || // Undo
            e.key === 'y' || // Redo
            e.key === 's' || // Save
            e.key === 'p' || // Print
            e.key === 'f' || // Find
            e.key === 'r' || // Reload
            e.key === 'w' || // Close tab
            e.key === 't' || // New tab
            e.key === 'n' || // New window
            e.key === 'u' || // View source
            e.key === 'i' || // Developer tools
            e.key === 'j' || // Developer tools
            e.key === 'k' || // Developer tools
            e.key === 'l' || // Developer tools
            e.key === 'm' || // Minimize
            e.key === 'q' || // Quit
            e.key === 'h' || // Hide
            e.key === 'b' || // Bookmark
            e.key === 'd' || // Bookmark
            e.key === 'o' || // Open
            e.key === 'e' || // Explorer
            e.key === 'g' || // Go
            e.key === '1' || // Tab 1
            e.key === '2' || // Tab 2
            e.key === '3' || // Tab 3
            e.key === '4' || // Tab 4
            e.key === '5' || // Tab 5
            e.key === '6' || // Tab 6
            e.key === '7' || // Tab 7
            e.key === '8' || // Tab 8
            e.key === '9' || // Tab 9
            e.key === '0'    // Tab 10
          )
        ) {
          e.preventDefault()
          return false
        }

        // Prevent F1-F12 keys
        if (e.key.startsWith('F') && e.key.length <= 3) {
          e.preventDefault()
          return false
        }

        // Prevent Escape key
        if (e.key === 'Escape') {
          e.preventDefault()
          return false
        }
      }
    }

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [gameState])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <TooltipProvider>
        {/* Proctoring Warning Modal */}
        {showProctoringWarning && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
            <div className="bg-gray-800 rounded-lg shadow-2xl p-8 text-center max-w-md mx-auto border border-yellow-500">
              <AlertTriangle className="w-16 h-16 text-yellow-400 mb-4 mx-auto" />
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">Proctoring System Active</h2>
              <div className="text-left mb-6 space-y-3 text-gray-300">
                <p>⚠️ This quiz uses a proctoring system to ensure fair play:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Fullscreen mode will be required</li>
                  <li>Tab switching is not allowed</li>
                  <li>Keyboard shortcuts are disabled</li>
                  <li>Right-click is disabled</li>
                  <li>3 violations will terminate the quiz</li>
                </ul>
              </div>
              <Button 
                onClick={() => {
                  setShowProctoringWarning(false)
                  // Request fullscreen
                  document.documentElement.requestFullscreen().catch(err => {
                    console.warn('Failed to enter fullscreen:', err)
                  })
                }} 
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                I Understand - Start Quiz
              </Button>
            </div>
          </div>
        )}

        {/* Restriction Page */}
        {showRestrictionPage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
            <div className="bg-gray-800 rounded-lg shadow-2xl p-8 text-center max-w-md mx-auto border border-red-500">
              <AlertTriangle className="w-16 h-16 text-red-400 mb-4 mx-auto" />
              <h2 className="text-2xl font-bold mb-4 text-red-400">Access Restricted</h2>
              <p className="mb-4 text-gray-300">
                You have violated the proctoring system multiple times. Your access to this quiz has been restricted.
              </p>
              <p className="mb-6 text-sm text-gray-400">
                You will be redirected to the dashboard in 5 seconds.
              </p>
              <Button 
                onClick={() => {
                  setShowRestrictionPage(false)
                  router.push("/participant/dashboard")
                }} 
                className="bg-red-600 hover:bg-red-700"
              >
                Return to Dashboard
              </Button>
            </div>
          </div>
        )}

        {/* Proctor Modal */}
        {showProctorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
            <div className="bg-gray-800 rounded-lg shadow-2xl p-8 text-center max-w-md mx-auto border border-red-500">
              <h2 className="text-2xl font-bold mb-4 text-red-400">Proctoring Violation</h2>
              <p className="mb-2 text-gray-300">
                You exited fullscreen or switched tabs/windows.<br />
                <span className="text-sm text-gray-400">Violation {proctorViolations} of 3</span>
              </p>
              <p className="mb-4 text-sm text-gray-300">
                You must resume the exam within <span className="font-bold text-red-400">{proctorTimer}</span> seconds or the exam will close.
              </p>
              <Button onClick={handleProctorModalClose} className="mt-2 bg-red-600 hover:bg-red-700">
                Resume Exam
              </Button>
            </div>
          </div>
        )}

        {/* Termination Modal */}
        {showTerminationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
            <div className="bg-gray-800 rounded-lg shadow-2xl p-8 text-center max-w-md mx-auto border border-red-500">
              <AlertTriangle className="w-16 h-16 text-red-400 mb-4 mx-auto" />
              <h2 className="text-2xl font-bold mb-4 text-red-400">Quiz Terminated</h2>
              <p className="mb-4 text-gray-300">
                The quiz has been terminated by the host. You will be redirected to the dashboard in 2 seconds.
              </p>
            </div>
          </div>
        )}

        {/* Main Quiz Interface */}
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-cyan-400" style={{ color: '#06b6d4' }}>Team Quiz</h1>
                <p className="text-gray-400">Code: {quizCode}</p>
              </div>
              {currentTeam && (
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: currentTeam.color }}
                  />
                  <span className="text-cyan-400 font-medium text-lg">
                    {currentTeam.name}
                  </span>
                </div>
              )}
              {!currentTeam && (
                <div className="text-gray-500 text-sm">No team assigned</div>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-400">Player</p>
                <p className="text-white font-medium">{playerName}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400">Score</p>
                <p className="text-white font-medium">{playerStats.score}</p>
              </div>
              {(gameState === "active" || gameState === "answered") && (
                <div className="text-center">
                  <p className="text-sm text-gray-400">Violations</p>
                  <p className={`font-medium ${proctorViolations >= 2 ? 'text-red-400' : 'text-yellow-400'}`}>
                    {proctorViolations}/3
                  </p>
                </div>
              )}
              {(gameState === "active" || gameState === "answered") && (
                <div className="text-center">
                  <p className="text-sm text-gray-400">Proctoring</p>
                  <p className="text-green-400 font-medium">Active</p>
                </div>
              )}
            </div>
          </div>

          {/* Game State Content */}
          {gameState === "waiting" && (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold text-white mb-2">Waiting for Quiz to Start</h2>
              <p className="text-gray-400">The host will start the quiz shortly...</p>
              
              {/* Debug Information */}
              <div className="mt-8 p-4 bg-gray-800 rounded-lg text-left max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-white mb-2">Debug Info:</h3>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>Session Status: {sessionStatus}</p>
                  <p>Game State: {gameState}</p>
                  <p>Questions Loaded: {questions.length}</p>
                  <p>Connection: {connectionStatus}</p>
                  <p>Player: {playerName}</p>
                  <p>Code: {quizCode}</p>
                </div>
                
                {/* Manual Start Button for Testing */}
                {questions.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <p className="text-sm text-gray-400 mb-2">For Testing:</p>
                    <Button 
                      onClick={() => {
                        console.log("Manual start triggered")
                        setGameState("active")
                        setCurrentQuestion(questions[0])
                        setQuestionIndex(0)
                        setTimeRemaining(questions[0].timeLimit || 30)
                        setShowProctoringWarning(true)
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-sm"
                    >
                      Start Quiz Manually
                    </Button>
                    
                    <Button 
                      onClick={async () => {
                        try {
                          const res = await fetch("/api/sessions/status", {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ code: quizCode, status: "active" })
                          })
                          if (res.ok) {
                            console.log("Session activated manually")
                            setSessionStatus("active")
                          }
                        } catch (error) {
                          console.error("Error activating session:", error)
                        }
                      }}
                      className="bg-green-600 hover:bg-green-700 text-sm ml-2"
                    >
                      Activate Session
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {gameState === "active" && currentQuestion && (
            <div className="space-y-6">
              {/* Timer and Progress */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">{timeRemaining}s</span>
                </div>
                <Progress value={(timeRemaining / (currentQuestion.timeLimit || 30)) * 100} className="w-64" />
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-medium">{currentQuestion.points} pts</span>
                </div>
              </div>

              {/* Question */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-black">
                    Question {questionIndex + 1} of {questions.length}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-black mb-6">{currentQuestion.question}</p>

                  {/* Question Type Specific UI */}
                  {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <Button
                          key={index}
                          variant={selectedAnswer === index ? "default" : "outline"}
                          className={`w-full justify-start text-left h-auto p-4 ${
                            hiddenOptions.includes(index) ? "hidden" : ""
                          }`}
                          onClick={() => handleAnswerSelect(index)}
                        >
                          <span className="mr-3 font-medium">{String.fromCharCode(65 + index)}.</span>
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}

                  {currentQuestion.type === "true-false" && (
                    <div className="space-y-3">
                      <Button
                        variant={selectedAnswer === "true" ? "default" : "outline"}
                        className="w-full justify-start text-left h-auto p-4"
                        onClick={() => handleAnswerSelect("true")}
                      >
                        <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                        True
                      </Button>
                      <Button
                        variant={selectedAnswer === "false" ? "default" : "outline"}
                        className="w-full justify-start text-left h-auto p-4"
                        onClick={() => handleAnswerSelect("false")}
                      >
                        <XCircle className="w-5 h-5 mr-3 text-red-400" />
                        False
                      </Button>
                    </div>
                  )}

                  {currentQuestion.type === "matching-pairs" && currentQuestion.matchingPairs && (
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="font-medium text-white mb-3">Left Items</h3>
                        {currentQuestion.matchingPairs.map((pair, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                              selectedLeftItem === index
                                ? "border-blue-400 bg-blue-900/20"
                                : matchingAnswers[index] !== undefined
                                ? "border-green-400 bg-green-900/20"
                                : "border-gray-600 bg-gray-700 hover:border-gray-500"
                            }`}
                            onClick={() => handleMatchingPairSelect(index, -1)}
                          >
                            <span className="font-medium text-white">{index + 1}.</span> {pair.left}
                            {matchingAnswers[index] !== undefined && (
                              <span className="ml-2 text-green-400 text-sm">✓ Matched</span>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-medium text-white mb-3">Right Items</h3>
                        {currentQuestion.matchingPairs.map((pair, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                              matchedRightItems.has(index)
                                ? "border-green-400 bg-green-900/20"
                                : selectedLeftItem !== null && !matchedRightItems.has(index)
                                ? "border-blue-400 bg-blue-900/20"
                                : "border-gray-600 bg-gray-700 hover:border-gray-500"
                            }`}
                            onClick={() => {
                              if (selectedLeftItem !== null && !matchedRightItems.has(index)) {
                                handleMatchingPairSelect(selectedLeftItem, index)
                              }
                            }}
                          >
                            <span className="font-medium text-white">{index + 1}.</span> {pair.right}
                            {matchedRightItems.has(index) && (
                              <span className="ml-2 text-green-400 text-sm">✓ Matched</span>
                            )}
                          </div>
                        ))}
                      </div>
                      {/* Show current matches */}
                      {Object.keys(matchingAnswers).length > 0 && (
                        <div className="col-span-2 mt-4">
                          <h4 className="font-medium text-white mb-2">Current Matches:</h4>
                          <div className="space-y-2">
                            {Object.entries(matchingAnswers).map(([leftIndex, rightIndex]) => {
                              const leftItem = currentQuestion.matchingPairs?.[parseInt(leftIndex)]?.left
                              const rightItem = currentQuestion.matchingPairs?.[rightIndex]?.right
                              return (
                                <div key={leftIndex} className="p-2 rounded bg-green-900/20 border border-green-400">
                                  <span className="font-medium text-green-400">{parseInt(leftIndex) + 1}.</span> {leftItem} ↔ <span className="font-medium text-green-400">{rightIndex + 1}.</span> {rightItem}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                      {/* Instructions */}
                      <div className="col-span-2 mt-4 p-3 bg-blue-900/20 border border-blue-400 rounded">
                        <p className="text-sm text-blue-300">
                          <strong>Instructions:</strong> Click on a left item to select it (it will highlight in blue), then click on a right item to create a match. 
                          All items must be matched before you can submit your answer.
                        </p>
                        {/* Debug info */}
                        <div className="mt-2 text-xs text-blue-200">
                          <p>Selected left item: {selectedLeftItem !== null ? selectedLeftItem + 1 : 'None'}</p>
                          <p>Matches made: {Object.keys(matchingAnswers).length}/{currentQuestion.matchingPairs?.length || 0}</p>
                          <p>Matched right items: {Array.from(matchedRightItems).map(i => i + 1).join(', ') || 'None'}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentQuestion.type === "ordering" && currentQuestion.orderingItems && (
                    <div className="space-y-3">
                      <h3 className="font-medium text-white mb-3">Arrange in correct order:</h3>
                      {currentQuestion.orderingItems.map((item, index) => (
                        <div
                          key={index}
                          className="p-3 rounded-lg border-2 border-gray-600 bg-gray-700 cursor-pointer hover:border-gray-500"
                          onClick={() => handleOrderingSelect(index, orderingAnswers.length)}
                        >
                          {item}
                        </div>
                      ))}
                      {orderingAnswers.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium text-white mb-2">Your order:</h4>
                          <div className="space-y-2">
                            {orderingAnswers.map((answer, index) => (
                              <div key={index} className="p-2 rounded bg-blue-900/20 border border-blue-400">
                                {index + 1}. {answer}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Power-ups */}
              <div className="flex justify-center gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={powerUps.fiftyFifty <= 0 || gameState !== "active"}
                      onClick={() => usePowerUp("fiftyFifty")}
                      className="flex items-center gap-2"
                    >
                      <Shield className="w-4 h-4" />
                      50:50 ({powerUps.fiftyFifty})
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Eliminate two wrong answers</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={powerUps.extraTime <= 0 || gameState !== "active"}
                      onClick={() => usePowerUp("extraTime")}
                      className="flex items-center gap-2"
                    >
                      <Clock className="w-4 h-4" />
                      +15s ({powerUps.extraTime})
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add 15 seconds to timer</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={powerUps.doublePoints <= 0 || gameState !== "active"}
                      onClick={() => usePowerUp("doublePoints")}
                      className="flex items-center gap-2"
                    >
                      <Trophy className="w-4 h-4" />
                      2x Points ({powerUps.doublePoints})
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Double points for 30 seconds</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                {(currentQuestion.type === "matching-pairs" || currentQuestion.type === "ordering") ? (
                  <Button
                    onClick={handleSubmitNewQuestionType}
                    disabled={
                      (currentQuestion.type === "matching-pairs" && 
                       Object.keys(matchingAnswers).length < (currentQuestion.matchingPairs?.length || 0)) ||
                      (currentQuestion.type === "ordering" && 
                       orderingAnswers.length < (currentQuestion.orderingItems?.length || 0))
                    }
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  >
                    Submit Answer
                  </Button>
                ) : null}
                
                <Button
                  variant="outline"
                  onClick={handleSkipQuestion}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Skip Question
                </Button>
              </div>
            </div>
          )}

          {gameState === "answered" && showFeedback && (
            <div className="text-center py-20">
              <div className={`text-6xl mb-4 ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                {isCorrect ? "✓" : "✗"}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {isCorrect ? "Correct!" : "Incorrect"}
              </h2>
              <p className="text-gray-400 mb-6">
                {isCorrect ? "Great job!" : "Better luck next time!"}
              </p>
              
              {/* Only show Next Question button for matching and ordering questions */}
              {(currentQuestion?.type === "matching-pairs" || currentQuestion?.type === "ordering") && (
                <div className="space-y-4">
                  <Button 
                    onClick={handleNextQuestion} 
                    className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
                  >
                    {questionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                  </Button>
                  
                  <p className="text-sm text-gray-500">
                    Auto-advancing in 30 seconds...
                  </p>
                </div>
              )}
              
              {/* For MCQ and True/False, show auto-advance message */}
              {(currentQuestion?.type === "multiple-choice" || currentQuestion?.type === "true-false") && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Auto-advancing to next question...
                  </p>
                </div>
              )}
              
              {/* Debug Info for answered state */}
              <div className="mt-8 p-4 bg-gray-800 rounded-lg text-left max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-white mb-2">Debug Info:</h3>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>Question: {questionIndex + 1} of {questions.length}</p>
                  <p>Question Type: {currentQuestion?.type}</p>
                  <p>Game State: {gameState}</p>
                  <p>Proctoring: Active</p>
                  <p>Violations: {proctorViolations}/3</p>
                </div>
              </div>
            </div>
          )}

          {gameState === "completed" && (
            <div className="text-center py-20">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Quiz Completed!</h2>
              <p className="text-gray-400">Redirecting to results...</p>
            </div>
          )}
        </div>
      </TooltipProvider>
    </div>
  )
}
