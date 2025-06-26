"use client"

import { useState } from "react"
import { FrontierTraderDashboard } from "@/components/frontier-trader-dashboard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, ExternalLink, CheckCircle } from "lucide-react"

export default function FrontierTraderPage() {
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState<string | null>(null)

  const connectAvalanche = async () => {
    setIsConnecting("avalanche")
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })

        // Switch to Avalanche network
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xA86A" }], // Avalanche C-Chain
          })
        } catch (switchError: any) {
          // Add Avalanche network if not present
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0xA86A",
                  chainName: "Avalanche Network",
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
          }
        }

        setConnectedWallet(`Avalanche: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`)
      } else {
        alert("Please install MetaMask to connect to Avalanche!")
      }
    } catch (error) {
      console.error("Avalanche connection failed:", error)
      alert("Failed to connect to Avalanche network")
    }
    setIsConnecting(null)
  }

  const connectCoinbase = async () => {
    setIsConnecting("coinbase")
    try {
      // Coinbase Wallet connection
      if (typeof window !== "undefined") {
        // Open Coinbase Wallet
        window.open("https://wallet.coinbase.com/", "_blank")

        // Simulate connection for demo
        setTimeout(() => {
          setConnectedWallet("Coinbase: Connected")
          setIsConnecting(null)
        }, 2000)
      }
    } catch (error) {
      console.error("Coinbase connection failed:", error)
      alert("Failed to connect to Coinbase Wallet")
      setIsConnecting(null)
    }
  }

  const connectPhantom = async () => {
    setIsConnecting("phantom")
    try {
      // Check if Phantom is installed
      if (typeof window !== "undefined" && (window as any).solana?.isPhantom) {
        const response = await (window as any).solana.connect()
        setConnectedWallet(
          `Phantom: ${response.publicKey.toString().slice(0, 6)}...${response.publicKey.toString().slice(-4)}`,
        )
      } else {
        // Open Phantom website if not installed
        window.open("https://phantom.app/", "_blank")
        alert("Please install Phantom Wallet for Solana connections!")
      }
    } catch (error) {
      console.error("Phantom connection failed:", error)
      alert("Failed to connect to Phantom Wallet")
    }
    setIsConnecting(null)
  }

  const disconnectWallet = () => {
    setConnectedWallet(null)
  }

  return (
    <main className="container mx-auto p-6 space-y-6">
      {/* Hero Poster */}
      <div className="relative w-full h-96 mb-8 overflow-hidden rounded-lg border-4 border-amber-800">
        <img
          src="/images/frontiertraderposter.jpg"
          alt="Frontier Trader - New Era in GameFi"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Header */}
      <div className="text-center border-4 border-black p-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <h1 className="headline-primary text-4xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          🤠 FRONTIER TRADER 🤠
        </h1>
        <p className="headline-secondary text-xl mb-2 text-purple-300">
          "NEW ERA IN GAMEFI - Where Digital Gold Meets Pioneer Grit"
        </p>
        <p className="body-text text-gray-300">Advanced trading platform for the modern frontier</p>
      </div>

      {/* Wallet Connection Section */}
      <Card className="border-4 border-amber-800 bg-gradient-to-r from-amber-50 to-yellow-50">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-amber-900 flex items-center justify-center gap-2">
            <Wallet className="h-6 w-6" />
            Connect Your Frontier Wallet
          </CardTitle>
          <p className="text-center text-amber-700">
            Choose your preferred wallet to start trading on the digital frontier
          </p>
        </CardHeader>
        <CardContent>
          {connectedWallet ? (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {connectedWallet}
                </Badge>
              </div>
              <Button
                onClick={disconnectWallet}
                variant="outline"
                className="border-red-500 text-red-600 hover:bg-red-50"
              >
                Disconnect Wallet
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Avalanche Wallet */}
              <Card className="border-2 border-red-500 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <div className="w-16 h-16 mx-auto bg-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      A
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-red-700 mb-2">Avalanche</h3>
                  <p className="text-sm text-gray-600 mb-4">Connect via MetaMask to Avalanche C-Chain</p>
                  <Button
                    onClick={connectAvalanche}
                    disabled={isConnecting === "avalanche"}
                    className="w-full bg-red-500 hover:bg-red-600 text-white"
                  >
                    {isConnecting === "avalanche" ? "Connecting..." : "Connect Avalanche"}
                  </Button>
                </CardContent>
              </Card>

              {/* Coinbase Wallet */}
              <Card className="border-2 border-blue-500 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <div className="w-16 h-16 mx-auto bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      C
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-blue-700 mb-2">Coinbase</h3>
                  <p className="text-sm text-gray-600 mb-4">Connect with Coinbase Wallet</p>
                  <Button
                    onClick={connectCoinbase}
                    disabled={isConnecting === "coinbase"}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    {isConnecting === "coinbase" ? "Connecting..." : "Connect Coinbase"}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* Phantom Wallet */}
              <Card className="border-2 border-purple-500 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <div className="w-16 h-16 mx-auto bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      P
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-purple-700 mb-2">Phantom</h3>
                  <p className="text-sm text-gray-600 mb-4">Connect to Solana network</p>
                  <Button
                    onClick={connectPhantom}
                    disabled={isConnecting === "phantom"}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    {isConnecting === "phantom" ? "Connecting..." : "Connect Phantom"}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Trading Dashboard */}
      <FrontierTraderDashboard />
    </main>
  )
}
