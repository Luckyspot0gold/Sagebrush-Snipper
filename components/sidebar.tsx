"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Gamepad2,
  TrendingUp,
  Palette,
  Users,
  Calendar,
  ShoppingBag,
  MapPin,
  Zap,
  GraduationCap,
  Building,
  Mountain,
  Pickaxe,
  Shield,
  TreePine,
  FileText,
  Plane,
  Trophy,
  Gem,
  Store,
  Activity,
  Heart,
  BookOpen,
  Pyramid,
  Archive,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Games", href: "/games", icon: Gamepad2 },
  { name: "Market", href: "/market", icon: TrendingUp },
  { name: "Art Gallery", href: "/art", icon: Palette },
  { name: "Community", href: "/community", icon: Users },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Classifieds", href: "/classifieds", icon: ShoppingBag },
  { name: "Explore", href: "/explore", icon: MapPin },
  { name: "Energy", href: "/energy", icon: Zap },
  { name: "Education", href: "/education", icon: GraduationCap },
  { name: "Business", href: "/business", icon: Building },
  { name: "Land Deeds", href: "/land-deeds", icon: Mountain },
  { name: "Mining", href: "/mining", icon: Pickaxe },
  { name: "OSHA", href: "/osha", icon: Shield },
  { name: "Parks", href: "/parks", icon: TreePine },
  { name: "Patents", href: "/patents", icon: FileText },
  { name: "Tourism", href: "/tourism", icon: Plane },
  { name: "Sports", href: "/sports", icon: Trophy },
  { name: "Stones & NFTs", href: "/stones", icon: Gem },
  { name: "Store", href: "/store", icon: Store },
  { name: "System Status", href: "/system-status", icon: Activity },
  { name: "Lifestyle", href: "/lifestyle", icon: Heart },
  { name: "Native History", href: "/native-history", icon: BookOpen },
  { name: "Wyoming Pyramid", href: "/wyoming-pyramid", icon: Pyramid },
  { name: "Wyoming Records", href: "/wyoming-records", icon: Archive },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={`${isCollapsed ? "w-16" : "w-64"} transition-all duration-300 bg-amber-100 border-r-2 border-black`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b-2 border-black">
          <div className="flex items-center justify-between">
            {!isCollapsed && <div className="text-lg font-bold font-serif">WYOVERSE</div>}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hover:bg-amber-200"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 p-2">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start hover:bg-amber-200 ${
                      isActive ? "bg-amber-300 text-black" : ""
                    } ${isCollapsed ? "px-2" : "px-3"}`}
                    size="sm"
                  >
                    <Icon className="h-4 w-4" />
                    {!isCollapsed && <span className="ml-2 text-xs">{item.name}</span>}
                  </Button>
                </Link>
              )
            })}
          </div>
        </ScrollArea>

        {/* Wanted Board Section */}
        {!isCollapsed && (
          <div className="p-4 border-t-2 border-black">
            <Card className="border-2 border-black bg-red-100">
              <CardContent className="p-3">
                <div className="text-center">
                  <h4 className="font-bold text-sm mb-2">⚠️ WANTED ⚠️</h4>
                  <img
                    src="/images/wyoversestonewanted.png"
                    alt="Wanted Poster"
                    className="w-full h-20 object-cover border border-black mb-2"
                  />
                  <div className="text-xs">
                    <div className="font-bold">DIGITAL OUTLAWS</div>
                    <div>Reward: 1000 WYO Tokens</div>
                    <Badge className="mt-1 bg-red-500 text-white text-xs">ACTIVE</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Social Good Indicator */}
        {!isCollapsed && (
          <div className="p-4 border-t border-black">
            <div className="text-center">
              <Badge className="bg-green-500 text-white text-xs">💚 Social Good Active</Badge>
              <div className="text-xs mt-1 text-gray-600">$1,247.85 donated</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
