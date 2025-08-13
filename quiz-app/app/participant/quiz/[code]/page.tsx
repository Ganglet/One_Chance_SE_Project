"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Clock, Trophy, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { useProctoring } from "@/hooks/useProctoring"
import { ProctoringWarning } from "@/components/ProctoringWarning"

interface Question {
  id: string
  question: string
  type: "multiple-choice" | "multiple_choice" | "true-false" | "true_false" | "matching-pairs" | "matching_pairs" | "ordering" | "short-answer" | "short_answer"
  options?: string[]
  timeLimit: number
  points: number
  correct_answer?: string | number
  // New fields for different question types
  matchingPairs?: Array<{ left: string; right: string }>
  orderingItems?: string[]
  dragDropItems?: string[]
}

interface PlayerStats {
  score: number
  streak: number
  accuracy: number
  position: number
  totalAnswered: number
  correctAnswers: number
}

export default function ParticipantQuiz() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [playerName, setPlayerName] = useState<string>("")
  const quizCode = params.code as string

  // Prefer ?name for display/identity; fall back to stored username
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fromQuery = searchParams.get('name')
      if (fromQuery && fromQuery.trim()) {
        setPlayerName(fromQuery.trim())
      } else {
        const u = localStorage.getItem('username')
        if (u) setPlayerName(u)
      }
    }
  }, [searchParams])

  const [gameState, setGameState] = useState<"waiting" | "active" | "answered" | "results" | "completed">("waiting")
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [powerUps, setPowerUps] = useState({ fiftyFifty: 1, extraTime: 1, doublePoints: 1, streakSaver: 1, doubleOrNothing: 1 })
  const [activePowerUp, setActivePowerUp] = useState<string | null>(null)
  const [activeStreakSaver, setActiveStreakSaver] = useState<boolean>(false)
  // State to track which options are hidden by fiftyFifty
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([])
  
  // State for new question types
  const [matchingAnswers, setMatchingAnswers] = useState<{[key: number]: number}>({})
  const [orderingAnswers, setOrderingAnswers] = useState<string[]>([])
  const [selectedLeftItem, setSelectedLeftItem] = useState<number | null>(null)

  // Optimized reverse lookup for matching answers to improve performance
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
  })

  // Add state to track best streak separately
  const [bestStreak, setBestStreak] = useState(0)

  const [questions, setQuestions] = useState<Question[]>([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [participants, setParticipants] = useState<Array<{id: string, name: string, score: number}>>([])
  
  // New state for quiz termination
  const [showTerminationModal, setShowTerminationModal] = useState(false)
  const [sessionStatus, setSessionStatus] = useState<string>("waiting")
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected">("connecting")
  const [quizStarted, setQuizStarted] = useState(false)

  // Check if we're in browser environment
  const isBrowser = typeof window !== 'undefined'

  // Determine if proctoring should be active
  const shouldProctoringBeActive = gameState === "active" && !showFeedback && !showTerminationModal

  // Comprehensive proctoring system (only in browser)
  const proctoringConfig = {
    maxWarnings: 3, // Increased from 2 to 3 for more leniency
    warningDuration: 5000,
    enableFullscreen: shouldProctoringBeActive, // Only enable when quiz is active and not in feedback/transition
    enableTabSwitchDetection: shouldProctoringBeActive,
    enableFocusDetection: shouldProctoringBeActive,
    disqualificationRoute: "/participant/quiz/disqualified"
  }

  const {
    warnings,
    isFullscreen,
    isDisqualified,
    showWarning,
    warningMessage,
    enterFullscreen,
    exitFullscreen,
    checkFullscreen,
    isFullscreenSupported
  } = useProctoring(isBrowser ? proctoringConfig : {
    maxWarnings: 0,
    warningDuration: 0,
    enableFullscreen: false,
    enableTabSwitchDetection: false,
    enableFocusDetection: false,
    disqualificationRoute: ""
  })

  // Only activate proctoring when quiz is active and in browser
  useEffect(() => {
    if (shouldProctoringBeActive && isFullscreenSupported && typeof window !== 'undefined') {
      enterFullscreen()
    } else if (!shouldProctoringBeActive && isFullscreen) {
      // Exit fullscreen when proctoring should not be active
      exitFullscreen()
    }
  }, [shouldProctoringBeActive, enterFullscreen, exitFullscreen, isFullscreenSupported, isFullscreen])

  // Check if participant is already in session
  useEffect(() => {
    async function checkSessionStatus() {
      try {
        // Wait until we know the participant's name to avoid creating an "Anonymous" record
        if (!playerName || !playerName.trim()) return
        const res = await fetch(`/api/sessions?code=${quizCode}`)
        if (res.ok) {
          const data = await res.json()
          console.log("Session info:", data.session)
          
          // Check if current user is already a participant
          const isParticipant = data.session.session_participants?.some((p: any) => 
            p.users && p.users.username === playerName
          ) || false
          
          if (!isParticipant) {
            console.log("User not in session, attempting to join...")
            // Try to join the session
            const joinRes = await fetch('/api/sessions/join', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ code: quizCode, username: playerName })
            })
            
            if (joinRes.ok) {
              console.log("Successfully joined session")
            } else {
              const errorData = await joinRes.json().catch(() => ({}))
              console.log("Join error:", errorData)
              // If session has already started, that's okay - we can still participate
              if (errorData.error === 'Session has already started') {
                console.log("Session already started, but continuing...")
              } else {
                toast({ title: 'Failed to join session', description: errorData.error || 'Please try again.' })
              }
            }
          } else {
            console.log("User already in session")
          }
        }
      } catch (error) {
        console.error("Error checking session status:", error)
      }
    }
    
    checkSessionStatus()
  }, [quizCode, playerName])

  // When disqualified by proctoring, notify server so host can see it
  useEffect(() => {
    const markDisqualified = async () => {
      if (!isDisqualified || !playerName || !playerName.trim()) return
      try {
        // Get the specific violation that caused disqualification
        let disqualificationReason = 'Multiple proctoring violations'
        if (warnings >= 3) {
          disqualificationReason = `Exceeded maximum warnings (${warnings}/${3})`
        }
        
        await fetch('/api/sessions/update-stats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code: quizCode,
            username: playerName,
            stats: { accuracy: -1, score: 0, streak: 0 },
            disqualificationReason: disqualificationReason
          })
        })
        console.log('Successfully marked as disqualified')
      } catch (e) {
        console.log('Failed to mark disqualified:', e)
      }
    }
    markDisqualified()
  }, [isDisqualified, playerName, quizCode, warnings])

  // Fetch questions for this session on mount
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(`/api/sessions/questions?code=${quizCode}`)
        if (res.ok) {
          const data = await res.json()
          console.log("Fetched questions:", data.questions)
          
          // Deduplicate by question id first to prevent repeats, then process
          const uniqueByIdMap = new Map<string, any>()
          for (const q of data.questions) {
            const key = String(q.id)
            if (!uniqueByIdMap.has(key)) uniqueByIdMap.set(key, q)
          }
          const uniqueQuestionsRaw = Array.from(uniqueByIdMap.values())

          // Process questions to match the expected format
          const processedQuestions = uniqueQuestionsRaw.map((q: any) => {
            console.log("Processing question:", q)
            console.log("Question options:", q.options)
            
            // Sort options by option_index to maintain order
            const sortedOptions = q.options ? q.options.sort((a: any, b: any) => a.option_index - b.option_index) : []
            console.log("Sorted options:", sortedOptions)
            
            const processedQuestion = {
              id: q.id.toString(),
              question: q.question,
              type: q.type,
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
          
          // Apply option shuffling to each question based on its type
          const questionsWithShuffledOptions = processedQuestions.map((question: any) => {
            let shuffledQuestion = question
            
            // Shuffle MCQ options
            if (question.type === "multiple-choice" || question.type === "multiple_choice") {
              shuffledQuestion = shuffleMCQOptions(shuffledQuestion)
              console.log(`Shuffled MCQ options for question ${question.id}:`, shuffledQuestion.options)
            }
            
            // Shuffle matching pairs right items
            if (question.type === "matching-pairs" || question.type === "matching_pairs") {
              shuffledQuestion = shuffleMatchingPairs(shuffledQuestion)
              console.log(`Shuffled matching pairs for question ${question.id}:`, shuffledQuestion.matchingPairs)
            }
            
            // Shuffle ordering items
            if (question.type === "ordering") {
              shuffledQuestion = shuffleOrderingItems(shuffledQuestion)
              console.log(`Shuffled ordering items for question ${question.id}:`, shuffledQuestion.orderingItems)
            }
            
            return shuffledQuestion
          })
          
          // Shuffle questions for this participant to prevent memorization
          const shuffledQuestions = shuffleArray([...questionsWithShuffledOptions])
          
          // Additional deduplication check to ensure no duplicates remain
          const finalQuestions = shuffledQuestions.filter((question: any, index, array) => 
            array.findIndex((q: any) => q.id === question.id) === index
          )
          
          setQuestions(finalQuestions)
          
          // Check for duplicate questions
          const questionIds = finalQuestions.map((q: any) => q.id)
          const uniqueIds = new Set(questionIds)
          if (questionIds.length !== uniqueIds.size) {
            console.error("DUPLICATE QUESTIONS DETECTED!", {
              totalQuestions: questionIds.length,
              uniqueQuestions: uniqueIds.size,
              questionIds,
              duplicateIds: questionIds.filter((id, index) => questionIds.indexOf(id) !== index)
            })
          }
          
          console.log("Final questions set:", finalQuestions.map((q: any) => q.id), finalQuestions.length)
          
          // Initialize the first question if we have questions and are in waiting state
          if (finalQuestions.length > 0 && gameState === "waiting") {
            console.log("Initializing first question")
            setCurrentQuestion(finalQuestions[0])
            setQuestionIndex(0)
            setTimeRemaining(finalQuestions[0].timeLimit)
          }
        } else {
          console.error("Failed to fetch questions:", res.status, res.statusText)
          const errorData = await res.json().catch(() => ({}))
          console.error("Error data:", errorData)
          toast({ title: 'Failed to load questions', description: errorData.error || 'Please try again.' })
        }
      } catch (error) {
        console.error("Error fetching questions:", error)
        toast({ title: 'Failed to load questions', description: 'Please try again.' })
      }
    }
    fetchQuestions()
  }, [quizCode])

  // Fisher-Yates shuffle algorithm for randomizing question order
  const shuffleArray = (array: Question[]): Question[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Shuffle options for MCQ questions
  const shuffleMCQOptions = (question: Question): Question => {
    if (!question.options || question.type !== "multiple-choice" && question.type !== "multiple_choice") {
      return question
    }

    // Create pairs of option text and their indices
    const optionPairs = question.options.map((option, index) => ({ option, originalIndex: index }))
    
    // Shuffle the pairs
    for (let i = optionPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[optionPairs[i], optionPairs[j]] = [optionPairs[j], optionPairs[i]]
    }
    
    // Keep the correct_answer as text, don't convert to index
    return {
      ...question,
      options: optionPairs.map(pair => pair.option)
      // correct_answer remains as the original text value
    }
  }

  // Shuffle right items for matching pairs questions
  const shuffleMatchingPairs = (question: Question): Question => {
    if (!question.matchingPairs || question.type !== "matching-pairs" && question.type !== "matching_pairs") {
      return question
    }

    // Create pairs of right items and their indices
    const rightItemPairs = question.matchingPairs.map((pair, index) => ({ 
      rightItem: pair.right, 
      originalIndex: index 
    }))
    
    // Shuffle the right items
    for (let i = rightItemPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[rightItemPairs[i], rightItemPairs[j]] = [rightItemPairs[j], rightItemPairs[i]]
    }
    
    // Create new matching pairs with shuffled right items
    const shuffledMatchingPairs = question.matchingPairs.map((pair, index) => ({
      left: pair.left,
      right: rightItemPairs[index].rightItem
    }))
    
    return {
      ...question,
      matchingPairs: shuffledMatchingPairs
    }
  }

  // Shuffle items for ordering questions
  const shuffleOrderingItems = (question: Question): Question => {
    if (!question.orderingItems || question.type !== "ordering") {
      return question
    }

    // Create pairs of items and their indices
    const itemPairs = question.orderingItems.map((item, index) => ({ item, originalIndex: index }))
    
    // Shuffle the items
    for (let i = itemPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[itemPairs[i], itemPairs[j]] = [itemPairs[j], itemPairs[i]]
    }
    
    return {
      ...question,
      orderingItems: itemPairs.map(pair => pair.item)
    }
  }

  // Fetch participants for this session
  useEffect(() => {
    async function fetchParticipants() {
      try {
        const res = await fetch(`/api/sessions/participants?code=${quizCode}`)
        if (res.ok) {
          const data = await res.json()
          console.log("Fetched participants:", data.participants)
          setParticipants(
            data.participants.map((p: any) => ({
              id: p.users.id.toString(),
              name: p.users.username,
              score: p.score || 0
            }))
          )
        } else {
          console.error("Failed to fetch participants:", res.status, res.statusText)
        }
      } catch (error) {
        console.error("Error fetching participants:", error)
      }
    }
    fetchParticipants()
    // Poll for new participants every 3 seconds
    const interval = setInterval(fetchParticipants, 3000)
    return () => clearInterval(interval)
  }, [quizCode])

  // Real-time session status monitoring using Server-Sent Events
  useEffect(() => {
    let eventSource: EventSource | null = null
    let reconnectAttempts = 0
    const maxReconnectAttempts = 5
    const baseDelay = 1000 // 1 second

    const setupEventSource = () => {
      try {
        console.log('Setting up SSE connection for session:', quizCode)
        setConnectionStatus("connecting")
        eventSource = new EventSource(`/api/sessions/events?code=${quizCode}`)

        eventSource.onopen = () => {
          console.log('SSE connection established')
          setConnectionStatus("connected")
          reconnectAttempts = 0 // Reset reconnect attempts on successful connection
        }

        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            console.log('SSE event received:', data)

            if (data.type === 'session_update') {
              const sessionStatus = data.session.status
              const quizStatus = data.session.quiz_status
              
              console.log(`Session status: ${sessionStatus}, Quiz status: ${quizStatus}`)
              setSessionStatus(sessionStatus)
              
              // Start the quiz when session becomes active
              if (sessionStatus === "active" && gameState === "waiting" && questions.length > 0 && !quizStarted) {
                console.log("Session is now active, starting quiz...")
                console.log("Current state:", { sessionStatus, gameState, questionsLength: questions.length, questionIndex })
                
                // Always start from question 1 for proctoring
                const startIndex = 0
                
                console.log(`Starting quiz from question ${startIndex + 1} (always start from first question)`)
                
                // Set question index first, then current question to prevent race conditions
                setQuestionIndex(startIndex)
                setCurrentQuestion(questions[startIndex])
                setGameState("active")
                setTimeRemaining(questions[startIndex].timeLimit)
                setHiddenOptions([])
                setActivePowerUp(null)
                setQuizStarted(true)
                
                // Save the starting question index for proctoring
                saveQuestionProgress(startIndex)
              } else {
                console.log("Not starting quiz:", { sessionStatus, gameState, questionsLength: questions.length, quizStarted })
              }
              
              // Check for termination conditions
              if ((sessionStatus === "completed" || sessionStatus === "paused" || quizStatus === "terminated" || quizStatus === "stopped") && !showTerminationModal) {
                console.log("Quiz terminated/stopped detected via SSE! Showing termination modal...")
                setShowTerminationModal(true)
                setQuizStarted(false)
                // Redirect to review page after 2 seconds
                setTimeout(() => {
                  console.log("Redirecting to review page...")
                  router.push(`/participant/review/${quizCode}?name=${encodeURIComponent(playerName)}`)
                }, 2000)
              }
            } else if (data.type === 'error') {
              console.error('SSE error:', data.message)
              setConnectionStatus("disconnected")
            }
          } catch (error) {
            console.error('Error parsing SSE data:', error)
          }
        }

        eventSource.onerror = (error) => {
          console.error('SSE connection error:', error)
          setConnectionStatus("disconnected")
          
          // Attempt to reconnect with exponential backoff
          if (reconnectAttempts < maxReconnectAttempts) {
            const delay = baseDelay * Math.pow(2, reconnectAttempts)
            console.log(`Attempting to reconnect in ${delay}ms (attempt ${reconnectAttempts + 1}/${maxReconnectAttempts})`)
            
            setTimeout(() => {
              if (eventSource) {
                eventSource.close()
                reconnectAttempts++
                setupEventSource()
              }
            }, delay)
          } else {
            console.log('Max reconnection attempts reached, falling back to polling')
            setupPolling()
          }
        }
      } catch (error) {
        console.error('Error setting up SSE:', error)
        setConnectionStatus("disconnected")
        // Fallback to polling if SSE fails
        console.log('Falling back to polling...')
        setupPolling()
      }
    }

    // Fallback polling function
    const setupPolling = () => {
      console.log('Using polling fallback for session status')
      setConnectionStatus("disconnected")
      
      const checkSessionStatus = async () => {
        try {
          const res = await fetch(`/api/sessions?code=${quizCode}`)
          if (res.ok) {
            const data = await res.json()
            const status = data.session.status
            console.log(`Polling - Session status: ${status}`)
            setSessionStatus(status)
            
            // Start the quiz when session becomes active
            if (status === "active" && gameState === "waiting" && questions.length > 0 && !quizStarted) {
              console.log("Session is now active (polling), starting quiz...")
              console.log("Current state:", { status, gameState, questionsLength: questions.length, questionIndex })
              
              // Always start from question 1 for proctoring
              const startIndex = 0
              
              // Set question index first, then current question to prevent race conditions
              setQuestionIndex(startIndex)
              setCurrentQuestion(questions[startIndex])
              setGameState("active")
              setTimeRemaining(questions[startIndex].timeLimit)
              setHiddenOptions([])
              setActivePowerUp(null)
              setQuizStarted(true)
              
              // Save the starting question index for proctoring
              saveQuestionProgress(startIndex)
            } else {
              console.log("Not starting quiz (polling):", { status, gameState, questionsLength: questions.length, quizStarted })
            }
            
            if (status === "completed" || status === "paused" && !showTerminationModal) {
              console.log("Quiz terminated/stopped detected via polling! Showing termination modal...")
              setShowTerminationModal(true)
              setQuizStarted(false)
              setTimeout(() => {
                console.log("Redirecting to review page...")
                router.push(`/participant/review/${quizCode}?name=${encodeURIComponent(playerName)}`)
              }, 2000)
            }
          }
        } catch (error) {
          console.error("Error polling session status:", error)
        }
      }

      // Check immediately and then every 1 second
      checkSessionStatus()
      const interval = setInterval(checkSessionStatus, 1000)
      
      return () => clearInterval(interval)
    }

    // Start SSE connection
    setupEventSource()

    // Cleanup function
    return () => {
      if (eventSource) {
        console.log('Closing SSE connection')
        eventSource.close()
      }
    }
  }, [quizCode, showTerminationModal, router, gameState, questions, quizStarted])

  // Auto-redirect when quiz is completed
  useEffect(() => {
    if (gameState === "completed") {
      setQuizStarted(false)
      // Show completion message for 2 seconds, then redirect
      setTimeout(() => {
        router.push(`/participant/review/${quizCode}?name=${encodeURIComponent(playerName)}`)
      }, 2000)
    }
  }, [gameState, quizCode, playerName, router])

  // When moving to next question, update currentQuestion and reset hidden options
  // REMOVED: This useEffect was causing conflicts with handleNextQuestion's setTimeout
  // The question progression is now handled entirely by handleNextQuestion

  // Handle next question manually
  const handleNextQuestion = () => {
    console.log("handleNextQuestion called, current questionIndex:", questionIndex)
    if (questionIndex < questions.length - 1) {
      const nextIndex = questionIndex + 1
      console.log(`Manually moving to next question: ${nextIndex + 1}/${questions.length}`)
      
      // Set game state to waiting to disable proctoring during transition
      setGameState("waiting")
      setQuestionIndex(nextIndex)
      setSelectedAnswer(null)
      setCurrentQuestion(null)
      setShowFeedback(false)
      setIsCorrect(false)
      
      // Reset new question type state
      setMatchingAnswers({})
      setOrderingAnswers([])
      setSelectedLeftItem(null)
      
      // Save progress for proctoring
      saveQuestionProgress(nextIndex)
      
      // Set the next question after a brief delay to allow proctoring to disable
      setTimeout(() => {
        if (nextIndex < questions.length) {
          console.log("Setting next question:", questions[nextIndex])
          setCurrentQuestion(questions[nextIndex])
          setGameState("active")
          setTimeRemaining(questions[nextIndex].timeLimit)
          setHiddenOptions([])
          setActivePowerUp(null)
        }
      }, 500) // Increased delay to 500ms to ensure proctoring is properly disabled
    } else {
      console.log("All questions completed!")
      setGameState("completed")
    }
  }

  // Handle skip question (new function)
  const handleSkipQuestion = () => {
    console.log("handleSkipQuestion called, current questionIndex:", questionIndex)
    if (questionIndex < questions.length - 1) {
      // Temporarily disable proctoring during skip action
      // setProctoringDisabled(true) // This state is no longer used
      
      const nextIndex = questionIndex + 1
      console.log(`Skipping to next question: ${nextIndex + 1}/${questions.length}`)
      
      // Update stats for skipped question (count as incorrect)
      const basePoints = currentQuestion?.timeLimit ? currentQuestion.points : 0
      const pointsChange = activePowerUp === "doubleOrNothing" ? - (currentQuestion?.points || 0) : 0
      const preservedStreak = activeStreakSaver && playerStats.streak >= 1 ? playerStats.streak : 0
      const newStats = {
        score: Math.max(0, playerStats.score + pointsChange),
        streak: preservedStreak,
        correctAnswers: playerStats.correctAnswers,
        totalAnswered: playerStats.totalAnswered + 1,
        accuracy: Math.round((playerStats.correctAnswers / (playerStats.totalAnswered + 1)) * 100),
        position: playerStats.position,
      }
      setPlayerStats(newStats)
      updateParticipantStats(newStats)
      
      // Save skipped answer to database
      if (currentQuestion) {
        saveAnswer(currentQuestion.id, null, false, currentQuestion.timeLimit - timeRemaining, pointsChange, newStats.streak)
      }
      
      // Move to next question
      setQuestionIndex(nextIndex)
      setGameState("waiting")
      setSelectedAnswer(null)
      setCurrentQuestion(null)
      setShowFeedback(false)
      setIsCorrect(false)
      
      // Reset new question type state
      setMatchingAnswers({})
      setOrderingAnswers([])
      setSelectedLeftItem(null)
      
      // Save progress for proctoring
      saveQuestionProgress(nextIndex)
      
      // Clear single-use powerups after skip
      if (activePowerUp) setActivePowerUp(null)

      // Set the next question after a brief delay to allow proctoring to disable
      setTimeout(() => {
        if (nextIndex < questions.length) {
          console.log("Setting next question:", questions[nextIndex])
          setCurrentQuestion(questions[nextIndex])
          setGameState("active")
          setTimeRemaining(questions[nextIndex].timeLimit)
          setHiddenOptions([])
          setActivePowerUp(null)
        }
      }, 500) // Increased delay to 500ms to ensure proctoring is properly disabled
    } else {
      console.log("All questions completed!")
      setGameState("completed")
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameState === "active" && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
    } else if (timeRemaining === 0 && gameState === "active") {
      handleTimeUp()
    }
    return () => clearInterval(interval)
  }, [gameState, timeRemaining])

  const usePowerUp = (powerUp: string) => {
    if (powerUps[powerUp as keyof typeof powerUps] <= 0 || gameState !== "active") return

    setPowerUps((prev) => ({
      ...prev,
      [powerUp]: prev[powerUp as keyof typeof prev] - 1,
    }))

    switch (powerUp) {
      case "fiftyFifty": {
        // Remove two wrong answers
        if (currentQuestion && currentQuestion.options && typeof currentQuestion.correct_answer !== "undefined") {
          const correctIdx = typeof currentQuestion.correct_answer === "number"
            ? currentQuestion.correct_answer
            : currentQuestion.options.findIndex(
                (opt) => opt === currentQuestion.correct_answer
              )
          // Get all incorrect option indices
          const incorrectIndices = currentQuestion.options
            .map((_, idx) => idx)
            .filter((idx) => idx !== correctIdx)
          // Randomly pick two to hide
          const shuffled = incorrectIndices.sort(() => 0.5 - Math.random())
          setHiddenOptions(shuffled.slice(0, 2))
        }
        break
      }
      case "extraTime":
        setTimeRemaining((prev) => prev + 15)
        break
      case "doublePoints":
        setActivePowerUp("doublePoints")
        break
      case "doubleOrNothing":
        setActivePowerUp("doubleOrNothing")
        break
      case "streakSaver": {
        // Only allow if player currently has a qualifying streak (>= 3)
        if (playerStats.streak < 1) {
          // Refund usage if not eligible and notify
          setPowerUps((prev) => ({ ...prev, streakSaver: prev.streakSaver + 1 }))
          toast({ title: "Streak too low", description: "You need a streak of 1+ to use Streak Saver." })
          return
        }
        setActiveStreakSaver(true)
        break
      }
    }
  }

  const handleAnswerSelect = (answer: string | number) => {
    if (gameState !== "active") return
    
    // Temporarily disable proctoring during answer selection
    // setProctoringDisabled(true) // This state is no longer used
    
    setSelectedAnswer(answer)
    // Reset hidden options after answer; keep power-up active for scoring
    setHiddenOptions([])
    // Immediately submit answer without delay, passing the answer directly
    handleSubmitAnswer(answer)
    
    // Re-enable proctoring after a short delay
    setTimeout(() => {
      // setProctoringDisabled(false) // This state is no longer used
    }, 2000)
  }

  // Handlers for new question types
  const handleMatchingPairSelect = (leftIndex: number, rightIndex: number) => {
    if (gameState !== "active") return
    
    setMatchingAnswers(prev => {
      const newAnswers = { ...prev }
      
      // If this left item is already matched, clear it
      if (leftIndex in newAnswers) {
        delete newAnswers[leftIndex]
      }
      
      // If this right item is already matched to another left item, clear that match
      // Optimized: Use direct property access instead of Object.keys().find()
      const existingLeftIndex = Object.entries(newAnswers).find(([_, rightIdx]) => rightIdx === rightIndex)?.[0]
      if (existingLeftIndex !== undefined) {
        delete newAnswers[parseInt(existingLeftIndex)]
      }
      
      // Set the new match
      newAnswers[leftIndex] = rightIndex
      return newAnswers
    })
    
    // Clear the selected left item after matching
    setSelectedLeftItem(null)
  }

  const handleOrderingSelect = (itemIndex: number, newPosition: number) => {
    if (gameState !== "active") return
    setOrderingAnswers(prev => {
      const newOrder = [...prev]
      // Remove item from current position if it exists
      const currentIndex = newOrder.findIndex(item => item === currentQuestion?.orderingItems?.[itemIndex])
      if (currentIndex !== -1) {
        newOrder.splice(currentIndex, 1)
      }
      // Add item to new position
      newOrder.splice(newPosition, 0, currentQuestion?.orderingItems?.[itemIndex] || '')
      return newOrder
    })
  }

  const handleResetQuestion = () => {
    if (gameState !== "active") return
    
    if (currentQuestion?.type === "matching-pairs" || currentQuestion?.type === "matching_pairs") {
      setMatchingAnswers({})
      setSelectedLeftItem(null)
    } else if (currentQuestion?.type === "ordering") {
      setOrderingAnswers([])
    }
  }

  const handleSubmitNewQuestionType = () => {
    if (gameState !== "active") return
    
    // Temporarily disable proctoring during answer submission
    // setProctoringDisabled(true) // This state is no longer used
    
    let answer: any = null
    let isCorrect = false
    
    if (currentQuestion?.type === "matching-pairs" || currentQuestion?.type === "matching_pairs") {
      // Optimized: Check if all pairs are matched using the Set size
      const allMatched = matchedRightItems.size === currentQuestion.matchingPairs?.length
      if (allMatched) {
        answer = matchingAnswers
        try {
          const correctPairs = JSON.parse(String(currentQuestion.correct_answer || '[]'))
          if (Array.isArray(correctPairs) && correctPairs.length > 0 && currentQuestion.matchingPairs) {
            // Build a map from left to right for correct answer
            const correctMap = new Map(
              correctPairs.map((pair: { left: string; right: string }) => [pair.left, pair.right])
            );
            // Build a map from left to right for user answer
            let userMap = new Map();
            Object.entries(matchingAnswers).forEach(([leftIdx, rightIdx]) => {
              const left = currentQuestion.matchingPairs?.[parseInt(leftIdx)]?.left;
              const right = currentQuestion.matchingPairs?.[rightIdx]?.right;
              if (left && right) userMap.set(left, right);
            });
            // Compare both maps
            isCorrect = currentQuestion.matchingPairs.every((pair) => {
              return userMap.get(pair.left) === correctMap.get(pair.left);
            });
          } else {
            // Fallback: assume correct if all pairs are matched
            isCorrect = true;
          }
        } catch (error) {
          console.error("Error parsing correct pairs:", error);
          // Fallback: assume correct if all pairs are matched
          isCorrect = true;
        }
      }
    } else if (currentQuestion?.type === "ordering") {
      // Check if all items are ordered
      if (orderingAnswers.length === currentQuestion.orderingItems?.length) {
        answer = orderingAnswers
        
        // Check against the correct answer from the database
        try {
          const correctOrder = JSON.parse(String(currentQuestion.correct_answer || '[]'))
          if (Array.isArray(correctOrder) && correctOrder.length === orderingAnswers.length) {
            // Compare the user's order with the correct order
            isCorrect = orderingAnswers.every((item, index) => item === correctOrder[index])
          } else {
            // Fallback: assume correct if all items are ordered
            isCorrect = true
          }
        } catch (error) {
          console.error("Error parsing correct order:", error)
          // Fallback: assume correct if all items are ordered
          isCorrect = true
        }
      }
    }
    
    if (answer !== null) {
      handleSubmitAnswer(answer, isCorrect)
      
      // Re-enable proctoring after a short delay
      setTimeout(() => {
        // setProctoringDisabled(false) // This state is no longer used
      }, 2000)
    } else {
      // Re-enable proctoring if no answer was submitted
      // setProctoringDisabled(false) // This state is no longer used
    }
  }

  const handleSubmitAnswer = (answer?: string | number, isCorrect?: boolean) => {
    const answerToUse = answer !== undefined ? answer : selectedAnswer
    if (answerToUse === null || gameState !== "active") return
    setGameState("answered")
    
    // Check if answer is correct
    let correct = false
    if (currentQuestion?.type === "multiple-choice" || currentQuestion?.type === "multiple_choice") {
      // For multiple choice, selectedAnswer is the index, correct_answer is the text
      const selectedOption = currentQuestion.options?.[answerToUse as number]
      // Compare the selected option text with the correct answer text
      correct = selectedOption === currentQuestion.correct_answer
      console.log("MCQ Answer validation:", {
        selectedIndex: answerToUse,
        selectedOption,
        correctAnswer: currentQuestion.correct_answer,
        correct
      })
    } else if (currentQuestion?.type === "true-false" || currentQuestion?.type === "true_false") {
      correct = answerToUse === currentQuestion.correct_answer
    } else if (currentQuestion?.type === "short-answer" || currentQuestion?.type === "short_answer") {
      correct = String(answerToUse).trim().toLowerCase() === String(currentQuestion.correct_answer).trim().toLowerCase()
    } else if (currentQuestion?.type === "matching-pairs" || currentQuestion?.type === "matching_pairs") {
      // Use the passed isCorrect flag for matching pairs
      correct = isCorrect || false
    } else if (currentQuestion?.type === "ordering") {
      // Use the passed isCorrect flag for ordering
      correct = isCorrect || false
    }
    
    console.log("Answer check:", { answerToUse, correct_answer: currentQuestion?.correct_answer, correct, isCorrect })
    setIsCorrect(correct)
    setShowFeedback(true)

    // Calculate score change based on active power-ups
    const basePoints = currentQuestion!.points
    let pointsChange = 0
    if (correct) {
      // Start with base points
      pointsChange = basePoints
    // Apply double points or double or negative
      if (activePowerUp === "doublePoints" || activePowerUp === "doubleOrNothing") {
        pointsChange = basePoints * 2
      }
      // Clear single-use active powerup flags
      if (activePowerUp) setActivePowerUp(null)
      if (activeStreakSaver) setActiveStreakSaver(false)

      const newStats = {
        score: playerStats.score + pointsChange,
        streak: playerStats.streak + 1,
        correctAnswers: playerStats.correctAnswers + 1,
        totalAnswered: playerStats.totalAnswered + 1,
        accuracy: Math.round(((playerStats.correctAnswers + 1) / (playerStats.totalAnswered + 1)) * 100),
        position: playerStats.position,
      }

      setPlayerStats(newStats)
      updateParticipantStats(newStats)
      saveAnswer(currentQuestion!.id, answerToUse, correct, currentQuestion!.timeLimit - timeRemaining, pointsChange, newStats.streak)
    } else {
      // Wrong answer
      if (activePowerUp === "doubleOrNothing") {
        pointsChange = -basePoints
      } else {
        pointsChange = 0
      }

      // Determine next streak with potential streak saver
      let nextStreak = 0
      if (activeStreakSaver && playerStats.streak >= 1) {
        nextStreak = playerStats.streak
      }

      // Clear single-use active powerup flags
      if (activePowerUp) setActivePowerUp(null)
      if (activeStreakSaver) setActiveStreakSaver(false)

      const newScore = Math.max(0, playerStats.score + pointsChange)
      const newStats = {
        score: newScore,
        streak: nextStreak,
        correctAnswers: playerStats.correctAnswers,
        totalAnswered: playerStats.totalAnswered + 1,
        accuracy: Math.round((playerStats.correctAnswers / (playerStats.totalAnswered + 1)) * 100),
        position: playerStats.position,
      }

      setPlayerStats(newStats)
      updateParticipantStats(newStats)
      saveAnswer(currentQuestion!.id, answerToUse, correct, currentQuestion!.timeLimit - timeRemaining, pointsChange, newStats.streak)
    }

    // Show feedback for 1 second then automatically move to next question
    setTimeout(() => {
      setShowFeedback(false)
      setSelectedAnswer(null)
      
      // Automatically move to next question immediately
      if (questionIndex < questions.length - 1) {
        handleNextQuestion()
      } else {
        setGameState("completed")
      }
    }, 1000)
  }

  // Function to update participant stats in database
  const updateParticipantStats = async (stats: PlayerStats) => {
    try {
      const response = await fetch('/api/sessions/update-stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: quizCode,
          username: playerName,
          stats: {
            score: stats.score,
            streak: stats.streak,
            accuracy: stats.accuracy,
          },
        }),
      })

      if (!response.ok) {
        console.error('Failed to update participant stats:', response.statusText)
      } else {
        console.log('Participant stats updated successfully')
      }
    } catch (error) {
      console.error('Error updating participant stats:', error)
    }
  }

  // Function to save individual answer to database
  const saveAnswer = async (questionId: string, selectedOption: string | number | null, isCorrect: boolean, timeTaken: number, pointsAwarded: number, streakAtTime: number) => {
    try {
      const response = await fetch('/api/sessions/answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionCode: quizCode,
          username: playerName,
          questionId: parseInt(questionId),
          selectedOption: selectedOption?.toString() || null,
          isCorrect,
          timeTaken,
          pointsAwarded,
          streakAtTime,
        }),
      })

      if (!response.ok) {
        console.error('Failed to save answer:', response.statusText)
      } else {
        console.log('Answer saved successfully')
      }
    } catch (error) {
      console.error('Error saving answer:', error)
    }
  }

  // Function to save current question index for proctoring
  const saveQuestionProgress = (index: number) => {
    try {
      // Save to localStorage for immediate access
      localStorage.setItem(`quiz_progress_${quizCode}_${playerName}`, index.toString())
      
      // Also save to server (optional, for backup)
      fetch('/api/sessions/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionCode: quizCode,
          username: playerName,
          questionIndex: index,
        }),
      }).catch(error => {
        console.error('Error saving progress to server:', error)
      })
    } catch (error) {
      console.error('Error saving question progress:', error)
    }
  }

  // Function to load saved question progress for proctoring
  const loadQuestionProgress = (): number => {
    try {
      const savedIndex = localStorage.getItem(`quiz_progress_${quizCode}_${playerName}`)
      return savedIndex ? parseInt(savedIndex, 10) : 0
    } catch (error) {
      console.error('Error loading question progress:', error)
      return 0
    }
  }

  const handleTimeUp = () => {
    console.log("Time's up! Moving to next question...")
    setGameState("answered")
    setIsCorrect(false)
    setShowFeedback(true)

    const basePoints = currentQuestion!.points
    // Apply double or negative penalty on timeout and preserve streak if active
    const pointsChange = activePowerUp === "doubleOrNothing" ? -basePoints : 0
    const nextStreak = activeStreakSaver && playerStats.streak >= 1 ? playerStats.streak : 0

    if (activePowerUp) setActivePowerUp(null)
    if (activeStreakSaver) setActiveStreakSaver(false)

    const newScore = Math.max(0, playerStats.score + pointsChange)
    const newStats = {
      score: newScore,
      streak: nextStreak,
      correctAnswers: playerStats.correctAnswers,
      totalAnswered: playerStats.totalAnswered + 1,
      accuracy: Math.round((playerStats.correctAnswers / (playerStats.totalAnswered + 1)) * 100),
      position: playerStats.position,
    }

    setPlayerStats(newStats)
    updateParticipantStats(newStats)
    saveAnswer(currentQuestion!.id, null, false, currentQuestion!.timeLimit - timeRemaining, pointsChange, newStats.streak)

    // Show feedback for 1 second then automatically move to next question
    setTimeout(() => {
      setShowFeedback(false)
      setSelectedAnswer(null)
      
      // Automatically move to next question immediately
      if (questionIndex < questions.length - 1) {
        handleNextQuestion()
      } else {
        setGameState("completed")
      }
    }, 1000)
  }

  // Request fullscreen when quiz starts
  useEffect(() => {
    if (gameState === "active") {
      const requestFullscreen = async () => {
        try {
          // Check if document has focus first
          if (!document.hasFocus()) {
            console.log('Document not focused, skipping auto fullscreen')
            return
          }
          
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
      
      // Add a longer delay to ensure user interaction
      setTimeout(requestFullscreen, 2000)
    }
    // Exit fullscreen when quiz ends
    if (gameState === "completed" || gameState === "waiting") {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(console.log)
      }
    }
  }, [gameState])

  // Only show game content if questions are loaded
  if (questions.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Quiz Session
            </h1>
            <p className="text-sm text-gray-600">Code: {quizCode}</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="animate-pulse">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full"></div>
                  <h2 className="text-xl font-semibold mb-2">Loading quiz...</h2>
                  <p className="text-gray-600 mb-6">
                    Please wait while we load the quiz questions.
                  </p>
                  
                  {/* Participants List */}
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">Participants ({participants.length})</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {participants.length > 0 ? (
                        participants.map((participant, index) => (
                          <div
                            key={participant.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {index + 1}
                              </div>
                              <span className="font-medium">{participant.name}</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              {participant.score} pts
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-500 py-4">
                          No participants yet...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <TooltipProvider>
        {/* Proctoring Warning Modal */}
        {showWarning && isBrowser && (
          <ProctoringWarning
            message={warningMessage}
            isVisible={showWarning}
            onDismiss={() => {
              // Warning will auto-dismiss after duration
            }}
            warningCount={warnings}
            maxWarnings={proctoringConfig.maxWarnings}
          />
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

        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Quiz Session
              </h1>
              <p className="text-sm text-gray-600 mb-1">
                Player: {playerName} | Code: {quizCode}
              </p>
              <div className="flex items-center gap-6 text-xs text-gray-500">
                <span>
                  Status: <span className="font-medium text-gray-700 capitalize">{sessionStatus}</span>
                </span>
                <span>
                  Connection: 
                  <span className={`ml-1 font-medium ${
                    connectionStatus === "connected" ? "text-green-600" :
                    connectionStatus === "connecting" ? "text-yellow-600" :
                    "text-red-600"
                  }`}>
                    {connectionStatus === "connected" ? "Connected" :
                     connectionStatus === "connecting" ? "Connecting..." :
                     "Disconnected"}
                  </span>
                </span>
                {(gameState === "active" || gameState === "answered") && isBrowser && (
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Proctoring</p>
                    <p className={`font-medium ${isFullscreen ? 'text-green-400' : 'text-yellow-400'}`}>
                      {isFullscreen ? 'Active' : 'Not Available'}
                    </p>
                    {!isFullscreen && isFullscreenSupported && (
                      <Button
                        onClick={() => enterFullscreen().catch(() => console.log('Fullscreen request failed'))}
                        size="sm"
                        className="mt-1 text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700"
                      >
                        Enable Fullscreen
                      </Button>
                    )}
                  </div>
                )}
                {connectionStatus === "disconnected" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-2 h-6 px-2 text-xs"
                    onClick={() => window.location.reload()}
                  >
                    Refresh
                  </Button>
                )}
              </div>
            </div>
            <Badge variant="outline" className="text-sm px-3 py-1">
              Rank #{playerStats.position}
            </Badge>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{playerStats.score}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {playerStats.streak > 0 && "🔥"} {playerStats.streak}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Streak</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{playerStats.accuracy}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">#{playerStats.position}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Rank</div>
              </CardContent>
            </Card>
          </div>

          {/* Power-ups */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Power-ups</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => usePowerUp("fiftyFifty")}
                    disabled={powerUps.fiftyFifty <= 0 || gameState !== "active"}
                  >
                    50/50 ({powerUps.fiftyFifty})
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => usePowerUp("extraTime")}
                    disabled={powerUps.extraTime <= 0 || gameState !== "active"}
                  >
                    +Time ({powerUps.extraTime})
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => usePowerUp("doublePoints")}
                    disabled={powerUps.doublePoints <= 0 || gameState !== "active"}
                    className={activePowerUp === "doublePoints" ? "bg-yellow-100 dark:bg-yellow-900" : ""}
                  >
                    2x Points ({powerUps.doublePoints})
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => usePowerUp("doubleOrNothing")}
                    disabled={powerUps.doubleOrNothing <= 0 || gameState !== "active"}
                    className={activePowerUp === "doubleOrNothing" ? "bg-red-100 dark:bg-red-900" : ""}
                  >
                    Double or Negative ({powerUps.doubleOrNothing})
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => usePowerUp("streakSaver")}
                    disabled={powerUps.streakSaver <= 0 || gameState !== "active" || playerStats.streak < 1 || activeStreakSaver}
                    className={activeStreakSaver ? "bg-green-100 dark:bg-green-900" : ""}
                  >
                    Streak Saver ({powerUps.streakSaver})
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Game Content */}
          <div className="max-w-6xl mx-auto">
            {gameState === "waiting" && (
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="animate-pulse">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full"></div>
                    <h2 className="text-xl font-semibold mb-2">Waiting for host to start...</h2>
                    <p className="text-gray-600 mb-6">
                      Get ready! The host will start the quiz soon.
                    </p>
                    
                    {/* Participants List */}
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">Participants ({participants.length})</h3>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {participants.length > 0 ? (
                          participants.map((participant, index) => (
                            <div
                              key={participant.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                  {index + 1}
                                </div>
                                <span className="font-medium">{participant.name}</span>
                              </div>
                              <div className="text-sm text-gray-600">
                                {participant.score} pts
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-gray-500 py-4">
                            No participants yet...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {(gameState === "active" || gameState === "answered") && currentQuestion && (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Main Quiz Content */}
                <div className="lg:col-span-3">
                  <Card className="shadow-xl border-0">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                          Question {questionIndex + 1} of {questions.length}
                        </CardTitle>
                        <div className="flex items-center gap-4">
                          {activePowerUp === "doublePoints" && (
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1">
                              2x Points Active!
                            </Badge>
                          )}
                          {gameState === "active" && (
                            <div className="flex items-center gap-2 text-xl font-bold text-red-600 dark:text-red-400">
                              <Clock className="w-6 h-6" />
                              {timeRemaining}s
                            </div>
                          )}
                        </div>
                      </div>
                      {gameState === "active" && (
                        <Progress 
                          value={(timeRemaining / currentQuestion.timeLimit) * 100} 
                          className="h-3 bg-gray-200 dark:bg-gray-700" 
                        />
                      )}
                    </CardHeader>
                    <CardContent className="p-8">
                      {!showFeedback ? (
                        <div className="space-y-8">
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700 text-center">
                            <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200 leading-relaxed">
                              {currentQuestion.question}
                            </p>
                          </div>
                          
                          {/* Debug logging */}
                          
                          {currentQuestion.type === "multiple-choice" || currentQuestion.type === "multiple_choice" ? (
                            <div className="space-y-4 max-w-3xl mx-auto">
                              {currentQuestion.options && currentQuestion.options.length > 0 ? (
                                currentQuestion.options.map((option, index) => (
                                  hiddenOptions.includes(index) ? null : (
                                    <Button
                                      key={index}
                                      variant={selectedAnswer === index ? "default" : "outline"}
                                      className="w-full justify-start text-left h-auto p-6 text-lg"
                                      onClick={() => handleAnswerSelect(index)}
                                      disabled={gameState !== "active"}
                                    >
                                      <span className="font-bold mr-4 text-xl">{String.fromCharCode(65 + index)}.</span>
                                      {option}
                                    </Button>
                                  )
                                ))
                              ) : (
                                <div className="text-center py-4 text-gray-500">
                                  <p>No options available for this question.</p>
                                  <p className="text-sm">Please contact the host.</p>
                                </div>
                              )}
                            </div>
                          ) : currentQuestion.type === "true-false" || currentQuestion.type === "true_false" ? (
                            <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
                              <Button
                                variant={selectedAnswer === "true" ? "default" : "outline"}
                                className="h-20 text-xl font-semibold"
                                onClick={() => handleAnswerSelect("true")}
                                disabled={gameState !== "active"}
                              >
                                True
                              </Button>
                              <Button
                                variant={selectedAnswer === "false" ? "default" : "outline"}
                                className="h-20 text-xl font-semibold"
                                onClick={() => handleAnswerSelect("false")}
                                disabled={gameState !== "active"}
                              >
                                False
                              </Button>
                            </div>
                          ) : currentQuestion.type === "matching-pairs" || currentQuestion.type === "matching_pairs" ? (
                            <div className="space-y-6 max-w-4xl mx-auto">
                              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
                                Match each item on the left with its corresponding item on the right by clicking them in sequence.
                              </div>
                              
                              <div className="flex justify-center mb-4">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setMatchingAnswers({})
                                    setSelectedLeftItem(null)
                                  }}
                                  disabled={gameState !== "active"}
                                  className="text-gray-600 hover:text-gray-800"
                                >
                                  Reset All Matches
                                </Button>
                              </div>
                              
                              <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 border border-gray-200 dark:border-gray-600">
                                <div className="grid grid-cols-2 gap-20 relative">
                                  <div className="space-y-4">
                                    <h4 className="font-bold text-center text-gray-800 dark:text-gray-200 mb-6 text-xl">Left Items</h4>
                                    {currentQuestion.matchingPairs?.map((pair, index) => {
                                      const isMatched = index in matchingAnswers
                                      const isSelected = selectedLeftItem === index
                                      const matchedRightIndex = matchingAnswers[index]
                                      return (
                                        <Button
                                          key={index}
                                          id={`left-${index}`}
                                          variant={isMatched ? "default" : isSelected ? "secondary" : "outline"}
                                          className={`w-full justify-start text-left h-auto p-6 relative transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-lg ${
                                            isMatched ? "bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-300" : 
                                            isSelected ? "bg-amber-500 text-white shadow-lg ring-2 ring-amber-300" : 
                                            "hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md"
                                          }`}
                                          onClick={() => {
                                            // If this left item is already matched, clear it
                                            if (isMatched) {
                                              setMatchingAnswers(prev => {
                                                const newAnswers = { ...prev }
                                                delete newAnswers[index]
                                                return newAnswers
                                              })
                                              setSelectedLeftItem(null)
                                            } else {
                                              // Select this left item for matching
                                              setSelectedLeftItem(index)
                                            }
                                          }}
                                          disabled={gameState !== "active"}
                                        >
                                          <div className="flex items-center gap-3">
                                            <span className="text-sm font-medium bg-white/20 dark:bg-black/20 px-2 py-1 rounded">
                                              {index + 1}
                                            </span>
                                            <span className="font-semibold text-lg">{pair.left}</span>
                                            {isMatched && (
                                              <span className="ml-auto text-xs bg-white/30 px-2 py-1 rounded">
                                                → {matchedRightIndex + 1}
                                              </span>
                                            )}
                                          </div>
                                        </Button>
                                      )
                                    })}
                                  </div>
                                  <div className="space-y-4">
                                    <h4 className="font-bold text-center text-gray-800 dark:text-gray-200 mb-6 text-xl">Right Items</h4>
                                    {currentQuestion.matchingPairs?.map((rightPair, rightIndex) => {
                                      // Optimized: Check if this right item is matched using a more efficient approach
                                      const isMatched = matchedRightItems.has(rightIndex)
                                      const matchedLeftIndex = Object.keys(matchingAnswers).find(key => matchingAnswers[parseInt(key)] === rightIndex)
                                      return (
                                        <Button
                                          key={rightIndex}
                                          id={`right-${rightIndex}`}
                                          variant={isMatched ? "default" : "outline"}
                                          className={`w-full justify-start text-left h-auto p-6 relative transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-lg ${
                                            isMatched ? "bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-300" : 
                                            "hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md"
                                          }`}
                                          onClick={() => {
                                            // Only allow matching if a left item is selected and this right item is not already matched
                                            if (selectedLeftItem !== null && !isMatched) {
                                              handleMatchingPairSelect(selectedLeftItem, rightIndex)
                                            }
                                          }}
                                          disabled={gameState !== "active"}
                                        >
                                          <div className="flex items-center gap-3">
                                            <span className="text-sm font-medium bg-white/20 dark:bg-black/20 px-2 py-1 rounded">
                                              {rightIndex + 1}
                                            </span>
                                            <span className="font-semibold text-lg">{rightPair.right}</span>
                                            {isMatched && (
                                              <span className="ml-auto text-xs bg-white/30 px-2 py-1 rounded">
                                                ← {parseInt(matchedLeftIndex!) + 1}
                                              </span>
                                            )}
                                          </div>
                                        </Button>
                                      )
                                    })}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Progress indicator */}
                              <div className="text-center">
                                <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Matched: {matchedRightItems.size} / {currentQuestion.matchingPairs?.length}
                                  </span>
                                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                </div>
                              </div>
                              
                              <div className="text-center pt-4">
                                <Button
                                  onClick={handleSubmitNewQuestionType}
                                  disabled={gameState !== "active" || matchedRightItems.size !== currentQuestion.matchingPairs?.length}
                                  className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                  size="lg"
                                >
                                  Submit Answer
                                </Button>
                              </div>
                            </div>
                          ) : currentQuestion.type === "ordering" ? (
                            <div className="space-y-4 max-w-3xl mx-auto">
                              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
                                Arrange the items in the correct order by clicking them in sequence.
                              </div>
                              
                              <div className="space-y-3">
                                {currentQuestion.orderingItems?.map((item, index) => (
                                  <Button
                                    key={index}
                                    variant={orderingAnswers.includes(item) ? "default" : "outline"}
                                    className="w-full justify-start text-left h-auto p-4 text-lg"
                                    onClick={() => {
                                      if (!orderingAnswers.includes(item)) {
                                        setOrderingAnswers(prev => [...prev, item])
                                      }
                                    }}
                                    disabled={gameState !== "active"}
                                  >
                                    <span className="text-sm font-medium text-gray-500 w-8">{index + 1}.</span>
                                    <span className="flex-1">{item}</span>
                                  </Button>
                                ))}
                              </div>
                              {orderingAnswers.length > 0 && (
                                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                  <h4 className="font-medium mb-3 text-center">Your Order:</h4>
                                  <div className="space-y-2">
                                    {orderingAnswers.map((item, index) => (
                                      <div key={index} className="flex items-center gap-3">
                                        <span className="text-sm font-medium text-gray-500 w-8">{index + 1}.</span>
                                        <span className="flex-1">{item}</span>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => setOrderingAnswers(prev => prev.filter((_, i) => i !== index))}
                                          disabled={gameState !== "active"}
                                          className="ml-auto h-8 px-3 text-xs"
                                        >
                                          Remove
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              <div className="text-center">
                                <Button
                                  onClick={handleSubmitNewQuestionType}
                                  disabled={gameState !== "active" || orderingAnswers.length !== currentQuestion.orderingItems?.length}
                                  className="mt-6 px-8 py-4 text-lg"
                                >
                                  Submit Answer
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-4 text-gray-500">
                              <p>Question type not supported: {currentQuestion.type}</p>
                              <p className="text-sm">Please contact the host.</p>
                            </div>
                          )}

                          <div className="flex items-center justify-between max-w-3xl mx-auto">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Points: {currentQuestion.points}
                              {activePowerUp === "doublePoints" && " × 2"}
                            </div>
                            {gameState === "active" && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    onClick={handleSkipQuestion}
                                    className="text-orange-600 border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                                  >
                                    Skip Question
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Skips the current question and moves to the next one.</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center space-y-4">
                          <div
                            className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
                              isCorrect ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
                            }`}
                          >
                            {isCorrect ? (
                              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                            ) : (
                              <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
                            )}
                          </div>
                          <h3 className="text-xl font-semibold">
                            {isCorrect ? "Correct!" : "Incorrect"}
                          </h3>
                          {isCorrect && (
                            <div className="space-y-2">
                              <p className="text-lg">
                                +{currentQuestion.points} points
                              </p>
                            </div>
                          )}
                          <p className="text-gray-600 dark:text-gray-400">Moving to next question...</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Participants Sidebar */}
                <div className="lg:col-span-2">
                  <Card className="shadow-lg border-0 h-fit sticky top-8">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                      <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        Participants ({participants.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4 max-h-[600px] overflow-y-auto">
                        {participants.length > 0 ? (
                          participants.map((participant, index) => (
                            <div
                              key={participant.id}
                              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-base font-bold shadow-md">
                                  {index + 1}
                                </div>
                                <span className="text-base font-semibold text-gray-800 dark:text-gray-200 truncate">
                                  {participant.name}
                                </span>
                              </div>
                              <div className="text-base font-bold text-blue-600 dark:text-blue-400">
                                {participant.score} pts
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-gray-500 dark:text-gray-400 py-6 text-center">
                            <div className="w-10 h-10 mx-auto mb-2 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                              <span className="text-gray-400">👥</span>
                            </div>
                            <p className="text-sm">No participants yet...</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {gameState === "completed" && (
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold">Quiz Completed!</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Congratulations! You have completed all questions.
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{playerStats.score}</div>
                        <div className="text-sm text-gray-600">Total Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{playerStats.correctAnswers}</div>
                        <div className="text-sm text-gray-600">Correct</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{playerStats.accuracy}%</div>
                        <div className="text-sm text-gray-600">Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{playerStats.streak}</div>
                        <div className="text-sm text-gray-600">Best Streak</div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        Redirecting to your detailed results...
                      </p>
                      <div className="mt-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </TooltipProvider>
    </div>
  )
}
