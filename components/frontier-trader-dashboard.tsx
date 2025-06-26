"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Zap, Target } from "lucide-react"

interface TradePosition {
  id: string
  asset: string
  type: "long" | "short"
  entryPrice: number
  currentPrice: number
  quantity: number
  pnl: number
  timestamp: Date
}

interface MarketData {
  symbol: string
  price: number
  change24h: number
  volume: number
  marketCap: number
  lastUpdate: Date
}

export function FrontierTraderDashboard() {
  const [positions, setPositions] = useState<TradePosition[]>([
    {
      id: "pos-1",
      asset: "AVAX",
      type: "long",
      entryPrice: 42.5,
      currentPrice: 45.2,
      quantity: 100,
      pnl: 270,
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "pos-2",
      asset: "DESO",
      type: "short",
      entryPrice: 12.8,
      currentPrice: 11.95,
      quantity: 200,
      pnl: 170,
      timestamp: new Date(Date.now() - 7200000),
    },
  ])

  const [marketData, setMarketData] = useState<MarketData[]>([
    {
      symbol: "AVAX",
      price: 45.2,
      change24h: 6.35,
      volume: 1250000,
      marketCap: 16800000000,
      lastUpdate: new Date(),
    },
    {
      symbol: "DESO",
      price: 11.95,
      change24h: -6.64,
      volume: 890000,
      marketCap: 450000000,
      lastUpdate: new Date(),
    },
    {
      symbol: "MUSE",
      price: 3.47,
      change24h: 12.8,
      volume: 340000,
      marketCap: 89000000,
      lastUpdate: new Date(),
    },
    {
      symbol: "STELLAR",
      price: 0.125,
      change24h: 2.4,
      volume: 2100000,
      marketCap: 3600000000,
      lastUpdate: new Date(),
    },
  ])

  const [tradeAmount, setTradeAmount] = useState("")
  const [selectedAsset, setSelectedAsset] = useState("AVAX")

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) =>
        prev.map((asset) => ({
          ...asset,
          price: asset.price * (1 + (Math.random() - 0.5) * 0.02),
          lastUpdate: new Date(),
        })),
      )

      setPositions((prev) =>
        prev.map((pos) => {
          const currentMarket = marketData.find((m) => m.symbol === pos.asset)
          if (currentMarket) {
            const newPrice = currentMarket.price
            const pnl =
              pos.type === "long"
                ? (newPrice - pos.entryPrice) * pos.quantity
                : (pos.entryPrice - newPrice) * pos.quantity

            return {
              ...pos,
              currentPrice: newPrice,
              pnl: pnl,
            }
          }
          return pos
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [marketData])

  const executeTrade = (type: "buy" | "sell") => {
    const amount = Number.parseFloat(tradeAmount)
    if (!amount || amount <= 0) return

    const asset = marketData.find((m) => m.symbol === selectedAsset)
    if (!asset) return

    const newPosition: TradePosition = {
      id: `pos-${Date.now()}`,
      asset: selectedAsset,
      type: type === "buy" ? "long" : "short",
      entryPrice: asset.price,
      currentPrice: asset.price,
      quantity: amount,
      pnl: 0,
      timestamp: new Date(),
    }

    setPositions((prev) => [...prev, newPosition])
    setTradeAmount("")
  }

  const closePosition = (positionId: string) => {
    setPositions((prev) => prev.filter((p) => p.id !== positionId))
  }

  const totalPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0)
  const totalValue = positions.reduce((sum, pos) => sum + pos.currentPrice * pos.quantity, 0)

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-4 border-black">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total P&L</p>
                <p className={`text-2xl font-bold ${totalPnL >= 0 ? "text-green-600" : "text-red-600"}`}>
                  ${totalPnL.toFixed(2)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-black">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Portfolio Value</p>
                <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-black">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Positions</p>
                <p className="text-2xl font-bold">{positions.length}</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-black">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Win Rate</p>
                <p className="text-2xl font-bold">73.5%</p>
              </div>
              <Zap className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trading" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trading">Trading Desk</TabsTrigger>
          <TabsTrigger value="positions">Active Positions</TabsTrigger>
          <TabsTrigger value="markets">Market Data</TabsTrigger>
        </TabsList>

        <TabsContent value="trading" className="space-y-4">
          <Card className="border-4 border-black">
            <CardHeader>
              <CardTitle className="headline-secondary">🤠 FRONTIER TRADING POST</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Asset</label>
                  <select
                    value={selectedAsset}
                    onChange={(e) => setSelectedAsset(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    {marketData.map((asset) => (
                      <option key={asset.symbol} value={asset.symbol}>
                        {asset.symbol} - ${asset.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Quantity</label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(e.target.value)}
                  />
                </div>

                <div className="flex items-end gap-2">
                  <Button onClick={() => executeTrade("buy")} className="bg-green-600 hover:bg-green-700 flex-1">
                    BUY LONG
                  </Button>
                  <Button onClick={() => executeTrade("sell")} className="bg-red-600 hover:bg-red-700 flex-1">
                    SELL SHORT
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="positions" className="space-y-4">
          <Card className="border-4 border-black">
            <CardHeader>
              <CardTitle className="headline-secondary">Active Trading Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {positions.map((position) => (
                  <div key={position.id} className="border-2 border-gray-300 p-4 rounded">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <Badge className={position.type === "long" ? "bg-green-500" : "bg-red-500"}>
                          {position.type.toUpperCase()}
                        </Badge>
                        <span className="font-bold">{position.asset}</span>
                        <span className="text-sm text-gray-600">
                          {position.quantity} @ ${position.entryPrice.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Current: ${position.currentPrice.toFixed(2)}</div>
                          <div className={`font-bold ${position.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                            P&L: ${position.pnl.toFixed(2)}
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => closePosition(position.id)}>
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="markets" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marketData.map((asset) => (
              <Card key={asset.symbol} className="border-4 border-black">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{asset.symbol}</span>
                    <Badge className={asset.change24h >= 0 ? "bg-green-500" : "bg-red-500"}>
                      {asset.change24h >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {asset.change24h.toFixed(2)}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">${asset.price.toFixed(2)}</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Volume:</span>
                        <div className="font-bold">${(asset.volume / 1000000).toFixed(1)}M</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Market Cap:</span>
                        <div className="font-bold">${(asset.marketCap / 1000000000).toFixed(1)}B</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
