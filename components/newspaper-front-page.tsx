"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Clock, TrendingUp, Users, Star } from "lucide-react"
import Link from "next/link"

export function NewspaperFrontPage() {
  return (
    <div className="min-h-screen bg-amber-50 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center border-b-4 border-amber-800 pb-4 mb-6">
          <h1 className="text-6xl font-bold text-amber-900 mb-2" style={{ fontFamily: "serif" }}>
            WYOVERSE PIONEER
          </h1>
          <div className="flex justify-between items-center text-sm text-amber-700">
            <span>ESTABLISHED 2024</span>
            <span className="text-lg font-semibold">DIGITAL FRONTIER EDITION</span>
            <span>VOL. 1, NO. 1</span>
          </div>
          <div className="text-xs text-amber-600 mt-1">
            "Where Digital Meets the Wild West" • Wyoming Territory • {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Stories */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lead Story */}
            <Card className="border-2 border-amber-800">
              <CardHeader className="bg-amber-100">
                <CardTitle className="text-2xl font-bold text-amber-900">
                  🏔️ DIGITAL GOLD RUSH HITS WYOMING TERRITORY
                </CardTitle>
                <Badge variant="secondary" className="w-fit">
                  BREAKING NEWS
                </Badge>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed text-amber-800 mb-4">
                  Pioneers from across the digital frontier are staking claims in the WyoVerse, where cryptocurrency
                  meets the untamed wilderness. Land deeds are being traded faster than a gunslinger's draw, and the
                  saloons are buzzing with talk of blockchain fortunes.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Link href="/land-deeds">
                    <Button variant="outline" size="sm">
                      Stake Your Claim
                    </Button>
                  </Link>
                  <Link href="/saloon">
                    <Button variant="outline" size="sm">
                      Visit the Saloon
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Market Report */}
            <Card className="border-2 border-amber-700">
              <CardHeader className="bg-amber-50">
                <CardTitle className="text-xl font-bold text-amber-900 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  FRONTIER TRADING POST REPORT
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">₿ $67,420</div>
                    <div className="text-sm text-amber-700">Bitcoin Gold</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">Ξ $3,245</div>
                    <div className="text-sm text-amber-700">Ethereum Silver</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">Ð $0.42</div>
                    <div className="text-sm text-amber-700">Dogecoin Copper</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">◎ $245</div>
                    <div className="text-sm text-amber-700">Solana Steel</div>
                  </div>
                </div>
                <Link href="/market">
                  <Button className="w-full mt-4 bg-transparent" variant="outline">
                    View Full Market
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Community News */}
            <Card className="border-2 border-amber-700">
              <CardHeader className="bg-amber-50">
                <CardTitle className="text-xl font-bold text-amber-900 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  COMMUNITY ROUNDUP
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="border-l-4 border-amber-600 pl-4">
                  <h3 className="font-bold text-amber-900">🥊 Crypto Clashers Championship</h3>
                  <p className="text-sm text-amber-700">
                    Bar Keep Bill announces the grand opening of the boxing arena! Watch Bull vs Bear matches while
                    sipping frontier cocktails.
                  </p>
                  <Link href="/boxing-arena">
                    <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                      Enter the Ring
                    </Button>
                  </Link>
                </div>

                <div className="border-l-4 border-green-600 pl-4">
                  <h3 className="font-bold text-amber-900">🏇 Digital Rodeo Circuit</h3>
                  <p className="text-sm text-amber-700">
                    Saddle up for the wildest ride in the metaverse! Compete in bull riding, barrel racing, and lasso
                    competitions.
                  </p>
                  <Link href="/digital-rodeo">
                    <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                      Join the Rodeo
                    </Button>
                  </Link>
                </div>

                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-bold text-amber-900">🎨 Art Gallery Opening</h3>
                  <p className="text-sm text-amber-700">
                    Local artists showcase NFT masterpieces inspired by Wyoming's natural beauty and frontier spirit.
                  </p>
                  <Link href="/art">
                    <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                      View Gallery
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Social Good Network */}
            <Card className="border-2 border-green-700">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-xl font-bold text-green-900 flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  SOCIAL GOOD NETWORK
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="border-l-4 border-green-600 pl-4">
                  <h3 className="font-bold text-green-900">🦅 Save Our Feathered Friends</h3>
                  <p className="text-sm text-green-700 mb-2">
                    Help birds through climate change. Stand up for birds with @audubonsociety.
                  </p>
                  <a href="https://act.audubon.org/a/jun-2025-a" target="_blank" rel="noopener noreferrer">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-600 text-green-700 hover:bg-green-50 bg-transparent"
                    >
                      Take Action for Birds
                    </Button>
                  </a>
                </div>

                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-bold text-blue-900">🌱 Environmental Stewardship</h3>
                  <p className="text-sm text-blue-700">
                    Join our community initiatives to protect Wyoming's natural heritage while building the digital
                    frontier.
                  </p>
                </div>

                <div className="border-l-4 border-purple-600 pl-4">
                  <h3 className="font-bold text-purple-900">🤝 Community Support</h3>
                  <p className="text-sm text-purple-700">
                    Supporting local businesses and charities through blockchain technology and community engagement.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Weather & Time */}
            <Card className="border-2 border-amber-600">
              <CardHeader className="bg-amber-100 text-center">
                <CardTitle className="text-lg font-bold text-amber-900 flex items-center justify-center gap-2">
                  <Clock className="h-4 w-4" />
                  FRONTIER CONDITIONS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-amber-900 mb-2">72°F</div>
                <div className="text-sm text-amber-700">Partly Cloudy</div>
                <div className="text-xs text-amber-600 mt-2">
                  Perfect weather for mining crypto and riding the range
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-2 border-amber-600">
              <CardHeader className="bg-amber-100">
                <CardTitle className="text-lg font-bold text-amber-900">FRONTIER SERVICES</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <Link href="/store" className="block">
                  <Button variant="ghost" className="w-full justify-start text-amber-800 hover:bg-amber-100">
                    🏪 General Store
                  </Button>
                </Link>
                <Link href="/classifieds" className="block">
                  <Button variant="ghost" className="w-full justify-start text-amber-800 hover:bg-amber-100">
                    📰 Classifieds
                  </Button>
                </Link>
                <Link href="/calendar" className="block">
                  <Button variant="ghost" className="w-full justify-start text-amber-800 hover:bg-amber-100">
                    📅 Events Calendar
                  </Button>
                </Link>
                <Link href="/education" className="block">
                  <Button variant="ghost" className="w-full justify-start text-amber-800 hover:bg-amber-100">
                    🎓 Frontier Academy
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Wanted Poster */}
            <Card className="border-2 border-red-600 bg-red-50">
              <CardHeader className="bg-red-100 text-center">
                <CardTitle className="text-lg font-bold text-red-900">⚠️ WANTED ⚠️</CardTitle>
              </CardHeader>
              <CardContent className="p-4 text-center">
                <div className="text-sm text-red-800 mb-2">
                  <strong>REWARD: 1000 GOLD COINS</strong>
                </div>
                <div className="text-xs text-red-700">
                  Information leading to the capture of the notorious "Rug Pull Bandit" who's been scamming honest
                  miners.
                </div>
                <Button size="sm" variant="outline" className="mt-3 border-red-600 text-red-700 bg-transparent">
                  Report Sighting
                </Button>
              </CardContent>
            </Card>

            {/* Games Advertisement */}
            <Card className="border-2 border-purple-600">
              <CardHeader className="bg-purple-100">
                <CardTitle className="text-lg font-bold text-purple-900">🎮 OTHER FRONTIER GAMES</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="text-center">
                  <h3 className="font-bold text-purple-800">Crypto Clashers</h3>
                  <p className="text-xs text-purple-700 mb-2">Epic boxing matches between crypto titans!</p>
                  <a href="https://github.com/LuckyspotOgold" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="border-purple-600 text-purple-700 bg-transparent">
                      Play Now
                    </Button>
                  </a>
                </div>

                <Separator />

                <div className="text-center">
                  <h3 className="font-bold text-purple-800">More Adventures</h3>
                  <p className="text-xs text-purple-700 mb-2">Discover more games at LuckyspotOgold</p>
                  <a href="https://github.com/LuckyspotOgold" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="border-purple-600 text-purple-700 bg-transparent">
                      Explore Games
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t-2 border-amber-800 text-center text-xs text-amber-600">
          <p>Published by the WyoVerse Pioneer Press • Printed on the finest digital parchment</p>
          <p className="mt-1">"All the News That's Fit to Mine" • Est. 2024</p>
        </div>
      </div>
    </div>
  )
}

export default NewspaperFrontPage
