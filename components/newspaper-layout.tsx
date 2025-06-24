"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { MarketMoodIndicator } from "@/components/market-mood-indicator"
import { useMarketStore } from "@/lib/stores/market-store"
import Link from "next/link"
import { ArrowRight, Newspaper } from "lucide-react"

interface NewspaperLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export function NewspaperLayout({ children, title, subtitle }: NewspaperLayoutProps) {
  const pathname = usePathname()
  const { marketMood } = useMarketStore()
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    )
  }, [])

  // Generate a unique "volume" and "issue" number based on the pathname
  const getVolumeAndIssue = () => {
    const pathHash = pathname.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

    const volume = Math.max(1, (pathHash % 10) + 1)
    const issue = Math.max(1, ((pathHash * 13) % 100) + 1)

    return { volume, issue }
  }

  const { volume, issue } = getVolumeAndIssue()

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6 newspaper-bg">
        <div className="max-w-6xl mx-auto bg-[#f8f3e3] text-black">
          {/* Newspaper Header */}
          <div className="border-b-4 border-black pb-4 mb-6">
            <div className="text-center relative py-4">
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="w-1/2 h-[1px] bg-black"></div>
              </div>
              <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-black"></div>
              <div className="relative">
                <p className="text-sm font-serif mb-2">ESTABLISHED 1868 • TERRITORY OF WYOMING</p>
                <h1 className="text-5xl md:text-7xl font-bold font-serif tracking-tight uppercase">
                  THE WYOVERSE PIONEER
                </h1>
                <div className="flex justify-between items-center mt-2 px-8">
                  <p className="text-sm font-serif">
                    Vol. {volume}, No. {issue}
                  </p>
                  <p className="text-sm font-serif">{currentDate}</p>
                  <p className="text-sm font-serif">PRICE: 5¢</p>
                </div>
              </div>
            </div>
          </div>

          {/* Page Title */}
          <div className="border-4 border-black p-1 mb-6">
            <div className="border-2 border-black p-4">
              <div className="text-center mb-4">
                <h2 className="text-4xl font-bold font-serif uppercase mb-1">{title}</h2>
                {subtitle && <h3 className="text-xl font-serif italic">{subtitle}</h3>}
              </div>

              {/* Market Mood Indicator */}
              <div className="flex justify-end mb-4">
                <div className="border-2 border-black p-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-serif">Market Mood:</span>
                    <MarketMoodIndicator mood={marketMood} />
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="border-t-2 border-black pt-4">{children}</div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-4 border-black pt-4 text-center">
            <div className="flex justify-between items-center px-4 mb-2">
              <Link href="/" className="font-serif text-sm hover:underline flex items-center gap-1">
                <Newspaper className="h-4 w-4" />
                Front Page
              </Link>
              <p className="font-serif text-sm">WYOVERSE PIONEER PRESS • TERRITORY OF WYOMING</p>
              <Link href="/classifieds" className="font-serif text-sm hover:underline flex items-center gap-1">
                Classifieds
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
