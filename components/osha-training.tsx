"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, XCircle, Clock, Award, HardHat } from "lucide-react"

interface OSHAScenario {
  id: number
  title: string
  description: string
  image: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category:
    | "PPE"
    | "Hazmat"
    | "Electrical"
    | "Fall Protection"
    | "Machine Safety"
    | "Emergency"
    | "Chemical"
    | "Ergonomics"
}

const OSHA_SCENARIOS: OSHAScenario[] = [
  {
    id: 1,
    title: "Hard Hat Zone",
    description: "You're entering a construction area where overhead work is being performed.",
    image: "🏗️",
    question: "What is the FIRST thing you must do before entering this area?",
    options: [
      "Walk quickly to minimize exposure time",
      "Put on appropriate head protection (hard hat)",
      "Look up to check for falling objects",
      "Ask permission from the foreman",
    ],
    correctAnswer: 1,
    explanation:
      "OSHA requires hard hats in areas where there is potential for head injury from falling objects. This is your primary protection and must be worn before entering the hazard zone.",
    category: "PPE",
  },
  {
    id: 2,
    title: "Chemical Spill Response",
    description:
      "A worker has spilled an unknown chemical in the workplace. The liquid is spreading and has a strong odor.",
    image: "☢️",
    question: "What is your immediate priority in this situation?",
    options: [
      "Clean up the spill immediately",
      "Evacuate the area and alert others",
      "Take a photo for documentation",
      "Open windows for ventilation",
    ],
    correctAnswer: 1,
    explanation:
      "When dealing with unknown chemicals, the priority is always life safety. Evacuate the area, alert others to the hazard, and contact trained hazmat personnel. Never attempt to clean unknown substances without proper training and equipment.",
    category: "Hazmat",
  },
  {
    id: 3,
    title: "Electrical Panel Work",
    description:
      "You need to reset a circuit breaker in an electrical panel. The panel door is open and you can see the breakers.",
    image: "⚡",
    question: "Before touching any electrical components, you must:",
    options: [
      "Use a wooden stick to flip the breaker",
      "Verify the power is off and use proper PPE",
      "Work quickly to minimize exposure",
      "Spray the panel with water to cool it down",
    ],
    correctAnswer: 1,
    explanation:
      "OSHA's electrical safety standards require verification that power is off (lockout/tagout), proper personal protective equipment including insulated gloves and safety glasses, and following established electrical safety procedures.",
    category: "Electrical",
  },
  {
    id: 4,
    title: "Working at Height",
    description: "You need to access equipment that is 8 feet above ground level. A ladder is available nearby.",
    image: "🪜",
    question: "What is the proper ladder safety ratio for setup?",
    options: [
      "1:2 ratio (1 foot out for every 2 feet up)",
      "4:1 ratio (4 feet out for every 1 foot up)",
      "1:4 ratio (1 foot out for every 4 feet up)",
      "2:1 ratio (2 feet out for every 1 foot up)",
    ],
    correctAnswer: 2,
    explanation:
      "The proper ladder angle is 4:1 ratio - for every 4 feet of ladder height, the base should be 1 foot away from the wall. This creates approximately a 75-degree angle, providing optimal stability and safety.",
    category: "Fall Protection",
  },
  {
    id: 5,
    title: "Machine Lockout",
    description:
      "A conveyor belt has jammed and needs maintenance. The machine is currently running but can be stopped.",
    image: "🔧",
    question: "Before performing maintenance, you must:",
    options: [
      "Just turn off the power switch",
      "Implement full lockout/tagout procedures",
      "Work carefully while the machine is running",
      "Have someone watch for you",
    ],
    correctAnswer: 1,
    explanation:
      "OSHA's lockout/tagout standard requires that energy sources be isolated, locked, and tagged before maintenance. This prevents accidental startup that could cause serious injury or death.",
    category: "Machine Safety",
  },
  {
    id: 6,
    title: "Fire Emergency",
    description: "You discover a small fire in a waste basket. The fire alarm has not yet sounded.",
    image: "🔥",
    question: "What should be your FIRST action?",
    options: [
      "Try to extinguish the fire yourself",
      "Sound the alarm and evacuate",
      "Look for the nearest fire extinguisher",
      "Call your supervisor",
    ],
    correctAnswer: 1,
    explanation:
      "The RACE protocol: Rescue (evacuate), Alarm (sound the alarm), Confine (close doors), Extinguish (if trained and safe). Always sound the alarm first to alert others, even for small fires that can spread rapidly.",
    category: "Emergency",
  },
  {
    id: 7,
    title: "Chemical Mixing",
    description: "You need to mix two cleaning chemicals to create a stronger solution for a tough cleaning job.",
    image: "🧪",
    question: "What is the safest approach to mixing chemicals?",
    options: [
      "Mix them in equal proportions",
      "Never mix chemicals unless specifically instructed",
      "Mix them outside for better ventilation",
      "Test a small amount first",
    ],
    correctAnswer: 1,
    explanation:
      "Never mix chemicals unless you have specific instructions and training. Many common chemicals can create toxic gases, explosive reactions, or corrosive solutions when mixed. Always use chemicals as intended by the manufacturer.",
    category: "Chemical",
  },
  {
    id: 8,
    title: "Repetitive Motion",
    description: "You've been doing the same computer work for 3 hours straight and your wrists are starting to hurt.",
    image: "💻",
    question: "What is the best immediate action to prevent injury?",
    options: [
      "Continue working through the pain",
      "Take a break and do stretching exercises",
      "Work faster to finish sooner",
      "Switch to using only one hand",
    ],
    correctAnswer: 1,
    explanation:
      "Repetitive strain injuries develop gradually. Taking regular breaks, doing stretching exercises, and varying your tasks helps prevent musculoskeletal disorders. OSHA recommends micro-breaks every 30 minutes for computer work.",
    category: "Ergonomics",
  },
]

export function OSHATraining() {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [isComplete, setIsComplete] = useState(false)
  const [answers, setAnswers] = useState<number[]>([])
  const [startTime, setStartTime] = useState<Date | null>(null)

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !showExplanation && !isComplete) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeRemaining === 0 && !showExplanation) {
      handleTimeUp()
    }
  }, [timeRemaining, showExplanation, isComplete])

  // Start timer on component mount
  useEffect(() => {
    setStartTime(new Date())
  }, [])

  const handleTimeUp = () => {
    setSelectedAnswer(-1) // Mark as timed out
    setShowExplanation(true)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === OSHA_SCENARIOS[currentScenario].correctAnswer
    if (isCorrect) {
      setScore(score + 1)
    }

    setAnswers([...answers, selectedAnswer])
    setShowExplanation(true)
  }

  const handleNextScenario = () => {
    if (currentScenario < OSHA_SCENARIOS.length - 1) {
      setCurrentScenario(currentScenario + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setTimeRemaining(30)
    } else {
      setIsComplete(true)
    }
  }

  const resetTraining = () => {
    setCurrentScenario(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setTimeRemaining(30)
    setIsComplete(false)
    setAnswers([])
    setStartTime(new Date())
  }

  const getScoreGrade = () => {
    const percentage = (score / OSHA_SCENARIOS.length) * 100
    if (percentage >= 90) return { grade: "A", status: "Excellent", color: "text-green-600" }
    if (percentage >= 80) return { grade: "B", status: "Good", color: "text-blue-600" }
    if (percentage >= 70) return { grade: "C", status: "Passing", color: "text-yellow-600" }
    return { grade: "F", status: "Needs Improvement", color: "text-red-600" }
  }

  const getCategoryStats = () => {
    const categories: { [key: string]: { correct: number; total: number } } = {}

    OSHA_SCENARIOS.forEach((scenario, index) => {
      const category = scenario.category
      if (!categories[category]) {
        categories[category] = { correct: 0, total: 0 }
      }
      categories[category].total++
      if (answers[index] === scenario.correctAnswer) {
        categories[category].correct++
      }
    })

    return categories
  }

  if (isComplete) {
    const gradeInfo = getScoreGrade()
    const categoryStats = getCategoryStats()
    const totalTime = startTime ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) : 0

    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-4 border-black shadow-lg">
          <CardHeader className="bg-green-600 text-white text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="h-8 w-8" />
              <CardTitle className="text-2xl font-serif">OSHA Safety Training Complete!</CardTitle>
            </div>
            <CardDescription className="text-green-100 text-lg">
              WyoVerse Digital Frontier Safety Certification
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className={`text-4xl font-bold ${gradeInfo.color} mb-2`}>Grade: {gradeInfo.grade}</h2>
              <p className="text-xl text-gray-600 mb-4">{gradeInfo.status}</p>
              <div className="flex justify-center gap-8 text-lg">
                <div>
                  <strong>Score:</strong> {score}/{OSHA_SCENARIOS.length} (
                  {Math.round((score / OSHA_SCENARIOS.length) * 100)}%)
                </div>
                <div>
                  <strong>Time:</strong> {Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, "0")}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(categoryStats).map(([category, stats]) => (
                      <div key={category} className="flex justify-between items-center">
                        <span className="font-medium">{category}</span>
                        <div className="flex items-center gap-2">
                          <span>
                            {stats.correct}/{stats.total}
                          </span>
                          {stats.correct === stats.total ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Certification Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <HardHat className="h-5 w-5 text-yellow-600" />
                      <span>OSHA 10-Hour Equivalent: {score >= 6 ? "✅ Passed" : "❌ Failed"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-blue-600" />
                      <span>WyoVerse Safety Certified: {score >= 7 ? "✅ Yes" : "❌ No"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>
                        Frontier Ready:{" "}
                        {score >= 8 ? "✅ Expert Level" : score >= 6 ? "⚠️ Basic Level" : "❌ Needs Training"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button onClick={resetTraining} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                Retake Training
              </Button>
            </div>

            {score >= 6 && (
              <div className="mt-8 p-6 bg-green-50 border-2 border-green-200 rounded-lg text-center">
                <h3 className="text-xl font-bold text-green-800 mb-2">🎉 Congratulations!</h3>
                <p className="text-green-700">
                  You've successfully completed the WyoVerse OSHA Safety Training. You're now certified to work safely
                  in the digital frontier!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  const scenario = OSHA_SCENARIOS[currentScenario]
  const progress = ((currentScenario + 1) / OSHA_SCENARIOS.length) * 100

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="border-4 border-black shadow-lg">
        <CardHeader className="bg-yellow-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardHat className="h-6 w-6" />
              <CardTitle className="text-xl font-serif">OSHA Safety Training</CardTitle>
            </div>
            <Badge variant="outline" className="text-white border-white">
              {scenario.category}
            </Badge>
          </div>
          <CardDescription className="text-yellow-100">
            Scenario {currentScenario + 1} of {OSHA_SCENARIOS.length}
          </CardDescription>
          <Progress value={progress} className="mt-2 h-3" />
        </CardHeader>

        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-600" />
              <span className={`font-bold ${timeRemaining <= 10 ? "text-red-600" : "text-gray-600"}`}>
                {timeRemaining}s
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Current Score</div>
              <div className="text-xl font-bold">
                {score}/{currentScenario}
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="text-8xl mb-4">{scenario.image}</div>
            <h2 className="text-2xl font-bold mb-4">{scenario.title}</h2>
            <p className="text-lg text-gray-700 mb-6">{scenario.description}</p>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                {scenario.question}
              </h3>

              <div className="space-y-3">
                {scenario.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                      selectedAnswer === index
                        ? showExplanation
                          ? index === scenario.correctAnswer
                            ? "border-green-500 bg-green-50"
                            : "border-red-500 bg-red-50"
                          : "border-blue-500 bg-blue-50"
                        : showExplanation && index === scenario.correctAnswer
                          ? "border-green-500 bg-green-50"
                          : "border-gray-300 hover:border-gray-400"
                    } ${showExplanation ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswer === index
                            ? showExplanation
                              ? index === scenario.correctAnswer
                                ? "border-green-500 bg-green-500"
                                : "border-red-500 bg-red-500"
                              : "border-blue-500 bg-blue-500"
                            : showExplanation && index === scenario.correctAnswer
                              ? "border-green-500 bg-green-500"
                              : "border-gray-400"
                        }`}
                      >
                        {showExplanation && (
                          <>
                            {index === scenario.correctAnswer && <CheckCircle className="h-4 w-4 text-white" />}
                            {selectedAnswer === index && index !== scenario.correctAnswer && (
                              <XCircle className="h-4 w-4 text-white" />
                            )}
                          </>
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {showExplanation && (
            <Card className="mb-6 border-2 border-blue-200">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Explanation
                </h4>
                <p className="text-gray-700 leading-relaxed">{scenario.explanation}</p>

                {selectedAnswer === scenario.correctAnswer ? (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-bold">Correct! Well done!</span>
                    </div>
                  </div>
                ) : selectedAnswer === -1 ? (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 text-yellow-800">
                      <Clock className="h-5 w-5" />
                      <span className="font-bold">
                        Time's up! The correct answer was option {scenario.correctAnswer + 1}.
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-800">
                      <XCircle className="h-5 w-5" />
                      <span className="font-bold">
                        Incorrect. The correct answer was option {scenario.correctAnswer + 1}.
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <div className="text-center">
            {!showExplanation ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                onClick={handleNextScenario}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
              >
                {currentScenario < OSHA_SCENARIOS.length - 1 ? "Next Scenario" : "Complete Training"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
