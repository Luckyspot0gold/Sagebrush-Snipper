"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Settings, HelpCircle, Trophy, Share2, BookOpen, Gift, TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { NavItem } from "@/components/nav-item"

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "User Mgmt", href: "/users", icon: Users },
  { title: "Settings", href: "/settings", icon: Settings },
  { title: "Help", href: "/help", icon: HelpCircle },
  { title: "Onboarding", href: "/onboarding", icon: Trophy },
  { title: "Share Wins", href: "/social-sharing", icon: Share2 },
  { title: "Frontier Stories", href: "/frontier-stories", icon: BookOpen },
  { title: "Daily Rewards", href: "/daily-rewards", icon: Gift },
  { title: "Market Pulse", href: "/market-pulse", icon: TrendingUp },
]

interface SidebarProps {
  isCollapsed?: boolean
}

export function Sidebar({ isCollapsed = false }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={cn("border-r bg-background h-screen", isCollapsed ? "w-16" : "w-64")}>
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">CryptoClashers</span>
        </Link>
      </div>
      <nav className="py-4 px-2 space-y-1">
        {navItems.map((item) => (
          <NavItem key={item.href} href={item.href} icon={item.icon} title={item.title} isCollapsed={isCollapsed} />
        ))}
      </nav>
    </aside>
  )
}
