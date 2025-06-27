"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Gamepad2,
  Store,
  MapPin,
  Calendar,
  Users,
  BookOpen,
  Zap,
  Briefcase,
  GraduationCap,
  Heart,
  Shield,
  TreePine,
  FileText,
  Building,
  Trophy,
  Gem,
  Camera,
  Pyramid,
  Archive,
  Activity,
  Palette,
  TrendingUp,
  Pickaxe,
  Landmark,
  Search,
} from "lucide-react"

const navigationItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/games", label: "Games", icon: Gamepad2 },
  { href: "/store", label: "Store", icon: Store },
  { href: "/explore", label: "Explore", icon: MapPin },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/community", label: "Community", icon: Users },
  { href: "/education", label: "Education", icon: GraduationCap },
  { href: "/energy", label: "Energy", icon: Zap },
  { href: "/mining", label: "Mining", icon: Pickaxe },
  { href: "/business", label: "Business", icon: Briefcase },
  { href: "/lifestyle", label: "Lifestyle", icon: Heart },
  { href: "/sports", label: "Sports", icon: Trophy },
  { href: "/tourism", label: "Tourism", icon: Camera },
  { href: "/parks", label: "Parks", icon: TreePine },
  { href: "/osha", label: "OSHA", icon: Shield },
  { href: "/patents", label: "Patents", icon: FileText },
  { href: "/property", label: "Property", icon: Building },
  { href: "/stones", label: "Stones & NFTs", icon: Gem },
  { href: "/land-deeds", label: "Land Deeds", icon: Landmark },
  { href: "/classifieds", label: "Classifieds", icon: Search },
  { href: "/native-history", label: "Native History", icon: BookOpen },
  { href: "/wyoming-pyramid", label: "Wyoming Pyramid", icon: Pyramid },
  { href: "/wyoming-records", label: "Wyoming Records", icon: Archive },
  { href: "/system-status", label: "System Status", icon: Activity },
  { href: "/art", label: "Art Gallery", icon: Palette },
  { href: "/market", label: "Market", icon: TrendingUp },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-amber-50 to-yellow-100 border-r border-amber-200 transition-all duration-300 z-40 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-amber-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && <h2 className="text-lg font-bold text-amber-900">WyoVerse</h2>}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-amber-700 hover:text-amber-900 hover:bg-amber-200"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-2">
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start text-left ${
                      isActive
                        ? "bg-amber-600 text-white hover:bg-amber-700"
                        : "text-amber-700 hover:text-amber-900 hover:bg-amber-200"
                    } ${isCollapsed ? "px-2" : "px-3"}`}
                    size="sm"
                  >
                    <Icon className={`h-4 w-4 ${isCollapsed ? "" : "mr-2"}`} />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Wanted Board */}
        {!isCollapsed && (
          <div className="p-4 border-t border-amber-200">
            <Card className="bg-gradient-to-br from-red-100 to-orange-100 border-red-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-red-800 flex items-center gap-2">
                  🤠 WANTED BOARD
                  <Badge variant="destructive" className="text-xs">
                    $10K Reward
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xs text-red-700 space-y-1">
                  <div className="font-semibold">Stone "The Mechanic"</div>
                  <div>Last seen: Cyberpunk Garage</div>
                  <div>Crime: Excessive Bull Riding</div>
                  <div className="text-red-600 font-medium">Approach with caution - armed with wrenches</div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Social Good Indicator */}
        {!isCollapsed && (
          <div className="p-4 border-t border-amber-200">
            <div className="text-xs text-center text-amber-700">
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold">Social Good Active</span>
              </div>
              <div>💚 $2,847 donated today</div>
              <div>🌍 1,234 lives impacted</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
