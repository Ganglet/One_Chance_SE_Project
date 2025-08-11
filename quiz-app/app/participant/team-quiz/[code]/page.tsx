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
import { useProctoring } from "@/hooks/useProctoring"
import { ProctoringWarning } from "@/components/ProctoringWarning"

interface Question {
  id: string
  question: string
  type: "multiple-choice" | "multiple_choice" | "true-false" | "true_false" | "matching-pairs" | "matching_pairs" | "ordering"
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
  const [playerName, setPlayerName] = useState<string>("Anonymous")
  const teamName = searchParams.get("team") || "Anonymous Team"
  const quizCode = params.code as string

  const [gameState, setGameState] = useState<"waiting" | "active" | "answered" | "results" | "completed">("waiting")
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [powerUps, setPowerUps] = useState({ fiftyFifty: 1, extraTime: 1, doublePoints: 1, doubleOrNothing: 1, streakSaver: 1 })
  const [activePowerUp, setActivePowerUp] = useState<string | null>(null)
  const [activeStreakSaver, setActiveStreakSaver] = useState<boolean>(false)
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

  const [questions, setQuestions] = useState<Question[]>([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [teams, setTeams] = useState<Team[]>([])
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null)
  const [allParticipants, setAllParticipants] = useState<any[]>([])
  
  // New state for quiz termination
  const [showTerminationModal, setShowTerminationModal] = useState(false)
  const [sessionStatus, setSessionStatus] = useState<string>("waiting")
  const [connectionStatus, setConnectionStatus] = useState<string>("connecting")

  // Calculate enemy teams and current team score
  const enemyTeams = teams.filter(team => team.id !== currentTeam?.id)
  const currentTeamScore = currentTeam?.score || 0

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
    disqualificationRoute: "/participant/team-quiz/disqualified"
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
        const res = await fetch(`/api/sessions?code=${quizCode}`)
        if (res.ok) {
          const data = await res.json()
          console.log("Session info:", data.session)
          
          // Check if current user is already a participant
          const isParticipant = data.session.session_participants?.some((p: any) => 
            p.users && p.users.username === (playerName || localStorage.getItem('username'))
          ) || false
          
          if (!isParticipant) {
            // Join the session if not already a participant
            try {
              const joinRes = await fetch("/api/sessions/join", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                  code: quizCode, 
                  username: (playerName || localStorage.getItem('username') || 'Anonymous') 
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
                
                // Try to auto-assign to a team if not already assigned
                try {
                  const assignRes = await fetch("/api/sessions/assign-team", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code: quizCode })
                  })
                  
                  if (assignRes.ok) {
                    console.log("Auto-assigned to team")
                  } else {
                    console.log("Auto-assignment failed, but continuing")
                  }
                } catch (assignError) {
                  console.log("Auto-assignment error:", assignError)
                }
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
          
          // Apply option shuffling to each question based on its type
          const questionsWithShuffledOptions = processedQuestions.map((question: Question) => {
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
          
          // Remove duplicate questions by id only (if any)
          // const uniqueQuestions = shuffledQuestions.filter(
          //   (q, idx, arr) => arr.findIndex(qq => qq.id === q.id) === idx
          // );
          setQuestions(shuffledQuestions);
          console.log("Questions set for quiz:", shuffledQuestions.map(q => q.id), shuffledQuestions.length);
          
          // Check for duplicate questions
          const questionIds = shuffledQuestions.map(q => q.id)
          const uniqueIds = new Set(questionIds)
          if (questionIds.length !== uniqueIds.size) {
            console.error("DUPLICATE QUESTIONS DETECTED!", {
              totalQuestions: questionIds.length,
              uniqueQuestions: uniqueIds.size,
              questionIds,
              duplicateIds: questionIds.filter((id, index) => questionIds.indexOf(id) !== index)
            })
          }
          
          console.log("Original questions order:", processedQuestions.map((q: Question) => q.id))
          console.log("Shuffled questions order:", shuffledQuestions.map((q: Question) => q.id))
          console.log("Processed questions:", shuffledQuestions)
          // setQuestions(shuffledQuestions) // This line is now redundant as questions are set directly
        } else {
          console.error("Failed to fetch questions:", res.status, res.statusText)
        }
      } catch (error) {
        console.error("Error fetching questions:", error)
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

  const fetchTeams = async () => {
    try {
      const res = await fetch(`/api/sessions/teams?code=${quizCode}`)
      if (res.ok) {
        const data = await res.json()
        const teamsData = data.teams || []
        
        // Also fetch participants to calculate accurate team scores
        const participantsRes = await fetch(`/api/sessions/participants?code=${quizCode}`)
        if (participantsRes.ok) {
          const participantsData = await participantsRes.json()
          const participants = participantsData.participants || []
          
          console.log("Fetched participants for score calculation:", participants.map((p: any) => ({
            username: p.users?.username,
            team: p.team,
            score: p.score
          })))
          
          // Calculate team scores from participant data
          const updatedTeams = teamsData.map((team: Team) => {
            const teamParticipants = participants.filter((p: any) => p.team === team.name)
            const teamScore = teamParticipants.reduce((sum: number, p: any) => sum + (p.score || 0), 0)
            
            console.log(`Team ${team.name} score calculation:`, {
              participants: teamParticipants.map((p: any) => ({ username: p.users?.username, score: p.score })),
              totalScore: teamScore
            })
            
            return {
              ...team,
              score: teamScore || 0
            }
          })
          
          setTeams(updatedTeams)
          
          // Find current user's team
          const userTeam = updatedTeams.find((team: Team) => 
            team.members.includes(playerName)
          )
          if (userTeam) {
            setCurrentTeam(userTeam)
          }
        } else {
          // Fallback if participants fetch fails
          const teamsWithDefaultScores = teamsData.map((team: Team) => ({
            ...team,
            score: team.score || 0
          }))
          setTeams(teamsWithDefaultScores)
          
          // Find current user's team
          const userTeam = teamsWithDefaultScores.find((team: Team) => 
            team.members.includes(playerName)
          )
          if (userTeam) {
            setCurrentTeam(userTeam)
          }
        }
      }
    } catch (error) {
      console.error("Error fetching teams:", error)
      // Keep existing teams if fetch fails
    }
  }

  const fetchParticipants = async () => {
    try {
      const res = await fetch(`/api/sessions/participants?code=${quizCode}`)
      if (res.ok) {
        const data = await res.json()
        const participants = data.participants || []
        setAllParticipants(participants) // Update allParticipants state
        
        console.log("Fetched participants data:", participants.map((p: any) => ({
          username: p.users?.username,
          team: p.team,
          score: p.score
        })))
        
        // Also update teams with participant data if teams are already loaded
        if (teams.length > 0) {
          const updatedTeams = teams.map(team => {
            const teamParticipants = participants.filter((p: any) => p.team === team.name)
            const teamScore = teamParticipants.reduce((sum: number, p: any) => sum + (p.score || 0), 0)
            
            console.log(`Updating team ${team.name} score from participants:`, {
              participants: teamParticipants.map((p: any) => ({ username: p.users?.username, score: p.score })),
              totalScore: teamScore
            })
            
            return {
              ...team,
              score: teamScore || 0
            }
          })
          setTeams(updatedTeams)
          
          // Update current team if it exists
          if (currentTeam) {
            const updatedCurrentTeam = updatedTeams.find(t => t.name === currentTeam.name)
            if (updatedCurrentTeam) {
              setCurrentTeam(updatedCurrentTeam)
            }
          }
        }
      }
    } catch (error) {
      console.error("Error fetching participants:", error)
      // Keep existing participants if fetch fails
    }
  }

  useEffect(() => {
    fetchTeams()
    fetchParticipants()
    
    // Poll for updates every 1 second for more real-time updates
    const interval = setInterval(() => {
      fetchTeams()
      fetchParticipants()
    }, 1000)
    
    return () => clearInterval(interval)
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
            
            // Update live scores if participant data is available
            if (data.participants && Array.isArray(data.participants)) {
              console.log("Updating live scores from SSE:", data.participants)
              // Update teams with real-time participant data
              if (teams.length > 0) {
                const updatedTeams = teams.map(team => {
                  const teamParticipants = data.participants.filter((p: any) => p.team === team.name)
                  const teamScore = teamParticipants.reduce((sum: number, p: any) => sum + (p.score || 0), 0)
                  
                  console.log(`Team ${team.name} score update:`, {
                    participants: teamParticipants.map((p: any) => ({ username: p.username, score: p.score })),
                    totalScore: teamScore
                  })
                  
                  return {
                    ...team,
                    score: teamScore || 0
                  }
                })
                setTeams(updatedTeams)
                
                // Also update current team if it exists
                if (currentTeam) {
                  const updatedCurrentTeam = updatedTeams.find(t => t.name === currentTeam.name)
                  if (updatedCurrentTeam) {
                    setCurrentTeam(updatedCurrentTeam)
                  }
                }
              }
            }
            
            // Start the quiz when session becomes active
            if (sessionStatus === "active" && gameState === "waiting" && questions.length > 0) {
              console.log("Session is now active, starting quiz...")
              console.log("Current state:", { sessionStatus, gameState, questionsLength: questions.length, questionIndex })
              
              // Start from the first question
              const startIndex = 0
              
              console.log(`Starting quiz from question ${startIndex + 1}`)
              
              // Reset all state to ensure clean start
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
            // Removed setShowProctoringWarning(true)
          } else if (data.type === "question_started") {
            // For team quiz, we handle question progression locally
            // Only update if we're not currently in the middle of answering
            if (gameState === "waiting" && !currentQuestion) {
              const newQuestionIndex = data.questionIndex || 0
              console.log(`Question started event: index ${newQuestionIndex + 1}, question:`, data.question)
              
              setQuestionIndex(newQuestionIndex)
              setCurrentQuestion(data.question)
              setTimeRemaining(data.question.timeLimit || 30)
              setSelectedAnswer(null)
              setShowFeedback(false)
              setHiddenOptions([])
              setMatchingAnswers({})
              setOrderingAnswers([])
              setActivePowerUp(null)
              setGameState("active")
            } else {
              console.log("Ignoring question_started event - local progression in progress")
            }
          } else if (data.type === "question_ended") {
            // Only handle question_ended if we're not in local progression
            if (gameState === "active" && !showFeedback) {
              setGameState("answered")
              setShowFeedback(true)
            }
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

  // Monitor question progression for debugging
  useEffect(() => {
    console.log("Question progression update:", {
      questionIndex,
      currentQuestionId: currentQuestion?.id,
      gameState,
      totalQuestions: questions.length
    })
  }, [questionIndex, currentQuestion?.id, gameState, questions.length])

  // Synchronize question index with current question
  useEffect(() => {
    if (currentQuestion && questions.length > 0) {
      const expectedIndex = questions.findIndex(q => q.id === currentQuestion.id)
      if (expectedIndex !== -1 && expectedIndex !== questionIndex) {
        console.log(`Question index mismatch detected. Expected: ${expectedIndex}, Actual: ${questionIndex}`)
        console.log("Synchronizing question index...")
        setQuestionIndex(expectedIndex)
      }
    }
  }, [currentQuestion?.id, questions, questionIndex])

  // Safety timeout to prevent getting stuck in answered state
  useEffect(() => {
    if (gameState === "answered") {
      const timeout = setTimeout(() => {
        console.log("Safety timeout triggered - auto-advancing to next question")
        // Only call handleNextQuestion if we're still in answered state
        if (gameState === "answered") {
          handleNextQuestion()
        } else {
          console.log("Safety timeout ignored - state changed")
        }
      }, 3000) // 3 seconds timeout
      
      return () => clearTimeout(timeout)
    }
  }, [gameState])

  const handleNextQuestion = () => {
    console.log("handleNextQuestion called, current questionIndex:", questionIndex)
    console.log("Current game state:", gameState)
    console.log("Total questions:", questions.length)
    console.log("Current question ID:", currentQuestion?.id)
    
    // Prevent multiple calls during transition
    if (gameState === "waiting") {
      console.log("Already in transition, skipping handleNextQuestion call")
      return
    }
    
    if (questionIndex < questions.length - 1) {
      const nextIndex = questionIndex + 1
      console.log(`Moving to next question: ${nextIndex + 1}/${questions.length}`)
      console.log("Next question data:", questions[nextIndex])
      
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
      
      // Set the next question after a brief delay
      setTimeout(() => {
        if (nextIndex < questions.length && questions[nextIndex]) {
          console.log("Setting next question:", questions[nextIndex])
          setCurrentQuestion(questions[nextIndex])
          setGameState("active")
          setTimeRemaining(questions[nextIndex].timeLimit)
          setSelectedAnswer(null)
        } else {
          console.error("Invalid nextIndex or question not found:", nextIndex, questions.length)
          setGameState("completed")
        }
      }, 500)
    } else {
      console.log("All questions completed!")
      setGameState("completed")
    }
  }

  const handleSkipQuestion = () => {
    console.log("Skip question triggered")
    console.log("Current game state:", gameState)
    if (gameState === "active") {
      // Temporarily disable proctoring during skip action
      
      console.log("Submitting skip answer")
      // Submit answer as incorrect when skipping
      const timeTaken = (currentQuestion?.timeLimit || 30) - timeRemaining
      const basePoints = currentQuestion?.points || 10
      // Double or Negative: skipping counts as wrong → negative base points
      const pointsAwarded = activePowerUp === "doubleOrNothing" ? -basePoints : 0
      
      // Update time statistics
      const newTotalTime = (playerStats.totalTimeTaken || 0) + timeTaken
      const newFastestAnswer = (playerStats.fastestAnswer || 0) === 0 ? timeTaken : Math.min((playerStats.fastestAnswer || 0), timeTaken)
      const newSlowestAnswer = Math.max((playerStats.slowestAnswer || 0), timeTaken)
      const newAverageTime = Math.round(newTotalTime / (playerStats.totalAnswered + 1))
      
      const preservedStreak = activeStreakSaver && playerStats.streak >= 1 ? playerStats.streak : 0
      const newScore = Math.max(0, playerStats.score + pointsAwarded)
      const newStats = {
        ...playerStats,
        score: newScore,
        streak: preservedStreak,
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
        pointsAwarded,
        newStats.streak
      )
      
      // Update participant stats
      updateParticipantStats(newStats)
      
      console.log(`Question skipped, Points: 0`)
      console.log(`Question ${questionIndex + 1} of ${questions.length} completed`)
      
      // Clear power-ups after skip (consume Streak Saver now that it was used on a miss)
      if (activePowerUp) setActivePowerUp(null)
      if (activeStreakSaver) setActiveStreakSaver(false)

      // Re-enable proctoring after a short delay
      setTimeout(() => {
        
      }, 2000)
      
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
        break
      case "doubleOrNothing":
        setActivePowerUp("doubleOrNothing")
        break
      case "streakSaver":
        if (playerStats.streak < 3) {
          // Refund if not eligible
          setPowerUps(prev => ({ ...prev, streakSaver: prev.streakSaver + 1 }))
          toast({ title: "Streak too low", description: "Need a streak of 3+ to use Streak Saver." })
          return
        }
        setActiveStreakSaver(true)
        break
    }
  }

  const handleAnswerSelect = (answer: string | number) => {
    console.log("handleAnswerSelect called with answer:", answer)
    console.log("Current game state:", gameState)
    console.log("Current question ID:", currentQuestion?.id)
    
    if (gameState === "active") {
      // Prevent multiple submissions for the same question
      if (selectedAnswer !== null) {
        console.log("Answer already selected, ignoring duplicate submission")
        return
      }
      
      setSelectedAnswer(answer)
      
      // For MCQ and True/False questions, provide immediate feedback and auto-advance
      if (currentQuestion && (currentQuestion.type === "multiple-choice" || currentQuestion.type === "true-false")) {
        // Check if answer is correct
        let isCorrect = false
        
        if (currentQuestion.type === "multiple-choice") {
          // For MCQ, answer is the index, we need to get the option text
          const selectedOption = currentQuestion.options?.[answer as number]
          isCorrect = selectedOption === currentQuestion.correct_answer
          console.log("MCQ Answer validation:", {
            selectedIndex: answer,
            selectedOption,
            correctAnswer: currentQuestion.correct_answer,
            isCorrect
          })
        } else {
          // For True/False, direct comparison
          isCorrect = answer === currentQuestion.correct_answer
        }
        
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
        
        console.log(`Answer submitted: ${answer}, Selected option: ${currentQuestion.options?.[answer as number]}, Correct answer: ${currentQuestion.correct_answer}, Correct: ${isCorrect}, Points: ${isCorrect ? pointsAwarded : 0}`)
        console.log(`Question ${questionIndex + 1} of ${questions.length} completed`)
        
        // Check if this was the last question
        if (questionIndex + 1 >= questions.length) {
          console.log("This was the last question, completing quiz...")
          setTimeout(() => {
            setGameState("completed")
          }, 2000)
        } else {
          // Auto-advance after 2 seconds
          setTimeout(() => {
            console.log("Auto-advancing to next question")
            console.log("Current question index:", questionIndex, "Total questions:", questions.length)
            handleNextQuestion()
          }, 2000)
        }
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
      // Check if this item is already in the order
      const existingIndex = newOrder.findIndex(item => item === currentQuestion?.orderingItems?.[itemIndex])
      if (existingIndex !== -1) {
        // Remove from existing position
        newOrder.splice(existingIndex, 1)
      }
      // Add to new position
      newOrder[newPosition] = currentQuestion?.orderingItems?.[itemIndex] || ""
      return newOrder
    })
  }

  const handleResetQuestion = () => {
    if (gameState !== "active") return
    
    if (currentQuestion?.type === "matching-pairs") {
      setMatchingAnswers({})
      setSelectedLeftItem(null)
    } else if (currentQuestion?.type === "ordering") {
      setOrderingAnswers([])
    }
  }

  const handleSubmitNewQuestionType = () => {
    if (gameState !== "active") return
    
    // Temporarily disable proctoring during answer submission
    
    let answer: string | number | null = null
    let isCorrect = false
    
    if (currentQuestion?.type === "matching-pairs") {
      // Check if all pairs are matched
      const allMatched = currentQuestion.matchingPairs?.every((_, index) => 
        matchingAnswers[index] !== undefined
      )
      if (allMatched) {
        try {
          const correctPairs = JSON.parse(String(currentQuestion.correct_answer || '[]'))
          // Build a map from left to right for correct answer
          const correctMap = new Map(
            correctPairs.map((pair: { left: string; right: string }) => [pair.left, pair.right])
          );
          // Build a map from left to right for user answer
          let userMap = new Map();
          Object.entries(matchingAnswers).forEach(([leftIdx, rightIdx]) => {
            const left = currentQuestion.matchingPairs && currentQuestion.matchingPairs[parseInt(leftIdx)]?.left;
            const right = currentQuestion.matchingPairs && currentQuestion.matchingPairs[rightIdx]?.right;
            if (left && right) userMap.set(left, right);
          });
          // Compare both maps
          isCorrect = Array.isArray(currentQuestion.matchingPairs) && currentQuestion.matchingPairs.every((pair) => {
            return userMap.get(pair.left) === correctMap.get(pair.left);
          });
        } catch (error) {
          isCorrect = false;
        }
        answer = JSON.stringify(matchingAnswers)
      } else {
        // Not all pairs matched, show error
        toast({
          title: "Incomplete Matching",
          description: "Please match all items before submitting.",
          variant: "destructive",
        })
        // Re-enable proctoring since we're not submitting
        return
      }
    } else if (currentQuestion?.type === "ordering") {
      // Check if all items are ordered
      const allOrdered = currentQuestion.orderingItems?.every((_, index) => 
        orderingAnswers[index] !== undefined
      )
      if (allOrdered) {
        try {
          const correctOrder = JSON.parse(String(currentQuestion.correct_answer || '[]'))
          isCorrect = Array.isArray(correctOrder) && correctOrder.length === orderingAnswers.length &&
            orderingAnswers.every((item, index) => item === correctOrder[index]);
        } catch (error) {
          isCorrect = false;
        }
        answer = JSON.stringify(orderingAnswers)
      } else {
        // Not all items ordered, show error
        toast({
          title: "Incomplete Ordering",
          description: "Please arrange all items before submitting.",
          variant: "destructive",
        })
        // Re-enable proctoring since we're not submitting
        return
      }
    }
    
    if (answer !== null) {
      handleSubmitAnswer(answer, isCorrect)
      
      // Re-enable proctoring after a short delay
      setTimeout(() => {
        
      }, 2000)
      
      // Auto-advance after 2 seconds
      setTimeout(() => {
        handleNextQuestion()
      }, 2000)
    }
  }

  const handleSubmitAnswer = (answer?: string | number, isCorrect?: boolean) => {
    if (gameState !== "active" && gameState !== "answered") return
    
    const finalAnswer = answer ?? selectedAnswer
    const finalIsCorrect = isCorrect ?? (finalAnswer === currentQuestion?.correct_answer)
    
    if (finalAnswer === null) return
    
    const timeTaken = (currentQuestion?.timeLimit || 30) - timeRemaining
    const basePoints = currentQuestion?.points || 10
    let pointsAwarded = 0
    if (finalIsCorrect) {
      pointsAwarded = basePoints * (activePowerUp === "doublePoints" || activePowerUp === "doubleOrNothing" ? 2 : 1)
    } else {
      pointsAwarded = activePowerUp === "doubleOrNothing" ? -basePoints : 0
    }
    
    // Update time statistics
    const newTotalTime = (playerStats.totalTimeTaken || 0) + timeTaken
    const newFastestAnswer = (playerStats.fastestAnswer || 0) === 0 ? timeTaken : Math.min((playerStats.fastestAnswer || 0), timeTaken)
    const newSlowestAnswer = Math.max((playerStats.slowestAnswer || 0), timeTaken)
    const newAverageTime = Math.round(newTotalTime / (playerStats.totalAnswered + 1))
    
    const preservedStreak = !finalIsCorrect && activeStreakSaver && playerStats.streak >= 1
      ? playerStats.streak
      : (finalIsCorrect ? playerStats.streak + 1 : 0)
    const newScore = Math.max(0, playerStats.score + pointsAwarded)
    const newStats = {
      ...playerStats,
      score: newScore,
      streak: preservedStreak,
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
    
    // Clear active power-up; only consume Streak Saver on a miss
    if (activePowerUp) setActivePowerUp(null)
    if (!finalIsCorrect && activeStreakSaver) setActiveStreakSaver(false)

    // Save answer to server
    saveAnswer(
      currentQuestion?.id || "",
      finalAnswer,
      finalIsCorrect,
      timeTaken,
      pointsAwarded,
      newStats.streak
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

      const response = await fetch("/api/sessions/update-stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: quizCode,
          username: playerName,
          stats: enhancedStats
        })
      })

      if (response.ok) {
        console.log("Stats updated successfully")
        // Don't automatically fetch teams/participants to prevent loops
      }
    } catch (error) {
      console.error("Error updating stats:", error)
    }
  }

  const saveAnswer = async (questionId: string, selectedOption: string | number | null, isCorrect: boolean, timeTaken: number, pointsAwarded: number, streakAtTime: number) => {
    try {
      const response = await fetch("/api/sessions/answers", {
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

      if (response.ok) {
        console.log("Answer saved successfully")
        // Don't automatically fetch teams/participants to prevent loops
      }
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
      
      // Check if this was the last question
      if (questionIndex + 1 >= questions.length) {
        console.log("This was the last question (time up), completing quiz...")
        setTimeout(() => {
          setGameState("completed")
        }, 2000)
      } else {
        // Auto-advance after 2 seconds
        setTimeout(() => {
          handleNextQuestion()
        }, 2000)
      }
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

  // Handle quiz completion
  useEffect(() => {
    if (gameState === "completed") {
      console.log("Quiz completed, redirecting to review page...")
      setTimeout(() => {
        router.push(`/participant/team-quiz-review/${quizCode}?name=${encodeURIComponent(playerName)}`)
      }, 2000)
    }
  }, [gameState, quizCode, playerName, router])

  // Proctoring is now handled by the useProctoring hook above

  // Only show game content if questions are loaded
  if (questions.length === 0) {
    return <div>Loading questions...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
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

        {/* Score Display Panel */}
        {(gameState === "active" || gameState === "answered") && (
          <div className="fixed top-4 right-4 bg-gray-800/90 border border-gray-600 rounded-lg p-3 w-64 z-10 backdrop-blur-sm">
            <h3 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm">
              <Trophy className="w-3 h-3 text-yellow-400" />
              Live Scores
            </h3>
            
            {/* Your Team */}
            {currentTeam && (
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: currentTeam.color }}
                  />
                  <span className="text-white font-medium text-xs">Your Team ({currentTeam.name})</span>
                </div>
                
                {/* Team Score */}
                <div className="bg-gray-700/80 rounded p-1 mb-1">
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">
                      {currentTeamScore}
                    </div>
                    <div className="text-xs text-gray-400">Total Points</div>
                  </div>
                </div>
                
                {/* Teammates */}
                <div className="space-y-0.5">
                  {currentTeam.members.map((member) => {
                    const memberData = allParticipants.find((p: any) => p.users?.username === member)
                    return (
                      <div key={member} className="flex justify-between items-center text-xs">
                        <span className={`${member === playerName ? 'text-blue-400 font-medium' : 'text-gray-300'}`}>
                          {member === playerName ? `${member} (You)` : member}
                        </span>
                        <span className="text-gray-400">
                          {memberData?.score || 0} pts
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            
            {/* Enemy Teams */}
            {enemyTeams.length > 0 && (
              <div>
                <div className="text-gray-400 text-xs mb-1">Other Teams</div>
                <div className="space-y-1">
                  {enemyTeams.map((team) => (
                    <div key={team.id} className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: team.color }}
                      />
                      <span className="text-gray-300 text-xs">{team.name}</span>
                      <span className="text-gray-400 text-xs ml-auto">{team.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Main Quiz Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Connection Status */}
          <div className="mb-4 text-center">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
              connectionStatus === "connected" 
                ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                : "bg-red-500/20 text-red-400 border border-red-500/30"
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                connectionStatus === "connected" ? "bg-green-400" : "bg-red-400"
              }`} />
              {connectionStatus === "connected" ? "Connected" : "Disconnected"}
            </div>
          </div>

          {/* Game State Display */}
          {gameState === "waiting" && (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold mb-2">Waiting for Host</h2>
              <p className="text-gray-400">The quiz will start when the host begins the session.</p>
              <div className="mt-4 text-sm text-gray-500">
                Session Code: <span className="font-mono bg-gray-800 px-2 py-1 rounded">{quizCode}</span>
              </div>
            </div>
          )}

          {/* Active Quiz */}
          {gameState === "active" && currentQuestion && (
            <div className="max-w-4xl mx-auto">
              {/* Question Header */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      Question {questionIndex + 1} of {questions.length}
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                      {currentQuestion.points} points
                    </Badge>
                    <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                      {currentQuestion.type.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-400" />
                    <span className="text-lg font-bold text-red-400">{timeRemaining}s</span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <Progress 
                  value={(timeRemaining / (currentQuestion.timeLimit || 30)) * 100} 
                  className="h-2 bg-gray-700"
                />
              </div>

              {/* Question Content */}
              <Card className="bg-gray-800 border-gray-700 mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
                  
                  {/* Multiple Choice Questions */}
                  {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <Button
                          key={index}
                          variant={selectedAnswer === index ? "default" : "outline"}
                          className={`w-full justify-start text-left h-auto p-4 ${
                            selectedAnswer === index 
                              ? "bg-blue-600 hover:bg-blue-700" 
                              : "bg-gray-700 hover:bg-gray-600 border-gray-600"
                          } ${
                            hiddenOptions.includes(index) ? "opacity-50 pointer-events-none" : ""
                          }`}
                          onClick={() => handleAnswerSelect(index)}
                          disabled={hiddenOptions.includes(index)}
                        >
                          <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* True/False Questions */}
                  {currentQuestion.type === "true-false" && (
                    <div className="space-y-3">
                      <Button
                        variant={selectedAnswer === "true" ? "default" : "outline"}
                        className={`w-full justify-start text-left h-auto p-4 ${
                          selectedAnswer === "true" 
                            ? "bg-blue-600 hover:bg-blue-700" 
                            : "bg-gray-700 hover:bg-gray-600 border-gray-600"
                        }`}
                        onClick={() => handleAnswerSelect("true")}
                      >
                        <CheckCircle className="w-5 h-5 mr-3" />
                        True
                      </Button>
                      <Button
                        variant={selectedAnswer === "false" ? "default" : "outline"}
                        className={`w-full justify-start text-left h-auto p-4 ${
                          selectedAnswer === "false" 
                            ? "bg-blue-600 hover:bg-blue-700" 
                            : "bg-gray-700 hover:bg-gray-600 border-gray-600"
                        }`}
                        onClick={() => handleAnswerSelect("false")}
                      >
                        <XCircle className="w-5 h-5 mr-3" />
                        False
                      </Button>
                    </div>
                  )}

                  {/* Matching Pairs Questions */}
                  {currentQuestion.type === "matching-pairs" && currentQuestion.matchingPairs && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        {/* Left Items */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 text-blue-400">Left Items</h3>
                          <div className="space-y-2">
                            {currentQuestion.matchingPairs.map((pair, index) => (
                              <div
                                key={index}
                                className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                                  selectedLeftItem === index
                                    ? "border-blue-500 bg-blue-500/20"
                                    : matchedRightItems.has(matchingAnswers[index])
                                    ? "border-green-500 bg-green-500/20"
                                    : "border-gray-600 bg-gray-700 hover:border-gray-500"
                                }`}
                                onClick={() => handleMatchingPairSelect(index, -1)}
                              >
                                {pair.left}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Right Items */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 text-green-400">Right Items</h3>
                          <div className="space-y-2">
                            {currentQuestion.matchingPairs.map((pair, index) => (
                              <div
                                key={index}
                                className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                                  matchedRightItems.has(index)
                                    ? "border-green-500 bg-green-500/20"
                                    : "border-gray-600 bg-gray-700 hover:border-gray-500"
                                }`}
                                onClick={() => handleMatchingPairSelect(-1, index)}
                              >
                                {pair.right}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={handleSubmitNewQuestionType}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Submit Answer
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleResetQuestion}
                          className="border-gray-600 text-gray-400 hover:bg-gray-700"
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Ordering Questions */}
                  {currentQuestion.type === "ordering" && currentQuestion.orderingItems && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-purple-400">Arrange in Correct Order</h3>
                        
                        {/* Current Order */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Current Order:</h4>
                          <div className="space-y-2">
                            {orderingAnswers.map((item, index) => (
                              <div key={index} className="flex items-center gap-3 p-2 bg-gray-700 rounded">
                                <span className="text-sm font-medium text-gray-400 w-6">{index + 1}.</span>
                                <span className="text-white">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Available Items */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Available Items:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {currentQuestion.orderingItems.map((item, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                                onClick={() => {
                                  const nextPosition = orderingAnswers.length
                                  handleOrderingSelect(index, nextPosition)
                                }}
                                disabled={orderingAnswers.includes(item)}
                              >
                                {item}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={handleSubmitNewQuestionType}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Submit Answer
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleResetQuestion}
                          className="border-gray-600 text-gray-400 hover:bg-gray-700"
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Power-ups */}
              <div className="flex justify-center gap-4 mb-6">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => usePowerUp("fiftyFifty")}
                      disabled={powerUps.fiftyFifty <= 0 || gameState !== "active"}
                      className="border-yellow-500 text-yellow-400 hover:bg-yellow-600"
                    >
                      <Shield className="w-4 h-4 mr-2" />
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
                      onClick={() => usePowerUp("extraTime")}
                      disabled={powerUps.extraTime <= 0 || gameState !== "active"}
                      className="border-green-500 text-green-400 hover:bg-green-600"
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      +15s ({powerUps.extraTime})
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add 15 seconds to the timer</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => usePowerUp("doublePoints")}
                      disabled={powerUps.doublePoints <= 0 || gameState !== "active"}
                      className={`border-purple-500 text-purple-400 hover:bg-purple-600 ${
                        activePowerUp === "doublePoints" ? "bg-purple-600" : ""
                      }`}
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      2x Points ({powerUps.doublePoints})
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Double points for 30 seconds</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => usePowerUp("doubleOrNothing")}
                      disabled={powerUps.doubleOrNothing <= 0 || gameState !== "active"}
                      className={`border-red-500 text-red-400 hover:bg-red-600 ${
                        activePowerUp === "doubleOrNothing" ? "bg-red-600" : ""
                      }`}
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      Double or Negative ({powerUps.doubleOrNothing})
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Double points if correct; lose base points if wrong</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => usePowerUp("streakSaver")}
                      disabled={powerUps.streakSaver <= 0 || gameState !== "active" || playerStats.streak < 3 || activeStreakSaver}
                      className={`border-emerald-500 text-emerald-400 hover:bg-emerald-600 ${
                        activeStreakSaver ? "bg-emerald-600" : ""
                      }`}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Streak Saver ({powerUps.streakSaver})
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Preserve your current streak (3+) on one miss</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Skip Button */}
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={handleSkipQuestion}
                  disabled={gameState !== "active"}
                  className="border-red-500 text-red-400 hover:bg-red-600"
                >
                  Skip Question
                </Button>
              </div>
            </div>
          )}

          {/* Answer Feedback */}
          {gameState === "answered" && showFeedback && (
            <div className="max-w-4xl mx-auto text-center">
              <Card className={`border-2 ${
                isCorrect ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"
              }`}>
                <CardContent className="p-8">
                  <div className="mb-4">
                    {isCorrect ? (
                      <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
                    ) : (
                      <XCircle className="w-16 h-16 text-red-400 mx-auto" />
                    )}
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${
                    isCorrect ? "text-green-400" : "text-red-400"
                  }`}>
                    {isCorrect ? "Correct!" : "Incorrect"}
                  </h2>
                  <p className="text-gray-300 mb-4">
                    {isCorrect 
                      ? `You earned ${currentQuestion?.points || 0} points!`
                      : "Better luck next time!"
                    }
                  </p>
                  <div className="text-sm text-gray-400">
                    Moving to next question...
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </TooltipProvider>
    </div>
  )
}