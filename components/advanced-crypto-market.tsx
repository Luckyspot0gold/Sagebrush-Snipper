"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react"

interface CryptoData {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_history: Array<{ time: string; price: number }>
  rsi: number
  candlestick: Array<{ time: string; open: number; high: number; low: number; close: number }>
}

// Simulated real-time data (in production, this would come from CoinGecko API)
const generateMockData = (): CryptoData[] => {
  const cryptos = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", basePrice: 67234 },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", basePrice: 3456 },
    { id: "avalanche-2", name: "Avalanche", symbol: "AVAX", basePrice: 32.15 },
    { id: "solana", name: "Solana", symbol: "SOL", basePrice: 156.78 },
    { id: "cardano", name: "Cardano", symbol: "ADA", basePrice: 0.45 },
    { id: "polkadot", name: "Polkadot", symbol: "DOT", basePrice: 6.78 },
    { id: "chainlink", name: "Chainlink", symbol: "LINK", basePrice: 14.23 },
    { id: "polygon", name: "Polygon", symbol: "MATIC", basePrice: 0.89 },
    { id: "litecoin", name: "Litecoin", symbol: "LTC", basePrice: 89.45 },
    { id: "uniswap", name: "Uniswap", symbol: "UNI", basePrice: 7.12 },
    { id: "cosmos", name: "Cosmos", symbol: "ATOM", basePrice: 9.87 },
    { id: "algorand", name: "Algorand", symbol: "ALGO", basePrice: 0.23 },
    { id: "fantom", name: "Fantom", symbol: "FTM", basePrice: 0.34 },
    { id: "near", name: "NEAR Protocol", symbol: "NEAR", basePrice: 2.45 },
    { id: "terra-luna", name: "Terra", symbol: "LUNA", basePrice: 1.23 },
    { id: "avalanche", name: "Avalanche", symbol: "AVAX", basePrice: 32.15 },
    { id: "internet-computer", name: "Internet Computer", symbol: "ICP", basePrice: 12.34 },
    { id: "hedera-hashgraph", name: "Hedera", symbol: "HBAR", basePrice: 0.067 },
    { id: "elrond-erd-2", name: "MultiversX", symbol: "EGLD", basePrice: 45.67 },
    { id: "tezos", name: "Tezos", symbol: "XTZ", basePrice: 0.89 },
    { id: "theta-token", name: "Theta Network", symbol: "THETA", basePrice: 1.45 },
    { id: "vechain", name: "VeChain", symbol: "VET", basePrice: 0.023 },
    { id: "filecoin", name: "Filecoin", symbol: "FIL", basePrice: 5.67 },
    { id: "the-sandbox", name: "The Sandbox", symbol: "SAND", basePrice: 0.45 },
    { id: "decentraland", name: "Decentraland", symbol: "MANA", basePrice: 0.56 },
    { id: "axie-infinity", name: "Axie Infinity", symbol: "AXS", basePrice: 8.9 },
    { id: "enjincoin", name: "Enjin Coin", symbol: "ENJ", basePrice: 0.34 },
    { id: "gala", name: "Gala", symbol: "GALA", basePrice: 0.045 },
    { id: "immutable-x", name: "Immutable X", symbol: "IMX", basePrice: 1.23 },
    { id: "flow", name: "Flow", symbol: "FLOW", basePrice: 0.78 },
    { id: "wax", name: "WAX", symbol: "WAXP", basePrice: 0.067 },
    { id: "chromia", name: "Chromia", symbol: "CHR", basePrice: 0.23 },
    { id: "ultra", name: "Ultra", symbol: "UOS", basePrice: 0.12 },
    { id: "enjin", name: "Enjin Coin", symbol: "ENJ", basePrice: 0.34 },
    { id: "treasure", name: "Treasure", symbol: "MAGIC", basePrice: 0.89 },
    { id: "yield-guild-games", name: "Yield Guild Games", symbol: "YGG", basePrice: 0.45 },
    { id: "star-atlas", name: "Star Atlas", symbol: "ATLAS", basePrice: 0.0034 },
    { id: "illuvium", name: "Illuvium", symbol: "ILV", basePrice: 67.89 },
    { id: "gods-unchained", name: "Gods Unchained", symbol: "GODS", basePrice: 0.23 },
    { id: "my-neighbor-alice", name: "My Neighbor Alice", symbol: "ALICE", basePrice: 1.45 },
  ]

  return cryptos.map((crypto) => {
    const priceChange = (Math.random() - 0.5) * 20 // -10% to +10%
    const currentPrice = crypto.basePrice * (1 + priceChange / 100)
    const rsi = Math.random() * 100

    // Generate price history
    const priceHistory = Array.from({ length: 24 }, (_, i) => ({
      time: `${23 - i}h`,
      price: currentPrice * (1 + (Math.random() - 0.5) * 0.1),
    }))

    // Generate candlestick data
    const candlestick = Array.from({ length: 7 }, (_, i) => {
      const basePrice = currentPrice * (1 + (Math.random() - 0.5) * 0.2)
      const high = basePrice * (1 + Math.random() * 0.05)
      const low = basePrice * (1 - Math.random() * 0.05)
      const open = basePrice * (1 + (Math.random() - 0.5) * 0.02)
      const close = basePrice * (1 + (Math.random() - 0.5) * 0.02)

      return {
        time: `Day ${i + 1}`,
        open,
        high: Math.max(high, open, close),
        low: Math.min(low, open, close),
        close,
      }
    })

    return {
      id: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
      current_price: currentPrice,
      price_change_percentage_24h: priceChange,
      market_cap: currentPrice * Math.random() * 1000000000,
      total_volume: currentPrice * Math.random() * 100000000,
      high_24h: currentPrice * 1.1,
      low_24h: currentPrice * 0.9,
      price_history: priceHistory,
      rsi,
      candlestick,
    }
  })
}

export function AdvancedCryptoMarket() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchData = () => {
      setLoading(true)
      setTimeout(() => {
        const data = generateMockData()
        setCryptoData(data)
        setSelectedCrypto(data[0])
        setLoading(false)
      }, 1000)
    }

    fetchData()

    // Update data every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const getRSIColor = (rsi: number) => {
    if (rsi > 70) return "text-red-500"
    if (rsi < 30) return "text-green-500"
    return "text-yellow-500"
  }

  const getRSISignal = (rsi: number) => {
    if (rsi > 70) return "Overbought"
    if (rsi < 30) return "Oversold"
    return "Neutral"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">WyoVerse Crypto Market</h1>
        <p className="text-lg text-muted-foreground">
          Real-time cryptocurrency data with technical analysis for the top 40 digital assets
        </p>
        <div className="flex gap-4 mt-4">
          <Button variant={viewMode === "grid" ? "default" : "outline"} onClick={() => setViewMode("grid")}>
            Grid View
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} onClick={() => setViewMode("list")}>
            List View
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Market Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="trading">Trading Interface</TabsTrigger>
          <TabsTrigger value="technical">Technical Indicators</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Market Cap</p>
                    <p className="text-2xl font-bold">$2.1T</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">24h Volume</p>
                    <p className="text-2xl font-bold">$89.5B</p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Gainers</p>
                    <p className="text-2xl font-bold text-green-500">23</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Losers</p>
                    <p className="text-2xl font-bold text-red-500">17</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-2"
            }
          >
            {cryptoData.map((crypto) => (
              <Card
                key={crypto.id}
                className={`cursor-pointer hover:shadow-lg transition-shadow ${selectedCrypto?.id === crypto.id ? "ring-2 ring-blue-500" : ""}`}
                onClick={() => setSelectedCrypto(crypto)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-bold">{crypto.symbol}</h3>
                      <p className="text-sm text-muted-foreground">{crypto.name}</p>
                    </div>
                    <Badge className={getRSIColor(crypto.rsi)}>RSI: {crypto.rsi.toFixed(0)}</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold">${crypto.current_price.toLocaleString()}</span>
                      <span
                        className={`flex items-center ${crypto.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {crypto.price_change_percentage_24h >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {crypto.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>24h High: ${crypto.high_24h.toLocaleString()}</span>
                        <span>24h Low: ${crypto.low_24h.toLocaleString()}</span>
                      </div>
                      <div className="mt-1">Volume: ${(crypto.total_volume / 1000000).toFixed(1)}M</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          {selectedCrypto && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Price Chart - {selectedCrypto.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={selectedCrypto.price_history}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Candlestick Chart - 7 Days</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={selectedCrypto.candlestick}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="high" fill="#10b981" />
                      <Bar dataKey="low" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="trading" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Trading Interface</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Buy Amount</label>
                      <input type="number" className="w-full p-2 border rounded" placeholder="0.00" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Sell Amount</label>
                      <input type="number" className="w-full p-2 border rounded" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-green-500 hover:bg-green-600">Buy</Button>
                    <Button className="flex-1 bg-red-500 hover:bg-red-600">Sell</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Value:</span>
                    <span className="font-bold">$10,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Available:</span>
                    <span>$8,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>In Orders:</span>
                    <span>$1,500</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="technical" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cryptoData.slice(0, 12).map((crypto) => (
              <Card key={crypto.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold">{crypto.symbol}</h3>
                      <p className="text-sm text-muted-foreground">{crypto.name}</p>
                    </div>
                    <Badge className={getRSIColor(crypto.rsi)}>{getRSISignal(crypto.rsi)}</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>RSI (14):</span>
                      <span className={getRSIColor(crypto.rsi)}>{crypto.rsi.toFixed(1)}</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${crypto.rsi > 70 ? "bg-red-500" : crypto.rsi < 30 ? "bg-green-500" : "bg-yellow-500"}`}
                        style={{ width: `${crypto.rsi}%` }}
                      ></div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Oversold (30)</span>
                        <span>Overbought (70)</span>
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
