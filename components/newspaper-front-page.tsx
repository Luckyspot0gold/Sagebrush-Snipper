"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, TrendingUp, Users, Clock } from "lucide-react"

interface MarketData {
  symbol: string
  price: number
  change24h: number
  volume: number
}

interface NewsItem {
  title: string
  content: string
  priority: "breaking" | "featured" | "normal"
  timestamp: Date
}

interface CommunityStats {
  activeUsers: number
  totalTransactions: number
  dailyVolume: number
  socialGoodContributions: number
}

export function NewspaperFrontPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [marketData, setMarketData] = useState<MarketData[]>([
    { symbol: "AVAX", price: 42.15, change24h: 5.2, volume: 125000000 },
    { symbol: "BTC", price: 67890.45, change24h: -2.1, volume: 28000000000 },
    { symbol: "ETH", price: 3456.78, change24h: 3.8, volume: 15000000000 },
    { symbol: "STONES", price: 0.0234, change24h: 12.5, volume: 890000 },
  ])

  const [newsItems] = useState<NewsItem[]>([
    {
      title: "BREAKING: New Gold Strike in Digital Hills!",
      content: "Miners report massive STONES discovery in sector 7. Rush expected to begin at dawn.",
      priority: "breaking",
      timestamp: new Date(),
    },
    {
      title: "Boxing Championship Tonight",
      content: "Bull vs Bear showdown promises to be the fight of the century. Betting opens at 6 PM.",
      priority: "featured",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      title: "Land Deeds Now Available",
      content: "Prime frontier property up for grabs. Stake your claim before it's too late!",
      priority: "normal",
      timestamp: new Date(Date.now() - 7200000),
    },
    {
      title: "Bar Keep Bill's New Cocktail Menu",
      content: "Featuring the famous 'Crypto Crusher' and 'Blockchain Bourbon'. Limited time only!",
      priority: "normal",
      timestamp: new Date(Date.now() - 10800000),
    },
  ])

  const [communityStats, setCommunityStats] = useState<CommunityStats>({
    activeUsers: 1247,
    totalTransactions: 15678,
    dailyVolume: 234567,
    socialGoodContributions: 12890,
  })

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)

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
        prev.map((item) => ({
          ...item,
          price: item.price * (1 + (Math.random() - 0.5) * 0.02),
          change24h: item.change24h + (Math.random() - 0.5) * 2,
        })),
      )
    }, 10000)
    return () => clearInterval(marketTimer)
  }, [])

  // Update community stats every 30 seconds
  useEffect(() => {
    const statsTimer = setInterval(() => {
      setCommunityStats((prev) => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20) - 10,
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 50),
        dailyVolume: prev.dailyVolume + Math.floor(Math.random() * 1000) - 500,
        socialGoodContributions: prev.socialGoodContributions + Math.floor(Math.random() * 100),
      }))
    }, 30000)
    return () => clearInterval(statsTimer)
  }, [])

  // Rotate breaking news every 8 seconds
  useEffect(() => {
    const newsTimer = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length)
    }, 8000)
    return () => clearInterval(newsTimer)
  }, [newsItems.length])

  const formatPrice = (price: number) => {
    if (price < 1) return price.toFixed(4)
    if (price < 100) return price.toFixed(2)
    return price.toLocaleString()
  }

  const formatChange = (change: number) => {
    const sign = change >= 0 ? "+" : ""
    return `${sign}${change.toFixed(2)}%`
  }

  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-amber-50 to-orange-100 min-h-screen">
      {/* Newspaper Header */}
      <div className="text-center mb-8 border-b-4 border-amber-900 pb-6">
        <h1 className="text-6xl font-serif font-bold text-amber-900 mb-2">The WyoVerse Pioneer</h1>
        <div className="flex justify-between items-center text-amber-700">
          <div className="text-lg font-semibold">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="text-lg font-mono">
            <Clock className="inline h-5 w-5 mr-2" />
            {currentTime.toLocaleTimeString()}
          </div>
          <div className="text-lg font-semibold">Vol. 1, No. 247</div>
        </div>
        <div className="text-sm text-amber-600 mt-2 italic">
          "All the News That's Fit to Mine" • Established 2024 • Digital Frontier Edition
        </div>
      </div>

      {/* Breaking News Ticker */}
      <div className="bg-red-600 text-white p-3 mb-6 rounded-lg overflow-hidden">
        <div className="flex items-center">
          <Badge className="bg-yellow-500 text-black font-bold mr-4">BREAKING</Badge>
          <div className="animate-pulse">
            <h3 className="font-bold">{newsItems[currentNewsIndex].title}</h3>
            <p className="text-sm">{newsItems[currentNewsIndex].content}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Featured Story */}
          <Card className="border-2 border-amber-300">
            <CardHeader>
              <CardTitle className="text-3xl font-serif text-amber-900">
                Digital Frontier Boom Continues as Settlers Flock to WyoVerse
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <img
                src="/images/wyoverse-digital-mountain.png"
                alt="WyoVerse Digital Frontier"
                className="w-full h-64 object-cover rounded-lg"
              />
              <p className="text-lg leading-relaxed">
                The great digital migration continues as thousands of pioneers stake their claims in the WyoVerse
                frontier. From boxing arenas to mining operations, the virtual Wyoming territory offers opportunities
                that would make even the most seasoned prospector tip their hat.
              </p>
              <p className="leading-relaxed">
                "It's like the California Gold Rush, but with cryptocurrency and smart contracts," says local
                entrepreneur and saloon keeper Bill. "Every day brings new settlers looking to make their fortune in the
                digital hills."
              </p>
              <p className="leading-relaxed">
                The integration of blockchain technology with frontier spirit has created a unique ecosystem where
                traditional Western values meet cutting-edge innovation. Land deeds are now NFTs, boxing matches are
                settled with smart contracts, and the local currency - STONES - can be mined using both pickaxes and
                algorithms.
              </p>
            </CardContent>
          </Card>

          {/* Featured Games Section */}
          <Card className="border-2 border-blue-300">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-blue-900 flex items-center">
                <ExternalLink className="mr-2 h-6 w-6" />
                Featured Games from LuckyspotOgold
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <img
                    src="/images/cryptoclasherboxingposter.jpg"
                    alt="Crypto Clashers Boxing"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <h3 className="font-bold text-lg">Crypto Clashers Boxing</h3>
                  <p className="text-sm text-gray-600">
                    Epic bull vs bear battles in the digital colosseum. Place your bets and watch the market come alive!
                  </p>
                  <Button asChild className="w-full">
                    <a href="https://github.com/LuckyspotOgold/Crypto" target="_blank" rel="noopener noreferrer">
                      Play Now <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
                <div className="space-y-3">
                  <img
                    src="/images/cryptoclasherwcarsposter.jpg"
                    alt="Crypto Clashers Racing"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <h3 className="font-bold text-lg">Crypto Clashers Racing</h3>
                  <p className="text-sm text-gray-600">
                    High-speed crypto-powered racing action. Burn rubber and earn STONES on the digital speedway!
                  </p>
                  <Button asChild className="w-full">
                    <a href="https://github.com/LuckyspotOgold/Crypto" target="_blank" rel="noopener noreferrer">
                      Race Now <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-center text-blue-800 font-semibold">
                  Visit our complete game collection at{" "}
                  <a
                    href="https://github.com/LuckyspotOgold/Crypto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-600"
                  >
                    LuckyspotOgold/Crypto
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsItems.slice(1).map((item, index) => (
              <Card key={index} className="border border-gray-300">
                <CardHeader>
                  <CardTitle className="text-lg font-serif">
                    {item.priority === "featured" && <Badge className="mr-2 bg-blue-600">Featured</Badge>}
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{item.content}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {item.timestamp.toLocaleTimeString()} • {item.timestamp.toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Live Market Data */}
          <Card className="border-2 border-green-300">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-green-900 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Live Market Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {marketData.map((item) => (
                <div key={item.symbol} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <div className="font-bold">{item.symbol}</div>
                    <div className="text-sm text-gray-600">${formatPrice(item.price)}</div>
                  </div>
                  <div className={`text-right ${getChangeColor(item.change24h)}`}>
                    <div className="font-semibold">{formatChange(item.change24h)}</div>
                    <div className="text-xs">24h</div>
                  </div>
                </div>
              ))}
              <div className="text-xs text-gray-500 text-center mt-3">
                Last updated: {currentTime.toLocaleTimeString()}
              </div>
            </CardContent>
          </Card>

          {/* Community Stats */}
          <Card className="border-2 border-purple-300">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-purple-900 flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Community Pulse
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Pioneers</span>
                <Badge className="bg-green-600 text-white">{communityStats.activeUsers.toLocaleString()}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Daily Transactions</span>
                <Badge className="bg-blue-600 text-white">{communityStats.totalTransactions.toLocaleString()}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Trading Volume</span>
                <Badge className="bg-yellow-600 text-black">${communityStats.dailyVolume.toLocaleString()}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Social Good Fund</span>
                <Badge className="bg-purple-600 text-white">
                  ${communityStats.socialGoodContributions.toLocaleString()}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Weather Widget */}
          <Card className="border border-gray-300">
            <CardHeader>
              <CardTitle className="text-lg font-serif">Frontier Weather</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl mb-2">☀️</div>
                <div className="text-2xl font-bold">72°F</div>
                <div className="text-sm text-gray-600">Sunny & Clear</div>
                <div className="text-xs text-gray-500 mt-2">Perfect for mining and boxing!</div>
              </div>
            </CardContent>
          </Card>

          {/* Wanted Poster */}
          <Card className="border-2 border-red-400 bg-red-50">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-red-900 text-center">WANTED</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <img
                src="/images/wyoverse-stone-wanted-poster.png"
                alt="Wanted Poster"
                className="w-24 h-24 mx-auto rounded-lg mb-3 border-2 border-red-600"
              />
              <h3 className="font-bold text-red-900">The Stone Collector</h3>
              <p className="text-sm text-red-700 mb-2">For hoarding rare minerals</p>
              <Badge className="bg-yellow-500 text-black font-bold">REWARD: 1000 STONES</Badge>
            </CardContent>
          </Card>

          {/* Classifieds */}
          <Card className="border border-gray-300">
            <CardHeader>
              <CardTitle className="text-lg font-serif">Frontier Classifieds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="border-b pb-2">
                <strong>FOR SALE:</strong> Prime mining claim, sector 12. Rich STONES deposit. Contact Bill's Saloon.
              </div>
              <div className="border-b pb-2">
                <strong>WANTED:</strong> Experienced boxer for championship bout. Must have own gloves.
              </div>
              <div className="border-b pb-2">
                <strong>SERVICES:</strong> Land surveying and deed registration. Fast and reliable.
              </div>
              <div>
                <strong>LOST:</strong> Digital horse, answers to "Crypto". Last seen near the trading post.
              </div>
            </CardContent>
          </Card>

          {/* Events Calendar */}
          <Card className="border border-gray-300">
            <CardHeader>
              <CardTitle className="text-lg font-serif">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Boxing Championship</span>
                <span className="text-gray-600">Tonight 8 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Mining Competition</span>
                <span className="text-gray-600">Tomorrow</span>
              </div>
              <div className="flex justify-between">
                <span>Land Auction</span>
                <span className="text-gray-600">This Weekend</span>
              </div>
              <div className="flex justify-between">
                <span>Frontier Festival</span>
                <span className="text-gray-600">Next Week</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <Separator className="my-8" />
      <div className="text-center text-amber-700 text-sm">
        <p className="mb-2">
          The WyoVerse Pioneer • Published daily in the Digital Frontier • Circulation:{" "}
          {communityStats.activeUsers.toLocaleString()}
        </p>
        <p>
          "Where the Old West meets the New Web" • Visit us at{" "}
          <a href="https://github.com/LuckyspotOgold/Crypto" className="underline hover:text-amber-600">
            LuckyspotOgold/Crypto
          </a>
        </p>
      </div>
    </div>
  )
}

export default NewspaperFrontPage
