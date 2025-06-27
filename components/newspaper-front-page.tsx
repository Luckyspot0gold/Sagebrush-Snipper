"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, TrendingUp, Users, MapPin, ExternalLink, Newspaper, Clock } from "lucide-react"

export default function NewspaperFrontPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [marketData, setMarketData] = useState({
    bitcoin: { price: 45000, change: 2.5 },
    ethereum: { price: 3200, change: -1.2 },
    avalanche: { price: 38, change: 4.1 },
  })

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const frontPageNews = [
    {
      headline: "WyoVerse Pioneer Discovers New Digital Territory",
      subheading: "Local prospector strikes gold in the metaverse mining district",
      content:
        "A pioneering spirit has led to the discovery of untapped digital resources in the northern sectors of WyoVerse. The find promises to bring new opportunities for settlers and entrepreneurs alike.",
      category: "Mining & Exploration",
    },
    {
      headline: "Bar Keep Bill's Saloon Opens for Business",
      subheading: "AI-powered bartender serves wisdom with every drink",
      content:
        "The newest establishment in WyoVerse features an artificial intelligence bartender who dispenses both beverages and sage advice to weary travelers and local residents.",
      category: "Business & Commerce",
    },
    {
      headline: "Crypto Clashers Championship Announced",
      subheading: "Boxing and racing tournaments to determine territorial champions",
      content:
        "The annual Crypto Clashers tournament will feature both boxing matches and high-speed racing competitions, with substantial prize pools for the victorious competitors.",
      category: "Sports & Entertainment",
    },
  ]

  const wantedPosters = [
    {
      name: "Stone the Outlaw",
      crime: "Claim Jumping & Digital Rustling",
      reward: "500 STONES",
      description: "Last seen near the Wyoming Pyramid. Approach with caution.",
    },
    {
      name: "The Phantom Trader",
      crime: "Market Manipulation",
      reward: "1000 TATONKA",
      description: "Known for mysterious trading patterns. Identity unknown.",
    },
  ]

  const upcomingEvents = [
    {
      date: "Dec 28",
      event: "Digital Rodeo Championship",
      location: "Central Arena",
    },
    {
      date: "Dec 30",
      event: "New Year's Frontier Celebration",
      location: "Main Street",
    },
    {
      date: "Jan 2",
      event: "Land Deed Auction",
      location: "Town Hall",
    },
  ]

  const communityStats = {
    activeUsers: 1247,
    landClaims: 892,
    dailyTransactions: 3456,
    totalStones: 125000,
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-amber-50 to-orange-50 min-h-screen">
      {/* Newspaper Header */}
      <div className="text-center mb-8 border-b-4 border-amber-800 pb-6">
        <div className="flex items-center justify-center mb-4">
          <Newspaper className="h-12 w-12 text-amber-800 mr-4" />
          <div>
            <h1 className="text-6xl font-bold text-amber-900 font-serif tracking-wider">THE WYOVERSE PIONEER</h1>
            <p className="text-xl text-amber-700 font-serif italic">"All the News That's Fit to Mine"</p>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-amber-600 font-serif">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="text-center">
            <div className="font-bold">ESTABLISHED 2024</div>
            <div>Digital Frontier Edition</div>
          </div>
          <div className="text-right">
            <div>Volume 1, Issue {Math.floor(Date.now() / 86400000) - 19700}</div>
            <div>Price: 1 STONE</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Lead Story */}
          <Card className="border-2 border-amber-300 bg-white shadow-lg">
            <CardHeader className="bg-amber-100">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-amber-200 text-amber-800">
                  BREAKING NEWS
                </Badge>
                <div className="text-sm text-amber-600 font-serif">{currentTime.toLocaleTimeString()}</div>
              </div>
              <CardTitle className="text-3xl font-bold text-amber-900 font-serif leading-tight">
                {frontPageNews[0].headline}
              </CardTitle>
              <p className="text-lg text-amber-700 font-serif italic">{frontPageNews[0].subheading}</p>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-700 font-serif leading-relaxed text-lg">{frontPageNews[0].content}</p>
              <div className="mt-4 flex items-center justify-between">
                <Badge variant="outline" className="font-serif">
                  {frontPageNews[0].category}
                </Badge>
                <Button variant="link" className="text-amber-600 font-serif">
                  Read Full Story →
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Secondary Stories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {frontPageNews.slice(1).map((story, index) => (
              <Card key={index} className="border border-amber-200 bg-white shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-bold text-amber-900 font-serif leading-tight">
                    {story.headline}
                  </CardTitle>
                  <p className="text-sm text-amber-600 font-serif italic">{story.subheading}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 font-serif text-sm leading-relaxed">{story.content}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <Badge variant="outline" className="text-xs font-serif">
                      {story.category}
                    </Badge>
                    <Button variant="link" size="sm" className="text-amber-600 font-serif">
                      Continue →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Market Report */}
          <Card className="border border-green-300 bg-green-50">
            <CardHeader className="bg-green-100">
              <CardTitle className="text-2xl font-bold text-green-800 font-serif flex items-center">
                <TrendingUp className="h-6 w-6 mr-2" />
                Market Report
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(marketData).map(([coin, data]) => (
                  <div key={coin} className="text-center p-3 bg-white rounded border">
                    <div className="font-bold text-lg font-serif capitalize">{coin}</div>
                    <div className="text-2xl font-bold text-gray-800">${data.price.toLocaleString()}</div>
                    <div className={`text-sm font-semibold ${data.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {data.change >= 0 ? "+" : ""}
                      {data.change}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Games Advertisement */}
          <Card className="border-2 border-purple-400 bg-gradient-to-r from-purple-100 to-pink-100">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-purple-800 font-serif">
                🎮 Featured Games from Luckyspotonline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border-2 border-purple-300">
                  <h3 className="text-xl font-bold text-purple-700 font-serif mb-2">Crypto Clashers</h3>
                  <p className="text-gray-600 font-serif mb-3">Epic boxing and racing battles in the digital arena</p>
                  <Button
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => window.open("https://github.com/Luckyspotonline", "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Play Now
                  </Button>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border-2 border-blue-300">
                  <h3 className="text-xl font-bold text-blue-700 font-serif mb-2">Digital Frontier</h3>
                  <p className="text-gray-600 font-serif mb-3">
                    Explore, mine, and build in the vast digital wilderness
                  </p>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => window.open("https://github.com/Luckyspotonline", "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Explore
                  </Button>
                </div>
              </div>
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600 font-serif">
                  Visit our complete game collection at{" "}
                  <Button
                    variant="link"
                    className="text-purple-600 font-serif p-0 h-auto"
                    onClick={() => window.open("https://github.com/Luckyspotonline", "_blank")}
                  >
                    github.com/Luckyspotonline
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Community Stats */}
          <Card className="border border-blue-300 bg-blue-50">
            <CardHeader className="bg-blue-100">
              <CardTitle className="text-xl font-bold text-blue-800 font-serif flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Community Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-serif text-gray-700">Active Pioneers:</span>
                  <span className="font-bold text-blue-800">{communityStats.activeUsers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-serif text-gray-700">Land Claims:</span>
                  <span className="font-bold text-blue-800">{communityStats.landClaims.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-serif text-gray-700">Daily Trades:</span>
                  <span className="font-bold text-blue-800">{communityStats.dailyTransactions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-serif text-gray-700">Total Stones:</span>
                  <span className="font-bold text-blue-800">{communityStats.totalStones.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wanted Posters */}
          <Card className="border-2 border-red-400 bg-red-50">
            <CardHeader className="bg-red-100">
              <CardTitle className="text-xl font-bold text-red-800 font-serif">🚨 WANTED</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {wantedPosters.map((poster, index) => (
                  <div key={index} className="border-2 border-red-300 p-3 bg-white rounded">
                    <div className="text-center mb-2">
                      <div className="font-bold text-red-800 font-serif">{poster.name}</div>
                      <div className="text-sm text-red-600 font-serif italic">{poster.crime}</div>
                    </div>
                    <Separator className="my-2" />
                    <div className="text-xs text-gray-600 font-serif mb-2">{poster.description}</div>
                    <div className="text-center">
                      <Badge variant="destructive" className="font-serif">
                        REWARD: {poster.reward}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="border border-amber-300 bg-amber-50">
            <CardHeader className="bg-amber-100">
              <CardTitle className="text-xl font-bold text-amber-800 font-serif flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3 p-2 bg-white rounded border">
                    <div className="text-center min-w-[50px]">
                      <div className="text-sm font-bold text-amber-800 font-serif">{event.date}</div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 font-serif text-sm">{event.event}</div>
                      <div className="text-xs text-gray-600 font-serif flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weather & Conditions */}
          <Card className="border border-gray-300 bg-gray-50">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-xl font-bold text-gray-800 font-serif">🌤️ Frontier Conditions</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">72°F</div>
                <div className="text-sm text-gray-600 font-serif">Partly Cloudy</div>
                <div className="text-xs text-gray-500 font-serif mt-2">Perfect weather for mining and exploration</div>
              </div>
              <Separator className="my-3" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-serif text-gray-700">Network Status:</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Optimal
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-serif text-gray-700">Mining Difficulty:</span>
                  <Badge variant="secondary">Moderate</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t-2 border-amber-800 text-center">
        <div className="text-sm text-amber-700 font-serif space-y-2">
          <div>Published by WyoVerse Media Corporation • Established in the Digital Frontier</div>
          <div>"Building Tomorrow's West, Today" • All Rights Reserved © 2024</div>
          <div className="flex justify-center items-center space-x-4 mt-4">
            <Button
              variant="link"
              size="sm"
              className="text-amber-600 font-serif"
              onClick={() => window.open("https://github.com/Luckyspotonline", "_blank")}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              More Games
            </Button>
            <span className="text-amber-400">•</span>
            <Button variant="link" size="sm" className="text-amber-600 font-serif">
              Subscribe
            </Button>
            <span className="text-amber-400">•</span>
            <Button variant="link" size="sm" className="text-amber-600 font-serif">
              Contact
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
