"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Map,
  Gamepad2,
  Store,
  Users,
  Calendar,
  BookOpen,
  Mountain,
  Zap,
  Trophy,
  Briefcase,
  Shield,
  TreePine,
  FileText,
  Building,
  Plane,
  GraduationCap,
  Heart,
  Newspaper,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Star,
  Clock,
  TrendingUp,
  Activity,
} from "lucide-react"

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Explore", href: "/explore", icon: Map },
  { name: "Games", href: "/games", icon: Gamepad2 },
  { name: "Boxing Arena", href: "/boxing-arena", icon: Trophy },
  { name: "Racing Circuit", href: "/racing-circuit", icon: Activity },
  { name: "Bar Keep Bill's Saloon", href: "/saloon", icon: Heart },
  { name: "Store", href: "/store", icon: Store },
  { name: "Community", href: "/community", icon: Users },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Education", href: "/education", icon: BookOpen },
  { name: "OSHA Training", href: "/osha", icon: Shield },
  { name: "Mining", href: "/mining", icon: Mountain },
  { name: "Energy", href: "/energy", icon: Zap },
  { name: "Business", href: "/business", icon: Briefcase },
  { name: "Parks & Recreation", href: "/parks", icon: TreePine },
  { name: "Land Deeds", href: "/land-deeds", icon: FileText },
  { name: "Property", href: "/property", icon: Building },
  { name: "Tourism", href: "/tourism", icon: Plane },
  { name: "Lifestyle", href: "/lifestyle", icon: GraduationCap },
  { name: "Sports", href: "/sports", icon: Trophy },
  { name: "Classifieds", href: "/classifieds", icon: Newspaper },
  { name: "Wyoming Pyramid", href: "/wyoming-pyramid", icon: Mountain },
  { name: "Wyoming Records", href: "/wyoming-records", icon: FileText },
  { name: "Native History", href: "/native-history", icon: BookOpen },
  { name: "Stones & NFTs", href: "/stones", icon: Star },
  { name: "Patents", href: "/patents", icon: FileText },
  { name: "System Status", href: "/system-status", icon: Activity },
  { name: "Market Dashboard", href: "/market", icon: TrendingUp },
  { name: "Art Gallery", href: "/art", icon: Star },
]

const wantedPosters = [
  {
    id: "stone",
    title: "WANTED: STONE COLLECTOR",
    image: "/images/wyoverse-stone-wanted-poster.png",
    reward: "1000 STONES",
    description: "For outstanding mining achievements in the digital frontier",
  },
  {
    id: "crypto-clasher",
    title: "WANTED: CRYPTO CLASHER",
    image: "/images/crypto-clashers-fighter.png",
    reward: "0.5 AVAX",
    description: "Champion boxer of the digital colosseum",
  },
  {
    id: "bill",
    title: "WANTED: BAR KEEP BILL",
    image: "/images/bar-keep-bill-poster.png",
    reward: "FREE DRINKS",
    description: "Best bartender this side of the blockchain",
  },
]

const gameAds = [
  {
    title: "🥊 CRYPTO CLASHERS BOXING",
    subtitle: "Bull vs Bear Championship",
    image: "/images/cryptoclasherboxingposter.jpg",
    link: "https://github.com/LuckyspotOgold/Crypto",
    description: "Epic blockchain boxing battles",
  },
  {
    title: "🏎️ CRYPTO CLASHERS RACING",
    subtitle: "High-Speed Crypto Circuit",
    image: "/images/cryptoclasherwcarsposter.jpg",
    link: "https://github.com/LuckyspotOgold/Crypto",
    description: "Race for digital glory",
  },
  {
    title: "📈 FRONTIER TRADER",
    subtitle: "Wild West Trading Post",
    image: "/images/frontiertraderposter.jpg",
    link: "https://github.com/LuckyspotOgold/Crypto",
    description: "Trade like a frontier pioneer",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [currentPoster, setCurrentPoster] = useState(0)
  const [currentAd, setCurrentAd] = useState(0)
  const [communityStats, setCommunityStats] = useState({
    activeUsers: 1247,
    totalStones: 89432,
    activeFights: 23,
    landClaimed: 156,
  })

  // Rotate wanted posters every 5 seconds
  useEffect(() => {
    const posterInterval = setInterval(() => {
      setCurrentPoster((prev) => (prev + 1) % wantedPosters.length)
    }, 5000)

    return () => clearInterval(posterInterval)
  }, [])

  // Rotate game ads every 7 seconds
  useEffect(() => {
    const adInterval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % gameAds.length)
    }, 7000)

    return () => clearInterval(adInterval)
  }, [])

  // Update community stats every 30 seconds
  useEffect(() => {
    const statsInterval = setInterval(() => {
      setCommunityStats((prev) => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        totalStones: prev.totalStones + Math.floor(Math.random() * 100),
        activeFights: Math.max(0, prev.activeFights + Math.floor(Math.random() * 6 - 3)),
        landClaimed: prev.landClaimed + Math.floor(Math.random() * 3),
      }))
    }, 30000)

    return () => clearInterval(statsInterval)
  }, [])

  const currentPosterData = wantedPosters[currentPoster]
  const currentAdData = gameAds[currentAd]

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-gradient-to-b from-amber-50 to-orange-100 border-r-4 border-amber-800 transition-all duration-300",
        isCollapsed ? "w-16" : "w-80",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b-2 border-amber-800">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="text-2xl">🤠</div>
            <div>
              <h2 className="text-lg font-bold text-amber-900">WyoVerse</h2>
              <p className="text-xs text-amber-700">Digital Frontier</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-amber-800 hover:bg-amber-200"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {/* Navigation */}
        <div className="p-2">
          {!isCollapsed && <h3 className="text-sm font-semibold text-amber-900 mb-2 px-2">Navigation</h3>}
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start text-left",
                      isActive ? "bg-amber-800 text-white hover:bg-amber-700" : "text-amber-800 hover:bg-amber-200",
                      isCollapsed && "px-2",
                    )}
                  >
                    <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                    {!isCollapsed && item.name}
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>

        {!isCollapsed && (
          <>
            {/* Community Stats */}
            <div className="p-4 border-t-2 border-amber-800">
              <h3 className="text-sm font-semibold text-amber-900 mb-3">🏘️ Community Pulse</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-amber-700">Active Pioneers</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {communityStats.activeUsers.toLocaleString()}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-amber-700">Stones Mined</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {communityStats.totalStones.toLocaleString()}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-amber-700">Active Fights</span>
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    {communityStats.activeFights}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-amber-700">Land Claimed</span>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    {communityStats.landClaimed}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Rotating Wanted Poster */}
            <div className="p-4 border-t-2 border-amber-800">
              <h3 className="text-sm font-semibold text-amber-900 mb-3">📋 Wanted Poster</h3>
              <div className="bg-yellow-100 border-4 border-amber-800 p-3 rounded-lg transform rotate-1 shadow-lg">
                <div className="text-center">
                  <h4 className="font-bold text-red-800 text-xs mb-2">{currentPosterData.title}</h4>
                  <div className="relative h-24 mb-2">
                    <img
                      src={currentPosterData.image || "/placeholder.svg"}
                      alt={currentPosterData.title}
                      className="w-full h-full object-cover rounded border-2 border-amber-600"
                    />
                  </div>
                  <div className="text-xs text-amber-900">
                    <p className="font-semibold">REWARD: {currentPosterData.reward}</p>
                    <p className="mt-1">{currentPosterData.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-2 space-x-1">
                {wantedPosters.map((_, index) => (
                  <div
                    key={index}
                    className={cn("w-2 h-2 rounded-full", index === currentPoster ? "bg-amber-800" : "bg-amber-300")}
                  />
                ))}
              </div>
            </div>

            {/* Rotating Game Ads */}
            <div className="p-4 border-t-2 border-amber-800">
              <h3 className="text-sm font-semibold text-amber-900 mb-3">🎮 Featured Games</h3>
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-blue-400 p-3 rounded-lg shadow-lg">
                <div className="text-center">
                  <h4 className="font-bold text-blue-800 text-xs mb-2">{currentAdData.title}</h4>
                  <p className="text-xs text-blue-700 mb-2">{currentAdData.subtitle}</p>
                  <div className="relative h-20 mb-2">
                    <img
                      src={currentAdData.image || "/placeholder.svg"}
                      alt={currentAdData.title}
                      className="w-full h-full object-cover rounded border border-blue-300"
                    />
                  </div>
                  <p className="text-xs text-blue-800 mb-2">{currentAdData.description}</p>
                  <Link
                    href={currentAdData.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Play Now <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
              <div className="flex justify-center mt-2 space-x-1">
                {gameAds.map((_, index) => (
                  <div
                    key={index}
                    className={cn("w-2 h-2 rounded-full", index === currentAd ? "bg-blue-600" : "bg-blue-300")}
                  />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-t-2 border-amber-800">
              <h3 className="text-sm font-semibold text-amber-900 mb-3">⚡ Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/boxing-arena">
                  <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                    🥊 Enter Boxing Arena
                  </Button>
                </Link>
                <Link href="/saloon">
                  <Button size="sm" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                    🍺 Visit Bill's Saloon
                  </Button>
                </Link>
                <Link href="/mining">
                  <Button size="sm" className="w-full bg-gray-600 hover:bg-gray-700 text-white">
                    ⛏️ Start Mining
                  </Button>
                </Link>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t-2 border-amber-800 text-center">
              <div className="flex items-center justify-center space-x-1 text-xs text-amber-700">
                <Clock className="h-3 w-3" />
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
              <p className="text-xs text-amber-600 mt-1">Welcome to the Digital Frontier! 🤠</p>
            </div>
          </>
        )}
      </ScrollArea>
    </div>
  )
}
