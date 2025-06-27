"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, Users, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

export function NewspaperFrontPage() {
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    )
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Newspaper Header */}
        <div className="text-center mb-8 border-b-8 border-amber-900 pb-6">
          <h1 className="text-7xl font-bold text-amber-900 mb-2" style={{ fontFamily: "serif" }}>
            WYOVERSE PIONEER
          </h1>
          <div className="flex justify-between items-center text-amber-700 text-lg">
            <span>Vol. 1, No. 1</span>
            <span className="font-semibold">{currentDate}</span>
            <span>Price: Free</span>
          </div>
          <div className="border-t-2 border-b-2 border-amber-900 py-1 mt-2">
            <p className="text-xl font-semibold text-amber-800">"ALL THE NEWS THAT'S FIT TO MINE"</p>
          </div>
        </div>

        {/* Main Headlines */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Lead Story */}
          <div className="lg:col-span-2">
            <Card className="border-4 border-amber-900 bg-white h-full">
              <CardHeader>
                <div className="text-center border-b-2 border-amber-900 pb-2 mb-4">
                  <h2 className="text-4xl font-bold text-amber-900" style={{ fontFamily: "serif" }}>
                    DIGITAL FRONTIER OPENS
                  </h2>
                  <p className="text-lg text-amber-700 mt-2">New Virtual Territory Discovered in the WyoVerse</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed text-gray-800 first-letter:text-6xl first-letter:font-bold first-letter:text-amber-900 first-letter:float-left first-letter:mr-2 first-letter:mt-1">
                    Pioneers from across the digital landscape are flocking to the newly discovered WyoVerse territory,
                    where virtual land meets real opportunity. This groundbreaking metaverse combines the spirit of the
                    American frontier with cutting-edge blockchain technology.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Local prospectors report finding valuable digital assets scattered throughout the territory,
                    including rare NFTs, cryptocurrency deposits, and virtual real estate ripe for development. The
                    territorial governor has established trading posts and saloons to serve the growing population.
                  </p>

                  <div className="bg-amber-50 border-l-4 border-amber-600 p-4 my-4">
                    <p className="text-amber-800 font-semibold italic">
                      "This here's the biggest opportunity since the California Gold Rush of '49. Only this time, we're
                      mining digital gold!" - Bill, Local Saloon Keeper
                    </p>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    The WyoVerse features multiple districts including a bustling business quarter, recreational gaming
                    areas, educational facilities, and vast wilderness areas perfect for virtual homesteading. Early
                    settlers are already establishing communities and forming trading partnerships.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Stories */}
          <div className="space-y-6">
            {/* Weather Report */}
            <Card className="border-4 border-amber-900 bg-white">
              <CardHeader className="text-center border-b-2 border-amber-900 pb-2">
                <h3 className="text-2xl font-bold text-amber-900" style={{ fontFamily: "serif" }}>
                  FRONTIER WEATHER
                </h3>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-900 mb-2">72°F</p>
                  <p className="text-amber-700">Clear Skies</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Perfect weather for digital prospecting and virtual cattle drives
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Market Report */}
            <Card className="border-4 border-amber-900 bg-white">
              <CardHeader className="text-center border-b-2 border-amber-900 pb-2">
                <h3 className="text-2xl font-bold text-amber-900" style={{ fontFamily: "serif" }}>
                  MARKET TELEGRAPH
                </h3>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Bitcoin:</span>
                    <span className="text-green-600 font-semibold">↑ $67,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Ethereum:</span>
                    <span className="text-red-600 font-semibold">↓ $3,850</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">AVAX:</span>
                    <span className="text-green-600 font-semibold">↑ $42.85</span>
                  </div>
                  <Separator className="my-2" />
                  <p className="text-xs text-gray-600 text-center">Prices updated via frontier telegraph</p>
                </div>
              </CardContent>
            </Card>

            {/* Advertisement */}
            <Card className="border-4 border-amber-900 bg-amber-50">
              <CardContent className="p-4 text-center">
                <h4 className="text-xl font-bold text-amber-900 mb-2">BILL'S SALOON</h4>
                <p className="text-amber-700 text-sm mb-2">"Best Digital Drinks in the Territory!"</p>
                <p className="text-xs text-gray-600">Located in the Entertainment District</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Secondary Headlines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-4 border-amber-900 bg-white">
            <CardHeader className="text-center border-b-2 border-amber-900 pb-2">
              <h3 className="text-xl font-bold text-amber-900" style={{ fontFamily: "serif" }}>
                GAMING DISTRICT OPENS
              </h3>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                The new Gaming District features exciting attractions including Crypto Clashers Boxing Arena and Digital
                Rodeo competitions. Visitors can test their skills and win valuable prizes.
              </p>
              <Link href="/games">
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">Visit Gaming District</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-4 border-amber-900 bg-white">
            <CardHeader className="text-center border-b-2 border-amber-900 pb-2">
              <h3 className="text-xl font-bold text-amber-900" style={{ fontFamily: "serif" }}>
                LAND RUSH BEGINS
              </h3>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Virtual homesteads now available for claim! Prime locations near the Digital Mountain are going fast.
                Stake your claim in the digital frontier today.
              </p>
              <Link href="/land-deeds">
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">Claim Your Land</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-4 border-amber-900 bg-white">
            <CardHeader className="text-center border-b-2 border-amber-900 pb-2">
              <h3 className="text-xl font-bold text-amber-900" style={{ fontFamily: "serif" }}>
                EDUCATION FRONTIER
              </h3>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                The WyoVerse Academy opens its doors with courses in digital literacy, blockchain technology, and
                virtual world navigation for pioneers of all ages.
              </p>
              <Link href="/education">
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">Enroll Today</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Games Advertisement Section */}
        <Card className="border-4 border-amber-900 bg-gradient-to-r from-amber-100 to-orange-100 mb-8">
          <CardHeader className="text-center border-b-2 border-amber-900 pb-4">
            <h2 className="text-3xl font-bold text-amber-900" style={{ fontFamily: "serif" }}>
              FRONTIER ENTERTAINMENT DISTRICT
            </h2>
            <p className="text-amber-700 text-lg">Visit Our Partner Gaming Establishments</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="bg-white border-2 border-amber-600 rounded-lg p-6 mb-4">
                  <h3 className="text-2xl font-bold text-amber-900 mb-2">🥊 CRYPTO CLASHERS</h3>
                  <p className="text-amber-700 mb-4">
                    Step into the ring at our premier boxing arena! Watch epic battles between digital champions and
                    place your bets on the outcome.
                  </p>
                  <Badge className="bg-red-600 text-white mb-2">Live Boxing Matches</Badge>
                  <br />
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white mt-2"
                    onClick={() => window.open("https://github.com/Luckyspotonline", "_blank")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Crypto Arena
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-white border-2 border-amber-600 rounded-lg p-6 mb-4">
                  <h3 className="text-2xl font-bold text-amber-900 mb-2">🏎️ RACING CIRCUIT</h3>
                  <p className="text-amber-700 mb-4">
                    High-speed thrills await at our digital racing track! Compete against other pioneers in
                    heart-pounding races across the frontier.
                  </p>
                  <Badge className="bg-blue-600 text-white mb-2">Daily Races</Badge>
                  <br />
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white mt-2"
                    onClick={() => window.open("https://github.com/Luckyspotonline", "_blank")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Join the Race
                  </Button>
                </div>
              </div>
            </div>

            <div className="text-center mt-6 p-4 bg-amber-200 border-2 border-amber-600 rounded-lg">
              <p className="text-amber-900 font-semibold text-lg mb-2">
                🎮 More Games Available at Our Partner Studios
              </p>
              <p className="text-amber-800 mb-4">
                Discover additional gaming experiences and digital entertainment at our affiliated development studios.
              </p>
              <Button
                className="bg-amber-600 hover:bg-amber-700 text-white"
                onClick={() => window.open("https://github.com/Luckyspotonline", "_blank")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Explore All Games
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Community Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-4 border-amber-900 bg-white">
            <CardHeader className="text-center border-b-2 border-amber-900 pb-2">
              <h3 className="text-2xl font-bold text-amber-900" style={{ fontFamily: "serif" }}>
                COMMUNITY NOTICES
              </h3>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="border-l-4 border-amber-600 pl-3">
                  <p className="text-sm text-gray-700">
                    <strong>Town Hall Meeting:</strong> Every Sunday at the Community Center
                  </p>
                </div>
                <div className="border-l-4 border-amber-600 pl-3">
                  <p className="text-sm text-gray-700">
                    <strong>Digital Rodeo:</strong> Weekly competitions with prize pools
                  </p>
                </div>
                <div className="border-l-4 border-amber-600 pl-3">
                  <p className="text-sm text-gray-700">
                    <strong>Prospector's Guild:</strong> New member orientation Tuesdays
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-4 border-amber-900 bg-white">
            <CardHeader className="text-center border-b-2 border-amber-900 pb-2">
              <h3 className="text-2xl font-bold text-amber-900" style={{ fontFamily: "serif" }}>
                CLASSIFIED ADS
              </h3>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2 text-xs">
                <p>
                  <strong>FOR SALE:</strong> Prime virtual real estate near Digital Mountain. Contact
                  Sheriff@wyoverse.com
                </p>
                <Separator />
                <p>
                  <strong>WANTED:</strong> Experienced blockchain miners for expedition. Good pay!
                </p>
                <Separator />
                <p>
                  <strong>SERVICES:</strong> Virtual cattle drives and digital homestead setup
                </p>
                <Separator />
                <p>
                  <strong>LOST:</strong> Digital wallet containing rare NFTs. Reward offered!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center border-t-8 border-amber-900 pt-6">
          <p className="text-amber-700 text-lg font-semibold mb-2">"Where Digital Dreams Meet Frontier Spirit"</p>
          <p className="text-amber-600 text-sm">
            Published by the WyoVerse Pioneer Press • Established 2024 • Serving the Digital Frontier
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/community">
              <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50 bg-transparent">
                <Users className="mr-2 h-4 w-4" />
                Join Community
              </Button>
            </Link>
            <Link href="/calendar">
              <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50 bg-transparent">
                <Calendar className="mr-2 h-4 w-4" />
                Events Calendar
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50 bg-transparent">
                <MapPin className="mr-2 h-4 w-4" />
                Explore Territory
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
