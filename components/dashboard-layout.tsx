"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Sidebar } from "./sidebar"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
}

interface NavItem {
  name: string
  href: string
  icon: string
}

export const dashboardConfig = {
  navigation: [
    { name: "Home", href: "/", icon: "Home" },
    { name: "Games", href: "/games", icon: "Gamepad2" },
    { name: "Boxing Arena", href: "/boxing-arena", icon: "Zap" },
    { name: "Racing Circuit", href: "/racing-circuit", icon: "Car" },
    { name: "Bill's Saloon", href: "/saloon", icon: "Beer" },
    { name: "Mining", href: "/mining", icon: "Pickaxe" },
    { name: "Land Deeds", href: "/land-deeds", icon: "Map" },
    { name: "Store", href: "/store", icon: "ShoppingCart" },
    { name: "Market", href: "/market", icon: "TrendingUp" },
    { name: "Community", href: "/community", icon: "Users" },
    { name: "Education", href: "/education", icon: "GraduationCap" },
    { name: "Tourism", href: "/tourism", icon: "Camera" },
    { name: "Energy", href: "/energy", icon: "Zap" },
    { name: "Business", href: "/business", icon: "Building" },
    { name: "Sports", href: "/sports", icon: "Trophy" },
    { name: "Lifestyle", href: "/lifestyle", icon: "Heart" },
    { name: "Classifieds", href: "/classifieds", icon: "FileText" },
    { name: "Calendar", href: "/calendar", icon: "Calendar" },
    { name: "Parks", href: "/parks", icon: "Trees" },
    { name: "Native History", href: "/native-history", icon: "Feather" },
    { name: "Wyoming Pyramid", href: "/wyoming-pyramid", icon: "Triangle" },
    { name: "Wyoming Records", href: "/wyoming-records", icon: "Archive" },
    { name: "Patents", href: "/patents", icon: "Lightbulb" },
    { name: "Property", href: "/property", icon: "Home" },
    { name: "Stones & NFTs", href: "/stones", icon: "Gem" },
    { name: "OSHA Training", href: "/osha", icon: "Shield" },
    { name: "System Status", href: "/system-status", icon: "Activity" },
  ],
}

export function DashboardLayout({ children, title = "WyoVerse" }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:inset-0`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="lg:pl-80">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-amber-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <h1 className="text-xl font-bold text-amber-900">{title}</h1>
            </div>
            <div className="flex flex-1 justify-end items-center">
              <div className="text-sm text-amber-700 font-mono">
                {currentTime.toLocaleString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
