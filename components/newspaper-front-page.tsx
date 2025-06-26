"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, MapPin, Coins, Trophy, Gamepad2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function NewspaperFrontPage() {
  return (
    <div className="newspaper-bg min-h-screen">
      {/* Newspaper Header */}
      <div className="border-b-4 border-black bg-white p-6">
        <div className="text-center">
          <h1 className="text-6xl font-serif font-bold mb-2 headline-primary">THE WYOVERSE PIONEER</h1>
          <div className="flex justify-between items-center text-sm font-serif">
            <span>ESTABLISHED 1869</span>
            <span>CHEYENNE, WYOMING TERRITORY</span>
            <span>PRICE: 5 CENTS</span>
          </div>
          <div className="text-lg font-serif mt-2">"BRINGING CIVILIZATION TO THE DIGITAL FRONTIER"</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Lead Story - Frontier Trader */}
        <div className="lg:col-span-2">
          <Card className="border-4 border-black newspaper-article">
            <CardHeader className="border-b-2 border-black">
              <CardTitle className="text-3xl font-serif headline-primary">
                🌟 STONEYARD GAMING ANNOUNCES FRONTIER TRADER
              </CardTitle>
              <CardDescription className="text-lg font-serif">
                Revolutionary GameFi Platform Bridges Old West Trading with Modern Blockchain
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative mb-4">
                <Image
                  src="/images/wyoversestonewanted.png"
                  alt="WyoVerse - New Era in GameFi"
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover border-2 border-black rounded"
                />
                <Badge className="absolute top-2 right-2 bg-purple-600 text-white">NEW ERA</Badge>
              </div>
              <div className="space-y-4 font-serif body-text">
                <p className="text-lg leading-relaxed">
                  In a groundbreaking announcement that has sent shockwaves through both the frontier trading community
                  and the emerging GameFi sector, Stoneyard Gaming has unveiled their revolutionary new platform:{" "}
                  <strong>Frontier Trader</strong>.
                </p>
                <p>
                  This innovative system combines the time-honored traditions of frontier commerce with cutting-edge
                  blockchain technology, allowing pioneers to trade everything from cattle and mining claims to digital
                  assets and NFT collectibles.
                </p>
                <p>
                  "We're not just building a trading platform," said the company's lead developer, speaking from their
                  headquarters overlooking the Grand Tetons. "We're creating a bridge between the entrepreneurial spirit
                  of the Old West and the limitless possibilities of the digital frontier."
                </p>
                <div className="flex gap-4 mt-6">
                  <Link href="/frontier-trader">
                    <Button className="frontier-button">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Trading Post
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-black">
                    Read Full Story
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Stories */}
        <div className="space-y-6">
          {/* LuckyspotOgold Games Feature */}
          <Card className="border-4 border-purple-600 newspaper-article">
            <CardHeader className="border-b-2 border-purple-600 bg-purple-50">
              <CardTitle className="text-xl font-serif headline-secondary flex items-center gap-2">
                <Gamepad2 className="h-5 w-5" />
                LUCKYSPOTOGOLD GAMES
              </CardTitle>
              <CardDescription className="font-serif">Featured Developer on GitHub</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="text-center">
                  <Image
                    src="/images/cryptoclasherboxingposter.jpg"
                    alt="Crypto Clashers Boxing"
                    width={200}
                    height={120}
                    className="w-full h-24 object-cover border border-black rounded mb-2"
                  />
                  <p className="font-serif text-xs font-bold">🥊 CRYPTO CLASHERS BOXING</p>
                </div>
                <div className="text-center">
                  <Image
                    src="/images/cryptoclasherwcarsposter.jpg"
                    alt="Crypto Clashers Racing"
                    width={200}
                    height={120}
                    className="w-full h-24 object-cover border border-black rounded mb-2"
                  />
                  <p className="font-serif text-xs font-bold">🏁 CRYPTO CLASHERS RACING</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Link href="/boxing-arena">
                  <Button size="sm" className="w-full frontier-button text-xs">
                    Play Boxing
                  </Button>
                </Link>
                <Link href="/racing-circuit">
                  <Button size="sm" className="w-full frontier-button text-xs">
                    Join Race
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Celtic Wolf Art Feature */}
          <Card className="border-4 border-black newspaper-article">
            <CardHeader className="border-b-2 border-black">
              <CardTitle className="text-xl font-serif headline-secondary">🎨 ART EXHIBITION</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Image
                src="/images/wolfirishscotishposter.png"
                alt="Celtic Wolf Mandala"
                width={200}
                height={150}
                className="w-full h-32 object-cover border border-black rounded mb-3"
              />
              <p className="font-serif text-sm body-text">
                New Celtic Wolf Mandala artwork unveiled at the WyoVerse Art Gallery. This legendary NFT piece combines
                ancient Celtic artistry with frontier spirit.
              </p>
              <Link href="/art">
                <Button size="sm" className="mt-2 frontier-button">
                  Visit Gallery
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Clutch Knight Feature */}
          <Card className="border-4 border-black newspaper-article">
            <CardHeader className="border-b-2 border-black">
              <CardTitle className="text-xl font-serif headline-secondary">⚔️ CLUTCH CHRONICLES</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Image
                src="/images/clutchonhorse.webp"
                alt="Clutch the Armored Knight"
                width={200}
                height={150}
                className="w-full h-32 object-cover border border-black rounded mb-3"
              />
              <p className="font-serif text-sm body-text">
                Our beloved wolf mascot Clutch has been spotted in full armor, riding through the territories as a noble
                knight protecting frontier settlements.
              </p>
              <Button size="sm" className="mt-2 frontier-button">
                Read Chronicles
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Middle Section - Historical & Events */}
      <div className="border-t-4 border-black bg-amber-50 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Historical Scene */}
          <Card className="border-4 border-black">
            <CardHeader className="border-b-2 border-black">
              <CardTitle className="text-2xl font-serif headline-primary">
                🏕️ HISTORICAL FRONTIER ENCAMPMENT DISCOVERED
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Image
                src="/images/weirdC.H.F.D.img.png"
                alt="Historical Frontier Encampment"
                width={400}
                height={250}
                className="w-full h-48 object-cover border-2 border-black rounded mb-4"
              />
              <p className="font-serif body-text">
                Archaeological expedition uncovers well-preserved Native American encampment site near the Grand Tetons.
                The discovery includes traditional teepees, artifacts, and evidence of extensive horseback culture that
                shaped the early Wyoming territory.
              </p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" className="frontier-button">
                  Book Expedition
                </Button>
                <Button size="sm" variant="outline" className="border-black">
                  Learn History
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Cheyenne Frontier Days */}
          <Card className="border-4 border-black">
            <CardHeader className="border-b-2 border-black">
              <CardTitle className="text-2xl font-serif headline-primary">
                🤠 CHEYENNE FRONTIER DAYS SPECTACULAR
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Image
                src="/images/arialcheyennerodeo.png"
                alt="Cheyenne Frontier Days Aerial View"
                width={400}
                height={250}
                className="w-full h-48 object-cover border-2 border-black rounded mb-4"
              />
              <p className="font-serif body-text">
                Aerial view of the world's largest outdoor rodeo and western celebration. Thousands gather annually to
                witness authentic frontier competitions, from bronc riding to cattle roping, keeping the spirit of the
                Old West alive.
              </p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" className="frontier-button">
                  Get Tickets
                </Button>
                <Button size="sm" variant="outline" className="border-black">
                  Event Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section - Community Updates */}
      <div className="border-t-4 border-black bg-gray-50 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle className="text-lg font-serif headline-secondary">🍻 SALOON UPDATES</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-serif text-sm body-text">
                Bar Keep Bill has restocked with Snipers Sarsaparilla, Buffalo Bourbon, and fresh Frontier Milk for the
                young pioneers. His AI brain is now fully operational!
              </p>
              <Link href="/saloon">
                <Button size="sm" className="mt-2 frontier-button">
                  Visit Saloon
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle className="text-lg font-serif headline-secondary">🏛️ GOVERNMENT NOTICES</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-serif text-sm body-text">
                Wyoming Records Office now accepting digital land claims. Parks & Recreation announces new frontier
                activities and mining permits available.
              </p>
              <div className="flex gap-2 mt-2">
                <Link href="/wyoming-records">
                  <Button size="sm" variant="outline" className="border-black text-xs">
                    Records
                  </Button>
                </Link>
                <Link href="/parks">
                  <Button size="sm" variant="outline" className="border-black text-xs">
                    Parks
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle className="text-lg font-serif headline-secondary">📅 UPCOMING EVENTS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm font-serif">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  <span>Frontier Days Festival - Next Week</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  <span>Mining Competition - Devil's Tower</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coins className="h-3 w-3" />
                  <span>Trading Tournament - $1000 Prize</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-3 w-3" />
                  <span>Crypto Clashers Championship</span>
                </div>
              </div>
              <Link href="/calendar">
                <Button size="sm" className="mt-2 frontier-button">
                  View Calendar
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-black bg-black text-white p-4 text-center">
        <p className="font-serif text-sm">
          © 1869 The WyoVerse Pioneer • "Truth, Justice, and the Frontier Way" • Printed on the finest digital parchment
        </p>
        <p className="font-serif text-xs mt-2">
          Featuring games from LuckyspotOgold@github • Visit our Art Gallery for exclusive NFT collections
        </p>
      </div>
    </div>
  )
}

export default NewspaperFrontPage
