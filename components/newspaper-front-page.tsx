"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export function NewspaperFrontPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-amber-50 min-h-screen">
      {/* Newspaper Header */}
      <div className="text-center border-b-4 border-black pb-4 mb-6">
        <h1 className="text-6xl font-bold font-serif tracking-wider">THE WYOVERSE PIONEER</h1>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm">ESTABLISHED 1880 - DIGITAL FRONTIER EDITION</p>
          <p className="text-sm">PRICE: 2 BITS</p>
          <p className="text-sm">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Story */}
        <div className="col-span-8">
          <div className="border-b-2 border-black pb-4 mb-4">
            <h2 className="text-4xl font-bold font-serif mb-2">
              LEGENDARY CELTIC WOLF MANDALA DISCOVERED IN DIGITAL MINES
            </h2>
            <p className="text-lg italic mb-4">Prospectors Strike Gold with Mystical Artwork Worth 2.5 AVAX</p>

            <div className="float-left mr-4 mb-2">
              <img
                src="/images/wolfirishscotishposter.png"
                alt="Celtic Wolf Mandala"
                className="w-64 h-64 object-cover border-2 border-black"
              />
              <p className="text-xs text-center mt-1 italic">
                The legendary Celtic Wolf Mandala, discovered in the digital frontier
              </p>
            </div>

            <p className="text-justify leading-relaxed mb-4">
              In a remarkable turn of events that has sent shockwaves through the digital frontier, prospectors working
              the Venice AI mines have uncovered what experts are calling the most significant artistic discovery since
              the great NFT rush of '21. The Celtic Wolf Mandala, featuring intricate purple and gold scrollwork
              surrounding a majestic golden wolf, has been authenticated by the WyoVerse Art Commission as a genuine
              Legendary-tier artifact.
            </p>

            <p className="text-justify leading-relaxed mb-4">
              "I've been mining these digital claims for nigh on three years now," said prospector Jake "Pickaxe"
              Morrison, adjusting his virtual hat. "Never seen anything quite like this mandala. The way them Celtic
              patterns spiral around that wolf - it's like looking into the very soul of the frontier itself."
            </p>

            <p className="text-justify leading-relaxed">
              The discovery has already attracted significant interest from collectors, with early bidding reaching 2.5
              AVAX. Art historians note the piece's connection to the popular Clutch Chronicles RPG series, suggesting
              it may hold special significance for gaming enthusiasts and collectors alike.
            </p>
          </div>

          {/* Secondary Story */}
          <div className="border-b border-black pb-4 mb-4">
            <h3 className="text-2xl font-bold font-serif mb-2">CRYPTO CLASHERS TOURNAMENT DRAWS RECORD CROWDS</h3>
            <div className="flex gap-4">
              <img
                src="/images/cryptoclasherboxingposter.jpg"
                alt="Boxing Match"
                className="w-32 h-32 object-cover border border-black"
              />
              <div className="flex-1">
                <p className="text-sm leading-relaxed">
                  The annual Crypto Clashers Boxing Championship reached fever pitch yesterday as the legendary Bull vs
                  Bear match drew spectators from across the blockchain. Developed by the renowned LuckyspotOgold gaming
                  collective, the tournament featured both traditional boxing matches and high-speed racing circuits.
                </p>
                <p className="text-xs mt-2 italic">Full coverage on Page 3 - Sports Section</p>
              </div>
            </div>
          </div>

          {/* Historical Feature */}
          <div>
            <h3 className="text-2xl font-bold font-serif mb-2">RARE FRONTIER PHOTOGRAPHS SURFACE</h3>
            <div className="flex gap-4">
              <img
                src="/images/weirdC.H.F.D.img.png"
                alt="Historical Encampment"
                className="w-32 h-32 object-cover border border-black"
              />
              <div className="flex-1">
                <p className="text-sm leading-relaxed">
                  A collection of rare sepia-toned photographs depicting Native American encampments has been digitally
                  preserved for posterity. The images, showing teepees and horseback riders against the Wyoming
                  landscape, provide invaluable insight into frontier life.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-4 space-y-6">
          {/* Weather */}
          <Card className="border-2 border-black">
            <CardContent className="p-4">
              <h4 className="font-bold text-center mb-2">FRONTIER WEATHER</h4>
              <div className="text-center">
                <p className="text-2xl">☀️ 72°F</p>
                <p className="text-sm">Perfect for mining crypto</p>
                <p className="text-xs mt-2">Recommended: Try Crypto Clashers Racing while the weather holds!</p>
              </div>
            </CardContent>
          </Card>

          {/* Market Report */}
          <Card className="border-2 border-black">
            <CardContent className="p-4">
              <h4 className="font-bold text-center mb-2">MARKET REPORT</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Bitcoin (BTC)</span>
                  <span className="text-green-600">$67,234 ↑</span>
                </div>
                <div className="flex justify-between">
                  <span>Avalanche (AVAX)</span>
                  <span className="text-green-600">$32.15 ↑</span>
                </div>
                <div className="flex justify-between">
                  <span>Solana (SOL)</span>
                  <span className="text-red-600">$156.78 ↓</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Games */}
          <Card className="border-2 border-black bg-gradient-to-b from-purple-100 to-blue-100">
            <CardContent className="p-4">
              <h4 className="font-bold text-center mb-2">FEATURED GAMES</h4>
              <div className="space-y-3">
                <div className="text-center">
                  <img
                    src="/images/cryptoclasherwcarsposter.jpg"
                    alt="Racing Circuit"
                    className="w-full h-24 object-cover border border-black mb-2"
                  />
                  <p className="text-sm font-bold">Crypto Clashers Racing</p>
                  <p className="text-xs">High-speed blockchain racing action!</p>
                  <Button size="sm" className="mt-1" asChild>
                    <a href="https://github.com/LuckyspotOgold" target="_blank" rel="noreferrer">
                      <Github className="mr-1 h-3 w-3" />
                      Play Now
                    </a>
                  </Button>
                </div>

                <div className="text-center">
                  <img
                    src="/images/clutchonhorse.webp"
                    alt="Clutch Chronicles"
                    className="w-full h-24 object-cover border border-black mb-2"
                  />
                  <p className="text-sm font-bold">Clutch Chronicles</p>
                  <p className="text-xs">Steampunk RPG adventures await!</p>
                  <Button size="sm" className="mt-1" asChild>
                    <a href="https://github.com/LuckyspotOgold" target="_blank" rel="noreferrer">
                      <Github className="mr-1 h-3 w-3" />
                      Explore
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wanted Poster */}
          <Card className="border-2 border-black bg-amber-100">
            <CardContent className="p-4">
              <h4 className="font-bold text-center mb-2">WANTED</h4>
              <img
                src="/images/wyoversestonewanted.png"
                alt="Wanted Poster"
                className="w-full h-32 object-cover border border-black mb-2"
              />
              <p className="text-xs text-center">Digital Outlaw - Reward: 5 AVAX</p>
            </CardContent>
          </Card>

          {/* Classifieds */}
          <Card className="border-2 border-black">
            <CardContent className="p-4">
              <h4 className="font-bold text-center mb-2">CLASSIFIEDS</h4>
              <div className="space-y-2 text-xs">
                <p>
                  🏠 <strong>Land Deed:</strong> Prime mining claim, 0.5 AVAX
                </p>
                <p>
                  🐎 <strong>Digital Horse:</strong> Fast steed for racing, 1.2 AVAX
                </p>
                <p>
                  ⚔️ <strong>NFT Weapons:</strong> Legendary sword collection
                </p>
                <p>
                  📰 <strong>Newspaper Ad:</strong> Promote your business here!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* LuckyspotOgold Promotion */}
          <Card className="border-2 border-black bg-gradient-to-r from-yellow-200 to-orange-200">
            <CardContent className="p-4 text-center">
              <h4 className="font-bold mb-2">🎮 LUCKYSPOTOGOLD GAMES</h4>
              <p className="text-xs mb-2">The premier gaming collective of the digital frontier!</p>
              <div className="space-y-1 text-xs">
                <p>• Crypto Clashers Boxing</p>
                <p>• Racing Circuit Championship</p>
                <p>• Clutch Chronicles RPG</p>
                <p>• WyoVerse Metaverse</p>
              </div>
              <Button size="sm" className="mt-2" asChild>
                <a href="https://github.com/LuckyspotOgold" target="_blank" rel="noreferrer">
                  <Github className="mr-1 h-3 w-3" />
                  Visit GitHub
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t-2 border-black text-center">
        <p className="text-sm">The WyoVerse Pioneer - Your trusted source for digital frontier news since 1880</p>
        <p className="text-xs mt-1">
          Published by the WyoVerse Press Association • Printed on recycled blockchain paper
        </p>
      </div>
    </div>
  )
}
