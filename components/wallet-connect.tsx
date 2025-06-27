"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wallet, ExternalLink, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import Image from "next/image"

interface WalletStatus {
  connected: boolean
  address?: string
  balance?: string
  error?: string
}

interface WalletButtonProps {
  name: string
  icon: string
  onClick: () => void
  status?: WalletStatus
  disabled?: boolean
}

function WalletButton({ name, icon, onClick, status, disabled }: WalletButtonProps) {
  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${
        status?.connected ? "border-green-500 bg-green-50" : "border-gray-200"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <CardContent className="p-4" onClick={disabled ? undefined : onClick}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Image
              src={icon || "/placeholder.svg"}
              alt={`${name} logo`}
              width={40}
              height={40}
              className="rounded-full"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                e.currentTarget.src = "/placeholder.svg?height=40&width=40&text=" + name.charAt(0)
              }}
            />
            {status?.connected && (
              <CheckCircle className="absolute -top-1 -right-1 h-4 w-4 text-green-600 bg-white rounded-full" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{name}</h3>
            {status?.connected ? (
              <div className="text-sm text-green-600">
                <p>Connected</p>
                {status.address && (
                  <p className="text-xs text-gray-500">
                    {status.address.slice(0, 6)}...{status.address.slice(-4)}
                  </p>
                )}
                {status.balance && <p className="text-xs text-gray-500">Balance: {status.balance}</p>}
              </div>
            ) : status?.error ? (
              <p className="text-sm text-red-600">{status.error}</p>
            ) : (
              <p className="text-sm text-gray-500">Not connected</p>
            )}
          </div>
          <ExternalLink className="h-4 w-4 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function WalletConnect() {
  const [walletStatuses, setWalletStatuses] = useState<Record<string, WalletStatus>>({})
  const [isConnecting, setIsConnecting] = useState<string | null>(null)

  // Avalanche wallet connection
  const connectAvalanche = async () => {
    setIsConnecting("Avalanche")
    try {
      if (typeof window.ethereum !== "undefined") {
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
          // Network doesn't exist, add it
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

        // Get balance
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0], "latest"],
        })

        const avaxBalance = (Number.parseInt(balance, 16) / 1e18).toFixed(4)

        setWalletStatuses((prev) => ({
          ...prev,
          Avalanche: {
            connected: true,
            address: accounts[0],
            balance: `${avaxBalance} AVAX`,
          },
        }))
      } else {
        throw new Error("MetaMask not installed")
      }
    } catch (error: any) {
      setWalletStatuses((prev) => ({
        ...prev,
        Avalanche: {
          connected: false,
          error: error.message || "Connection failed",
        },
      }))
      // Fallback to wallet website
      window.open("https://wallet.avax.network/", "_blank")
    } finally {
      setIsConnecting(null)
    }
  }

  // Coinbase wallet connection
  const connectCoinbase = async () => {
    setIsConnecting("Coinbase")
    try {
      if (typeof window.ethereum !== "undefined" && window.ethereum.isCoinbaseWallet) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })

        setWalletStatuses((prev) => ({
          ...prev,
          Coinbase: {
            connected: true,
            address: accounts[0],
          },
        }))
      } else {
        throw new Error("Coinbase Wallet not installed")
      }
    } catch (error: any) {
      setWalletStatuses((prev) => ({
        ...prev,
        Coinbase: {
          connected: false,
          error: error.message || "Connection failed",
        },
      }))
      // Fallback to Coinbase Wallet website
      window.open("https://www.coinbase.com/wallet", "_blank")
    } finally {
      setIsConnecting(null)
    }
  }

  // External wallet connections (open in new tab)
  const connectExternal = (name: string, url: string) => {
    setWalletStatuses((prev) => ({
      ...prev,
      [name]: {
        connected: false,
        error: "External wallet - opens in new tab",
      },
    }))
    window.open(url, "_blank")
  }

  // Check for existing connections on load
  useEffect(() => {
    const checkConnections = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          })

          if (accounts.length > 0) {
            const chainId = await window.ethereum.request({
              method: "eth_chainId",
            })

            if (chainId === "0xA86A") {
              const balance = await window.ethereum.request({
                method: "eth_getBalance",
                params: [accounts[0], "latest"],
              })
              const avaxBalance = (Number.parseInt(balance, 16) / 1e18).toFixed(4)

              setWalletStatuses((prev) => ({
                ...prev,
                Avalanche: {
                  connected: true,
                  address: accounts[0],
                  balance: `${avaxBalance} AVAX`,
                },
              }))
            }
          }
        } catch (error) {
          console.error("Error checking wallet connections:", error)
        }
      }
    }

    checkConnections()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-6 w-6" />
            Wallet Connections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Connect your wallets to access trading, gaming, and other WyoVerse features. Some wallets will open in a
              new tab for security.
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Primary Wallets */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-3">Primary Wallets</h3>

              <WalletButton
                name="Avalanche"
                icon="/placeholder.svg?height=40&width=40&text=AVAX"
                onClick={connectAvalanche}
                status={walletStatuses.Avalanche}
                disabled={isConnecting === "Avalanche"}
              />

              <WalletButton
                name="Coinbase"
                icon="/placeholder.svg?height=40&width=40&text=CB"
                onClick={connectCoinbase}
                status={walletStatuses.Coinbase}
                disabled={isConnecting === "Coinbase"}
              />

              <WalletButton
                name="MetaMask"
                icon="/placeholder.svg?height=40&width=40&text=MM"
                onClick={() => {
                  if (typeof window.ethereum === "undefined") {
                    window.open("https://metamask.io/", "_blank")
                  } else {
                    connectAvalanche() // Use same logic as Avalanche
                  }
                }}
                status={walletStatuses.MetaMask}
              />
            </div>

            {/* External Wallets */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-3">External Platforms</h3>

              <WalletButton
                name="DESO"
                icon="/placeholder.svg?height=40&width=40&text=DESO"
                onClick={() => connectExternal("DESO", "https://deso.org/")}
                status={walletStatuses.DESO}
              />

              <WalletButton
                name="Muse"
                icon="/placeholder.svg?height=40&width=40&text=MUSE"
                onClick={() => connectExternal("Muse", "https://muse.place/")}
                status={walletStatuses.Muse}
              />

              <WalletButton
                name="Phantom"
                icon="/placeholder.svg?height=40&width=40&text=PHM"
                onClick={() => connectExternal("Phantom", "https://phantom.app/")}
                status={walletStatuses.Phantom}
              />
            </div>
          </div>

          {isConnecting && (
            <div className="flex items-center justify-center mt-6 p-4 bg-blue-50 rounded-lg">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              <span>Connecting to {isConnecting}...</span>
            </div>
          )}

          {/* Connection Status Summary */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Connection Summary</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(walletStatuses).map(([name, status]) => (
                <Badge
                  key={name}
                  variant={status.connected ? "default" : "secondary"}
                  className={status.connected ? "bg-green-600" : ""}
                >
                  {name}: {status.connected ? "Connected" : "Disconnected"}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
