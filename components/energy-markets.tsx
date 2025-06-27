"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Zap, Mountain, Coins, AlertTriangle } from "lucide-react"
import Image from "next/image"

export function EnergyMarkets() {
  const naturalResourceCoins = [
    { name: "Petro Gold", symbol: "PAXG", price: "$2,045.67", change: "+2.3%", trend: "up", icon: "🥇" },
    { name: "Silver Token", symbol: "PSLV", price: "$24.89", change: "+1.8%", trend: "up", icon: "🥈" },
    { name: "Oil Coin", symbol: "OIL", price: "$78.45", change: "-0.5%", trend: "down", icon: "🛢️" },
    { name: "Natural Gas", symbol: "NGAS", price: "$3.21", change: "+4.2%", trend: "up", icon: "⛽" },
    { name: "Copper Token", symbol: "COPR", price: "$4.12", change: "+1.1%", trend: "up", icon: "🔶" },
    { name: "Uranium Coin", symbol: "URA", price: "$89.34", change: "+6.7%", trend: "up", icon: "⚛️" },
    { name: "Coal Energy", symbol: "COAL", price: "$156.78", change: "-2.1%", trend: "down", icon: "⚫" },
    { name: "Lithium Token", symbol: "LTHM", price: "$45.67", change: "+3.4%", trend: "up", icon: "🔋" },
    { name: "Rare Earth", symbol: "REMX", price: "$67.89", change: "+2.8%", trend: "up", icon: "💎" },
    { name: "Wind Power", symbol: "WIND", price: "$34.56", change: "+5.1%", trend: "up", icon: "💨" },
  ]

  return (
    <div className="space-y-6">
      {/* Wind Energy Hero Image */}
      <Card className="border-2 border-amber-700">
        <CardContent className="p-0">
          <div className="relative h-64 w-full">
            <Image
              src="/images/windmillwyoig.png"
              alt="Wyoming Wind Turbines - Aerial view of wind energy infrastructure across Wyoming's agricultural landscape"
              fill
              className="object-cover rounded-t-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="text-white text-xl font-bold">Wyoming Wind Power Initiative</h3>
              <p className="text-white/90 text-sm">Harnessing the frontier winds for sustainable energy production</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Natural Resource Cryptocurrency Markets */}
      <Card className="border-2 border-amber-700">
        <CardHeader className="bg-amber-100">
          <CardTitle className="text-xl font-bold text-amber-900 flex items-center gap-2">
            <Coins className="h-5 w-5" />
            NATURAL RESOURCE CRYPTOCURRENCY MARKETS
          </CardTitle>
          <p className="text-sm text-amber-700">Top 500 resource-backed digital assets</p>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {naturalResourceCoins.map((coin, index) => (
              <div key={index} className="border border-amber-300 rounded-lg p-3 bg-amber-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{coin.icon}</span>
                    <div>
                      <div className="font-bold text-amber-900 text-sm">{coin.name}</div>
                      <div className="text-xs text-amber-600">{coin.symbol}</div>
                    </div>
                  </div>
                  {coin.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-900">{coin.price}</span>
                  <Badge variant={coin.trend === "up" ? "default" : "destructive"} className="text-xs">
                    {coin.change}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4 bg-transparent" variant="outline">
            View All Resource Markets
          </Button>
        </CardContent>
      </Card>

      {/* Historical Trends & Research */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fracking Alternative Research */}
        <Card className="border-2 border-green-700">
          <CardHeader className="bg-green-100">
            <CardTitle className="text-lg font-bold text-green-900 flex items-center gap-2">
              <Mountain className="h-5 w-5" />
              SUSTAINABLE EXTRACTION RESEARCH
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-4">
              <h3 className="font-bold text-green-900 mb-2">🎓 University Partnership Opportunity</h3>
              <p className="text-sm text-green-800 mb-3">
                The WyoVerse Institute is seeking academic partners to develop revolutionary earth-friendly extraction
                technologies. Our research initiative aims to replace traditional fracking methods with innovative,
                ecosystem-preserving alternatives.
              </p>
              <div className="text-xs text-green-700 mb-3">
                <strong>Research Focus Areas:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Sonic extraction methodologies</li>
                  <li>Bio-remediation techniques</li>
                  <li>Minimal surface disruption protocols</li>
                  <li>Wildlife habitat preservation</li>
                </ul>
              </div>
              <Button size="sm" variant="outline" className="border-green-600 text-green-700 bg-transparent">
                Partner With Us
              </Button>
            </div>

            <div className="text-xs text-green-600 italic">
              "The future of resource extraction lies in harmony with nature, not dominance over it." - Dr. Sarah
              Frontier, WyoVerse Research Director
            </div>
          </CardContent>
        </Card>

        {/* Old Faithful Geological Changes */}
        <Card className="border-2 border-orange-700">
          <CardHeader className="bg-orange-100">
            <CardTitle className="text-lg font-bold text-orange-900 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              GEOLOGICAL FRONTIER REPORT
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="bg-orange-50 border-l-4 border-orange-600 p-4 mb-4">
              <h3 className="font-bold text-orange-900 mb-2">🌋 Old Faithful's New Rhythm</h3>
              <p className="text-sm text-orange-800 mb-3">
                For decades, Yellowstone's Old Faithful geyser has been as predictable as a frontier timepiece. However,
                recent observations indicate increased activity and irregular eruption patterns, departing from its
                historical 90-minute schedule.
              </p>
              <p className="text-sm text-orange-800 mb-3">
                Our geological survey team suggests these changes may correlate with subtle tectonic adjustments
                occurring across the western continental plates. The Yellowstone Caldera's thermal dynamics appear to be
                responding to deep crustal movements extending from the Pacific Coast to the Great Plains.
              </p>
              <div className="text-xs text-orange-700 mb-3">
                <strong>Observed Changes:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Eruption intervals: 60-120 minutes (previously 90±10)</li>
                  <li>Increased thermal output: +15% average</li>
                  <li>Seismic micro-tremors: 23% increase</li>
                  <li>Mineral composition shifts detected</li>
                </ul>
              </div>
            </div>

            <div className="text-xs text-orange-600 italic">
              "The Earth speaks to those who listen. These changes tell a story of deep geological processes that have
              shaped our frontier for millennia." - Chief Geologist Marcus Rockwell
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Energy Production Stats */}
      <Card className="border-2 border-blue-700">
        <CardHeader className="bg-blue-100">
          <CardTitle className="text-xl font-bold text-blue-900 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            WYOMING ENERGY PRODUCTION
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-900">47%</div>
              <div className="text-sm text-blue-700">Wind Power</div>
              <div className="text-xs text-blue-600">Leading the frontier</div>
            </div>
            <div className="text-center p-4 bg-gray-100 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">31%</div>
              <div className="text-sm text-gray-700">Natural Gas</div>
              <div className="text-xs text-gray-600">Clean burning</div>
            </div>
            <div className="text-center p-4 bg-yellow-100 rounded-lg">
              <div className="text-2xl font-bold text-yellow-900">15%</div>
              <div className="text-sm text-yellow-700">Solar</div>
              <div className="text-xs text-yellow-600">Growing rapidly</div>
            </div>
            <div className="text-center p-4 bg-green-100 rounded-lg">
              <div className="text-2xl font-bold text-green-900">7%</div>
              <div className="text-sm text-green-700">Hydro</div>
              <div className="text-xs text-green-600">Mountain streams</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Outlook */}
      <Card className="border-2 border-purple-700">
        <CardHeader className="bg-purple-100">
          <CardTitle className="text-lg font-bold text-purple-900">FRONTIER ENERGY OUTLOOK</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3 text-sm text-purple-800">
            <p>
              <strong>Wind Energy Expansion:</strong> Three new wind farms planned for 2025, expected to increase
              capacity by 40% and create 500+ frontier jobs.
            </p>
            <p>
              <strong>Crypto Mining Integration:</strong> Renewable energy partnerships with major cryptocurrency
              operations, utilizing excess wind power during peak production.
            </p>
            <p>
              <strong>Grid Modernization:</strong> Smart grid technology implementation to optimize energy distribution
              across the digital frontier.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
