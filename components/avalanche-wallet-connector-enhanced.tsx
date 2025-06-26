"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Zap, AlertCircle, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface WalletState {
  address: string | null
  balance: string | null
  isConnected: boolean
  network: string | null
}

export function AvalancheWalletConnectorEnhanced() {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    balance: null,
    isConnected: false,
    network: null,
  })
  const [isConnecting, setIsConnecting] = useState(false)
  const { toast } = useToast()

  const connectWallet = useCallback(async () => {
    setIsConnecting(true)

    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error("MetaMask not detected. Please install MetaMask to continue.")
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length === 0) {
        throw new Error("No accounts found. Please unlock your wallet.")
      }

      // Switch to Avalanche network if needed
      await switchToAvalanche()

      // Get balance
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })

      // Convert balance from wei to AVAX
      const balanceInAvax = (Number.parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4)

      // Get network info
      const chainId = await window.ethereum.request({ method: "eth_chainId" })
      const networkName = chainId === "0xa86a" ? "Avalanche C-Chain" : "Unknown Network"

      setWallet({
        address: accounts[0],
        balance: balanceInAvax,
        isConnected: true,
        network: networkName,
      })

      toast({
        title: "Wallet Connected!",
        description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      })

      // Initialize Bolt.New SDK connection (simulated)
      await initializeBoltConnection(accounts[0])
    } catch (error: any) {
      console.error("Wallet connection failed:", error)
      toast({
        title: "Connection Failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }, [toast])

  const switchToAvalanche = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xa86a" }], // Avalanche C-Chain
      })
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0xa86a",
                chainName: "Avalanche Network",
                nativeCurrency: {
                  name: "Avalanche",
                  symbol: "AVAX",
                  decimals: 18,
                },
                rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
                blockExplorerUrls: ["https://snowtrace.io/"],
              },
            ],
          })
        } catch (addError) {
          throw new Error("Failed to add Avalanche network to MetaMask")
        }
      } else {
        throw new Error("Failed to switch to Avalanche network")
      }
    }
  }

  const initializeBoltConnection = async (address: string) => {
    // Simulate Bolt.New SDK initialization
    console.log(`Initializing Bolt connection for ${address}`)

    // In production, this would be:
    // const bolt = new Bolt(process.env.NEXT_PUBLIC_BOLT_API_KEY);
    // const avalanche = bolt.avax();
    // const balance = await avalanche.getBalance(address);

    return true
  }

  const disconnectWallet = () => {
    setWallet({
      address: null,
      balance: null,
      isConnected: false,
      network: null,
    })
    toast({
      title: "Wallet Disconnected",
      description: "Successfully disconnected from wallet",
    })
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Avalanche Wallet
        </CardTitle>
        <CardDescription>Connect your wallet to start trading in the WyoVerse</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!wallet.isConnected ? (
          <Button onClick={connectWallet} disabled={isConnecting} className="w-full bg-red-600 hover:bg-red-700">
            {isConnecting ? (
              <>
                <Zap className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                Connect Avalanche Wallet
              </>
            )}
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status:</span>
              <Badge variant="default" className="bg-green-600">
                <CheckCircle className="mr-1 h-3 w-3" />
                Connected
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Address:</span>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
                </code>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Balance:</span>
                <span className="text-sm font-mono">{wallet.balance} AVAX</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Network:</span>
                <Badge variant="outline">{wallet.network}</Badge>
              </div>
            </div>

            <Button onClick={disconnectWallet} variant="outline" className="w-full">
              Disconnect Wallet
            </Button>
          </div>
        )}

        <div className="text-xs text-muted-foreground text-center">
          <AlertCircle className="inline mr-1 h-3 w-3" />
          Powered by Bolt.New SDK
        </div>
      </CardContent>
    </Card>
  )
}
