"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useMarketStore } from "@/lib/stores/market-store"
import { AssetList } from "@/components/asset-list"
import { MarketMoodIndicator } from "@/components/market-mood-indicator"
import { VintageMarketplaceWidget } from "@/components/vintage-marketplace-widget"
import { MusicPlayer } from "@/components/music-player"
import { useSoundEffects } from "@/lib/sound-effects"
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
  Volume2,
} from "lucide-react"
import Image from "next/image"

export function NewspaperFrontPage() {
  const { initializeMarket, updateMarketConditions, marketMood, assets } = useMarketStore()
  const { playPageFlip, playTypewriter, toggleSounds } = useSoundEffects()

  useEffect(() => {
    initializeMarket()
    playTypewriter() // Welcome sound

    const interval = setInterval(() => {
      updateMarketConditions()
    }, 5000)
    return () => clearInterval(interval)
  }, [initializeMarket, updateMarketConditions, playTypewriter])

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const handleSectionClick = (section: string) => {
    playPageFlip()
    // Navigation will be handled by Link component
  }

  return (
    <div className="max-w-7xl mx-auto parchment-bg text-black min-h-screen relative">
      {/* Sound Toggle */}
      <Button variant="ghost" size="sm" onClick={toggleSounds} className="fixed top-4 left-4 z-50 brass-border">
        <Volume2 className="h-4 w-4" />
      </Button>

      {/* Music Player */}
      <MusicPlayer />

      {/* Newspaper Header with Enhanced Styling */}
      <div className="border-b-4 border-black pb-4 mb-6 page-fold">
        <div className="text-center relative py-8">
          {/* Decorative Border */}
          <div className="absolute top-2 left-2 right-2 bottom-2 brass-border"></div>

          {/* Steampunk Gears */}
          <div className="absolute top-4 left-8">
            <div className="gear text-4xl">⚙️</div>
          </div>
          <div className="absolute top-4 right-8">
            <div className="gear-reverse text-4xl">⚙️</div>
          </div>

          <div className="relative z-10">
            <p className="text-sm font-vintage mb-2 brass-text">ESTABLISHED 1868 • TERRITORY OF WYOMING</p>
            <h1 className="text-7xl font-bold font-steampunk tracking-tight uppercase typewriter">
              THE WYOVERSE PIONEER
            </h1>
            <div className="flex justify-between items-center mt-4 px-8">
              <p className="text-sm font-vintage">Vol. 1, No. 1</p>
              <div className="wax-seal"></div>
              <p className="text-sm font-vintage">{currentDate}</p>
              <div className="wax-seal"></div>
              <p className="text-sm font-vintage">PRICE: 5¢</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Navigation Bar */}
      <div className="vintage-card p-1 mb-6">
        <div className="leather-texture p-3">
          <div className="flex justify-center items-center gap-6 flex-wrap">
            {[
              { href: "/business", icon: TrendingUp, label: "BUSINESS", sound: "coinDrop" },
              { href: "/sports", icon: Gamepad2, label: "SPORTS", sound: "gearTurn" },
              { href: "/classifieds", icon: Newspaper, label: "CLASSIFIEDS", sound: "paperRustle" },
              { href: "/streaming", icon: Video, label: "LIVE STREAM", sound: "steamHiss" },
              { href: "/calendar", icon: Calendar, label: "EVENTS", sound: "inkDrop" },
              { href: "/community", icon: Users, label: "COMMUNITY", sound: "waxSeal" },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center gap-1 hover:underline font-vintage font-medium text-white hover:text-yellow-200 transition-colors"
                onClick={() => handleSectionClick(item.label)}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Story Layout with Enhanced Visuals */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* Lead Story */}
        <div className="col-span-8">
          <div className="vintage-card p-1">
            <div className="newspaper-article-inner">
              <div className="text-center mb-4">
                <h2 className="newspaper-headline">LIVE CRYPTO ARENA BATTLES</h2>
                <h3 className="newspaper-subheadline">Bull vs Bear Markets Drive Epic Boxing Matches</h3>
              </div>
              <div className="flex gap-4 mb-4">
                <div className="w-1/2 relative">
                  <Image
                    src="/images/victory-bull-colosseum.webp"
                    alt="Victory Bull in Colosseum"
                    width={500}
                    height={400}
                    className="border-2 border-black w-full h-auto ink-bleed"
                  />
                  <div className="newspaper-image-caption">Victory Bull dominates the arena as Bitcoin surges</div>
                </div>
                <div className="w-1/2 newspaper-columns">
                  <p className="newspaper-paragraph">
                    Revolutionary new arena battles where real cryptocurrency market movements drive the intensity and
                    outcome of epic boxing matches between market-themed fighters.
                  </p>
                  <p className="newspaper-paragraph">
                    Watch live on Twitch and YouTube as AI commentators provide real-time market analysis while Bull and
                    Bear fighters duke it out in our Roman colosseum.
                  </p>
                  <div className="flex gap-2">
                    <Link href="/streaming">
                      <Button className="newspaper-button bg-red-600 text-white hover:bg-red-700">
                        <Video className="h-4 w-4 mr-2" />
                        WATCH LIVE
                      </Button>
                    </Link>
                    <Link href="/boxing-arena">
                      <Button className="newspaper-button" variant="outline">
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
          <div className="vintage-card p-1 h-full">
            <div className="newspaper-article-inner h-full">
              <div className="text-center mb-4">
                <h3 className="newspaper-section-title">MARKET WATCH</h3>
              </div>
              <div className="mb-4">
                <p className="text-sm font-vintage mb-2">Current Market Mood:</p>
                <MarketMoodIndicator mood={marketMood} />
              </div>
              <div className="mt-4">
                <h4 className="font-medium font-vintage text-center border-t-2 border-b-2 border-black py-1">
                  TOP ASSETS
                </h4>
                <AssetList limit={3} />
                <Link href="/finance">
                  <Button variant="link" className="mt-2 p-0 text-black font-vintage w-full">
                    View Full Finance Hub
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Games Section */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-4">
          <div className="vintage-card p-1">
            <div className="newspaper-article-inner">
              <div className="text-center mb-4">
                <h3 className="newspaper-section-title">CRYPTO CLASHERS BOXING</h3>
              </div>
              <div className="relative h-32 mb-3">
                <Image
                  src="/images/crypto-clashers-fighter.png"
                  alt="Crypto Clashers Fighter"
                  width={200}
                  height={128}
                  className="w-full h-full object-cover border border-black ink-bleed"
                />
              </div>
              <p className="newspaper-paragraph text-sm">
                Elite fighters battle in market-driven combat. Each punch powered by real crypto volatility.
              </p>
              <Link href="/boxing-arena">
                <Button className="newspaper-button w-full">ENTER RING</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <div className="vintage-card p-1">
            <div className="newspaper-article-inner">
              <div className="text-center mb-4">
                <h3 className="newspaper-section-title">CRYPTO CLASHERS RACING</h3>
              </div>
              <div className="relative h-32 mb-3">
                <Image
                  src="/images/crypto-clashers-racing-poster.png"
                  alt="Crypto Racing"
                  width={200}
                  height={128}
                  className="w-full h-full object-cover border border-black ink-bleed"
                />
              </div>
              <p className="newspaper-paragraph text-sm">
                High-speed racing where markets determine velocity. Race for crypto, not pink slips!
              </p>
              <Link href="/racing-circuit">
                <Button className="newspaper-button w-full">START ENGINES</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <div className="vintage-card p-1">
            <div className="newspaper-article-inner">
              <div className="text-center mb-4">
                <h3 className="newspaper-section-title">FRONTIER TRADER</h3>
              </div>
              <div className="relative h-32 mb-3">
                <Image
                  src="/images/wyoverse-digital-mountain.png"
                  alt="Digital Trading"
                  width={200}
                  height={128}
                  className="w-full h-full object-cover border border-black ink-bleed"
                />
              </div>
              <p className="newspaper-paragraph text-sm">
                Advanced trading bots and market analysis tools for the digital frontier.
              </p>
              <Link href="/trading">
                <Button className="newspaper-button w-full">START TRADING</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Vintage Marketplace Widget */}
      <div className="mb-6">
        <VintageMarketplaceWidget />
      </div>

      {/* Section Navigation */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-12">
          <div className="vintage-card p-1">
            <div className="newspaper-article-inner bg-yellow-50">
              <h3 className="newspaper-section-title text-center mb-4">NEWSPAPER SECTIONS</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { href: "/business", icon: TrendingUp, title: "BUSINESS", desc: "Finance, Trading, Markets" },
                  { href: "/sports", icon: Gamepad2, title: "SPORTS", desc: "Games, Rodeo, Arena" },
                  { href: "/lifestyle", icon: Mountain, title: "LIFESTYLE", desc: "Tourism, Parks, Culture" },
                  { href: "/classifieds", icon: Newspaper, title: "CLASSIFIEDS", desc: "Buy, Sell, Trade" },
                ].map((item, index) => (
                  <Link key={index} href={item.href} className="group" onClick={() => handleSectionClick(item.title)}>
                    <div className="vintage-card p-3 hover:shadow-lg transition-all duration-300 ink-bleed">
                      <item.icon className="h-8 w-8 mx-auto mb-2 brass-text" />
                      <h4 className="font-vintage font-bold text-center">{item.title}</h4>
                      <p className="text-xs font-serif text-center">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Stories Grid */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-4">
          <div className="vintage-card p-1">
            <div className="newspaper-article-inner">
              <div className="text-center mb-4">
                <h3 className="newspaper-section-title">CHEYENNE FRONTIER DAYS</h3>
                <p className="text-sm font-vintage">Digital VR Experience Coming Soon</p>
              </div>
              <div className="relative h-32 mb-3">
                <Image
                  src="/images/frontier-days.png"
                  alt="Frontier Days"
                  width={200}
                  height={128}
                  className="w-full h-full object-cover border border-black ink-bleed"
                />
              </div>
              <p className="newspaper-paragraph text-sm">
                Experience the world's largest outdoor rodeo in virtual reality. Participate in events, earn NFTs, and
                celebrate western heritage.
              </p>
              <Link href="/tourism">
                <Button variant="link" className="p-0 text-black font-vintage">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <div className="vintage-card p-1">
            <div className="newspaper-article-inner">
              <div className="text-center mb-4">
                <h3 className="newspaper-section-title">WYOMING PYRAMID MYSTERY</h3>
                <p className="text-sm font-vintage">Ancient Secrets Meet Modern Exploration</p>
              </div>
              <div className="flex justify-center mb-3">
                <Landmark className="h-16 w-16 brass-text" />
              </div>
              <p className="newspaper-paragraph text-sm">
                Researchers continue to study Wyoming's enigmatic pyramid structure and its astronomical significance in
                our digital frontier.
              </p>
              <Link href="/wyoming-pyramid">
                <Button variant="link" className="p-0 text-black font-vintage">
                  Investigate <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <div className="vintage-card p-1">
            <div className="newspaper-article-inner">
              <div className="text-center mb-4">
                <h3 className="newspaper-section-title">EDUCATION FRONTIER</h3>
                <p className="text-sm font-vintage">Learning in the Digital Territory</p>
              </div>
              <div className="space-y-2 text-sm font-vintage">
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
                <Button variant="link" className="mt-3 p-0 text-black font-vintage">
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
          <Link key={index} href={item.href} className="group" onClick={() => handleSectionClick(item.title)}>
            <div className="vintage-card p-3 hover:shadow-lg transition-all duration-300 text-center ink-bleed">
              <item.icon className="h-6 w-6 mx-auto mb-1 brass-text" />
              <h4 className="font-vintage font-bold text-sm">{item.title}</h4>
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
        <p className="font-vintage text-sm">PUBLISHED BY WYOVERSE PIONEER PRESS • TERRITORY OF WYOMING</p>
        <p className="font-vintage text-xs text-gray-600 mt-1">
          "Building the Digital Frontier Since 1868" • All Rights Reserved
        </p>
      </div>
    </div>
  )
}

export default NewspaperFrontPage
