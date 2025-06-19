"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, Settings } from "lucide-react"
import { UserNav } from "@/components/user-nav"
import { MarketMoodIndicator } from "@/components/market-mood-indicator"
import { useMarketStore } from "@/lib/stores/market-store"

export function Header() {
  const { marketMood } = useMarketStore()

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="hidden md:flex">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search WyoVerse..." className="pl-8 w-full" />
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <MarketMoodIndicator mood={marketMood} />
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <UserNav />
        </div>
      </div>
    </header>
  )
}
