"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Zap, Fuel, Timer } from "lucide-react"
import Image from "next/image"

interface RaceCar {
  id: string
  name: string
  driver: string
  image: string
  speed: number
  acceleration: number
  handling: number
  sponsor: string
  number: number
}

interface RaceStats {
  position: number
  lap: number
  totalLaps: number
  speed: number
  fuel: number
  damage: number
  timeElapsed: number
}

const STOCK_CARS: RaceCar[] = [
  {
    id: "crypto-thunder",
    name: "Crypto Thunder",
    driver: "Bull McKenzie",
    image: "/images/crypto-clashers-racing-poster.png",
    speed: 95,
    acceleration: 85,
    handling: 80,
    sponsor: "Bitcoin Motors",
    number: 21,
  },
  {
    id: "wyoming-wind",
    name: "Wyoming Wind",
    driver: "Prairie Pete",
    image: "/images/pink-race-car.png",
    speed: 88,
    acceleration: 92,
    handling: 90,
    sponsor: "Frontier Energy",
    number: 88,
  },
  {
    id: "digital-demon",
    name: "Digital Demon",
    driver: "Code Cowboy",
    image: "/images/race-winner.png",
    speed: 90,
    acceleration: 88,
    handling: 85,
    sponsor: "WyoVerse Tech",
    number: 99,
  },
]

export function StockcarRacingCircuit() {
  const [gameState, setGameState] = useState<"garage" | "racing" | "finished">("garage")
  const [selectedCar, setSelectedCar] = useState<RaceCar>(STOCK_CARS[0])
  const [raceStats, setRaceStats] = useState<RaceStats>({
    position: 1,
    lap: 1,
    totalLaps: 10,
    speed: 0,
    fuel: 100,
    damage: 0,
    timeElapsed: 0,
  })
  const [isRacing, setIsRacing] = useState(false)
  const [raceEvents, setRaceEvents] = useState<string[]>([])
  const raceInterval = useRef<NodeJS.Timeout | null>(null)

  const startRace = () => {
    setGameState("racing")
    setIsRacing(true)
    setRaceStats({
      position: Math.floor(Math.random() * 8) + 1,
      lap: 1,
      totalLaps: 10,
      speed: 0,
      fuel: 100,
      damage: 0,
      timeElapsed: 0,
    })
    setRaceEvents([`🏁 ${selectedCar.name} #${selectedCar.number} enters the track!`])

    // Start race simulation
    raceInterval.current = setInterval(() => {
      setRaceStats((prev) => {
        const newStats = { ...prev }

        // Simulate racing dynamics
        const baseSpeed = selectedCar.speed + (Math.random() - 0.5) * 20
        newStats.speed = Math.max(0, Math.min(200, baseSpeed))
        newStats.timeElapsed += 1
        newStats.fuel = Math.max(0, prev.fuel - 0.5)

        // Random events
        if (Math.random() < 0.1) {
          const events = [
            "🏎️ Perfect turn! Gained position!",
            "⚡ Nitro boost activated!",
            "🛞 Tire wear detected",
            "🏁 Clean racing line",
            "💨 Slipstream advantage!",
          ]
          setRaceEvents((prev) => [...prev, events[Math.floor(Math.random() * events.length)]])

          if (Math.random() < 0.3) {
            newStats.position = Math.max(1, prev.position - 1)
          }
        }

        // Lap progression
        if (newStats.timeElapsed % 30 === 0 && newStats.lap < newStats.totalLaps) {
          newStats.lap += 1
          setRaceEvents((prev) => [...prev, `🏁 Lap ${newStats.lap} completed!`])
        }

        // Race finish
        if (newStats.lap >= newStats.totalLaps) {
          setIsRacing(false)
          setGameState("finished")
          if (raceInterval.current) {
            clearInterval(raceInterval.current)
          }
        }

        return newStats
      })
    }, 1000)
  }

  const useNitro = () => {
    if (raceStats.fuel > 20) {
      setRaceStats((prev) => ({
        ...prev,
        speed: Math.min(220, prev.speed + 30),
        fuel: prev.fuel - 20,
      }))
      setRaceEvents((prev) => [...prev, "🔥 NITRO BOOST! Speed increased!"])
    }
  }

  const pitStop = () => {
    setRaceStats((prev) => ({
      ...prev,
      fuel: 100,
      damage: 0,
      position: Math.min(8, prev.position + 2), // Lose positions during pit stop
    }))
    setRaceEvents((prev) => [...prev, "🔧 Pit stop complete! Refueled and repaired!"])
  }

  const resetRace = () => {
    setGameState("garage")
    setIsRacing(false)
    setRaceEvents([])
    if (raceInterval.current) {
      clearInterval(raceInterval.current)
    }
  }

  useEffect(() => {
    return () => {
      if (raceInterval.current) {
        clearInterval(raceInterval.current)
      }
    }
  }, [])

  return (
    <div className="newspaper-article">
      <div className="newspaper-article-inner">
        <h2 className="newspaper-section-title">🏁 STOCKCAR RACING CIRCUIT 🏁</h2>
        <p className="newspaper-paragraph text-center">
          High-speed thrills on the Wyoming Speedway - Where horsepower meets the frontier!
        </p>

        <Card className="border-4 border-black shadow-lg">
          <CardHeader className="border-b-2 border-black bg-gradient-to-r from-blue-900 to-red-900 text-white">
            <CardTitle className="text-2xl font-serif text-center">WYOMING SPEEDWAY CHAMPIONSHIP</CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            {gameState === "garage" && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-serif mb-4">Choose Your Stock Car</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {STOCK_CARS.map((car) => (
                      <div
                        key={car.id}
                        className={`border-2 p-4 rounded cursor-pointer transition-all ${
                          selectedCar.id === car.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-gray-500"
                        }`}
                        onClick={() => setSelectedCar(car)}
                      >
                        <div className="relative h-32 mb-2">
                          <Image
                            src={car.image || "/placeholder.svg"}
                            alt={car.name}
                            fill
                            className="object-cover rounded"
                          />
                          <div className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                            {car.number}
                          </div>
                        </div>
                        <h4 className="font-serif font-bold">{car.name}</h4>
                        <p className="text-sm text-gray-600">Driver: {car.driver}</p>
                        <p className="text-xs text-gray-500">Sponsor: {car.sponsor}</p>
                        <div className="text-sm space-y-1 mt-2">
                          <div className="flex justify-between">
                            <span>Speed:</span>
                            <span>{car.speed}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Acceleration:</span>
                            <span>{car.acceleration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Handling:</span>
                            <span>{car.handling}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <Button onClick={startRace} className="frontier-button font-serif text-lg px-8 py-3">
                    🏁 Start Your Engines!
                  </Button>
                </div>
              </div>
            )}

            {gameState === "racing" && (
              <div className="space-y-6">
                {/* Race Dashboard */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-100 rounded">
                    <Trophy className="h-6 w-6 mx-auto mb-1" />
                    <div className="font-bold">Position</div>
                    <div className="text-2xl">{raceStats.position}</div>
                  </div>
                  <div className="text-center p-3 bg-green-100 rounded">
                    <Timer className="h-6 w-6 mx-auto mb-1" />
                    <div className="font-bold">Lap</div>
                    <div className="text-2xl">
                      {raceStats.lap}/{raceStats.totalLaps}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-yellow-100 rounded">
                    <Zap className="h-6 w-6 mx-auto mb-1" />
                    <div className="font-bold">Speed</div>
                    <div className="text-2xl">{Math.round(raceStats.speed)} mph</div>
                  </div>
                  <div className="text-center p-3 bg-red-100 rounded">
                    <Fuel className="h-6 w-6 mx-auto mb-1" />
                    <div className="font-bold">Fuel</div>
                    <div className="text-2xl">{Math.round(raceStats.fuel)}%</div>
                  </div>
                </div>

                {/* Race Track Visualization */}
                <div className="bg-gray-800 rounded-lg p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900"></div>
                  <div className="relative text-center">
                    <div className="text-white text-2xl mb-4">🏁 WYOMING SPEEDWAY 🏁</div>
                    <div className="relative h-32">
                      <Image
                        src={selectedCar.image || "/placeholder.svg"}
                        alt={selectedCar.name}
                        width={64}
                        height={64}
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded"
                        style={{
                          transform: `translateX(-50%) translateY(-50%) translateX(${(raceStats.speed / 200) * 100}px)`,
                        }}
                      />
                    </div>
                    <div className="text-white text-sm">
                      {selectedCar.name} #{selectedCar.number} - {selectedCar.driver}
                    </div>
                  </div>
                </div>

                {/* Race Controls */}
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={useNitro}
                    disabled={raceStats.fuel < 20}
                    className="frontier-button bg-orange-600 hover:bg-orange-700"
                  >
                    🔥 Nitro Boost
                  </Button>
                  <Button onClick={pitStop} className="frontier-button bg-blue-600 hover:bg-blue-700">
                    🔧 Pit Stop
                  </Button>
                </div>

                {/* Fuel and Damage Bars */}
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Fuel</span>
                      <span>{Math.round(raceStats.fuel)}%</span>
                    </div>
                    <Progress value={raceStats.fuel} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Car Condition</span>
                      <span>{100 - raceStats.damage}%</span>
                    </div>
                    <Progress value={100 - raceStats.damage} className="h-2" />
                  </div>
                </div>

                {/* Race Events Log */}
                <div className="bg-gray-100 rounded p-4 h-32 overflow-y-auto">
                  <h4 className="font-serif font-bold mb-2">Race Commentary:</h4>
                  {raceEvents.slice(-5).map((event, index) => (
                    <div key={index} className="text-sm font-serif mb-1">
                      {event}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {gameState === "finished" && (
              <div className="text-center space-y-6">
                <div className={`text-6xl ${raceStats.position <= 3 ? "text-yellow-500" : "text-gray-500"}`}>
                  {raceStats.position <= 3 ? "🏆" : "🏁"}
                </div>

                <h3 className="text-2xl font-serif">Race Finished! Position: {raceStats.position}</h3>

                <div className="space-y-2">
                  <div className="text-lg">
                    {selectedCar.name} #{selectedCar.number}
                  </div>
                  <div className="text-sm text-gray-600">Driver: {selectedCar.driver}</div>
                  <div className="text-sm text-gray-600">
                    Time: {Math.floor(raceStats.timeElapsed / 60)}:
                    {(raceStats.timeElapsed % 60).toString().padStart(2, "0")}
                  </div>

                  {raceStats.position <= 3 && (
                    <Badge variant="default" className="text-lg p-2">
                      🏆 Podium Finish! Prize Money Earned!
                    </Badge>
                  )}
                </div>

                <Button onClick={resetRace} className="frontier-button font-serif">
                  🔄 Race Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
