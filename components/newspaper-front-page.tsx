"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, Gamepad2, TrendingUp, Users, Calendar, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function NewspaperFrontPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-amber-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Newspaper Header */}
        <div className="text-center mb-8 border-b-4 border-amber-800 pb-6">
          <h1 className="text-6xl font-bold text-amber-900 mb-2 font-serif">WyoVerse Pioneer</h1>
          <div className="flex justify-between items-center text-amber-700">
            <div className="text-sm">
              <p>Est. 2024 • Digital Frontier Edition</p>
            </div>
            <div className="text-sm">
              <p>{currentDate}</p>
              <p>Price: Free • Volume 1, Issue 1</p>
            </div>
          </div>
          <Separator className="my-4 bg-amber-800" />
          <p className="text-lg italic text-amber-800">"Pioneering the Digital Frontier of Wyoming"</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Story */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-amber-200 bg-white shadow-lg">
              <CardHeader className="bg-amber-100">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-red-600 text-white">BREAKING</Badge>
                  <span className="text-sm text-amber-700">FRONTIER NEWS</span>
                </div>
                <CardTitle className="text-3xl font-bold text-amber-900 font-serif leading-tight">
                  WyoVerse Digital Frontier Opens to Pioneers
                </CardTitle>
                <p className="text-amber-700 italic">
                  Revolutionary blockchain-powered virtual Wyoming launches with gaming, trading, and community features
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <Image
                    src="/images/wyoverse-digital-mountain.png"
                    alt="WyoVerse Digital Mountain"
                    width={600}
                    height={300}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                    The Digital Grand Tetons in WyoVerse
                  </div>
                </div>

                <div className="prose prose-amber max-w-none">
                  <p className="text-lg leading-relaxed mb-4">
                    <span className="font-bold text-2xl float-left mr-2 leading-none">T</span>
                    he digital frontier has officially opened its gates to pioneers seeking adventure, opportunity, and
                    community in the virtual landscapes of Wyoming. WyoVerse represents a groundbreaking fusion of
                    blockchain technology, gaming, and real-world utility.
                  </p>

                  <p className="mb-4">
                    From the comfort of your homestead, pioneers can now explore vast digital territories, engage in
                    thrilling competitions, and build lasting connections with fellow frontiersmen and women from around
                    the globe.
                  </p>

                  <p className="mb-4">
                    "This isn't just another virtual world," explains Bar Keep Bill, the AI-powered proprietor of the
                    local saloon. "We're building a community where every pioneer has a stake in the frontier's future."
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Secondary Stories */}
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <Card className="border border-amber-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold text-amber-900">Crypto Clashers Arena Opens</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/images/bears-boxing-arena.jpeg"
                    alt="Boxing Arena"
                    width={300}
                    height={150}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <p className="text-sm text-amber-800">
                    The new boxing arena welcomes fighters from across the blockchain. Bulls vs Bears matches draw
                    crowds daily.
                  </p>
                  <Link href="/boxing-arena">
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      Enter Arena
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border border-amber-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold text-amber-900">Digital Rodeo Circuit</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/images/arialcheyennerodeo.png"
                    alt="Digital Rodeo"
                    width={300}
                    height={150}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <p className="text-sm text-amber-800">
                    Racing enthusiasts gather for high-stakes competitions. Prize pools funded by community
                    participation.
                  </p>
                  <Link href="/racing-circuit">
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      Join Race
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weather & Market */}
            <Card className="border border-amber-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-amber-900 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Market Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>AVAX:</span>
                    <span className="text-green-600 font-bold">$42.50 ↗</span>
                  </div>
                  <div className="flex justify-between">
                    <span>BTC:</span>
                    <span className="text-green-600 font-bold">$67,890 ↗</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ETH:</span>
                    <span className="text-red-600 font-bold">$3,245 ↘</span>
                  </div>
                </div>
                <Link href="/market">
                  <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                    View Full Market
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Community Events */}
            <Card className="border border-amber-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-amber-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="border-l-2 border-amber-400 pl-3">
                    <p className="font-semibold">Frontier Days Festival</p>
                    <p className="text-amber-700">Dec 28-30, 2024</p>
                    <p className="text-xs text-amber-600">Grand Tetons Arena</p>
                  </div>
                  <div className="border-l-2 border-amber-400 pl-3">
                    <p className="font-semibold">Mining Competition</p>
                    <p className="text-amber-700">Jan 5, 2025</p>
                    <p className="text-xs text-amber-600">Digital Mines</p>
                  </div>
                  <div className="border-l-2 border-amber-400 pl-3">
                    <p className="font-semibold">Land Auction</p>
                    <p className="text-amber-700">Jan 12, 2025</p>
                    <p className="text-xs text-amber-600">Town Hall</p>
                  </div>
                </div>
                <Link href="/calendar">
                  <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                    View Calendar
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Wanted Poster */}
            <Card className="border border-amber-200 bg-amber-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-red-800 text-center">WANTED</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Image
                  src="/images/wyoverse-stone-wanted-poster.png"
                  alt="Wanted Poster"
                  width={200}
                  height={250}
                  className="w-full h-48 object-cover rounded mb-3"
                />
                <p className="text-sm font-bold text-red-800">STONE</p>
                <p className="text-xs text-red-700">For disrupting the peace in Saloon District</p>
                <p className="text-xs text-red-600 mt-2">Reward: 1000 WYO Tokens</p>
              </CardContent>
            </Card>

            {/* Other Games Advertisement */}
            <Card className="border border-amber-200 bg-gradient-to-br from-purple-50 to-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-purple-900 flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5" />
                  More Adventures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-purple-800 mb-2">Explore Our Gaming Universe</p>
                    <div className="space-y-2">
                      <a
                        href="https://github.com/Luckyspotonline"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Crypto Games Collection
                        </Button>
                      </a>
                      <p className="text-xs text-purple-600">
                        Visit Luckyspotonline for more blockchain gaming adventures
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card className="border border-amber-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-amber-900 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Pioneer Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Active Pioneers:</span>
                    <span className="font-bold text-amber-700">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Land Claims:</span>
                    <span className="font-bold text-amber-700">1,203</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trades Today:</span>
                    <span className="font-bold text-amber-700">456</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New Arrivals:</span>
                    <span className="font-bold text-green-600">+89</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t-2 border-amber-800">
          <div className="grid md:grid-cols-3 gap-6 text-sm text-amber-700">
            <div>
              <h4 className="font-bold text-amber-900 mb-2">Quick Links</h4>
              <div className="space-y-1">
                <Link href="/games" className="block hover:text-amber-900">
                  Gaming Portal
                </Link>
                <Link href="/market" className="block hover:text-amber-900">
                  Trading Post
                </Link>
                <Link href="/community" className="block hover:text-amber-900">
                  Community Hub
                </Link>
                <Link href="/land-deeds" className="block hover:text-amber-900">
                  Land Office
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-amber-900 mb-2">Services</h4>
              <div className="space-y-1">
                <Link href="/mining" className="block hover:text-amber-900">
                  Mining Operations
                </Link>
                <Link href="/education" className="block hover:text-amber-900">
                  Pioneer Academy
                </Link>
                <Link href="/osha" className="block hover:text-amber-900">
                  Safety Training
                </Link>
                <Link href="/tourism" className="block hover:text-amber-900">
                  Tourism Board
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-amber-900 mb-2">Contact</h4>
              <div className="space-y-1">
                <p>WyoVerse Pioneer Newspaper</p>
                <p>Digital Frontier, Wyoming</p>
                <p>pioneer@wyoverse.com</p>
                <div className="flex items-center gap-1 mt-2">
                  <MapPin className="h-3 w-3" />
                  <span>Virtual Cheyenne, WY</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-6 pt-4 border-t border-amber-300">
            <p className="text-xs text-amber-600">
              © 2024 WyoVerse Pioneer. All rights reserved. Printed on 100% digital paper. No trees were harmed.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
