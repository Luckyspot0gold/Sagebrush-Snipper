"use client"

import { useState, useEffect } from "react"

interface SafetyScenario {
  id: number
  title: string
  description: string
  image: string
  options: string[]
  correctAnswer: number
  explanation: string
  points: number
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
  },
]

export function OSHATraining() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'results'>('menu')
  const [currentScenario, setCurrentScenario] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameStartTime, setGameStartTime] = useState<number>(0)
  const [totalTime, setTotalTime] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0 && gameState === 'playing') {
      handleAnswer(-1) // Time's up, wrong answer
    }
    return () => clearTimeout(timer)
  }, [timeLeft, gameState])

  const startGame = () => {
    setGameState('playing')
    setCurrentScenario(0)
    setScore(0)
    setAnswers([])
    setTimeLeft(30)
    setGameStartTime(Date.now())
  }

  const handleAnswer = (selectedAnswer: number) => {
    const scenario = safetyScenarios[currentScenario]
    const isCorrect = selectedAnswer === scenario.correctAnswer
    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)

    if (isCorrect) {
      const timeBonus = Math.max(0, timeLeft * 2)
      setScore(score + scenario.points + timeBonus)
    }

    if (currentScenario < safetyScenarios.length - 1) {
      setCurrentScenario(currentScenario + 1)
      setTimeLeft(30)
    } else {
      setTotalTime(Math.round((Date.now() - gameStartTime) / 1000))
      setGameState('results')
    }
  }

  const resetGame = () => {
    setGameState('menu')
    setCurrentScenario(0)
    setScore(0)
    setAnswers([])
    setTimeLeft(30)
    setTotalTime(0)
  }

  const getScoreGrade = () => {
    const percentage = (score / (safetyScenarios.reduce((sum, s) => sum + s.points, 0) + 300)) * 100
    if (percentage >=
