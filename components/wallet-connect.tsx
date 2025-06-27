"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wallet, ExternalLink, CheckCircle, AlertCircle, Loader2, Copy, QrCode, Shield } from "lucide-react"
import { supabase, linkWalletToProfile, trackWalletConnection } from "@/lib/supabase/client"

interface WalletInfo {
  name: string
  icon: string
  type: "native" | "external"
  description: string
  url?: string
  color: string
}

const walletOptions: WalletInfo[] = [
  {
    name: "MetaMask",
    icon: "🦊",
    type: "native",
    description: "Connect to Avalanche C-Chain for AVAX transactions",
    color: "border-orange-400 bg-orange-50",
  },
  {
    name: "Coinbase Wallet",
    icon: "🔵",
    type: "native",
    description: "Secure wallet with built-in DeFi access",
    color: "border-blue-400 bg-blue-50",
  },
  {
    name: "Core Wallet",
    icon: "⚡",
    type: "native",
    description: "Official Avalanche wallet for full ecosystem access",
    color: "border-red-400 bg-red-50",
  },
  {
    name: "DESO",
    icon: "💎",
    type: "external",
    description: "Decentralized social blockchain platform",
    url: "https://deso.org/",
    color: "border-purple-400 bg-purple-50",
  },
  {
    name: "Muse",
    icon: "🎨",
    type: "external",
    description: "Creative NFT marketplace and wallet",
    url: "https://muse.place/",
    color: "border-pink-400 bg-pink-50",
  },
  {
    name: "Phantom",
    icon: "👻",
    type: "native",
    description: "Multi-chain wallet supporting Solana and Ethereum",
    color: "border-indigo-400 bg-indigo-50",
  },
]

interface ConnectedWallet {
  name: string
  address: string
  balance?: string
  network?: string
}

export default function WalletConnect() {
  const [connectedWallets, setConnectedWallets] = useState<ConnectedWallet[]>([])
  const [isConnecting, setIsConnecting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [showQR, setShowQR] = useState<string | null>(null)

  useEffect(() => {
    // Get current user
    const getCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getCurrentUser()
  }, [])

  const connectMetaMask = async () => {
    setIsConnecting("MetaMask")
    setError(null)

    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not installed")
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length === 0) {
        throw new Error("No accounts found")
      }

      // Switch to Avalanche C-Chain
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xA86A" }], // Avalanche C-Chain
        })
      } catch (switchError: any) {
        // Chain not added, add it
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

      // Get balance
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })

      const avaxBalance = (Number.parseInt(balance, 16) / 1e18).toFixed(4)

      const walletInfo: ConnectedWallet = {
        name: "MetaMask",
        address: accounts[0],
        balance: `${avaxBalance} AVAX`,
        network: "Avalanche C-Chain",
      }

      setConnectedWallets((prev) => [...prev.filter((w) => w.name !== "MetaMask"), walletInfo])

      // Track connection in Supabase
      if (user) {
        await linkWalletToProfile(user.id, { metamask: walletInfo })
        await trackWalletConnection(user.id, "MetaMask", "connected")
      }
    } catch (err: any) {
      setError(`MetaMask connection failed: ${err.message}`)
      if (err.message.includes("not installed")) {
        setShowQR("MetaMask")
      }
    } finally {
      setIsConnecting(null)
    }
  }

  const connectCoinbaseWallet = async () => {
    setIsConnecting("Coinbase Wallet")
    setError(null)

    try {
      if (!window.ethereum || !window.ethereum.isCoinbaseWallet) {
        throw new Error("Coinbase Wallet not installed")
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length === 0) {
        throw new Error("No accounts found")
      }

      const walletInfo: ConnectedWallet = {
        name: "Coinbase Wallet",
        address: accounts[0],
        network: "Ethereum",
      }

      setConnectedWallets((prev) => [...prev.filter((w) => w.name !== "Coinbase Wallet"), walletInfo])

      if (user) {
        await linkWalletToProfile(user.id, { coinbase: walletInfo })
        await trackWalletConnection(user.id, "Coinbase Wallet", "connected")
      }
    } catch (err: any) {
      setError(`Coinbase Wallet connection failed: ${err.message}`)
      if (err.message.includes("not installed")) {
        setShowQR("Coinbase Wallet")
      }
    } finally {
      setIsConnecting(null)
    }
  }

  const connectPhantom = async () => {
    setIsConnecting("Phantom")
    setError(null)

    try {
      if (!window.solana || !window.solana.isPhantom) {
        throw new Error("Phantom wallet not installed")
      }

      const response = await window.solana.connect()

      const walletInfo: ConnectedWallet = {
        name: "Phantom",
        address: response.publicKey.toString(),
        network: "Solana",
      }

      setConnectedWallets((prev) => [...prev.filter((w) => w.name !== "Phantom"), walletInfo])

      if (user) {
        await linkWalletToProfile(user.id, { phantom: walletInfo })
        await trackWalletConnection(user.id, "Phantom", "connected")
      }
    } catch (err: any) {
      setError(`Phantom connection failed: ${err.message}`)
      if (err.message.includes("not installed")) {
        setShowQR("Phantom")
      }
    } finally {
      setIsConnecting(null)
    }
  }

  const handleWalletConnect = async (wallet: WalletInfo) => {
    if (wallet.type === "external") {
      window.open(wallet.url, "_blank")
      return
    }

    switch (wallet.name) {
      case "MetaMask":
        await connectMetaMask()
        break
      case "Coinbase Wallet":
        await connectCoinbaseWallet()
        break
      case "Phantom":
        await connectPhantom()
        break
      case "Core Wallet":
        window.open("https://core.app/", "_blank")
        break
      default:
        setError(`${wallet.name} connection not yet implemented`)
    }
  }

  const disconnectWallet = async (walletName: string) => {
    setConnectedWallets((prev) => prev.filter((w) => w.name !== walletName))

    if (user) {
      await trackWalletConnection(user.id, walletName, "disconnected")
    }
  }

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Wallet className="h-8 w-8 text-blue-600" />
            <div>
              <CardTitle className="text-2xl font-bold text-blue-800">WyoVerse Wallet Manager</CardTitle>
              <CardDescription className="text-blue-600">
                Connect your wallets to access the full WyoVerse ecosystem
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Connected Wallets */}
      {connectedWallets.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              Connected Wallets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {connectedWallets.map((wallet, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{walletOptions.find((w) => w.name === wallet.name)?.icon}</div>
                    <div>
                      <div className="font-semibold">{wallet.name}</div>
                      <div className="text-sm text-gray-600 flex items-center space-x-2">
                        <span>{formatAddress(wallet.address)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyAddress(wallet.address)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      {wallet.balance && <div className="text-sm font-medium text-green-600">{wallet.balance}</div>}
                      {wallet.network && (
                        <Badge variant="secondary" className="text-xs">
                          {wallet.network}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => disconnectWallet(wallet.name)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Disconnect
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Wallets */}
      <Card>
        <CardHeader>
          <CardTitle>Available Wallets</CardTitle>
          <CardDescription>Choose from our supported wallet providers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {walletOptions.map((wallet, index) => {
              const isConnected = connectedWallets.some((w) => w.name === wallet.name)
              const isLoading = isConnecting === wallet.name

              return (
                <Card key={index} className={`${wallet.color} transition-all hover:shadow-md`}>
                  <CardContent className="p-4">
                    <div className="text-center space-y-3">
                      <div className="text-4xl">{wallet.icon}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{wallet.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{wallet.description}</p>
                      </div>

                      {isConnected ? (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Connected
                        </Badge>
                      ) : (
                        <Button
                          onClick={() => handleWalletConnect(wallet)}
                          disabled={isLoading}
                          className="w-full"
                          variant={wallet.type === "external" ? "outline" : "default"}
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : wallet.type === "external" ? (
                            <ExternalLink className="h-4 w-4 mr-2" />
                          ) : (
                            <Wallet className="h-4 w-4 mr-2" />
                          )}
                          {wallet.type === "external" ? "Visit" : "Connect"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* QR Code Modal */}
      {showQR && (
        <Card className="border-2 border-yellow-400 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <QrCode className="h-5 w-5 mr-2" />
              Wallet Not Installed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p>{showQR} is not installed. You can install it or use the mobile app:</p>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => {
                    if (showQR === "MetaMask") {
                      window.open("https://metamask.io/download/", "_blank")
                    } else if (showQR === "Coinbase Wallet") {
                      window.open("https://www.coinbase.com/wallet", "_blank")
                    } else if (showQR === "Phantom") {
                      window.open("https://phantom.app/", "_blank")
                    }
                  }}
                >
                  Install {showQR}
                </Button>
                <Button variant="outline" onClick={() => setShowQR(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Notice */}
      <Card className="border border-gray-300 bg-gray-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-gray-600 mt-0.5" />
            <div className="text-sm text-gray-600">
              <p className="font-semibold mb-1">Security Notice:</p>
              <p>
                Your wallet connections are encrypted and stored securely. WyoVerse never has access to your private
                keys or funds. Always verify you're on the official WyoVerse domain before connecting wallets.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
