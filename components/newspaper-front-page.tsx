"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useMarketStore } from "@/lib/stores/market-store"
import { AssetList } from "@/components/asset-list"
import { MarketMoodIndicator } from "@/components/market-mood-indicator"
import Link from "next/link"
import { ArrowRight, Coins, Landmark, MapPin, Mountain, Newspaper } from "lucide-react"
import Image from "next/image"

export function NewspaperFrontPage() {
  const { initializeMarket, updateMarketConditions, marketMood, assets } = useMarketStore()

  useEffect(() => {
    initializeMarket()

    // Simulate market updates
    const interval = setInterval(() => {
      updateMarketConditions()
    }, 5000)

    return () => clearInterval(interval)
  }, [initializeMarket, updateMarketConditions])

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="max-w-6xl mx-auto bg-[#f8f3e3] text-black">
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

      {/* Main Story */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-8">
          <div className="border-4 border-black p-1">
            <div className="border-2 border-black p-4">
              <div className="text-center mb-4">
                <h2 className="text-4xl font-bold font-serif uppercase mb-1">CHEYENNE FRONTIER DAYS</h2>
                <h3 className="text-xl font-serif italic">COMING TO WYOVERSE</h3>
              </div>
              <div className="flex gap-4 mb-4">
                <div className="w-1/2 relative">
                  <Image
                    src="/images/frontier-days.png"
                    alt="Cheyenne Frontier Days"
                    width={500}
                    height={500}
                    className="border-2 border-black"
                  />
                  <div className="absolute bottom-2 right-2 bg-[#f8f3e3] border border-black px-2 py-1 text-xs font-serif">
                    Frontier Days Celebration, 1887
                  </div>
                </div>
                <div className="w-1/2">
                  <p className="text-lg mb-4 font-serif leading-tight">
                    The "Daddy of 'em All" is preparing to make its digital debut in the WyoVerse with a fully immersive
                    VR experience.
                  </p>
                  <p className="mb-4 font-serif leading-tight">
                    Visitors will soon be able to experience rodeo events, concerts, and western celebrations in a
                    virtual recreation of the world's largest outdoor rodeo and western celebration.
                  </p>
                  <Link href="/tourism">
                    <Button className="mt-2 bg-black text-white hover:bg-gray-800 font-serif">
                      READ MORE
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="border-t-2 border-black pt-2">
                <p className="italic font-serif">
                  Digital pioneers will be able to participate in virtual rodeo events, purchase commemorative NFTs, and
                  earn special rewards during the celebration.
                </p>
              </div>
            </div>
          </div>
        </div>

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
                  <Button variant="link" className="mt-2 p-0 text-black font-serif">
                    View Full Market
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Stories */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-4">
          <div className="border-4 border-black p-1">
            <div className="border-2 border-black p-4">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold font-serif uppercase">FEATURED GAMES</h3>
                <p className="text-sm font-serif">From the creators at LuckyspotOgold</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex justify-center">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cryptoclasherboxingposter.jpg-ohRGClzi9a58dAT0C2eBn8w5aDOR7g.jpeg"
                    alt="Crypto Clashers Boxing"
                    width={150}
                    height={150}
                    className="border border-black"
                  />
                </div>
                <div className="flex justify-center">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cryptoclasherwcarsposter.jpg-0nnGL4RaNIFloUUC1cdsn0GDa31YE2.jpeg"
                    alt="Crypto Classic Racing"
                    width={150}
                    height={150}
                    className="border border-black"
                  />
                </div>
              </div>
              <ul className="space-y-2 font-serif">
                <li className="border-b border-black pb-2">
                  <p className="font-medium">Crypto Clashers "KryptO Boxing"</p>
                  <p className="text-sm">Battle in the digital ring with market-driven fighters</p>
                </li>
                <li className="border-b border-black pb-2">
                  <p className="font-medium">Crypto Classic "8 in the Gate"</p>
                  <p className="text-sm">Horse racing powered by blockchain technology</p>
                </li>
                <li>
                  <p className="font-medium">Frontier Trader</p>
                  <p className="text-sm">Navigate the digital frontier as a crypto trader in the old west</p>
                </li>
              </ul>
              <Link href="/games">
                <Button variant="link" className="mt-4 p-0 text-black font-serif">
                  Explore All Games
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <div className="border-4 border-black p-1">
            <div className="border-2 border-black p-4">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold font-serif uppercase">ENERGY PRODUCTION</h3>
                <p className="text-sm font-serif">Wyoming's digital energy landscape</p>
              </div>
              <div className="space-y-2 font-serif">
                <div className="flex justify-between border-b border-black pb-1">
                  <span>Wind</span>
                  <span className="font-medium">42%</span>
                </div>
                <div className="flex justify-between border-b border-black pb-1">
                  <span>Oil & Gas</span>
                  <span className="font-medium">35%</span>
                </div>
                <div className="flex justify-between border-b border-black pb-1">
                  <span>Coal</span>
                  <span className="font-medium">15%</span>
                </div>
                <div className="flex justify-between border-b border-black pb-1">
                  <span>Hydro</span>
                  <span className="font-medium">8%</span>
                </div>
              </div>
              <div className="flex justify-center my-4">
                <Image
                  src="/images/frontier-event.png"
                  alt="Frontier Event"
                  width={200}
                  height={200}
                  className="border border-black"
                />
              </div>
              <Link href="/energy">
                <Button variant="link" className="mt-4 p-0 text-black font-serif">
                  View Energy Markets
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <div className="border-4 border-black p-1">
            <div className="border-2 border-black p-4">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold font-serif uppercase">EDUCATION SPOTLIGHT</h3>
                <p className="text-sm font-serif">Learning opportunities in the WyoVerse</p>
              </div>
              <div className="flex justify-center mb-4">
                <Image src="/images/this-time.png" alt="Education" width={150} height={150} />
              </div>
              <ul className="space-y-2 font-serif">
                <li className="border-b border-black pb-2">
                  <p className="font-medium">University of Wyoming</p>
                  <p className="text-sm">Digital campus now open for enrollment</p>
                </li>
                <li className="border-b border-black pb-2">
                  <p className="font-medium">OSHA VR Training</p>
                  <p className="text-sm">Safety certification in virtual environments</p>
                </li>
                <li>
                  <p className="font-medium">Blockchain Academy</p>
                  <p className="text-sm">Learn crypto fundamentals and advanced trading</p>
                </li>
              </ul>
              <Link href="/education">
                <Button variant="link" className="mt-4 p-0 text-black font-serif">
                  Browse Courses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Attractions */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-6">
          <div className="border-4 border-black p-1 h-full">
            <div className="border-2 border-black p-4 h-full">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold font-serif uppercase">THE MYSTERIOUS WYOMING PYRAMID</h3>
              </div>
              <div className="flex gap-4 mb-4">
                <div className="w-1/3 flex items-center justify-center">
                  <Landmark className="h-16 w-16 text-black" />
                </div>
                <div className="w-2/3 font-serif">
                  <p className="text-sm mb-3">
                    Ancient mystery meets modern exploration in Wyoming's enigmatic pyramid structure, perfectly aligned
                    with celestial events.
                  </p>
                  <p className="text-sm mb-3">
                    Researchers continue to study this remarkable monument and its astronomical significance.
                  </p>
                  <Link href="/wyoming-pyramid">
                    <Button variant="link" className="p-0 text-black font-serif">
                      Read the Full Story
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-6">
          <div className="border-4 border-black p-1 h-full">
            <div className="border-2 border-black p-4 h-full">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold font-serif uppercase">DIGITAL RODEO: CRYPTO BULLS BUCKING</h3>
              </div>
              <div className="flex gap-4 mb-4">
                <div className="w-1/3 flex items-center justify-center">
                  <Coins className="h-16 w-16 text-black" />
                </div>
                <div className="w-2/3 font-serif">
                  <p className="text-sm mb-3">
                    Experience the thrill of riding the market volatility with our new Digital Rodeo featuring Bitcoin
                    Bull and Solana Stampede.
                  </p>
                  <p className="text-sm mb-3">
                    Patent-driven metrics influence bull behavior in this unique crypto-themed rodeo experience.
                  </p>
                  <Link href="/digital-rodeo">
                    <Button variant="link" className="p-0 text-black font-serif">
                      Try the Digital Rodeo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <Link href="/tourism" className="col-span-1">
          <div className="border-4 border-black p-1 hover:bg-[#e8e3d3] transition-colors">
            <div className="border-2 border-black p-4 flex items-center gap-3">
              <MapPin className="h-6 w-6" />
              <div className="font-serif">
                <h3 className="font-medium">Tourism</h3>
                <p className="text-sm">Explore Wyoming's digital wonders</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/parks" className="col-span-1">
          <div className="border-4 border-black p-1 hover:bg-[#e8e3d3] transition-colors">
            <div className="border-2 border-black p-4 flex items-center gap-3">
              <Mountain className="h-6 w-6" />
              <div className="font-serif">
                <h3 className="font-medium">Parks & Recreation</h3>
                <p className="text-sm">Virtual hunting, fishing, and exploration</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/classifieds" className="col-span-1">
          <div className="border-4 border-black p-1 hover:bg-[#e8e3d3] transition-colors">
            <div className="border-2 border-black p-4 flex items-center gap-3">
              <Newspaper className="h-6 w-6" />
              <div className="font-serif">
                <h3 className="font-medium">Classifieds</h3>
                <p className="text-sm">Buy, sell, and trade in the WyoVerse</p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Footer */}
      <div className="border-t-4 border-black pt-4 text-center">
        <div className="flex justify-center mb-2">
          <Image src="/images/stoneyard-games.jpeg" alt="Stoneyard Games" width={100} height={100} />
        </div>
        <p className="font-serif text-sm">PUBLISHED BY WYOVERSE PIONEER PRESS • TERRITORY OF WYOMING</p>
      </div>
    </div>
  )
}
