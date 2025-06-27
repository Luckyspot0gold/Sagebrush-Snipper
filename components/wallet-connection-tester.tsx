"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Wallet, CheckCircle, XCircle, Clock, AlertCircle, Coins, Network, User, DollarSign } from "lucide-react"

// Import your existing API integrations
import { avalancheIntegration } from "@/lib/integrations/avalanche-integration"
import { coinbaseAPI } from "@/lib/coinbase-api-enhanced"

interface WalletTestResult {
  name: string
  icon: string
  status: "idle" | "testing" | "success" | "error" | "coming-soon"
  connected: boolean
  address?: string
  balance?: string
  network?: string
  error?: string
  apiData?: any
  testDuration?: number
}

export function WalletConnectionTester() {
  const [testResults, setTestResults] = useState<WalletTestResult[]>([
    { name: "Coinbase", icon: "🟦", status: "idle", connected: false },
    { name: "Phantom", icon: "👻", status: "idle", connected: false },
    { name: "Avalanche", icon: "🔺", status: "idle", connected: false },
    { name: "MetaMask", icon: "🦊", status: "idle", connected: false },
    { name: "DESO", icon: "💎", status: "idle", connected: false },
    { name: "MUSE", icon: "🎵", status: "idle", connected: false },
    { name: "Social Good", icon: "🌍", status: "idle", connected: false },
  ])

  const [overallProgress, setOverallProgress] = useState(0)
  const [isTestingAll, setIsTestingAll] = useState(false)
  const [cryptoPrices, setCryptoPrices] = useState<any>({})

  const { toast } = useToast()

  useEffect(() => {
    // Load crypto prices for testing
    loadCryptoPrices()
  }, [])

  const loadCryptoPrices = async () => {
    try {
      const prices = await coinbaseAPI.getMultiplePrices(["BTC", "ETH", "AVAX", "SOL"])
      const priceMap: Record<string, number> = {}
      prices.forEach((p) => (priceMap[p.symbol] = p.price))
      setCryptoPrices(priceMap)
    } catch (error) {
      console.error("Failed to load crypto prices:", error)
    }
  }

  const testWallet = async (walletName: string) => {
    const startTime = Date.now()

    // Update status to testing
    setTestResults((prev) =>
      prev.map((wallet) => (wallet.name === walletName ? { ...wallet, status: "testing" as const } : wallet)),
    )

    try {
      let result: Partial<WalletTestResult> = {}

      switch (walletName) {
        case "Coinbase":
          try {
            // Test Coinbase Wallet connection
            if (typeof window !== "undefined") {
              const ethereum = (window as any).ethereum

              if (ethereum?.isCoinbaseWallet) {
                // Request account access
                const accounts = await ethereum.request({
                  method: "eth_requestAccounts",
                })

                if (accounts.length > 0) {
                  // Get balance
                  const balance = await ethereum.request({
                    method: "eth_getBalance",
                    params: [accounts[0], "latest"],
                  })

                  // Get network
                  const chainId = await ethereum.request({
                    method: "eth_chainId",
                  })

                  const networkName =
                    chainId === "0x1" ? "Ethereum Mainnet" : chainId === "0x89" ? "Polygon" : `Chain ID: ${chainId}`

                  // Get live BTC price from Coinbase API
                  const btcPrice = await coinbaseAPI.getCryptoPrice("BTC")

                  result = {
                    status: "success",
                    connected: true,
                    address: accounts[0],
                    balance: `${(Number.parseInt(balance, 16) / 1e18).toFixed(4)} ETH`,
                    network: networkName,
                    apiData: {
                      btcPrice: btcPrice?.price,
                      chainId,
                      accountCount: accounts.length,
                    },
                  }

                  toast({
                    title: "🟦 Coinbase Wallet Test Successful!",
                    description: `Connected to ${networkName} | BTC: $${btcPrice?.price.toLocaleString()}`,
                  })
                } else {
                  throw new Error("No accounts found")
                }
              } else if (ethereum) {
                result = {
                  status: "error",
                  connected: false,
                  error: "Coinbase Wallet not detected. Found other wallet instead.",
                }
              } else {
                result = {
                  status: "error",
                  connected: false,
                  error: "No Web3 wallet detected. Please install Coinbase Wallet.",
                }
              }
            }
          } catch (error: any) {
            result = {
              status: "error",
              connected: false,
              error: error.message || "Failed to connect to Coinbase Wallet",
            }
          }
          break

        case "Phantom":
          try {
            if (typeof window !== "undefined") {
              const solana = (window as any).solana

              if (solana?.isPhantom) {
                // Connect to Phantom
                const response = await solana.connect()
                const publicKey = response.publicKey.toString()

                // Create connection to Solana mainnet
                const connection = new (await import("@solana/web3.js")).Connection(
                  "https://api.mainnet-beta.solana.com",
                )

                // Get SOL balance
                const balance = await connection.getBalance(response.publicKey)
                const solBalance = (balance / 1e9).toFixed(4)

                // Get cluster info
                const version = await connection.getVersion()

                result = {
                  status: "success",
                  connected: true,
                  address: publicKey,
                  balance: `${solBalance} SOL`,
                  network: "Solana Mainnet",
                  apiData: {
                    solPrice: cryptoPrices.SOL,
                    clusterVersion: version["solana-core"],
                    lamports: balance,
                  },
                }

                toast({
                  title: "👻 Phantom Wallet Test Successful!",
                  description: `Connected to Solana | Balance: ${solBalance} SOL`,
                })
              } else {
                result = {
                  status: "error",
                  connected: false,
                  error: "Phantom Wallet not detected. Please install Phantom.",
                }
              }
            }
          } catch (error: any) {
            result = {
              status: "error",
              connected: false,
              error: error.message || "Failed to connect to Phantom Wallet",
            }
          }
          break

        case "Avalanche":
          try {
            // Test Avalanche integration
            const avalancheResult = await avalancheIntegration.connectWallet()

            if (avalancheResult.isConnected) {
              // Get additional network info
              const networkInfo = await avalancheIntegration.getNetworkInfo()

              result = {
                status: "success",
                connected: true,
                address: avalancheResult.address,
                balance: `${avalancheResult.balance} AVAX`,
                network: "Avalanche C-Chain",
                apiData: {
                  avaxPrice: cryptoPrices.AVAX,
                  networkInfo,
                  chainId: avalancheResult.chainId,
                },
              }

              toast({
                title: "🔺 Avalanche Test Successful!",
                description: `Connected to C-Chain | Balance: ${avalancheResult.balance} AVAX`,
              })
            } else {
              result = {
                status: "error",
                connected: false,
                error: avalancheResult.error || "Failed to connect to Avalanche network",
              }
            }
          } catch (error: any) {
            result = {
              status: "error",
              connected: false,
              error: error.message || "Avalanche integration failed",
            }
          }
          break

        case "MetaMask":
          try {
            if (typeof window !== "undefined") {
              const ethereum = (window as any).ethereum

              if (ethereum?.isMetaMask) {
                // Request account access
                const accounts = await ethereum.request({
                  method: "eth_requestAccounts",
                })

                if (accounts.length > 0) {
                  // Get balance
                  const balance = await ethereum.request({
                    method: "eth_getBalance",
                    params: [accounts[0], "latest"],
                  })

                  // Get network info
                  const chainId = await ethereum.request({
                    method: "eth_chainId",
                  })

                  const networkId = await ethereum.request({
                    method: "net_version",
                  })

                  const networkName =
                    chainId === "0x1"
                      ? "Ethereum Mainnet"
                      : chainId === "0x89"
                        ? "Polygon Mainnet"
                        : chainId === "0xa86a"
                          ? "Avalanche C-Chain"
                          : `Network ID: ${networkId}`

                  result = {
                    status: "success",
                    connected: true,
                    address: accounts[0],
                    balance: `${(Number.parseInt(balance, 16) / 1e18).toFixed(4)} ETH`,
                    network: networkName,
                    apiData: {
                      ethPrice: cryptoPrices.ETH,
                      chainId,
                      networkId,
                      accountCount: accounts.length,
                    },
                  }

                  toast({
                    title: "🦊 MetaMask Test Successful!",
                    description: `Connected to ${networkName} | ETH: $${cryptoPrices.ETH?.toLocaleString()}`,
                  })
                } else {
                  throw new Error("No accounts found")
                }
              } else {
                result = {
                  status: "error",
                  connected: false,
                  error: "MetaMask not detected. Please install MetaMask extension.",
                }
              }
            }
          } catch (error: any) {
            result = {
              status: "error",
              connected: false,
              error: error.message || "Failed to connect to MetaMask",
            }
          }
          break

        case "DESO":
        case "MUSE":
        case "Social Good":
          // These are coming soon
          result = {
            status: "coming-soon",
            connected: false,
            error: "Integration under development",
          }

          toast({
            title: `${walletName} Integration`,
            description: "🚧 Coming Soon! This wallet integration is under development.",
            duration: 3000,
          })
          break
      }

      const testDuration = Date.now() - startTime

      // Update test results
      setTestResults((prev) =>
        prev.map((wallet) => (wallet.name === walletName ? { ...wallet, ...result, testDuration } : wallet)),
      )
    } catch (error: any) {
      const testDuration = Date.now() - startTime

      setTestResults((prev) =>
        prev.map((wallet) =>
          wallet.name === walletName
            ? {
                ...wallet,
                status: "error" as const,
                connected: false,
                error: error.message || "Unknown error occurred",
                testDuration,
              }
            : wallet,
        ),
      )

      toast({
        title: `${walletName} Test Failed`,
        description: error.message || "Connection test failed",
        variant: "destructive",
      })
    }
  }

  const testAllWallets = async () => {
    setIsTestingAll(true)
    setOverallProgress(0)

    const wallets = testResults.map((w) => w.name)

    for (let i = 0; i < wallets.length; i++) {
      await testWallet(wallets[i])
      setOverallProgress(((i + 1) / wallets.length) * 100)

      // Small delay between tests
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    setIsTestingAll(false)

    toast({
      title: "All Wallet Tests Complete!",
      description: "Check results below for detailed information",
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "testing":
        return <Clock className="h-5 w-5 text-blue-600 animate-spin" />
      case "coming-soon":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      default:
        return <Wallet className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "border-green-500 bg-green-50"
      case "error":
        return "border-red-500 bg-red-50"
      case "testing":
        return "border-blue-500 bg-blue-50"
      case "coming-soon":
        return "border-yellow-500 bg-yellow-50"
      default:
        return "border-gray-300 bg-gray-50"
    }
  }

  return (
    <div className="newspaper-bg min-h-screen p-6">
      {/* Header */}
      <div className="newspaper-article mb-8">
        <div className="newspaper-article-inner text-center">
          <h1 className="newspaper-headline text-4xl mb-4">WYOVERSE FRONTIER WALLET TESTING STATION</h1>
          <p className="newspaper-subheadline text-xl mb-6">
            Comprehensive Testing of All Wallet Integrations and Network Connections
          </p>
          <div className="newspaper-dateline">Testing Station Established - Digital Frontier Telegraph Co.</div>
        </div>
      </div>

      {/* Test Controls */}
      <div className="newspaper-article mb-6">
        <div className="newspaper-article-inner">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <Button onClick={testAllWallets} disabled={isTestingAll} className="newspaper-button text-lg px-8 py-4">
                {isTestingAll ? (
                  <>
                    <Clock className="h-5 w-5 mr-2 animate-spin" />
                    Testing All Wallets...
                  </>
                ) : (
                  <>
                    <Wallet className="h-5 w-5 mr-2" />
                    Test All Wallets
                  </>
                )}
              </Button>

              <Button onClick={loadCryptoPrices} className="newspaper-button">
                <Coins className="h-4 w-4 mr-2" />
                Refresh Prices
              </Button>
            </div>

            {isTestingAll && (
              <div className="flex items-center gap-4">
                <span className="font-serif">Overall Progress:</span>
                <Progress value={overallProgress} className="w-32" />
                <span className="font-bold">{Math.round(overallProgress)}%</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Live Market Data */}
      {Object.keys(cryptoPrices).length > 0 && (
        <div className="newspaper-article mb-6">
          <div className="newspaper-article-inner">
            <h3 className="newspaper-section-title text-center mb-4">
              <Coins className="inline h-6 w-6 mr-2" />
              LIVE MARKET DATA FOR TESTING
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(cryptoPrices).map(([symbol, price]) => (
                <div key={symbol} className="newspaper-ad text-center p-3">
                  <div className="font-serif font-bold">{symbol}/USD</div>
                  <div className="text-xl font-bold text-green-700">${(price as number).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Test Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testResults.map((wallet) => (
          <Card key={wallet.name} className={`border-4 ${getStatusColor(wallet.status)} newspaper-article`}>
            <CardHeader className="border-b-2 border-black">
              <CardTitle className="flex items-center justify-between font-serif">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{wallet.icon}</span>
                  {wallet.name}
                </div>
                {getStatusIcon(wallet.status)}
              </CardTitle>
              <CardDescription className="font-serif">
                {wallet.status === "idle" && "Ready for testing"}
                {wallet.status === "testing" && "Testing connection..."}
                {wallet.status === "success" && "Connection successful!"}
                {wallet.status === "error" && "Connection failed"}
                {wallet.status === "coming-soon" && "Integration in development"}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 space-y-3">
              {/* Test Button */}
              <Button
                onClick={() => testWallet(wallet.name)}
                disabled={wallet.status === "testing" || isTestingAll}
                className="newspaper-button w-full"
              >
                {wallet.status === "testing" ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <Wallet className="h-4 w-4 mr-2" />
                    Test {wallet.name}
                  </>
                )}
              </Button>

              {/* Connection Status */}
              {wallet.connected && (
                <div className="space-y-2 p-3 bg-green-100 border border-green-300 rounded">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-serif font-bold text-green-800">Connected</span>
                  </div>

                  {wallet.address && (
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-3 w-3" />
                      <span className="font-mono">
                        {wallet.address.slice(0, 8)}...{wallet.address.slice(-6)}
                      </span>
                    </div>
                  )}

                  {wallet.balance && (
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-3 w-3" />
                      <span className="font-bold text-green-700">{wallet.balance}</span>
                    </div>
                  )}

                  {wallet.network && (
                    <div className="flex items-center gap-2 text-sm">
                      <Network className="h-3 w-3" />
                      <span>{wallet.network}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Error Display */}
              {wallet.status === "error" && wallet.error && (
                <div className="p-3 bg-red-100 border border-red-300 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="font-serif font-bold text-red-800">Error</span>
                  </div>
                  <p className="text-sm text-red-700">{wallet.error}</p>
                </div>
              )}

              {/* Coming Soon Display */}
              {wallet.status === "coming-soon" && (
                <div className="p-3 bg-yellow-100 border border-yellow-300 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="font-serif font-bold text-yellow-800">Coming Soon</span>
                  </div>
                  <p className="text-sm text-yellow-700">Integration under development</p>
                </div>
              )}

              {/* API Data Display */}
              {wallet.apiData && (
                <div className="p-3 bg-blue-100 border border-blue-300 rounded">
                  <div className="text-sm font-serif font-bold mb-2">API Data:</div>
                  <div className="text-xs space-y-1">
                    {Object.entries(wallet.apiData).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                        <span className="font-mono">
                          {typeof value === "number" ? value.toLocaleString() : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Test Duration */}
              {wallet.testDuration && (
                <div className="text-xs text-gray-600 text-center">Test completed in {wallet.testDuration}ms</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Test Summary */}
      <div className="newspaper-article mt-8">
        <div className="newspaper-article-inner">
          <h3 className="newspaper-section-title text-center mb-4">TEST SUMMARY</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="newspaper-ad">
              <div className="text-2xl font-bold text-green-600">
                {testResults.filter((w) => w.status === "success").length}
              </div>
              <div className="font-serif">Successful</div>
            </div>
            <div className="newspaper-ad">
              <div className="text-2xl font-bold text-red-600">
                {testResults.filter((w) => w.status === "error").length}
              </div>
              <div className="font-serif">Failed</div>
            </div>
            <div className="newspaper-ad">
              <div className="text-2xl font-bold text-yellow-600">
                {testResults.filter((w) => w.status === "coming-soon").length}
              </div>
              <div className="font-serif">Coming Soon</div>
            </div>
            <div className="newspaper-ad">
              <div className="text-2xl font-bold text-gray-600">
                {testResults.filter((w) => w.status === "idle").length}
              </div>
              <div className="font-serif">Not Tested</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
