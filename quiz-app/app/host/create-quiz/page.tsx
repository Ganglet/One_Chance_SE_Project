"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2, ArrowLeftIcon, Users } from "lucide-react"
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
  media?: {
    type: "image" | "video"
    url: string
  }
  // New fields for different question types
  matchingPairs?: Array<{ left: string; right: string }>
  orderingItems?: string[]
}

export default function CreateQuiz() {
  const router = useRouter()
  const [quizTitle, setQuizTitle] = useState("")
  const [quizDescription, setQuizDescription] = useState("")
  const [negativeMarking, setNegativeMarking] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      timeLimit: 30,
      points: 100,
      category: "General",
      matchingPairs: [],
      orderingItems: [],
    },
  ])

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

  const handleQuestionTypeChange = (id: string, newType: string) => {
    const question = questions.find(q => q.id === id)
    if (!question) return

    let updates: Partial<Question> = { type: newType as any }
    
    // Initialize appropriate data structure based on question type
    if (newType === "matching-pairs") {
      updates.matchingPairs = [{ left: "", right: "" }]
      updates.options = undefined
      updates.orderingItems = undefined
    } else if (newType === "ordering") {
      updates.orderingItems = [""]
      updates.options = undefined
      updates.matchingPairs = undefined
    } else if (newType === "multiple-choice") {
      updates.options = ["", "", "", ""]
      updates.correctAnswer = 0
      updates.matchingPairs = undefined
      updates.orderingItems = undefined
    } else if (newType === "true-false") {
      updates.correctAnswer = "true"
      updates.options = undefined
      updates.matchingPairs = undefined
      updates.orderingItems = undefined
    }

    updateQuestion(id, updates)
  }

  const handleSaveQuiz = async () => {
    // Get userId from localStorage (set after login)
    const userId = Number(localStorage.getItem("userId"));
    if (!userId) {
      alert("User not logged in. Please log in again.");
      return;
    }
    try {
      const formattedQuestions = questions.map((q) => {
        let formattedCorrectAnswer: string | boolean;
        if (q.type === "multiple-choice") {
          // Use the string value of the selected option
          formattedCorrectAnswer = (q.options && typeof q.correctAnswer === "number") ? q.options[q.correctAnswer] : "";
        } else if (q.type === "true-false") {
          // Convert string 'true'/'false' to boolean
          formattedCorrectAnswer = q.correctAnswer === "true";
        } else if (q.type === "matching-pairs") {
          // For matching pairs, store the pairs as JSON string
          formattedCorrectAnswer = JSON.stringify(q.matchingPairs || []);
        } else if (q.type === "ordering") {
          // For ordering, store the items as JSON string
          formattedCorrectAnswer = JSON.stringify(q.orderingItems || []);
        } else {
          formattedCorrectAnswer = String(q.correctAnswer ?? "");
        }
        return {
          ...q,
          type:
            q.type === "multiple-choice"
              ? "multiple_choice"
              : q.type === "true-false"
              ? "true_false"
              : q.type === "matching-pairs"
              ? "matching_pairs"
              : q.type === "ordering"
              ? "ordering"
              : "ordering",
          correctAnswer: formattedCorrectAnswer,
        };
      });
      const res = await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: quizTitle,
          description: quizDescription,
          negativeMarking, // camelCase
          teamMode: false, // Always false for regular quiz
          questions: formattedQuestions,
          userId,
        }),
      });
      if (!res.ok) throw new Error('Failed to create quiz');
      router.push('/host/dashboard');
    } catch (err) {
      alert('Error creating quiz.');
    }
  };

  const handleTeamModeClick = () => {
    // Store current quiz data in localStorage for team quiz creation
    const quizData = {
      title: quizTitle,
      description: quizDescription,
      negativeMarking,
      questions: questions
    };
    localStorage.setItem('teamQuizData', JSON.stringify(quizData));
    router.push('/host/create-team-quiz');
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-glow">Create New Quiz</h1>
            <p className="mt-2 text-balance">
              Design your quiz with multiple question types and advanced settings
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quiz Settings */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Quiz Settings</CardTitle>
                <CardDescription>Configure your quiz parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Quiz Title</Label>
                  <Input
                    id="title"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    placeholder="Enter quiz title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={quizDescription}
                    onChange={(e) => setQuizDescription(e.target.value)}
                    placeholder="Brief description of your quiz"
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="negative-marking">Negative Marking</Label>
                  <Switch id="negative-marking" checked={negativeMarking} onCheckedChange={setNegativeMarking} />
                </div>

                {/* Team Mode Button */}
                <div className="space-y-2">
                  <Label>Game Mode</Label>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleSaveQuiz} 
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
                      size="lg"
                    >
                      Individual Mode
                    </Button>
                    <Button 
                      onClick={handleTeamModeClick}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg group relative overflow-hidden"
                      size="lg"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      <Users className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                      <span className="relative z-10 font-bold tracking-wide">Team Mode</span>
                      <div className="absolute inset-0 border-2 border-cyan-400 opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-md"></div>
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p>Total Questions: {questions.length}</p>
                    <p>
                      Estimated Duration: {Math.ceil(questions.reduce((sum, q) => sum + q.timeLimit, 0) / 60)} minutes
                    </p>
                    <p>Total Points: {questions.reduce((sum, q) => sum + q.points, 0)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Questions */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {questions.map((question, index) => (
                <Card key={question.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeQuestion(question.id)}
                          disabled={questions.length === 1}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Question Type</Label>
                        <Select
                          value={question.type}
                          onValueChange={(value: any) => handleQuestionTypeChange(question.id, value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                            <SelectItem value="true-false">True/False</SelectItem>
                            <SelectItem value="matching-pairs">Matching Pairs</SelectItem>
                            <SelectItem value="ordering">Ordering/Sequencing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select
                          value={question.category}
                          onValueChange={(value) => updateQuestion(question.id, { category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="General">General</SelectItem>
                            <SelectItem value="Science">Science</SelectItem>
                            <SelectItem value="History">History</SelectItem>
                            <SelectItem value="Sports">Sports</SelectItem>
                            <SelectItem value="Technology">Technology</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Question</Label>
                      <Textarea
                        value={question.question}
                        onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                        placeholder="Enter your question here"
                        rows={2}
                      />
                    </div>

                    {question.type === "multiple-choice" && (
                      <div className="space-y-3">
                        <Label>Answer Options</Label>
                        {question.options?.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center gap-3">
                            <input
                              type="radio"
                              name={`correct-${question.id}`}
                              checked={question.correctAnswer === optionIndex}
                              onChange={() => updateQuestion(question.id, { correctAnswer: optionIndex })}
                              className="w-4 h-4"
                            />
                            <Input
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...(question.options || [])]
                                newOptions[optionIndex] = e.target.value
                                updateQuestion(question.id, { options: newOptions })
                              }}
                              placeholder={`Option ${optionIndex + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {question.type === "true-false" && (
                      <div className="space-y-3">
                        <Label>Correct Answer</Label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`tf-${question.id}`}
                              checked={question.correctAnswer === "true"}
                              onChange={() => updateQuestion(question.id, { correctAnswer: "true" })}
                            />
                            True
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`tf-${question.id}`}
                              checked={question.correctAnswer === "false"}
                              onChange={() => updateQuestion(question.id, { correctAnswer: "false" })}
                            />
                            False
                          </label>
                        </div>
                      </div>
                    )}

                    {question.type === "matching-pairs" && (
                      <div className="space-y-3">
                        <Label>Matching Pairs</Label>
                        <div className="space-y-2">
                          {(question.matchingPairs || []).map((pair, index) => (
                            <div key={index} className="flex gap-2 items-center">
                              <Input
                                value={pair.left}
                                onChange={(e) => {
                                  const newPairs = [...(question.matchingPairs || [])]
                                  newPairs[index] = { ...pair, left: e.target.value }
                                  updateQuestion(question.id, { matchingPairs: newPairs })
                                }}
                                placeholder="Left item"
                                className="flex-1"
                              />
                              <span className="text-gray-500">→</span>
                              <Input
                                value={pair.right}
                                onChange={(e) => {
                                  const newPairs = [...(question.matchingPairs || [])]
                                  newPairs[index] = { ...pair, right: e.target.value }
                                  updateQuestion(question.id, { matchingPairs: newPairs })
                                }}
                                placeholder="Right item"
                                className="flex-1"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  const newPairs = (question.matchingPairs || []).filter((_, i) => i !== index)
                                  updateQuestion(question.id, { matchingPairs: newPairs })
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newPairs = [...(question.matchingPairs || []), { left: "", right: "" }]
                              updateQuestion(question.id, { matchingPairs: newPairs })
                            }}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Pair
                          </Button>
                        </div>
                      </div>
                    )}

                    {question.type === "ordering" && (
                      <div className="space-y-3">
                        <Label>Ordering Items</Label>
                        <div className="space-y-2">
                          {(question.orderingItems || []).map((item, index) => (
                            <div key={index} className="flex gap-2 items-center">
                              <span className="text-sm font-medium text-gray-500 w-6">{index + 1}.</span>
                              <Input
                                value={item}
                                onChange={(e) => {
                                  const newItems = [...(question.orderingItems || [])]
                                  newItems[index] = e.target.value
                                  updateQuestion(question.id, { orderingItems: newItems })
                                }}
                                placeholder={`Item ${index + 1}`}
                                className="flex-1"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  const newItems = (question.orderingItems || []).filter((_, i) => i !== index)
                                  updateQuestion(question.id, { orderingItems: newItems })
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newItems = [...(question.orderingItems || []), ""]
                              updateQuestion(question.id, { orderingItems: newItems })
                            }}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Item
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Time Limit (seconds)</Label>
                        <Select
                          value={question.timeLimit.toString()}
                          onValueChange={(value) => updateQuestion(question.id, { timeLimit: Number.parseInt(value) })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 seconds</SelectItem>
                            <SelectItem value="30">30 seconds</SelectItem>
                            <SelectItem value="45">45 seconds</SelectItem>
                            <SelectItem value="60">60 seconds</SelectItem>
                            <SelectItem value="90">90 seconds</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Points</Label>
                        <Input
                          type="number"
                          value={question.points}
                          onChange={(e) =>
                            updateQuestion(question.id, { points: Number.parseInt(e.target.value) || 100 })
                          }
                          min="50"
                          max="1000"
                          step="50"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button onClick={addQuestion} variant="outline" className="w-full bg-transparent" size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Add Question
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
