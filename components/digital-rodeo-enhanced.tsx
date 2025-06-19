"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { LineChart, Line, ResponsiveContainer } from "recharts"
import { Clock, Award, TrendingUp, TrendingDown, AlertTriangle, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

type Bull = {
  id: string
  name: string
  symbol: string
  difficulty: number
  volatility: number
  strength: number
  currentValue: number
  priceHistory: { timestamp: number; price: number }[]
  color: string
  image?: string
  specialMove?: string
}

type Rider = {
  id: string
  name: string
  skill: number
  stamina: number
  balance: number
  experience: number
  image?: string
}

type GameState = "selecting" | "preparing" | "riding" | "bucked" | "success" | "gameover"

const initialBulls: Bull[] = [
  {
    id: "bull-1",
    name: "Bitcoin Bull",
    symbol: "BTC",
    difficulty: 85,
    volatility: 75,
    strength: 90,
    currentValue: 42000,
    priceHistory: Array(20)
      .fill(0)
      .map((_, i) => ({
        timestamp: Date.now() - (19 - i) * 3600000,
        price: 40000 + Math.random() * 5000,
      })),
    color: "#F7931A",
    image: "/images/bull-vs-bear.webp",
    specialMove: "Halving Headbutt",
  },
  {
    id: "bull-2",
    name: "Solana Stampede",
    symbol: "SOL",
    difficulty: 70,
    volatility: 90,
    strength: 75,
    currentValue: 120,
    priceHistory: Array(20)
      .fill(0)
      .map((_, i) => ({
        timestamp: Date.now() - (19 - i) * 3600000,
        price: 100 + Math.random() * 40,
      })),
    color: "#00FFA3",
    image: "/images/bull-vs-bear.webp",
    specialMove: "TPS Tornado",
  },
  {
    id: "bull-3",
    name: "Ethereum Enforcer",
    symbol: "ETH",
    difficulty: 80,
    volatility: 65,
    strength: 85,
    currentValue: 2800,
    priceHistory: Array(20)
      .fill(0)
      .map((_, i) => ({
        timestamp: Date.now() - (19 - i) * 3600000,
        price: 2700 + Math.random() * 200,
      })),
    color: "#627EEA",
    image: "/images/bull-vs-bear.webp",
    specialMove: "Merge Madness",
  },
]

const initialRiders: Rider[] = [
  {
    id: "rider-1",
    name: "Crypto Cowboy",
    skill: 75,
    stamina: 80,
    balance: 70,
    experience: 0,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "rider-2",
    name: "Blockchain Bronco",
    skill: 85,
    stamina: 65,
    balance: 80,
    experience: 0,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "rider-3",
    name: "Wallet Wrangler",
    skill: 70,
    stamina: 90,
    balance: 75,
    experience: 0,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function DigitalRodeoEnhanced() {
  const [riders, setRiders] = useState<Rider[]>(initialRiders)
  const [selectedBull, setSelectedBull] = useState<Bull | null>(null)
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null)
  const [gameState, setGameState] = useState<GameState>("selecting")
  const [rideTime, setRideTime] = useState(0)
  const [rideScore, setRideScore] = useState(0)
  const [patentMetrics, setPatentMetrics] = useState({
    innovationIndex: 85,
    marketImpact: 72,
    technicalComplexity: 90,
  })
  const [marketEvents, setMarketEvents] = useState<string[]>([])
  const [currentEvent, setCurrentEvent] = useState<string | null>(null)
  const [rideHistory, setRideHistory] = useState<Array<{ rider: string; bull: string; score: number; time: number }>>(
    [],
  )
  const [bullMovement, setBullMovement] = useState({ x: 0, y: 0, rotation: 0 })
  const [riderPosition, setRiderPosition] = useState({ x: 0, y: 0, rotation: 0 })
  const [showSpecialMove, setShowSpecialMove] = useState(false)
  const [specialMoveCounter, setSpecialMoveCounter] = useState(0)
  const [crowdExcitement, setCrowdExcitement] = useState(50)

  const arenaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const [bulls, setBulls] = useState<Bull[]>(() => {
    // Apply initial patent metrics to bulls on initialization
    return initialBulls.map((bull) => {
      const difficultyModifier = patentMetrics.innovationIndex / 100
      const volatilityModifier = patentMetrics.marketImpact / 100
      const strengthModifier = patentMetrics.technicalComplexity / 100

      return {
        ...bull,
        difficulty: Math.min(100, bull.difficulty * difficultyModifier),
        volatility: Math.min(100, bull.volatility * volatilityModifier),
        strength: Math.min(100, bull.strength * strengthModifier),
      }
    })
  })

  // Market events that can occur during the ride
  const possibleMarketEvents = [
    "Bull Run! Market sentiment is extremely positive!",
    "Bear Attack! Market is experiencing a downturn!",
    "Whale Alert! Large transaction detected!",
    "FUD spreading on social media!",
    "Positive news from regulators!",
    "Exchange outage causing volatility!",
    "New partnership announced!",
    "Technical breakthrough achieved!",
  ]

  // Update bull values based on patent metrics
  useEffect(() => {
    const updatedBulls = bulls.map((bull) => {
      // Use patent metrics to influence bull behavior
      const difficultyModifier = patentMetrics.technicalComplexity / 100
      const volatilityModifier = patentMetrics.marketImpact / 100
      const strengthModifier = patentMetrics.innovationIndex / 100

      return {
        ...bull,
        difficulty: Math.min(100, bull.difficulty * difficultyModifier),
        volatility: Math.min(100, bull.volatility * volatilityModifier),
        strength: Math.min(100, bull.strength * strengthModifier),
      }
    })

    // Only update if there's an actual change to avoid infinite loops
    if (JSON.stringify(updatedBulls) !== JSON.stringify(bulls)) {
      setBulls(updatedBulls)
    }
  }, [patentMetrics])

  // Generate random bull movements during the ride
  const generateBullMovement = () => {
    const newX = Math.random() * 20 - 10
    const newY = Math.random() * 20 - 10
    const newRotation = Math.random() * 10 - 5

    setBullMovement({
      x: newX,
      y: newY,
      rotation: newRotation,
    })

    // Rider tries to compensate for bull movement
    const riderSkillFactor = selectedRider ? selectedRider.balance / 100 : 0.5
    const riderLag = 1 - riderSkillFactor

    setTimeout(() => {
      setRiderPosition({
        x: -newX * riderSkillFactor,
        y: -newY * riderSkillFactor,
        rotation: -newRotation * riderSkillFactor,
      })
    }, riderLag * 300)
  }

  // Trigger market events during the ride
  const triggerMarketEvent = () => {
    if (Math.random() > 0.7 && gameState === "riding") {
      const randomEvent = possibleMarketEvents[Math.floor(Math.random() * possibleMarketEvents.length)]
      setCurrentEvent(randomEvent)
      setMarketEvents((prev) => [...prev, randomEvent])

      // Event affects the bull's behavior
      const isPositive =
        randomEvent.includes("positive") ||
        randomEvent.includes("Bull Run") ||
        randomEvent.includes("partnership") ||
        randomEvent.includes("breakthrough")

      if (isPositive) {
        setCrowdExcitement((prev) => Math.min(100, prev + 15))
      } else {
        setCrowdExcitement((prev) => Math.max(10, prev - 10))
        // Make the bull more aggressive on negative events
        generateBullMovement()
        generateBullMovement()
      }

      // Clear the current event after a few seconds
      setTimeout(() => {
        setCurrentEvent(null)
      }, 3000)
    }
  }

  // Special move mechanics
  const triggerSpecialMove = () => {
    if (specialMoveCounter >= 3 && selectedBull && gameState === "riding") {
      setShowSpecialMove(true)
      setSpecialMoveCounter(0)

      // Special move gives a score boost
      setRideScore((prev) => prev + 25)
      setCrowdExcitement((prev) => Math.min(100, prev + 25))

      toast({
        title: "Special Move Activated!",
        description: `${selectedRider?.name} performed ${selectedBull.specialMove}!`,
      })

      // Hide the special move notification after a few seconds
      setTimeout(() => {
        setShowSpecialMove(false)
      }, 2000)
    }
  }

  // Simulate the ride
  useEffect(() => {
    if (gameState === "riding" && selectedBull && selectedRider) {
      const rideInterval = setInterval(() => {
        setRideTime((prev) => {
          const newTime = prev + 0.1

          // Calculate ride score based on time, bull difficulty, and rider skill
          const baseScore = newTime * 10
          const difficultyBonus = (selectedBull.difficulty / 100) * baseScore
          const skillMultiplier = selectedRider.skill / 50
          const crowdBonus = (crowdExcitement / 100) * 5

          const newScore = Math.round((baseScore + difficultyBonus + crowdBonus) * skillMultiplier)
          setRideScore(Math.round(newScore))

          // Check if ride should end
          const riderEndurance = (selectedRider.stamina / 100) * 8 // Max seconds based on stamina
          const bullDifficulty = ((selectedBull.difficulty / 100) * selectedBull.volatility) / 100
          const maxRideTime = riderEndurance / bullDifficulty

          // Random chance of being bucked off based on time and difficulty
          const buckOffChance = (newTime / maxRideTime) * bullDifficulty

          if (Math.random() < buckOffChance * 0.1) {
            clearInterval(rideInterval)
            setGameState("bucked")

            // Update rider experience even when bucked
            setRiders((prev) =>
              prev.map((rider) =>
                rider.id === selectedRider.id
                  ? { ...rider, experience: rider.experience + Math.round(newScore / 2) }
                  : rider,
              ),
            )

            // Add to ride history
            setRideHistory((prev) => [
              ...prev,
              {
                rider: selectedRider.name,
                bull: selectedBull.name,
                score: Math.round(newScore / 2),
                time: Number.parseFloat(newTime.toFixed(1)),
              },
            ])

            toast({
              title: "Bucked Off!",
              description: `${selectedRider.name} was bucked off by ${selectedBull.name} after ${newTime.toFixed(1)} seconds!`,
              variant: "destructive",
            })

            return newTime
          }

          if (newTime >= maxRideTime) {
            clearInterval(rideInterval)
            setGameState("success")

            // Trigger confetti for successful ride
            if (arenaRef.current) {
              const rect = arenaRef.current.getBoundingClientRect()
              confetti({
                particleCount: 100,
                spread: 70,
                origin: {
                  x: (rect.left + rect.width / 2) / window.innerWidth,
                  y: (rect.top + rect.height / 2) / window.innerHeight,
                },
              })
            }

            // Update rider experience
            setRiders((prev) =>
              prev.map((rider) =>
                rider.id === selectedRider.id
                  ? { ...rider, experience: rider.experience + Math.round(newScore) }
                  : rider,
              ),
            )

            // Add to ride history
            setRideHistory((prev) => [
              ...prev,
              {
                rider: selectedRider.name,
                bull: selectedBull.name,
                score: Math.round(newScore),
                time: Number.parseFloat(newTime.toFixed(1)),
              },
            ])

            toast({
              title: "Ride Complete!",
              description: `${selectedRider.name} scored ${Math.round(newScore)} points riding ${selectedBull.name}!`,
            })
          }

          return newTime
        })

        // Generate bull movements
        if (Math.random() > 0.7) {
          generateBullMovement()
        }

        // Trigger market events
        if (Math.random() > 0.9) {
          triggerMarketEvent()
        }

        // Increment special move counter
        setSpecialMoveCounter((prev) => prev + 1)
      }, 100)

      return () => clearInterval(rideInterval)
    }
  }, [gameState, selectedBull, selectedRider, toast, crowdExcitement])

  const startRide = () => {
    if (!selectedBull || !selectedRider) {
      toast({
        title: "Selection Required",
        description: "Please select both a bull and a rider before starting.",
        variant: "destructive",
      })
      return
    }

    setRideTime(0)
    setRideScore(0)
    setMarketEvents([])
    setCurrentEvent(null)
    setBullMovement({ x: 0, y: 0, rotation: 0 })
    setRiderPosition({ x: 0, y: 0, rotation: 0 })
    setSpecialMoveCounter(0)
    setShowSpecialMove(false)
    setCrowdExcitement(50)

    // Start with a preparation phase
    setGameState("preparing")

    // Countdown animation
    toast({
      title: "Get Ready!",
      description: `${selectedRider.name} is preparing to ride ${selectedBull.name}!`,
    })

    setTimeout(() => {
      toast({
        title: "3",
        description: "The gate is about to open!",
      })
    }, 1000)

    setTimeout(() => {
      toast({
        title: "2",
        description: "Hold on tight!",
      })
    }, 2000)

    setTimeout(() => {
      toast({
        title: "1",
        description: "Here we go!",
      })
    }, 3000)

    setTimeout(() => {
      setGameState("riding")
      toast({
        title: "Ride Started!",
        description: `${selectedRider.name} is now riding ${selectedBull.name}!`,
      })
    }, 4000)
  }

  const resetGame = () => {
    setGameState("selecting")
    setSelectedBull(null)
    setSelectedRider(null)
    setRideTime(0)
    setRideScore(0)
    setMarketEvents([])
    setCurrentEvent(null)
    setBullMovement({ x: 0, y: 0, rotation: 0 })
    setRiderPosition({ x: 0, y: 0, rotation: 0 })
  }

  const updatePatentMetrics = () => {
    // Simulate patent metric changes
    setPatentMetrics({
      innovationIndex: Math.min(100, patentMetrics.innovationIndex + (Math.random() * 10 - 5)),
      marketImpact: Math.min(100, patentMetrics.marketImpact + (Math.random() * 10 - 5)),
      technicalComplexity: Math.min(100, patentMetrics.technicalComplexity + (Math.random() * 10 - 5)),
    })
  }

  return (
    <div className="space-y-6">
      {/* Game Arena - Only shown during active gameplay */}
      {(gameState === "riding" || gameState === "bucked" || gameState === "success" || gameState === "preparing") && (
        <div
          ref={arenaRef}
          className="relative w-full h-[400px] border-4 border-primary rounded-lg bg-accent/20 overflow-hidden"
        >
          {/* Arena background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-[300px] h-[300px] rounded-full border-8 border-dashed border-primary"></div>
          </div>

          {/* Crowd excitement meter */}
          <div className="absolute top-4 left-4 right-4 flex items-center gap-2">
            <span className="text-sm font-bold">Crowd</span>
            <Progress value={crowdExcitement} className="h-2 flex-1" />
            <span className="text-sm font-bold">{crowdExcitement}%</span>
          </div>

          {/* Bull and rider */}
          {selectedBull && selectedRider && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Bull */}
              <motion.div
                animate={{
                  x: bullMovement.x * 10,
                  y: bullMovement.y * 10,
                  rotate: bullMovement.rotation * 5,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="relative"
              >
                <div className="w-40 h-40 bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="text-2xl font-bold">{selectedBull.symbol}</div>
                </div>

                {/* Rider */}
                <motion.div
                  animate={{
                    x: riderPosition.x * 5,
                    y: riderPosition.y * 5,
                    rotate: riderPosition.rotation * 3,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center"
                >
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                    <div className="text-sm font-bold">{selectedRider.name.split(" ")[0]}</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}

          {/* Special move effect */}
          <AnimatePresence>
            {showSpecialMove && selectedBull && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="text-4xl font-bold text-primary bg-background/80 px-6 py-3 rounded-full">
                  {selectedBull.specialMove}!
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Market events */}
          <AnimatePresence>
            {currentEvent && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="absolute top-16 left-0 right-0 flex justify-center pointer-events-none"
              >
                <div className="bg-background/80 px-4 py-2 rounded-full text-sm font-bold">
                  {currentEvent.includes("positive") ||
                  currentEvent.includes("Bull Run") ||
                  currentEvent.includes("partnership") ||
                  currentEvent.includes("breakthrough") ? (
                    <span className="text-green-500 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" /> {currentEvent}
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center gap-2">
                      <TrendingDown className="h-4 w-4" /> {currentEvent}
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Game state overlays */}
          <AnimatePresence>
            {gameState === "preparing" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 flex items-center justify-center"
              >
                <div className="text-6xl font-bold text-white">GET READY!</div>
              </motion.div>
            )}

            {gameState === "bucked" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-red-500/50 flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-6xl font-bold text-white mb-4">BUCKED OFF!</div>
                  <Button onClick={resetGame} size="lg" variant="outline" className="bg-white">
                    Try Again
                  </Button>
                </div>
              </motion.div>
            )}

            {gameState === "success" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-green-500/50 flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-6xl font-bold text-white mb-4">SUCCESS!</div>
                  <div className="text-2xl font-bold text-white mb-6">Score: {rideScore}</div>
                  <Button onClick={resetGame} size="lg" variant="outline" className="bg-white">
                    Ride Again
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* HUD - Score and time */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <div className="bg-background/80 px-4 py-2 rounded-full flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="text-xl font-bold">{rideTime.toFixed(1)}s</span>
            </div>

            <div className="bg-background/80 px-4 py-2 rounded-full flex items-center gap-2">
              <Award className="h-5 w-5" />
              <span className="text-xl font-bold">{rideScore}</span>
            </div>

            {/* Special move meter */}
            {gameState === "riding" && (
              <div
                className="bg-background/80 px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer"
                onClick={triggerSpecialMove}
              >
                <Zap className={`h-5 w-5 ${specialMoveCounter >= 3 ? "text-yellow-500" : "text-gray-400"}`} />
                <div className="w-20 h-2 bg-gray-300 rounded-full">
                  <div
                    className="h-full bg-yellow-500 rounded-full"
                    style={{ width: `${(specialMoveCounter / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Patent Metrics and Current Ride */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Patent Metrics</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Innovation Index</span>
                  <span>{patentMetrics.innovationIndex.toFixed(1)}%</span>
                </div>
                <Progress value={patentMetrics.innovationIndex} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Market Impact</span>
                  <span>{patentMetrics.marketImpact.toFixed(1)}%</span>
                </div>
                <Progress value={patentMetrics.marketImpact} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Technical Complexity</span>
                  <span>{patentMetrics.technicalComplexity.toFixed(1)}%</span>
                </div>
                <Progress value={patentMetrics.technicalComplexity} className="h-2" />
              </div>

              <Button onClick={updatePatentMetrics} className="w-full">
                Update Patent Metrics
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Current Ride</h3>
            {gameState === "riding" || gameState === "bucked" || gameState === "success" ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{selectedRider?.name}</p>
                    <p className="text-sm text-muted-foreground">riding</p>
                    <p className="font-medium">{selectedBull?.name}</p>
                  </div>
                  <div className="text-center">
                    <Clock className="h-8 w-8 mx-auto text-primary" />
                    <p className="text-2xl font-bold">{rideTime.toFixed(1)}s</p>
                  </div>
                  <div className="text-center">
                    <Award className="h-8 w-8 mx-auto text-primary" />
                    <p className="text-2xl font-bold">{rideScore}</p>
                  </div>
                </div>

                <Progress value={(rideTime / 8) * 100} className="h-2" />

                {/* Market events log */}
                {marketEvents.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Market Events:</h4>
                    <div className="max-h-[100px] overflow-y-auto space-y-1">
                      {marketEvents.map((event, index) => (
                        <div key={index} className="text-sm flex items-center gap-1">
                          {event.includes("positive") ||
                          event.includes("Bull Run") ||
                          event.includes("partnership") ||
                          event.includes("breakthrough") ? (
                            <TrendingUp className="h-3 w-3 text-green-500 flex-shrink-0" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-500 flex-shrink-0" />
                          )}
                          <span>{event}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : gameState === "preparing" ? (
              <div className="flex flex-col items-center justify-center h-[200px]">
                <div className="text-3xl font-bold animate-pulse">Get Ready!</div>
                <p className="text-muted-foreground mt-2">The gate is about to open...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center items-center h-32">
                  {selectedBull && selectedRider ? (
                    <div className="text-center">
                      <p className="font-medium">
                        {selectedRider.name} is ready to ride {selectedBull.name}
                      </p>
                      <Button onClick={startRide} className="mt-4">
                        Start Ride
                      </Button>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Select a bull and rider to begin</p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bull and Rider Selection - Only shown during selection phase */}
      {gameState === "selecting" && (
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold mb-4">Select a Bull</h3>
            <div className="space-y-4">
              {bulls.map((bull) => (
                <div
                  key={bull.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedBull?.id === bull.id ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setSelectedBull(bull)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{bull.name}</h4>
                      <p className="text-sm text-muted-foreground">{bull.symbol}</p>
                    </div>
                    <div
                      className="px-2 py-1 rounded-full text-xs"
                      style={{ backgroundColor: `${bull.color}20`, color: bull.color }}
                    >
                      ${bull.currentValue.toLocaleString()}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Difficulty</p>
                      <p className="font-medium">{bull.difficulty.toFixed(0)}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Volatility</p>
                      <p className="font-medium">{bull.volatility.toFixed(0)}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Strength</p>
                      <p className="font-medium">{bull.strength.toFixed(0)}%</p>
                    </div>
                  </div>

                  <div className="mt-4 h-20">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={bull.priceHistory}>
                        <Line type="monotone" dataKey="price" stroke={bull.color} strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {bull.specialMove && (
                    <div className="mt-2 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Special: {bull.specialMove}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Select a Rider</h3>
            <div className="space-y-4">
              {riders.map((rider) => (
                <div
                  key={rider.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedRider?.id === rider.id ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setSelectedRider(rider)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{rider.name}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">{rider.experience} XP</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Skill</p>
                      <p className="font-medium">{rider.skill}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Stamina</p>
                      <p className="font-medium">{rider.stamina}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Balance</p>
                      <p className="font-medium">{rider.balance}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="border-t pt-6">
        <h3 className="text-xl font-bold mb-4">Leaderboard</h3>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-2 text-left">Rank</th>
                <th className="px-4 py-2 text-left">Rider</th>
                <th className="px-4 py-2 text-left">Bull</th>
                <th className="px-4 py-2 text-right">Time</th>
                <th className="px-4 py-2 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {/* Combine historical and current ride data */}
              {[
                ...rideHistory,
                { rider: "Crypto Cowboy", bull: "Bitcoin Bull", time: 7.8, score: 156 },
                { rider: "Blockchain Bronco", bull: "Solana Stampede", time: 6.5, score: 143 },
                { rider: "Crypto Cowboy", bull: "Solana Stampede", time: 5.2, score: 118 },
              ]
                .sort((a, b) => b.score - a.score)
                .slice(0, 5)
                .map((entry, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{entry.rider}</td>
                    <td className="px-4 py-2">{entry.bull}</td>
                    <td className="px-4 py-2 text-right">{entry.time.toFixed(1)}s</td>
                    <td className="px-4 py-2 text-right">{entry.score}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Game instructions */}
      <div className="border-t pt-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          <h3 className="text-xl font-bold">How to Play</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">1. Select Your Bull & Rider</h4>
            <p className="text-sm text-muted-foreground">
              Choose a cryptocurrency bull and a skilled rider to match your strategy.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">2. Ride the Market Volatility</h4>
            <p className="text-sm text-muted-foreground">
              Stay on as long as possible while market events affect your ride.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">3. Use Special Moves</h4>
            <p className="text-sm text-muted-foreground">
              Activate special moves when the meter is full to boost your score.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
