"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, TrendingUp, Users, Calendar, MapPin, Star } from "lucide-react"

interface NewsArticle {
  id: string
  headline: string
  subheading: string
  content: string
  author: string
  date: string
  category: "BREAKING" | "MARKETS" | "COMMUNITY" | "GAMES" | "TERRITORY"
  priority: number
}

interface MarketData {
  symbol: string
  price: number
  change: number
  volume: string
}

interface CommunityStats {
  activeUsers: number
  totalTransactions: number
  landClaimed: number
  gamesPlayed: number
}

const BREAKING_NEWS: NewsArticle[] = [
  {
    id: "1",
    headline: "MASSIVE GOLD STRIKE DISCOVERED IN DIGITAL MOUNTAINS",
    subheading: "Prospectors Rush to Stake Claims as STONES Prices Soar 45%",
    content:
      "In what mining experts are calling the largest digital gold discovery since the Great Crypto Rush of '21, prospectors have uncovered a massive vein of STONES tokens in the northern territories of WyoVerse. The discovery has triggered a modern-day gold rush, with land deeds selling faster than hotcakes at the county fair.",
    author: "Frontier Pete",
    date: "December 27, 2024",
    category: "BREAKING",
    priority: 1,
  },
  {
    id: "2",
    headline: "BAR KEEP BILL'S SALOON INTRODUCES AI BARTENDER",
    subheading: "Revolutionary Technology Brings Personalized Trading Advice to the Frontier",
    content:
      "The famous Bar Keep Bill has unveiled his latest innovation - an AI-powered bartender that provides personalized market insights while serving up the finest whiskey in the territory. Early reports suggest the AI can predict market movements with uncanny accuracy.",
    author: "Technology Tribune",
    date: "December 27, 2024",
    category: "COMMUNITY",
    priority: 2,
  },
  {
    id: "3",
    headline: "CRYPTO CLASHERS CHAMPIONSHIP DRAWS RECORD CROWD",
    subheading: "Boxing Arena Packed as Bull vs Bear Rivalry Reaches New Heights",
    content:
      "The Crypto Clashers Boxing Arena witnessed its largest crowd ever as the legendary Bull vs Bear championship match drew spectators from across the digital frontier. Betting reached record volumes with over 50,000 STONES wagered on the outcome.",
    author: "Sports Correspondent",
    date: "December 26, 2024",
    category: "GAMES",
    priority: 3,
  },
]

const MARKET_DATA: MarketData[] = [
  { symbol: "STONES", price: 2.45, change: 12.3, volume: "1.2M" },
  { symbol: "AVAX", price: 42.18, change: -2.1, volume: "890K" },
  { symbol: "TATONKA", price: 0.89, change: 8.7, volume: "456K" },
  { symbol: "LAND", price: 125.5, change: 5.2, volume: "234K" },
]

export function NewspaperFrontPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [communityStats, setCommunityStats] = useState<CommunityStats>({
    activeUsers: 1247,
    totalTransactions: 8934,
    landClaimed: 342,
    gamesPlayed: 5678,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      // Simulate real-time stats updates
      setCommunityStats((prev) => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3),
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 5),
        landClaimed: prev.landClaimed + (Math.random() > 0.9 ? 1 : 0),
        gamesPlayed: prev.gamesPlayed + Math.floor(Math.random() * 8),
      }))
    }, 30000)

    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <div className="max-w-7xl mx-auto p-4 bg-amber-50 min-h-screen">
      {/* Newspaper Header */}
      <div className="border-8 border-black bg-white shadow-2xl">
        <div className="border-b-4 border-black p-6 bg-gradient-to-r from-amber-100 to-yellow-100">
          <div className="text-center">
            <h1 className="text-6xl font-serif font-black tracking-wider mb-2">THE WYOVERSE PIONEER</h1>
            <div className="flex justify-between items-center text-sm font-serif">
              <div>EST. 1852 • DIGITAL FRONTIER EDITION</div>
              <div className="text-center">
                <div className="font-bold">{formatDate(currentTime)}</div>
                <div className="text-xs">LIVE: {formatTime(currentTime)}</div>
              </div>
              <div>VOL. 172 • NO. 361 • PRICE: 5¢</div>
            </div>
          </div>
        </div>

        {/* Breaking News Banner */}
        <div className="bg-red-600 text-white p-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <Star className="h-4 w-4 animate-pulse" />
            <span className="font-bold text-lg">BREAKING: {BREAKING_NEWS[0].headline}</span>
            <Star className="h-4 w-4 animate-pulse" />
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Story Column */}
            <div className="lg:col-span-3">
              <Card className="border-4 border-black">
                <CardHeader className="bg-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="destructive" className="text-lg px-3 py-1">
                      {BREAKING_NEWS[0].category}
                    </Badge>
                    <span className="text-sm text-gray-600">{BREAKING_NEWS[0].date}</span>
                  </div>
                  <CardTitle className="text-3xl font-serif leading-tight">{BREAKING_NEWS[0].headline}</CardTitle>
                  <CardDescription className="text-xl font-serif text-gray-700">
                    {BREAKING_NEWS[0].subheading}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-lg leading-relaxed font-serif mb-4">{BREAKING_NEWS[0].content}</div>
                  <div className="text-sm text-gray-600 italic">
                    By {BREAKING_NEWS[0].author}, Frontier Correspondent
                  </div>
                </CardContent>
              </Card>

              {/* Secondary Stories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {BREAKING_NEWS.slice(1).map((article) => (
                  <Card key={article.id} className="border-2 border-black">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-gray-500">{article.date}</span>
                      </div>
                      <CardTitle className="text-lg font-serif leading-tight">{article.headline}</CardTitle>
                      <CardDescription className="text-sm">{article.subheading}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm leading-relaxed">{article.content.substring(0, 150)}...</p>
                      <div className="text-xs text-gray-600 italic mt-2">By {article.author}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Market Ticker */}
              <Card className="border-4 border-black">
                <CardHeader className="bg-green-100">
                  <CardTitle className="text-lg font-serif flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Market Ticker
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {MARKET_DATA.map((market) => (
                      <div key={market.symbol} className="flex justify-between items-center">
                        <div>
                          <div className="font-bold">{market.symbol}</div>
                          <div className="text-xs text-gray-600">Vol: {market.volume}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${market.price}</div>
                          <div className={`text-xs ${market.change > 0 ? "text-green-600" : "text-red-600"}`}>
                            {market.change > 0 ? "+" : ""}
                            {market.change}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Community Stats */}
              <Card className="border-4 border-black">
                <CardHeader className="bg-blue-100">
                  <CardTitle className="text-lg font-serif flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Territory Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Active Pioneers</span>
                      <span className="font-bold">{communityStats.activeUsers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Trades</span>
                      <span className="font-bold">{communityStats.totalTransactions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Land Claimed</span>
                      <span className="font-bold">{communityStats.landClaimed.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Games Played</span>
                      <span className="font-bold">{communityStats.gamesPlayed.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Games Advertisement */}
              <Card className="border-4 border-black bg-gradient-to-b from-purple-100 to-purple-200">
                <CardHeader>
                  <CardTitle className="text-lg font-serif text-center">🎮 PLAY MORE GAMES! 🎮</CardTitle>
                </CardHeader>
                <CardContent className="p-4 text-center">
                  <div className="space-y-3">
                    <div className="text-sm font-serif">
                      <strong>Visit Luckyspotonline on GitHub</strong>
                    </div>

                    <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      <a
                        href="https://github.com/Luckyspotonline/Crypto"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Crypto Game
                      </a>
                    </Button>

                    <div className="text-xs text-gray-600 font-serif">
                      More exciting games coming soon to the frontier!
                    </div>

                    <div className="border-t pt-3 mt-3">
                      <div className="text-xs font-serif text-gray-700">
                        <strong>Featured Games:</strong>
                      </div>
                      <div className="text-xs space-y-1 mt-1">
                        <div>🥊 Crypto Clashers Boxing</div>
                        <div>🏇 Digital Rodeo Racing</div>
                        <div>⛏️ STONES Mining Simulator</div>
                        <div>🏛️ Wyoming Pyramid Explorer</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weather & Events */}
              <Card className="border-4 border-black">
                <CardHeader className="bg-yellow-100">
                  <CardTitle className="text-lg font-serif flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Frontier Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-red-500" />
                      <div>
                        <div className="font-bold">Boxing Championship</div>
                        <div className="text-xs text-gray-600">Tonight at 8 PM MST</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-blue-500" />
                      <div>
                        <div className="font-bold">Land Auction</div>
                        <div className="text-xs text-gray-600">Tomorrow 2 PM MST</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-green-500" />
                      <div>
                        <div className="font-bold">Mining Expedition</div>
                        <div className="text-xs text-gray-600">Weekend Event</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer */}
          <Separator className="my-6 border-2 border-black" />
          <div className="text-center text-sm font-serif text-gray-600">
            <div className="mb-2">
              <strong>THE WYOVERSE PIONEER</strong> • Published Daily in the Digital Frontier
            </div>
            <div className="flex justify-center items-center gap-4 text-xs">
              <span>Printed by WyoVerse Press</span>
              <span>•</span>
              <span>Distributed Territory-Wide</span>
              <span>•</span>
              <span>All Rights Reserved © 2024</span>
            </div>
            <div className="mt-2 text-xs">"Bringing Truth and Prosperity to the Digital Frontier Since 1852"</div>
          </div>
        </div>
      </div>
    </div>
  )
}
