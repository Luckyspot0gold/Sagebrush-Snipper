"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export const dashboardConfig = {
  navigation: [
    { name: "Home", href: "/", icon: "🏠" },
    { name: "Games", href: "/games", icon: "🎮" },
    { name: "Boxing Arena", href: "/boxing-arena", icon: "🥊" },
    { name: "Racing Circuit", href: "/racing-circuit", icon: "🏁" },
    { name: "Bar Keep Bill", href: "/saloon", icon: "🤠" },
    { name: "Mining", href: "/mining", icon: "⛏️" },
    { name: "Land Deeds", href: "/land-deeds", icon: "📜" },
    { name: "Stones & NFTs", href: "/stones", icon: "💎" },
    { name: "Market", href: "/market", icon: "📈" },
    { name: "Community", href: "/community", icon: "👥" },
    { name: "Education", href: "/education", icon: "📚" },
    { name: "Tourism", href: "/tourism", icon: "🗺️" },
    { name: "Energy", href: "/energy", icon: "⚡" },
    { name: "Business", href: "/business", icon: "💼" },
    { name: "Sports", href: "/sports", icon: "⚽" },
    { name: "Lifestyle", href: "/lifestyle", icon: "🌟" },
    { name: "Parks", href: "/parks", icon: "🌲" },
    { name: "Native History", href: "/native-history", icon: "🏺" },
    { name: "Wyoming Records", href: "/wyoming-records", icon: "📋" },
    { name: "Wyoming Pyramid", href: "/wyoming-pyramid", icon: "🔺" },
    { name: "Patents", href: "/patents", icon: "💡" },
    { name: "OSHA", href: "/osha", icon: "🦺" },
    { name: "Property", href: "/property", icon: "🏘️" },
    { name: "Classifieds", href: "/classifieds", icon: "📰" },
    { name: "Calendar", href: "/calendar", icon: "📅" },
    { name: "Store", href: "/store", icon: "🛒" },
    { name: "Explore", href: "/explore", icon: "🧭" },
    { name: "System Status", href: "/system-status", icon: "🔧" },
  ],
  quickActions: [
    { name: "Boxing Arena", href: "/boxing-arena", icon: "🥊", color: "bg-red-500" },
    { name: "Bill's Saloon", href: "/saloon", icon: "🤠", color: "bg-amber-600" },
    { name: "Mining Hub", href: "/mining", icon: "⛏️", color: "bg-gray-600" },
  ],
}

export function DashboardLayout({ children, title, description }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-amber-200 bg-white/80 backdrop-blur-sm px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              {title && <h1 className="text-xl font-bold text-gray-900">{title}</h1>}
              {description && <p className="text-sm text-gray-600">{description}</p>}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm font-mono text-gray-600">{currentTime.toLocaleTimeString()}</div>
            <div className="text-sm text-gray-600">{currentTime.toLocaleDateString()}</div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
