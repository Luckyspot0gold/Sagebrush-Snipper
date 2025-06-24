"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, ExternalLink, Trophy, Car, TrendingUp } from "lucide-react"
import Image from "next/image"

interface GamePreview {
  id: string
  title: string
  description: string
  image: string
  previewUrl: string
  fullGameUrl: string
  status: "live" | "beta" | "coming-soon"
  players: number
  revenue: string
  icon: React.ReactNode
}

export function GamePreviewSystem() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  const games: GamePreview[] = [
    {
      id: "boxing",
      title: "Crypto Clashers Boxing",
      description: "Elite fighters battle in market-driven combat. Each punch powered by real crypto volatility.",
      image: "/images/crypto-clashers-fighter.png",
      previewUrl: "https://cryptoclashers.games/boxing-mini",
      fullGameUrl: "https://github.com/Luckyspot0gold/Crypto_Clashers",
      status: "live",
      players: 1247,
      revenue: "$89.50",
      icon: <Trophy className="h-5 w-5" />,
    },
    {
      id: "racing",
      title: "Crypto Clashers Racing",
      description: "High-speed racing where markets determine velocity. Race for crypto, not pink slips!",
      image: "/images/crypto-clashers-racing-poster.png",
      previewUrl: "https://cryptoclashers.games/racing-mini",
      fullGameUrl: "https://github.com/Luckyspot0gold/Crypto_Clashers_Racing",
      status: "live",
      players: 892,
      revenue: "$67.20",
      icon: <Car className="h-5 w-5" />,
    },
    {
      id: "trading",
      title: "Frontier Trader",
      description: "Advanced trading bots and market analysis tools for the digital frontier.",
      image: "/images/wyoverse-digital-mountain.png",
      previewUrl: "https://cryptoclashers.games/trader-mini",
      fullGameUrl: "https://github.com/Luckyspot0gold/Frontier_Trader",
      status: "beta",
      players: 456,
      revenue: "$34.80",
      icon: <TrendingUp className="h-5 w-5" />,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-green-100 text-green-800"
      case "beta":
        return "bg-yellow-100 text-yellow-800"
      case "coming-soon":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const launchFullGame = (gameUrl: string) => {
    window.open(gameUrl, "_blank")
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="headline-primary text-4xl mb-2">🎮 FRONTIER GAMING ARCADE 🎮</h2>
        <p className="body-text text-lg">Experience the Wild West of crypto gaming</p>
      </div>

      <div className="newspaper-folds">
        {games.map((game) => (
          <div
            key={game.id}
            className="fold-section"
            onClick={() => setSelectedGame(selectedGame === game.id ? null : game.id)}
          >
            <div className="flex items-center gap-2 mb-2">
              {game.icon}
              <span className="font-bold">{game.title}</span>
            </div>
            <Badge className={getStatusColor(game.status)}>{game.status.replace("-", " ").toUpperCase()}</Badge>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Card key={game.id} className="newspaper-article">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="headline-secondary text-lg">{game.title}</CardTitle>
                <Badge className={getStatusColor(game.status)}>{game.status.replace("-", " ").toUpperCase()}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="game-preview-container mb-4">
                <Image
                  src={game.image || "/placeholder.svg"}
                  alt={game.title}
                  width={300}
                  height={200}
                  className="game-preview"
                />
                <div className="play-overlay">
                  <div className="play-button">
                    <Play className="h-8 w-8" />
                  </div>
                </div>
              </div>

              <p className="body-text text-sm mb-4">{game.description}</p>

              <div className="flex justify-between items-center mb-4 text-sm">
                <div className="flex items-center gap-4">
                  <span className="font-semibold">{game.players} players</span>
                  <span className="text-green-600 font-semibold">{game.revenue} earned</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 newspaper-button"
                  onClick={() => window.open(game.previewUrl, "_blank")}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-black"
                  onClick={() => launchFullGame(game.fullGameUrl)}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Full Game
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Game Statistics */}
      <Card className="revenue-dashboard">
        <CardHeader>
          <CardTitle className="headline-secondary text-xl">🏆 Gaming Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="metric-card">
              <div className="metric-value">2,595</div>
              <div className="text-sm text-gray-600">Total Players</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">$191.50</div>
              <div className="text-sm text-gray-600">Gaming Revenue</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">94%</div>
              <div className="text-sm text-gray-600">Player Satisfaction</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
