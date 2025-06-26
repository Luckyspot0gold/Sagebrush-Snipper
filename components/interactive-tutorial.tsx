"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play } from "lucide-react"

export function InteractiveTutorial() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  const tutorials = [
    {
      id: "boxing",
      title: "🥊 Crypto Clashers Boxing",
      description: "Learn to fight and stake crypto in our boxing arena",
      difficulty: "Beginner",
      duration: "5 min",
      rewards: "100 Frontier Coins",
    },
    {
      id: "trading",
      title: "💰 Frontier Trading Post",
      description: "Master the art of frontier commerce and market trading",
      difficulty: "Intermediate",
      duration: "8 min",
      rewards: "Trading License",
    },
    {
      id: "social",
      title: "🤝 Social Capital System",
      description: "Convert your online influence into valuable land deeds",
      difficulty: "Advanced",
      duration: "10 min",
      rewards: "Pioneer Badge",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card className="border-4 border-black">
        <CardHeader className="bg-blue-100 border-b-2 border-black">
          <CardTitle className="text-center font-serif text-2xl">📚 FRONTIER ACADEMY - INTERACTIVE TUTORIALS</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tutorials.map((tutorial) => (
              <Card key={tutorial.id} className="border-2 border-black">
                <CardHeader className="bg-yellow-50">
                  <CardTitle className="font-serif text-lg">{tutorial.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="font-serif text-sm mb-4">{tutorial.description}</p>
                  <div className="flex gap-2 mb-4">
                    <Badge variant="outline">{tutorial.difficulty}</Badge>
                    <Badge variant="outline">{tutorial.duration}</Badge>
                  </div>
                  <div className="text-sm font-serif mb-4">
                    <strong>Reward:</strong> {tutorial.rewards}
                  </div>
                  <Button onClick={() => setActiveDemo(tutorial.id)} className="w-full frontier-button font-serif">
                    <Play className="mr-2 h-4 w-4" />
                    Start Tutorial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Start Guide */}
      <Card className="border-4 border-black">
        <CardHeader className="bg-green-100 border-b-2 border-black">
          <CardTitle className="font-serif text-xl">🚀 QUICK START GUIDE</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-4xl mb-2">1️⃣</div>
              <h3 className="font-serif font-bold">Connect Wallet</h3>
              <p className="text-sm font-serif">Link your crypto wallet</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">2️⃣</div>
              <h3 className="font-serif font-bold">Choose Game</h3>
              <p className="text-sm font-serif">Pick boxing, racing, or trading</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">3️⃣</div>
              <h3 className="font-serif font-bold">Start Playing</h3>
              <p className="text-sm font-serif">Earn coins and build reputation</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">4️⃣</div>
              <h3 className="font-serif font-bold">Claim Rewards</h3>
              <p className="text-sm font-serif">Convert success to land value</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
