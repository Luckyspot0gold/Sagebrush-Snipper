"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Wallet, BarChart3, Activity, Zap, Target, Shield } from "lucide-react"
import { marketAPI, type MarketData } from "@/lib/market-api-enhanced"
import { connectAvalancheWallet } from "@/lib/integrations/avalanche-integration"

export function AdvancedCryptoMarket() {
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [selectedCoin, setSelectedCoin] = useState<MarketData | null>(null)

  useEffect(() => {
    loadMarketData()
    const interval = setInterval(loadMarketData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const loadMarketData = async () => {
    try {
      setLoading(true)
      const data = await marketAPI.getMarketData()
      setMarketData(data)
      setLastUpdated(new Date().toLocaleTimeString())
      if (!selectedCoin && data.length > 0) {
        setSelectedCoin(data[0])
      }
    } catch (error) {
      console.error("Failed to load market data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleConnectAvalanche = async () => {
    try {
      const result = await connectAvalancheWallet()
      if (result.success && result.address) {
        setWalletConnected(true)
        setWalletAddress(result.address)
      }
    } catch (error) {
      console.error("Failed to connect Avalanche wallet:", error)
    }
  }

  const handleConnectDESO = () => {
    window.open("https://diamondapp.com/", "_blank")
  }

  const handleConnectMUSE = () => {
    window.open("https://www.muse.place/", "_blank")
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price)
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`
    return `$${marketCap.toLocaleString()}`
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden"
      style={{
        backgroundImage: `url('/images/wyoverse-digital-mountain.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Ghost overlay for the mountain background */}
      <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-sm"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">WyoVerse Crypto Exchange</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">Advanced trading platform for the digital frontier</p>
        </div>

        {/* Wallet Connection Bar */}
        <Card className="mb-6 bg-slate-800/90 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Wallet className="h-5 w-5 text-slate-400" />
                <span className="text-slate-300">Connect Wallet:</span>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleConnectAvalanche}
                  variant="outline"
                  size="sm"
                  className="border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
                  disabled={walletConnected}
                >
                  {walletConnected ? "AVAX Connected" : "Avalanche"}
                </Button>

                <Button
                  onClick={handleConnectDESO}
                  variant="outline"
                  size="sm"
                  className="border-purple-500 text-purple-400 hover:bg-purple-500/10 bg-transparent"
                >
                  DESO
                </Button>

                <Button
                  onClick={handleConnectMUSE}
                  variant="outline"
                  size="sm"
                  className="border-blue-500 text-blue-400 hover:bg-blue-500/10 bg-transparent"
                >
                  MUSE
                </Button>
              </div>

              {walletConnected && walletAddress && (
                <Badge variant="outline" className="border-green-500 text-green-400">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="market" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/90 border-slate-700">
            <TabsTrigger value="market" className="data-[state=active]:bg-slate-700">
              Market Overview
            </TabsTrigger>
            <TabsTrigger value="trading" className="data-[state=active]:bg-slate-700">
              Trading
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-slate-700">
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-slate-700">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="market" className="space-y-6">
            {/* Market Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Market Cap</p>
                      <p className="text-2xl font-bold text-white">
                        {formatMarketCap(marketData.reduce((sum, coin) => sum + coin.market_cap, 0))}
                      </p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">24h Volume</p>
                      <p className="text-2xl font-bold text-white">
                        {formatMarketCap(marketData.reduce((sum, coin) => sum + coin.volume_24h, 0))}
                      </p>
                    </div>
                    <Activity className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Active Pairs</p>
                      <p className="text-2xl font-bold text-white">{marketData.length}</p>
                    </div>
                    <Target className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Last Update</p>
                      <p className="text-lg font-bold text-white">{lastUpdated}</p>
                    </div>
                    <Zap className="h-8 w-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Market Table */}
            <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Live Market Data
                  </CardTitle>
                  <Button
                    onClick={loadMarketData}
                    disabled={loading}
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    {loading ? "Updating..." : "Refresh"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketData.map((coin) => (
                    <div
                      key={coin.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 transition-colors cursor-pointer"
                      onClick={() => setSelectedCoin(coin)}
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="font-bold text-white">{coin.name}</h3>
                          <p className="text-slate-400 text-sm uppercase">{coin.symbol}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="font-bold text-white">{formatPrice(coin.current_price)}</p>
                          <p className="text-slate-400 text-sm">{formatMarketCap(coin.market_cap)}</p>
                        </div>

                        <Badge
                          variant={coin.price_change_percentage_24h >= 0 ? "default" : "destructive"}
                          className="flex items-center gap-1 min-w-[80px] justify-center"
                        >
                          {coin.price_change_percentage_24h >= 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trading" className="space-y-6">
            <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Trading Interface</CardTitle>
                <CardDescription className="text-slate-400">Professional trading tools coming soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Shield className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Advanced Trading Platform</h3>
                  <p className="text-slate-400 mb-6">
                    Full trading interface with charts, order books, and advanced tools
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700">Coming Soon</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Portfolio Management</CardTitle>
                <CardDescription className="text-slate-400">Track your digital assets and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Wallet className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Portfolio Tracker</h3>
                  <p className="text-slate-400 mb-6">Connect your wallet to view your portfolio</p>
                  {!walletConnected ? (
                    <div className="flex gap-2 justify-center">
                      <Button onClick={handleConnectAvalanche} className="bg-red-600 hover:bg-red-700">
                        Connect Avalanche
                      </Button>
                      <Button
                        onClick={handleConnectDESO}
                        variant="outline"
                        className="border-purple-500 text-purple-400 bg-transparent"
                      >
                        Connect DESO
                      </Button>
                    </div>
                  ) : (
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      Wallet Connected
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Market Analytics</CardTitle>
                <CardDescription className="text-slate-400">Advanced market analysis and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Activity className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Technical Analysis</h3>
                  <p className="text-slate-400 mb-6">Charts, indicators, and market sentiment analysis</p>
                  <Button className="bg-purple-600 hover:bg-purple-700">Coming Soon</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
