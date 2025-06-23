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
  Calendar,
  Newspaper,
} from "lucide-react"

const sidebarSections = [
  {
    title: "Main",
    items: [
      { name: "WyoVerse Pioneer", href: "/", icon: Home },
      { name: "Calendar", href: "/calendar", icon: Calendar },
    ],
  },
  {
    title: "Business",
    items: [
      { name: "Business Section", href: "/business", icon: Newspaper },
      { name: "Finance Hub", href: "/finance", icon: LineChart },
      { name: "Trading Desk", href: "/trading", icon: TrendingUp },
      { name: "Market Data", href: "/market", icon: BarChart3 },
      { name: "Energy Markets", href: "/energy", icon: Wind },
    ],
  },
  {
    title: "Sports & Games",
    items: [
      { name: "Sports Section", href: "/sports", icon: Gamepad2 },
      { name: "Games Portal", href: "/games", icon: Gamepad2 },
      { name: "Live Streaming", href: "/streaming", icon: Video },
      { name: "Boxing Arena", href: "/boxing-arena", icon: Users },
      { name: "Digital Rodeo", href: "/digital-rodeo", icon: Coins },
    ],
  },
  {
    title: "Lifestyle",
    items: [
      { name: "Lifestyle Section", href: "/lifestyle", icon: Mountain },
      { name: "Tourism", href: "/tourism", icon: MapPin },
      { name: "Parks & Recreation", href: "/parks", icon: Mountain },
      { name: "Art Gallery", href: "/art", icon: Palette },
      { name: "Education", href: "/education", icon: GraduationCap },
      { name: "Native History", href: "/native-history", icon: Scroll },
    ],
  },
  {
    title: "Territory",
    items: [
      { name: "Land Deeds", href: "/land-deeds", icon: LandPlot },
      { name: "Wyoming Pyramid", href: "/wyoming-pyramid", icon: Landmark },
      { name: "Wyoming Records", href: "/wyoming-records", icon: BarChart3 },
      { name: "Mining Operations", href: "/mining", icon: Pickaxe },
      { name: "Explore Territory", href: "/explore", icon: Compass },
    ],
  },
  {
    title: "Community",
    items: [
      { name: "Classifieds", href: "/classifieds", icon: FileText },
      { name: "Community Hub", href: "/community", icon: Users },
      { name: "Saloon", href: "/saloon", icon: MessageSquare },
      { name: "General Store", href: "/store", icon: Store },
      { name: "Patent Office", href: "/patents", icon: Scroll },
    ],
  },
  {
    title: "Assets",
    items: [
      { name: "Stones & NFTs", href: "/stones", icon: Gem },
      { name: "Connect Property", href: "/property", icon: LinkIcon },
      { name: "OSHA Training", href: "/osha", icon: HardHat },
    ],
  },
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
        <nav className="space-y-4 px-2">
          {sidebarSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                      pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}
