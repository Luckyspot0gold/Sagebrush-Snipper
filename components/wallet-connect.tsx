"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, ExternalLink, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { linkWalletToProfile } from "@/lib/supabase/client"

interface WalletProvider {
  id: string
  name: string
  icon: string
  type: "native" | "external"
  url?: string
  description: string
  supported: boolean
}

interface WalletConnection {
  address: string
  balance: number
  connected: boolean
  provider: string
}

const WALLET_PROVIDERS: WalletProvider[] = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "🦊",
    type: "native",
    description: "Most popular Ethereum wallet",
    supported: true,
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "🔵",
    type: "native",
    description: "Coinbase's self-custody wallet",
    supported: true,
  },
  {
    id: "phantom",
    name: "Phantom",
    icon: "👻",
    type: "native",
    description: "Leading Solana wallet",
    supported: true,
  },
  {
    id: "core",
    name: "Core Wallet",
    icon: "🔥",
    type: "native",
    description: "Avalanche ecosystem wallet",
    supported: true,
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "🔗",
    type: "native",
    description: "Connect any mobile wallet",
    supported: true,
  },
  {
    id: "trust",
    name: "Trust Wallet",
    icon: "🛡️",
    type: "native",
    description: "Multi-chain mobile wallet",
    supported: true,
  },
  {
    id: "deso",
    name: "DESO",
    icon: "💎",
    type: "external",
    url: "https://deso.org/",
    description: "Decentralized social blockchain",
    supported: false,
  },
  {
    id: "muse",
    name: "Muse",
    icon: "🎨",
    type: "external",
    url: "https://muse.place/",
    description: "NFT marketplace and wallet",
    supported: false,
  },
]

export function WalletConnect() {
  const [connections, setConnections] = useState<Record<string, WalletConnection>>({})
  const [connecting, setConnecting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showQR, setShowQR] = useState(false)

  const connectWallet = async (provider: WalletProvider) => {
    if (provider.type === "external") {
      window.open(provider.url, "_blank")
      return
    }

    setConnecting(provider.id)
    setError(null)

    try {
      let connection: WalletConnection | null = null

      switch (provider.id) {
        case "metamask":
          connection = await connectMetaMask()
          break
        case "coinbase":
          connection = await connectCoinbase()
          break
        case "phantom":
          connection = await connectPhantom()
          break
        case "core":
          connection = await connectCore()
          break
        case "walletconnect":
          connection = await connectWalletConnect()
          break
        case "trust":
          connection = await connectTrust()
          break
      }

      if (connection) {
        setConnections((prev) => ({
          ...prev,
          [provider.id]: connection,
        }))

        // Track connection in Supabase
        await linkWalletToProfile("demo-user", {
          [provider.id]: connection,
        })
      }
    } catch (err) {
      setError(`Failed to connect ${provider.name}: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setConnecting(null)
    }
  }

  const connectMetaMask = async (): Promise<WalletConnection> => {
    if (typeof window.ethereum === "undefined") {
      throw new Error("MetaMask not installed")
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })

    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [accounts[0], "latest"],
    })

    return {
      address: accounts[0],
      balance: Number.parseInt(balance, 16) / 1e18,
      connected: true,
      provider: "metamask",
    }
  }

  const connectCoinbase = async (): Promise<WalletConnection> => {
    // Coinbase Wallet SDK integration
    if (typeof window.ethereum === "undefined") {
      throw new Error("Coinbase Wallet not available")
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })

    return {
      address: accounts[0],
      balance: Math.random() * 10, // Mock balance
      connected: true,
      provider: "coinbase",
    }
  }

  const connectPhantom = async (): Promise<WalletConnection> => {
    if (typeof window.solana === "undefined") {
      throw new Error("Phantom wallet not installed")
    }

    const response = await window.solana.connect()

    return {
      address: response.publicKey.toString(),
      balance: Math.random() * 5, // Mock SOL balance
      connected: true,
      provider: "phantom",
    }
  }

  const connectCore = async (): Promise<WalletConnection> => {
    // Core Wallet integration for Avalanche
    if (typeof window.avalanche === "undefined") {
      throw new Error("Core Wallet not installed")
    }

    const accounts = await window.avalanche.request({
      method: "eth_requestAccounts",
    })

    return {
      address: accounts[0],
      balance: Math.random() * 20, // Mock AVAX balance
      connected: true,
      provider: "core",
    }
  }

  const connectWalletConnect = async (): Promise<WalletConnection> => {
    setShowQR(true)

    // Simulate QR code connection
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setShowQR(false)

    return {
      address: "0x" + Math.random().toString(16).substr(2, 40),
      balance: Math.random() * 15,
      connected: true,
      provider: "walletconnect",
    }
  }

  const connectTrust = async (): Promise<WalletConnection> => {
    // Trust Wallet deep link
    const deepLink = `trust://wallet_connect?uri=${encodeURIComponent(window.location.href)}`
    window.open(deepLink, "_blank")

    // Mock connection after delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return {
      address: "0x" + Math.random().toString(16).substr(2, 40),
      balance: Math.random() * 8,
      connected: true,
      provider: "trust",
    }
  }

  const disconnectWallet = (providerId: string) => {
    setConnections((prev) => {
      const updated = { ...prev }
      delete updated[providerId]
      return updated
    })
  }

  const getTotalBalance = () => {
    return Object.values(connections).reduce((total, conn) => total + conn.balance, 0)
  }

  const getConnectionCount = () => {
    return Object.keys(connections).length
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Connection Hub
          </CardTitle>
          <CardDescription>Connect your wallets to access all WyoVerse features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{getConnectionCount()}</div>
              <div className="text-sm text-gray-600">Connected Wallets</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">${getTotalBalance().toFixed(2)}</div>
              <div className="text-sm text-gray-600">Total Balance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {WALLET_PROVIDERS.filter((p) => p.supported).length}
              </div>
              <div className="text-sm text-gray-600">Supported Wallets</div>
            </div>
          </div>

          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {showQR && (
            <Alert className="mb-4 border-blue-200 bg-blue-50">
              <Loader2 className="h-4 w-4 animate-spin" />
              <AlertDescription>Scan QR code with your mobile wallet to connect...</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="connect" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="connect">Connect Wallets</TabsTrigger>
          <TabsTrigger value="connected">Connected ({getConnectionCount()})</TabsTrigger>
          <TabsTrigger value="security">Security Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="connect" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WALLET_PROVIDERS.map((provider) => (
              <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{provider.icon}</span>
                      <span className="font-semibold">{provider.name}</span>
                    </div>
                    {connections[provider.id] ? (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    ) : provider.supported ? (
                      <Badge variant="outline">Available</Badge>
                    ) : (
                      <Badge variant="secondary">External</Badge>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{provider.description}</p>

                  {connections[provider.id] ? (
                    <div className="space-y-2">
                      <div className="text-xs font-mono bg-gray-100 p-2 rounded">
                        {connections[provider.id].address.slice(0, 6)}...
                        {connections[provider.id].address.slice(-4)}
                      </div>
                      <div className="text-sm">Balance: {connections[provider.id].balance.toFixed(4)}</div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => disconnectWallet(provider.id)}
                        className="w-full"
                      >
                        Disconnect
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => connectWallet(provider)}
                      disabled={connecting === provider.id}
                      className="w-full"
                      variant={provider.type === "external" ? "outline" : "default"}
                    >
                      {connecting === provider.id ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : provider.type === "external" ? (
                        <>
                          Visit {provider.name}
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </>
                      ) : (
                        `Connect ${provider.name}`
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="connected" className="space-y-4">
          {getConnectionCount() === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Wallet className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">No Wallets Connected</h3>
                <p className="text-gray-600 mb-4">Connect your first wallet to get started with WyoVerse</p>
                <Button onClick={() => document.querySelector('[value="connect"]')?.click()}>Connect Wallet</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {Object.entries(connections).map(([providerId, connection]) => {
                const provider = WALLET_PROVIDERS.find((p) => p.id === providerId)
                return (
                  <Card key={providerId}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{provider?.icon}</span>
                          <div>
                            <div className="font-semibold">{provider?.name}</div>
                            <div className="text-sm font-mono text-gray-600">
                              {connection.address.slice(0, 8)}...{connection.address.slice(-6)}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{connection.balance.toFixed(4)}</div>
                          <div className="text-sm text-gray-600">Balance</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🔒 Security Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-semibold">Never share your seed phrase</div>
                    <div className="text-sm text-gray-600">
                      Your seed phrase is the key to your wallet. Never share it with anyone.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-semibold">Verify URLs before connecting</div>
                    <div className="text-sm text-gray-600">
                      Always check that you're on the correct website before connecting your wallet.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-semibold">Use hardware wallets for large amounts</div>
                    <div className="text-sm text-gray-600">
                      Consider using a hardware wallet for storing significant amounts of crypto.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-semibold">Keep your wallet software updated</div>
                    <div className="text-sm text-gray-600">
                      Regular updates include important security fixes and improvements.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default WalletConnect
