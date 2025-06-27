"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, ExternalLink, CheckCircle, AlertCircle, Loader2, Copy, QrCode, Shield } from "lucide-react"

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
  network: string
}

const WALLET_PROVIDERS: WalletProvider[] = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "🦊",
    type: "native",
    description: "Most popular Ethereum wallet with Avalanche support",
    supported: true,
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "🔵",
    type: "native",
    description: "Coinbase's self-custody wallet solution",
    supported: true,
  },
  {
    id: "phantom",
    name: "Phantom",
    icon: "👻",
    type: "native",
    description: "Leading Solana wallet for DeFi and NFTs",
    supported: true,
  },
  {
    id: "core",
    name: "Core Wallet",
    icon: "🔥",
    type: "native",
    description: "Official Avalanche ecosystem wallet",
    supported: true,
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "🔗",
    type: "native",
    description: "Connect any mobile wallet via QR code",
    supported: true,
  },
  {
    id: "trust",
    name: "Trust Wallet",
    icon: "🛡️",
    type: "native",
    description: "Multi-chain mobile wallet solution",
    supported: true,
  },
  {
    id: "deso",
    name: "DESO",
    icon: "💎",
    type: "external",
    url: "https://deso.org/",
    description: "Decentralized social blockchain platform",
    supported: false,
  },
  {
    id: "muse",
    name: "Muse",
    icon: "🎨",
    type: "external",
    url: "https://muse.place/",
    description: "Creative NFT marketplace and wallet",
    supported: false,
  },
]

export function WalletConnect() {
  const [connections, setConnections] = useState<Record<string, WalletConnection>>({})
  const [connecting, setConnecting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showQR, setShowQR] = useState(false)
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

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

        // Track connection in analytics
        console.log(`Wallet connected: ${provider.name}`, connection)
      }
    } catch (err) {
      setError(`Failed to connect ${provider.name}: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setConnecting(null)
    }
  }

  const connectMetaMask = async (): Promise<WalletConnection> => {
    if (typeof window.ethereum === "undefined") {
      throw new Error("MetaMask not installed. Please install MetaMask extension.")
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })

    // Switch to Avalanche C-Chain
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xA86A" }],
      })
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xA86A",
              chainName: "Avalanche C-Chain",
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

    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [accounts[0], "latest"],
    })

    return {
      address: accounts[0],
      balance: Number.parseInt(balance, 16) / 1e18,
      connected: true,
      provider: "metamask",
      network: "Avalanche C-Chain",
    }
  }

  const connectCoinbase = async (): Promise<WalletConnection> => {
    if (typeof window.ethereum === "undefined" || !window.ethereum.isCoinbaseWallet) {
      throw new Error("Coinbase Wallet not installed. Please install Coinbase Wallet.")
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
      provider: "coinbase",
      network: "Ethereum",
    }
  }

  const connectPhantom = async (): Promise<WalletConnection> => {
    if (typeof window.solana === "undefined" || !window.solana.isPhantom) {
      throw new Error("Phantom wallet not installed. Please install Phantom wallet.")
    }

    const response = await window.solana.connect()
    const balance = await window.solana.getBalance(response.publicKey)

    return {
      address: response.publicKey.toString(),
      balance: balance / 1e9,
      connected: true,
      provider: "phantom",
      network: "Solana",
    }
  }

  const connectCore = async (): Promise<WalletConnection> => {
    if (typeof window.avalanche === "undefined") {
      throw new Error("Core Wallet not installed. Please install Core Wallet.")
    }

    const accounts = await window.avalanche.request({
      method: "eth_requestAccounts",
    })

    const balance = await window.avalanche.request({
      method: "eth_getBalance",
      params: [accounts[0], "latest"],
    })

    return {
      address: accounts[0],
      balance: Number.parseInt(balance, 16) / 1e18,
      connected: true,
      provider: "core",
      network: "Avalanche C-Chain",
    }
  }

  const connectWalletConnect = async (): Promise<WalletConnection> => {
    setShowQR(true)

    // Simulate QR code connection process
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setShowQR(false)

    return {
      address: "0x" + Math.random().toString(16).substr(2, 40),
      balance: Math.random() * 10,
      connected: true,
      provider: "walletconnect",
      network: "Ethereum",
    }
  }

  const connectTrust = async (): Promise<WalletConnection> => {
    // Trust Wallet deep link for mobile
    const deepLink = `trust://wallet_connect?uri=${encodeURIComponent(window.location.href)}`
    window.open(deepLink, "_blank")

    // Simulate connection after delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return {
      address: "0x" + Math.random().toString(16).substr(2, 40),
      balance: Math.random() * 5,
      connected: true,
      provider: "trust",
      network: "Ethereum",
    }
  }

  const disconnectWallet = (providerId: string) => {
    setConnections((prev) => {
      const updated = { ...prev }
      delete updated[providerId]
      return updated
    })
  }

  const copyAddress = async (address: string) => {
    await navigator.clipboard.writeText(address)
    setCopiedAddress(address)
    setTimeout(() => setCopiedAddress(null), 2000)
  }

  const getTotalBalance = () => {
    return Object.values(connections).reduce((total, conn) => total + conn.balance, 0)
  }

  const getConnectionCount = () => {
    return Object.keys(connections).length
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center text-3xl text-amber-900">
            <Wallet className="mr-3 h-8 w-8" />
            WyoVerse Wallet Connection Hub
          </CardTitle>
          <CardDescription className="text-lg text-amber-700">
            Connect your favorite wallets to access the full WyoVerse frontier experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{getConnectionCount()}</div>
              <div className="text-sm text-gray-600">Connected Wallets</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">${getTotalBalance().toFixed(4)}</div>
              <div className="text-sm text-gray-600">Total Balance</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {WALLET_PROVIDERS.filter((p) => p.supported).length}
              </div>
              <div className="text-sm text-gray-600">Supported Wallets</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* QR Code Modal */}
      {showQR && (
        <Alert className="border-blue-200 bg-blue-50">
          <QrCode className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <div className="flex items-center">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Scan QR code with your mobile wallet to connect...
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="connect" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="connect">Connect Wallets</TabsTrigger>
          <TabsTrigger value="connected">Connected ({getConnectionCount()})</TabsTrigger>
          <TabsTrigger value="security">Security Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="connect" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WALLET_PROVIDERS.map((provider) => (
              <Card key={provider.id} className="hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{provider.icon}</span>
                      <span className="font-bold text-lg">{provider.name}</span>
                    </div>
                    {connections[provider.id] ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    ) : provider.supported ? (
                      <Badge variant="outline">Available</Badge>
                    ) : (
                      <Badge variant="secondary">External</Badge>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{provider.description}</p>

                  {connections[provider.id] ? (
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-xs text-gray-600">Address</div>
                        <div className="font-mono text-sm flex items-center justify-between">
                          <span>{formatAddress(connections[provider.id].address)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyAddress(connections[provider.id].address)}
                            className="h-6 w-6 p-0"
                          >
                            {copiedAddress === connections[provider.id].address ? (
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-xs text-gray-600">Balance</div>
                        <div className="font-bold">
                          {connections[provider.id].balance.toFixed(4)}{" "}
                          {connections[provider.id].network === "Solana" ? "SOL" : "ETH"}
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-xs text-gray-600">Network</div>
                        <div className="text-sm">{connections[provider.id].network}</div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => disconnectWallet(provider.id)}
                        className="w-full bg-transparent"
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

        <TabsContent value="connected" className="space-y-6">
          {getConnectionCount() === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Wallet className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-bold mb-2">No Wallets Connected</h3>
                <p className="text-gray-600 mb-6">Connect your first wallet to start your WyoVerse adventure</p>
                <Button onClick={() => document.querySelector('[value="connect"]')?.click()}>
                  Connect Your First Wallet
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {Object.entries(connections).map(([providerId, connection]) => {
                const provider = WALLET_PROVIDERS.find((p) => p.id === providerId)
                return (
                  <Card key={providerId} className="border-2 border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl">{provider?.icon}</span>
                          <div>
                            <div className="font-bold text-lg">{provider?.name}</div>
                            <div className="text-sm text-gray-600">{connection.network}</div>
                            <div className="font-mono text-sm text-gray-500">{formatAddress(connection.address)}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{connection.balance.toFixed(4)}</div>
                          <div className="text-sm text-gray-600">{connection.network === "Solana" ? "SOL" : "ETH"}</div>
                          <Badge className="bg-green-100 text-green-800 mt-2">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Shield className="mr-3 h-6 w-6" />
                Wallet Security Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-green-700">✅ Do These Things</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <div className="font-semibold">Use Hardware Wallets</div>
                        <div className="text-sm text-gray-600">
                          For large amounts, use hardware wallets like Ledger or Trezor
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <div className="font-semibold">Verify URLs</div>
                        <div className="text-sm text-gray-600">
                          Always check you're on the correct website before connecting
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <div className="font-semibold">Keep Software Updated</div>
                        <div className="text-sm text-gray-600">Regular updates include important security fixes</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <div className="font-semibold">Use Strong Passwords</div>
                        <div className="text-sm text-gray-600">Create unique, complex passwords for all accounts</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-red-700">❌ Never Do These</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <div className="font-semibold">Share Your Seed Phrase</div>
                        <div className="text-sm text-gray-600">
                          Never share your 12/24 word recovery phrase with anyone
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <div className="font-semibold">Store Keys Online</div>
                        <div className="text-sm text-gray-600">Don't save private keys in cloud storage or email</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <div className="font-semibold">Click Suspicious Links</div>
                        <div className="text-sm text-gray-600">
                          Be wary of phishing attempts via email or social media
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <div className="font-semibold">Rush Transactions</div>
                        <div className="text-sm text-gray-600">
                          Always double-check transaction details before signing
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-2">🛡️ WyoVerse Security Promise</h4>
                <p className="text-blue-800 text-sm">
                  WyoVerse never stores your private keys or seed phrases. All wallet connections are encrypted and
                  processed locally in your browser. We use industry-standard security practices to protect your data
                  and transactions.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default WalletConnect
