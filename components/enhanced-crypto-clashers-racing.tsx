"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Flag, Coins, Volume2, VolumeX, Zap, Timer } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useFrontierAudio } from "@/lib/frontier-audio-system"

interface RaceCar {
  id: string
  name: string
  driver: string
  speed: number
  acceleration: number
  handling: number
  image: string
  color: string
  specialAbility: string
}

interface RaceState {
  cars: RaceCar[]
  playerCar: RaceCar
  raceProgress: number
  lap: number
  totalLaps: number
  isRacing: boolean
  raceTime: number
  position: number
  tokensEarned: number
  boost: number
}

const RACE_CARS: RaceCar[] = [
  {
    id: "crypto-wolf",
    name: "Crypto Wolf Racer",
    driver: "Alpha Wolf",
    speed: 85,
    acceleration: 90,
    handling: 80,
    image: "/images/crypto-clashers-racing-poster.png",
    color: "#3B82F6",
    specialAbility: "Pack Boost",
  },
  {
    id: "bitcoin-bull",
    name: "Bitcoin Bull Speedster",
    driver: "Bull Market",
    speed: 95,
    acceleration: 75,
    handling: 70,
    image: "/images/pink-race-car.png",
    color: "#F59E0B",
    specialAbility: "Lightning Strike",
  },
  {
    id: "ethereum-eagle",
    name: "Ethereum Eagle",
    driver: "Smart Contract",
    speed: 80,
    acceleration: 85,
    handling: 95,
    image: "/images/race-winner.png",
    color: "#10B981",
    specialAbility: "Gas Optimization",
  },
]

export function EnhancedCryptoClashersRacing() {
  const [raceState, setRaceState] = useState<RaceState>({
    cars: RACE_CARS,
    playerCar: RACE_CARS[0],
    raceProgress: 0,
    lap: 1,
    totalLaps: 3,
    isRacing: false,
    raceTime: 0,
    position: 1,
    tokensEarned: 0,
    boost: 100,
  })

  const [soundEnabled, setSoundEnabled] = useState(true)
  const [volume, setVolume] = useState(0.7)
  const [raceStarted, setRaceStarted] = useState(false)
  const raceIntervalRef = useRef<NodeJS.Timeout>()
  const timeIntervalRef = useRef<NodeJS.Timeout>()
  const { toast } = useToast()
  const { playSuccess, playWarning, playCoinDrop } = useFrontierAudio()

  // Sound effects
  const playEngineSound = () => {
    if (soundEnabled) {
      const audio = new Audio("/sounds/race-engine.mp3")
      audio.volume = volume
      audio.loop = true
      audio.play().catch(() => {})
    }
  }

  const playBoostSound = () => {
    if (soundEnabled) {
      const audio = new Audio("/sounds/boost-sound.mp3")
      audio.volume = volume
      audio.play().catch(() => {})
    }
  }

  const playFinishSound = () => {
    if (soundEnabled) {
      playSuccess()
    }
  }

  const startRace = () => {
    setRaceStarted(true)
    setRaceState((prev) => ({
      ...prev,
      isRacing: true,
      raceProgress: 0,
      lap: 1,
      raceTime: 0,
      position: Math.floor(Math.random() * 3) + 1, // Random starting position
      boost: 100,
    }))

    playEngineSound()

    // Race simulation
    raceIntervalRef.current = setInterval(() => {
      setRaceState((prev) => {
        const speedFactor = (prev.playerCar.speed + prev.playerCar.acceleration) / 200
        const progressIncrement = speedFactor * (1 + Math.random() * 0.5)
        const newProgress = Math.min(prev.raceProgress + progressIncrement, 100)

        // Lap completion
        if (newProgress >= 100 && prev.lap < prev.totalLaps) {
          return {
            ...prev,
            raceProgress: 0,
            lap: prev.lap + 1,
            position: Math.max(1, prev.position + (Math.random() > 0.6 ? -1 : Math.random() > 0.3 ? 0 : 1)),
          }
        }

        // Race completion
        if (newProgress >= 100 && prev.lap >= prev.totalLaps) {
          handleRaceFinish(prev.position, prev.raceTime)
          return { ...prev, raceProgress: 100, isRacing: false }
        }

        return {
          ...prev,
          raceProgress: newProgress,
          position: Math.max(
            1,
            Math.min(8, prev.position + (Math.random() > 0.7 ? (Math.random() > 0.5 ? -1 : 1) : 0)),
          ),
        }
      })
    }, 100)

    // Timer
    timeIntervalRef.current = setInterval(() => {
      setRaceState((prev) => ({ ...prev, raceTime: prev.raceTime + 0.1 }))
    }, 100)
  }

  const useBoost = () => {
    if (raceState.boost > 20 && raceState.isRacing) {
      playBoostSound()
      setRaceState((prev) => ({
        ...prev,
        boost: prev.boost - 25,
        raceProgress: Math.min(prev.raceProgress + 10, 100),
      }))

      toast({
        title: "🚀 BOOST ACTIVATED!",
        description: `${raceState.playerCar.specialAbility} engaged!`,
        duration: 1500,
      })
    }
  }

  const handleRaceFinish = async (finalPosition: number, finalTime: number) => {
    if (raceIntervalRef.current) clearInterval(raceIntervalRef.current)
    if (timeIntervalRef.current) clearInterval(timeIntervalRef.current)

    const baseTokens = 100
    const positionBonus = Math.max(0, (4 - finalPosition) * 50)
    const timeBonus = finalTime < 30 ? 100 : finalTime < 45 ? 50 : 0
    const tokensWon = baseTokens + positionBonus + timeBonus

    setRaceState((prev) => ({
      ...prev,
      tokensEarned: prev.tokensEarned + tokensWon,
    }))

    playFinishSound()
    playCoinDrop()

    const resultMessage =
      finalPosition === 1 ? "🏆 VICTORY!" : finalPosition <= 3 ? "🥉 PODIUM FINISH!" : "🏁 RACE COMPLETE!"

    toast({
      title: resultMessage,
      description: `Position: ${finalPosition} | Time: ${finalTime.toFixed(1)}s | Earned: ${tokensWon} STONES`,
      duration: 4000,
    })

    // Mint race NFT
    await mintRaceNFT(finalPosition, finalTime, tokensWon)
  }

  const mintRaceNFT = async (position: number, time: number, tokens: number) => {
    try {
      const response = await fetch("/api/nft/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "racing_result",
          car: raceState.playerCar.name,
          driver: raceState.playerCar.driver,
          position,
          time,
          tokensEarned: tokens,
          timestamp: Date.now(),
        }),
      })

      const result = await response.json()
      if (result.success) {
        toast({
          title: "🏁 RACE NFT MINTED!",
          description: `Race result NFT created: ${result.nftId}`,
          duration: 2000,
        })
      }
    } catch (error) {
      console.error("NFT minting failed:", error)
    }
  }

  const selectCar = (car: RaceCar) => {
    if (!raceState.isRacing) {
      setRaceState((prev) => ({ ...prev, playerCar: car }))
    }
  }

  const resetRace = () => {
    if (raceIntervalRef.current) clearInterval(raceIntervalRef.current)
    if (timeIntervalRef.current) clearInterval(timeIntervalRef.current)

    setRaceStarted(false)
    setRaceState((prev) => ({
      ...prev,
      isRacing: false,
      raceProgress: 0,
      lap: 1,
      raceTime: 0,
      position: 1,
      boost: 100,
    }))
  }

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
  }

  useEffect(() => {
    // Boost regeneration
    const boostInterval = setInterval(() => {
      setRaceState((prev) => ({
        ...prev,
        boost: Math.min(100, prev.boost + 2),
      }))
    }, 1000)

    return () => {
      clearInterval(boostInterval)
      if (raceIntervalRef.current) clearInterval(raceIntervalRef.current)
      if (timeIntervalRef.current) clearInterval(timeIntervalRef.current)
    }
  }, [])

  return (
    <div className="newspaper-bg min-h-screen p-6">
      <Card className="border-4 border-black shadow-lg max-w-6xl mx-auto newspaper-article">
        <CardHeader className="border-b-2 border-black bg-blue-900 text-white newspaper-article-inner">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-3xl font-serif headline-primary text-white">
                🏁 CRYPTO CLASHERS RACING CIRCUIT 🏁
              </CardTitle>
              <CardDescription className="text-lg font-serif text-gray-200">
                High-Speed Digital Frontier Racing Championship
              </CardDescription>
            </div>
            <div className="flex gap-2 items-center">
              <Button variant="ghost" size="sm" onClick={toggleSound} className="text-white hover:bg-white/20">
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
                className="w-20"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 newspaper-article-inner">
          {/* Race Stats */}
          <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-4">
            <div className="flex gap-4">
              <Badge variant="outline" className="text-lg px-3 py-1 border-black">
                Lap {raceState.lap}/{raceState.totalLaps}
              </Badge>
              <Badge variant="outline" className="text-lg px-3 py-1 border-black">
                Position: #{raceState.position}
              </Badge>
              <Badge variant="outline" className="text-lg px-3 py-1 border-black">
                <Timer className="h-4 w-4 mr-1" />
                {raceState.raceTime.toFixed(1)}s
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-500" />
              <span className="font-mono text-xl">{raceState.tokensEarned} STONES</span>
            </div>
          </div>

          {/* Car Selection */}
          {!raceStarted && (
            <div className="mb-6 border-4 border-black p-4">
              <h3 className="text-xl font-serif headline-secondary mb-4 text-center">Choose Your Race Car</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {RACE_CARS.map((car) => (
                  <div
                    key={car.id}
                    className={`border-2 p-4 rounded cursor-pointer transition-all ${
                      raceState.playerCar.id === car.id
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                    onClick={() => selectCar(car)}
                  >
                    <img
                      src={car.image || "/placeholder.svg"}
                      alt={car.name}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <h4 className="font-serif font-bold">{car.name}</h4>
                    <p className="text-sm font-serif text-gray-600 mb-2">Driver: {car.driver}</p>
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span>Speed:</span>
                        <span>{car.speed}/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Acceleration:</span>
                        <span>{car.acceleration}/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Handling:</span>
                        <span>{car.handling}/100</span>
                      </div>
                      <div className="text-purple-600 font-bold text-center mt-2">⚡ {car.specialAbility}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Race Track */}
          {raceStarted && (
            <div className="mb-6 border-4 border-black p-4 bg-gray-100">
              <div className="relative h-32 bg-gray-800 rounded-lg overflow-hidden">
                {/* Track */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-yellow-400 transform -translate-y-1/2"></div>
                </div>

                {/* Player Car */}
                <div
                  className="absolute top-1/2 w-12 h-8 transform -translate-y-1/2 transition-all duration-100"
                  style={{
                    left: `${raceState.raceProgress}%`,
                    backgroundColor: raceState.playerCar.color,
                  }}
                >
                  <div className="w-full h-full rounded-lg flex items-center justify-center text-white text-xs font-bold">
                    🏎️
                  </div>
                </div>

                {/* Finish Line */}
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-black bg-opacity-50 flex items-center justify-center">
                  <Flag className="h-6 w-6 text-yellow-400" />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm font-serif mb-2">
                  <span>Race Progress</span>
                  <span>{raceState.raceProgress.toFixed(1)}%</span>
                </div>
                <Progress value={raceState.raceProgress} className="h-4 border border-black" />
              </div>

              {/* Boost Meter */}
              <div className="mt-4">
                <div className="flex justify-between text-sm font-serif mb-2">
                  <span>Boost Energy</span>
                  <span>{raceState.boost.toFixed(0)}%</span>
                </div>
                <Progress value={raceState.boost} className="h-3 border border-black" />
              </div>
            </div>
          )}

          {/* Race Controls */}
          <div className="text-center space-y-4">
            {!raceStarted ? (
              <Button
                onClick={startRace}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-serif text-xl px-8 py-4"
              >
                <Flag className="mr-2 h-5 w-5" />
                START RACE!
              </Button>
            ) : (
              <div className="flex justify-center gap-4">
                <Button
                  onClick={useBoost}
                  disabled={raceState.boost < 20 || !raceState.isRacing}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-serif px-6 py-3"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  BOOST! ({raceState.boost.toFixed(0)}%)
                </Button>
                <Button onClick={resetRace} variant="outline" className="border-black font-serif px-6 py-3">
                  🔄 RESET RACE
                </Button>
              </div>
            )}
          </div>

          {/* Race Instructions */}
          <div className="text-center text-sm text-muted-foreground mt-6 font-serif border-t-2 border-black pt-4">
            <p>🏁 Race 3 laps around the digital frontier circuit! Use boost strategically to gain advantage.</p>
            <p className="mt-2">
              🏆 Earn STONES tokens based on finishing position and race time • Mint race result NFTs
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
