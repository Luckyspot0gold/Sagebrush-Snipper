"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Wallet, ExternalLink, DollarSign, BarChart3, Users, Building2 } from "lucide-react"
import { marketAPI, type MarketData } from "@/lib/market-api-enhanced"
import { connectAvalancheWallet } from "@/lib/integrations/avalanche-integration"

export function BusinessSection() {
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>("")

  useEffect(() => {
    loadMarketData()
    const interval = setInterval(loadMarketData, 5 * 60 * 1000) // Update every 5 minutes
    return () => clearInterval(interval)
  }, [])

  const loadMarketData = async () => {
    try {
      setLoading(true)
      const data = await marketAPI.getMarketData()
      setMarketData(data)
      setLastUpdated(new Date().toLocaleTimeString())
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
      className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 relative overflow-hidden"
      style={{
        backgroundImage: `url('/images/wyoverse-digital-mountain.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Ghost overlay for the mountain background */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-amber-900 mb-4" style={{ fontFamily: "serif" }}>
            WYOVERSE PIONEER
          </h1>
          <div className="border-t-4 border-b-4 border-amber-900 py-2 mb-6">
            <h2 className="text-2xl font-semibold text-amber-800">BUSINESS & COMMERCE SECTION</h2>
          </div>
          <p className="text-lg text-amber-700 max-w-3xl mx-auto">
            "Where Digital Frontiers Meet Traditional Commerce - Est. 1880s Spirit, 2024 Innovation"
          </p>
        </div>

        {/* Wallet Connection Section */}
        <Card className="mb-8 border-4 border-amber-900 bg-amber-50/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-amber-900 flex items-center justify-center gap-2">
              <Wallet className="h-6 w-6" />
              Digital Wallet Connections
            </CardTitle>
            <CardDescription className="text-amber-700">
              Connect your digital wallets to participate in the WyoVerse economy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={handleConnectAvalanche}
                className="bg-red-600 hover:bg-red-700 text-white h-16 text-lg font-semibold"
                disabled={walletConnected}
              >
                <Wallet className="mr-2 h-5 w-5" />
                {walletConnected ? "Avalanche Connected" : "Connect Avalanche"}
              </Button>

              <Button
                onClick={handleConnectDESO}
                className="bg-purple-600 hover:bg-purple-700 text-white h-16 text-lg font-semibold"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Connect DESO
              </Button>

              <Button
                onClick={handleConnectMUSE}
                className="bg-blue-600 hover:bg-blue-700 text-white h-16 text-lg font-semibold"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Connect MUSE
              </Button>
            </div>

            {walletConnected && walletAddress && (
              <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg">
                <p className="text-green-800 font-semibold">
                  Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Market Data Section */}
        <Card className="mb-8 border-4 border-amber-900 bg-amber-50/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl text-amber-900 flex items-center gap-2">
                <BarChart3 className="h-6 w-6" />
                Frontier Market Telegraph
              </CardTitle>
              <div className="text-right">
                <Badge variant="outline" className="border-amber-600 text-amber-700">
                  Last Updated: {lastUpdated}
                </Badge>
                <Button
                  onClick={loadMarketData}
                  disabled={loading}
                  className="ml-2 bg-amber-600 hover:bg-amber-700"
                  size="sm"
                >
                  {loading ? "Updating..." : "Refresh"}
                </Button>
              </div>
            </div>
            <CardDescription className="text-amber-700">
              Real-time market data from the digital frontier
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketData.map((coin) => (
                <Card key={coin.id} className="border-2 border-amber-300 bg-white/80">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-amber-900">{coin.name}</h3>
                        <p className="text-sm text-amber-600 uppercase">{coin.symbol}</p>
                      </div>
                      <Badge
                        variant={coin.price_change_percentage_24h >= 0 ? "default" : "destructive"}
                        className="flex items-center gap-1"
                      >
                        {coin.price_change_percentage_24h >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-amber-600">Price:</span>
                        <span className="font-semibold text-amber-900">{formatPrice(coin.current_price)}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-sm text-amber-600">Market Cap:</span>
                        <span className="font-semibold text-amber-900">{formatMarketCap(coin.market_cap)}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-sm text-amber-600">Volume 24h:</span>
                        <span className="font-semibold text-amber-900">{formatMarketCap(coin.volume_24h)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Business Opportunities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-4 border-amber-900 bg-amber-50/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-amber-900 flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Land Development
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-700 mb-4">
                Stake your claim in the digital frontier. Virtual land parcels available for development.
              </p>
              <Button className="w-full bg-amber-600 hover:bg-amber-700">View Available Plots</Button>
            </CardContent>
          </Card>

          <Card className="border-4 border-amber-900 bg-amber-50/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-amber-900 flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Trading Post
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-700 mb-4">Buy, sell, and trade digital assets in our frontier marketplace.</p>
              <Button className="w-full bg-amber-600 hover:bg-amber-700">Enter Trading Post</Button>
            </CardContent>
          </Card>

          <Card className="border-4 border-amber-900 bg-amber-50/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-amber-900 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Pioneer Guild
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-700 mb-4">
                Join fellow pioneers in collaborative business ventures and expeditions.
              </p>
              <Button className="w-full bg-amber-600 hover:bg-amber-700">Join Guild</Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center border-t-4 border-amber-900 pt-6">
          <p className="text-amber-700 text-lg font-semibold">"Fortune Favors the Bold Pioneer"</p>
          <p className="text-amber-600 text-sm mt-2">
            WyoVerse Business District - Where Digital Dreams Become Reality
          </p>
        </div>
      </div>
    </div>
  )
}
