"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ExternalLink, Play, Users, Trophy, Coins, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface GameData {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  status: "live" | "beta" | "coming-soon"
  players: number
  revenue: number
  githubUrl: string
  playUrl?: string
  features: string[]
}

export function GamePreviewSystem() {
  const [games, setGames] = useState<GameData[]>([
    {
      id: "crypto-clashers-boxing",
      title: "Crypto Clashers Boxing",
      subtitle: "KryptO Championship",
      description: "Elite fighters battle in market-driven combat. Each punch powered by real crypto volatility.",
      image: "/images/crypto-clashers-fighter.png",
      status: "live",
      players: 1247,
      revenue: 89.3,
      githubUrl: "https://github.com/Luckyspot0gold/Crypto_Clashers",
      playUrl: "/boxing-arena",
      features: ["Real-time Market Data", "NFT Rewards", "Live Streaming", "Tournament Mode"],
    },
    {
      id: "crypto-clashers-racing",
      title: "Crypto Clashers Racing",
      subtitle: "8 in the Gate",
      description: "High-speed racing where markets determine velocity. Race for crypto, not pink slips!",
      image: "/images/crypto-clashers-racing-poster.png",
      status: "live",
      players: 892,
      revenue: 67.2,
      githubUrl: "https://github.com/Luckyspot0gold/Crypto_Clashers_Racing",
      playUrl: "/racing-circuit",
      features: ["Market-Driven Speed", "Multiplayer Racing", "Crypto Rewards", "Leaderboards"],
    },
    {
      id: "cryptopia",
      title: "Cryptopia",
      subtitle: "Educational Story Board",
      description: "Fork of Bulls vs Bears turned educational. Learn crypto with Cutch, Irelynn, Bully and the whales.",
      image: "/images/bull-vs-bear-bully.jpeg",
      status: "beta",
      players: 456,
      revenue: 34.5,
      githubUrl: "https://github.com/Luckyspot0gold/Cryptopia",
      playUrl: "/cryptopia",
      features: ["Educational Content", "Story Mode", "Character Progression", "Crypto Learning"],
    },
  ])

  const [totalPlayers, setTotalPlayers] = useState(2595)
  const [totalRevenue, setTotalRevenue] = useState(191.0)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setGames((prev) =>
        prev.map((game) => ({
          ...game,
          players: game.players + Math.floor(Math.random() * 3),
          revenue: game.revenue + Math.random() * 0.5,
        })),
      )

      setTotalPlayers((prev) => prev + Math.floor(Math.random() * 5))
      setTotalRevenue((prev) => prev + Math.random() * 0.3)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-green-500"
      case "beta":
        return "bg-yellow-500"
      case "coming-soon":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "live":
        return "LIVE"
      case "beta":
        return "BETA"
      case "coming-soon":
        return "SOON"
      default:
        return "UNKNOWN"
    }
  }

  return (
    <div className="space-y-6">
      {/* Gaming Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="border-2 border-black">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-serif text-muted-foreground">Total Players</p>
                <p className="text-2xl font-bold font-serif">{totalPlayers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center text-xs text-green-600 mt-2">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.3% this week
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-black">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-serif text-muted-foreground">Game Revenue</p>
                <p className="text-2xl font-bold font-serif">${totalRevenue.toFixed(2)}</p>
              </div>
              <Coins className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center text-xs text-green-600 mt-2">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18.7% this month
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-black">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-serif text-muted-foreground">Active Games</p>
                <p className="text-2xl font-bold font-serif">{games.length}</p>
              </div>
              <Trophy className="h-8 w-8 text-purple-600" />
            </div>
            <div className="flex items-center text-xs text-blue-600 mt-2">
              <Play className="h-3 w-3 mr-1" />2 Live, 1 Beta
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Game Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {games.map((game) => (
          <Card
            key={game.id}
            className="border-4 border-black hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <CardHeader className="relative">
              <div className="absolute top-2 right-2 z-10">
                <Badge className={`${getStatusColor(game.status)} text-white font-serif`}>
                  {getStatusText(game.status)}
                </Badge>
              </div>
              <div className="relative h-48 mb-4 overflow-hidden rounded border-2 border-black">
                <Image
                  src={game.image || "/placeholder.svg"}
                  alt={game.title}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <Play className="h-12 w-12 text-white opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <CardTitle className="font-serif text-xl">{game.title}</CardTitle>
              <CardDescription className="font-serif italic">{game.subtitle}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm font-serif">{game.description}</p>

              {/* Game Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-2 bg-blue-50 rounded border">
                  <div className="font-bold font-serif">{game.players.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Players</div>
                </div>
                <div className="text-center p-2 bg-green-50 rounded border">
                  <div className="font-bold font-serif">${game.revenue.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">Revenue</div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <p className="text-xs font-serif font-bold">Features:</p>
                <div className="flex flex-wrap gap-1">
                  {game.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs font-serif">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {game.playUrl && (
                  <Link href={game.playUrl} className="flex-1">
                    <Button className="w-full font-serif bg-green-600 hover:bg-green-700">
                      <Play className="h-4 w-4 mr-2" />
                      PLAY NOW
                    </Button>
                  </Link>
                )}
                <a href={game.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button variant="outline" className="w-full font-serif border-black">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    CODE
                  </Button>
                </a>
              </div>

              {/* Revenue Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-serif">Revenue Goal</span>
                  <span className="font-serif">${game.revenue.toFixed(2)} / $100</span>
                </div>
                <Progress value={(game.revenue / 100) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Coming Soon Teaser */}
      <Card className="border-4 border-black bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-2xl">🚀 More Games Coming Soon!</CardTitle>
          <CardDescription className="font-serif">
            The frontier is expanding with new adventures, challenges, and opportunities to earn crypto rewards.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="p-4 bg-white rounded border-2 border-black">
              <h3 className="font-serif font-bold">🏔️ Mountain Climbing</h3>
              <p className="text-sm font-serif">Scale the digital peaks for rare NFTs</p>
            </div>
            <div className="p-4 bg-white rounded border-2 border-black">
              <h3 className="font-serif font-bold">🎰 Saloon Games</h3>
              <p className="text-sm font-serif">Poker, blackjack, and frontier gambling</p>
            </div>
            <div className="p-4 bg-white rounded border-2 border-black">
              <h3 className="font-serif font-bold">⛏️ Mining Simulator</h3>
              <p className="text-sm font-serif">Dig for digital gold and precious stones</p>
            </div>
          </div>
          <Button className="font-serif bg-purple-600 hover:bg-purple-700">Join the Waitlist</Button>
        </CardContent>
      </Card>
    </div>
  )
}
