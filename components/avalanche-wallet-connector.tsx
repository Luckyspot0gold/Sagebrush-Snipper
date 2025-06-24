"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, AlertCircle, CheckCircle } from "lucide-react"

interface WalletState {
  address: string | null
  balance: string | null
  isConnected: boolean
  isLoading: boolean
  error: string | null
}

export function AvalancheWalletConnector() {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    balance: null,
    isConnected: false,
    isLoading: false,
    error: null,
  })

  const connectWallet = async () => {
    setWallet((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("MetaMask not installed. Please install MetaMask to continue.")
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found. Please unlock your wallet.")
      }

      // Switch to Avalanche network
      await switchToAvalanche()

      // Get balance
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })

      const formattedBalance = formatBalance(balance)

      setWallet({
        address: accounts[0],
        balance: formattedBalance,
        isConnected: true,
        isLoading: false,
        error: null,
      })

      // Store in localStorage for persistence
      localStorage.setItem(
        "wyoverse_wallet",
        JSON.stringify({
          address: accounts[0],
          balance: formattedBalance,
          timestamp: Date.now(),
        }),
      )

      console.log(`🤠 Frontier wallet connected! Balance: ${formattedBalance} AVAX`)
    } catch (error: any) {
      console.error("Wallet connection failed:", error)
      setWallet((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Failed to connect wallet",
      }))
    }
  }

  const switchToAvalanche = async () => {
    const chainId = "0xA86A" // Avalanche C-Chain (43114)

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      })
    } catch (switchError: any) {
      // Chain not added to wallet
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId,
              chainName: "Avalanche C-Chain",
              rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
              nativeCurrency: {
                name: "AVAX",
                symbol: "AVAX",
                decimals: 18,
              },
              blockExplorerUrls: ["https://snowtrace.io/"],
            },
          ],
        })
      } else {
        throw switchError
      }
    }
  }

  const formatBalance = (hexBalance: string): string => {
    const balance = Number.parseInt(hexBalance, 16)
    return (balance / Math.pow(10, 18)).toFixed(4)
  }

  const disconnectWallet = () => {
    setWallet({
      address: null,
      balance: null,
      isConnected: false,
      isLoading: false,
      error: null,
    })
    localStorage.removeItem("wyoverse_wallet")
  }

  // Check for existing connection on mount
  useEffect(() => {
    const savedWallet = localStorage.getItem("wyoverse_wallet")
    if (savedWallet) {
      try {
        const parsed = JSON.parse(savedWallet)
        // Check if connection is less than 1 hour old
        if (Date.now() - parsed.timestamp < 3600000) {
          setWallet({
            address: parsed.address,
            balance: parsed.balance,
            isConnected: true,
            isLoading: false,
            error: null,
          })
        }
      } catch (error) {
        console.error("Failed to restore wallet connection:", error)
      }
    }
  }, [])

  return (
    <Card className="border-4 border-black shadow-lg">
      <CardHeader className="border-b-2 border-black bg-amber-50">
        <CardTitle className="text-xl font-serif flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Avalanche Frontier Wallet
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {!wallet.isConnected ? (
          <div className="space-y-4">
            <p className="font-serif text-gray-700">
              Connect your Avalanche wallet to start trading on the digital frontier!
            </p>

            {wallet.error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-700">{wallet.error}</span>
              </div>
            )}

            <Button onClick={connectWallet} disabled={wallet.isLoading} className="w-full frontier-button font-serif">
              {wallet.isLoading ? "Connecting..." : "Connect Avalanche Wallet"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-700 font-serif">Wallet Connected Successfully!</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-serif text-gray-600">Address:</span>
                <Badge variant="outline" className="font-mono text-xs">
                  {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-serif text-gray-600">Balance:</span>
                <Badge variant="default" className="font-serif">
                  {wallet.balance} AVAX
                </Badge>
              </div>
            </div>

            <Button onClick={disconnectWallet} variant="outline" className="w-full font-serif">
              Disconnect Wallet
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
