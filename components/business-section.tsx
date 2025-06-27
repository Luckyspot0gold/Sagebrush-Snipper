"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { TrendingUp, TrendingDown, RefreshCw, Wallet, DollarSign, Activity } from "lucide-react"
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

export function BusinessSection() {
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [walletConnections, setWalletConnections] = useState<WalletConnection[]>([
    { name: "Avalanche", icon: "🔺", connected: false, color: "bg-red-500" },
    { name: "DESO", icon: "💎", connected: false, color: "bg-green-500" },
    { name: "MUSE", icon: "🎵", connected: false, color: "bg-pink-500" },
  ])
  const [isConnecting, setIsConnecting] = useState<string | null>(null)

  const { toast } = useToast()

  const fetchMarketData = async () => {
    try {
      setLoading(true)
      setError("")

      const prices = await marketAPI.getMultiplePrices(["BTC", "ETH", "AVAX", "SOL", "ADA", "DOT"])

      if (prices.length > 0) {
        setCryptoPrices(prices)
        setLastUpdated(new Date().toISOString())
        toast({
          title: "Market Data Updated",
          description: `Successfully loaded ${prices.length} cryptocurrency prices`,
        })
      } else {
        setError("No market data received")
      }
    } catch (err: any) {
      console.error("Failed to fetch market data:", err)
      setError("Failed to connect to market data APIs")
      toast({
        title: "Market Data Error",
        description: "Using cached or fallback data",
        variant: "destructive",
      })
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
          // DESO wallet integration
          try {
            if (typeof window !== "undefined" && (window as any).deso) {
              const response = await (window as any).deso.identity.login()
              if (response && response.key) {
                connection = {
                  connected: true,
                  address: response.key,
                  balance: "Connected",
                }
                toast({
                  title: "💎 DESO Connected!",
                  description: `Connected to DESO blockchain`,
                })
              }
            } else {
              window.open("https://identity.deso.org/", "_blank")
              toast({
                title: "DESO Identity Required",
                description: "Please install DESO Identity for blockchain access",
              })
            }
          } catch (error) {
            toast({
              title: "DESO Integration",
              description: "🚧 Coming Soon! DESO wallet integration is under development.",
              duration: 3000,
            })
          }
          break

        case "MUSE":
          // MUSE wallet integration placeholder
          toast({
            title: "MUSE Integration",
            description: "🚧 Coming Soon! MUSE wallet integration is under development.",
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
    fetchMarketData()
    // Update every 5 minutes
    const interval = setInterval(fetchMarketData, 300000)
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
        {/* Header */}
        <div className="newspaper-article mb-8">
          <div className="newspaper-article-inner text-center">
            <h1 className="newspaper-headline text-6xl mb-4">WYOVERSE BUSINESS TELEGRAPH</h1>
            <p className="newspaper-subheadline text-2xl mb-4">Frontier Markets & Digital Commerce Report</p>
            <div className="newspaper-dateline">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
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
            <p className="newspaper-paragraph text-center mb-6">
              Connect your digital wallets to access advanced trading features and blockchain services
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {walletConnections.map((wallet) => (
                <div key={wallet.name} className="text-center">
                  <Button
                    onClick={() => connectWallet(wallet.name)}
                    disabled={isConnecting === wallet.name}
                    className={`w-full h-24 flex flex-col items-center justify-center gap-2 ${
                      wallet.connected ? "bg-green-600 hover:bg-green-700" : wallet.color
                    } text-white newspaper-button transition-all duration-300`}
                  >
                    <span className="text-3xl">{wallet.icon}</span>
                    <span className="text-sm font-serif">
                      {isConnecting === wallet.name ? "Connecting..." : wallet.name}
                    </span>
                    {wallet.connected && <span className="text-xs">✓ Connected</span>}
                  </Button>
                  {wallet.connected && wallet.address && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-300 rounded newspaper-ad">
                      <div className="text-xs font-mono newspaper-byline">
                        {wallet.address.slice(0, 8)}...{wallet.address.slice(-6)}
                      </div>
                      <div className="text-sm font-bold text-green-700">{wallet.balance}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Data Header */}
        <div className="newspaper-article mb-6">
          <div className="newspaper-article-inner">
            <div className="flex items-center justify-between mb-4">
              <h2 className="newspaper-section-title">
                <DollarSign className="inline h-8 w-8 mr-2" />
                LIVE MARKET TELEGRAPH
              </h2>
              <Button onClick={fetchMarketData} disabled={loading} className="newspaper-button">
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh Prices
              </Button>
            </div>

            <div className="newspaper-dateline text-center mb-4">
              Last Updated: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : "Never"}
              {error && <span className="text-red-600 ml-4">• Error: {error}</span>}
            </div>
          </div>
        </div>

        {/* Market Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="newspaper-article">
            <div className="newspaper-article-inner text-center">
              <h3 className="newspaper-headline text-lg mb-2">Total Market Cap</h3>
              <div className="text-3xl font-bold text-green-700 font-serif">
                {formatMarketCap(cryptoPrices.reduce((sum, crypto) => sum + crypto.market_cap, 0))}
              </div>
              <div className="text-sm newspaper-byline">Combined Value</div>
            </div>
          </div>

          <div className="newspaper-article">
            <div className="newspaper-article-inner text-center">
              <h3 className="newspaper-headline text-lg mb-2">24h Volume</h3>
              <div className="text-3xl font-bold text-blue-700 font-serif">
                {formatMarketCap(cryptoPrices.reduce((sum, crypto) => sum + crypto.total_volume, 0))}
              </div>
              <div className="text-sm newspaper-byline">Trading Activity</div>
            </div>
          </div>

          <div className="newspaper-article">
            <div className="newspaper-article-inner text-center">
              <h3 className="newspaper-headline text-lg mb-2">Market Sentiment</h3>
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {cryptoPrices.filter((crypto) => crypto.price_change_percentage_24h > 0).length}
                  </div>
                  <div className="text-xs newspaper-byline">Gainers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {cryptoPrices.filter((crypto) => crypto.price_change_percentage_24h < 0).length}
                  </div>
                  <div className="text-xs newspaper-byline">Losers</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Crypto Prices Grid */}
        {loading && cryptoPrices.length === 0 ? (
          <div className="newspaper-article">
            <div className="newspaper-article-inner text-center py-12">
              <RefreshCw className="h-12 w-12 animate-spin mx-auto mb-4" />
              <p className="newspaper-paragraph">Loading market data from multiple sources...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cryptoPrices.map((crypto) => (
              <div key={crypto.id} className="newspaper-article">
                <div className="newspaper-article-inner">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="newspaper-headline text-xl">{crypto.symbol}</h3>
                      <p className="newspaper-byline">{crypto.name}</p>
                    </div>
                    <Badge
                      className={`${
                        crypto.price_change_percentage_24h >= 0 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      } font-serif`}
                    >
                      {crypto.price_change_percentage_24h >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="text-center p-4 bg-amber-50 border-2 border-amber-300 rounded">
                      <div className="text-3xl font-bold font-serif">{formatPrice(crypto.current_price)}</div>
                      <div className="text-sm newspaper-byline">Current Price</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="newspaper-ad p-2">
                        <div className="font-bold">24h High</div>
                        <div>{formatPrice(crypto.high_24h)}</div>
                      </div>
                      <div className="newspaper-ad p-2">
                        <div className="font-bold">24h Low</div>
                        <div>{formatPrice(crypto.low_24h)}</div>
                      </div>
                      <div className="newspaper-ad p-2">
                        <div className="font-bold">Market Cap</div>
                        <div>{formatMarketCap(crypto.market_cap)}</div>
                      </div>
                      <div className="newspaper-ad p-2">
                        <div className="font-bold">Volume</div>
                        <div>{formatMarketCap(crypto.total_volume)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Market Analysis Section */}
        <div className="newspaper-article mt-8">
          <div className="newspaper-article-inner">
            <h2 className="newspaper-section-title text-center mb-6">
              <Activity className="inline h-8 w-8 mr-2" />
              FRONTIER MARKET ANALYSIS
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="newspaper-headline text-2xl mb-4">Market Outlook</h3>
                <div className="newspaper-quote mb-4">
                  "The digital frontier continues to expand with unprecedented opportunities for savvy investors and
                  pioneers willing to embrace the future of decentralized finance."
                </div>
                <p className="newspaper-paragraph">
                  Current market conditions show strong momentum across major cryptocurrencies, with particular strength
                  in the Avalanche ecosystem. The integration of traditional business models with blockchain technology
                  continues to drive innovation and value creation.
                </p>
              </div>

              <div>
                <h3 className="newspaper-headline text-2xl mb-4">Trading Opportunities</h3>
                <div className="space-y-3">
                  {cryptoPrices.slice(0, 3).map((crypto) => (
                    <div key={crypto.id} className="newspaper-ad p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold">{crypto.symbol}</div>
                          <div className="text-sm">{formatPrice(crypto.current_price)}</div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`font-bold ${
                              crypto.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {crypto.price_change_percentage_24h >= 0 ? "+" : ""}
                            {crypto.price_change_percentage_24h.toFixed(2)}%
                          </div>
                          <div className="text-sm">24h Change</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
