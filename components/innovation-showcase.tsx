"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, Database, CreditCard, Network, Gamepad2, TrendingUp, Shield, Globe } from "lucide-react"

export function InnovationShowcase() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Innovation Header */}
      <div className="text-center border-4 border-black p-6 bg-amber-50">
        <h1 className="text-4xl font-bold font-serif mb-4">🚀 FRONTIER INNOVATION</h1>
        <p className="text-xl font-serif italic">Where 1880s Pioneer Spirit Meets 2025 Blockchain Technology</p>
        <div className="mt-4 text-lg font-serif">
          <strong>Frontier Gaming Meets Avalanche Blockchain</strong> - The First Multi-Domain Metaverse with Authentic
          Western Theming
        </div>
      </div>

      {/* Tech Stack Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-4 border-black">
          <CardHeader className="bg-blue-100 border-b-2 border-black">
            <CardTitle className="flex items-center gap-2 font-serif">
              <Zap className="h-5 w-5" />
              Next.js 14
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ul className="text-sm font-serif space-y-1">
              <li>• App Router Architecture</li>
              <li>• Server Components</li>
              <li>• Real-time Updates</li>
              <li>• Multi-domain Support</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-4 border-black">
          <CardHeader className="bg-green-100 border-b-2 border-black">
            <CardTitle className="flex items-center gap-2 font-serif">
              <Database className="h-5 w-5" />
              Supabase Postgres
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ul className="text-sm font-serif space-y-1">
              <li>• Real-time Database</li>
              <li>• Row Level Security</li>
              <li>• Cross-game Progression</li>
              <li>• UUID Scalability</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-4 border-black">
          <CardHeader className="bg-purple-100 border-b-2 border-black">
            <CardTitle className="flex items-center gap-2 font-serif">
              <CreditCard className="h-5 w-5" />
              Coinbase Commerce
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ul className="text-sm font-serif space-y-1">
              <li>• Crypto Payments</li>
              <li>• Multi-token Support</li>
              <li>• Instant Settlement</li>
              <li>• Revenue Tracking</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-4 border-black">
          <CardHeader className="bg-red-100 border-b-2 border-black">
            <CardTitle className="flex items-center gap-2 font-serif">
              <Network className="h-5 w-5" />
              Avalanche RPC
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ul className="text-sm font-serif space-y-1">
              <li>• Fast Transactions</li>
              <li>• Low Gas Fees</li>
              <li>• DeFi Integration</li>
              <li>• Smart Contracts</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Innovation Features */}
      <div className="border-4 border-black p-6 bg-yellow-50">
        <h2 className="text-3xl font-bold font-serif text-center mb-6">🎯 BREAKTHROUGH INNOVATIONS</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Gamepad2 className="h-6 w-6 mt-1 text-blue-600" />
              <div>
                <h3 className="font-serif font-bold">Multi-Domain Gaming Ecosystem</h3>
                <p className="text-sm font-serif">
                  First metaverse spanning multiple specialized domains with unified progression
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <TrendingUp className="h-6 w-6 mt-1 text-green-600" />
              <div>
                <h3 className="font-serif font-bold">Social Capital → Land Value</h3>
                <p className="text-sm font-serif">
                  Revolutionary system converting social influence into tangible game assets
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 mt-1 text-purple-600" />
              <div>
                <h3 className="font-serif font-bold">No-NFT Stigma Solution</h3>
                <p className="text-sm font-serif">
                  "Social Deeds" replace traditional NFTs with real utility and value
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Globe className="h-6 w-6 mt-1 text-orange-600" />
              <div>
                <h3 className="font-serif font-bold">Authentic 1880s Theming</h3>
                <p className="text-sm font-serif">
                  Complete immersion with period-accurate newspaper interface and frontier aesthetics
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Database className="h-6 w-6 mt-1 text-indigo-600" />
              <div>
                <h3 className="font-serif font-bold">Cross-Platform Progression</h3>
                <p className="text-sm font-serif">Unified player profiles and achievements across all gaming domains</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CreditCard className="h-6 w-6 mt-1 text-red-600" />
              <div>
                <h3 className="font-serif font-bold">Multiple Revenue Streams</h3>
                <p className="text-sm font-serif">
                  Sustainable tokenomics with ads, staking, trading, and affiliate commissions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Deployments */}
      <div className="border-4 border-black p-6 bg-green-50">
        <h2 className="text-3xl font-bold font-serif text-center mb-6">🌐 LIVE DEPLOYMENTS</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-2 border-black">
            <CardHeader className="bg-blue-900 text-white">
              <CardTitle className="font-serif text-center">CryptoClashers.games</CardTitle>
            </CardHeader>
            <CardContent className="p-4 text-center">
              <p className="font-serif mb-3">Boxing Arena & Gaming Hub</p>
              <Badge variant="default">🥊 Live Combat</Badge>
            </CardContent>
          </Card>

          <Card className="border-2 border-black">
            <CardHeader className="bg-green-900 text-white">
              <CardTitle className="font-serif text-center">StoneYard.cash</CardTitle>
            </CardHeader>
            <CardContent className="p-4 text-center">
              <p className="font-serif mb-3">Trading Hub & Main Base</p>
              <Badge variant="default">💰 Live Trading</Badge>
            </CardContent>
          </Card>

          <Card className="border-2 border-black">
            <CardHeader className="bg-purple-900 text-white">
              <CardTitle className="font-serif text-center">WyoVerse.com</CardTitle>
            </CardHeader>
            <CardContent className="p-4 text-center">
              <p className="font-serif mb-3">Complete Frontier Experience</p>
              <Badge variant="default">🤠 Full Ecosystem</Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center border-4 border-black p-6 bg-red-100">
        <h2 className="text-2xl font-bold font-serif mb-4">🏆 READY FOR THE WORLD'S BIGGEST HACKATHON</h2>
        <p className="font-serif mb-4">
          Experience the future of frontier gaming where blockchain meets authentic western heritage
        </p>
        <div className="flex justify-center gap-4">
          <Button className="frontier-button font-serif">🎮 Play Now</Button>
          <Button variant="outline" className="border-black font-serif">
            📊 View Demo
          </Button>
        </div>
      </div>
    </div>
  )
}
