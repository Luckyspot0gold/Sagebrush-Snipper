"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, TrendingUp, TrendingDown } from "lucide-react"

export function NewspaperFrontPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-amber-50 p-4" style={{ fontFamily: "serif" }}>
      <div className="max-w-6xl mx-auto bg-white shadow-2xl">
        {/* Newspaper Header */}
        <div className="border-b-4 border-black p-6 bg-gradient-to-r from-amber-100 to-yellow-100">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-black mb-2" style={{ fontFamily: "Old English Text MT, serif" }}>
              The WyoVerse Pioneer
            </h1>
            <div className="flex justify-between items-center text-sm">
              <span>EST. 1852 • VOLUME CLXXII</span>
              <span className="font-bold">{currentDate}</span>
              <span>PRICE: 2 STONES</span>
            </div>
            <div className="border-t border-b border-black py-1 mt-2">
              <p className="text-lg font-bold">AUTHENTIC FRONTIER NEWS • DIGITAL TERRITORY COVERAGE</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 p-6">
          {/* Main Story */}
          <div className="col-span-8">
            <div className="border-b-2 border-black pb-4 mb-4">
              <h2 className="text-4xl font-bold mb-2">LEGENDARY CELTIC WOLF MANDALA DISCOVERED</h2>
              <p className="text-lg italic mb-3">
                Mystical artifact found in digital frontier archives sparks collector frenzy
              </p>

              <div className="float-left mr-4 mb-2">
                <img
                  src="/images/wolfirishscotishposter.png"
                  alt="Celtic Wolf Mandala"
                  className="w-64 h-64 object-cover border-2 border-black"
                />
                <p className="text-xs text-center mt-1 italic">The legendary Celtic Wolf Mandala NFT</p>
              </div>

              <p className="text-justify mb-3">
                <span className="text-6xl float-left mr-2 leading-none font-bold">A</span>
                remarkable discovery has sent shockwaves through the digital frontier community this week. The legendary
                Celtic Wolf Mandala, an intricate piece of digital artwork featuring ornate purple and gold scrollwork
                surrounding a majestic golden wolf, has been authenticated by the Venice AI Studio archives.
              </p>

              <p className="text-justify mb-3">
                Local prospector and art collector Jeremiah "Gold Rush" McGillicuddy was the first to spot the artifact
                during a routine exploration of the digital territories. "I've been mining these digital claims for nigh
                on twenty years," McGillicuddy told our reporter, "but I ain't never seen nothing like this here
                mandala. The craftsmanship is finer than anything from the old country."
              </p>

              <p className="text-justify">
                The piece, now valued at 2.5 AVAX, represents the spiritual connection between ancient Celtic traditions
                and the modern digital frontier. Art experts believe it may be part of a larger collection hidden
                throughout the WyoVerse territories.
              </p>
            </div>

            {/* Secondary Story */}
            <div className="border-b border-black pb-4 mb-4">
              <h3 className="text-2xl font-bold mb-2">CRYPTO CLASHERS TOURNAMENT DRAWS RECORD CROWDS</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <img
                    src="/images/cryptoclasherboxingposter.jpg"
                    alt="Boxing Tournament"
                    className="w-full h-32 object-cover border border-black mb-2"
                  />
                  <p className="text-sm">
                    The annual Crypto Clashers Boxing Championship saw unprecedented attendance as Bull and Bear
                    fighters battled for supremacy in the mountain arena. Developed by the renowned Stoneyard Gaming
                    studio, the tournament featured cutting-edge blockchain technology and real cryptocurrency prizes.
                  </p>
                </div>
                <div>
                  <img
                    src="/images/cryptoclasherwcarsposter.jpg"
                    alt="Racing Circuit"
                    className="w-full h-32 object-cover border border-black mb-2"
                  />
                  <p className="text-sm">
                    The racing circuit component drew speed enthusiasts from across the frontier, featuring both classic
                    frontier vehicles and modern racing machines. LuckyspotOgold@github's innovative game design has
                    revolutionized competitive gaming in the digital territories.
                  </p>
                </div>
              </div>
            </div>

            {/* Historical Feature */}
            <div>
              <h3 className="text-2xl font-bold mb-2">RARE FRONTIER ENCAMPMENT PHOTOGRAPHS SURFACE</h3>
              <div className="flex gap-4">
                <img
                  src="/images/weirdC.H.F.D.img.png"
                  alt="Historical Encampment"
                  className="w-48 h-32 object-cover border border-black"
                />
                <div>
                  <p className="text-sm text-justify">
                    A collection of rare historical photographs documenting Native American encampments has been
                    discovered in the frontier archives. These sepia-toned images provide invaluable insight into the
                    authentic frontier experience, showing teepees, horseback riders, and daily life in the territorial
                    period.
                  </p>
                  <p className="text-sm text-justify mt-2">
                    The photographs will be displayed in the WyoVerse Historical Society museum and are available as
                    limited edition NFTs for collectors interested in preserving frontier heritage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-4">
            {/* Weather */}
            <Card className="border-2 border-black">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">FRONTIER WEATHER</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl mb-2">☀️</div>
                  <p className="font-bold">72°F</p>
                  <p className="text-sm">Perfect for digital prospecting</p>
                  <p className="text-xs mt-2 italic">Recommended: Try the boxing arena today!</p>
                </div>
              </CardContent>
            </Card>

            {/* Market Report */}
            <Card className="border-2 border-black">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">MARKET TELEGRAPH</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Bitcoin (BTC)</span>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      <span>$43,250</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Avalanche (AVAX)</span>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      <span>$42.15</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Solana (SOL)</span>
                    <div className="flex items-center gap-1 text-red-600">
                      <TrendingDown className="w-3 h-3" />
                      <span>$98.50</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>STONES</span>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      <span>$0.45</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* LuckyspotOgold Games Advertisement */}
            <Card className="border-4 border-purple-600 bg-gradient-to-b from-purple-100 to-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-purple-800">🎮 FEATURED GAMES</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <h4 className="font-bold text-purple-900">LuckyspotOgold@github</h4>
                    <p className="text-sm text-purple-700">Revolutionary GameFi Experiences</p>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border">
                      <p className="font-bold text-sm">🥊 Crypto Clashers Boxing</p>
                      <p className="text-xs">Epic bull vs bear combat</p>
                    </div>
                    <div className="p-2 bg-white rounded border">
                      <p className="font-bold text-sm">🏁 Crypto Clashers Racing</p>
                      <p className="text-xs">High-speed blockchain racing</p>
                    </div>
                    <div className="p-2 bg-white rounded border">
                      <p className="font-bold text-sm">⚔️ Clutch Chronicles</p>
                      <p className="text-xs">Steampunk RPG adventures</p>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => window.open("https://github.com/LuckyspotOgold", "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Play Now!
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Wanted Poster */}
            <Card className="border-2 border-red-600 bg-yellow-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-red-800">⚠️ WANTED ⚠️</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <img
                    src="/images/wyoversestonewanted.png"
                    alt="Wanted Poster"
                    className="w-full h-32 object-cover border border-black mb-2"
                  />
                  <p className="text-sm font-bold">DIGITAL OUTLAW</p>
                  <p className="text-xs">Last seen in the crypto territories</p>
                  <p className="text-xs font-bold text-red-600">REWARD: 100 STONES</p>
                </div>
              </CardContent>
            </Card>

            {/* Classifieds */}
            <Card className="border-2 border-black">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">CLASSIFIEDS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs">
                  <div className="border-b pb-1">
                    <p className="font-bold">LAND FOR SALE</p>
                    <p>Prime digital real estate in Crypto Canyon. 2.5 AVAX. Contact McGillicuddy.</p>
                  </div>
                  <div className="border-b pb-1">
                    <p className="font-bold">BOXING LESSONS</p>
                    <p>Learn from Crypto Clashers champions. All skill levels welcome.</p>
                  </div>
                  <div className="border-b pb-1">
                    <p className="font-bold">LOST: ARMORED HORSE</p>
                    <p>Belongs to knight named Clutch. Last seen near city limits.</p>
                  </div>
                  <div>
                    <p className="font-bold">FRONTIER PHOTOGRAPHY</p>
                    <p>Aerial shots available. Cheyenne Frontier Days specialist.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Event Coverage */}
            <Card className="border-2 border-black">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">EVENT COVERAGE</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src="/images/arialcheyennerodeo.png"
                  alt="Cheyenne Frontier Days"
                  className="w-full h-24 object-cover border border-black mb-2"
                />
                <p className="text-xs">
                  <strong>CHEYENNE FRONTIER DAYS:</strong> Spectacular aerial photography captures the grandeur of the
                  world's largest outdoor rodeo. Thousands gathered to celebrate authentic frontier traditions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-black p-4 bg-amber-100 text-center">
          <p className="text-sm">
            <strong>The WyoVerse Pioneer</strong> • Published daily in the Digital Frontier • Subscriptions: 5
            STONES/month • Advertising inquiries welcome
          </p>
          <p className="text-xs mt-1">
            "All the news that's fit to mine" • Est. 1852 • Serving the frontier community with pride
          </p>
        </div>
      </div>
    </div>
  )
}
