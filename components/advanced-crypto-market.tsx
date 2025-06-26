"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { TrendingUp, TrendingDown, Activity, DollarSign, RefreshCw, Wifi, WifiOff } from "lucide-react"

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
  candlestick: Array<{ time: string; open: number; high: number; low: number; close: number; volume: number }>
  last_updated: string
}

interface ApiResponse {
  success: boolean
  data: CryptoData[]
  timestamp: string
  source: string
  error?: string
}

export function AdvancedCryptoMarket() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const [isLive, setIsLive] = useState(false)
  const [error, setError] = useState<string>("")

  const fetchCryptoData = async () => {
    try {
      setLoading(true)
      setError("")

      const response = await fetch("/api/crypto-data", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse = await response.json()

      if (result.success && result.data.length > 0) {
        setCryptoData(result.data)
        setSelectedCrypto(result.data[0])
        setLastUpdated(result.timestamp)
        setIsLive(result.source.includes("Coinbase"))
      } else {
        setError(result.error || "No data received")
        setIsLive(false)
      }
    } catch (err) {
      console.error("Failed to fetch crypto data:", err)
      setError("Failed to connect to market data")
      setIsLive(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCryptoData()

    // Update data every 30 seconds
    const interval = setInterval(fetchCryptoData, 30000)
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

  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(6)}`
    if (price < 1) return `$${price.toFixed(4)}`
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap > 1000000000000) return `$${(marketCap / 1000000000000).toFixed(2)}T`
    if (marketCap > 1000000000) return `$${(marketCap / 1000000000).toFixed(2)}B`
    return `$${(marketCap / 1000000).toFixed(2)}M`
  }

  if (loading && cryptoData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading real-time market data from Coinbase...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header with Status */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">WyoVerse Crypto Market</h1>
            <p className="text-lg text-muted-foreground">
              Real-time cryptocurrency data powered by Coinbase Advanced Trade API
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {isLive ? (
                <>
                  <Wifi className="h-5 w-5 text-green-500" />
                  <Badge className="bg-green-500">LIVE</Badge>
                </>
              ) : (
                <>
                  <WifiOff className="h-5 w-5 text-red-500" />
                  <Badge className="bg-red-500">OFFLINE</Badge>
                </>
              )}
            </div>

            <Button onClick={fetchCryptoData} disabled={loading} size="sm">
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between text-sm text-muted-foreground bg-muted p-3 rounded">
          <div className="flex items-center gap-4">
            <span>Last Updated: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : "Never"}</span>
            <span>•</span>
            <span>Source: {isLive ? "Coinbase API" : "Fallback Data"}</span>
            {error && (
              <>
                <span>•</span>
                <span className="text-red-500">Error: {error}</span>
              </>
            )}
          </div>

          <div className="flex gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              Grid
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              List
            </Button>
          </div>
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
          {/* Market Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Market Cap</p>
                    <p className="text-2xl font-bold">
                      {formatMarketCap(cryptoData.reduce((sum, crypto) => sum + crypto.market_cap, 0))}
                    </p>
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
                    <p className="text-2xl font-bold">
                      {formatMarketCap(cryptoData.reduce((sum, crypto) => sum + crypto.total_volume, 0))}
                    </p>
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
                    <p className="text-2xl font-bold text-green-500">
                      {cryptoData.filter((crypto) => crypto.price_change_percentage_24h > 0).length}
                    </p>
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
                    <p className="text-2xl font-bold text-red-500">
                      {cryptoData.filter((crypto) => crypto.price_change_percentage_24h < 0).length}
                    </p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Crypto Grid/List */}
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-2"
            }
          >
            {cryptoData.map((crypto) => (
              <Card
                key={crypto.id}
                className={`cursor-pointer hover:shadow-lg transition-all duration-200 ${
                  selectedCrypto?.id === crypto.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedCrypto(crypto)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{crypto.symbol}</h3>
                      <p className="text-sm text-muted-foreground">{crypto.name}</p>
                    </div>
                    <Badge className={getRSIColor(crypto.rsi)}>RSI: {crypto.rsi.toFixed(0)}</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">{formatPrice(crypto.current_price)}</span>
                      <span
                        className={`flex items-center text-sm font-medium ${
                          crypto.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {crypto.price_change_percentage_24h >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {crypto.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </div>

                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex justify-between">
                        <span>24h High: {formatPrice(crypto.high_24h)}</span>
                        <span>24h Low: {formatPrice(crypto.low_24h)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Market Cap: {formatMarketCap(crypto.market_cap)}</span>
                        <span>Volume: {formatMarketCap(crypto.total_volume)}</span>
                      </div>
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
              {/* Price Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Price Chart - {selectedCrypto.name}</span>
                    <Badge className={selectedCrypto.price_change_percentage_24h >= 0 ? "bg-green-500" : "bg-red-500"}>
                      {selectedCrypto.price_change_percentage_24h >= 0 ? "+" : ""}
                      {selectedCrypto.price_change_percentage_24h.toFixed(2)}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={selectedCrypto.price_history}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [formatPrice(value), "Price"]} />
                      <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Candlestick Chart */}
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
                      <Tooltip formatter={(value: number, name: string) => [formatPrice(value), name.toUpperCase()]} />
                      <Bar dataKey="high" fill="#10b981" name="High" />
                      <Bar dataKey="low" fill="#ef4444" name="Low" />
                      <Bar dataKey="close" fill="#3b82f6" name="Close" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Detailed Stats */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Market Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-muted rounded">
                      <p className="text-2xl font-bold">{formatPrice(selectedCrypto.current_price)}</p>
                      <p className="text-sm text-muted-foreground">Current Price</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded">
                      <p className="text-2xl font-bold">{formatMarketCap(selectedCrypto.market_cap)}</p>
                      <p className="text-sm text-muted-foreground">Market Cap</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded">
                      <p className={`text-2xl font-bold ${getRSIColor(selectedCrypto.rsi)}`}>
                        {selectedCrypto.rsi.toFixed(1)}
                      </p>
                      <p className="text-sm text-muted-foreground">RSI (14)</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded">
                      <p className="text-2xl font-bold">{formatMarketCap(selectedCrypto.total_volume)}</p>
                      <p className="text-sm text-muted-foreground">24h Volume</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="trading" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trading Interface */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Trading Interface - {selectedCrypto?.symbol || "Select Asset"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Buy Amount (USD)</label>
                      <input type="number" className="w-full p-2 border rounded mt-1" placeholder="0.00" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Sell Amount ({selectedCrypto?.symbol || "CRYPTO"})</label>
                      <input type="number" className="w-full p-2 border rounded mt-1" placeholder="0.00" />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-green-500 hover:bg-green-600">
                      Buy {selectedCrypto?.symbol || "CRYPTO"}
                    </Button>
                    <Button className="flex-1 bg-red-500 hover:bg-red-600">
                      Sell {selectedCrypto?.symbol || "CRYPTO"}
                    </Button>
                  </div>

                  {selectedCrypto && (
                    <div className="mt-4 p-4 bg-muted rounded">
                      <h4 className="font-semibold mb-2">Current Market Data</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span>Price:</span>
                          <span className="font-semibold">{formatPrice(selectedCrypto.current_price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>24h Change:</span>
                          <span
                            className={
                              selectedCrypto.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
                            }
                          >
                            {selectedCrypto.price_change_percentage_24h.toFixed(2)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>RSI:</span>
                          <span className={getRSIColor(selectedCrypto.rsi)}>
                            {selectedCrypto.rsi.toFixed(1)} ({getRSISignal(selectedCrypto.rsi)})
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Volume:</span>
                          <span>{formatMarketCap(selectedCrypto.total_volume)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Portfolio */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-muted rounded">
                    <p className="text-2xl font-bold text-green-500">$10,000.00</p>
                    <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Available Cash:</span>
                      <span className="font-semibold">$8,500.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>In Positions:</span>
                      <span className="font-semibold">$1,500.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Today's P&L:</span>
                      <span className="font-semibold text-green-500">+$125.50</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Recent Trades</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>BTC Buy</span>
                        <span className="text-green-500">+0.001</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ETH Sell</span>
                        <span className="text-red-500">-0.5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>AVAX Buy</span>
                        <span className="text-green-500">+10</span>
                      </div>
                    </div>
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

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>RSI (14):</span>
                      <span className={`font-semibold ${getRSIColor(crypto.rsi)}`}>{crypto.rsi.toFixed(1)}</span>
                    </div>

                    {/* RSI Bar */}
                    <div className="space-y-1">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-300 ${
                            crypto.rsi > 70 ? "bg-red-500" : crypto.rsi < 30 ? "bg-green-500" : "bg-yellow-500"
                          }`}
                          style={{ width: `${crypto.rsi}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Oversold (30)</span>
                        <span>Neutral (50)</span>
                        <span>Overbought (70)</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-xs">
                        <span>Price:</span>
                        <span className="font-semibold">{formatPrice(crypto.current_price)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>24h Change:</span>
                        <span className={crypto.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}>
                          {crypto.price_change_percentage_24h.toFixed(2)}%
                        </span>
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
