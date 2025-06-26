"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Smile } from "lucide-react"
import Image from "next/image"

interface KidsRacer {
  id: string
  name: string
  animal: string
  color: string
  image: string
  speed: number
  cuteness: number
  special: string
}

const KIDS_RACERS: KidsRacer[] = [
  {
    id: "rainbow-pony",
    name: "Rainbow Dash",
    animal: "Pony",
    color: "Rainbow",
    image: "/images/crypto-classic.png",
    speed: 8,
    cuteness: 10,
    special: "Rainbow Trail",
  },
  {
    id: "speedy-bunny",
    name: "Speedy Bunny",
    animal: "Rabbit",
    color: "Pink",
    image: "/images/pink-race-car.png",
    speed: 9,
    cuteness: 9,
    special: "Carrot Boost",
  },
  {
    id: "turbo-turtle",
    name: "Turbo Turtle",
    animal: "Turtle",
    color: "Green",
    image: "/images/race-winner.png",
    speed: 6,
    cuteness: 8,
    special: "Shell Shield",
  },
]

export function CryptocianKidsRacing() {
  const [selectedRacer, setSelectedRacer] = useState<KidsRacer>(KIDS_RACERS[0])
  const [raceState, setRaceState] = useState<"select" | "racing" | "finished">("select")
  const [raceProgress, setRaceProgress] = useState(0)
  const [position, setPosition] = useState(1)
  const [stars, setStars] = useState(0)

  const startKidsRace = () => {
    setRaceState("racing")
    setRaceProgress(0)
    setPosition(Math.floor(Math.random() * 3) + 1)

    // Animated race progression
    const interval = setInterval(() => {
      setRaceProgress((prev) => {
        if (prev >= 100) {
          setRaceState("finished")
          setStars(position <= 2 ? 3 : position === 3 ? 2 : 1)
          clearInterval(interval)
          return 100
        }
        return prev + selectedRacer.speed / 2
      })
    }, 200)
  }

  const resetRace = () => {
    setRaceState("select")
    setRaceProgress(0)
    setStars(0)
  }

  return (
    <div className="newspaper-article">
      <div className="newspaper-article-inner">
        <h2 className="newspaper-section-title">🌈 CRYPTOCIAN KIDS RACING 🌈</h2>
        <p className="newspaper-paragraph text-center">
          Fun and safe racing for young pioneers! Collect stars and have fun!
        </p>

        <Card className="border-4 border-pink-300 shadow-lg bg-gradient-to-br from-pink-50 to-purple-50">
          <CardHeader className="border-b-2 border-pink-300 bg-gradient-to-r from-pink-200 to-purple-200">
            <CardTitle className="text-2xl font-serif text-center text-purple-800">
              🎠 CRYPTOCIAN KIDS GRAND PRIX 🎠
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            {raceState === "select" && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-serif mb-4 text-purple-700">Choose Your Racing Friend!</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {KIDS_RACERS.map((racer) => (
                      <div
                        key={racer.id}
                        className={`border-3 p-4 rounded-lg cursor-pointer transition-all ${
                          selectedRacer.id === racer.id
                            ? "border-pink-400 bg-pink-100 shadow-lg"
                            : "border-purple-200 hover:border-purple-300 bg-white"
                        }`}
                        onClick={() => setSelectedRacer(racer)}
                      >
                        <div className="relative h-32 mb-3">
                          <Image
                            src={racer.image || "/placeholder.svg"}
                            alt={racer.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <h4 className="font-serif font-bold text-purple-700">{racer.name}</h4>
                        <p className="text-sm text-purple-600">
                          {racer.color} {racer.animal}
                        </p>
                        <div className="text-sm space-y-1 mt-2">
                          <div className="flex justify-between items-center">
                            <span>Speed:</span>
                            <div className="flex">
                              {[...Array(10)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < racer.speed ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Cuteness:</span>
                            <div className="flex">
                              {[...Array(10)].map((_, i) => (
                                <Heart
                                  key={i}
                                  className={`h-3 w-3 ${i < racer.cuteness ? "text-pink-400 fill-current" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="text-xs italic text-purple-500 mt-2">Special: {racer.special}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    onClick={startKidsRace}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-serif text-lg px-8 py-3 rounded-full"
                  >
                    🏁 Let's Race!
                  </Button>
                </div>
              </div>
            )}

            {raceState === "racing" && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-serif text-purple-700 mb-4">{selectedRacer.name} is Racing!</h3>
                </div>

                {/* Race Track */}
                <div className="bg-gradient-to-r from-green-200 to-blue-200 rounded-lg p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-blue-100 opacity-50"></div>
                  <div className="relative">
                    <div className="text-center text-2xl mb-4">🌈 Rainbow Speedway 🌈</div>
                    <div className="relative h-20 bg-white rounded-lg border-2 border-dashed border-purple-300">
                      <div
                        className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-200"
                        style={{ left: `${raceProgress}%` }}
                      >
                        <div className="relative">
                          <Image
                            src={selectedRacer.image || "/placeholder.svg"}
                            alt={selectedRacer.name}
                            width={40}
                            height={40}
                            className="rounded-full border-2 border-white"
                          />
                          <div className="absolute -top-2 -right-2 text-lg">✨</div>
                        </div>
                      </div>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">🏁</div>
                    </div>
                    <div className="text-center mt-2 text-purple-600">Progress: {Math.round(raceProgress)}%</div>
                  </div>
                </div>

                {/* Encouragement Messages */}
                <div className="text-center space-y-2">
                  <div className="text-lg font-serif text-purple-700">
                    {raceProgress < 25 && "🎉 Great start! Keep going!"}
                    {raceProgress >= 25 && raceProgress < 50 && "⭐ You're doing amazing!"}
                    {raceProgress >= 50 && raceProgress < 75 && "🌟 Almost there! So fast!"}
                    {raceProgress >= 75 && raceProgress < 100 && "🏆 Final stretch! You've got this!"}
                  </div>
                  <div className="flex justify-center">
                    <Smile className="h-8 w-8 text-yellow-400" />
                  </div>
                </div>
              </div>
            )}

            {raceState === "finished" && (
              <div className="text-center space-y-6">
                <div className="text-6xl">
                  {position === 1 ? "🥇" : position === 2 ? "🥈" : position === 3 ? "🥉" : "🏁"}
                </div>

                <h3 className="text-2xl font-serif text-purple-700">
                  {position === 1
                    ? "🎉 First Place! Amazing!"
                    : position === 2
                      ? "🌟 Second Place! Fantastic!"
                      : position === 3
                        ? "⭐ Third Place! Great job!"
                        : "🏁 You finished! Well done!"}
                </h3>

                <div className="space-y-3">
                  <div className="text-lg text-purple-600">
                    {selectedRacer.name} the {selectedRacer.animal} finished the race!
                  </div>

                  <div className="flex justify-center gap-1">
                    {[...Array(stars)].map((_, i) => (
                      <Star key={i} className="h-8 w-8 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <Badge className="bg-pink-500 text-white text-lg p-2">
                    🌟 You earned {stars} star{stars !== 1 ? "s" : ""}!
                  </Badge>

                  <div className="text-sm text-purple-500">Special move used: {selectedRacer.special}! ✨</div>
                </div>

                <Button
                  onClick={resetRace}
                  className="bg-pink-500 hover:bg-pink-600 text-white font-serif rounded-full"
                >
                  🔄 Race Again!
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
