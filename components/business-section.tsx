"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { TrendingUp, LineChart, Coins, BarChart3, ArrowRight } from "lucide-react"

export function BusinessSection() {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="newspaper-article">
        <div className="newspaper-article-inner">
          <div className="text-center border-b-4 border-black pb-4 mb-6">
            <h1 className="text-5xl font-bold font-serif uppercase">BUSINESS SECTION</h1>
            <p className="text-lg font-serif italic">Finance, Trading & Market Intelligence</p>
            <div className="flex justify-center mt-2">
              <Badge className="bg-green-100 text-green-800 font-serif">Markets Open • Live Data</Badge>
            </div>
          </div>

          {/* Quick Access Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Link href="/finance" className="group">
              <div className="border-4 border-black p-1 hover:shadow-lg transition-shadow">
                <div className="border-2 border-black p-4 bg-white group-hover:bg-gray-50">
                  <LineChart className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-serif font-bold text-center">FINANCE HUB</h3>
                  <p className="text-xs font-serif text-center">Portfolio & Analytics</p>
                </div>
              </div>
            </Link>

            <Link href="/trading" className="group">
              <div className="border-4 border-black p-1 hover:shadow-lg transition-shadow">
                <div className="border-2 border-black p-4 bg-white group-hover:bg-gray-50">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-serif font-bold text-center">TRADING DESK</h3>
                  <p className="text-xs font-serif text-center">Advanced Charts</p>
                </div>
              </div>
            </Link>

            <Link href="/market" className="group">
              <div className="border-4 border-black p-1 hover:shadow-lg transition-shadow">
                <div className="border-2 border-black p-4 bg-white group-hover:bg-gray-50">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-serif font-bold text-center">MARKET DATA</h3>
                  <p className="text-xs font-serif text-center">Live Prices</p>
                </div>
              </div>
            </Link>

            <Link href="/digital-rodeo" className="group">
              <div className="border-4 border-black p-1 hover:shadow-lg transition-shadow">
                <div className="border-2 border-black p-4 bg-white group-hover:bg-gray-50">
                  <Coins className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-serif font-bold text-center">CRYPTO RODEO</h3>
                  <p className="text-xs font-serif text-center">Market Volatility</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Business Stories */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <div className="newspaper-article">
            <div className="newspaper-article-inner">
              <h2 className="text-3xl font-bold font-serif mb-4">MARKET ANALYSIS</h2>
              <div className="space-y-4">
                <div className="border-2 border-black p-4">
                  <h3 className="text-xl font-bold font-serif mb-2">Bitcoin Bull Run Continues</h3>
                  <p className="font-serif mb-3">
                    Cryptocurrency markets show strong momentum as institutional adoption increases. Our arena battles
                    reflect this bullish sentiment with Victory Bull dominating recent matches.
                  </p>
                  <div className="flex justify-between items-center">
                    <Badge className="bg-green-100 text-green-800">+15.2% This Week</Badge>
                    <Link href="/finance">
                      <Button variant="link" className="p-0 font-serif">
                        View Portfolio <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="border-2 border-black p-4">
                  <h3 className="text-xl font-bold font-serif mb-2">Wyoming Energy Sector Booms</h3>
                  <p className="font-serif mb-3">
                    Wind energy production reaches record highs, driving economic growth across the territory. Digital
                    energy markets show unprecedented activity.
                  </p>
                  <Link href="/energy">
                    <Button variant="link" className="p-0 font-serif">
                      Energy Markets <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <div className="newspaper-article">
            <div className="newspaper-article-inner">
              <h2 className="text-2xl font-bold font-serif mb-4">QUICK STATS</h2>
              <div className="space-y-3">
                <div className="border border-black p-3">
                  <h4 className="font-serif font-bold">Market Cap</h4>
                  <p className="text-2xl font-bold">$2.1T</p>
                  <p className="text-sm text-green-600">+5.2%</p>
                </div>
                <div className="border border-black p-3">
                  <h4 className="font-serif font-bold">Active Traders</h4>
                  <p className="text-2xl font-bold">15,420</p>
                  <p className="text-sm text-blue-600">Online Now</p>
                </div>
                <div className="border border-black p-3">
                  <h4 className="font-serif font-bold">Arena Battles</h4>
                  <p className="text-2xl font-bold">847</p>
                  <p className="text-sm text-purple-600">Today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
