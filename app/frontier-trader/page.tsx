"use client"

import { useState, useEffect } from "react"
import { NewspaperLayout } from "@/components/newspaper-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, TrendingUp, TrendingDown, DollarSign, BarChart3, ExternalLink, Volume2, VolumeX } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

interface WalletState {
  connected: boolean
  address: string
  balance: number
  network: string
}

interface MarketData {
  symbol: string
  price: number
  change24h: number
  volume: number
}

export default function FrontierTraderPage() {
  const [walletState, setWalletState] = useState<WalletState>({
    connected: false,
    address: "",
    balance: 0,
    network: "",
  })

  const [marketData, setMarketData] = useState<MarketData[]>([
    { symbol: "AVAX", price: 42.5, change24h: 5.2, volume: 1250000 },
    { symbol: "ETH", price: 2340.8, change24h: -2.1, volume: 8900000 },
    { symbol: "BTC", price: 67890.0, change24h: 3.8, volume: 15600000 },
  ])

  const [soundEnabled, setSoundEnabled] = useState(true)
  const [isConnecting, setIsConnecting] = useState(false)
  const { toast } = useToast()

  // Avalanche Wallet Connection
  const connectAvalanche = async () => {
    setIsConnecting(true)
    try {
      if (typeof window.ethereum !== "undefined") {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" })

        // Add Avalanche network if not present
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xA86A" }], // Avalanche C-Chain
          })
        } catch (switchError: any) {
          // Network not added, add it
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0xA86A",
                  chainName: "Avalanche Network",
                  nativeCurrency: {
                    name: "AVAX",
                    symbol: "AVAX",
                    decimals: 18,
                  },
                  rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
                  blockExplorerUrls: ["https://snowtrace.io/"],
                },
              ],
            })
          }
        }

        // Get account
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
          setWalletState({
            connected: true,
            address: accounts[0],
            balance: 125.5, // Mock balance
            network: "Avalanche",
          })

          if (soundEnabled) {
            const audio = new Audio("/sounds/success.mp3")
            audio.volume = 0.5
            audio.play().catch(() => {})
          }

          toast({
            title: "🏔️ Avalanche Connected!",
            description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
          })
        }
      } else {
        toast({
          title: "MetaMask Required",
          description: "Please install MetaMask to connect to Avalanche",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Avalanche connection failed:", error)
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Avalanche network",
        variant: "destructive",
      })
    }
    setIsConnecting(false)
  }

  // Coinbase Wallet Connection
  const connectCoinbase = async () => {
    setIsConnecting(true)

    // Simulate connection for demo
    setTimeout(() => {
      setWalletState({
        connected: true,
        address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5",
        balance: 89.25,
        network: "Coinbase",
      })

      if (soundEnabled) {
        const audio = new Audio("/sounds/success.mp3")
        audio.volume = 0.5
        audio.play().catch(() => {})
      }

      toast({
        title: "💙 Coinbase Connected!",
        description: "Demo connection established",
      })
      setIsConnecting(false)
    }, 2000)

    // In production, use Coinbase Wallet SDK
    // window.open('https://wallet.coinbase.com/', '_blank')
  }

  // Phantom Wallet Connection
  const connectPhantom = async () => {
    setIsConnecting(true)

    try {
      // Check if Phantom is installed
      if (window.solana && window.solana.isPhantom) {
        const response = await window.solana.connect()
        setWalletState({
          connected: true,
          address: response.publicKey.toString(),
          balance: 45.75,
          network: "Solana",
        })

        if (soundEnabled) {
          const audio = new Audio("/sounds/success.mp3")
          audio.volume = 0.5
          audio.play().catch(() => {})
        }

        toast({
          title: "👻 Phantom Connected!",
          description: `Connected to Solana network`,
        })
      } else {
        // Phantom not installed, open website
        window.open("https://phantom.app/", "_blank")
        toast({
          title: "Phantom Required",
          description: "Please install Phantom wallet for Solana",
        })
      }
    } catch (error) {
      console.error("Phantom connection failed:", error)
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Phantom wallet",
        variant: "destructive",
      })
    }
    setIsConnecting(false)
  }

  const disconnectWallet = () => {
    setWalletState({
      connected: false,
      address: "",
      balance: 0,
      network: "",
    })
    toast({
      title: "Wallet Disconnected",
      description: "Successfully disconnected from wallet",
    })
  }

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
  }

  // Update market data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) =>
        prev.map((item) => ({
          ...item,
          price: item.price * (0.98 + Math.random() * 0.04),
          change24h: -5 + Math.random() * 10,
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <NewspaperLayout>
      <div className="space-y-6">
        {/* Hero Section with Poster */}
        <div className="relative">
          <Image
            src="/images/frontiertraderposter.jpg"
            alt="Frontier Trader - New Era in GameFi"
            width={1200}
            height={600}
            className="w-full h-96 object-cover border-4 border-black rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg" />
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-5xl font-serif font-bold mb-2 headline-primary">FRONTIER TRADER</h1>
            <p className="text-xl font-serif">Where Old West Trading Meets Modern GameFi</p>
            <div className="flex gap-2 mt-4">
              <Button variant="ghost" size="sm" onClick={toggleSound} className="text-white hover:bg-white/20">
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Wallet Connection Section */}
        <Card className="border-4 border-black newspaper-article">
          <CardHeader className="border-b-2 border-black">
            <CardTitle className="text-2xl font-serif headline-secondary">🔗 Connect Your Frontier Wallet</CardTitle>
            <CardDescription className="font-serif">
              Choose your preferred wallet to start trading on the digital frontier
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {!walletState.connected ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Avalanche Wallet */}
                <Card className="border-2 border-red-500 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">⛰️</span>
                    </div>
                    <h3 className="font-serif font-bold text-lg mb-2">Avalanche</h3>
                    <p className="text-sm text-gray-600 mb-4">Connect via MetaMask to Avalanche C-Chain</p>
                    <Button
                      onClick={connectAvalanche}
                      disabled={isConnecting}
                      className="w-full bg-red-500 hover:bg-red-600 text-white"
                    >
                      {isConnecting ? "Connecting..." : "Connect Avalanche"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Coinbase Wallet */}
                <Card className="border-2 border-blue-500 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">💙</span>
                    </div>
                    <h3 className="font-serif font-bold text-lg mb-2">Coinbase</h3>
                    <p className="text-sm text-gray-600 mb-4">Professional trading with Coinbase Wallet</p>
                    <Button
                      onClick={connectCoinbase}
                      disabled={isConnecting}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      {isConnecting ? "Connecting..." : "Connect Coinbase"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Phantom Wallet */}
                <Card className="border-2 border-purple-500 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">👻</span>
                    </div>
                    <h3 className="font-serif font-bold text-lg mb-2">Phantom</h3>
                    <p className="text-sm text-gray-600 mb-4">Solana network trading and NFTs</p>
                    <Button
                      onClick={connectPhantom}
                      disabled={isConnecting}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                    >
                      {isConnecting ? "Connecting..." : "Connect Phantom"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* Connected Wallet Display */
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-green-800">🔗 {walletState.network} Connected</h3>
                    <p className="text-sm text-green-600">
                      {walletState.address.slice(0, 8)}...{walletState.address.slice(-6)}
                    </p>
                  </div>
                  <Button
                    onClick={disconnectWallet}
                    variant="outline"
                    size="sm"
                    className="border-green-500 text-green-700 hover:bg-green-100"
                  >
                    Disconnect
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-800">${walletState.balance.toFixed(2)}</div>
                    <div className="text-sm text-green-600">Available Balance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-800">{walletState.network}</div>
                    <div className="text-sm text-green-600">Network</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Trading Dashboard */}
        {walletState.connected && (
          <Tabs defaultValue="markets" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 border-2 border-black">
              <TabsTrigger value="markets" className="font-serif">
                Markets
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="font-serif">
                Portfolio
              </TabsTrigger>
              <TabsTrigger value="history" className="font-serif">
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="markets">
              <Card className="border-4 border-black newspaper-article">
                <CardHeader className="border-b-2 border-black">
                  <CardTitle className="font-serif headline-secondary">📈 Live Market Data</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {marketData.map((asset) => (
                      <div
                        key={asset.symbol}
                        className="flex items-center justify-between p-4 border-2 border-gray-200 rounded"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            {asset.symbol[0]}
                          </div>
                          <div>
                            <div className="font-bold font-serif">{asset.symbol}</div>
                            <div className="text-sm text-gray-600">Vol: ${(asset.volume / 1000000).toFixed(1)}M</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">${asset.price.toFixed(2)}</div>
                          <div
                            className={`text-sm flex items-center gap-1 ${
                              asset.change24h >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {asset.change24h >= 0 ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            {asset.change24h.toFixed(1)}%
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            Buy
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-500 text-red-600">
                            Sell
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portfolio">
              <Card className="border-4 border-black newspaper-article">
                <CardHeader className="border-b-2 border-black">
                  <CardTitle className="font-serif headline-secondary">💼 Your Frontier Portfolio</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <Wallet className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="font-serif text-xl mb-2">Start Your Trading Journey</h3>
                    <p className="text-gray-600 mb-4">Make your first trade to see your portfolio here</p>
                    <Button className="frontier-button">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Start Trading
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card className="border-4 border-black newspaper-article">
                <CardHeader className="border-b-2 border-black">
                  <CardTitle className="font-serif headline-secondary">📊 Trading History</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="font-serif text-xl mb-2">No Trading History</h3>
                    <p className="text-gray-600">Your trading history will appear here once you start trading</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Links to Other Games */}
        <Card className="border-4 border-black newspaper-article">
          <CardHeader className="border-b-2 border-black">
            <CardTitle className="font-serif headline-secondary">🎮 Explore More Frontier Adventures</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🥊</span>
                  <div>
                    <div className="font-serif font-bold">Boxing Arena</div>
                    <div className="text-sm text-gray-600">Fight for crypto rewards</div>
                  </div>
                </div>
                <Button size="sm" className="frontier-button" asChild>
                  <a href="/boxing-arena">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Fight
                  </a>
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🍻</span>
                  <div>
                    <div className="font-serif font-bold">Bill's Saloon</div>
                    <div className="text-sm text-gray-600">Chat with Bar Keep Bill</div>
                  </div>
                </div>
                <Button size="sm" className="frontier-button" asChild>
                  <a href="/saloon">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Visit
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </NewspaperLayout>
  )
}
