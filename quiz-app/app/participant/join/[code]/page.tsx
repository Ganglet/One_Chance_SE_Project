"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Users, Trophy, Clock, Zap } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

export default function JoinQuiz() {
  const params = useParams()
  const router = useRouter()
  const [playerName, setPlayerName] = useState("")
  const [isJoining, setIsJoining] = useState(false)

  const quizCode = params.code as string

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Prefill with logged-in username but allow editing
      setPlayerName(localStorage.getItem('username') || '')
    }
  }, [])

  // Mock quiz data
  const quizData = {
    title: "General Knowledge Quiz",
    description: "Test your knowledge across various topics",
    totalQuestions: 15,
    estimatedTime: 8,
    participants: 12,
    status: "waiting" as const,
  }

  const handleJoinQuiz = async () => {
    if (!playerName.trim()) return
    setIsJoining(true)
    try {
      const res = await fetch("/api/sessions/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: quizCode, username: playerName.trim() })
      })
      if (!res.ok) {
        setIsJoining(false)
        alert("Failed to join session: " + (await res.text()))
        return
      }
      // Redirect to quiz interface with display name
      router.push(`/participant/quiz/${quizCode}?name=${encodeURIComponent(playerName.trim())}`)
    } catch (err) {
      setIsJoining(false)
      alert("Network error: " + err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl mb-2">
            One Chance
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Join Quiz Session
          </p>
        </div>
        <Card className="border-2 border-blue-200 dark:border-blue-800 shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-2xl">Join Quiz</CardTitle>
            <CardDescription>
              Quiz Code: <span className="font-mono font-bold text-lg">{quizCode}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Quiz Info */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-lg">{quizData.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{quizData.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span>{quizData.totalQuestions} Questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>~{quizData.estimatedTime} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-500" />
                  <span>{quizData.participants} Joined</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-500" />
                  <Badge variant="secondary" className="text-xs">
                    {quizData.status === "waiting" ? "Waiting" : "Active"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Player Name Input */}
            <div className="space-y-2">
              <Label htmlFor="playerName">Your Name</Label>
              <Input
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
                maxLength={20}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && playerName.trim()) {
                    handleJoinQuiz()
                  }
                }}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">This name will be shown to the host and other participants</p>
            </div>

            {/* Join Button */}
            <Button onClick={handleJoinQuiz} disabled={!playerName.trim() || isJoining} className="w-full" size="lg">
              {isJoining ? "Joining..." : "Join Quiz"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
