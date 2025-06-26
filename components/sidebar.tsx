"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { WantedSidebar } from "@/components/wanted-sidebar"
import {
  Home,
  TrendingUp,
  Palette,
  Gamepad2,
  Users,
  Calendar,
  MapPin,
  Newspaper,
  Heart,
  ChevronLeft,
  ChevronRight,
  Store,
  Pickaxe,
  Wind,
  GraduationCap,
  Mountain,
  FileText,
  Gem,
  HardHat,
  Scroll,
  Landmark,
  MessageSquare,
  LandPlot,
  Video,
  Coins,
} from "lucide-react"

const navigation = [
  { name: "WyoVerse Pioneer", href: "/", icon: Home },
  { name: "Market Data", href: "/market", icon: TrendingUp },
  { name: "Art Gallery", href: "/art", icon: Palette },
  { name: "Games Portal", href: "/games", icon: Gamepad2 },
  { name: "Community", href: "/community", icon: Users },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Explore Territory", href: "/explore", icon: MapPin },
  { name: "Business", href: "/business", icon: Newspaper },
  { name: "Social Good", href: "/social-good", icon: Heart },
  { name: "General Store", href: "/store", icon: Store },
  { name: "Mining Operations", href: "/mining", icon: Pickaxe },
  { name: "Energy Markets", href: "/energy", icon: Wind },
  { name: "Education", href: "/education", icon: GraduationCap },
  { name: "Tourism", href: "/tourism", icon: Mountain },
  { name: "Classifieds", href: "/classifieds", icon: FileText },
  { name: "Stones & NFTs", href: "/stones", icon: Gem },
  { name: "OSHA Training", href: "/osha", icon: HardHat },
  { name: "Native History", href: "/native-history", icon: Scroll },
  { name: "Wyoming Pyramid", href: "/wyoming-pyramid", icon: Landmark },
  { name: "Saloon", href: "/saloon", icon: MessageSquare },
  { name: "Land Deeds", href: "/land-deeds", icon: LandPlot },
  { name: "Boxing Arena", href: "/boxing-arena", icon: Users },
  { name: "Racing Circuit", href: "/racing-circuit", icon: Video },
  { name: "Digital Rodeo", href: "/digital-rodeo", icon: Coins },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showWanted, setShowWanted] = useState(true)

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-background border-r transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {!isCollapsed && (
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="font-bold text-lg">WyoVerse</span>
            </Link>
          )}

          <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8 p-0">
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    isCollapsed && "justify-center px-2",
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              )
            })}
          </nav>

          {/* Wanted Sidebar Section */}
          {!isCollapsed && showWanted && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2 px-3">
                <h3 className="text-sm font-semibold text-muted-foreground">FRONTIER BOARD</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowWanted(false)} className="h-6 w-6 p-0">
                  <ChevronLeft className="h-3 w-3" />
                </Button>
              </div>
              <div className="scale-75 origin-top-left transform">
                <WantedSidebar />
              </div>
            </div>
          )}

          {!isCollapsed && !showWanted && (
            <div className="mt-6">
              <Button variant="outline" size="sm" onClick={() => setShowWanted(true)} className="w-full">
                Show Wanted Board
              </Button>
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        {!isCollapsed && (
          <div className="border-t p-4">
            <div className="text-xs text-muted-foreground text-center">
              <div className="font-semibold">WyoVerse Pioneer</div>
              <div>Digital Frontier • Est. 1880</div>
              <div className="mt-1 text-green-600">💚 Social Good Enabled</div>
              <div className="mt-1 text-blue-600">📊 Real-Time Data</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
