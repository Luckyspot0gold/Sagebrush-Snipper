"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wallet, TrendingUp, Shield, Zap, ExternalLink, CheckCircle, AlertCircle } from "lucide-react"
import Image from "next/image"
import { FrontierTraderDashboard } from "@/components/frontier-trader-dashboard"

interface WalletConnection {
  id: string
  name: string
  icon: string
  description: string
  network: string
  status: "disconnected" | "connecting" | "connected"
  address?: string
}

export default function FrontierTraderPage() {
  const [wallets, setWallets] = useState<WalletConnection[]>([
    {
      id: "avalanche",
      name: "Avalanche (MetaMask)",
      icon: "🔺",
      description: "Connect to Avalanche C-Chain for AVAX trading",
      network: "Avalanche",
      status: "disconnected",
    },
    {
      id: "coinbase",
      name: "Coinbase Wallet",
      icon: "💙",
      description: "Professional-grade wallet for institutional trading",
      network: "Multi-chain",
      status: "disconnected",
    },
    {
      id: "phantom",
      name: "Phantom Wallet",
      icon: "👻",
      description: "Solana ecosystem wallet for SOL and SPL tokens",
      network: "Solana",
      status: "disconnected",
    },
  ])

  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)
  const [showDashboard, setShowDashboard] = useState(false)

  // Avalanche network configuration
  const AVALANCHE_CONFIG = {
    chainId: "0xA86A",
    chainName: "Avalanche Network",
    nativeCurrency: {
      name: "AVAX",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://snowtrace.io/"],
  }

  const connectAvalanche = async () => {
    updateWalletStatus("avalanche", "connecting")

    try {
      if (typeof window.ethereum !== "undefined") {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })

        // Add Avalanche network if not already added
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: AVALANCHE_CONFIG.chainId }],
          })
        } catch (switchError: any) {
          // Network not added, add it
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [AVALANCHE_CONFIG],
            })
          }
        }

        // Update wallet status
        updateWalletStatus("avalanche", "connected", accounts[0])
        setConnectedWallet("avalanche")
        setShowDashboard(true)
      } else {
        alert("MetaMask not detected! Please install MetaMask to connect to Avalanche.")
        updateWalletStatus("avalanche", "disconnected")
      }
    } catch (error) {
      console.error("Avalanche connection failed:", error)
      updateWalletStatus("avalanche", "disconnected")
      alert("Failed to connect to Avalanche. Please try again.")
    }
  }

  const connectCoinbase = async () => {
    updateWalletStatus("coinbase", "connecting")

    try {
      // For demo purposes, simulate connection
      setTimeout(() => {
        const demoAddress = "0x742d35Cc6634C0532925a3b8D4C9db96590c6C87"
        updateWalletStatus("coinbase", "connected", demoAddress)
        setConnectedWallet("coinbase")
        setShowDashboard(true)
      }, 2000)

      // In production, use Coinbase Wallet SDK
      // window.open('https://wallet.coinbase.com/', '_blank')
    } catch (error) {
      console.error("Coinbase connection failed:", error)
      updateWalletStatus("coinbase", "disconnected")
    }
  }

  const connectPhantom = async () => {
    updateWalletStatus("phantom", "connecting")

    try {
      if (typeof window.solana !== "undefined" && window.solana.isPhantom) {
        const response = await window.solana.connect()
        const address = response.publicKey.toString()

        updateWalletStatus("phantom", "connected", address)
        setConnectedWallet("phantom")
        setShowDashboard(true)
      } else {
        // Phantom not installed, open website
        window.open("https://phantom.app/", "_blank")
        updateWalletStatus("phantom", "disconnected")
      }
    } catch (error) {
      console.error("Phantom connection failed:", error)
      updateWalletStatus("phantom", "disconnected")
    }
  }

  const updateWalletStatus = (walletId: string, status: WalletConnection["status"], address?: string) => {
    setWallets((prev) =>
      prev.map((wallet) =>
        wallet.id === walletId
          ? { ...wallet, status, address }
          : { ...wallet, status: wallet.status === "connected" ? "connected" : "disconnected" },
      ),
    )
  }

  const disconnectWallet = () => {
    setWallets((prev) => prev.map((wallet) => ({ ...wallet, status: "disconnected", address: undefined })))
    setConnectedWallet(null)
    setShowDashboard(false)
  }

  const getWalletConnector = (walletId: string) => {
    switch (walletId) {
      case "avalanche":
        return connectAvalanche
      case "coinbase":
        return connectCoinbase
      case "phantom":
        return connectPhantom
      default:
        return () => {}
    }
  }

  if (showDashboard && connectedWallet) {
    return <FrontierTraderDashboard connectedWallet={connectedWallet} onDisconnect={disconnectWallet} />
  }

  return (
    <div className="newspaper-bg min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section with Poster */}
        <Card className="border-4 border-black shadow-2xl mb-8 overflow-hidden">
          <div className="relative">
            <Image
              src="/images/frontiertraderposter.jpg"
              alt="Frontier Trader - New Era in GameFi"
              width={1200}
              height={600}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-5xl font-serif font-bold mb-2 headline-primary">Frontier Trader</h1>
              <p className="text-xl font-serif mb-4">Where Old West Wisdom Meets Modern Trading</p>
              <Badge className="bg-purple-600 text-white text-lg px-4 py-2">⭐ NEW ERA IN GAMEFI ⭐</Badge>
            </div>
          </div>
        </Card>

        {/* Wallet Connection Section */}
        <Card className="border-4 border-black shadow-lg mb-8">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardTitle className="text-3xl font-serif flex items-center gap-3">
              <Wallet className="h-8 w-8" />
              Connect Your Frontier Wallet
            </CardTitle>
            <CardDescription className="text-purple-100 text-lg font-serif">
              Choose your preferred wallet to start trading on the digital frontier
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {wallets.map((wallet) => (
                <Card key={wallet.id} className="border-2 border-black hover:shadow-lg transition-all">
                  <CardHeader className="text-center">
                    <div className="text-6xl mb-3">{wallet.icon}</div>
                    <CardTitle className="font-serif text-xl">{wallet.name}</CardTitle>
                    <CardDescription className="font-serif">{wallet.description}</CardDescription>
                    <Badge variant="outline" className="mt-2">
                      {wallet.network}
                    </Badge>
                  </CardHeader>
                  <CardContent className="text-center">
                    {wallet.status === "connected" && wallet.address && (
                      <div className="mb-4">
                        <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                          <CheckCircle className="h-4 w-4" />
                          <span className="font-serif font-bold">Connected</span>
                        </div>
                        <div className="text-xs font-mono bg-gray-100 p-2 rounded border">
                          {wallet.address.substring(0, 6)}...{wallet.address.substring(wallet.address.length - 4)}
                        </div>
                      </div>
                    )}

                    {wallet.status === "connecting" && (
                      <div className="mb-4">
                        <div className="flex items-center justify-center gap-2 text-blue-600 mb-2">
                          <AlertCircle className="h-4 w-4 animate-spin" />
                          <span className="font-serif">Connecting...</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                    )}

                    <Button
                      onClick={getWalletConnector(wallet.id)}
                      disabled={wallet.status === "connecting"}
                      className={`w-full font-serif ${
                        wallet.status === "connected" ? "bg-green-600 hover:bg-green-700" : "frontier-button"
                      }`}
                    >
                      {wallet.status === "connected"
                        ? "✓ Connected"
                        : wallet.status === "connecting"
                          ? "Connecting..."
                          : "Connect Wallet"}
                    </Button>

                    {wallet.id === "coinbase" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-2 font-serif"
                        onClick={() => window.open("https://wallet.coinbase.com/", "_blank")}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Get Coinbase Wallet
                      </Button>
                    )}

                    {wallet.id === "phantom" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-2 font-serif"
                        onClick={() => window.open("https://phantom.app/", "_blank")}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Get Phantom Wallet
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {connectedWallet && (
              <Alert className="mt-6 border-green-500 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="font-serif text-green-800">
                  <strong>Wallet Connected!</strong> You can now access the full Frontier Trader experience.
                  <Button onClick={() => setShowDashboard(true)} className="ml-4 frontier-button" size="sm">
                    Enter Trading Dashboard →
                  </Button>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-black text-center">
            <CardContent className="p-6">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <h3 className="font-serif font-bold text-lg mb-2">Smart Trading</h3>
              <p className="font-serif text-sm">AI-powered insights from Bar Keep Bill</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-black text-center">
            <CardContent className="p-6">
              <Shield className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-serif font-bold text-lg mb-2">Secure Vaults</h3>
              <p className="font-serif text-sm">Multi-signature protection</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-black text-center">
            <CardContent className="p-6">
              <Zap className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
              <h3 className="font-serif font-bold text-lg mb-2">Lightning Fast</h3>
              <p className="font-serif text-sm">Instant cross-chain swaps</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-black text-center">
            <CardContent className="p-6">
              <Wallet className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <h3 className="font-serif font-bold text-lg mb-2">Multi-Chain</h3>
              <p className="font-serif text-sm">Avalanche, Solana, Ethereum</p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="border-4 border-black bg-gradient-to-r from-purple-100 to-pink-100">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-serif font-bold mb-4 headline-secondary">
              Ready to Trade Like a Frontier Legend?
            </h2>
            <p className="font-serif text-lg mb-6">
              Connect your wallet above and let Bar Keep Bill guide you through the digital frontier
            </p>
            <div className="flex justify-center gap-4">
              <Button className="frontier-button font-serif text-lg px-8 py-3">🤠 Start Trading Now</Button>
              <Button variant="outline" className="font-serif text-lg px-8 py-3 border-2 border-black">
                📖 Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
