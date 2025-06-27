"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { HardHat, Shield, Clock, Trophy, Star, AlertTriangle } from "lucide-react"

interface SafetyScenario {
  id: number
  title: string
  description: string
  image: string
  options: string[]
  correctAnswer: number
  explanation: string
  points: number
  category: "construction" | "mining" | "manufacturing" | "transportation" | "general"
}

const safetyScenarios: SafetyScenario[] = [
  {
    id: 1,
    title: "Hard Hat Zone",
    description: "You're entering a construction area. What should you do first?",
    image: "🏗️",
    options: [
      "Walk through quickly to avoid staying too long",
      "Put on a hard hat and safety vest",
      "Look around for falling objects",
      "Ask someone if it's safe",
    ],
    correctAnswer: 1,
    explanation: "Always wear proper PPE (Personal Protective Equipment) before entering any construction zone.",
    points: 10,
    category: "construction",
  },
  {
    id: 2,
    title: "Chemical Spill",
    description: "You notice a chemical spill in the workplace. What's your first action?",
    image: "⚠️",
    options: [
      "Clean it up immediately",
      "Alert others and evacuate the area",
      "Take a photo for documentation",
      "Continue working but avoid the area",
    ],
    correctAnswer: 1,
    explanation: "Safety first! Alert others and evacuate to prevent exposure to potentially hazardous chemicals.",
    points: 15,
    category: "general",
  },
  {
    id: 3,
    title: "Ladder Safety",
    description: "Before using a ladder, you should:",
    image: "🪜",
    options: [
      "Check if it's the right height",
      "Inspect for damage and ensure proper setup",
      "Make sure someone is watching",
      "Test it with light weight first",
    ],
    correctAnswer: 1,
    explanation: "Always inspect equipment for damage and ensure proper setup according to safety guidelines.",
    points: 10,
    category: "construction",
  },
  {
    id: 4,
    title: "Fire Emergency",
    description: "The fire alarm sounds. What should you do?",
    image: "🔥",
    options: [
      "Finish your current task first",
      "Immediately evacuate using the nearest exit",
      "Look for the source of the fire",
      "Wait for instructions from management",
    ],
    correctAnswer: 1,
    explanation: "In fire emergencies, immediate evacuation is critical. Don't delay or investigate.",
    points: 20,
    category: "general",
  },
  {
    id: 5,
    title: "Electrical Safety",
    description: "You see exposed electrical wires. What should you do?",
    image: "⚡",
    options: [
      "Cover them with tape",
      "Report immediately and keep others away",
      "Turn off the main power",
      "Use rubber gloves to move them",
    ],
    correctAnswer: 1,
    explanation: "Report electrical hazards immediately and ensure the area is secured to prevent accidents.",
    points: 15,
    category: "general",
  },
  {
    id: 6,
    title: "Mining Equipment",
    description: "Before operating heavy mining equipment, you must:",
    image: "⛏️",
    options: [
      "Check that no one is around",
      "Complete pre-operation inspection checklist",
      "Start it up to test functionality",
      "Make sure you have the keys",
    ],
    correctAnswer: 1,
    explanation: "Pre-operation inspections are mandatory for all heavy equipment to ensure safe operation.",
    points: 15,
    category: "mining",
  },
  {
    id: 7,
    title: "Lockout/Tagout",
    description: "When servicing machinery, you should:",
    image: "🔒",
    options: [
      "Turn off the power switch",
      "Implement proper lockout/tagout procedures",
      "Work quickly while it's off",
      "Have someone watch the controls",
    ],
    correctAnswer: 1,
    explanation: "Lockout/tagout procedures prevent accidental startup during maintenance and save lives.",
    points: 20,
    category: "manufacturing",
  },
  {
    id: 8,
    title: "Vehicle Safety",
    description: "Before driving a company vehicle, you should:",
    image: "🚛",
    options: [
      "Adjust mirrors and seat",
      "Complete vehicle inspection checklist",
      "Check fuel level",
      "Program GPS destination",
    ],
    correctAnswer: 1,
    explanation: "Vehicle inspections ensure the vehicle is safe to operate and prevent breakdowns.",
    points: 10,
    category: "transportation",
  },
]

interface GameStats {
  totalQuestions: number
  correctAnswers: number
  totalTime: number
  score: number
  grade: string
}

export function OSHATraining() {
  const [gameState, setGameState] = useState<"menu" | "playing" | "results">("menu")
  const [currentScenario, setCurrentScenario] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameStartTime, setGameStartTime] = useState<number>(0)
  const [totalTime, setTotalTime] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [gameStats, setGameStats] = useState<GameStats | null>(null)

  const { toast } = useToast()

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameState === "playing" && timeLeft > 0 && !showExplanation) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0 && gameState === "playing" && !showExplanation) {
      handleAnswer(-1) // Time's up, wrong answer
    }
    return () => clearTimeout(timer)
  }, [timeLeft, gameState, showExplanation])

  const startGame = () => {
    setGameState("playing")
    setCurrentScenario(0)
    setScore(0)
    setAnswers([])
    setTimeLeft(30)
    setGameStartTime(Date.now())
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const handleAnswer = (selectedAnswer: number) => {
    const scenario = safetyScenarios[currentScenario]
    const isCorrect = selectedAnswer === scenario.correctAnswer
    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)
    setSelectedAnswer(selectedAnswer)

    if (isCorrect) {
      const timeBonus = Math.max(0, timeLeft * 2)
      setScore(score + scenario.points + timeBonus)
      toast({
        title: "Correct! 🎉",
        description: `+${scenario.points + timeBonus} points (including time bonus)`,
      })
    } else {
      toast({
        title: "Incorrect ❌",
        description: "Review the explanation to learn the correct procedure",
        variant: "destructive",
      })
    }

    setShowExplanation(true)
  }

  const nextQuestion = () => {
    if (currentScenario < safetyScenarios.length - 1) {
      setCurrentScenario(currentScenario + 1)
      setTimeLeft(30)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      const finalTime = Math.round((Date.now() - gameStartTime) / 1000)
      const correctCount = answers.filter((answer, index) => answer === safetyScenarios[index].correctAnswer).length
      const maxScore = safetyScenarios.reduce((sum, s) => sum + s.points, 0) + 30 * 2 * safetyScenarios.length
      const percentage = (score / maxScore) * 100

      let grade = "F"
      if (percentage >= 90) grade = "A"
      else if (percentage >= 80) grade = "B"
      else if (percentage >= 70) grade = "C"
      else if (percentage >= 60) grade = "D"

      setGameStats({
        totalQuestions: safetyScenarios.length,
        correctAnswers: correctCount,
        totalTime: finalTime,
        score,
        grade,
      })
      setTotalTime(finalTime)
      setGameState("results")
    }
  }

  const resetGame = () => {
    setGameState("menu")
    setCurrentScenario(0)
    setScore(0)
    setAnswers([])
    setTimeLeft(30)
    setTotalTime(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setGameStats(null)
  }

  const getProgressPercentage = () => {
    return ((currentScenario + 1) / safetyScenarios.length) * 100
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (gameState === "menu") {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <HardHat className="h-10 w-10 text-orange-500" />
            WyoVerse OSHA Safety Training
          </h1>
          <p className="text-lg text-muted-foreground">
            Interactive safety training game to test your knowledge of workplace safety procedures
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">OSHA Certified</h3>
              <p className="text-sm text-muted-foreground">
                Training content meets OSHA safety standards and requirements
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Gamified Learning</h3>
              <p className="text-sm text-muted-foreground">
                Earn points and compete for high scores while learning safety
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Star className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Real Scenarios</h3>
              <p className="text-sm text-muted-foreground">Practice with realistic workplace safety situations</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">Game Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">How to Play:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Answer {safetyScenarios.length} safety scenario questions</li>
                  <li>• Each question has a 30-second time limit</li>
                  <li>• Earn points for correct answers</li>
                  <li>• Get time bonuses for quick responses</li>
                  <li>• Review explanations after each question</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Scoring:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Base points for correct answers</li>
                  <li>• Time bonus: 2 points per second remaining</li>
                  <li>• Grade based on total percentage</li>
                  <li>• A: 90%+, B: 80%+, C: 70%+, D: 60%+</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button onClick={startGame} size="lg" className="bg-orange-500 hover:bg-orange-600">
            <HardHat className="mr-2 h-5 w-5" />
            Start Safety Training
          </Button>
        </div>
      </div>
    )
  }

  if (gameState === "playing") {
    const scenario = safetyScenarios[currentScenario]

    return (
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Progress Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Question {currentScenario + 1} of {safetyScenarios.length}
            </span>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Trophy className="h-3 w-3" />
                {score} points
              </Badge>
              <Badge variant={timeLeft <= 10 ? "destructive" : "default"} className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {timeLeft}s
              </Badge>
            </div>
          </div>
          <Progress value={getProgressPercentage()} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="text-4xl">{scenario.image}</div>
              <div>
                <CardTitle className="text-xl">{scenario.title}</CardTitle>
                <Badge variant="outline" className="mt-1">
                  {scenario.category.charAt(0).toUpperCase() + scenario.category.slice(1)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">{scenario.description}</p>

            {!showExplanation ? (
              <div className="grid gap-3">
                {scenario.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="text-left h-auto p-4 justify-start bg-transparent"
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                  >
                    <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid gap-3">
                  {scenario.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        index === scenario.correctAnswer
                          ? "border-green-500 bg-green-50"
                          : index === selectedAnswer && index !== scenario.correctAnswer
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>
                        <span>{option}</span>
                        {index === scenario.correctAnswer && <Badge className="bg-green-500 ml-auto">Correct</Badge>}
                        {index === selectedAnswer && index !== scenario.correctAnswer && (
                          <Badge variant="destructive" className="ml-auto">
                            Your Answer
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">Explanation</h4>
                        <p className="text-blue-800">{scenario.explanation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Button onClick={nextQuestion} className="bg-blue-500 hover:bg-blue-600">
                    {currentScenario < safetyScenarios.length - 1 ? "Next Question" : "View Results"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameState === "results" && gameStats) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Training Complete!</h1>
          <p className="text-lg text-muted-foreground">Here are your results</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-6xl font-bold mb-2 text-blue-500">{gameStats.grade}</div>
              <h3 className="text-xl font-semibold mb-2">Final Grade</h3>
              <p className="text-muted-foreground">
                {gameStats.correctAnswers} out of {gameStats.totalQuestions} correct
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-4xl font-bold mb-2 text-green-500">{gameStats.score}</div>
              <h3 className="text-xl font-semibold mb-2">Total Score</h3>
              <p className="text-muted-foreground">Including time bonuses</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{gameStats.correctAnswers}</div>
                <div className="text-sm text-blue-800">Correct Answers</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{formatTime(gameStats.totalTime)}</div>
                <div className="text-sm text-green-800">Total Time</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((gameStats.correctAnswers / gameStats.totalQuestions) * 100)}%
                </div>
                <div className="text-sm text-purple-800">Accuracy</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Certification Status</CardTitle>
          </CardHeader>
          <CardContent>
            {gameStats.grade !== "F" ? (
              <div className="text-center p-6 bg-green-50 border-2 border-green-200 rounded-lg">
                <Trophy className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">Congratulations!</h3>
                <p className="text-green-700 mb-4">
                  You have successfully completed the WyoVerse OSHA Safety Training with a grade of {gameStats.grade}.
                </p>
                <Badge className="bg-green-500 text-white">Training Certified</Badge>
              </div>
            ) : (
              <div className="text-center p-6 bg-red-50 border-2 border-red-200 rounded-lg">
                <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-red-800 mb-2">Training Incomplete</h3>
                <p className="text-red-700 mb-4">
                  You need a grade of D or better to complete the training. Please review the material and try again.
                </p>
                <Badge variant="destructive">Retake Required</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center space-x-4">
          <Button onClick={resetGame} variant="outline">
            Take Training Again
          </Button>
          <Button onClick={() => window.print()} className="bg-blue-500 hover:bg-blue-600">
            Print Certificate
          </Button>
        </div>
      </div>
    )
  }

  return null
}
