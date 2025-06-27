"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  Gamepad2,
  MapPin,
  Store,
  Users,
  Calendar,
  BookOpen,
  Zap,
  Mountain,
  Pickaxe,
  Trophy,
  Coins,
  User,
  Search,
  Camera,
  Building,
  Heart,
  Trees,
  Feather,
  Triangle,
  Archive,
  Lightbulb,
  Shield,
  Activity,
  Github,
  ExternalLink,
} from "lucide-react"

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<any>
  badge?: string
}

interface GameAd {
  title: string
  description: string
  image: string
  link: string
  featured?: boolean
}

interface WantedPoster {
  name: string
  image: string
  reward: string
  crime: string
}

const navigation: NavItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Games Portal", href: "/games", icon: Gamepad2, badge: "Hot" },
  { name: "Boxing Arena", href: "/boxing-arena", icon: Trophy },
  { name: "Racing Circuit", href: "/racing-circuit", icon: Activity },
  { name: "Bill's Saloon", href: "/saloon", icon: User },
  { name: "Explore Map", href: "/explore", icon: MapPin },
  { name: "Land Deeds", href: "/land-deeds", icon: Mountain },
  { name: "Mining Operations", href: "/mining", icon: Pickaxe },
  { name: "Stones & NFTs", href: "/stones", icon: Coins },
  { name: "Marketplace", href: "/store", icon: Store },
  { name: "Community", href: "/community", icon: Users },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Education", href: "/education", icon: BookOpen },
  { name: "Energy Markets", href: "/energy", icon: Zap },
  { name: "Tourism", href: "/tourism", icon: Camera },
  { name: "Business Hub", href: "/business", icon: Building },
  { name: "Sports", href: "/sports", icon: Trophy },
  { name: "Lifestyle", href: "/lifestyle", icon: Heart },
  { name: "Classifieds", href: "/classifieds", icon: Search },
  { name: "Wyoming Records", href: "/wyoming-records", icon: Archive },
  { name: "Native History", href: "/native-history", icon: Feather },
  { name: "Wyoming Pyramid", href: "/wyoming-pyramid", icon: Triangle },
  { name: "Parks & Recreation", href: "/parks", icon: Trees },
  { name: "Patents", href: "/patents", icon: Lightbulb },
  { name: "Property Connection", href: "/property", icon: Home },
  { name: "OSHA Training", href: "/osha", icon: Shield },
  { name: "System Status", href: "/system-status", icon: Activity },
]

const gameAds: GameAd[] = [
  {
    title: "Crypto Clashers Boxing",
    description: "Epic bull vs bear battles in the digital colosseum",
    image: "/images/crypto-clashers-fighter.png",
    link: "https://github.com/LuckyspotOgold/Crypto",
    featured: true,
  },
  {
    title: "Crypto Clashers Racing",
    description: "High-speed crypto-powered racing action",
    image: "/images/crypto-clashers-racing-poster.png",
    link: "https://github.com/LuckyspotOgold/Crypto",
    featured: true,
  },
  {
    title: "Frontier Trader",
    description: "Trade your way to fortune in the digital frontier",
    image: "/images/frontiertraderposter.jpg",
    link: "https://github.com/LuckyspotOgold/Crypto",
    featured: false,
  },
]

const wantedPosters: WantedPoster[] = [
  {
    name: "Stone Collector",
    image: "/images/wyoverse-stone-wanted-poster.png",
    reward: "1000 STONES",
    crime: "Hoarding rare minerals",
  },
  {
    name: "Crypto Clasher",
    image: "/images/cryptoclasherboxingposter.jpg",
    reward: "500 AVAX",
    crime: "Illegal underground boxing",
  },
  {
    name: "Bar Keep Bill",
    image: "/images/bar-keep-bill-poster.png",
    reward: "750 STONES",
    crime: "Serving suspicious cocktails",
  },
]

export function Sidebar() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentAdIndex, setCurrentAdIndex] = useState(0)
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0)
  const [communityStats, setCommunityStats] = useState({
    activeUsers: 1247,
    totalGames: 12,
    dailyRevenue: 3420,
    socialGoodFunds: 1890,
  })

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Rotate game ads every 8 seconds
  useEffect(() => {
    const adTimer = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % gameAds.length)
    }, 8000)
    return () => clearInterval(adTimer)
  }, [])

  // Rotate wanted posters every 6 seconds
  useEffect(() => {
    const posterTimer = setInterval(() => {
      setCurrentPosterIndex((prev) => (prev + 1) % wantedPosters.length)
    }, 6000)
    return () => clearInterval(posterTimer)
  }, [])

  // Update community stats every 30 seconds
  useEffect(() => {
    const statsTimer = setInterval(() => {
      setCommunityStats((prev) => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        totalGames: prev.totalGames,
        dailyRevenue: prev.dailyRevenue + Math.floor(Math.random() * 100) - 50,
        socialGoodFunds: prev.socialGoodFunds + Math.floor(Math.random() * 50) - 25,
      }))
    }, 30000)
    return () => clearInterval(statsTimer)
  }, [])

  const currentAd = gameAds[currentAdIndex]
  const currentPoster = wantedPosters[currentPosterIndex]

  return (
    <div className="w-80 bg-gradient-to-b from-amber-900 to-amber-800 text-white flex flex-col h-full">
      {/* Header */}
      <div className="p-6 bg-amber-950">
        <div className="flex items-center space-x-3">
          <Mountain className="h-8 w-8 text-amber-400" />
          <span className="text-xl font-bold text-amber-100">WyoVerse</span>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 py-6">
        {/* Live Clock */}
        <Card className="mb-6 bg-amber-800/50 border-amber-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-mono text-amber-100">{currentTime.toLocaleTimeString()}</div>
            <div className="text-sm text-amber-300">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <nav className="space-y-2 mb-6">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center justify-between px-3 py-2 text-sm font-medium text-amber-100 rounded-lg hover:bg-amber-800/50 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5 text-amber-400 group-hover:text-amber-300" />
                <span className="group-hover:text-amber-200">{item.name}</span>
              </div>
              {item.badge && (
                <Badge variant="secondary" className="bg-red-600 text-white text-xs">
                  {item.badge}
                </Badge>
              )}
            </a>
          ))}
        </nav>

        <Separator className="my-6 bg-amber-700" />

        {/* Game Advertisement */}
        <Card className="mb-6 bg-amber-800/50 border-amber-700 overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-amber-100">Featured Game</CardTitle>
              <Github className="h-5 w-5 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="relative">
              <img
                src={currentAd.image || "/placeholder.svg"}
                alt={currentAd.title}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              {currentAd.featured && <Badge className="absolute top-2 right-2 bg-red-600 text-white">Featured</Badge>}
            </div>
            <h3 className="font-bold text-amber-100 mb-1">{currentAd.title}</h3>
            <p className="text-sm text-amber-300 mb-3">{currentAd.description}</p>
            <Button asChild size="sm" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
              <a href={currentAd.link} target="_blank" rel="noopener noreferrer">
                Play Now <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Wanted Poster */}
        <Card className="mb-6 bg-red-900/50 border-red-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-red-100">WANTED</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-center">
              <img
                src={currentPoster.image || "/placeholder.svg"}
                alt={currentPoster.name}
                className="w-24 h-24 mx-auto rounded-lg mb-3 border-2 border-red-600"
              />
              <h3 className="font-bold text-red-100 mb-1">{currentPoster.name}</h3>
              <p className="text-sm text-red-300 mb-2">{currentPoster.crime}</p>
              <Badge className="bg-yellow-600 text-black font-bold">REWARD: {currentPoster.reward}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Community Stats */}
        <Card className="mb-6 bg-green-900/50 border-green-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-green-100 flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Community Pulse
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-300">Active Users</span>
              <Badge className="bg-green-600 text-white">{communityStats.activeUsers.toLocaleString()}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-300">Total Games</span>
              <Badge className="bg-blue-600 text-white">{communityStats.totalGames}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-300">Daily Revenue</span>
              <Badge className="bg-yellow-600 text-black">${communityStats.dailyRevenue.toLocaleString()}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-300">Social Good</span>
              <Badge className="bg-purple-600 text-white">${communityStats.socialGoodFunds.toLocaleString()}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-amber-800/50 border-amber-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-amber-100">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-2">
            <Button asChild size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
              <a href="/boxing-arena">
                <Trophy className="mr-2 h-4 w-4" />
                Enter Boxing Arena
              </a>
            </Button>
            <Button asChild size="sm" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
              <a href="/saloon">
                <User className="mr-2 h-4 w-4" />
                Visit Bill's Saloon
              </a>
            </Button>
            <Button asChild size="sm" className="w-full bg-gray-600 hover:bg-gray-700 text-white">
              <a href="/mining">
                <Pickaxe className="mr-2 h-4 w-4" />
                Start Mining
              </a>
            </Button>
          </CardContent>
        </Card>
      </ScrollArea>
    </div>
  )
}
