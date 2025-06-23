"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const cryptoTargets = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 45000,
    change: 2.5,
    signals: ["RSI Oversold", "MACD Bullish"],
    strength: 85,
  },
  { symbol: "ETH", name: "Ethereum", price: 3200, change: -1.2, signals: ["Volume Spike"], strength: 65 },
  { symbol: "SOL", name: "Solana", price: 180, change: 5.8, signals: ["Wyoming Hammer", "Golden Cross"], strength: 92 },
  { symbol: "ADA", name: "Cardano", price: 0.85, change: 0.8, signals: ["Support Level"], strength: 45 },
]

const sniperModes = [
  { id: "precision", name: "Precision Sniper", description: "High-accuracy, low-frequency trades", winRate: 78 },
  { id: "rapid", name: "Rapid Fire", description: "Quick scalping opportunities", winRate: 62 },
  { id: "wyoming", name: "Wyoming Special", description: "Frontier-grade pattern recognition", winRate: 85 },
]

export function WyomingCryptoSniper() {
  const [selectedTarget, setSelectedTarget] = useState(null)
  const [activeMode, setActiveMode] = useState("wyoming")
  const [scanning, setScanning] = useState(false)
  const [tradeHistory, setTradeHistory] = useState([])
  const [tab, setTab] = useState<"targets" | "execution" | "history">("targets")

  const executeSnipe = (target) => {
    const trade = {
      id: Date.now(),
      symbol: target.symbol,
      action: "BUY",
      price: target.price,
      amount: 0.1,
      timestamp: new Date().toLocaleTimeString(),
      profit: Math.random() * 500 + 100,
    }
    setTradeHistory([trade, ...tradeHistory.slice(0, 9)])
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-amber-800 mb-2">🎯 Wyoming Crypto Sniper</h2>
        <p className="text-amber-600">"Fastest gun in the West meets Wall Street"</p>
      </div>

      {/* Sniper Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sniperModes.map((mode) => (
          <Card
            key={mode.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              activeMode === mode.id ? "ring-2 ring-amber-500 bg-amber-50" : ""
            }`}
            onClick={() => setActiveMode(mode.id)}
          >
            <CardContent className="p-4 text-center">
              <h3 className="font-bold mb-2">{mode.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{mode.description}</p>
              <Badge variant="outline">Win Rate: {mode.winRate}%</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs
        defaultValue="targets"
        onValueChange={(val) => {
          if (val) setTab(val as typeof tab)
        }}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="targets">Target Scanner</TabsTrigger>
          <TabsTrigger value="execution">Execution Center</TabsTrigger>
          <TabsTrigger value="history">Trade History</TabsTrigger>
        </TabsList>

        <TabsContent value="targets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Live Target Scanner</span>
                <Button onClick={() => setScanning(!scanning)} variant={scanning ? "destructive" : "default"} size="sm">
                  {scanning ? "Stop Scanning" : "Start Scanning"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cryptoTargets.map((target) => (
                  <div
                    key={target.symbol}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedTarget?.symbol === target.symbol ? "border-amber-500 bg-amber-50" : ""
                    }`}
                    onClick={() => setSelectedTarget(target)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">🎯</div>
                        <div>
                          <h4 className="font-bold">{target.name}</h4>
                          <p className="text-sm text-gray-600">{target.symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${target.price.toLocaleString()}</p>
                        <p className={`text-sm ${target.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {target.change >= 0 ? "+" : ""}
                          {target.change}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Signal Strength</span>
                        <span>{target.strength}%</span>
                      </div>
                      <Progress value={target.strength} />
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {target.signals.map((signal) => (
                        <Badge key={signal} variant="secondary" className="text-xs">
                          {signal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="execution" className="space-y-6">
          {selectedTarget ? (
            <Card>
              <CardHeader>
                <CardTitle>Sniper Execution: {selectedTarget.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Target Analysis</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Current Price:</span>
                        <span className="font-bold">${selectedTarget.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>24h Change:</span>
                        <span className={selectedTarget.change >= 0 ? "text-green-600" : "text-red-600"}>
                          {selectedTarget.change >= 0 ? "+" : ""}
                          {selectedTarget.change}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Signal Strength:</span>
                        <span className="font-bold">{selectedTarget.strength}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Execution Parameters</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Position Size:</span>
                        <span>2% of portfolio</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Stop Loss:</span>
                        <span className="text-red-600">-5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Take Profit:</span>
                        <span className="text-green-600">+15%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    onClick={() => executeSnipe(selectedTarget)}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg"
                    size="lg"
                  >
                    🎯 EXECUTE SNIPE
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2">Select a Target</h3>
                <p className="text-gray-600">Choose a crypto target from the scanner to execute a snipe</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Snipes</CardTitle>
            </CardHeader>
            <CardContent>
              {tradeHistory.length > 0 ? (
                <div className="space-y-3">
                  {tradeHistory.map((trade) => (
                    <div key={trade.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-green-600">✅</div>
                        <div>
                          <p className="font-semibold">
                            {trade.action} {trade.symbol}
                          </p>
                          <p className="text-sm text-gray-600">{trade.timestamp}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${trade.price.toLocaleString()}</p>
                        <p className="text-sm text-green-600">+${trade.profit.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-gray-600">No trades executed yet. Start sniping to see your history!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Wyoming Sniper Advantages */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">🏔️ Wyoming Sniper Edge</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-semibold">Lightning Speed</h4>
              <p className="text-sm text-gray-600">Sub-second execution on Solana network</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold">Precision Targeting</h4>
              <p className="text-sm text-gray-600">AI-powered pattern recognition</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💎</div>
              <h4 className="font-semibold">Diamond Hands</h4>
              <p className="text-sm text-gray-600">Wyoming-tough risk management</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
