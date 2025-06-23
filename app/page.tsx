"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CryptoBoxing } from "@/components/crypto-boxing"
import { CasinoProvider } from "@/components/casino-provider"
import { LandDeeds } from "@/components/land-deeds"
import { Education } from "@/components/education"
import { TradingDashboard } from "@/components/trading-dashboard"
import { WyomingCryptoSniper } from "@/components/wyoming-crypto-sniper"

export default function WyoVerse() {
  const [ageVerified, setAgeVerified] = useState(false)
  const [activeModule, setActiveModule] = useState("trading")

  if (!ageVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-24 h-24 bg-amber-600 rounded-full flex items-center justify-center">
              <span className="text-3xl">🏔️</span>
            </div>
            <CardTitle className="text-2xl font-bold text-amber-800">Welcome to WyoVerse</CardTitle>
            <p className="text-amber-600">Wyoming's Premier Trading & Gaming Metaverse</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-sm text-gray-600">
              <p>Age verification required for trading & casino features</p>
              <p className="mt-2">Educational content available for all ages</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setAgeVerified(true)} className="flex-1 bg-amber-600 hover:bg-amber-700">
                I'm 18+ (Full Access)
              </Button>
              <Button
                onClick={() => {
                  setAgeVerified(true)
                  setActiveModule("education")
                }}
                variant="outline"
                className="flex-1"
              >
                Educational Mode
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <CasinoProvider>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-xl">🏔️</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-amber-800">WyoVerse</h1>
                  <p className="text-sm text-amber-600">Frontier Trading & Gaming Platform</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  🪙 1,000 TONKA
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  🏞️ 0 Land Deeds
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  📈 $10,000 Portfolio
                </Badge>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Tabs value={activeModule} onValueChange={setActiveModule} className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="trading" className="flex items-center gap-2">
                📈 Trading
              </TabsTrigger>
              <TabsTrigger value="sniper" className="flex items-center gap-2">
                🎯 Sniper
              </TabsTrigger>
              <TabsTrigger value="boxing" className="flex items-center gap-2">
                🥊 CryptoClashers
              </TabsTrigger>
              <TabsTrigger value="casino" className="flex items-center gap-2">
                🎰 Casino
              </TabsTrigger>
              <TabsTrigger value="land" className="flex items-center gap-2">
                🏞️ Land Deeds
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center gap-2">
                📚 Education
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trading">
              <TradingDashboard />
            </TabsContent>

            <TabsContent value="sniper">
              <WyomingCryptoSniper />
            </TabsContent>

            <TabsContent value="boxing">
              <CryptoBoxing />
            </TabsContent>

            <TabsContent value="casino">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🃏 Blackjack
                      <Badge variant="secondary">Live</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">Classic 21 with TONKA token betting</p>
                    <Button className="w-full">Play Now</Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🎰 Slots
                      <Badge variant="secondary">Hot</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">Wyoming-themed slot machines</p>
                    <Button className="w-full">Spin Reels</Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🎲 Craps
                      <Badge variant="outline">Coming Soon</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">Roll the dice in the digital frontier</p>
                    <Button className="w-full" disabled>
                      Coming Soon
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="land">
              <LandDeeds />
            </TabsContent>

            <TabsContent value="education">
              <Education />
            </TabsContent>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-amber-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div>
                <h3 className="font-bold text-amber-800 mb-4">WyoVerse</h3>
                <p className="text-sm text-gray-600">Wyoming's premier blockchain trading & gaming metaverse</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Trading</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Crypto Sniper</li>
                  <li>AI Strategies</li>
                  <li>Portfolio Management</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Gaming</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>CryptoClashers</li>
                  <li>Casino Games</li>
                  <li>Horse Racing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Education</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Blockchain Bounties</li>
                  <li>Ranch MBA</li>
                  <li>NFT Diplomas</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>COPPA Compliant</li>
                  <li>Wyoming DAO LLC</li>
                  <li>SEC Registered</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-amber-200 mt-8 pt-8 text-center text-sm text-gray-600">
              <p>© 2024 WyoVerse. Built on Solana. Anchored in Wyoming. Trading powered by Frontier-Trader.</p>
            </div>
          </div>
        </footer>
      </div>
    </CasinoProvider>
  )
}
