"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, TrendingDown, Users, MapPin, ExternalLink, Clock, Trophy, Mountain } from "lucide-react"

interface MarketData {
  symbol: string
  price: number
  change24h: number
  volume: number
}

interface CommunityStats {
  activeUsers: number
  totalStones: number
  activeFights: number
  landClaimed: number
  newMembers: number
}

interface WeatherData {
  temperature: number
  condition: string
  windSpeed: number
  humidity: number
}

export function NewspaperFrontPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [marketData, setMarketData] = useState<MarketData[]>([
    { symbol: "AVAX", price: 42.85, change24h: 5.2, volume: 1250000 },
    { symbol: "BTC", price: 67420, change24h: -2.1, volume: 28500000 },
    { symbol: "ETH", price: 3845, change24h: 3.7, volume: 15200000 },
    { symbol: "STONES", price: 0.0012, change24h: 12.5, volume: 89000 },
  ])

  const [communityStats, setCommunityStats] = useState<CommunityStats>({
    activeUsers: 1247,
    totalStones: 89432,
    activeFights: 23,
    landClaimed: 156,
    newMembers: 34,
  })

  const [weather, setWeather] = useState<WeatherData>({
    temperature: 72,
    condition: "Partly Cloudy",
    windSpeed: 8,
    humidity: 45,
  })

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Update market data every 10 seconds
  useEffect(() => {
    const marketTimer = setInterval(() => {
      setMarketData((prev) =>
        prev.map((coin) => ({
          ...coin,
          price: coin.price * (1 + (Math.random() - 0.5) * 0.02),
          change24h: coin.change24h + (Math.random() - 0.5) * 2,
          volume: coin.volume * (1 + (Math.random() - 0.5) * 0.1),
        })),
      )
    }, 10000)
    return () => clearInterval(marketTimer)
  }, [])

  // Update community stats every 30 seconds
  useEffect(() => {
    const statsTimer = setInterval(() => {
      setCommunityStats((prev) => ({
        activeUsers: Math.max(1000, prev.activeUsers + Math.floor(Math.random() * 20 - 10)),
        totalStones: prev.totalStones + Math.floor(Math.random() * 200),
        activeFights: Math.max(0, prev.activeFights + Math.floor(Math.random() * 6 - 3)),
        landClaimed: prev.landClaimed + Math.floor(Math.random() * 3),
        newMembers: Math.max(0, prev.newMembers + Math.floor(Math.random() * 4 - 2)),
      }))
    }, 30000)
    return () => clearInterval(statsTimer)
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

  const breakingNews = [
    "🥊 Epic Bull vs Bear Championship Tonight at Digital Colosseum!",
    "⛏️ New Gold Vein Discovered in Thunder Peak Mine - Stones Surge 12%",
    "🤠 Bar Keep Bill Introduces New AI-Powered Trading Advice System",
    "🏆 Crypto Clashers Racing Circuit Opens with $10,000 Prize Pool",
    "🏔️ Wyoming Pyramid Mystery Deepens - Ancient Blockchain Discovered",
  ]

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)

  useEffect(() => {
    const newsTimer = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % breakingNews.length)
    }, 8000)
    return () => clearInterval(newsTimer)
  }, [])

  return (
    <div className="min-h-screen bg-yellow-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Newspaper Header */}
        <div className="border-8 border-black bg-white p-6 mb-6">
          <div className="text-center border-b-4 border-black pb-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <div className="text-left">
                <div className="text-sm font-bold">EST. 1880</div>
                <div className="text-xs">DIGITAL FRONTIER EDITION</div>
              </div>
              <div className="text-center flex-1">
                <h1 className="text-6xl font-bold font-serif tracking-wider">THE WYOVERSE PIONEER</h1>
                <div className="text-lg font-semibold mt-2">"ALL THE NEWS THAT'S FIT TO MINE"</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">VOL. 145, NO. 27</div>
                <div className="text-xs">PRICE: 5 STONES</div>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm border-t-2 border-black pt-2">
              <div className="font-bold">{formatDate(currentTime)}</div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span className="font-mono">{formatTime(currentTime)}</span>
              </div>
              <div className="font-bold">CHEYENNE, WYOMING TERRITORY</div>
            </div>
          </div>

          {/* Breaking News Ticker */}
          <div className="bg-red-600 text-white p-2 mb-4">
            <div className="flex items-center">
              <div className="bg-white text-red-600 px-2 py-1 font-bold text-sm mr-4">BREAKING NEWS</div>
              <div className="flex-1 overflow-hidden">
                <div className="animate-pulse font-semibold">{breakingNews[currentNewsIndex]}</div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Story */}
            <div className="lg:col-span-2">
              <Card className="border-4 border-black">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-serif">
                    🏆 CRYPTO CLASHERS CHAMPIONSHIP DRAWS RECORD CROWD
                  </CardTitle>
                  <div className="text-sm text-gray-600">By Staff Reporter | Sports Desk</div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <img
                      src="/images/bears-boxing-arena-crowd.jpeg"
                      alt="Boxing Arena Championship"
                      className="w-full h-48 object-cover border-2 border-black"
                    />
                    <div className="text-xs text-center mt-1 italic">
                      Thousands gather at the Digital Colosseum for tonight's championship bout
                    </div>
                  </div>
                  <p className="text-justify leading-relaxed mb-4">
                    The Digital Colosseum was packed to capacity last evening as spectators from across the blockchain
                    gathered to witness the most anticipated boxing match of the season. The legendary Bull fighter,
                    known for his aggressive market-moving punches, faced off against the cunning Bear, whose defensive
                    strategies have made him a crowd favorite.
                  </p>
                  <p className="text-justify leading-relaxed mb-4">
                    "This ain't just about the fight," commented Bar Keep Bill from his saloon overlooking the arena.
                    "This here's about the future of digital entertainment and the power of community-driven gaming."
                  </p>
                  <div className="flex justify-between items-center">
                    <Link href="/boxing-arena">
                      <Button className="bg-red-600 hover:bg-red-700 text-white">
                        Enter the Arena <Trophy className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                    <div className="text-sm text-gray-600">Continued on Page 3</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Market Data */}
            <div className="lg:col-span-1">
              <Card className="border-4 border-black">
                <CardHeader>
                  <CardTitle className="text-lg font-bold font-serif">📈 MARKET TELEGRAPH</CardTitle>
                  <div className="text-xs">Live from the Trading Post</div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {marketData.map((coin) => (
                      <div key={coin.symbol} className="border-b border-gray-300 pb-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold">{coin.symbol}</span>
                          <span className="font-mono text-sm">
                            ${coin.price.toFixed(coin.symbol === "STONES" ? 4 : 2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">24h Change</span>
                          <div
                            className={`flex items-center text-xs ${
                              coin.change24h >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {coin.change24h >= 0 ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {coin.change24h.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/market">
                    <Button size="sm" className="w-full mt-3 bg-green-600 hover:bg-green-700">
                      Full Market Report
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Community Pulse */}
            <div className="lg:col-span-1">
              <Card className="border-4 border-black">
                <CardHeader>
                  <CardTitle className="text-lg font-bold font-serif">🏘️ COMMUNITY PULSE</CardTitle>
                  <div className="text-xs">Pioneer Population Report</div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        <span className="text-sm">Active Pioneers</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {communityStats.activeUsers.toLocaleString()}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Mountain className="h-4 w-4 mr-2" />
                        <span className="text-sm">Stones Mined</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">{communityStats.totalStones.toLocaleString()}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Trophy className="h-4 w-4 mr-2" />
                        <span className="text-sm">Active Fights</span>
                      </div>
                      <Badge className="bg-red-100 text-red-800">{communityStats.activeFights}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">Land Claimed</span>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">{communityStats.landClaimed}</Badge>
                    </div>
                  </div>
                  <Link href="/community">
                    <Button size="sm" className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
                      Join Community
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Featured Games Section */}
          <Separator className="my-6 border-2 border-black" />

          <div className="mb-6">
            <h2 className="text-3xl font-bold font-serif text-center mb-4 border-b-2 border-black pb-2">
              🎮 FEATURED GAMES FROM LUCKYSPOTONLINE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-4 border-black">
                <CardContent className="p-4">
                  <img
                    src="/images/cryptoclasherboxingposter.jpg"
                    alt="Crypto Clashers Boxing"
                    className="w-full h-32 object-cover border-2 border-black mb-3"
                  />
                  <h3 className="font-bold text-lg mb-2">🥊 CRYPTO CLASHERS BOXING</h3>
                  <p className="text-sm mb-3">Epic blockchain boxing battles with Bull vs Bear champions!</p>
                  <Link href="https://github.com/LuckyspotOgold/Crypto" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      Play Now <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-4 border-black">
                <CardContent className="p-4">
                  <img
                    src="/images/cryptoclasherwcarsposter.jpg"
                    alt="Crypto Clashers Racing"
                    className="w-full h-32 object-cover border-2 border-black mb-3"
                  />
                  <h3 className="font-bold text-lg mb-2">🏎️ CRYPTO CLASHERS RACING</h3>
                  <p className="text-sm mb-3">High-speed crypto circuit racing with massive prize pools!</p>
                  <Link href="https://github.com/LuckyspotOgold/Crypto" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Race Now <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-4 border-black">
                <CardContent className="p-4">
                  <img
                    src="/images/frontiertraderposter.jpg"
                    alt="Frontier Trader"
                    className="w-full h-32 object-cover border-2 border-black mb-3"
                  />
                  <h3 className="font-bold text-lg mb-2">📈 FRONTIER TRADER</h3>
                  <p className="text-sm mb-3">Wild West trading post with AI-powered market insights!</p>
                  <Link href="https://github.com/LuckyspotOgold/Crypto" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Trade Now <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Weather */}
            <Card className="border-2 border-black">
              <CardHeader>
                <CardTitle className="text-sm font-bold">🌤️ WEATHER</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold">{weather.temperature}°F</div>
                  <div className="text-sm">{weather.condition}</div>
                  <div className="flex justify-between text-xs mt-2">
                    <span>Wind: {weather.windSpeed}mph</span>
                    <span>Humidity: {weather.humidity}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Wanted Poster */}
            <Card className="border-2 border-black">
              <CardHeader>
                <CardTitle className="text-sm font-bold">📋 WANTED</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <img
                    src="/images/wyoverse-stone-wanted-poster.png"
                    alt="Wanted Poster"
                    className="w-full h-16 object-cover border border-black mb-2"
                  />
                  <div className="text-xs">
                    <div className="font-bold">STONE COLLECTOR</div>
                    <div>REWARD: 1000 STONES</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Classifieds */}
            <Card className="border-2 border-black">
              <CardHeader>
                <CardTitle className="text-sm font-bold">📰 CLASSIFIEDS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs space-y-1">
                  <div>• Mining Equipment for Sale</div>
                  <div>• Saloon Seeking Bartender</div>
                  <div>• Land Deeds Available</div>
                  <div>• Boxing Lessons Offered</div>
                </div>
                <Link href="/classifieds">
                  <Button size="sm" className="w-full mt-2">
                    View All
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Events */}
            <Card className="border-2 border-black">
              <CardHeader>
                <CardTitle className="text-sm font-bold">📅 EVENTS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs space-y-1">
                  <div>• Tonight: Boxing Championship</div>
                  <div>• Tomorrow: Mining Competition</div>
                  <div>• Weekend: Rodeo Festival</div>
                  <div>• Next Week: Land Auction</div>
                </div>
                <Link href="/calendar">
                  <Button size="sm" className="w-full mt-2">
                    Full Calendar
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="border-t-4 border-black mt-6 pt-4 text-center">
            <div className="text-sm font-bold mb-2">
              THE WYOVERSE PIONEER - ESTABLISHED 1880 - DIGITAL FRONTIER EDITION
            </div>
            <div className="text-xs text-gray-600">
              Published by the WyoVerse Community | All Rights Reserved |
              <Link href="/contact" className="underline ml-1">
                Contact the Editor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
