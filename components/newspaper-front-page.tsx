"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useMarketStore } from "@/lib/stores/market-store"
import { AssetList } from "@/components/asset-list"
import { MarketMoodIndicator } from "@/components/market-mood-indicator"
import Link from "next/link"
import {
  ArrowRight,
  Landmark,
  Mountain,
  Newspaper,
  Video,
  TrendingUp,
  Gamepad2,
  Calendar,
  Users,
  LandPlot,
  Wind,
  Gem,
  Scroll,
  MessageSquare,
} from "lucide-react"
import Image from "next/image"
import { RevenueDashboard } from "@/components/revenue-dashboard"
import { GamePreviewSystem } from "@/components/game-preview-system"

export function NewspaperFrontPage() {
  const { initializeMarket, updateMarketConditions, marketMood, assets } = useMarketStore()

  useEffect(() => {
    initializeMarket()
    const interval = setInterval(() => {
      updateMarketConditions()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="max-w-7xl mx-auto newspaper-bg text-black">
      {/* Newspaper Header */}
      <div className="border-b-4 border-black pb-4 mb-6">
        <div className="text-center relative py-4">
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="w-1/2 h-[1px] bg-black"></div>
          </div>
          <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-black"></div>
          <div className="relative">
            <p className="text-sm font-serif mb-2">ESTABLISHED 1868 • TERRITORY OF WYOMING</p>
            <h1 className="text-7xl font-bold font-serif tracking-tight uppercase">THE WYOVERSE PIONEER</h1>
            <div className="flex justify-between items-center mt-2 px-8">
              <p className="text-sm font-serif">Vol. 1, No. 1</p>
              <p className="text-sm font-serif">{currentDate}</p>
              <p className="text-sm font-serif">PRICE: 5¢</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Bar */}
      <div className="border-4 border-black p-1 mb-6">
        <div className="border-2 border-black p-3 bg-gray-100">
          <div className="flex justify-center items-center gap-6 flex-wrap">
            <Link href="/business" className="flex items-center gap-1 hover:underline font-serif font-medium">
              <TrendingUp className="h-4 w-4" />
              BUSINESS
            </Link>
            <Link href="/sports" className="flex items-center gap-1 hover:underline font-serif font-medium">
              <Gamepad2 className="h-4 w-4" />
              SPORTS
            </Link>
            <Link href="/classifieds" className="flex items-center gap-1 hover:underline font-serif font-medium">
              <Newspaper className="h-4 w-4" />
              CLASSIFIEDS
            </Link>
            <Link href="/streaming" className="flex items-center gap-1 hover:underline font-serif font-medium">
              <Video className="h-4 w-4" />
              LIVE STREAM
            </Link>
            <Link href="/calendar" className="flex items-center gap-1 hover:underline font-serif font-medium">
              <Calendar className="h-4 w-4" />
              EVENTS
            </Link>
            <Link href="/community" className="flex items-center gap-1 hover:underline font-serif font-medium">
              <Users className="h-4 w-4" />
              COMMUNITY
            </Link>
          </div>
        </div>
      </div>

      {/* Main Story Layout */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* Lead Story */}
        <div className="col-span-8">
          <div className="border-4 border-black p-1">
            <div className="border-2 border-black p-4">
              <div className="text-center mb-4">
                <h2 className="text-4xl font-bold font-serif uppercase mb-1">LIVE CRYPTO ARENA BATTLES</h2>
                <h3 className="text-xl font-serif italic">Bull vs Bear Markets Drive Epic Boxing Matches</h3>
              </div>
              <div className="flex gap-4 mb-4">
                <div className="w-1/2 relative">
                  <Image
                    src="/images/victory-bull-colosseum.webp"
                    alt="Victory Bull in Colosseum"
                    width={500}
                    height={400}
                    className="border-2 border-black w-full h-auto"
                  />
                  <div className="absolute bottom-2 right-2 bg-[#f8f3e3] border border-black px-2 py-1 text-xs font-serif">
                    Victory Bull dominates the arena
                  </div>
                </div>
                <div className="w-1/2">
                  <p className="text-lg mb-4 font-serif leading-tight">
                    Revolutionary new arena battles where real cryptocurrency market movements drive the intensity and
                    outcome of epic boxing matches between market-themed fighters.
                  </p>
                  <p className="mb-4 font-serif leading-tight">
                    Watch live on Twitch and YouTube as AI commentators provide real-time market analysis while Bull and
                    Bear fighters duke it out in our Roman colosseum.
                  </p>
                  <div className="flex gap-2">
                    <Link href="/streaming">
                      <Button className="bg-red-600 text-white hover:bg-red-700 font-serif">
                        <Video className="h-4 w-4 mr-2" />
                        WATCH LIVE
                      </Button>
                    </Link>
                    <Link href="/boxing-arena">
                      <Button variant="outline" className="border-black font-serif">
                        ENTER ARENA
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Sidebar */}
        <div className="col-span-4">
          <div className="border-4 border-black p-1 h-full">
            <div className="border-2 border-black p-4 h-full">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold font-serif uppercase">MARKET WATCH</h3>
              </div>
              <div className="mb-4">
                <p className="text-sm font-serif mb-2">Current Market Mood:</p>
                <MarketMoodIndicator mood={marketMood} />
              </div>
              <div className="mt-4">
                <h4 className="font-medium font-serif text-center border-t-2 border-b-2 border-black py-1">
                  TOP ASSETS
                </h4>
                <AssetList limit={3} />
                <Link href="/market">
                  <Button variant="link" className="mt-2 p-0 text-black font-serif w-full">
                    View Full Market Hub
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Game Preview Section */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-12">
          <div className="border-4 border-black p-1">
            <div className="border-2 border-black p-4">
              <div className="text-center mb-4">
                <h3 className="text-3xl font-bold font-serif uppercase">GAMING ARCADE</h3>
                <p className="text-sm font-serif italic">Live from the Digital Frontier</p>
              </div>
              <GamePreviewSystem />
            </div>
          </div>
        </div>
      </div>

      {/* Saloon Section - Bill the Barkeep */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-6">
          <div className="border-4 border-black p-1">
            <div className="border-2 border-black p-4">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold font-serif uppercase">SALOON TALES</h3>
                <p className="text-sm font-serif italic">With Bill the Barkeep</p>
              </div>
              <div className="flex gap-4">
                <div className="w-1/3">
                  <div className="border-2 border-black p-2 text-center">
                    <div className="text-6xl mb-2">🤠</div>
                    <p className="text-xs font-serif">Bill the Barkeep</p>
                  </div>
                </div>
                <div className="w-2/3">
                  <div className="newspaper-quote">
                    <p className="font-serif italic">
                      "Well howdy there, partner! Pull up a stool and let me tell ya about the latest happenings in our
                      digital frontier. The crypto markets are wilder than a bronco today, and the boxing matches are
                      drawing crowds from all over the territory!"
                    </p>
                  </div>
                  <p className="text-sm font-serif">
                    Bill's been serving drinks and wisdom since the territory was founded. Stop by the saloon for the
                    latest gossip, market tips, and tall tales from the frontier.
                  </p>
                </div>
              </div>
              <div className="text-center mt-4">
                <Link href="/saloon">
                  <Button className="newspaper-button">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    VISIT SALOON
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-6">
          <div className="border-4 border-black p-1">
            <div className="border-2 border-black p-4">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold font-serif uppercase">FRONTIER TRADER</h3>
                <p className="text-sm font-serif">Advanced Trading Tools</p>
              </div>
              <div className="relative h-32 mb-3">
                <Image
                  src="/images/wyoverse-digital-mountain.png"
                  alt="Digital Trading"
                  width={300}
                  height={128}
                  className="w-full h-full object-cover border border-black"
                />
              </div>
              <p className="text-sm font-serif mb-3">
                Advanced trading bots and market analysis tools for the digital frontier. Navigate the volatile crypto
                markets with precision.
              </p>
              <Link href="/trading">
                <Button className="newspaper-button w-full">START TRADING</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Dashboard Section */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-12">
          <div className="border-4 border-black p-1">
            <div className="border-2 border-black p-4 bg-green-50">
              <div className="text-center mb-4">
                <h3 className="text-3xl font-bold font-serif uppercase">FRONTIER TREASURY</h3>
                <p className="text-sm font-serif italic">Live Revenue from the Digital Territory</p>
              </div>
              <RevenueDashboard />
            </div>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-12">
          <div className="border-4 border-black p-1">
            <div className="border-2 border-black p-4 bg-yellow-50">
              <h3 className="text-2xl font-bold font-serif text-center mb-4 border-b-2 border-black pb-2">
                NEWSPAPER SECTIONS
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/business" className="group">
                  <div className="border-2 border-black p-3 hover:bg-gray-100 transition-colors">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                    <h4 className="font-serif font-bold text-center">BUSINESS</h4>
                    <p className="text-xs font-serif text-center">Finance, Trading, Markets</p>
                  </div>
                </Link>
                <Link href="/sports" className="group">
                  <div className="border-2 border-black p-3 hover:bg-gray-100 transition-colors">
                    <Gamepad2 className="h-8 w-8 mx-auto mb-2" />
                    <h4 className="font-serif font-bold text-center">SPORTS</h4>
                    <p className="text-xs font-serif text-center">Games, Rodeo, Arena</p>
                  </div>
                </Link>
                <Link href="/lifestyle" className="group">
                  <div className="border-2 border-black p-3 hover:bg-gray-100 transition-colors">
                    <Mountain className="h-8 w-8 mx-auto mb-2" />
                    <h4 className="font-serif font-bold text-center">LIFESTYLE</h4>
                    <p className="text-xs font-serif text-center">Tourism, Parks, Culture</p>
                  </div>
                </Link>
                <Link href="/classifieds" className="group">
                  <div className="border-2 border-black p-3 hover:bg-gray-100 transition-colors">
                    <Newspaper className="h-8 w-8 mx-auto mb-2" />
                    <h4 className="font-serif font-bold text-center">CLASSIFIEDS</h4>
                    <p className="text-xs font-serif text-center">Buy, Sell, Trade</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Stories Grid */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-4">
          <div className="border-4 border-black p-1">
            <div className="border-2 border-black p-4">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold font-serif uppercase">CHEYENNE FRONTIER DAYS</h3>
                <p className="text-sm font-serif">Digital VR Experience Coming Soon</p>
              </div>
              <div className="relative h-32 mb-3">
                <Image
                  src="/images/frontier-days.png"
                  alt="Frontier Days"
                  width={200}
                  height={128}
                  className="w-full h-full object-cover border border-black"
                />
              </div>
              <p className="text-sm font-serif mb-3">
                Experience the world's largest outdoor rodeo in virtual reality. Participate in events, earn NFTs, and
                celebrate western heritage.
              </p>
              <Link href="/tourism">
                <Button variant="link" className="p-0 text-black font-serif">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <div className="border-4 border-black p-1">
            <div className="border-2 border-black p-4">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold font-serif uppercase">WYOMING PYRAMID MYSTERY</h3>
                <p className="text-sm font-serif">Ancient Secrets Meet Modern Exploration</p>
              </div>
              <div className="flex justify-center mb-3">
                <Landmark className="h-16 w-16 text-black" />
              </div>
              <p className="text-sm font-serif mb-3">
                Researchers continue to study Wyoming's enigmatic pyramid structure and its astronomical significance in
                our digital frontier.
              </p>
              <Link href="/wyoming-pyramid">
                <Button variant="link" className="p-0 text-black font-serif">
                  Investigate <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <div className="border-4 border-black p-1">
            <div className="border-2 border-black p-4">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold font-serif uppercase">EDUCATION FRONTIER</h3>
                <p className="text-sm font-serif">Learning in the Digital Territory</p>
              </div>
              <div className="space-y-2 text-sm font-serif">
                <div className="border-b border-gray-300 pb-1">
                  <p className="font-medium">University of Wyoming</p>
                  <p className="text-xs">Digital campus enrollment open</p>
                </div>
                <div className="border-b border-gray-300 pb-1">
                  <p className="font-medium">OSHA VR Training</p>
                  <p className="text-xs">Safety certification available</p>
                </div>
                <div>
                  <p className="font-medium">Blockchain Academy</p>
                  <p className="text-xs">Crypto fundamentals course</p>
                </div>
              </div>
              <Link href="/education">
                <Button variant="link" className="mt-3 p-0 text-black font-serif">
                  Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        {[
          { href: "/land-deeds", icon: LandPlot, title: "Land Deeds", desc: "Digital property ownership" },
          { href: "/energy", icon: Wind, title: "Energy", desc: "Wyoming power markets" },
          { href: "/stones", icon: Gem, title: "Stones & NFTs", desc: "Digital collectibles" },
          { href: "/native-history", icon: Scroll, title: "Native History", desc: "Indigenous knowledge" },
          { href: "/community", icon: Users, title: "Community", desc: "Pioneer network" },
          { href: "/saloon", icon: MessageSquare, title: "Saloon", desc: "Social gathering" },
        ].map((item, index) => (
          <Link key={index} href={item.href} className="group">
            <div className="border-2 border-black p-3 hover:bg-gray-100 transition-colors text-center">
              <item.icon className="h-6 w-6 mx-auto mb-1" />
              <h4 className="font-serif font-bold text-sm">{item.title}</h4>
              <p className="text-xs font-serif text-gray-600">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t-4 border-black pt-4 text-center">
        <div className="flex justify-center mb-2">
          <Image src="/images/stoneyard-games.jpeg" alt="Stoneyard Games" width={100} height={100} />
        </div>
        <p className="font-serif text-sm">PUBLISHED BY WYOVERSE PIONEER PRESS • TERRITORY OF WYOMING</p>
        <p className="font-serif text-xs text-gray-600 mt-1">
          "Building the Digital Frontier Since 1868" • All Rights Reserved
        </p>
      </div>
    </div>
  )
}

export default NewspaperFrontPage
