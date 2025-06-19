"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { LineChart, Line, ResponsiveContainer } from "recharts"
import { Clock, Award } from "lucide-react"

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
}

type Rider = {
  id: string
  name: string
  skill: number
  stamina: number
  balance: number
  experience: number
}

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
  },
  {
    id: "rider-2",
    name: "Blockchain Bronco",
    skill: 85,
    stamina: 65,
    balance: 80,
    experience: 0,
  },
]

export function DigitalRodeo() {
  const [riders, setRiders] = useState<Rider[]>(initialRiders)
  const [selectedBull, setSelectedBull] = useState<Bull | null>(null)
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null)
  const [rideInProgress, setRideInProgress] = useState(false)
  const [rideTime, setRideTime] = useState(0)
  const [rideScore, setRideScore] = useState(0)
  const [patentMetrics, setPatentMetrics] = useState({
    innovationIndex: 85,
    marketImpact: 72,
    technicalComplexity: 90,
  })
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

  // Update bull values based on patent metrics
  useEffect(() => {
    // Only update bulls when patent metrics change, not on every render
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
  }, [patentMetrics]) // Remove rideInProgress from dependencies

  // Simulate the ride
  useEffect(() => {
    if (rideInProgress && selectedBull && selectedRider) {
      const interval = setInterval(() => {
        setRideTime((prev) => {
          const newTime = prev + 0.1

          // Calculate ride score based on time, bull difficulty, and rider skill
          const baseScore = newTime * 10
          const difficultyBonus = (selectedBull.difficulty / 100) * baseScore
          const skillMultiplier = selectedRider.skill / 50

          const newScore = Math.round(baseScore + difficultyBonus) * skillMultiplier
          setRideScore(Math.round(newScore))

          // Check if ride should end
          const riderEndurance = (selectedRider.stamina / 100) * 8 // Max seconds based on stamina
          const bullDifficulty = ((selectedBull.difficulty / 100) * selectedBull.volatility) / 100
          const maxRideTime = riderEndurance / bullDifficulty

          if (newTime >= maxRideTime) {
            clearInterval(interval)
            setRideInProgress(false)

            // Update rider experience
            setRiders((prev) =>
              prev.map((rider) =>
                rider.id === selectedRider.id
                  ? { ...rider, experience: rider.experience + Math.round(newScore) }
                  : rider,
              ),
            )

            toast({
              title: "Ride Complete!",
              description: `${selectedRider.name} scored ${Math.round(newScore)} points riding ${selectedBull.name}!`,
            })
          }

          return newTime
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [rideInProgress, selectedBull, selectedRider, toast])

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
    setRideInProgress(true)

    toast({
      title: "Ride Started",
      description: `${selectedRider.name} is now riding ${selectedBull.name}!`,
    })
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
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Patent Metrics</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Innovation Index</span>
                  <span>{patentMetrics.innovationIndex}%</span>
                </div>
                <Progress value={patentMetrics.innovationIndex} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Market Impact</span>
                  <span>{patentMetrics.marketImpact}%</span>
                </div>
                <Progress value={patentMetrics.marketImpact} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Technical Complexity</span>
                  <span>{patentMetrics.technicalComplexity}%</span>
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
            {rideInProgress ? (
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

                <div className="flex justify-center">
                  <p className="text-sm text-muted-foreground">
                    {selectedRider?.name} is holding on tight as {selectedBull?.name} bucks wildly!
                  </p>
                </div>
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
                    <p className="font-medium">{bull.difficulty}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Volatility</p>
                    <p className="font-medium">{bull.volatility}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Strength</p>
                    <p className="font-medium">{bull.strength}%</p>
                  </div>
                </div>

                <div className="mt-4 h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={bull.priceHistory}>
                      <Line type="monotone" dataKey="price" stroke={bull.color} strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
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
              <tr className="border-t">
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">Crypto Cowboy</td>
                <td className="px-4 py-2">Bitcoin Bull</td>
                <td className="px-4 py-2 text-right">7.8s</td>
                <td className="px-4 py-2 text-right">156</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">Blockchain Bronco</td>
                <td className="px-4 py-2">Solana Stampede</td>
                <td className="px-4 py-2 text-right">6.5s</td>
                <td className="px-4 py-2 text-right">143</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">3</td>
                <td className="px-4 py-2">Crypto Cowboy</td>
                <td className="px-4 py-2">Solana Stampede</td>
                <td className="px-4 py-2 text-right">5.2s</td>
                <td className="px-4 py-2 text-right">118</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
