"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, BarChart3, Activity, DollarSign } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

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
  rsi: number
  candlestickData: Array<{
    time: string
    open: number
    high: number
    low: number
    close: number
    volume: number
  }>
  priceHistory: Array<{
    time: string
    price: number
  }>
}

// Top 40 cryptocurrencies with simulated data
const TOP_40_CRYPTOS: CryptoData[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    current_price: 43250.5,
    price_change_percentage_24h: 2.34,
    market_cap: 847000000000,
    total_volume: 28500000000,
    high_24h: 44100.0,
    low_24h: 42800.0,
    rsi: 58.7,
    candlestickData: generateCandlestickData(43250.5),
    priceHistory: generatePriceHistory(43250.5),
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    current_price: 2650.75,
    price_change_percentage_24h: -1.23,
    market_cap: 318000000000,
    total_volume: 15200000000,
    high_24h: 2720.0,
    low_24h: 2630.0,
    rsi: 45.2,
    candlestickData: generateCandlestickData(2650.75),
    priceHistory: generatePriceHistory(2650.75),
  },
  {
    id: "binancecoin",
    name: "BNB",
    symbol: "BNB",
    current_price: 315.2,
    price_change_percentage_24h: 0.87,
    market_cap: 47000000000,
    total_volume: 1800000000,
    high_24h: 320.5,
    low_24h: 312.0,
    rsi: 52.1,
    candlestickData: generateCandlestickData(315.2),
    priceHistory: generatePriceHistory(315.2),
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    current_price: 98.45,
    price_change_percentage_24h: 4.56,
    market_cap: 42000000000,
    total_volume: 2100000000,
    high_24h: 102.0,
    low_24h: 94.2,
    rsi: 67.3,
    candlestickData: generateCandlestickData(98.45),
    priceHistory: generatePriceHistory(98.45),
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    current_price: 0.485,
    price_change_percentage_24h: -2.15,
    market_cap: 17000000000,
    total_volume: 890000000,
    high_24h: 0.502,
    low_24h: 0.478,
    rsi: 41.8,
    candlestickData: generateCandlestickData(0.485),
    priceHistory: generatePriceHistory(0.485),
  },
  {
    id: "avalanche-2",
    name: "Avalanche",
    symbol: "AVAX",
    current_price: 42.15,
    price_change_percentage_24h: 3.21,
    market_cap: 15500000000,
    total_volume: 750000000,
    high_24h: 43.8,
    low_24h: 40.9,
    rsi: 61.4,
    candlestickData: generateCandlestickData(42.15),
    priceHistory: generatePriceHistory(42.15),
  },
  // Adding more cryptocurrencies to reach top 40
  ...generateAdditionalCryptos(),
]

function generateCandlestickData(currentPrice: number) {
  const data = []
  let price = currentPrice * 0.95

  for (let i = 0; i < 24; i++) {
    const open = price
    const volatility = 0.02 + Math.random() * 0.03
    const high = open * (1 + volatility)
    const low = open * (1 - volatility)
    const close = low + Math.random() * (high - low)

    data.push({
      time: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString(),
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000),
    })

    price = close
  }

  return data
}

function generatePriceHistory(currentPrice: number) {
  const data = []
  let price = currentPrice * 0.9

  for (let i = 0; i < 168; i++) {
    // 7 days of hourly data
    price *= 1 + (Math.random() - 0.5) * 0.02
    data.push({
      time: new Date(Date.now() - (167 - i) * 60 * 60 * 1000).toISOString(),
      price: Number(price.toFixed(2)),
    })
  }

  return data
}

function generateAdditionalCryptos(): CryptoData[] {
  const cryptos = [
    { name: "Dogecoin", symbol: "DOGE", price: 0.085 },
    { name: "Polygon", symbol: "MATIC", price: 0.92 },
    { name: "Chainlink", symbol: "LINK", price: 14.75 },
    { name: "Polkadot", symbol: "DOT", price: 7.25 },
    { name: "Litecoin", symbol: "LTC", price: 72.5 },
    { name: "Shiba Inu", symbol: "SHIB", price: 0.000024 },
    { name: "TRON", symbol: "TRX", price: 0.105 },
    { name: "Uniswap", symbol: "UNI", price: 6.85 },
    { name: "Cosmos", symbol: "ATOM", price: 12.4 },
    { name: "Ethereum Classic", symbol: "ETC", price: 28.9 },
    { name: "Stellar", symbol: "XLM", price: 0.125 },
    { name: "Monero", symbol: "XMR", price: 158.75 },
    { name: "Internet Computer", symbol: "ICP", price: 13.2 },
    { name: "VeChain", symbol: "VET", price: 0.032 },
    { name: "Filecoin", symbol: "FIL", price: 5.85 },
    { name: "Hedera", symbol: "HBAR", price: 0.078 },
    { name: "Algorand", symbol: "ALGO", price: 0.185 },
    { name: "The Graph", symbol: "GRT", price: 0.165 },
    { name: "Sandbox", symbol: "SAND", price: 0.52 },
    { name: "Decentraland", symbol: "MANA", price: 0.48 },
    { name: "Aave", symbol: "AAVE", price: 98.5 },
    { name: "Maker", symbol: "MKR", price: 1650.0 },
    { name: "Compound", symbol: "COMP", price: 52.75 },
    { name: "Sushi", symbol: "SUSHI", price: 1.25 },
    { name: "Curve DAO", symbol: "CRV", price: 0.85 },
    { name: "Yearn Finance", symbol: "YFI", price: 8750.0 },
    { name: "1inch", symbol: "1INCH", price: 0.42 },
    { name: "Enjin Coin", symbol: "ENJ", price: 0.38 },
    { name: "Basic Attention", symbol: "BAT", price: 0.28 },
    { name: "Zilliqa", symbol: "ZIL", price: 0.025 },
    { name: "OMG Network", symbol: "OMG", price: 0.95 },
    { name: "0x", symbol: "ZRX", price: 0.45 },
    { name: "Loopring", symbol: "LRC", price: 0.32 },
    { name: "Bancor", symbol: "BNT", price: 0.68 },
  ]

  return cryptos.map((crypto, index) => ({
    id: crypto.name.toLowerCase().replace(/\s+/g, "-"),
    name: crypto.name,
    symbol: crypto.symbol,
    current_price: crypto.price,
    price_change_percentage_24h: (Math.random() - 0.5) * 10,
    market_cap: crypto.price * (1000000000 + Math.random() * 5000000000),
    total_volume: crypto.price * (10000000 + Math.random() * 100000000),
    high_24h: crypto.price * (1 + Math.random() * 0.05),
    low_24h: crypto.price * (1 - Math.random() * 0.05),
    rsi: 30 + Math.random() * 40,
    candlestickData: generateCandlestickData(crypto.price),
    priceHistory: generatePriceHistory(crypto.price),
  }))
}

export function AdvancedCryptoMarket() {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData>(TOP_40_CRYPTOS[0])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"market_cap" | "price" | "change">("market_cap")

  const sortedCryptos = [...TOP_40_CRYPTOS].sort((a, b) => {
    switch (sortBy) {
      case "market_cap":
        return b.market_cap - a.market_cap
      case "price":
        return b.current_price - a.current_price
      case "change":
        return b.price_change_percentage_24h - a.price_change_percentage_24h
      default:
        return 0
    }
  })

  const getRSIColor = (rsi: number) => {
    if (rsi > 70) return "text-red-600"
    if (rsi < 30) return "text-green-600"
    return "text-yellow-600"
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">🚀 ADVANCED CRYPTO MARKET 📊</h1>
          <p className="text-lg text-gray-300">Real-time data for top 40 cryptocurrencies with technical analysis</p>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} onClick={() => setViewMode("grid")}>
              Grid View
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} onClick={() => setViewMode("list")}>
              List View
            </Button>
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-700 text-white px-3 py-2 rounded border border-slate-600"
            >
              <option value="market_cap">Market Cap</option>
              <option value="price">Price</option>
              <option value="change">24h Change</option>
            </select>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Market Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
            <TabsTrigger value="trading">Trading View</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Market Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  : "space-y-2"
              }
            >
              {sortedCryptos.map((crypto) => (
                <Card
                  key={crypto.id}
                  className={`bg-slate-800 border-slate-700 hover:bg-slate-750 cursor-pointer transition-colors ${
                    selectedCrypto.id === crypto.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedCrypto(crypto)}
                >
                  <CardContent className={viewMode === "grid" ? "p-4" : "p-3"}>
                    <div className={viewMode === "grid" ? "space-y-2" : "flex items-center justify-between"}>
                      <div className={viewMode === "grid" ? "" : "flex items-center gap-3"}>
                        <div>
                          <h3 className="font-bold text-white">{crypto.symbol}</h3>
                          <p className="text-sm text-gray-400">{crypto.name}</p>
                        </div>
                      </div>

                      <div className={viewMode === "grid" ? "space-y-1" : "flex items-center gap-4"}>
                        <div className="text-right">
                          <p className="font-bold text-lg">{formatPrice(crypto.current_price)}</p>
                          <div
                            className={`flex items-center gap-1 ${crypto.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}
                          >
                            {crypto.price_change_percentage_24h >= 0 ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            <span className="text-sm">{crypto.price_change_percentage_24h.toFixed(2)}%</span>
                          </div>
                        </div>

                        {viewMode === "list" && (
                          <>
                            <div className="text-right">
                              <p className="text-sm text-gray-400">Market Cap</p>
                              <p className="font-semibold">{formatMarketCap(crypto.market_cap)}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-400">RSI</p>
                              <p className={`font-semibold ${getRSIColor(crypto.rsi)}`}>{crypto.rsi.toFixed(1)}</p>
                            </div>
                          </>
                        )}
                      </div>

                      {viewMode === "grid" && (
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <p className="text-gray-400">Market Cap</p>
                            <p className="font-semibold">{formatMarketCap(crypto.market_cap)}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">RSI</p>
                            <p className={`font-semibold ${getRSIColor(crypto.rsi)}`}>{crypto.rsi.toFixed(1)}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6">
            {/* Selected Crypto Details */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {selectedCrypto.name} ({selectedCrypto.symbol})
                  </span>
                  <Badge className={selectedCrypto.price_change_percentage_24h >= 0 ? "bg-green-600" : "bg-red-600"}>
                    {selectedCrypto.price_change_percentage_24h >= 0 ? "+" : ""}
                    {selectedCrypto.price_change_percentage_24h.toFixed(2)}%
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-slate-700 rounded">
                    <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-400" />
                    <p className="text-2xl font-bold">{formatPrice(selectedCrypto.current_price)}</p>
                    <p className="text-sm text-gray-400">Current Price</p>
                  </div>
                  <div className="text-center p-4 bg-slate-700 rounded">
                    <BarChart3 className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                    <p className="text-2xl font-bold">{formatMarketCap(selectedCrypto.market_cap)}</p>
                    <p className="text-sm text-gray-400">Market Cap</p>
                  </div>
                  <div className="text-center p-4 bg-slate-700 rounded">
                    <Activity className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                    <p className={`text-2xl font-bold ${getRSIColor(selectedCrypto.rsi)}`}>
                      {selectedCrypto.rsi.toFixed(1)}
                    </p>
                    <p className="text-sm text-gray-400">RSI (14)</p>
                  </div>
                  <div className="text-center p-4 bg-slate-700 rounded">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                    <p className="text-2xl font-bold">{formatMarketCap(selectedCrypto.total_volume)}</p>
                    <p className="text-sm text-gray-400">24h Volume</p>
                  </div>
                </div>

                {/* Price Chart */}
                <div className="h-64 mb-6">
                  <h4 className="text-lg font-semibold mb-2">7-Day Price History</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedCrypto.priceHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="time"
                        stroke="#9CA3AF"
                        tickFormatter={(value) => new Date(value).toLocaleDateString()}
                      />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151" }}
                        formatter={(value: number) => [formatPrice(value), "Price"]}
                        labelFormatter={(label) => new Date(label).toLocaleString()}
                      />
                      <Line type="monotone" dataKey="price" stroke="#3B82F6" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* 24h High/Low */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-900/20 border border-green-700 rounded">
                    <p className="text-green-400 font-semibold">24h High</p>
                    <p className="text-xl font-bold">{formatPrice(selectedCrypto.high_24h)}</p>
                  </div>
                  <div className="p-4 bg-red-900/20 border border-red-700 rounded">
                    <p className="text-red-400 font-semibold">24h Low</p>
                    <p className="text-xl font-bold">{formatPrice(selectedCrypto.low_24h)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trading" className="space-y-6">
            {/* Trading Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Candlestick Chart */}
              <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle>24h Candlestick Chart - {selectedCrypto.symbol}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={selectedCrypto.candlestickData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis
                          dataKey="time"
                          stroke="#9CA3AF"
                          tickFormatter={(value) =>
                            new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                          }
                        />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151" }}
                          formatter={(value: number, name: string) => [formatPrice(value), name.toUpperCase()]}
                          labelFormatter={(label) => new Date(label).toLocaleTimeString()}
                        />
                        <Line type="monotone" dataKey="high" stroke="#10B981" strokeWidth={1} dot={false} />
                        <Line type="monotone" dataKey="low" stroke="#EF4444" strokeWidth={1} dot={false} />
                        <Line type="monotone" dataKey="close" stroke="#3B82F6" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Trading Panel */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle>Trading Panel</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Portfolio Value</label>
                    <div className="text-2xl font-bold text-green-400">$10,000.00</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Amount ({selectedCrypto.symbol})</label>
                    <input
                      type="number"
                      className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
                      placeholder="0.00"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button className="bg-green-600 hover:bg-green-700">BUY</Button>
                    <Button className="bg-red-600 hover:bg-red-700">SELL</Button>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Current Price:</span>
                      <span className="font-semibold">{formatPrice(selectedCrypto.current_price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>RSI:</span>
                      <span className={`font-semibold ${getRSIColor(selectedCrypto.rsi)}`}>
                        {selectedCrypto.rsi.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>24h Change:</span>
                      <span
                        className={`font-semibold ${selectedCrypto.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}
                      >
                        {selectedCrypto.price_change_percentage_24h >= 0 ? "+" : ""}
                        {selectedCrypto.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {/* RSI Indicator */}
                  <div className="p-3 bg-slate-700 rounded">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">RSI Indicator</span>
                      <span className={`text-sm font-bold ${getRSIColor(selectedCrypto.rsi)}`}>
                        {selectedCrypto.rsi.toFixed(1)}
                      </span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          selectedCrypto.rsi > 70
                            ? "bg-red-500"
                            : selectedCrypto.rsi < 30
                              ? "bg-green-500"
                              : "bg-yellow-500"
                        }`}
                        style={{ width: `${selectedCrypto.rsi}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Oversold (30)</span>
                      <span>Overbought (70)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
