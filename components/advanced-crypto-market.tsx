"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Activity, DollarSign, RefreshCw, Wifi, WifiOff, Wallet } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { marketAPI, type CryptoPrice } from "@/lib/market-api-enhanced"
import { avalancheIntegration } from "@/lib/integrations/avalanche-integration"

interface WalletConnection {
  name: string
  icon: string
  connected: boolean
  address?: string
  balance?: string
  color: string
}

export function AdvancedCryptoMarket() {
  const [cryptoData, setCryptoData] = useState<CryptoPrice[]>([])
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoPrice | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const [isLive, setIsLive] = useState(false)
  const [error, setError] = useState<string>("")
  const [walletConnections, setWalletConnections] = useState<WalletConnection[]>([
    { name: "Avalanche", icon: "🔺", connected: false, color: "bg-red-500" },
    { name: "DESO", icon: "💎", connected: false, color: "bg-green-500" },
    { name: "MUSE", icon: "🎵", connected: false, color: "bg-pink-500" },
  ])
  const [isConnecting, setIsConnecting] = useState<string | null>(null)

  const { toast } = useToast()

  const fetchCryptoData = async () => {
    try {
      setLoading(true)
      setError("")

      const prices = await marketAPI.getMultiplePrices(["BTC", "ETH", "AVAX", "SOL", "ADA", "DOT", "MATIC", "LINK"])

      if (prices.length > 0) {
        setCryptoData(prices)
        setSelectedCrypto(prices[0])
        setLastUpdated(new Date().toISOString())
        setIsLive(true)
      } else {
        setError("No data received from market APIs")
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

  const connectWallet = async (walletName: string) => {
    setIsConnecting(walletName)

    try {
      let connection: Partial<WalletConnection> = {}

      switch (walletName) {
        case "Avalanche": {
          const result = await avalancheIntegration.connectWallet()
          if (result.isConnected) {
            connection = {
              connected: true,
              address: result.address,
              balance: `${result.balance} AVAX`,
            }
            toast({
              title: "🔺 Avalanche Connected!",
              description: `Connected to ${result.address?.slice(0, 6)}…${result.address?.slice(-4)}`,
            })
          } else {
            toast({
              title: "Avalanche Connection Failed",
              description: result.error ?? "Connection was not completed.",
              variant: "destructive",
            })
            setIsConnecting(null)
            return
          }
          break
        }

        case "DESO":
        case "MUSE":
          toast({
            title: `${walletName} Integration`,
            description: "🚧 Coming Soon! This wallet integration is under development.",
            duration: 3000,
          })
          setIsConnecting(null)
          return
      }

      setWalletConnections((prev) =>
        prev.map((wallet) => (wallet.name === walletName ? { ...wallet, ...connection } : wallet)),
      )
    } catch (error) {
      console.error(`Failed to connect ${walletName}:`, error)
      toast({
        title: "Connection Failed",
        description: `Failed to connect to ${walletName}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsConnecting(null)
    }
  }

  useEffect(() => {
    fetchCryptoData()
    // Update data every 5 minutes
    const interval = setInterval(fetchCryptoData, 300000)
    return () => clearInterval(interval)
  }, [])

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
      <div
        className="newspaper-bg min-h-screen relative"
        style={{
          backgroundImage: "url('/images/wyoverse-digital-mountain.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-white/80" />
        <div className="relative z-10 flex items-center justify-center h-64">
          <div className="text-center newspaper-article">
            <div className="newspaper-article-inner">
              <RefreshCw className="h-12 w-12 animate-spin mx-auto mb-4" />
              <p className="newspaper-paragraph">Loading real-time market data from CoinGecko...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="newspaper-bg min-h-screen p-6 relative"
      style={{
        backgroundImage: "url('/images/wyoverse-digital-mountain.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Ghost overlay for the mountain image */}
      <div className="absolute inset-0 bg-white/80 pointer-events-none" />

      <div className="relative z-10">
        {/* Header with Status */}
        <div className="newspaper-article mb-8">
          <div className="newspaper-article-inner">
            <div className="flex items-center justify-between mb-4">
              <div className="text-center flex-1">
                <h1 className="newspaper-headline text-6xl mb-2">WYOVERSE CRYPTO MARKET</h1>
                <p className="newspaper-subheadline text-2xl">Real-time cryptocurrency data powered by CoinGecko API</p>
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

                <Button onClick={fetchCryptoData} disabled={loading} className="newspaper-button">
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Status Bar */}
            <div className="newspaper-ad p-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span>Last Updated: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : "Never"}</span>
                  <span>•</span>
                  <span>Source: {isLive ? "CoinGecko API" : "Fallback Data"}</span>
                  {error && (
                    <>
                      <span>•</span>
                      <span className="text-red-500">Error: {error}</span>
                    </>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="newspaper-button"
                  >
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="newspaper-button"
                  >
                    List
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Connection Section */}
        <div className="newspaper-article mb-8">
          <div className="newspaper-article-inner">
            <h2 className="newspaper-section-title text-center mb-6">
              <Wallet className="inline h-8 w-8 mr-2" />
              FRONTIER WALLET CONNECTIONS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {walletConnections.map((wallet) => (
                <div key={wallet.name} className="text-center">
                  <Button
                    onClick={() => connectWallet(wallet.name)}
                    disabled={isConnecting === wallet.name}
                    className={`w-full h-20 flex flex-col items-center justify-center gap-2 ${
                      wallet.connected ? "bg-green-600 hover:bg-green-700" : wallet.color
                    } text-white newspaper-button transition-all duration-300`}
                  >
                    <span className="text-2xl">{wallet.icon}</span>
                    <span className="text-xs font-serif">
                      {isConnecting === wallet.name ? "Connecting..." : wallet.name}
                    </span>
                    {wallet.connected && <span className="text-xs">✓ Connected</span>}
                  </Button>
                  {wallet.connected && wallet.address && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-300 rounded">
                      <div className="text-xs font-mono newspaper-byline">
                        {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                      </div>
                      <div className="text-xs font-bold text-green-700">{wallet.balance}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 border-4 border-black bg-amber-50">
            <TabsTrigger value="overview" className="newspaper-button">
              Market Overview
            </TabsTrigger>
            <TabsTrigger value="detailed" className="newspaper-button">
              Detailed Analysis
            </TabsTrigger>
            <TabsTrigger value="trading" className="newspaper-button">
              Trading Interface
            </TabsTrigger>
            <TabsTrigger value="technical" className="newspaper-button">
              Technical Indicators
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Market Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="newspaper-article">
                <div className="newspaper-article-inner text-center">
                  <h3 className="newspaper-headline text-lg mb-2">Total Market Cap</h3>
                  <div className="text-3xl font-bold text-green-700 font-serif">
                    {formatMarketCap(cryptoData.reduce((sum, crypto) => sum + crypto.market_cap, 0))}
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500 mx-auto mt-2" />
                </div>
              </div>

              <div className="newspaper-article">
                <div className="newspaper-article-inner text-center">
                  <h3 className="newspaper-headline text-lg mb-2">24h Volume</h3>
                  <div className="text-3xl font-bold text-blue-700 font-serif">
                    {formatMarketCap(cryptoData.reduce((sum, crypto) => sum + crypto.total_volume, 0))}
                  </div>
                  <Activity className="h-8 w-8 text-blue-500 mx-auto mt-2" />
                </div>
              </div>

              <div className="newspaper-article">
                <div className="newspaper-article-inner text-center">
                  <h3 className="newspaper-headline text-lg mb-2">Gainers</h3>
                  <div className="text-3xl font-bold text-green-700 font-serif">
                    {cryptoData.filter((crypto) => crypto.price_change_percentage_24h > 0).length}
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500 mx-auto mt-2" />
                </div>
              </div>

              <div className="newspaper-article">
                <div className="newspaper-article-inner text-center">
                  <h3 className="newspaper-headline text-lg mb-2">Losers</h3>
                  <div className="text-3xl font-bold text-red-700 font-serif">
                    {cryptoData.filter((crypto) => crypto.price_change_percentage_24h < 0).length}
                  </div>
                  <TrendingDown className="h-8 w-8 text-red-500 mx-auto mt-2" />
                </div>
              </div>
            </div>

            {/* Crypto Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  : "space-y-2"
              }
            >
              {cryptoData.map((crypto) => (
                <div
                  key={crypto.id}
                  className={`newspaper-article cursor-pointer hover:shadow-lg transition-all duration-200 ${
                    selectedCrypto?.id === crypto.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedCrypto(crypto)}
                >
                  <div className="newspaper-article-inner">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="newspaper-headline text-lg">{crypto.symbol}</h3>
                        <p className="newspaper-byline">{crypto.name}</p>
                      </div>
                      <Badge
                        className={`${
                          crypto.price_change_percentage_24h >= 0 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                        } font-serif`}
                      >
                        {crypto.price_change_percentage_24h >= 0 ? "+" : ""}
                        {crypto.price_change_percentage_24h.toFixed(2)}%
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold font-serif">{formatPrice(crypto.current_price)}</span>
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

                      <div className="newspaper-ad p-2">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="font-bold">24h High:</span>
                            <div>{formatPrice(crypto.high_24h)}</div>
                          </div>
                          <div>
                            <span className="font-bold">24h Low:</span>
                            <div>{formatPrice(crypto.low_24h)}</div>
                          </div>
                          <div>
                            <span className="font-bold">Market Cap:</span>
                            <div>{formatMarketCap(crypto.market_cap)}</div>
                          </div>
                          <div>
                            <span className="font-bold">Volume:</span>
                            <div>{formatMarketCap(crypto.total_volume)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6">
            {selectedCrypto && (
              <div className="newspaper-article">
                <div className="newspaper-article-inner">
                  <h2 className="newspaper-section-title text-center mb-6">
                    Detailed Analysis - {selectedCrypto.name}
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="newspaper-ad p-6">
                      <h3 className="newspaper-headline text-xl mb-4">Price Information</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-serif">Current Price:</span>
                          <span className="font-bold">{formatPrice(selectedCrypto.current_price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-serif">24h Change:</span>
                          <span
                            className={
                              selectedCrypto.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"
                            }
                          >
                            {selectedCrypto.price_change_percentage_24h >= 0 ? "+" : ""}
                            {selectedCrypto.price_change_percentage_24h.toFixed(2)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-serif">24h High:</span>
                          <span className="font-bold">{formatPrice(selectedCrypto.high_24h)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-serif">24h Low:</span>
                          <span className="font-bold">{formatPrice(selectedCrypto.low_24h)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="newspaper-ad p-6">
                      <h3 className="newspaper-headline text-xl mb-4">Market Statistics</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-serif">Market Cap:</span>
                          <span className="font-bold">{formatMarketCap(selectedCrypto.market_cap)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-serif">24h Volume:</span>
                          <span className="font-bold">{formatMarketCap(selectedCrypto.total_volume)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-serif">Last Updated:</span>
                          <span className="font-bold">
                            {new Date(selectedCrypto.last_updated).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="trading" className="space-y-6">
            <div className="newspaper-article">
              <div className="newspaper-article-inner text-center">
                <h2 className="newspaper-section-title mb-6">Trading Interface</h2>
                <p className="newspaper-paragraph mb-6">
                  Connect your wallets above to access advanced trading features and execute trades directly from the
                  WyoVerse platform.
                </p>
                <div className="newspaper-ad p-8">
                  <h3 className="newspaper-headline text-xl mb-4">🚧 Trading Features Coming Soon! 🚧</h3>
                  <p className="newspaper-paragraph">
                    Advanced trading interface with real-time order execution, portfolio management, and DeFi
                    integration is currently under development.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="technical" className="space-y-6">
            <div className="newspaper-article">
              <div className="newspaper-article-inner text-center">
                <h2 className="newspaper-section-title mb-6">Technical Analysis</h2>
                <p className="newspaper-paragraph mb-6">
                  Advanced charting and technical indicators for professional traders and analysts.
                </p>
                <div className="newspaper-ad p-8">
                  <h3 className="newspaper-headline text-xl mb-4">📊 Technical Charts Coming Soon! 📊</h3>
                  <p className="newspaper-paragraph">
                    Professional-grade technical analysis tools including RSI, MACD, Bollinger Bands, and custom
                    indicators are being developed.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
