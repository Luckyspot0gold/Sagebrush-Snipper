"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  Map,
  Gamepad2,
  Store,
  Users,
  Calendar,
  BookOpen,
  Zap,
  Mountain,
  Briefcase,
  Heart,
  Trophy,
  Coins,
  Shield,
  Camera,
  FileText,
  Settings,
  Star,
  Target,
  Compass,
  Pickaxe,
  TreePine,
  Building,
  GraduationCap,
  Activity,
} from "lucide-react"

const navigationItems = [
  { href: "/", icon: Home, label: "WyoVerse Pioneer", badge: "NEW" },
  { href: "/explore", icon: Compass, label: "Explore Wyoming" },
  { href: "/games", icon: Gamepad2, label: "Frontier Games", badge: "HOT" },
  { href: "/cryptopia", icon: Coins, label: "Cryptopia Market" },
  { href: "/digital-rodeo", icon: Target, label: "Digital Rodeo" },
  { href: "/boxing-arena", icon: Trophy, label: "Boxing Arena" },
  { href: "/racing-circuit", icon: Activity, label: "Racing Circuit" },
  { href: "/saloon", icon: Users, label: "Bill's Saloon" },
  { href: "/community", icon: Users, label: "Community Hub" },
  { href: "/classifieds", icon: FileText, label: "Classifieds" },
  { href: "/store", icon: Store, label: "Trading Post" },
  { href: "/land-deeds", icon: Map, label: "Land Deeds" },
  { href: "/mining", icon: Pickaxe, label: "Mining Claims" },
  { href: "/energy", icon: Zap, label: "Energy Markets" },
  { href: "/business", icon: Briefcase, label: "Business Hub" },
  { href: "/education", icon: GraduationCap, label: "Education Portal" },
  { href: "/tourism", icon: Camera, label: "Tourism Board" },
  { href: "/parks", icon: TreePine, label: "Parks & Recreation" },
  { href: "/lifestyle", icon: Heart, label: "Lifestyle" },
  { href: "/sports", icon: Trophy, label: "Sports Central" },
  { href: "/calendar", icon: Calendar, label: "Events Calendar" },
  { href: "/native-history", icon: BookOpen, label: "Native History" },
  { href: "/wyoming-pyramid", icon: Mountain, label: "Wyoming Pyramid" },
  { href: "/wyoming-records", icon: FileText, label: "Wyoming Records" },
  { href: "/stones", icon: Star, label: "Stones & NFTs" },
  { href: "/patents", icon: Shield, label: "Patent Office" },
  { href: "/property", icon: Building, label: "Property Connect" },
  { href: "/osha", icon: Shield, label: "OSHA Training" },
  { href: "/system-status", icon: Settings, label: "System Status" },
]

const wantedPosters = [
  {
    name: "Stone 'The Enforcer'",
    bounty: "$50,000",
    crime: "Illegal Mining Operations",
    image: "/images/wyoverse-stone-wanted-poster.png",
    description: "Wanted for unauthorized cryptocurrency mining in protected wilderness areas",
  },
  {
    name: "Crypto Clasher Champion",
    bounty: "$25,000",
    crime: "Underground Boxing",
    image: "/images/crypto-clashers-fighter.png",
    description: "Organizing illegal crypto-betting boxing matches",
  },
  {
    name: "Bar Keep Bill",
    bounty: "$10,000 REWARD",
    crime: "Information Broker",
    image: "/images/bar-keep-bill-poster.png",
    description: "Wanted for questioning about frontier trading activities",
  },
]

const gameAdvertisements = [
  {
    title: "Crypto Clashers Boxing",
    description: "Epic battles in the digital colosseum",
    image: "/images/cryptoclasherboxingposter.jpg",
    link: "https://github.com/LuckyspotOgold/Crypto",
    badge: "PLAY NOW",
  },
  {
    title: "Crypto Clashers Racing",
    description: "High-speed crypto-powered racing",
    image: "/images/cryptoclasherwcarsposter.jpg",
    link: "https://github.com/LuckyspotOgold/Crypto",
    badge: "RACE NOW",
  },
  {
    title: "Frontier Trader",
    description: "Master the art of frontier commerce",
    image: "/images/frontiertraderposter.jpg",
    link: "https://github.com/LuckyspotOgold/Crypto",
    badge: "TRADE NOW",
  },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [currentPoster, setCurrentPoster] = useState(0)
  const [currentAd, setCurrentAd] = useState(0)

  useEffect(() => {
    const posterInterval = setInterval(() => {
      setCurrentPoster((prev) => (prev + 1) % wantedPosters.length)
    }, 5000)

    const adInterval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % gameAdvertisements.length)
    }, 7000)

    return () => {
      clearInterval(posterInterval)
      clearInterval(adInterval)
    }
  }, [])

  if (isCollapsed) {
    return (
      <div className="fixed left-0 top-0 h-full w-16 bg-gradient-to-b from-amber-50 to-amber-100 border-r-4 border-amber-800 z-40 flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(false)}
          className="mb-4 text-amber-800 hover:bg-amber-200"
        >
          <Compass className="h-6 w-6" />
        </Button>
        <div className="flex flex-col gap-2">
          {navigationItems.slice(0, 8).map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant="ghost" size="sm" className="w-12 h-12 text-amber-800 hover:bg-amber-200">
                <item.icon className="h-5 w-5" />
              </Button>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-amber-50 to-amber-100 border-r-4 border-amber-800 overflow-y-auto z-40">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Image src="/placeholder-logo.png" alt="WyoVerse Logo" width={32} height={32} className="rounded-full" />
            <h1 className="font-bold text-amber-900 text-lg">WyoVerse</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(true)}
            className="text-amber-800 hover:bg-amber-200"
          >
            <Compass className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 mb-6">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className="w-full justify-start text-amber-900 hover:bg-amber-200 hover:text-amber-950"
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto bg-red-600 text-white">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            </Link>
          ))}
        </nav>

        <Separator className="my-4 bg-amber-300" />

        {/* Wanted Posters */}
        <Card className="mb-4 bg-gradient-to-b from-amber-100 to-amber-200 border-2 border-amber-800">
          <CardContent className="p-3">
            <div className="text-center mb-2">
              <h3 className="font-bold text-red-800 text-lg uppercase tracking-wide">WANTED</h3>
              <div className="w-full h-1 bg-red-800 mb-2"></div>
            </div>

            <div className="relative">
              <Image
                src={wantedPosters[currentPoster].image || "/placeholder.svg"}
                alt={wantedPosters[currentPoster].name}
                width={200}
                height={150}
                className="w-full h-32 object-cover rounded border-2 border-amber-800"
              />
              <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                {wantedPosters[currentPoster].bounty}
              </div>
            </div>

            <div className="mt-2 text-center">
              <h4 className="font-bold text-amber-900 text-sm">{wantedPosters[currentPoster].name}</h4>
              <p className="text-xs text-red-700 font-semibold">{wantedPosters[currentPoster].crime}</p>
              <p className="text-xs text-amber-800 mt-1">{wantedPosters[currentPoster].description}</p>
            </div>

            <div className="flex justify-center mt-2 gap-1">
              {wantedPosters.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentPoster ? "bg-red-600" : "bg-amber-400"}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Game Advertisements */}
        <Card className="mb-4 bg-gradient-to-b from-green-100 to-green-200 border-2 border-green-800">
          <CardContent className="p-3">
            <div className="text-center mb-2">
              <h3 className="font-bold text-green-800 text-sm uppercase tracking-wide">Featured Games</h3>
              <div className="w-full h-1 bg-green-800 mb-2"></div>
            </div>

            <div className="relative">
              <Image
                src={gameAdvertisements[currentAd].image || "/placeholder.svg"}
                alt={gameAdvertisements[currentAd].title}
                width={200}
                height={120}
                className="w-full h-24 object-cover rounded border-2 border-green-800"
              />
              <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                {gameAdvertisements[currentAd].badge}
              </div>
            </div>

            <div className="mt-2 text-center">
              <h4 className="font-bold text-green-900 text-sm">{gameAdvertisements[currentAd].title}</h4>
              <p className="text-xs text-green-700 mb-2">{gameAdvertisements[currentAd].description}</p>
              <Link href={gameAdvertisements[currentAd].link} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Play Now
                </Button>
              </Link>
            </div>

            <div className="flex justify-center mt-2 gap-1">
              {gameAdvertisements.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentAd ? "bg-green-600" : "bg-green-400"}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-gradient-to-b from-blue-100 to-blue-200 border-2 border-blue-800">
          <CardContent className="p-3">
            <h3 className="font-bold text-blue-800 text-sm mb-2 text-center">Frontier Stats</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-blue-700">Active Pioneers:</span>
                <span className="font-bold text-blue-900">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Land Claims:</span>
                <span className="font-bold text-blue-900">892</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Active Trades:</span>
                <span className="font-bold text-blue-900">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Social Good:</span>
                <span className="font-bold text-green-600">$12,450</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-4 text-center text-xs text-amber-700">
          <p>© 2024 WyoVerse</p>
          <p>Digital Frontier Experience</p>
          <div className="flex justify-center gap-2 mt-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>
      </div>
    </div>
  )
}
