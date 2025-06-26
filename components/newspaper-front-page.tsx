"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, MapPin, Coins } from "lucide-react"
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
                  src="/images/frontiertraderposter.jpg"
                  alt="Frontier Trader - New Era in GameFi"
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover border-2 border-black rounded"
                />
                <Badge className="absolute top-2 right-2 bg-purple-600 text-white">NEW RELEASE</Badge>
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
          {/* Crypto Clashers Boxing */}
          <Card className="border-4 border-black newspaper-article">
            <CardHeader className="border-b-2 border-black">
              <CardTitle className="text-xl font-serif headline-secondary">🥊 BOXING ARENA OPENS</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Image
                src="/images/crypto-clashers-fighter.png"
                alt="Crypto Clashers Boxing"
                width={200}
                height={150}
                className="w-full h-32 object-cover border border-black rounded mb-3"
              />
              <p className="font-serif text-sm body-text">
                The new Crypto Clashers Boxing Arena has opened its doors, featuring enhanced combat with real-time
                market data driving fight mechanics.
              </p>
              <Link href="/boxing-arena">
                <Button size="sm" className="mt-2 frontier-button">
                  Enter Arena
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Racing Circuit */}
          <Card className="border-4 border-black newspaper-article">
            <CardHeader className="border-b-2 border-black">
              <CardTitle className="text-xl font-serif headline-secondary">🏁 RACING CIRCUIT ACTIVE</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Image
                src="/images/dogincivicvenicecc.webp"
                alt="Racing Circuit"
                width={200}
                height={150}
                className="w-full h-32 object-cover border border-black rounded mb-3"
              />
              <p className="font-serif text-sm body-text">
                New racing circuit features enhanced vehicles and our beloved racing mascot ready for high-speed
                frontier adventures.
              </p>
              <Link href="/racing-circuit">
                <Button size="sm" className="mt-2 frontier-button">
                  Join Race
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Wyoming Pyramid Discovery */}
          <Card className="border-4 border-black newspaper-article">
            <CardHeader className="border-b-2 border-black">
              <CardTitle className="text-xl font-serif headline-secondary">🏔️ PYRAMID DISCOVERED</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="font-serif text-sm body-text">
                Archaeological expedition uncovers mysterious pyramid structure in the Wyoming wilderness. Ancient
                symbols suggest advanced civilization predating known settlements.
              </p>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-xs">
                  <span>📍 Location: Grand Teton Range</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>🎫 Tours: $50 per person</span>
                </div>
              </div>
              <Link href="/wyoming-pyramid">
                <Button size="sm" className="mt-2 frontier-button">
                  Book Expedition
                </Button>
              </Link>
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
                young pioneers.
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
                activities.
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
      </div>
    </div>
  )
}

export default NewspaperFrontPage
