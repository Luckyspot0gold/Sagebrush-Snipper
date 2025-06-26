"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, Users, Zap, Trophy } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface NewsStory {
  id: string
  headline: string
  subheading: string
  content: string
  category: "breaking" | "sports" | "business" | "frontier" | "gaming"
  priority: number
  image?: string
  link?: string
}

const FRONTIER_STORIES: NewsStory[] = [
  {
    id: "frontier-trader-launch",
    headline: "STONEYARD GAMING ANNOUNCES FRONTIER TRADER",
    subheading: "Revolutionary GameFi Platform Bridges Old West with Modern Trading",
    content:
      "Local gaming pioneer Stoneyard Gaming has unveiled their latest creation - Frontier Trader, a groundbreaking platform that combines traditional frontier trading wisdom with cutting-edge blockchain technology. The platform features the mysterious cowboy figure who stands between the old wagon trails and modern highways, symbolizing the bridge between eras.",
    category: "breaking",
    priority: 1,
    image: "/images/frontiertraderposter.jpg",
    link: "/frontier-trader",
  },
  {
    id: "wyoming-pyramid-discovery",
    headline: "MYSTERIOUS PYRAMID DISCOVERED IN WYOMING TERRITORY",
    subheading: "Archaeological Team Uncovers Ancient Structure Near Cheyenne",
    content:
      "A team of archaeologists working near Cheyenne has made a startling discovery - a pyramid-like structure buried beneath the prairie. The structure, estimated to be over 1,000 years old, contains intricate carvings and what appears to be a chamber filled with unusual crystalline formations. Local Shoshone elders claim their ancestors spoke of such a place in their oral histories.",
    category: "frontier",
    priority: 2,
    image: "/images/wyoverse-digital-mountain.png",
    link: "/wyoming-pyramid",
  },
  {
    id: "crypto-clashers-championship",
    headline: "CRYPTO CLASHERS BOXING CHAMPIONSHIP ANNOUNCED",
    subheading: "Prize Pool Exceeds 10,000 STONES for Ultimate Fighting Tournament",
    content:
      "The territorial boxing commission has announced the first-ever Crypto Clashers Championship, featuring fighters from across the digital frontier. Bar Keep Bill will serve as official referee, bringing his decades of saloon experience to ensure fair fights.",
    category: "sports",
    priority: 3,
    image: "/images/crypto-clashers-fighter.png",
    link: "/boxing-arena",
  },
  {
    id: "racing-circuit-opens",
    headline: "CRYPTOCIAN RACING CIRCUIT OPENS FOR BUSINESS",
    subheading: "High-Speed Thrills Meet Blockchain Technology",
    content:
      "The new racing circuit outside town is drawing crowds with its unique blend of traditional horsepower and digital innovation. Racers compete for NFT trophies while spectators can bet using STONES tokens.",
    category: "sports",
    priority: 4,
    image: "/images/dogincivicvenicecc.webp",
    link: "/racing-circuit",
  },
  {
    id: "bills-saloon-expansion",
    headline: "BAR KEEP BILL EXPANDS SALOON OPERATIONS",
    subheading: "New Premium Bottle Collection & Enhanced Trading Advice",
    content:
      "The territory's most trusted bartender and trading advisor has expanded his establishment with a premium bottle collection including Wyoverse Whiskey, Buffalo Bourbon, and Snipers Sarsaparilla. Bill's market wisdom continues to guide local traders through volatile times.",
    category: "business",
    priority: 5,
    image: "/placeholder.svg?height=200&width=300&text=🤠🍺",
    link: "/saloon",
  },
]

export function NewspaperFrontPage() {
  const [currentDate] = useState(new Date())
  const [stories] = useState(FRONTIER_STORIES.sort((a, b) => a.priority - b.priority))
  const [weatherMood] = useState("Fair & Profitable")

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "breaking":
        return "bg-red-600 text-white"
      case "sports":
        return "bg-blue-600 text-white"
      case "business":
        return "bg-green-600 text-white"
      case "frontier":
        return "bg-purple-600 text-white"
      case "gaming":
        return "bg-orange-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  return (
    <div className="newspaper-bg min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Newspaper Header */}
        <div className="border-8 border-black bg-white shadow-2xl">
          {/* Masthead */}
          <div className="border-b-4 border-black p-6 bg-gradient-to-r from-amber-50 to-amber-100">
            <div className="text-center">
              <h1 className="text-6xl font-serif font-black mb-2 headline-primary">THE WYOVERSE PIONEER</h1>
              <div className="flex justify-between items-center text-sm font-serif">
                <div>EST. 1852 • VOLUME XCII</div>
                <div className="text-center">
                  <div className="font-bold">{formatDate(currentDate)}</div>
                  <div>PRICE: 2 STONES</div>
                </div>
                <div>WEATHER: {weatherMood}</div>
              </div>
              <Separator className="my-4 border-black border-2" />
              <div className="text-lg font-serif italic">
                "All the News That's Fit to Mine" • Serving the Digital Frontier Since the Gold Rush
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lead Story */}
            <div className="lg:col-span-2">
              <Card className="border-4 border-black shadow-lg">
                <CardHeader className="bg-red-600 text-white">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-white text-red-600 font-bold">
                      BREAKING NEWS
                    </Badge>
                    <Zap className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-2xl font-serif headline-primary">{stories[0]?.headline}</CardTitle>
                  <CardDescription className="text-red-100 font-serif text-lg">
                    {stories[0]?.subheading}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {stories[0]?.image && (
                    <div className="mb-4 border-2 border-black">
                      <Image
                        src={stories[0].image || "/placeholder.svg"}
                        alt={stories[0].headline}
                        width={600}
                        height={300}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}
                  <p className="font-serif text-lg leading-relaxed mb-4 newspaper-text">{stories[0]?.content}</p>
                  {stories[0]?.link && (
                    <Link href={stories[0].link}>
                      <Button className="frontier-button font-serif">Read Full Story →</Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Weather & Market */}
              <Card className="border-4 border-black">
                <CardHeader className="bg-blue-600 text-white">
                  <CardTitle className="font-serif flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Market & Weather
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3 font-serif">
                    <div className="flex justify-between">
                      <span>STONES:</span>
                      <span className="text-green-600 font-bold">↑ $2.47</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TATONKA:</span>
                      <span className="text-red-600 font-bold">↓ $0.89</span>
                    </div>
                    <div className="flex justify-between">
                      <span>AVAX:</span>
                      <span className="text-green-600 font-bold">↑ $34.21</span>
                    </div>
                    <Separator className="border-black" />
                    <div className="text-center">
                      <div className="text-2xl">☀️</div>
                      <div>Fair Trading Weather</div>
                      <div className="text-sm">Perfect for Mining</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="border-4 border-black">
                <CardHeader className="bg-purple-600 text-white">
                  <CardTitle className="font-serif flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Territory Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <Link href="/boxing-arena" className="block">
                      <Button variant="ghost" className="w-full justify-start font-serif">
                        🥊 Boxing Arena
                      </Button>
                    </Link>
                    <Link href="/racing-circuit" className="block">
                      <Button variant="ghost" className="w-full justify-start font-serif">
                        🏁 Racing Circuit
                      </Button>
                    </Link>
                    <Link href="/saloon" className="block">
                      <Button variant="ghost" className="w-full justify-start font-serif">
                        🍺 Bill's Saloon
                      </Button>
                    </Link>
                    <Link href="/mining" className="block">
                      <Button variant="ghost" className="w-full justify-start font-serif">
                        ⛏️ Mining Claims
                      </Button>
                    </Link>
                    <Link href="/land-deeds" className="block">
                      <Button variant="ghost" className="w-full justify-start font-serif">
                        📜 Land Office
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Secondary Stories */}
          <div className="p-6 border-t-4 border-black">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.slice(1, 4).map((story) => (
                <Card key={story.id} className="border-2 border-black">
                  <CardHeader className="pb-2">
                    <Badge className={getCategoryColor(story.category)} variant="secondary">
                      {story.category.toUpperCase()}
                    </Badge>
                    <CardTitle className="text-lg font-serif headline-secondary">{story.headline}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {story.image && (
                      <div className="mb-3 border border-black">
                        <Image
                          src={story.image || "/placeholder.svg"}
                          alt={story.headline}
                          width={300}
                          height={150}
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    )}
                    <p className="font-serif text-sm newspaper-text mb-3">{story.content.substring(0, 120)}...</p>
                    {story.link && (
                      <Link href={story.link}>
                        <Button size="sm" variant="outline" className="font-serif border-black">
                          Continue Reading
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-4 border-black p-4 bg-amber-50">
            <div className="text-center font-serif text-sm">
              <div className="flex justify-center items-center gap-4 mb-2">
                <Users className="h-4 w-4" />
                <span>Published by WyoVerse Pioneer Press</span>
                <Trophy className="h-4 w-4" />
              </div>
              <div>"Bringing you the latest from the Digital Frontier since the great blockchain rush of 2024"</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Named export

// Default export
export default NewspaperFrontPage
