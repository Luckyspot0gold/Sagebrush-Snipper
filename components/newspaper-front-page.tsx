"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RealTimeMarketWidget } from "./real-time-market-widget"
import Image from "next/image"

export function NewspaperFrontPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content - 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            {/* Newspaper Header */}
            <div className="text-center border-b-4 border-amber-800 pb-4">
              <h1 className="text-5xl font-bold text-amber-900 mb-2 font-serif">THE WYOVERSE PIONEER</h1>
              <div className="flex justify-between items-center text-sm text-amber-700">
                <span>VOL. 144, NO. 365</span>
                <span className="font-semibold">DIGITAL FRONTIER EDITION</span>
                <span>{currentDate}</span>
              </div>
            </div>

            {/* Lead Story */}
            <Card className="border-2 border-amber-300">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-amber-900 font-serif">
                  STONE'S MECHANICAL BULL MASTERY SHOCKS CHEYENNE FRONTIER DAYS
                </CardTitle>
                <Badge className="w-fit bg-red-600 text-white">BREAKING NEWS</Badge>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Image
                      src="/images/mechwolfClutch.jpeg"
                      alt="Stone in cyberpunk garage preparing for mechanical bull"
                      width={400}
                      height={300}
                      className="rounded-lg border-2 border-amber-300"
                    />
                  </div>
                  <div className="space-y-3">
                    <p className="text-amber-800 leading-relaxed">
                      Local prospector struck digital gold yesterday when they discovered what experts believe to be a
                      legendary Celtic Wolf Mandala deep in the WyoVerse mines.
                    </p>
                    <p className="text-amber-800 leading-relaxed">
                      The intricate artwork, featuring golden scrollwork and mystical symbols, has been authenticated by
                      Venice AI experts and is expected to fetch over 2.5 AVAX at current market rates.
                    </p>
                    <p className="text-amber-800 leading-relaxed">
                      "Never seen anything like it," said Marshal Bill, local barkeep and crypto analyst. "That
                      mandala's got more detail than a Swiss pocket watch."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Secondary Stories */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Bear Boxing Story */}
              <Card className="border-2 border-amber-300">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-amber-900 font-serif">
                    EPIC BEAR BOXING MATCH DRAWS RECORD CROWD
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/images/bears-boxing-arena-crowd.jpeg"
                    alt="Two bears boxing in arena with massive crowd"
                    width={300}
                    height={200}
                    className="rounded-lg border border-amber-300 mb-3"
                  />
                  <p className="text-sm text-amber-800 leading-relaxed">
                    The Crypto Clashers Boxing Arena witnessed its largest crowd ever as two heavyweight bears faced off
                    in an epic showdown. The match, sponsored by LuckyspotOgold Games, showcased the future of
                    blockchain-powered entertainment.
                  </p>
                </CardContent>
              </Card>

              {/* Aerial Frontier Days */}
              <Card className="border-2 border-amber-300">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-amber-900 font-serif">
                    AERIAL VIEWS CAPTURE FRONTIER SPIRIT
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/images/arialcheyennerodeo.png"
                    alt="Aerial view of Cheyenne Frontier Days"
                    width={300}
                    height={200}
                    className="rounded-lg border border-amber-300 mb-3"
                  />
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Spectacular aerial photography captured the essence of Cheyenne Frontier Days, showing thousands of
                    digital pioneers gathering to celebrate Wyoming's rich heritage in the metaverse.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Games & Entertainment Section */}
            <Card className="border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-100">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-green-800 font-serif flex items-center gap-2">
                  🎮 GAMES & ENTERTAINMENT
                  <Badge className="bg-green-600 text-white">LuckyspotOgold</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <Image
                      src="/images/crypto-clashers-fighter.png"
                      alt="Crypto Clashers Boxing"
                      width={150}
                      height={150}
                      className="rounded-lg border border-green-300 mb-2 mx-auto"
                    />
                    <h4 className="font-semibold text-green-800">CRYPTO CLASHERS BOXING</h4>
                    <p className="text-xs text-green-700">Epic bull vs bear combat!</p>
                  </div>
                  <div className="text-center">
                    <Image
                      src="/images/pink-race-car.png"
                      alt="Racing Circuit"
                      width={150}
                      height={150}
                      className="rounded-lg border border-green-300 mb-2 mx-auto"
                    />
                    <h4 className="font-semibold text-green-800">RACING CIRCUIT</h4>
                    <p className="text-xs text-green-700">High-speed blockchain racing!</p>
                  </div>
                  <div className="text-center">
                    <Image
                      src="/images/clutch-on-horse.webp"
                      alt="Clutch Chronicles"
                      width={150}
                      height={150}
                      className="rounded-lg border border-green-300 mb-2 mx-auto"
                    />
                    <h4 className="font-semibold text-green-800">CLUTCH CHRONICLES</h4>
                    <p className="text-xs text-green-700">Cyberpunk frontier adventures!</p>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    🎮 Play All Games at LuckyspotOgold@github
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Social Good Network */}
            <Card className="border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-100">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-purple-800 font-serif flex items-center gap-2">
                  💚 SOCIAL GOOD NETWORK
                  <Badge className="bg-purple-600 text-white">Active</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">SocialGood.inc</h4>
                    <p className="text-xs text-purple-700 mb-2">Shop & donate automatically</p>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                      Join SVJDQ6
                    </Button>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">DeSo Blockchain</h4>
                    <p className="text-xs text-purple-700 mb-2">Decentralized social platform</p>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                      Connect
                    </Button>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">Temu Network</h4>
                    <p className="text-xs text-purple-700 mb-2">Shop with codes: frp288931</p>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                      Shop Now
                    </Button>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">🐦 Save the Birds</h4>
                    <p className="text-xs text-purple-700 mb-2">Help birds through climate change</p>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => window.open("https://act.audubon.org/a/jun-2025-a", "_blank")}
                    >
                      Stand w/ @audubonsociety
                    </Button>
                  </div>
                </div>
                <div className="text-center mt-4 text-sm text-purple-700">
                  <div className="flex justify-center items-center gap-4">
                    <span>💚 $2,847 donated today</span>
                    <span>🌍 1,234 lives impacted</span>
                    <span>🤝 5% of every click helps</span>
                    <span>🐦 Birds protected today</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - 1 column */}
          <div className="lg:col-span-1 space-y-4">
            <RealTimeMarketWidget />
          </div>
        </div>
      </div>
    </div>
  )
}
