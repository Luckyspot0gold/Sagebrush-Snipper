"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

const portfolioData = [
  { symbol: "BTC", name: "Bitcoin", amount: 0.5, value: 22500, change: 2.5, color: "orange" },
  { symbol: "ETH", name: "Ethereum", amount: 5.2, value: 16640, change: -1.2, color: "blue" },
  { symbol: "SOL", name: "Solana", amount: 100, value: 18000, change: 5.8, color: "purple" },
  { symbol: "ADA", name: "Cardano", amount: 2000, value: 1700, change: 0.8, color: "green" },
]

const tradingStrategies = [
  {
    id: "wyoming-hammer",
    name: "Wyoming Hammer",
    description: "Stone-cold reversal pattern detection",
    performance: 92,
    trades: 156,
    winRate: 78,
    status: "active",
  },
  {
    id: "sagebrush-star",
    name: "Sagebrush Star",
    description: "High-volume momentum strategy",
    performance: 87,
    trades: 203,
    winRate: 71,
    status: "active",
  },
  {
    id: "frontier-scalp",
    name: "Frontier Scalper",
    description: "Quick profit micro-trades",
    performance: 65,
    trades: 1247,
    winRate: 58,
    status: "paused",
  },
]

export function TradingDashboard() {
  const [totalValue, setTotalValue] = useState(58840)
  const [dailyPnL, setDailyPnL] = useState(1247)
  const [activeStrategy, setActiveStrategy] = useState("wyoming-hammer")
  const [tab, setTab] = useState<"portfolio" | "strategies" | "trading" | "analytics">("portfolio")

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-amber-800 mb-2">Frontier Trading Command Center</h2>
        <p className="text-amber-600">AI-Powered Wyoming-Grade Trading Strategies</p>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Total Portfolio</p>
                <p className="text-2xl font-bold text-green-800">${totalValue.toLocaleString()}</p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Daily P&L</p>
                <p className="text-2xl font-bold text-blue-800">+${dailyPnL}</p>
              </div>
              <div className="text-3xl">📈</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Active Strategies</p>
                <p className="text-2xl font-bold text-purple-800">3</p>
              </div>
              <div className="text-3xl">🎯</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-yellow-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">Wyoming Bonus</p>
                <p className="text-2xl font-bold text-amber-800">+15%</p>
              </div>
              <div className="text-3xl">🏔️</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs
        value={tab}
        onValueChange={(val) => {
          if (val) setTab(val as typeof tab)
        }}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="strategies">AI Strategies</TabsTrigger>
          <TabsTrigger value="trading">Live Trading</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioData.map((asset) => (
                  <div key={asset.symbol} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 bg-${asset.color}-500 rounded-full flex items-center justify-center text-white font-bold`}
                      >
                        {asset.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <h4 className="font-semibold">{asset.name}</h4>
                        <p className="text-sm text-gray-600">
                          {asset.amount} {asset.symbol}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${asset.value.toLocaleString()}</p>
                      <p className={`text-sm ${asset.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {asset.change >= 0 ? "+" : ""}
                        {asset.change}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategies" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tradingStrategies.map((strategy) => (
              <Card key={strategy.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{strategy.name}</CardTitle>
                    <Badge variant={strategy.status === "active" ? "default" : "secondary"}>{strategy.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{strategy.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Performance</span>
                      <span>{strategy.performance}%</span>
                    </div>
                    <Progress value={strategy.performance} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Total Trades</p>
                      <p className="font-semibold">{strategy.trades}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Win Rate</p>
                      <p className="font-semibold">{strategy.winRate}%</p>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    variant={strategy.status === "active" ? "outline" : "default"}
                    onClick={() => setActiveStrategy(strategy.id)}
                  >
                    {strategy.status === "active" ? "Pause Strategy" : "Activate Strategy"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trading" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Market Scanner</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-green-50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-600">BUY Signal</p>
                          <p className="font-bold">SOL/USD</p>
                          <p className="text-xs text-gray-600">Wyoming Hammer Pattern</p>
                        </div>
                        <Button size="sm" className="bg-green-600">
                          Execute
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-600">HOLD Signal</p>
                          <p className="font-bold">ETH/USD</p>
                          <p className="text-xs text-gray-600">Consolidation Phase</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Monitor
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-red-50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-red-600">SELL Signal</p>
                          <p className="font-bold">ADA/USD</p>
                          <p className="text-xs text-gray-600">Resistance Level</p>
                        </div>
                        <Button size="sm" variant="destructive">
                          Execute
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Return</span>
                    <span className="font-bold text-green-600">+247%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sharpe Ratio</span>
                    <span className="font-bold">2.34</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Drawdown</span>
                    <span className="font-bold text-red-600">-12.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wyoming Bonus</span>
                    <span className="font-bold text-amber-600">+15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Position Size</span>
                      <span>2% per trade</span>
                    </div>
                    <Progress value={20} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Stop Loss</span>
                      <span>-5%</span>
                    </div>
                    <Progress value={50} className="bg-red-100" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Take Profit</span>
                      <span>+15%</span>
                    </div>
                    <Progress value={75} className="bg-green-100" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Wyoming Trading Advantages */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">🏔️ Wyoming Trading Advantages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">💰</div>
              <h4 className="font-semibold">Zero State Taxes</h4>
              <p className="text-sm text-gray-600">Keep 100% of your trading profits</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-semibold">Frontier Speed</h4>
              <p className="text-sm text-gray-600">Lightning-fast execution on Solana</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <h4 className="font-semibold">Legal Protection</h4>
              <p className="text-sm text-gray-600">Wyoming DAO LLC compliance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
