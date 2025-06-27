"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wallet, ExternalLink, CheckCircle, AlertCircle, Loader2, Copy, QrCode, Shield } from "lucide-react"
import { avalancheIntegration } from "@/lib/integrations/avalanche-integration"
import { trackWalletConnection } from "@/lib/supabase/client"

interface WalletProvider {
  id: string
  name: string
  icon: string
  description: string
  type: "native" | "external" | "browser"
  connectUrl?: string
  isInstalled?: boolean
  color: string
}

interface WalletConnection {
  provider: string
  address: string
  balance: string
  chainId?: string
  networkName?: string
  connected: boolean
}

const walletProviders: WalletProvider[] = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "🦊",
    description: "Connect using MetaMask browser extension",
    type: "browser",
    color: "bg-orange-500",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "🔵",
    description: "Connect using Coinbase Wallet",
    type: "browser",
    color: "bg-blue-500",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "📱",
    description: "Connect using mobile wallet via QR code",
    type: "native",
    color: "bg-purple-500",
  },
  {
    id: "phantom",
    name: "Phantom",
    icon: "👻",
    description: "Connect using Phantom wallet",
    type: "browser",
    color: "bg-purple-600",
  },
  {
    id: "deso",
    name: "DESO",
    icon: "💎",
    description: "Decentralized social blockchain wallet",
    type: "external",
    connectUrl: "https://deso.org/",
    color: "bg-pink-500",
  },
  {
    id: "muse",
    name: "Muse",
    icon: "🎭",
    description: "Creative NFT marketplace wallet",
    type: "external",
    connectUrl: "https://muse.place/",
    color: "bg-indigo-500",
  },
  {
    id: "core",
    name: "Core Wallet",
    icon: "⚡",
    description: "Avalanche native wallet",
    type: "browser",
    color: "bg-red-500",
  },
  {
    id: "rabby",
    name: "Rabby",
    icon: "🐰",
    description: "Multi-chain browser wallet",
    type: "browser",
    color: "bg-green-500",
  },
]

export default function WalletConnect() {
  const [connections, setConnections] = useState<WalletConnection[]>([])
  const [connecting, setConnecting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showQR, setShowQR] = useState(false)
  const [installedWallets, setInstalledWallets] = useState<string[]>([])

  // Check for installed wallets on component mount
  useEffect(() => {
    const checkInstalledWallets = () => {
      const installed: string[] = []

      if (typeof window !== "undefined") {
        if (window.ethereum?.isMetaMask) installed.push("metamask")
        if (window.ethereum?.isCoinbaseWallet) installed.push("coinbase")
        if (window.solana?.isPhantom) installed.push("phantom")
        if (window.avalanche) installed.push("core")
        if (window.rabby) installed.push("rabby")
      }

      setInstalledWallets(installed)
    }

    checkInstalledWallets()
  }, [])

  const connectWallet = async (providerId: string) => {
    setConnecting(providerId)
    setError(null)
    setSuccess(null)

    try {
      let connection: WalletConnection | null = null

      switch (providerId) {
        case "metamask":
        case "coinbase":
        case "core":
          connection = await connectEthereumWallet(providerId)
          break
        case "phantom":
          connection = await connectSolanaWallet()
          break
        case "walletconnect":
          setShowQR(true)
          connection = await connectWalletConnect()
          break
        default:
          throw new Error(`Wallet ${providerId} not supported for direct connection`)
      }

      if (connection) {
        setConnections((prev) => {
          const filtered = prev.filter((c) => c.provider !== providerId)
          return [...filtered, connection!]
        })

        // Track connection in Supabase
        await trackWalletConnection("anonymous", providerId, "connected")

        setSuccess(`Successfully connected ${providerId}!`)
      }
    } catch (err: any) {
      console.error(`Failed to connect ${providerId}:`, err)
      setError(err.message || `Failed to connect to ${providerId}`)

      // Track failed connection
      await trackWalletConnection("anonymous", providerId, "failed")
    } finally {
      setConnecting(null)
      setShowQR(false)
    }
  }

  const connectEthereumWallet = async (providerId: string): Promise<WalletConnection> => {
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error("No Ethereum wallet detected. Please install MetaMask or Core Wallet.")
    }

    // Request account access
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })

    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found. Please unlock your wallet.")
    }

    // Switch to Avalanche network
    await avalancheIntegration.connectToAvalanche()

    // Get balance
    const balance = await avalancheIntegration.getBalance(accounts[0])

    return {
      provider: providerId,
      address: accounts[0],
      balance: balance,
      chainId: "43114",
      networkName: "Avalanche C-Chain",
      connected: true,
    }
  }

  const connectSolanaWallet = async (): Promise<WalletConnection> => {
    if (typeof window === "undefined" || !window.solana?.isPhantom) {
      throw new Error("Phantom wallet not detected. Please install Phantom.")
    }

    const response = await window.solana.connect()
    const balance = await window.solana.getBalance(response.publicKey)

    return {
      provider: "phantom",
      address: response.publicKey.toString(),
      balance: (balance / 1e9).toFixed(4), // Convert lamports to SOL
      chainId: "solana-mainnet",
      networkName: "Solana Mainnet",
      connected: true,
    }
  }

  const connectWalletConnect = async (): Promise<WalletConnection> => {
    // Simulate WalletConnect flow
    await new Promise((resolve) => setTimeout(resolve, 3000))

    return {
      provider: "walletconnect",
      address: "0x" + Math.random().toString(16).substr(2, 40),
      balance: (Math.random() * 10).toFixed(4),
      chainId: "43114",
      networkName: "Avalanche C-Chain",
      connected: true,
    }
  }

  const openExternalWallet = (url: string, name: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
    setSuccess(`Opened ${name} in new tab. Please connect there and return.`)
  }

  const disconnectWallet = (providerId: string) => {
    setConnections((prev) => prev.filter((c) => c.provider !== providerId))
    setSuccess(`Disconnected from ${providerId}`)
  }

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    setSuccess("Address copied to clipboard!")
  }

  const getWalletProvider = (id: string) => walletProviders.find((p) => p.id === id)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-amber-900">
            <Wallet className="mr-3 h-8 w-8" />
            Wallet Connection Hub
          </CardTitle>
          <CardDescription className="text-amber-700">
            Connect your favorite wallets to access WyoVerse features, trade STONES, and participate in games.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Status Messages */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {/* Connected Wallets */}
      {connections.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-amber-900">
              <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
              Connected Wallets ({connections.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {connections.map((connection) => {
              const provider = getWalletProvider(connection.provider)
              return (
                <div
                  key={connection.provider}
                  className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full ${provider?.color} flex items-center justify-center text-white text-lg`}
                    >
                      {provider?.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{provider?.name}</div>
                      <div className="text-sm text-gray-600">
                        {connection.address.slice(0, 6)}...{connection.address.slice(-4)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Balance: {connection.balance} {connection.provider === "phantom" ? "SOL" : "AVAX"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => copyAddress(connection.address)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => disconnectWallet(connection.provider)}>
                      Disconnect
                    </Button>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}

      {/* Available Wallets */}
      <Card>
        <CardHeader>
          <CardTitle className="text-amber-900">Available Wallets</CardTitle>
          <CardDescription>Choose from browser extensions, mobile wallets, or external platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {walletProviders.map((provider) => {
              const isConnected = connections.some((c) => c.provider === provider.id)
              const isInstalled = installedWallets.includes(provider.id)
              const isConnecting = connecting === provider.id

              return (
                <Card
                  key={provider.id}
                  className={`relative transition-all duration-200 hover:shadow-md ${
                    isConnected ? "bg-green-50 border-green-200" : "hover:bg-gray-50"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className={`w-12 h-12 rounded-full ${provider.color} flex items-center justify-center text-white text-xl`}
                      >
                        {provider.icon}
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        {isConnected && <Badge className="bg-green-600 text-white">Connected</Badge>}
                        {provider.type === "browser" && isInstalled && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Installed
                          </Badge>
                        )}
                        {provider.type === "external" && (
                          <Badge variant="outline" className="text-blue-600 border-blue-600">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            External
                          </Badge>
                        )}
                      </div>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-1">{provider.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{provider.description}</p>

                    {provider.type === "external" ? (
                      <Button
                        className="w-full bg-transparent"
                        variant="outline"
                        onClick={() => openExternalWallet(provider.connectUrl!, provider.name)}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Open {provider.name}
                      </Button>
                    ) : isConnected ? (
                      <Button
                        className="w-full bg-transparent"
                        variant="outline"
                        onClick={() => disconnectWallet(provider.id)}
                      >
                        Disconnect
                      </Button>
                    ) : (
                      <Button
                        className="w-full"
                        onClick={() => connectWallet(provider.id)}
                        disabled={isConnecting || (provider.type === "browser" && !isInstalled)}
                      >
                        {isConnecting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Connecting...
                          </>
                        ) : provider.type === "browser" && !isInstalled ? (
                          "Not Installed"
                        ) : (
                          <>
                            <Wallet className="mr-2 h-4 w-4" />
                            Connect
                          </>
                        )}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* QR Code Modal */}
      {showQR && (
        <Card className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <CardContent className="bg-white p-8 rounded-lg max-w-sm mx-4">
            <div className="text-center">
              <QrCode className="h-16 w-16 mx-auto mb-4 text-purple-600" />
              <h3 className="text-lg font-semibold mb-2">Scan QR Code</h3>
              <p className="text-gray-600 mb-4">Open your mobile wallet and scan the QR code to connect</p>
              <div className="w-48 h-48 bg-gray-100 mx-auto mb-4 rounded-lg flex items-center justify-center">
                <div className="text-gray-500">QR Code Placeholder</div>
              </div>
              <Button variant="outline" onClick={() => setShowQR(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-900">
            <Shield className="mr-2 h-5 w-5" />
            Wallet Security Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-blue-800">
          <p>• Never share your private keys or seed phrases</p>
          <p>• Always verify the website URL before connecting</p>
          <p>• Use hardware wallets for large amounts</p>
          <p>• Keep your wallet software updated</p>
          <p>• Double-check transaction details before signing</p>
        </CardContent>
      </Card>
    </div>
  )
}
