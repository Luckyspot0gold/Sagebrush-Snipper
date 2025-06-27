"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Wallet, ExternalLink, CheckCircle, AlertCircle, Copy, QrCode, Globe, Shield, Coins } from "lucide-react"

interface WalletInfo {
  address: string
  balance: string
  network: string
  connected: boolean
  type: "metamask" | "coinbase" | "phantom" | "external"
}

interface ExternalWallet {
  name: string
  url: string
  description: string
  icon: string
  category: "social" | "music" | "gaming" | "defi"
}

const EXTERNAL_WALLETS: ExternalWallet[] = [
  {
    name: "DESO Wallet",
    url: "https://diamondapp.com",
    description: "Decentralized social media platform with built-in cryptocurrency",
    icon: "💎",
    category: "social",
  },
  {
    name: "Muse Wallet",
    url: "https://muse.place",
    description: "Music NFT platform for artists and collectors",
    icon: "🎵",
    category: "music",
  },
  {
    name: "Frontier Trader",
    url: "https://frontiertrader.app",
    description: "Advanced trading platform for digital assets",
    icon: "📈",
    category: "defi",
  },
  {
    name: "GameFi Hub",
    url: "https://gamefi.org",
    description: "Gaming and NFT marketplace",
    icon: "🎮",
    category: "gaming",
  },
]

export function WalletConnect() {
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showQR, setShowQR] = useState(false)
  const [copiedAddress, setCopiedAddress] = useState(false)

  // Check if wallet is already connected on component mount
  useEffect(() => {
    checkExistingConnection()
  }, [])

  const checkExistingConnection = async () => {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
          await connectMetaMask()
        }
      }
    } catch (error) {
      console.log("No existing wallet connection found")
    }
  }

  const connectMetaMask = async () => {
    setIsConnecting(true)
    setError(null)

    try {
      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("MetaMask is not installed. Please install MetaMask to continue.")
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length === 0) {
        throw new Error("No accounts found. Please unlock MetaMask.")
      }

      // Switch to Avalanche C-Chain
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xA86A" }], // Avalanche C-Chain
        })
      } catch (switchError: any) {
        // If the chain doesn't exist, add it
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

      const balanceInAvax = (Number.parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4)

      setWalletInfo({
        address: accounts[0],
        balance: `${balanceInAvax} AVAX`,
        network: "Avalanche C-Chain",
        connected: true,
        type: "metamask",
      })

      // Save connection to localStorage
      localStorage.setItem("walletConnected", "metamask")
      localStorage.setItem("walletAddress", accounts[0])
    } catch (error: any) {
      setError(error.message || "Failed to connect to MetaMask")
    } finally {
      setIsConnecting(false)
    }
  }

  const connectCoinbaseWallet = async () => {
    setIsConnecting(true)
    setError(null)

    try {
      // Check if Coinbase Wallet is available
      if (typeof window === "undefined" || !window.ethereum?.isCoinbaseWallet) {
        // Redirect to Coinbase Wallet if not available
        window.open("https://wallet.coinbase.com/", "_blank")
        throw new Error("Please install Coinbase Wallet and try again.")
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length === 0) {
        throw new Error("No accounts found in Coinbase Wallet.")
      }

      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })

      const balanceInEth = (Number.parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4)

      setWalletInfo({
        address: accounts[0],
        balance: `${balanceInEth} ETH`,
        network: "Ethereum",
        connected: true,
        type: "coinbase",
      })

      localStorage.setItem("walletConnected", "coinbase")
      localStorage.setItem("walletAddress", accounts[0])
    } catch (error: any) {
      setError(error.message || "Failed to connect to Coinbase Wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  const connectPhantom = async () => {
    setIsConnecting(true)
    setError(null)

    try {
      if (typeof window === "undefined" || !window.solana?.isPhantom) {
        window.open("https://phantom.app/", "_blank")
        throw new Error("Please install Phantom Wallet and try again.")
      }

      const response = await window.solana.connect()

      setWalletInfo({
        address: response.publicKey.toString(),
        balance: "0.00 SOL", // Would need to fetch actual balance
        network: "Solana",
        connected: true,
        type: "phantom",
      })

      localStorage.setItem("walletConnected", "phantom")
      localStorage.setItem("walletAddress", response.publicKey.toString())
    } catch (error: any) {
      setError(error.message || "Failed to connect to Phantom Wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setWalletInfo(null)
    setError(null)
    localStorage.removeItem("walletConnected")
    localStorage.removeItem("walletAddress")
  }

  const copyAddress = async () => {
    if (walletInfo?.address) {
      await navigator.clipboard.writeText(walletInfo.address)
      setCopiedAddress(true)
      setTimeout(() => setCopiedAddress(false), 2000)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getWalletIcon = (type: string) => {
    switch (type) {
      case "metamask":
        return "🦊"
      case "coinbase":
        return "🔵"
      case "phantom":
        return "👻"
      default:
        return "👛"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "social":
        return "bg-blue-100 text-blue-800"
      case "music":
        return "bg-purple-100 text-purple-800"
      case "gaming":
        return "bg-green-100 text-green-800"
      case "defi":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="border-4 border-black shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center gap-3">
            <Wallet className="h-8 w-8" />
            <div>
              <CardTitle className="text-2xl font-serif">Wallet Connection Hub</CardTitle>
              <CardDescription className="text-blue-100">
                Connect your digital wallet to access the WyoVerse frontier
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {walletInfo ? (
            // Connected State
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-green-50 border-2 border-green-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{getWalletIcon(walletInfo.type)}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-bold text-green-800">Wallet Connected</span>
                    </div>
                    <div className="text-sm text-gray-600 capitalize">
                      {walletInfo.type} • {walletInfo.network}
                    </div>
                  </div>
                </div>
                <Button
                  onClick={disconnectWallet}
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                >
                  Disconnect
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Wallet Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600">Address</div>
                        <div className="flex items-center gap-2">
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {formatAddress(walletInfo.address)}
                          </code>
                          <Button size="sm" variant="ghost" onClick={copyAddress} className="h-6 w-6 p-0">
                            {copiedAddress ? (
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Balance</div>
                        <div className="font-bold text-lg">{walletInfo.balance}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Network</div>
                        <Badge variant="outline">{walletInfo.network}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Coins className="h-5 w-5" />
                      WyoVerse Assets
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>STONES</span>
                        <span className="font-bold">0.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Land Deeds</span>
                        <span className="font-bold">0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Boxing NFTs</span>
                        <span className="font-bold">0</span>
                      </div>
                      <Separator />
                      <div className="text-center">
                        <Button className="w-full">View Full Portfolio</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            // Connection Options
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Choose Your Wallet</h3>
                <p className="text-gray-600">Select a wallet to connect and start your frontier adventure</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-4">🦊</div>
                    <h3 className="text-xl font-bold mb-2">MetaMask</h3>
                    <p className="text-sm text-gray-600 mb-4">Most popular Ethereum wallet with Avalanche support</p>
                    <Button
                      onClick={connectMetaMask}
                      disabled={isConnecting}
                      className="w-full bg-orange-500 hover:bg-orange-600"
                    >
                      {isConnecting ? "Connecting..." : "Connect MetaMask"}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-4">🔵</div>
                    <h3 className="text-xl font-bold mb-2">Coinbase Wallet</h3>
                    <p className="text-sm text-gray-600 mb-4">Secure wallet from the trusted Coinbase exchange</p>
                    <Button
                      onClick={connectCoinbaseWallet}
                      disabled={isConnecting}
                      className="w-full bg-blue-500 hover:bg-blue-600"
                    >
                      {isConnecting ? "Connecting..." : "Connect Coinbase"}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-4">👻</div>
                    <h3 className="text-xl font-bold mb-2">Phantom</h3>
                    <p className="text-sm text-gray-600 mb-4">Leading Solana wallet for DeFi and NFTs</p>
                    <Button
                      onClick={connectPhantom}
                      disabled={isConnecting}
                      className="w-full bg-purple-500 hover:bg-purple-600"
                    >
                      {isConnecting ? "Connecting..." : "Connect Phantom"}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button variant="outline" onClick={() => setShowQR(!showQR)} className="flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  Mobile Wallet QR Code
                </Button>
              </div>

              {showQR && (
                <Card className="border-2 border-gray-200 bg-gray-50">
                  <CardContent className="p-6 text-center">
                    <div className="text-8xl mb-4">📱</div>
                    <h3 className="text-lg font-bold mb-2">Mobile Wallet Connection</h3>
                    <p className="text-sm text-gray-600 mb-4">Scan this QR code with your mobile wallet app</p>
                    <div className="w-48 h-48 bg-white border-2 border-gray-300 mx-auto flex items-center justify-center">
                      <div className="text-center">
                        <QrCode className="h-16 w-16 mx-auto mb-2 text-gray-400" />
                        <div className="text-xs text-gray-500">QR Code Placeholder</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <Separator className="my-8" />

          {/* External Wallets Section */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                <Globe className="h-6 w-6" />
                External Wallet Connections
              </h3>
              <p className="text-gray-600">Connect to specialized platforms and services</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EXTERNAL_WALLETS.map((wallet) => (
                <Card key={wallet.name} className="border-2 border-gray-200 hover:shadow-lg transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{wallet.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold">{wallet.name}</h4>
                          <Badge className={getCategoryColor(wallet.category)}>{wallet.category}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{wallet.description}</p>
                        <Button asChild size="sm" variant="outline" className="w-full bg-transparent">
                          <a
                            href={wallet.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Connect to {wallet.name}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-bold text-blue-800 mb-1">Security Notice</h4>
                <p className="text-sm text-blue-700">
                  Your wallet connection is secure and encrypted. WyoVerse never stores your private keys or seed
                  phrases. Always verify you're on the official WyoVerse domain before connecting your wallet.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
