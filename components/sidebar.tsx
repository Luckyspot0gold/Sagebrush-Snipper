"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Compass,
  Home,
  LandPlot,
  MessageSquare,
  Pickaxe,
  Scroll,
  Store,
  Users,
  Palette,
  GraduationCap,
  HardHat,
  Wind,
  LinkIcon,
  Gem,
  FileText,
  MapPin,
  Mountain,
  LineChart,
  Gamepad2,
  Coins,
  Landmark,
  TrendingUp,
  Video,
} from "lucide-react"

const sidebarItems = [
  { name: "WyoVerse Pioneer", href: "/", icon: Home },
  { name: "Market", href: "/market", icon: BarChart3 },
  { name: "Finance Hub", href: "/finance", icon: LineChart },
  { name: "Trading Desk", href: "/trading", icon: TrendingUp },
  { name: "Land Deeds", href: "/land-deeds", icon: LandPlot },
  { name: "Mining", href: "/mining", icon: Pickaxe },
  { name: "Digital Rodeo", href: "/digital-rodeo", icon: Coins },
  { name: "Games", href: "/games", icon: Gamepad2 },
  { name: "Explore", href: "/explore", icon: Compass },
  { name: "Saloon", href: "/saloon", icon: MessageSquare },
  { name: "Patents", href: "/patents", icon: Scroll },
  { name: "Store", href: "/store", icon: Store },
  { name: "Community", href: "/community", icon: Users },
  { name: "Art Gallery", href: "/art", icon: Palette },
  { name: "Education", href: "/education", icon: GraduationCap },
  { name: "Wyoming Records", href: "/wyoming-records", icon: BarChart3 },
  { name: "Wyoming Pyramid", href: "/wyoming-pyramid", icon: Landmark },
  { name: "OSHA VR Training", href: "/osha", icon: HardHat },
  { name: "Energy Markets", href: "/energy", icon: Wind },
  { name: "Connect Property", href: "/property", icon: LinkIcon },
  { name: "Stones & NFTs", href: "/stones", icon: Gem },
  { name: "Classifieds", href: "/classifieds", icon: FileText },
  { name: "Tourism", href: "/tourism", icon: MapPin },
  { name: "Native History", href: "/native-history", icon: Scroll },
  { name: "Parks & Recreation", href: "/parks", icon: Mountain },
  { name: "Crypto & Stocks", href: "/finance", icon: LineChart },
  { name: "Live Streaming", href: "/streaming", icon: Video },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-background md:block w-64">
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">WyoVerse</span>
        </Link>
      </div>
      <div className="py-4 h-[calc(100vh-4rem)] overflow-auto">
        <nav className="grid gap-1 px-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
