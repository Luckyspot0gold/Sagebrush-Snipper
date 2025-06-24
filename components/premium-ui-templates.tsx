"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, DollarSign, MapPin, Zap, Crown } from "lucide-react"

interface MarketData {
  symbol: string
  price: number
  change: number
  volume: string
}

interface LandParcel {
  id: string
  location: string
  price: number
  demand: "high" | "medium" | "low"
  owner?: string
}

export function PremiumDashboard() {
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [landParcels, setLandParcels] = useState<LandParcel[]>([])
  const [billWisdom, setBillWisdom] = useState("")

  useEffect(() => {
    // Mock data - replace with real API calls
    setMarketData([
      { symbol: "BTC", price: 43250, change: 2.3, volume: "1.2B" },
      { symbol: "ETH", price: 2650, change: -0.8, volume: "800M" },
      { symbol: "SOL", price: 98, change: 4.1, volume: "400M" },
      { symbol: "STONES", price: 0.45, change: 12.5, volume: "50M" },
      { symbol: "TATONKA", price: 1.23, change: -2.1, volume: "25M" },
    ])

    setLandParcels([
      { id: "1", location: "Frontier Valley", price: 2.5, demand: "high" },
      { id: "2", location: "Crypto Canyon", price: 1.8, demand: "medium" },
      { id: "3", location: "Digital Desert", price: 3.2, demand: "high" },
      { id: "4", location: "Blockchain Bluffs", price: 1.2, demand: "low" },
    ])

    setBillWisdom("The market's like a wild stallion today - full of energy and ready to run!")
  }, [])

  return (
    <div className="premium-saloon min-h-screen bg-gradient-to-b from-amber-50 to-yellow-100 p-6">
      {/* Header */}
      <div className="text-center mb-8 p-6 bg-gradient-to-r from-yellow-200 to-amber-200 rounded-lg border-4 border-amber-800 shadow-lg">
        <h1 className="text-4xl font-serif font-bold text-amber-900 mb-2">🥃 BAR KEEP BILL'S PREMIUM SALOON 🥃</h1>
        <p className="text-lg font-serif text-amber-800">EST. 1852 • WHISKEY & WISDOM</p>
        <Badge className="mt-2 bg-yellow-600 text-white font-serif">
          <Crown className="h-4 w-4 mr-1" />
          PREMIUM MEMBER
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Market Ticker */}
        <Card className="lg:col-span-3 border-4 border-amber-700 bg-amber-50">
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              Live Market Telegraph
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="ticker-tape overflow-hidden bg-amber-900 text-yellow-100 p-2 rounded">
              <div className="scrolling-ticker flex animate-scroll">
                {marketData.map((item, index) => (
                  <div key={index} className="ticker-item flex items-center gap-2 mx-4 whitespace-nowrap">
                    <span className="font-bold">{item.symbol}</span>
                    <span>${item.price.toLocaleString()}</span>
                    <span className={`flex items-center ${item.change > 0 ? "text-green-400" : "text-red-400"}`}>
                      {item.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {Math.abs(item.change)}%
                    </span>
                    <span className="text-xs">Vol: {item.volume}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Holster */}
        <Card className="border-4 border-amber-700 bg-gradient-to-b from-amber-100 to-yellow-200">
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              YER TREASURE CHEST
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700">$5,420.50</div>
                <div className="text-sm text-gray-600">Total Portfolio Value</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-serif">Bitcoin (46.1%)</span>
                  <span className="text-green-600">+3.2%</span>
                </div>
                <Progress value={46.1} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="font-serif">Ethereum (33.2%)</span>
                  <span className="text-red-600">-1.5%</span>
                </div>
                <Progress value={33.2} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="font-serif">Solana (20.7%)</span>
                  <span className="text-green-600">+5.7%</span>
                </div>
                <Progress value={20.7} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button className="bg-amber-700 hover:bg-amber-800 font-serif">Buy Land</Button>
                <Button className="bg-yellow-600 hover:bg-yellow-700 font-serif">Sell Nuggets</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Land Parcel Map */}
        <Card className="border-4 border-amber-700 bg-gradient-to-b from-green-100 to-emerald-200">
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              VIRTUAL LAND RUSH
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {landParcels.map((parcel) => (
                <div key={parcel.id} className="flex justify-between items-center p-2 bg-white rounded border">
                  <div>
                    <div className="font-serif font-semibold">{parcel.location}</div>
                    <div className="text-sm text-gray-600">{parcel.price} STONES</div>
                  </div>
                  <Badge
                    className={`font-serif ${
                      parcel.demand === "high"
                        ? "bg-red-500"
                        : parcel.demand === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  >
                    {parcel.demand.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-green-700 hover:bg-green-800 font-serif">View Full Map</Button>
          </CardContent>
        </Card>

        {/* Whiskey Wisdom Corner */}
        <Card className="border-4 border-amber-700 bg-gradient-to-b from-orange-100 to-amber-200">
          <CardHeader>
            <CardTitle className="font-serif text-center">🥃 WHISKEY WISDOM 🥃</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-6xl animate-bounce">🥃</div>
              <blockquote className="font-serif italic text-amber-900 text-lg">"{billWisdom}"</blockquote>
              <div className="text-sm text-amber-700 font-serif">- Bar Keep Bill</div>
              <Button className="bg-amber-700 hover:bg-amber-800 font-serif">Pour Another Wisdom</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Premium Features Showcase */}
      <Card className="mt-6 border-4 border-amber-700 bg-gradient-to-r from-purple-100 to-pink-100">
        <CardHeader>
          <CardTitle className="font-serif text-center text-2xl">🌟 PREMIUM EXCLUSIVE FEATURES 🌟</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signals" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="signals" className="font-serif">
                AI Signals
              </TabsTrigger>
              <TabsTrigger value="stress" className="font-serif">
                Stress Tests
              </TabsTrigger>
              <TabsTrigger value="deals" className="font-serif">
                Exclusive Deals
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signals" className="mt-4">
              <div className="space-y-3">
                <div className="p-3 bg-green-100 border border-green-300 rounded">
                  <div className="font-serif font-bold text-green-800">🎯 BUY SIGNAL</div>
                  <div className="text-sm">STONES showing strong accumulation pattern</div>
                  <div className="text-xs text-gray-600">Confidence: 78%</div>
                </div>
                <div className="p-3 bg-yellow-100 border border-yellow-300 rounded">
                  <div className="font-serif font-bold text-yellow-800">⚠️ WATCH SIGNAL</div>
                  <div className="text-sm">ETH approaching resistance level</div>
                  <div className="text-xs text-gray-600">Confidence: 65%</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stress" className="mt-4">
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">92%</div>
                  <div className="text-sm font-serif">Portfolio Resilience Score</div>
                </div>
                <Progress value={92} className="h-3" />
                <div className="text-xs text-gray-600 font-serif">
                  Your portfolio can withstand a 15% market downturn
                </div>
              </div>
            </TabsContent>

            <TabsContent value="deals" className="mt-4">
              <div className="space-y-3">
                <div className="p-3 bg-purple-100 border border-purple-300 rounded">
                  <div className="font-serif font-bold text-purple-800">🏆 VIP LAND DEAL</div>
                  <div className="text-sm">Premium parcel in Crypto Canyon - 20% off</div>
                  <div className="text-xs text-gray-600">Expires in 2 hours</div>
                </div>
                <Button className="w-full bg-purple-700 hover:bg-purple-800 font-serif">Claim Exclusive Deal</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

// CSS for animations
const styles = `
@keyframes scroll {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

.animate-scroll {
  animation: scroll 30s linear infinite;
}

.premium-saloon {
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(218, 165, 32, 0.1) 0%, transparent 50%);
}
`

// Inject styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style")
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}
