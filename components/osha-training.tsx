"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
      "Find another route",
    ],
    correct: 1,
    explanation: "Always report damaged equipment immediately. Using damaged equipment puts you and others at risk.",
    category: "Construction Safety",
  },
  {
    id: 2,
    scenario: "You're working in a confined space and start feeling dizzy.",
    question: "What is the most important action to take?",
    options: ["Take a short break", "Exit the space immediately", "Drink some water", "Continue working slowly"],
    correct: 1,
    explanation: "Dizziness in confined spaces can indicate dangerous gas levels. Exit immediately and alert others.",
    category: "Confined Space",
  },
  {
    id: 3,
    scenario: "A coworker is not wearing required safety equipment while operating machinery.",
    question: "What should you do?",
    options: [
      "Ignore it - it's their choice",
      "Tell them to stop and put on safety equipment",
      "Report it later",
      "Work somewhere else",
    ],
    correct: 1,
    explanation: "Safety is everyone's responsibility. Stop unsafe work immediately to prevent accidents.",
    category: "Machinery Safety",
  },
  {
    id: 4,
    scenario: "You discover a chemical spill in your work area.",
    question: "What is your first priority?",
    options: [
      "Clean it up quickly",
      "Evacuate the area and alert others",
      "Take photos for documentation",
      "Find the source of the spill",
    ],
    correct: 1,
    explanation: "Chemical spills can be hazardous. Evacuate first, then follow proper spill response procedures.",
    category: "Chemical Safety",
  },
  {
    id: 5,
    scenario: "You need to work at height but the safety harness feels uncomfortable.",
    question: "What should you do?",
    options: [
      "Work without it for speed",
      "Adjust it properly or get a different size",
      "Loosen it for comfort",
      "Work quickly to minimize risk",
    ],
    correct: 1,
    explanation: "Proper fit is essential for fall protection. Never compromise on safety equipment fit.",
    category: "Fall Protection",
  },
  {
    id: 6,
    scenario: "You notice exposed electrical wires near your work area.",
    question: "What is the safest course of action?",
    options: [
      "Avoid the area and continue working",
      "Turn off power and report immediately",
      "Cover the wires with tape",
      "Work around them carefully",
    ],
    correct: 1,
    explanation: "Exposed electrical wires are an immediate hazard. De-energize if possible and report immediately.",
    category: "Electrical Safety",
  },
  {
    id: 7,
    scenario: "The fire alarm sounds during your shift.",
    question: "What should you do first?",
    options: [
      "Finish your current task",
      "Stop work and evacuate immediately",
      "Look for the source of alarm",
      "Wait for instructions",
    ],
    correct: 1,
    explanation: "Fire alarms require immediate evacuation. Never delay or ignore fire safety signals.",
    category: "Fire Safety",
  },
  {
    id: 8,
    scenario: "You're experiencing back pain from repetitive lifting.",
    question: "What is the best approach?",
    options: [
      "Take pain medication and continue",
      "Report it and request ergonomic assessment",
      "Switch to lighter tasks temporarily",
      "Ignore it - it will go away",
    ],
    correct: 1,
    explanation:
      "Repetitive strain injuries should be reported early. Ergonomic assessments can prevent serious injury.",
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
      const timeBonus = Math.floor(timeLeft / 5) // Bonus points for quick answers
      setScore(score + 10 + timeBonus)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < oshaQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setGameState("playing")
      setShowExplanation(false)
      setTimeLeft(30)
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

  const currentQ = oshaQuestions[currentQuestion]

  if (gameState === "finished") {
    const gradeInfo = getGrade()
    const percentage = Math.round((score / (oshaQuestions.length * 12)) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-orange-200">
            <CardHeader className="text-center bg-gradient-to-r from-orange-100 to-red-100">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Award className="h-8 w-8 text-orange-600" />
                <CardTitle className="text-2xl font-bold text-orange-800">OSHA Safety Training Complete</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className={`text-6xl font-bold mb-4 ${gradeInfo.color}`}>{gradeInfo.grade}</div>
                <div className="text-2xl font-semibold mb-2">{gradeInfo.status}</div>
                <div className="text-lg text-gray-600">
                  Score: {score} / {oshaQuestions.length * 12} ({percentage}%)
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Performance Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Questions Answered:</span>
                        <span>{oshaQuestions.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Correct Answers:</span>
                        <span>{answers.filter((a, i) => a === oshaQuestions[i].correct).length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time Bonuses:</span>
                        <span>{score - answers.filter((a, i) => a === oshaQuestions[i].correct).length * 10}</span>
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
                      {Array.from(new Set(oshaQuestions.map((q) => q.category))).map((category) => (
                        <Badge key={category} variant="outline" className="mr-2 mb-2">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {percentage >= 70 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-800">Certification Earned!</span>
                  </div>
                  <p className="text-green-700">
                    Congratulations! You have successfully completed the OSHA Safety Training and earned your safety
                    certification.
                  </p>
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <Button onClick={resetGame} className="bg-orange-600 hover:bg-orange-700">
                  <HardHat className="h-4 w-4 mr-2" />
                  Retake Training
                </Button>
                {percentage >= 70 && (
                  <Button variant="outline" onClick={() => window.print()}>
                    Print Certificate
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="border-2 border-orange-200">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-red-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardHat className="h-6 w-6 text-orange-600" />
                <CardTitle className="text-xl font-bold text-orange-800">OSHA Safety Training</CardTitle>
              </div>
              <Badge variant="outline" className="text-orange-700 border-orange-300">
                Question {currentQuestion + 1} of {oshaQuestions.length}
              </Badge>
            </div>
            <div className="mt-4">
              <Progress value={(currentQuestion / oshaQuestions.length) * 100} className="h-2" />
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <Badge variant="secondary" className="text-sm">
                {currentQ.category}
              </Badge>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <span className={`font-bold ${timeLeft <= 10 ? "text-red-600" : "text-orange-600"}`}>{timeLeft}s</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Scenario:</p>
                    <p className="text-sm text-yellow-700">{currentQ.scenario}</p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4">{currentQ.question}</h3>
            </div>

            <div className="space-y-3 mb-6">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={gameState !== "playing"}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? index === currentQ.correct
                        ? "border-green-500 bg-green-50 text-green-800"
                        : "border-red-500 bg-red-50 text-red-800"
                      : gameState === "answered" && index === currentQ.correct
                        ? "border-green-500 bg-green-50 text-green-800"
                        : "border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                  } ${gameState !== "playing" ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center">
                    <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center mr-3 text-sm font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                    {gameState === "answered" && (
                      <span className="ml-auto">
                        {index === currentQ.correct ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : selectedAnswer === index ? (
                          <XCircle className="h-5 w-5 text-red-600" />
                        ) : null}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showExplanation && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
                <p className="text-blue-700">{currentQ.explanation}</p>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Score: <span className="font-bold text-orange-600">{score}</span>
              </div>

              {gameState === "answered" && (
                <Button onClick={handleNextQuestion} className="bg-orange-600 hover:bg-orange-700">
                  {currentQuestion < oshaQuestions.length - 1 ? "Next Question" : "Finish Training"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
