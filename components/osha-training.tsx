"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, CheckCircle, XCircle, Award, HardHat } from "lucide-react"

interface Question {
  id: number
  scenario: string
  question: string
  options: string[]
  correct: number
  explanation: string
  category: string
}

const oshaQuestions: Question[] = [
  {
    id: 1,
    scenario: "You're working on a construction site and notice a ladder that appears damaged.",
    question: "What should you do first?",
    options: [
      "Use the ladder carefully",
      "Report it to your supervisor immediately",
      "Try to fix it yourself",
      "Find another ladder to use",
    ],
    correct: 1,
    explanation: "Always report damaged equipment immediately. Using damaged equipment puts you and others at risk.",
    category: "Construction Safety",
  },
  {
    id: 2,
    scenario: "You need to enter a confined space for maintenance work.",
    question: "What is the most critical first step?",
    options: [
      "Enter quickly to minimize exposure",
      "Test the atmosphere and ensure proper ventilation",
      "Bring a flashlight",
      "Work alone to avoid crowding",
    ],
    correct: 1,
    explanation:
      "Confined spaces can contain hazardous atmospheres. Always test air quality and ensure proper ventilation before entry.",
    category: "Confined Space",
  },
  {
    id: 3,
    scenario: "A machine guard has been removed for cleaning and hasn't been replaced.",
    question: "What action should you take?",
    options: [
      "Operate the machine carefully without the guard",
      "Replace the guard before operating the machine",
      "Only use the machine for quick tasks",
      "Ask someone else to operate it",
    ],
    correct: 1,
    explanation:
      "Machine guards must always be in place before operation. They protect workers from moving parts and potential injuries.",
    category: "Machinery Safety",
  },
  {
    id: 4,
    scenario: "You spill a chemical and don't know what it is or how to clean it up.",
    question: "What should you do immediately?",
    options: [
      "Clean it up with paper towels",
      "Leave it for the cleaning crew",
      "Evacuate the area and consult the Safety Data Sheet (SDS)",
      "Dilute it with water",
    ],
    correct: 2,
    explanation:
      "Unknown chemical spills require immediate evacuation and consultation of the SDS for proper cleanup procedures.",
    category: "Chemical Safety",
  },
  {
    id: 5,
    scenario: "You're working at height and your safety harness feels loose.",
    question: "What is the correct response?",
    options: [
      "Tighten it yourself and continue working",
      "Work more carefully to compensate",
      "Stop work immediately and have it inspected",
      "Switch positions with a coworker",
    ],
    correct: 2,
    explanation:
      "Fall protection equipment must be properly fitted and inspected. Never compromise on fall protection safety.",
    category: "Fall Protection",
  },
  {
    id: 6,
    scenario: "You notice an electrical cord with exposed wiring in your work area.",
    question: "What should you do?",
    options: [
      "Wrap it with electrical tape",
      "Unplug it and tag it as defective",
      "Use it only when necessary",
      "Report it at the end of your shift",
    ],
    correct: 1,
    explanation:
      "Damaged electrical equipment should be immediately removed from service and properly tagged to prevent use.",
    category: "Electrical Safety",
  },
  {
    id: 7,
    scenario: "The fire alarm sounds during your shift.",
    question: "What is your first priority?",
    options: [
      "Finish your current task quickly",
      "Gather your personal belongings",
      "Immediately evacuate via the nearest exit",
      "Look for the source of the alarm",
    ],
    correct: 2,
    explanation:
      "When fire alarms sound, immediate evacuation is the top priority. Never delay evacuation for any reason.",
    category: "Fire Safety",
  },
  {
    id: 8,
    scenario: "You've been lifting heavy boxes all day and your back is starting to hurt.",
    question: "What should you do?",
    options: [
      "Take pain medication and continue",
      "Use proper lifting techniques and take breaks",
      "Ask someone smaller to help you",
      "Ignore the pain until your shift ends",
    ],
    correct: 1,
    explanation:
      "Proper lifting techniques and regular breaks prevent musculoskeletal injuries. Never ignore pain signals from your body.",
    category: "Ergonomics",
  },
]

export default function OSHATraining() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameState, setGameState] = useState<"playing" | "answered" | "finished">("playing")
  const [answers, setAnswers] = useState<number[]>([])
  const [showExplanation, setShowExplanation] = useState(false)

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameState === "playing") {
      handleTimeUp()
    }
  }, [timeLeft, gameState])

  const handleTimeUp = () => {
    setSelectedAnswer(-1) // -1 indicates time ran out
    setGameState("answered")
    setShowExplanation(true)
    setAnswers([...answers, -1])
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (gameState !== "playing") return

    setSelectedAnswer(answerIndex)
    setGameState("answered")
    setShowExplanation(true)

    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)

    if (answerIndex === oshaQuestions[currentQuestion].correct) {
      const timeBonus = Math.floor(timeLeft / 5) // 1 point per 5 seconds remaining
      setScore(score + 10 + timeBonus)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < oshaQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setTimeLeft(30)
      setGameState("playing")
      setShowExplanation(false)
    } else {
      setGameState("finished")
    }
  }

  const resetGame = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setTimeLeft(30)
    setGameState("playing")
    setAnswers([])
    setShowExplanation(false)
  }

  const getGrade = () => {
    const percentage = (score / (oshaQuestions.length * 12)) * 100 // Max 12 points per question
    if (percentage >= 90) return { grade: "A", status: "Excellent", color: "text-green-600" }
    if (percentage >= 80) return { grade: "B", status: "Good", color: "text-blue-600" }
    if (percentage >= 70) return { grade: "C", status: "Satisfactory", color: "text-yellow-600" }
    if (percentage >= 60) return { grade: "D", status: "Needs Improvement", color: "text-orange-600" }
    return { grade: "F", status: "Failed", color: "text-red-600" }
  }

  const isPassing = () => {
    const percentage = (score / (oshaQuestions.length * 12)) * 100
    return percentage >= 70
  }

  if (gameState === "finished") {
    const gradeInfo = getGrade()
    const percentage = Math.round((score / (oshaQuestions.length * 12)) * 100)

    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className="border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {isPassing() ? (
                <Award className="h-16 w-16 text-yellow-500" />
              ) : (
                <AlertTriangle className="h-16 w-16 text-red-500" />
              )}
            </div>
            <CardTitle className="text-3xl font-bold">
              OSHA Safety Training {isPassing() ? "Certificate" : "Results"}
            </CardTitle>
            <CardDescription className="text-lg">WyoVerse Workplace Safety Assessment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold">
                <span className={gradeInfo.color}>{gradeInfo.grade}</span>
              </div>
              <div className="text-2xl font-semibold">
                {score} / {oshaQuestions.length * 12} points ({percentage}%)
              </div>
              <Badge variant={isPassing() ? "default" : "destructive"} className="text-lg px-4 py-2">
                {gradeInfo.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Correct Answers:</span>
                      <span className="font-semibold">
                        {answers.filter((answer, index) => answer === oshaQuestions[index].correct).length} /{" "}
                        {oshaQuestions.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Bonuses:</span>
                      <span className="font-semibold">
                        {score - answers.filter((answer, index) => answer === oshaQuestions[index].correct).length * 10}{" "}
                        pts
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Final Grade:</span>
                      <span className={`font-bold ${gradeInfo.color}`}>
                        {gradeInfo.grade} ({percentage}%)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Safety Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    {Array.from(new Set(oshaQuestions.map((q) => q.category))).map((category) => {
                      const categoryQuestions = oshaQuestions.filter((q) => q.category === category)
                      const categoryCorrect = categoryQuestions.filter((q, index) => {
                        const originalIndex = oshaQuestions.findIndex((oq) => oq.id === q.id)
                        return answers[originalIndex] === q.correct
                      }).length

                      return (
                        <div key={category} className="flex justify-between">
                          <span>{category}:</span>
                          <span className="font-semibold">
                            {categoryCorrect}/{categoryQuestions.length}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {isPassing() && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  🎉 Congratulations! You've passed the OSHA Safety Training!
                </h3>
                <p className="text-green-700">
                  You've demonstrated a solid understanding of workplace safety principles. This certificate shows your
                  commitment to maintaining a safe work environment.
                </p>
              </div>
            )}

            <div className="flex justify-center space-x-4">
              <Button onClick={resetGame} variant="outline" size="lg">
                <HardHat className="mr-2 h-4 w-4" />
                Retake Training
              </Button>
              {isPassing() && (
                <Button onClick={() => window.print()} size="lg" className="bg-yellow-600 hover:bg-yellow-700">
                  <Award className="mr-2 h-4 w-4" />
                  Print Certificate
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = oshaQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / oshaQuestions.length) * 100

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="border-2 border-orange-400 bg-gradient-to-br from-orange-50 to-red-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <HardHat className="h-8 w-8 text-orange-600" />
              <div>
                <CardTitle className="text-2xl font-bold text-orange-800">OSHA Safety Training</CardTitle>
                <CardDescription className="text-orange-600">
                  Question {currentQuestion + 1} of {oshaQuestions.length}
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-lg font-semibold">
                <Clock className="h-5 w-5" />
                <span className={timeLeft <= 10 ? "text-red-600" : "text-gray-700"}>{timeLeft}s</span>
              </div>
              <div className="text-sm text-gray-600">Score: {score}</div>
            </div>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <h3 className="font-semibold text-yellow-800 mb-2">Scenario:</h3>
            <p className="text-yellow-700">{question.scenario}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">{question.question}</h3>

            <div className="grid gap-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    selectedAnswer === index
                      ? selectedAnswer === question.correct
                        ? "default"
                        : "destructive"
                      : "outline"
                  }
                  className={`p-4 h-auto text-left justify-start ${
                    gameState === "answered" && index === question.correct
                      ? "bg-green-100 border-green-500 text-green-800"
                      : ""
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={gameState !== "playing"}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1">{option}</span>
                    {gameState === "answered" && (
                      <>
                        {index === question.correct && <CheckCircle className="h-5 w-5 text-green-600" />}
                        {selectedAnswer === index && index !== question.correct && (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {showExplanation && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Explanation:
              </h4>
              <p className="text-blue-700">{question.explanation}</p>
              <div className="mt-3">
                <Badge variant="secondary" className="text-xs">
                  {question.category}
                </Badge>
              </div>
            </div>
          )}

          {gameState === "answered" && (
            <div className="flex justify-center">
              <Button onClick={handleNextQuestion} size="lg">
                {currentQuestion < oshaQuestions.length - 1 ? "Next Question" : "View Results"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
