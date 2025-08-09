"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2, ArrowLeftIcon, Users, Shield, Trophy, Zap, Gamepad2, Target, Clock, Star, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface Question {
  id: string
  type: "multiple-choice" | "true-false" | "matching-pairs" | "ordering"
  question: string
  options?: string[]
  correctAnswer: string | number
  timeLimit: number
  points: number
  category?: string
  matchingPairs?: Array<{ left: string; right: string }>
  orderingItems?: string[]
}

interface Team {
  id: string
  name: string
  color: string
  members: string[]
  maxMembers: number
}

export default function CreateTeamQuiz() {
  const router = useRouter()
  const [quizTitle, setQuizTitle] = useState("")
  const [quizDescription, setQuizDescription] = useState("")
  const [negativeMarking, setNegativeMarking] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [teams, setTeams] = useState<Team[]>([
    { id: "1", name: "Team Alpha", color: "#00ff88", members: [], maxMembers: 4 },
    { id: "2", name: "Team Beta", color: "#ff0080", members: [], maxMembers: 4 }
  ])
  const [maxTeams, setMaxTeams] = useState(4)
  const [teamSize, setTeamSize] = useState(4)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const savedQuizData = localStorage.getItem('teamQuizData')
    if (savedQuizData) {
      try {
        const quizData = JSON.parse(savedQuizData)
        setQuizTitle(quizData.title || "")
        setQuizDescription(quizData.description || "")
        setNegativeMarking(quizData.negativeMarking || false)
        setQuestions(quizData.questions || [])
      } catch (error) {
        console.error('Error parsing saved quiz data:', error)
        localStorage.removeItem('teamQuizData')
      }
    }
  }, [])

  // Update existing teams when teamSize changes
  useEffect(() => {
    setTeams(prevTeams => 
      prevTeams.map(team => ({
        ...team,
        maxMembers: teamSize
      }))
    )
  }, [teamSize])

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      timeLimit: 30,
      points: 100,
      category: "General",
      matchingPairs: [],
      orderingItems: [],
    }
    setQuestions([...questions, newQuestion])
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, ...updates } : q)))
  }

  const addTeam = () => {
    if (teams.length >= maxTeams) return
    const teamColors = ["#00ff88", "#ff0080", "#0080ff", "#ff8000", "#8000ff", "#ff0080", "#00ffff", "#ffff00"]
    const newTeam: Team = {
      id: Date.now().toString(),
      name: `Team ${String.fromCharCode(65 + teams.length)}`,
      color: teamColors[teams.length % teamColors.length],
      members: [],
      maxMembers: teamSize
    }
    setTeams([...teams, newTeam])
  }

  const removeTeam = (id: string) => {
    if (teams.length <= 2) return
    setTeams(teams.filter(team => team.id !== id))
  }

  const updateTeam = (id: string, updates: Partial<Team>) => {
    setTeams(teams.map(team => team.id === id ? { ...team, ...updates } : team))
  }

  const handleSaveTeamQuiz = async () => {
    const userId = Number(localStorage.getItem("userId"));
    if (!userId) {
      alert("User not logged in. Please log in again.");
      return;
    }
    
    if (teams.length < 2) {
      alert("You need at least 2 teams for a team quiz.");
      return;
    }

    setIsLoading(true);

    try {
      const formattedQuestions = questions.map((q) => ({
        ...q,
        type: q.type === "multiple-choice" ? "multiple_choice" : 
              q.type === "true-false" ? "true_false" : 
              q.type === "matching-pairs" ? "matching_pairs" : "ordering",
        correctAnswer: q.type === "multiple-choice" ? (q.options && typeof q.correctAnswer === "number") ? q.options[q.correctAnswer] : "" :
                      q.type === "true-false" ? q.correctAnswer === "true" :
                      q.type === "matching-pairs" ? JSON.stringify(q.matchingPairs || []) :
                      JSON.stringify(q.orderingItems || [])
      }));

      const res = await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: quizTitle,
          description: quizDescription,
          negativeMarking,
          teamMode: true,
          questions: formattedQuestions,
          userId,
          teams: teams,
          maxTeams,
          teamSize
        }),
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to create team quiz')
      }
      localStorage.removeItem('teamQuizData');
      router.push('/host/dashboard');
    } catch (err) {
      console.error('Error creating team quiz:', err)
      alert(`Error creating team quiz: ${err instanceof Error ? err.message : 'Unknown error occurred'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-cyan-50">
      <div className="container mx-auto px-4 py-10">
        {/* Header Section */}
        <div className="flex items-center gap-6 mb-12">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-900/30 border border-cyan-500/50 rounded-lg px-4 py-2 transition-all duration-200 shadow-lg"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-2">
              CREATE TEAM QUIZ
            </h1>
            <p className="text-cyan-300 text-lg font-medium">
              Design an epic team-based quiz with competitive gameplay
            </p>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Quiz Settings Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 bg-gray-800 border border-cyan-500/30 shadow-xl rounded-xl">
              <CardHeader className="bg-gray-700 border-b border-cyan-500/30 rounded-t-xl">
                <CardTitle className="text-cyan-400 text-2xl font-bold flex items-center gap-3">
                  <Gamepad2 className="w-6 h-6 text-cyan-400" />
                  Quiz Settings
                </CardTitle>
                <CardDescription className="text-cyan-300 font-medium">
                  Configure your team quiz parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-7 p-7">
                <div className="space-y-3">
                  <Label htmlFor="title" className="text-cyan-300 font-semibold">Quiz Title</Label>
                  <Input
                    id="title"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    placeholder="Enter quiz title"
                    className="bg-gray-800/80 border border-cyan-500/50 text-cyan-50 placeholder-cyan-400/50 focus:border-cyan-400 focus:ring-cyan-400/30 rounded-xl h-12 text-lg shadow-inner"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="description" className="text-cyan-300 font-semibold">Description</Label>
                  <Textarea
                    id="description"
                    value={quizDescription}
                    onChange={(e) => setQuizDescription(e.target.value)}
                    placeholder="Brief description of your team quiz"
                    rows={3}
                    className="bg-gray-800/80 border border-cyan-500/50 text-cyan-50 placeholder-cyan-400/50 focus:border-cyan-400 focus:ring-cyan-400/30 rounded-xl resize-none text-base shadow-inner"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-cyan-500/30">
                  <Label htmlFor="negative-marking" className="text-cyan-300 font-semibold">Negative Marking</Label>
                  <Switch 
                    id="negative-marking" 
                    checked={negativeMarking} 
                    onCheckedChange={setNegativeMarking}
                    className="data-[state=checked]:bg-cyan-500 data-[state=unchecked]:bg-gray-600"
                  />
                </div>
                {/* Team Configuration */}
                <div className="space-y-4 p-4 bg-gray-800/50 rounded-xl border border-cyan-500/30">
                  <Label className="text-cyan-400 font-bold flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400" />
                    Team Configuration
                  </Label>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-cyan-300 font-medium">Maximum Teams</Label>
                      <Select value={maxTeams.toString()} onValueChange={(value) => setMaxTeams(Number(value))}>
                        <SelectTrigger className="bg-gray-800/80 border border-cyan-500/50 text-cyan-50 hover:border-cyan-400 focus:border-cyan-400 focus:ring-cyan-400/30 rounded-xl h-12 text-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-cyan-500/50">
                          {[2, 3, 4, 5, 6, 7, 8].map(num => (
                            <SelectItem key={num} value={num.toString()} className="text-cyan-50 hover:bg-cyan-900/50 focus:bg-cyan-900/50">
                              {num} Teams
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-cyan-300 font-medium">Team Size</Label>
                      <Select value={teamSize.toString()} onValueChange={(value) => setTeamSize(Number(value))}>
                        <SelectTrigger className="bg-gray-800/80 border border-cyan-500/50 text-cyan-50 hover:border-cyan-400 focus:border-cyan-400 focus:ring-cyan-400/30 rounded-xl h-12 text-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-cyan-500/50">
                          {[2, 3, 4, 5, 6].map(num => (
                            <SelectItem key={num} value={num.toString()} className="text-cyan-50 hover:bg-cyan-900/50 focus:bg-cyan-900/50">
                              {num} Members
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                {/* Quiz Stats */}
                <div className="pt-6 border-t border-cyan-500/30">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl border border-cyan-500/30">
                      <span className="text-cyan-300 font-medium flex items-center gap-2">
                        <Target className="w-4 h-4 text-green-400" />
                        Total Questions
                      </span>
                      <span className="text-cyan-50 font-bold text-lg">{questions.length}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl border border-cyan-500/30">
                      <span className="text-cyan-300 font-medium flex items-center gap-2">
                        <Users className="w-4 h-4 text-cyan-400" />
                        Teams
                      </span>
                      <span className="text-cyan-50 font-bold text-lg">{teams.length}/{maxTeams}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl border border-cyan-500/30">
                      <span className="text-cyan-300 font-medium flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        Total Points
                      </span>
                      <span className="text-cyan-50 font-bold text-lg">{totalPoints}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={handleSaveTeamQuiz}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-3 rounded-xl text-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed mt-4 group relative overflow-hidden"
                  size="lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating Quiz...
                      </div>
                    ) : (
                      <>
                        <Trophy className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        Create Team Quiz
                      </>
                    )}
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>
          {/* Teams and Questions */}
          <div className="lg:col-span-2 space-y-10">
            {/* Teams Section */}
            <Card className="bg-gray-800 border border-cyan-500/30 shadow-xl rounded-xl">
              <CardHeader className="bg-gray-700 border-b border-cyan-500/30 rounded-t-xl">
                <CardTitle className="text-cyan-400 text-2xl font-bold flex items-center gap-3">
                  <Shield className="w-6 h-6 text-cyan-400" />
                  Team Configuration
                </CardTitle>
                <CardDescription className="text-cyan-300 font-medium">
                  Set up your teams for competitive gameplay
                </CardDescription>
              </CardHeader>
              <CardContent className="p-7">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {teams.map((team) => (
                    <div 
                      key={team.id} 
                      className="group p-5 rounded-2xl border-2 transition-all duration-200 hover:scale-105 bg-gray-800/50"
                      style={{ 
                        borderColor: team.color,
                        boxShadow: `0 0 20px ${team.color}40, inset 0 0 20px ${team.color}10`
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-6 h-6 rounded-full shadow-lg border-2 border-white/20"
                            style={{ backgroundColor: team.color }}
                          ></div>
                          <Input
                            value={team.name}
                            onChange={(e) => updateTeam(team.id, { name: e.target.value })}
                            className="bg-gray-700/80 border border-cyan-500/50 text-white font-bold w-36 placeholder-cyan-400/50 focus:border-cyan-400 focus:ring-cyan-400/30 rounded-xl text-base transition-all duration-200 shadow-inner"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTeam(team.id)}
                          disabled={teams.length <= 2}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-cyan-300 font-medium">Members:</span>
                          <span className="text-cyan-50 font-bold text-lg">{team.members.length}/{team.maxMembers}</span>
                        </div>
                        <div className="flex gap-2">
                          {Array.from({ length: team.maxMembers }).map((_, index) => (
                            <div
                              key={index}
                              className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-base font-bold transition-all duration-200 ${
                                index < team.members.length
                                  ? 'bg-green-500 border-green-400 text-white shadow-lg'
                                  : 'bg-gray-700 border-gray-600 text-gray-400 group-hover:border-cyan-400'
                              }`}
                            >
                              {index < team.members.length ? team.members[index].charAt(0).toUpperCase() : '?'}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {teams.length < maxTeams && (
                  <Button 
                    onClick={addTeam}
                    variant="outline" 
                    className="w-full border-2 border-dashed border-cyan-500/50 text-cyan-400 hover:border-cyan-400 hover:text-cyan-300 bg-gray-800/50 rounded-xl py-5 text-lg transition-all duration-200 hover:scale-105"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Team
                  </Button>
                )}
              </CardContent>
            </Card>
            {/* Questions Section */}
            <Card className="bg-gray-800 border border-cyan-500/30 shadow-xl rounded-xl">
              <CardHeader className="bg-gray-700 border-b border-cyan-500/30 rounded-t-xl">
                <CardTitle className="text-cyan-400 text-2xl font-bold flex items-center gap-3">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  Quiz Questions
                </CardTitle>
                <CardDescription className="text-cyan-300 font-medium">
                  Design challenging questions for your teams
                </CardDescription>
              </CardHeader>
              <CardContent className="p-7">
                <div className="space-y-8">
                  {questions.map((question, index) => (
                    <div key={question.id} className="group p-7 bg-gray-800/50 rounded-2xl border border-cyan-500/30 hover:border-cyan-400 transition-all duration-200 shadow-lg">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                            {index + 1}
                          </div>
                          <h3 className="text-xl font-bold text-white">Question {index + 1}</h3>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeQuestion(question.id)}
                          disabled={questions.length === 1}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-7">
                        <div className="grid md:grid-cols-2 gap-7">
                          <div className="space-y-3">
                            <Label className="text-cyan-300 font-semibold">Question Type</Label>
                            <Select
                              value={question.type}
                              onValueChange={(value: any) => updateQuestion(question.id, { type: value })}
                            >
                              <SelectTrigger className="bg-gray-700/80 border border-cyan-500/50 text-cyan-50 hover:border-cyan-400 focus:border-cyan-400 focus:ring-cyan-400/30 rounded-xl h-12 text-lg">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-cyan-500/50">
                                <SelectItem value="multiple-choice" className="text-cyan-50 hover:bg-cyan-900/50 focus:bg-cyan-900/50">Multiple Choice</SelectItem>
                                <SelectItem value="true-false" className="text-cyan-50 hover:bg-cyan-900/50 focus:bg-cyan-900/50">True/False</SelectItem>
                                <SelectItem value="matching-pairs" className="text-cyan-50 hover:bg-cyan-900/50 focus:bg-cyan-900/50">Matching Pairs</SelectItem>
                                <SelectItem value="ordering" className="text-cyan-50 hover:bg-cyan-900/50 focus:bg-cyan-900/50">Ordering/Sequencing</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-3">
                            <Label className="text-cyan-300 font-semibold">Category</Label>
                            <Select
                              value={question.category}
                              onValueChange={(value) => updateQuestion(question.id, { category: value })}
                            >
                              <SelectTrigger className="bg-gray-700/80 border border-cyan-500/50 text-cyan-50 hover:border-cyan-400 focus:border-cyan-400 focus:ring-cyan-400/30 rounded-xl h-12 text-lg">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-cyan-500/50">
                                <SelectItem value="General" className="text-cyan-50 hover:bg-cyan-900/50 focus:bg-cyan-900/50">General</SelectItem>
                                <SelectItem value="Science" className="text-cyan-50 hover:bg-cyan-900/50 focus:bg-cyan-900/50">Science</SelectItem>
                                <SelectItem value="History" className="text-cyan-50 hover:bg-cyan-900/50 focus:bg-cyan-900/50">History</SelectItem>
                                <SelectItem value="Sports" className="text-cyan-50 hover:bg-cyan-900/50 focus:bg-cyan-900/50">Sports</SelectItem>
                                <SelectItem value="Technology" className="text-cyan-50 hover:bg-cyan-900/50 focus:bg-cyan-900/50">Technology</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label className="text-cyan-300 font-semibold">Question</Label>
                          <Textarea
                            value={question.question}
                            onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                            placeholder="Enter your question here"
                            rows={3}
                            className="bg-gray-700/80 border border-cyan-500/50 text-cyan-50 placeholder-cyan-400/50 focus:border-cyan-400 focus:ring-cyan-400/30 rounded-xl resize-none text-base shadow-inner"
                          />
                        </div>
                        {question.type === "multiple-choice" && (
                          <div className="space-y-4">
                            <Label className="text-cyan-300 font-semibold">Answer Options</Label>
                            <div className="grid gap-3">
                              {question.options?.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center gap-4 p-3 bg-gray-700/50 rounded-xl border border-cyan-500/30 hover:border-cyan-400 transition-all duration-200 shadow-sm">
                                  <input
                                    type="radio"
                                    name={`correct-${question.id}`}
                                    checked={question.correctAnswer === optionIndex}
                                    onChange={() => updateQuestion(question.id, { correctAnswer: optionIndex })}
                                    className="w-5 h-5 text-cyan-500 bg-gray-600 border-cyan-400 focus:ring-cyan-400 focus:ring-offset-0"
                                  />
                                  <Input
                                    value={option}
                                    onChange={(e) => {
                                      const newOptions = [...(question.options || [])]
                                      newOptions[optionIndex] = e.target.value
                                      updateQuestion(question.id, { options: newOptions })
                                    }}
                                    placeholder={`Option ${optionIndex + 1}`}
                                    className="bg-gray-600/80 border-cyan-500/50 text-white placeholder-cyan-400/50 focus:border-cyan-400 focus:ring-cyan-400/30 rounded-xl text-base transition-all duration-200"
                                  />
                                  {question.correctAnswer === optionIndex && (
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {question.type === "true-false" && (
                          <div className="space-y-4">
                            <Label className="text-cyan-300 font-semibold">Correct Answer</Label>
                            <div className="grid gap-3">
                              <div className="flex items-center gap-4 p-3 bg-gray-700/50 rounded-xl border border-cyan-500/30 hover:border-cyan-400 transition-all duration-200 shadow-sm">
                                <input
                                  type="radio"
                                  name={`correct-${question.id}`}
                                  checked={question.correctAnswer === "true"}
                                  onChange={() => updateQuestion(question.id, { correctAnswer: "true" })}
                                  className="w-5 h-5 text-cyan-500 bg-gray-600 border-cyan-400 focus:ring-cyan-400 focus:ring-offset-0"
                                />
                                <span className="text-white font-medium">True</span>
                                {question.correctAnswer === "true" && (
                                  <CheckCircle className="w-5 h-5 text-green-400" />
                                )}
                              </div>
                              <div className="flex items-center gap-4 p-3 bg-gray-700/50 rounded-xl border border-cyan-500/30 hover:border-cyan-400 transition-all duration-200 shadow-sm">
                                <input
                                  type="radio"
                                  name={`correct-${question.id}`}
                                  checked={question.correctAnswer === "false"}
                                  onChange={() => updateQuestion(question.id, { correctAnswer: "false" })}
                                  className="w-5 h-5 text-cyan-500 bg-gray-600 border-cyan-400 focus:ring-cyan-400 focus:ring-offset-0"
                                />
                                <span className="text-white font-medium">False</span>
                                {question.correctAnswer === "false" && (
                                  <CheckCircle className="w-5 h-5 text-green-400" />
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {question.type === "matching-pairs" && (
                          <div className="space-y-4">
                            <Label className="text-cyan-300 font-semibold">Matching Pairs</Label>
                            <div className="space-y-3">
                              {Array.from({ length: Math.max(1, (question.matchingPairs?.length || 0)) }).map((_, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-xl border border-cyan-500/30">
                                  <div className="flex-1">
                                    <Label className="text-cyan-300 text-sm font-medium">Left Item {index + 1}</Label>
                                    <Input
                                      value={question.matchingPairs?.[index]?.left || ""}
                                      onChange={(e) => {
                                        const newPairs = [...(question.matchingPairs || [])]
                                        if (!newPairs[index]) newPairs[index] = { left: "", right: "" }
                                        newPairs[index].left = e.target.value
                                        updateQuestion(question.id, { matchingPairs: newPairs })
                                      }}
                                      placeholder={`Left item ${index + 1}`}
                                      className="bg-gray-600/80 border-cyan-500/50 text-white placeholder-cyan-400/50 focus:border-cyan-400 focus:ring-cyan-400/30 rounded-xl text-base mt-1"
                                    />
                                  </div>
                                  <div className="flex items-center justify-center w-8 h-8">
                                    <div className="w-6 h-0.5 bg-cyan-400"></div>
                                  </div>
                                  <div className="flex-1">
                                    <Label className="text-cyan-300 text-sm font-medium">Right Item {index + 1}</Label>
                                    <Input
                                      value={question.matchingPairs?.[index]?.right || ""}
                                      onChange={(e) => {
                                        const newPairs = [...(question.matchingPairs || [])]
                                        if (!newPairs[index]) newPairs[index] = { left: "", right: "" }
                                        newPairs[index].right = e.target.value
                                        updateQuestion(question.id, { matchingPairs: newPairs })
                                      }}
                                      placeholder={`Right item ${index + 1}`}
                                      className="bg-gray-600/80 border-cyan-500/50 text-white placeholder-cyan-400/50 focus:border-cyan-400 focus:ring-cyan-400/30 rounded-xl text-base mt-1"
                                    />
                                  </div>
                                </div>
                              ))}
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  const newPairs = [...(question.matchingPairs || []), { left: "", right: "" }]
                                  updateQuestion(question.id, { matchingPairs: newPairs })
                                }}
                                className="w-full border-2 border-dashed border-cyan-500/50 text-cyan-400 hover:border-cyan-400 hover:text-cyan-300 bg-gray-700/50 rounded-xl py-2 text-sm transition-all duration-200"
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Pair
                              </Button>
                            </div>
                          </div>
                        )}

                        {question.type === "ordering" && (
                          <div className="space-y-4">
                            <Label className="text-cyan-300 font-semibold">Items to Order</Label>
                            <div className="space-y-3">
                              {Array.from({ length: Math.max(1, (question.orderingItems?.length || 0)) }).map((_, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-xl border border-cyan-500/30">
                                  <div className="flex items-center justify-center w-8 h-8 bg-cyan-500/20 rounded-full text-cyan-400 font-bold text-sm">
                                    {index + 1}
                                  </div>
                                  <div className="flex-1">
                                    <Input
                                      value={question.orderingItems?.[index] || ""}
                                      onChange={(e) => {
                                        const newItems = [...(question.orderingItems || [])]
                                        newItems[index] = e.target.value
                                        updateQuestion(question.id, { orderingItems: newItems })
                                      }}
                                      placeholder={`Item ${index + 1}`}
                                      className="bg-gray-600/80 border-cyan-500/50 text-white placeholder-cyan-400/50 focus:border-cyan-400 focus:ring-cyan-400/30 rounded-xl text-base"
                                    />
                                  </div>
                                </div>
                              ))}
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  const newItems = [...(question.orderingItems || []), ""]
                                  updateQuestion(question.id, { orderingItems: newItems })
                                }}
                                className="w-full border-2 border-dashed border-cyan-500/50 text-cyan-400 hover:border-cyan-400 hover:text-cyan-300 bg-gray-700/50 rounded-xl py-2 text-sm transition-all duration-200"
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Item
                              </Button>
                            </div>
                          </div>
                        )}
                        <div className="grid md:grid-cols-2 gap-7">
                          <div className="space-y-3">
                            <Label className="text-cyan-300 font-semibold flex items-center gap-2">
                              <Clock className="w-5 h-5 text-cyan-400" />
                              Time Limit (seconds)
                            </Label>
                            <Select
                              value={question.timeLimit.toString()}
                              onValueChange={(value) => updateQuestion(question.id, { timeLimit: Number.parseInt(value) })}
                            >
                              <SelectTrigger className="bg-gray-700/80 border border-cyan-500/50 text-cyan-50 hover:border-cyan-400 focus:border-cyan-400 focus:ring-cyan-400/30 rounded-xl h-12 text-lg">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-cyan-500/50">
                                <SelectItem value="15" className="text-cyan-50 hover:bg-cyan-900/50 focus:bg-cyan-900/50">15 seconds</SelectItem>
                                <SelectItem value="30" className="text-cyan-50 hover:bg-cyan-900/50 focus:bg-cyan-900/50">30 seconds</SelectItem>
                                <SelectItem value="45" className="text-cyan-50 hover:bg-cyan-900/50 focus:bg-cyan-900/50">45 seconds</SelectItem>
                                <SelectItem value="60" className="text-cyan-50 hover:bg-cyan-900/50 focus:bg-cyan-900/50">60 seconds</SelectItem>
                                <SelectItem value="90" className="text-cyan-50 hover:bg-cyan-900/50 focus:bg-cyan-900/50">90 seconds</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-3">
                            <Label className="text-cyan-300 font-semibold flex items-center gap-2">
                              <Star className="w-5 h-5 text-yellow-400" />
                              Points
                            </Label>
                            <Input
                              type="number"
                              value={question.points}
                              onChange={(e) =>
                                updateQuestion(question.id, { points: Number.parseInt(e.target.value) || 100 })
                              }
                              min="50"
                              max="1000"
                              step="50"
                              className="bg-gray-700/80 border-cyan-500/50 text-cyan-50 focus:border-cyan-400 focus:ring-cyan-400/30 rounded-xl h-12 text-lg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button 
                    onClick={addQuestion} 
                    variant="outline" 
                    className="w-full border-2 border-dashed border-cyan-500/50 text-cyan-400 hover:border-cyan-400 hover:text-cyan-300 bg-gray-800/50 rounded-xl py-7 text-lg transition-all duration-200 hover:scale-105"
                    size="lg"
                  >
                    <Plus className="w-6 h-6 mr-2" />
                    Add Question
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