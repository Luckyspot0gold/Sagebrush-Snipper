"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Activity,
  Calendar,
  MapPin,
  Trophy,
  Heart,
  Gamepad2,
  ExternalLink,
} from "lucide-react"

export function NewspaperFrontPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [marketData, setMarketData] = useState({
    bitcoin: { price: 43250, change: 2.4 },
    ethereum: { price: 2680, change: -1.2 },
    avalanche: { price: 38.5, change: 5.7 },
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

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
    <div className="min-h-screen newspaper-bg p-4">
      <div className="max-w-7xl mx-auto">
        {/* Newspaper Header */}
        <div className="text-center mb-8 border-8 border-black p-6 bg-white">
          <div className="border-4 border-black p-4">
            <h1 className="newspaper-headline text-6xl mb-2">WYOVERSE PIONEER</h1>
            <div className="flex justify-between items-center text-sm font-bold">
              <span>EST. 2024</span>
              <span>{formatDate(currentTime)}</span>
              <span>PRICE: FREE</span>
            </div>
            <div className="text-center mt-2">
              <span className="text-lg font-bold">LIVE: {formatTime(currentTime)}</span>
            </div>
            <Separator className="my-4 bg-black h-1" />
            <p className="newspaper-subheadline text-xl">"Pioneering the Digital Frontier of Wyoming"</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Main Stories */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lead Story */}
            <div className="newspaper-article">
              <div className="newspaper-article-inner">
                <h2 className="newspaper-section-title">BREAKING NEWS</h2>
                <h3 className="text-3xl font-bold mb-4 uppercase">Digital Rodeo Championships Begin Today</h3>
                <div className="newspaper-byline">By Sarah "Frontier" Johnson, Sports Editor</div>
                <div className="newspaper-dateline">CHEYENNE, WY - {formatDate(currentTime)}</div>

                <div className="relative mb-4">
                  <Image
                    src="/images/arialcheyennerodeo.png"
                    alt="Cheyenne Digital Rodeo Arena"
                    width={600}
                    height={300}
                    className="w-full h-64 object-cover border-2 border-black"
                  />
                  <div className="newspaper-image-caption">
                    Aerial view of the Cheyenne Digital Rodeo Arena where champions will be crowned
                  </div>
                </div>

                <div className="newspaper-paragraph">
                  The most anticipated event of the digital frontier season kicks off today as cowboys and cowgirls from
                  across the virtual Wyoming territory gather to compete in the first-ever WyoVerse Digital Rodeo
                  Championships. With over $100,000 in cryptocurrency prizes at stake, this three-day event promises to
                  be the most exciting competition in frontier gaming history.
                </div>

                <div className="newspaper-paragraph">
                  "We've got riders coming from as far as the digital Tetons and the virtual Powder River Basin," said
                  Championship Director Buck "Lightning" Thompson. "The level of skill we're seeing this year is
                  unprecedented. These digital cowboys have been training in our advanced simulation systems, and
                  they're ready to show what frontier spirit really means."
                </div>

                <Link href="/digital-rodeo">
                  <Button className="newspaper-button mt-4">Join the Rodeo →</Button>
                </Link>
              </div>
            </div>

            {/* Crypto Market Story */}
            <div className="newspaper-article">
              <div className="newspaper-article-inner">
                <h2 className="newspaper-section-title">MARKET REPORT</h2>
                <h3 className="text-2xl font-bold mb-4 uppercase">Frontier Trading Post Sees Record Volume</h3>
                <div className="newspaper-byline">By "Bar Keep" Bill, Market Analyst</div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <Card className="text-center">
                    <CardContent className="p-3">
                      <div className="font-bold text-lg">BTC</div>
                      <div className="text-2xl font-bold">${marketData.bitcoin.price.toLocaleString()}</div>
                      <div
                        className={`flex items-center justify-center gap-1 ${marketData.bitcoin.change > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {marketData.bitcoin.change > 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {Math.abs(marketData.bitcoin.change)}%
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-3">
                      <div className="font-bold text-lg">ETH</div>
                      <div className="text-2xl font-bold">${marketData.ethereum.price.toLocaleString()}</div>
                      <div
                        className={`flex items-center justify-center gap-1 ${marketData.ethereum.change > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {marketData.ethereum.change > 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {Math.abs(marketData.ethereum.change)}%
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-3">
                      <div className="font-bold text-lg">AVAX</div>
                      <div className="text-2xl font-bold">${marketData.avalanche.price}</div>
                      <div
                        className={`flex items-center justify-center gap-1 ${marketData.avalanche.change > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {marketData.avalanche.change > 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {Math.abs(marketData.avalanche.change)}%
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="newspaper-paragraph">
                  Trading volume at the WyoVerse Frontier Trading Post reached an all-time high yesterday, with over
                  $2.3 million in cryptocurrency transactions processed. The surge comes as more pioneers discover the
                  benefits of decentralized trading in the digital frontier economy.
                </div>

                <Link href="/cryptopia">
                  <Button className="newspaper-button mt-4">Visit Trading Post →</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Middle Column - Featured Games */}
          <div className="space-y-6">
            {/* Games Section */}
            <div className="newspaper-article">
              <div className="newspaper-article-inner">
                <h2 className="newspaper-section-title">FRONTIER GAMES</h2>

                {/* Crypto Clashers Boxing */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">CRYPTO CLASHERS BOXING</h3>
                  <div className="relative mb-2">
                    <Image
                      src="/images/cryptoclasherboxingposter.jpg"
                      alt="Crypto Clashers Boxing"
                      width={300}
                      height={200}
                      className="w-full h-32 object-cover border-2 border-black"
                    />
                    <Badge className="absolute top-2 right-2 bg-red-600 text-white">LIVE NOW</Badge>
                  </div>
                  <p className="text-sm mb-2">
                    Epic battles in the digital colosseum! Watch as crypto-powered fighters duke it out for glory and
                    prizes.
                  </p>
                  <Link href="https://github.com/LuckyspotOgold/Crypto" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                      <Gamepad2 className="mr-2 h-4 w-4" />
                      Play Boxing <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>

                <Separator className="my-4" />

                {/* Crypto Clashers Racing */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">CRYPTO CLASHERS RACING</h3>
                  <div className="relative mb-2">
                    <Image
                      src="/images/cryptoclasherwcarsposter.jpg"
                      alt="Crypto Clashers Racing"
                      width={300}
                      height={200}
                      className="w-full h-32 object-cover border-2 border-black"
                    />
                    <Badge className="absolute top-2 right-2 bg-blue-600 text-white">RACE NOW</Badge>
                  </div>
                  <p className="text-sm mb-2">
                    High-speed crypto-powered racing through the digital frontier! Compete for the championship title.
                  </p>
                  <Link href="https://github.com/LuckyspotOgold/Crypto" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                      <Trophy className="mr-2 h-4 w-4" />
                      Start Racing <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>

                <Separator className="my-4" />

                {/* Frontier Trader */}
                <div>
                  <h3 className="text-xl font-bold mb-2">FRONTIER TRADER</h3>
                  <div className="relative mb-2">
                    <Image
                      src="/images/frontiertraderposter.jpg"
                      alt="Frontier Trader"
                      width={300}
                      height={200}
                      className="w-full h-32 object-cover border-2 border-black"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-600 text-white">TRADE NOW</Badge>
                  </div>
                  <p className="text-sm mb-2">
                    Master the art of frontier commerce! Build your trading empire across the digital Wyoming territory.
                  </p>
                  <Link href="https://github.com/LuckyspotOgold/Crypto" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Start Trading <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Community Stats */}
            <div className="newspaper-article">
              <div className="newspaper-article-inner">
                <h2 className="newspaper-section-title">COMMUNITY PULSE</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">Active Pioneers</span>
                    </div>
                    <span className="font-bold">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">Land Claims</span>
                    </div>
                    <span className="font-bold">892</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      <span className="text-sm">Active Trades</span>
                    </div>
                    <span className="font-bold">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Social Good</span>
                    </div>
                    <span className="font-bold text-green-600">$12,450</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar Content */}
          <div className="space-y-6">
            {/* Weather */}
            <div className="newspaper-article">
              <div className="newspaper-article-inner">
                <h2 className="newspaper-section-title">FRONTIER WEATHER</h2>
                <div className="text-center">
                  <div className="text-3xl mb-2">☀️</div>
                  <div className="text-2xl font-bold">72°F</div>
                  <div className="text-sm">Sunny & Clear</div>
                  <div className="text-xs mt-2">Perfect weather for digital prospecting!</div>
                </div>
              </div>
            </div>

            {/* Wanted Poster */}
            <div className="newspaper-article bg-gradient-to-b from-amber-100 to-amber-200">
              <div className="newspaper-article-inner text-center">
                <h2 className="text-red-800 font-bold text-xl mb-4">WANTED</h2>
                <Image
                  src="/images/wyoverse-stone-wanted-poster.png"
                  alt="Stone The Enforcer Wanted Poster"
                  width={200}
                  height={250}
                  className="w-full h-48 object-cover border-2 border-black mb-2"
                />
                <h3 className="font-bold text-lg">STONE "THE ENFORCER"</h3>
                <p className="text-red-600 font-bold">$50,000 BOUNTY</p>
                <p className="text-sm mt-2">
                  Wanted for illegal mining operations in protected digital wilderness areas
                </p>
              </div>
            </div>

            {/* Classified Ads */}
            <div className="newspaper-article">
              <div className="newspaper-article-inner">
                <h2 className="newspaper-section-title">CLASSIFIEDS</h2>
                <div className="space-y-3 text-sm">
                  <div className="border-b pb-2">
                    <strong>LAND FOR SALE:</strong> Prime digital real estate near Yellowstone. 50 acres, mineral rights
                    included. Contact Bill at the Saloon.
                  </div>
                  <div className="border-b pb-2">
                    <strong>MINING EQUIPMENT:</strong> Crypto mining rigs for sale. High efficiency, low power
                    consumption. Perfect for frontier operations.
                  </div>
                  <div className="border-b pb-2">
                    <strong>TRADING LESSONS:</strong> Learn from the best! Bar Keep Bill offers private trading
                    tutorials. All skill levels welcome.
                  </div>
                  <div>
                    <strong>WANTED:</strong> Experienced ranch hands for digital cattle operation. Must have blockchain
                    experience. Good pay + benefits.
                  </div>
                </div>
                <Link href="/classifieds">
                  <Button size="sm" className="w-full mt-4">
                    View All Classifieds →
                  </Button>
                </Link>
              </div>
            </div>

            {/* Events Calendar */}
            <div className="newspaper-article">
              <div className="newspaper-article-inner">
                <h2 className="newspaper-section-title">UPCOMING EVENTS</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 mt-0.5" />
                    <div>
                      <strong>Today:</strong> Digital Rodeo Championships begin
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 mt-0.5" />
                    <div>
                      <strong>Tomorrow:</strong> Crypto Trading Workshop at Bill's Saloon
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 mt-0.5" />
                    <div>
                      <strong>This Weekend:</strong> Land Auction - Premium plots available
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 mt-0.5" />
                    <div>
                      <strong>Next Week:</strong> Mining Safety Training (OSHA Certified)
                    </div>
                  </div>
                </div>
                <Link href="/calendar">
                  <Button size="sm" className="w-full mt-4">
                    View Full Calendar →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center border-4 border-black p-4 bg-white">
          <div className="border-2 border-black p-3">
            <p className="font-bold text-lg mb-2">"Where Digital Meets Frontier Spirit"</p>
            <div className="flex justify-center items-center gap-4 text-sm">
              <span>📧 news@wyoverse.com</span>
              <span>📞 1-800-WYOVERSE</span>
              <span>🌐 wyoverse.com</span>
            </div>
            <div className="mt-2 text-xs">
              <p>Published daily in the WyoVerse Digital Territory</p>
              <p>© 2024 WyoVerse Pioneer. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
