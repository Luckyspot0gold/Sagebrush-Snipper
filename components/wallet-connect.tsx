"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wallet, ExternalLink, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface WalletInfo {
  name: string
  icon: string
  status: "disconnected" | "connecting" | "connected" | "error"
  balance?: string
  address?: string
  type: "integrated" | "external"
  url?: string
}

export function WalletConnect() {
  const [wallets, setWallets] = useState<WalletInfo[]>([
    {
      name: "MetaMask",
      icon: "🦊",
      status: "disconnected",
      type: "integrated",
    },
    {
      name: "Coinbase Wallet",
      icon: "🔵",
      status: "disconnected",
      type: "integrated",
    },
    {
      name: "Phantom",
      icon: "👻",
      status: "disconnected",
      type: "integrated",
    },
    {
      name: "Core Wallet",
      icon: "🔥",
      status: "disconnected",
      type: "integrated",
    },
    {
      name: "WalletConnect",
      icon: "🔗",
      status: "disconnected",
      type: "integrated",
    },
    {
      name: "Trust Wallet",
      icon: "🛡️",
      status: "disconnected",
      type: "integrated",
    },
    {
      name: "DESO",
      icon: "💎",
      status: "disconnected",
      type: "external",
      url: "https://deso.org/",
    },
    {
      name: "Muse",
      icon: "🎨",
      status: "disconnected",
      type: "external",
      url: "https://muse.place/",
    },
  ])

  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  const connectWallet = async (walletName: string) => {
    const wallet = wallets.find((w) => w.name === walletName)
    if (!wallet) return

    if (wallet.type === "external" && wallet.url) {
      window.open(wallet.url, "_blank")
      return
    }

    setWallets((prev) => prev.map((w) => (w.name === walletName ? { ...w, status: "connecting" } : w)))

    try {
      let result
      switch (walletName) {
        case "MetaMask":
          result = await connectMetaMask()
          break
        case "Coinbase Wallet":
          result = await connectCoinbase()
          break
        case "Phantom":
          result = await connectPhantom()
          break
        case "Core Wallet":
          result = await connectCore()
          break
        case "WalletConnect":
          result = await connectWalletConnect()
          break
        case "Trust Wallet":
          result = await connectTrust()
          break
        default:
          throw new Error("Wallet not supported")
      }

      setWallets((prev) => prev.map((w) => (w.name === walletName ? { ...w, status: "connected", ...result } : w)))

      // Track connection in Supabase
      await trackWalletConnection(walletName, result.address)
    } catch (error) {
      console.error(`Failed to connect ${walletName}:`, error)
      setWallets((prev) => prev.map((w) => (w.name === walletName ? { ...w, status: "error" } : w)))
    }
  }

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })
      return {
        address: accounts[0],
        balance: `${(Number.parseInt(balance, 16) / 1e18).toFixed(4)} ETH`,
      }
    }
    throw new Error("MetaMask not installed")
  }

  const connectCoinbase = async () => {
    if (typeof window.ethereum !== "undefined" && window.ethereum.isCoinbaseWallet) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      return {
        address: accounts[0],
        balance: "0.0000 ETH",
      }
    }
    throw new Error("Coinbase Wallet not installed")
  }

  const connectPhantom = async () => {
    if (typeof window.solana !== "undefined" && window.solana.isPhantom) {
      const response = await window.solana.connect()
      return {
        address: response.publicKey.toString(),
        balance: "0.0000 SOL",
      }
    }
    throw new Error("Phantom Wallet not installed")
  }

  const connectCore = async () => {
    if (typeof window.avalanche !== "undefined") {
      const accounts = await window.avalanche.request({ method: "eth_requestAccounts" })
      return {
        address: accounts[0],
        balance: "0.0000 AVAX",
      }
    }
    throw new Error("Core Wallet not installed")
  }

  const connectWalletConnect = async () => {
    // WalletConnect implementation would go here
    return {
      address: "0x" + Math.random().toString(16).substr(2, 40),
      balance: "0.0000 ETH",
    }
  }

  const connectTrust = async () => {
    if (typeof window.ethereum !== "undefined" && window.ethereum.isTrust) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      return {
        address: accounts[0],
        balance: "0.0000 ETH",
      }
    }
    throw new Error("Trust Wallet not installed")
  }

  const trackWalletConnection = async (walletType: string, address: string) => {
    try {
      const response = await fetch("/api/wallet/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet_type: walletType,
          address: address,
          status: "connected",
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        console.error("Failed to track wallet connection")
      }
    } catch (error) {
      console.error("Error tracking wallet connection:", error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "connecting":
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Wallet className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800"
      case "connecting":
        return "bg-blue-100 text-blue-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-amber-900">Connect Your Wallet</h1>
        <p className="text-amber-700">Choose your preferred wallet to start trading in WyoVerse</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Always verify you're on the correct website before connecting your wallet. Never share your private keys or
          seed phrases.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wallets.map((wallet) => (
          <Card key={wallet.name} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{wallet.icon}</span>
                  <CardTitle className="text-lg">{wallet.name}</CardTitle>
                </div>
                {getStatusIcon(wallet.status)}
              </div>
              <Badge className={getStatusColor(wallet.status)}>
                {wallet.status.charAt(0).toUpperCase() + wallet.status.slice(1)}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {wallet.status === "connected" && wallet.address && (
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Address:</span>
                    <p className="font-mono text-xs break-all text-gray-600">{wallet.address}</p>
                  </div>
                  {wallet.balance && (
                    <div className="text-sm">
                      <span className="font-medium">Balance:</span>
                      <p className="font-mono text-green-600">{wallet.balance}</p>
                    </div>
                  )}
                </div>
              )}

              <Button
                onClick={() => connectWallet(wallet.name)}
                disabled={wallet.status === "connecting"}
                className="w-full"
                variant={wallet.status === "connected" ? "secondary" : "default"}
              >
                {wallet.type === "external" && <ExternalLink className="h-4 w-4 mr-2" />}
                {wallet.status === "connecting" && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {wallet.status === "connected"
                  ? "Connected"
                  : wallet.type === "external"
                    ? "Visit Platform"
                    : "Connect"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Security Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-600">
          <p>• Only connect wallets you trust and control</p>
          <p>• Verify all transaction details before signing</p>
          <p>• Keep your wallet software updated</p>
          <p>• Use hardware wallets for large amounts</p>
          <p>• Never share your private keys or seed phrases</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default WalletConnect
