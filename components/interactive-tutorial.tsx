"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Trophy, Clock, Star } from "lucide-react"
import { useFrontierSounds } from "@/lib/frontier-sounds"

export function InteractiveTutorial() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)
  const { playPaperRustle, playCoinDrop } = useFrontierSounds()

  const tutorials = [
    {
      id: "boxing",
      title: "🥊 Crypto Clashers Boxing Arena",
      description: "Master the art of frontier fighting and crypto staking in our legendary boxing arena",
      difficulty: "Beginner",
      duration: "5 min",
      rewards: "100 Frontier Coins + Boxing Gloves NFT",
      steps: ["Connect wallet", "Choose opponent", "Place stakes", "Fight!", "Claim rewards"],
    },
    {
      id: "racing",
      title: "🏎️ Frontier Racing Circuit",
      description: "Race through Wyoming Territory and bet on high-speed crypto competitions",
      difficulty: "Intermediate",
      duration: "8 min",
      rewards: "Racing License + Speed Boost",
      steps: ["Select vehicle", "Join race", "Place bets", "Race to victory", "Collect winnings"],
    },
    {
      id: "trading",
      title: "💰 Frontier Trading Post",
      description: "Master the art of frontier commerce and become a legendary trader",
      difficulty: "Intermediate",
      duration: "8 min",
      rewards: "Trading License + Market Access",
      steps: ["Study markets", "Buy low", "Sell high", "Build reputation", "Unlock premium trades"],
    },
    {
      id: "social",
      title: "🤝 Social Capital System",
      description: "Convert your online influence into valuable Wyoming Territory land deeds",
      difficulty: "Advanced",
      duration: "10 min",
      rewards: "Pioneer Badge + Land Deed",
      steps: [
        "Link social accounts",
        "Build influence",
        "Earn social points",
        "Convert to land value",
        "Claim territory",
      ],
    },
  ]

  const startTutorial = (tutorialId: string) => {
    playPaperRustle()
    setActiveDemo(tutorialId)
    // In a real implementation, this would launch the actual tutorial
    setTimeout(() => {
      playCoinDrop()
      alert(`🎉 Tutorial "${tutorials.find((t) => t.id === tutorialId)?.title}" completed! Rewards claimed!`)
      setActiveDemo(null)
    }, 3000)
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <Card className="border-4 border-black newspaper-bg">
        <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 border-b-2 border-black">
          <CardTitle className="text-center font-serif text-3xl letterpress">
            📚 FRONTIER ACADEMY - INTERACTIVE TUTORIALS
          </CardTitle>
          <p className="text-center font-serif text-lg mt-2">
            Master the ways of the digital frontier with hands-on training
          </p>
        </CardHeader>
      </Card>

      {/* Tutorial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tutorials.map((tutorial) => (
          <Card
            key={tutorial.id}
            className="border-3 border-black newspaper-bg hover:shadow-xl transition-all duration-300"
          >
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50 border-b-2 border-black">
              <CardTitle className="font-serif text-xl letterpress">{tutorial.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="font-serif text-base mb-4 leading-relaxed">{tutorial.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="border-black font-serif">
                  <Star className="w-3 h-3 mr-1" />
                  {tutorial.difficulty}
                </Badge>
                <Badge variant="outline" className="border-black font-serif">
                  <Clock className="w-3 h-3 mr-1" />
                  {tutorial.duration}
                </Badge>
              </div>

              <div className="bg-green-50 border-2 border-green-300 rounded p-3 mb-4">
                <div className="flex items-center mb-2">
                  <Trophy className="w-4 h-4 mr-2 text-green-600" />
                  <strong className="font-serif text-sm">Rewards:</strong>
                </div>
                <p className="font-serif text-sm text-green-700">{tutorial.rewards}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-serif font-bold mb-2">Tutorial Steps:</h4>
                <ol className="list-decimal list-inside space-y-1">
                  {tutorial.steps.map((step, index) => (
                    <li key={index} className="font-serif text-sm">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <Button
                onClick={() => startTutorial(tutorial.id)}
                className="w-full frontier-button font-serif text-lg py-3"
                disabled={activeDemo === tutorial.id}
              >
                {activeDemo === tutorial.id ? (
                  <>
                    <div className="animate-spin mr-2">⭐</div>
                    Tutorial Running...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" />
                    Start Tutorial
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Start Guide */}
      <Card className="border-4 border-black newspaper-bg">
        <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 border-b-2 border-black">
          <CardTitle className="font-serif text-2xl letterpress text-center">
            🚀 QUICK START GUIDE - BECOME A FRONTIER LEGEND
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1️⃣", title: "Connect Wallet", desc: "Link your crypto wallet to the frontier economy" },
              { step: "2️⃣", title: "Choose Your Path", desc: "Boxing, racing, or trading - pick your specialty" },
              { step: "3️⃣", title: "Start Playing", desc: "Earn coins, build reputation, and dominate games" },
              { step: "4️⃣", title: "Claim Territory", desc: "Convert success into valuable Wyoming land deeds" },
            ].map((item, index) => (
              <div key={index} className="text-center p-4 border-2 border-black rounded bg-white">
                <div className="text-5xl mb-3">{item.step}</div>
                <h3 className="font-serif font-bold text-lg mb-2">{item.title}</h3>
                <p className="font-serif text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
