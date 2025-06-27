"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, TrendingUp, Users, MapPin, Zap, Star, GamepadIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface NewsArticle {
  id: string
  headline: string
  summary: string
  category: string
  timestamp: string
  featured?: boolean
}

interface MarketData {
  symbol: string
  price: number
  change: number
  volume: string
}

export function NewspaperFrontPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [marketData, setMarketData] = useState<MarketData[]>([
    { symbol: "AVAX", price: 42.15, change: 5.2, volume: "1.2M" },
    { symbol: "BTC", price: 67890, change: 3.1, volume: "15.6B" },
    { symbol: "ETH", price: 2340, change: -1.8, volume: "8.9B" },
  ])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const featuredArticles: NewsArticle[] = [
    {
      id: "1",
      headline: "WyoVerse Pioneer Launches Revolutionary GameFi Platform",
      summary:
        "The digital frontier opens with blockchain-powered gaming, NFT trading, and real-world Wyoming connections. Experience the Old West meets Web3 in this groundbreaking virtual world.",
      category: "BREAKING NEWS",
      timestamp: "2024-01-15 08:00",
      featured: true,
    },
    {
      id: "2",
      headline: "Crypto Clashers Boxing Arena Opens for Championship Fights",
      summary:
        "Bulls vs Bears battle it out in the ultimate crypto-themed boxing experience. Bet on your favorite fighters and earn rewards in this action-packed GameFi arena.",
      category: "GAMING",
      timestamp: "2024-01-15 07:30",
    },
    {
      id: "3",
      headline: "Bar Keep Bill's Saloon: AI-Powered Trading Advisor Goes Live",
      summary:
        "Meet Bill, your frontier trading companion powered by advanced AI. Get market insights, trading tips, and frontier wisdom all in one place.",
      category: "TECHNOLOGY",
      timestamp: "2024-01-15 07:00",
    },
    {
      id: "4",
      headline: "Digital Land Deeds Now Available for Wyoming Virtual Properties",
      summary:
        "Claim your piece of the digital frontier with blockchain-verified land ownership. Build, trade, and develop your virtual Wyoming homestead.",
      category: "REAL ESTATE",
      timestamp: "2024-01-15 06:30",
    },
  ]

  const sidebarNews: NewsArticle[] = [
    {
      id: "5",
      headline: "OSHA Safety Training Program Launches",
      summary: "Interactive workplace safety certification now available for all frontier workers.",
      category: "SAFETY",
      timestamp: "2024-01-15 06:00",
    },
    {
      id: "6",
      headline: "Wyoming Energy Markets Show Strong Growth",
      summary: "Wind and solar investments drive renewable energy expansion across the state.",
      category: "ENERGY",
      timestamp: "2024-01-15 05:30",
    },
    {
      id: "7",
      headline: "Native History Archive Digitization Complete",
      summary: "Preserving Wyoming's indigenous heritage through blockchain technology.",
      category: "CULTURE",
      timestamp: "2024-01-15 05:00",
    },
  ]

  return (
    <div className="min-h-screen bg-amber-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Newspaper Header */}
        <div className="border-8 border-black bg-white mb-6">
          <div className="border-b-4 border-black p-6 bg-gradient-to-r from-amber-100 to-yellow-100">
            <div className="text-center">
              <h1 className="text-6xl font-serif font-black text-black mb-2 tracking-wider">THE WYOVERSE PIONEER</h1>
              <div className="flex justify-between items-center text-sm font-serif">
                <div>EST. 2024 • DIGITAL FRONTIER EDITION</div>
                <div className="text-center">
                  <div className="font-bold">MONDAY, JANUARY 15, 2024</div>
                  <div>{currentTime.toLocaleTimeString()}</div>
                </div>
                <div>PRICE: FREE • VOLUME XCII</div>
              </div>
            </div>
          </div>

          {/* Market Ticker */}
          <div className="border-b-2 border-black bg-black text-green-400 p-2 font-mono text-sm overflow-hidden">
            <div className="flex animate-scroll whitespace-nowrap">
              {marketData.map((item, index) => (
                <span key={index} className="mr-8">
                  {item.symbol}: ${item.price.toLocaleString()}
                  <span className={item.change >= 0 ? "text-green-400" : "text-red-400"}>
                    {item.change >= 0 ? "+" : ""}
                    {item.change}%
                  </span>
                  (Vol: {item.volume})
                </span>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-6 p-6">
            {/* Main Story */}
            <div className="col-span-8">
              <div className="border-4 border-black p-6 bg-white">
                <Badge className="bg-red-600 text-white mb-4 text-lg px-4 py-2">{featuredArticles[0].category}</Badge>
                <h2 className="text-4xl font-serif font-bold mb-4 leading-tight">{featuredArticles[0].headline}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span>By WyoVerse News Team</span>
                  <span>•</span>
                  <span>{new Date(featuredArticles[0].timestamp).toLocaleString()}</span>
                </div>

                <div className="relative mb-6">
                  <Image
                    src="/images/wyoverse-digital-mountain.png"
                    alt="WyoVerse Digital Frontier"
                    width={600}
                    height={300}
                    className="w-full h-64 object-cover border-2 border-black"
                  />
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white p-2 text-xs">
                    The WyoVerse Digital Frontier Opens to Pioneers
                  </div>
                </div>

                <p className="text-lg leading-relaxed mb-6 font-serif">{featuredArticles[0].summary}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="border-2 border-gray-300 p-4">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <GamepadIcon className="h-4 w-4" />
                      Featured Games
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>• Crypto Clashers Boxing</li>
                      <li>• Digital Rodeo Racing</li>
                      <li>• Frontier Trading Hub</li>
                      <li>• Land Deed Marketplace</li>
                    </ul>
                  </div>
                  <div className="border-2 border-gray-300 p-4">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Platform Features
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>• Avalanche Blockchain</li>
                      <li>• NFT Integration</li>
                      <li>• AI Trading Assistant</li>
                      <li>• Real Wyoming Data</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href="/games">
                      <GamepadIcon className="mr-2 h-4 w-4" />
                      Explore Games
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/market">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View Markets
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Secondary Stories */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {featuredArticles.slice(1, 3).map((article) => (
                  <div key={article.id} className="border-4 border-black p-4 bg-white">
                    <Badge variant="outline" className="mb-2">
                      {article.category}
                    </Badge>
                    <h3 className="text-xl font-serif font-bold mb-2 leading-tight">{article.headline}</h3>
                    <p className="text-sm text-gray-700 mb-3">{article.summary}</p>
                    <div className="text-xs text-gray-500">{new Date(article.timestamp).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-span-4 space-y-6">
              {/* Weather Widget */}
              <div className="border-4 border-black p-4 bg-white">
                <h3 className="text-xl font-serif font-bold mb-3 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Wyoming Weather
                </h3>
                <div className="text-center">
                  <div className="text-3xl font-bold">32°F</div>
                  <div className="text-sm text-gray-600">Partly Cloudy</div>
                  <div className="text-xs mt-2">Cheyenne, WY</div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="border-4 border-black p-4 bg-white">
                <h3 className="text-xl font-serif font-bold mb-3">Quick Access</h3>
                <div className="space-y-2">
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/boxing-arena">🥊 Boxing Arena</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/saloon">🍻 Bill's Saloon</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/land-deeds">🏠 Land Deeds</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/osha">⚠️ Safety Training</Link>
                  </Button>
                </div>
              </div>

              {/* Other Games Section */}
              <div className="border-4 border-black p-4 bg-white">
                <h3 className="text-xl font-serif font-bold mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  More Adventures
                </h3>
                <div className="space-y-3">
                  <div className="border-2 border-gray-300 p-3">
                    <h4 className="font-bold text-sm mb-1">Crypto Classic Games</h4>
                    <p className="text-xs text-gray-600 mb-2">
                      Explore our collection of blockchain-powered classic games
                    </p>
                    <Button asChild size="sm" variant="outline" className="w-full bg-transparent">
                      <a href="https://github.com/Luckyspotonline" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Visit Luckyspotonline
                      </a>
                    </Button>
                  </div>

                  <div className="border-2 border-gray-300 p-3">
                    <h4 className="font-bold text-sm mb-1">Community Hub</h4>
                    <p className="text-xs text-gray-600 mb-2">Join our growing community of digital pioneers</p>
                    <Button asChild size="sm" variant="outline" className="w-full bg-transparent">
                      <Link href="/community">
                        <Users className="mr-1 h-3 w-3" />
                        Join Community
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* News Sidebar */}
              <div className="border-4 border-black p-4 bg-white">
                <h3 className="text-xl font-serif font-bold mb-3">Latest Updates</h3>
                <div className="space-y-4">
                  {sidebarNews.map((article) => (
                    <div key={article.id} className="border-b border-gray-300 pb-3 last:border-b-0">
                      <Badge variant="secondary" className="text-xs mb-1">
                        {article.category}
                      </Badge>
                      <h4 className="font-bold text-sm mb-1 leading-tight">{article.headline}</h4>
                      <p className="text-xs text-gray-600 mb-1">{article.summary}</p>
                      <div className="text-xs text-gray-500">{new Date(article.timestamp).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advertisement */}
              <div className="border-4 border-black p-4 bg-gradient-to-b from-yellow-100 to-yellow-200">
                <div className="text-center">
                  <h4 className="font-serif font-bold text-lg mb-2">FRONTIER TRADING</h4>
                  <p className="text-sm mb-3">Start your crypto journey with Bar Keep Bill's expert guidance</p>
                  <Button asChild size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white">
                    <Link href="/frontier-trader">Start Trading</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-4 border-black p-4 bg-gray-100 text-center text-sm">
            <div className="flex justify-center items-center gap-4 mb-2">
              <span>© 2024 WyoVerse Pioneer</span>
              <span>•</span>
              <span>Digital Frontier News</span>
              <span>•</span>
              <span>Powered by Blockchain Technology</span>
            </div>
            <div className="text-xs text-gray-600">
              "Where the Old West Meets Web3" - Bringing Wyoming's frontier spirit to the digital age
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
