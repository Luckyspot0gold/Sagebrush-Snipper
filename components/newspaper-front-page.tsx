"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, MapPin } from "lucide-react"
import Image from "next/image"

export function NewspaperFrontPage() {
  return (
    <div className="min-h-screen bg-amber-50 p-4">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl">
        {/* Newspaper Header */}
        <div className="border-b-4 border-amber-900 p-6 bg-gradient-to-r from-amber-100 to-orange-100">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-amber-900 mb-2" style={{ fontFamily: "serif" }}>
              The WyoVerse Pioneer
            </h1>
            <div className="flex justify-between items-center text-sm text-amber-700">
              <span>ESTABLISHED 1880 • DIGITAL FRONTIER EDITION</span>
              <span>DECEMBER 26, 2024 • PRICE: 2 BITS</span>
              <span>VOLUME CXLIV • NO. 360</span>
            </div>
            <div className="border-t border-amber-600 mt-2 pt-2">
              <p className="text-amber-800 font-semibold">"WHERE THE DIGITAL FRONTIER MEETS PIONEER SPIRIT"</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 p-6">
          {/* Main Story Column */}
          <div className="lg:col-span-3 space-y-6">
            {/* Lead Story */}
            <Card className="border-2 border-amber-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-amber-900 mb-3" style={{ fontFamily: "serif" }}>
                      LEGENDARY CELTIC WOLF MANDALA DISCOVERED IN DIGITAL MINES
                    </h2>
                    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                      Local prospectors working the digital frontier have uncovered what experts are calling the most
                      significant artistic find since the Great NFT Rush of '21. The intricate Celtic Wolf Mandala,
                      featuring ornate purple and gold scrollwork, was found embedded in the blockchain ledger by miners
                      from the LuckyspotOgold collective.
                    </p>
                    <p className="text-gray-600 mb-4">
                      "I ain't never seen nothin' like it," said Prospector Bill, local saloon keeper and part-time
                      digital archaeologist. "That there wolf's got more detail than a Swiss pocket watch, and the
                      colors shine brighter than fool's gold."
                    </p>
                  </div>
                  <div className="w-64">
                    <Image
                      src="/images/wolfirishscotishposter.png"
                      alt="Celtic Wolf Mandala"
                      width={256}
                      height={256}
                      className="rounded-lg border-2 border-amber-300"
                    />
                    <p className="text-xs text-center mt-2 text-gray-500">The legendary Celtic Wolf Mandala</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Crypto Clashers Tournament Coverage */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-2 border-purple-200">
                <CardContent className="p-4">
                  <Image
                    src="/images/cryptoclasherboxingposter.jpg"
                    alt="Crypto Clashers Boxing"
                    width={300}
                    height={200}
                    className="w-full rounded-lg mb-3"
                  />
                  <h3 className="text-xl font-bold text-purple-900 mb-2">
                    BULL VS BEAR: CHAMPIONSHIP BOUT DRAWS RECORD CROWD
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    The Stoneyard Gaming arena was packed to capacity as the legendary Bull and Bear faced off in what
                    many are calling the fight of the century. Market volatility reached new heights as spectators
                    placed their bets.
                  </p>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Watch Highlights
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200">
                <CardContent className="p-4">
                  <Image
                    src="/images/cryptoclasherwcarsposter.jpg"
                    alt="Racing Championship"
                    width={300}
                    height={200}
                    className="w-full rounded-lg mb-3"
                  />
                  <h3 className="text-xl font-bold text-blue-900 mb-2">
                    RACING CIRCUIT EXPANDS: NEW MOUNTAIN TRACK OPENS
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    The Crypto Clashers Racing Circuit announced the opening of their spectacular mountain sunset track,
                    featuring both classic muscle cars and modern supercars in high-stakes blockchain racing.
                  </p>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Join Race
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Historical Discovery */}
            <Card className="border-2 border-amber-200">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Image
                    src="/images/weirdC.H.F.D.img.png"
                    alt="Historical Encampment"
                    width={200}
                    height={150}
                    className="rounded-lg border border-amber-300"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-amber-900 mb-2">RARE FRONTIER PHOTOGRAPH SURFACES</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      A remarkable sepia-toned photograph showing a Native American encampment has been discovered in
                      the WyoVerse historical archives. The image provides unprecedented insight into frontier life and
                      will be featured in the upcoming museum exhibition.
                    </p>
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      Historical Archives
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cheyenne Frontier Days Coverage */}
            <Card className="border-2 border-green-200">
              <CardContent className="p-4">
                <h3 className="text-2xl font-bold text-green-900 mb-3">CHEYENNE FRONTIER DAYS: AERIAL SPECTACULAR</h3>
                <Image
                  src="/images/arialcheyennerodeo.png"
                  alt="Cheyenne Frontier Days Aerial"
                  width={600}
                  height={300}
                  className="w-full rounded-lg mb-3"
                />
                <p className="text-gray-600 mb-3">
                  Our photographer captured this breathtaking aerial view of the famous Cheyenne Frontier Days rodeo,
                  showing thousands of spectators gathered to witness the greatest show in the West. The event continues
                  to draw visitors from across the digital frontier.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline">
                    <MapPin className="w-3 h-3 mr-1" />
                    Cheyenne, Wyoming
                  </Badge>
                  <Badge variant="outline">Frontier Days 2024</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Weather */}
            <Card className="border-2 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-bold text-blue-900 mb-2">FRONTIER WEATHER</h4>
                <div className="text-sm text-gray-600">
                  <p>Today: Partly cloudy, 45°F</p>
                  <p>Tomorrow: Snow likely, 32°F</p>
                  <p className="mt-2 text-xs">"Perfect weather for indoor gaming!" - Local Meteorologist</p>
                </div>
              </CardContent>
            </Card>

            {/* Market Report */}
            <Card className="border-2 border-yellow-200">
              <CardContent className="p-4">
                <h4 className="font-bold text-yellow-900 mb-2">CRYPTO MARKET REPORT</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Bitcoin</span>
                    <span className="text-green-600">↑ $98,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AVAX</span>
                    <span className="text-green-600">↑ $42.18</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SOL</span>
                    <span className="text-red-600">↓ $198.45</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Featured Games Advertisement */}
            <Card className="border-2 border-purple-200 bg-purple-50">
              <CardContent className="p-4">
                <h4 className="font-bold text-purple-900 mb-2 text-center">🎮 LUCKYSPOTOGOLD GAMES</h4>
                <div className="space-y-3">
                  <div className="text-center">
                    <Image
                      src="/images/wyoversestonewanted.png"
                      alt="WyoVerse Wanted"
                      width={150}
                      height={100}
                      className="w-full rounded mb-2"
                    />
                    <p className="text-xs font-semibold">NEW ERA IN GAMEFI!</p>
                  </div>

                  <div className="text-xs space-y-2">
                    <div className="bg-white p-2 rounded">
                      <strong>🥊 Crypto Clashers Boxing</strong>
                      <p>Epic bull vs bear combat!</p>
                    </div>
                    <div className="bg-white p-2 rounded">
                      <strong>🏁 Racing Circuit</strong>
                      <p>High-speed blockchain racing!</p>
                    </div>
                    <div className="bg-white p-2 rounded">
                      <strong>⚔️ Clutch Chronicles</strong>
                      <p>Steampunk RPG adventures!</p>
                    </div>
                  </div>

                  <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700" asChild>
                    <a href="https://github.com/LuckyspotOgold" target="_blank" rel="noreferrer">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Play All Games
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Clutch Chronicles Feature */}
            <Card className="border-2 border-gray-200">
              <CardContent className="p-4">
                <h4 className="font-bold text-gray-900 mb-2">CLUTCH CHRONICLES</h4>
                <Image
                  src="/images/clutchonhorse.webp"
                  alt="Clutch on Horse"
                  width={150}
                  height={100}
                  className="w-full rounded mb-2"
                />
                <p className="text-xs text-gray-600 mb-2">
                  The armored knight Clutch continues his epic journey through the steampunk frontier, bringing justice
                  to the digital realm.
                </p>
                <Badge variant="outline" className="text-xs">
                  New Chapter Available
                </Badge>
              </CardContent>
            </Card>

            {/* Wanted Poster */}
            <Card className="border-2 border-red-200 bg-red-50">
              <CardContent className="p-4">
                <h4 className="font-bold text-red-900 mb-2 text-center">WANTED</h4>
                <div className="text-center text-xs">
                  <p className="font-semibold">DIGITAL OUTLAWS</p>
                  <p>Last seen near the blockchain mines</p>
                  <p className="mt-2">REWARD: 100 AVAX</p>
                  <p className="text-red-600 font-bold">APPROACH WITH CAUTION</p>
                </div>
              </CardContent>
            </Card>

            {/* Classifieds */}
            <Card className="border-2 border-amber-200">
              <CardContent className="p-4">
                <h4 className="font-bold text-amber-900 mb-2">CLASSIFIEDS</h4>
                <div className="text-xs space-y-2">
                  <div className="border-b pb-1">
                    <strong>FOR SALE:</strong> Digital horse, well-trained, 50 AVAX
                  </div>
                  <div className="border-b pb-1">
                    <strong>WANTED:</strong> Experienced miners for new dig site
                  </div>
                  <div className="border-b pb-1">
                    <strong>LOST:</strong> Golden spurs, reward offered
                  </div>
                  <div>
                    <strong>SERVICES:</strong> NFT appraisals by certified expert
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-amber-900 p-4 bg-amber-100 text-center">
          <p className="text-sm text-amber-800">
            The WyoVerse Pioneer • Published daily in the Digital Frontier • Subscriptions available for 10 AVAX
            annually •<strong>Visit LuckyspotOgold@github for the latest games!</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
