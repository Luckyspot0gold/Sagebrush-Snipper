"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Clock, Award, AlertTriangle, HardHat, Shield, Zap } from "lucide-react"

interface Question {
  id: number
  scenario: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
  points: number
}

interface GameState {
  currentQuestion: number
  score: number
  timeRemaining: number
  answers: number[]
  gameStarted: boolean
  gameCompleted: boolean
  showExplanation: boolean
}

const OSHA_QUESTIONS: Question[] = [
  {
    id: 1,
    scenario: "You're working on a construction site and notice a ladder that appears damaged with a cracked rung.",
    question: "What should you do immediately?",
    options: [
      "Use the ladder carefully, avoiding the cracked rung",
      "Report the damage and tag the ladder as unsafe",
      "Try to repair the ladder yourself",
      "Ignore it since other workers are using it",
    ],
    correctAnswer: 1,
    explanation:
      "Always report damaged equipment immediately and tag it as unsafe. Using damaged equipment puts you and others at serious risk of injury.",
    category: "Construction Safety",
    points: 10,
  },
  {
    id: 2,
    scenario: "While working in a mining operation, you hear the emergency evacuation alarm.",
    question: "What is your first priority?",
    options: [
      "Finish your current task quickly",
      "Gather your personal belongings",
      "Immediately stop work and evacuate via the nearest exit",
      "Wait for your supervisor's instructions",
    ],
    correctAnswer: 2,
    explanation:
      "During an emergency evacuation, immediately stop all work and evacuate using the nearest safe exit. Time is critical in emergency situations.",
    category: "Mining Safety",
    points: 15,
  },
  {
    id: 3,
    scenario: "You're operating machinery and notice your safety guard is loose and vibrating.",
    question: "What should you do?",
    options: [
      "Continue working but be extra careful",
      "Tighten the guard while the machine is running",
      "Stop the machine immediately and report the issue",
      "Work at a slower speed to reduce vibration",
    ],
    correctAnswer: 2,
    explanation:
      "Always stop machinery immediately when safety equipment is compromised. Never attempt repairs while equipment is running.",
    category: "Machine Safety",
    points: 12,
  },
  {
    id: 4,
    scenario: "A coworker has been exposed to a chemical spill and is showing signs of skin irritation.",
    question: "What is the most important first step?",
    options: [
      "Apply ointment to the affected area",
      "Move them to fresh air and flush with water",
      "Give them pain medication",
      "Wait to see if symptoms worsen",
    ],
    correctAnswer: 1,
    explanation:
      "For chemical exposure, immediately move the person away from the source and flush the affected area with clean water for at least 15 minutes.",
    category: "Chemical Safety",
    points: 15,
  },
  {
    id: 5,
    scenario: "You're working at height and your safety harness feels loose around your waist.",
    question: "What should you do?",
    options: [
      "Tighten it while continuing to work",
      "Descend safely and adjust the harness properly",
      "Ask a coworker to tighten it for you",
      "Work more carefully to compensate",
    ],
    correctAnswer: 1,
    explanation:
      "Never work at height with improperly fitted safety equipment. Descend safely and ensure all PPE is properly adjusted before continuing.",
    category: "Fall Protection",
    points: 15,
  },
  {
    id: 6,
    scenario: "You discover an electrical panel with the cover removed and wires exposed in your work area.",
    question: "What is your immediate action?",
    options: [
      "Quickly replace the cover yourself",
      "Warn others and contact a qualified electrician",
      "Continue working but avoid the area",
      "Turn off the main power switch",
    ],
    correctAnswer: 1,
    explanation:
      "Exposed electrical components are extremely dangerous. Warn others, secure the area, and contact qualified electrical personnel immediately.",
    category: "Electrical Safety",
    points: 15,
  },
  {
    id: 7,
    scenario:
      "During a routine inspection, you find that the fire extinguisher in your area is missing its safety pin.",
    question: "What should you do?",
    options: [
      "Use a paperclip as a temporary pin",
      "Report it and request immediate replacement",
      "Move an extinguisher from another area",
      "Continue working since it's just one extinguisher",
    ],
    correctAnswer: 1,
    explanation:
      "Fire safety equipment must be properly maintained and immediately replaced when defective. Report the issue and request immediate replacement.",
    category: "Fire Safety",
    points: 10,
  },
  {
    id: 8,
    scenario: "You witness a coworker lifting a heavy box using improper technique, bending at the waist.",
    question: "What should you do?",
    options: [
      "Mind your own business",
      "Help them lift it using the same technique",
      "Stop them and demonstrate proper lifting technique",
      "Report them to management",
    ],
    correctAnswer: 2,
    explanation:
      "Preventing injury is everyone's responsibility. Politely intervene and demonstrate proper lifting technique: bend your knees, keep your back straight, and lift with your legs.",
    category: "Ergonomics",
    points: 10,
  },
]

export function OSHATraining() {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    score: 0,
    timeRemaining: 30,
    answers: [],
    gameStarted: false,
    gameCompleted: false,
    showExplanation: false,
  })

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (
      gameState.gameStarted &&
      !gameState.gameCompleted &&
      !gameState.showExplanation &&
      gameState.timeRemaining > 0
    ) {
      timer = setInterval(() => {
        setGameState((prev) => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }))
      }, 1000)
    } else if (gameState.timeRemaining === 0 && !gameState.showExplanation) {
      // Time's up, auto-submit with no answer
      handleAnswerSubmit()
    }

    return () => clearInterval(timer)
  }, [gameState.gameStarted, gameState.gameCompleted, gameState.showExplanation, gameState.timeRemaining])

  const startGame = () => {
    setGameState({
      currentQuestion: 0,
      score: 0,
      timeRemaining: 30,
      answers: [],
      gameStarted: true,
      gameCompleted: false,
      showExplanation: false,
    })
    setSelectedAnswer(null)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (!gameState.showExplanation) {
      setSelectedAnswer(answerIndex)
    }
  }

  const handleAnswerSubmit = () => {
    const currentQ = OSHA_QUESTIONS[gameState.currentQuestion]
    const isCorrect = selectedAnswer === currentQ.correctAnswer
    const timeBonus = gameState.timeRemaining * 2 // 2 points per second remaining
    const questionScore = isCorrect ? currentQ.points + timeBonus : 0

    const newAnswers = [...gameState.answers, selectedAnswer ?? -1]
    const newScore = gameState.score + questionScore

    setGameState((prev) => ({
      ...prev,
      answers: newAnswers,
      score: newScore,
      showExplanation: true,
    }))
  }

  const nextQuestion = () => {
    if (gameState.currentQuestion < OSHA_QUESTIONS.length - 1) {
      setGameState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        timeRemaining: 30,
        showExplanation: false,
      }))
      setSelectedAnswer(null)
    } else {
      setGameState((prev) => ({
        ...prev,
        gameCompleted: true,
        showExplanation: false,
      }))
    }
  }

  const resetGame = () => {
    setGameState({
      currentQuestion: 0,
      score: 0,
      timeRemaining: 30,
      answers: [],
      gameStarted: false,
      gameCompleted: false,
      showExplanation: false,
    })
    setSelectedAnswer(null)
  }

  const getGrade = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 90) return { grade: "A", color: "bg-green-500", status: "Excellent" }
    if (percentage >= 80) return { grade: "B", color: "bg-blue-500", status: "Good" }
    if (percentage >= 70) return { grade: "C", color: "bg-yellow-500", status: "Satisfactory" }
    if (percentage >= 60) return { grade: "D", color: "bg-orange-500", status: "Needs Improvement" }
    return { grade: "F", color: "bg-red-500", status: "Failed" }
  }

  const maxPossibleScore = OSHA_QUESTIONS.reduce((sum, q) => sum + q.points + 60, 0) // 60 = max time bonus per question
  const currentQ = OSHA_QUESTIONS[gameState.currentQuestion]
  const progress = ((gameState.currentQuestion + (gameState.showExplanation ? 1 : 0)) / OSHA_QUESTIONS.length) * 100

  if (!gameState.gameStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className="border-4 border-orange-500">
          <CardHeader className="text-center bg-orange-50">
            <div className="flex justify-center mb-4">
              <HardHat className="h-16 w-16 text-orange-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-orange-800">WyoVerse OSHA Safety Training</CardTitle>
            <CardDescription className="text-lg">Interactive Workplace Safety Certification Program</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  What You'll Learn
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Construction Site Safety
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Mining Operation Protocols
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Machine Safety Guidelines
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Chemical Handling Procedures
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Fall Protection Systems
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Electrical Safety Standards
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  Game Features
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />8 Real-world Safety Scenarios
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    Timed Questions (30 seconds each)
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-purple-500" />
                    Points + Time Bonus System
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Detailed Explanations
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge className="h-4 w-4 text-orange-500" />
                    Safety Certification
                  </li>
                </ul>
              </div>
            </div>

            <Alert className="mt-6 border-yellow-500 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Important:</strong> This training covers critical workplace safety scenarios. Take your time to
                read each question carefully. Your safety and the safety of others depends on this knowledge.
              </AlertDescription>
            </Alert>

            <div className="text-center mt-8">
              <Button
                onClick={startGame}
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg"
              >
                <HardHat className="mr-2 h-5 w-5" />
                Start Safety Training
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameState.gameCompleted) {
    const gradeInfo = getGrade(gameState.score, maxPossibleScore)
    const percentage = Math.round((gameState.score / maxPossibleScore) * 100)
    const passed = percentage >= 70

    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className={`border-4 ${passed ? "border-green-500" : "border-red-500"}`}>
          <CardHeader className={`text-center ${passed ? "bg-green-50" : "bg-red-50"}`}>
            <div className="flex justify-center mb-4">
              {passed ? <Award className="h-16 w-16 text-green-600" /> : <XCircle className="h-16 w-16 text-red-600" />}
            </div>
            <CardTitle className={`text-3xl font-bold ${passed ? "text-green-800" : "text-red-800"}`}>
              {passed ? "Congratulations!" : "Training Incomplete"}
            </CardTitle>
            <CardDescription className="text-lg">
              {passed
                ? "You have successfully completed the OSHA Safety Training"
                : "Please retake the training to improve your score"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div
                  className={`text-4xl font-bold ${gradeInfo.color} text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-2`}
                >
                  {gradeInfo.grade}
                </div>
                <div className="text-sm text-gray-600">Final Grade</div>
                <div className="font-semibold">{gradeInfo.status}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{gameState.score}</div>
                <div className="text-sm text-gray-600">Total Points</div>
                <div className="font-semibold">out of {maxPossibleScore}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">{percentage}%</div>
                <div className="text-sm text-gray-600">Score Percentage</div>
                <div className="font-semibold">{passed ? "PASSED" : "FAILED"}</div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold">Question Review</h3>
              {OSHA_QUESTIONS.map((question, index) => {
                const userAnswer = gameState.answers[index]
                const isCorrect = userAnswer === question.correctAnswer
                return (
                  <div
                    key={question.id}
                    className={`p-4 rounded-lg border-2 ${isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      <span className="font-semibold">
                        Question {index + 1}: {question.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{question.question}</p>
                    <div className="text-sm">
                      <span className="font-medium">Your answer: </span>
                      <span className={isCorrect ? "text-green-700" : "text-red-700"}>
                        {userAnswer >= 0 ? question.options[userAnswer] : "No answer (time expired)"}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div className="text-sm mt-1">
                        <span className="font-medium">Correct answer: </span>
                        <span className="text-green-700">{question.options[question.correctAnswer]}</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {passed && (
              <Alert className="border-green-500 bg-green-50 mb-6">
                <Award className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Certification Earned!</strong> You have successfully demonstrated knowledge of workplace
                  safety standards. This certification is valid for training purposes within the WyoVerse platform.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-4 justify-center">
              <Button onClick={resetGame} variant="outline" size="lg">
                Retake Training
              </Button>
              {passed && (
                <Button onClick={() => window.print()} className="bg-green-600 hover:bg-green-700 text-white" size="lg">
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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Progress Header */}
      <Card className="border-2 border-orange-500">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <HardHat className="h-5 w-5 text-orange-600" />
              <span className="font-semibold">
                Question {gameState.currentQuestion + 1} of {OSHA_QUESTIONS.length}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className={`font-bold ${gameState.timeRemaining <= 10 ? "text-red-600" : "text-blue-600"}`}>
                  {gameState.timeRemaining}s
                </span>
              </div>
              <Badge variant="outline" className="font-semibold">
                Score: {gameState.score}
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="border-4 border-blue-500">
        <CardHeader className="bg-blue-50">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-blue-600 text-white">{currentQ.category}</Badge>
            <Badge variant="outline">{currentQ.points} points</Badge>
          </div>
          <CardTitle className="text-xl">{currentQ.scenario}</CardTitle>
          <CardDescription className="text-lg font-semibold text-blue-800">{currentQ.question}</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {!gameState.showExplanation ? (
            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className={`w-full text-left justify-start p-4 h-auto ${
                    selectedAnswer === index ? "bg-blue-600 text-white" : "hover:bg-blue-50"
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}

              <div className="flex justify-center mt-6">
                <Button
                  onClick={handleAnswerSubmit}
                  disabled={selectedAnswer === null}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8"
                >
                  Submit Answer
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Answer Result */}
              <div
                className={`p-4 rounded-lg border-2 ${
                  selectedAnswer === currentQ.correctAnswer
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {selectedAnswer === currentQ.correctAnswer ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600" />
                  )}
                  <span
                    className={`font-bold text-lg ${
                      selectedAnswer === currentQ.correctAnswer ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    {selectedAnswer === currentQ.correctAnswer ? "Correct!" : "Incorrect"}
                  </span>
                </div>

                {selectedAnswer !== null && selectedAnswer >= 0 ? (
                  <p className="mb-2">
                    <strong>Your answer:</strong> {currentQ.options[selectedAnswer]}
                  </p>
                ) : (
                  <p className="mb-2 text-red-700">
                    <strong>No answer selected (time expired)</strong>
                  </p>
                )}

                {selectedAnswer !== currentQ.correctAnswer && (
                  <p className="text-green-700">
                    <strong>Correct answer:</strong> {currentQ.options[currentQ.correctAnswer]}
                  </p>
                )}
              </div>

              {/* Explanation */}
              <Alert className="border-blue-500 bg-blue-50">
                <Shield className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Explanation:</strong> {currentQ.explanation}
                </AlertDescription>
              </Alert>

              {/* Score for this question */}
              {selectedAnswer === currentQ.correctAnswer && (
                <div className="text-center p-4 bg-yellow-50 border-2 border-yellow-500 rounded-lg">
                  <div className="text-lg font-semibold text-yellow-800">
                    Points Earned: {currentQ.points} + {gameState.timeRemaining * 2} time bonus ={" "}
                    {currentQ.points + gameState.timeRemaining * 2} points
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                <Button onClick={nextQuestion} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  {gameState.currentQuestion < OSHA_QUESTIONS.length - 1 ? "Next Question" : "View Results"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
