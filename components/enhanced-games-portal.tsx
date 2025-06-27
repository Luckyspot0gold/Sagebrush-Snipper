"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Trophy, Coins, Zap, Play, Wallet, ExternalLink, Eye, EyeOff, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Import your existing API integrations
import { avalancheIntegration } from "@/lib/integrations/avalanche-integration"
import { coinbaseAPI } from "@/lib/coinbase-api-enhanced"

interface WalletConnection {
  name: string
  icon: string
  connected: boolean
  address?: string
  balance?: string
  color: string
}

interface GameCharacter {
  id: string
  name: string
  type: string
  rarity: "common" | "rare" | "epic" | "legendary"
  image: string
  stats: {
    power: number
    speed: number
    defense: number
  }
}

export function EnhancedGamesPortal() {
  const [activeTab, setActiveTab] = useState("overview")
  const [hologramActive, setHologramActive] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState<GameCharacter | null>(null)
  const [walletConnections, setWalletConnections] = useState<WalletConnection[]>([
    { name: "Coinbase", icon: "🟦", connected: false, color: "bg-blue-500" },
    { name: "Phantom", icon: "👻", connected: false, color: "bg-purple-500" },
    { name: "Avalanche", icon: "🔺", connected: false, color: "bg-red-500" },
    { name: "MetaMask", icon: "🦊", connected: false, color: "bg-orange-500" },
    { name: "DESO", icon: "💎", connected: false, color: "bg-green-500" },
    { name: "MUSE", icon: "🎵", connected: false, color: "bg-pink-500" },
    { name: "Social Good", icon: "🌍", connected: false, color: "bg-emerald-500" },
  ])
  const [cryptoPrices, setCryptoPrices] = useState<any>({})
  const [isConnecting, setIsConnecting] = useState<string | null>(null)

  const { toast } = useToast()

  useEffect(() => {
    // Load crypto prices on component mount
    loadCryptoPrices()
  }, [])

  const loadCryptoPrices = async () => {
    try {
      const prices = await coinbaseAPI.getMultiplePrices(["BTC", "ETH", "AVAX"])
      const priceMap: Record<string, number> = {}
      prices.forEach((p) => (priceMap[p.symbol] = p.price))
      setCryptoPrices(priceMap)
    } catch (error) {
      console.error("Failed to load crypto prices:", error)
    }
  }

  const connectWallet = async (walletName: string) => {
    setIsConnecting(walletName)

    try {
      let connection: Partial<WalletConnection> = {}

      switch (walletName) {
        case "Coinbase":
          try {
            // Use Coinbase Wallet SDK
            if (typeof window !== "undefined" && (window as any).ethereum?.isCoinbaseWallet) {
              const accounts = await (window as any).ethereum.request({
                method: "eth_requestAccounts",
              })

              if (accounts.length > 0) {
                const balance = await (window as any).ethereum.request({
                  method: "eth_getBalance",
                  params: [accounts[0], "latest"],
                })

                // Get live price from Coinbase API
                const btcPrice = await coinbaseAPI.getCryptoPrice("BTC")

                connection = {
                  connected: true,
                  address: accounts[0],
                  balance: `${(Number.parseInt(balance, 16) / 1e18).toFixed(4)} ETH`,
                }

                toast({
                  title: "🟦 Coinbase Wallet Connected!",
                  description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)} | BTC: $${btcPrice?.price.toLocaleString()}`,
                })
              }
            } else {
              // Redirect to Coinbase Wallet
              window.open("https://www.coinbase.com/wallet", "_blank")
              toast({
                title: "Coinbase Wallet Required",
                description: "Please install Coinbase Wallet extension or app",
              })
            }
          } catch (error) {
            console.error("Coinbase connection error:", error)
            throw error
          }
          break

        case "Phantom":
          try {
            if (typeof window !== "undefined" && (window as any).solana?.isPhantom) {
              const response = await (window as any).solana.connect()
              const publicKey = response.publicKey.toString()

              // Get SOL balance
              const solanaConnection = new (window as any).solanaWeb3.Connection("https://api.mainnet-beta.solana.com")
              const balance = await solanaConnection.getBalance(response.publicKey)
              const solBalance = (balance / 1e9).toFixed(4)

              connection = {
                connected: true,
                address: publicKey,
                balance: `${solBalance} SOL`,
              }

              toast({
                title: "👻 Phantom Wallet Connected!",
                description: `Connected to Solana network | Balance: ${solBalance} SOL`,
              })
            } else {
              window.open("https://phantom.app/", "_blank")
              toast({
                title: "Phantom Wallet Required",
                description: "Please install Phantom wallet for Solana",
              })
            }
          } catch (error) {
            console.error("Phantom connection error:", error)
            throw error
          }
          break

        case "Avalanche":
          try {
            const result = await avalancheIntegration.connectWallet()

            if (result.isConnected) {
              connection = {
                connected: true,
                address: result.address,
                balance: `${result.balance} AVAX`,
              }

              toast({
                title: "🔺 Avalanche Network Connected!",
                description: `Connected to C-Chain | Address: ${result.address?.slice(0, 6)}...${result.address?.slice(-4)}`,
              })
            }
          } catch (error) {
            console.error("Avalanche connection error:", error)
            throw error
          }
          break

        case "MetaMask":
          try {
            if (typeof window !== "undefined" && (window as any).ethereum?.isMetaMask) {
              const accounts = await (window as any).ethereum.request({
                method: "eth_requestAccounts",
              })

              if (accounts.length > 0) {
                const balance = await (window as any).ethereum.request({
                  method: "eth_getBalance",
                  params: [accounts[0], "latest"],
                })

                // Check network
                const chainId = await (window as any).ethereum.request({
                  method: "eth_chainId",
                })

                const networkName = chainId === "0x1" ? "Ethereum Mainnet" : "Other Network"

                connection = {
                  connected: true,
                  address: accounts[0],
                  balance: `${(Number.parseInt(balance, 16) / 1e18).toFixed(4)} ETH`,
                }

                toast({
                  title: "🦊 MetaMask Connected!",
                  description: `Connected to ${networkName} | ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
                })
              }
            } else {
              window.open("https://metamask.io/", "_blank")
              toast({
                title: "MetaMask Required",
                description: "Please install MetaMask extension",
              })
            }
          } catch (error) {
            console.error("MetaMask connection error:", error)
            throw error
          }
          break

        case "DESO":
        case "MUSE":
        case "Social Good":
          // Coming soon popup
          toast({
            title: `${walletName} Integration`,
            description: "🚧 Coming Soon! This wallet integration is under development.",
            duration: 3000,
          })
          setIsConnecting(null)
          return
      }

      setWalletConnections((prev) =>
        prev.map((wallet) => (wallet.name === walletName ? { ...wallet, ...connection } : wallet)),
      )
    } catch (error) {
      console.error(`Failed to connect ${walletName}:`, error)
      toast({
        title: "Connection Failed",
        description: `Failed to connect to ${walletName}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsConnecting(null)
    }
  }

  const gameCharacters: GameCharacter[] = [
    {
      id: "crypto-fighter",
      name: "Crypto Clasher",
      type: "Fighter",
      rarity: "legendary",
      image: "/images/crypto-clashers-fighter.png",
      stats: { power: 95, speed: 88, defense: 92 },
    },
    {
      id: "frontier-trader",
      name: "Frontier Trader",
      type: "Trader",
      rarity: "epic",
      image: "/images/frontiertraderposter.jpg",
      stats: { power: 75, speed: 95, defense: 80 },
    },
    {
      id: "bar-keep-bill",
      name: "Bar Keep Bill",
      type: "Advisor",
      rarity: "legendary",
      image: "/images/bar-keep-bill-poster.png",
      stats: { power: 70, speed: 60, defense: 90 },
    },
    {
      id: "clutch-mechanic",
      name: "Clutch the Mechanic",
      type: "Engineer",
      rarity: "rare",
      image: "/images/clutch-on-horse.webp",
      stats: { power: 85, speed: 75, defense: 88 },
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "text-yellow-500 border-yellow-500"
      case "epic":
        return "text-purple-500 border-purple-500"
      case "rare":
        return "text-blue-500 border-blue-500"
      default:
        return "text-gray-500 border-gray-500"
    }
  }

  return (
    <div className="newspaper-bg min-h-screen p-6">
      {/* Hero Header with WyoVerse Stone Wanted Poster */}
      <div className="newspaper-article mb-8">
        <div className="newspaper-article-inner">
          <div className="relative overflow-hidden">
            <Image
              src="/images/wyoverse-stone-wanted-poster.png"
              alt="WyoVerse Gaming Portal"
              width={1200}
              height={600}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="newspaper-headline text-6xl mb-4">WYOVERSE GAMING PORTAL</h1>
                <p className="newspaper-subheadline text-2xl">New Era in GameFi - Where Crypto Meets the Frontier</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8 border-4 border-black bg-amber-50">
          <TabsTrigger value="overview" className="newspaper-button">
            🎮 Overview
          </TabsTrigger>
          <TabsTrigger value="characters" className="newspaper-button">
            👤 Characters
          </TabsTrigger>
          <TabsTrigger value="tournaments" className="newspaper-button">
            🏆 Tournaments
          </TabsTrigger>
          <TabsTrigger value="holograms" className="newspaper-button">
            ✨ 3D Models
          </TabsTrigger>
          <TabsTrigger value="ecosystem" className="newspaper-button">
            🌐 Ecosystem
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Wallet Connection Section */}
          <div className="newspaper-article">
            <div className="newspaper-article-inner">
              <h2 className="newspaper-section-title text-center mb-6">
                <Wallet className="inline h-8 w-8 mr-2" />
                CONNECT YOUR FRONTIER WALLETS
              </h2>
              <p className="newspaper-paragraph text-center mb-6">
                Connect multiple wallets to access all WyoVerse features and trade on the digital frontier
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {walletConnections.map((wallet) => (
                  <div key={wallet.name} className="text-center">
                    <Button
                      onClick={() => connectWallet(wallet.name)}
                      disabled={isConnecting === wallet.name}
                      className={`w-full h-20 flex flex-col items-center justify-center gap-2 ${
                        wallet.connected ? "bg-green-600 hover:bg-green-700" : wallet.color
                      } text-white newspaper-button transition-all duration-300`}
                    >
                      <span className="text-2xl">{wallet.icon}</span>
                      <span className="text-xs font-serif">
                        {isConnecting === wallet.name ? "Connecting..." : wallet.name}
                      </span>
                      {wallet.connected && <span className="text-xs">✓ Connected</span>}
                    </Button>
                    {wallet.connected && wallet.address && (
                      <div className="mt-2 p-2 bg-green-50 border border-green-300 rounded">
                        <div className="text-xs font-mono newspaper-byline">
                          {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                        </div>
                        <div className="text-xs font-bold text-green-700">{wallet.balance}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Game Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="newspaper-article">
              <div className="newspaper-article-inner">
                <h3 className="newspaper-section-title text-red-800">🥊 CRYPTO CLASHERS</h3>
                <Image
                  src="/images/crypto-clashers-fighter.png"
                  alt="Crypto Clashers"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover border-2 border-black mb-4"
                />
                <p className="newspaper-paragraph">
                  Enter the ring and battle with crypto-powered fighters in the ultimate blockchain boxing experience.
                  Trade punches and cryptocurrency in the most exciting GameFi arena.
                </p>
                <Link href="https://CryptoClashers.games" target="_blank">
                  <Button className="newspaper-button w-full mt-4">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Enter the Ring
                  </Button>
                </Link>
              </div>
            </div>

            <div className="newspaper-article">
              <div className="newspaper-article-inner">
                <h3 className="newspaper-section-title text-amber-800">⛏️ STONE YARD SALOON</h3>
                <Image
                  src="/images/bar-keep-bill-poster.png"
                  alt="Stone Yard"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover border-2 border-black mb-4"
                />
                <p className="newspaper-paragraph">
                  Mine, trade, and build your fortune in the digital frontier's premier mining simulation. Bar Keep Bill
                  awaits with wisdom and whiskey.
                </p>
                <Link href="https://StoneYard.cash" target="_blank">
                  <Button className="newspaper-button w-full mt-4">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit the Saloon
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Live Market Data */}
          {Object.keys(cryptoPrices).length > 0 && (
            <div className="newspaper-article">
              <div className="newspaper-article-inner">
                <h3 className="newspaper-section-title text-center">
                  <Coins className="inline h-6 w-6 mr-2" />
                  FRONTIER TELEGRAPH - LIVE MARKET PRICES
                </h3>
                <div className="newspaper-dateline text-center mb-4">Updated via Coinbase Professional Exchange</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(cryptoPrices).map(([symbol, price]) => (
                    <div key={symbol} className="newspaper-ad text-center p-4">
                      <div className="newspaper-headline text-lg">{symbol}/USD</div>
                      <div className="text-3xl font-bold text-green-700 font-serif">
                        ${(price as number).toLocaleString()}
                      </div>
                      <div className="text-xs newspaper-byline">Live Price</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="characters" className="space-y-6">
          <div className="newspaper-article">
            <div className="newspaper-article-inner">
              <h2 className="newspaper-section-title text-center mb-6">FRONTIER CHARACTER ROSTER</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {gameCharacters.map((character) => (
                  <div key={character.id} className="newspaper-article">
                    <div className="newspaper-article-inner text-center">
                      <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-black">
                        <AvatarImage src={character.image || "/placeholder.svg"} alt={character.name} />
                        <AvatarFallback className="font-serif text-2xl">{character.name[0]}</AvatarFallback>
                      </Avatar>
                      <h3 className="newspaper-headline text-lg">{character.name}</h3>
                      <Badge variant="outline" className={`${getRarityColor(character.rarity)} font-serif mb-4`}>
                        {character.rarity.toUpperCase()}
                      </Badge>

                      <div className="space-y-3 text-left">
                        <div className="flex justify-between items-center">
                          <span className="font-serif font-bold">Power:</span>
                          <div className="flex items-center gap-2">
                            <Progress value={character.stats.power} className="w-16 h-2" />
                            <span className="text-sm font-bold">{character.stats.power}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-serif font-bold">Speed:</span>
                          <div className="flex items-center gap-2">
                            <Progress value={character.stats.speed} className="w-16 h-2" />
                            <span className="text-sm font-bold">{character.stats.speed}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-serif font-bold">Defense:</span>
                          <div className="flex items-center gap-2">
                            <Progress value={character.stats.defense} className="w-16 h-2" />
                            <span className="text-sm font-bold">{character.stats.defense}</span>
                          </div>
                        </div>
                      </div>

                      {character.id === "frontier-trader" && (
                        <Link href="/frontier-trader" className="mt-4 block">
                          <Button className="newspaper-button w-full">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Visit Trader
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tournaments" className="space-y-6">
          <div className="newspaper-article">
            <div className="newspaper-article-inner">
              <h2 className="newspaper-section-title text-center">
                <Trophy className="inline h-8 w-8 mr-2" />
                CHEYENNE FRONTIER DAYS CHAMPIONSHIP
              </h2>
              <div className="newspaper-dateline text-center mb-6">
                The Most Prestigious Gaming Tournament in the Digital West
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Image
                    src="/images/weirdC.H.F.D.img.png"
                    alt="Cheyenne Frontier Days Championship"
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover border-4 border-black"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="newspaper-headline text-2xl">The Ultimate Frontier Tournament</h3>
                  <p className="newspaper-paragraph">
                    Join the most prestigious gaming tournament in the digital frontier. Compete in multiple games
                    across the WyoVerse ecosystem for massive crypto prizes and eternal glory in the frontier halls of
                    fame.
                  </p>

                  <div className="newspaper-ad p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between border-b border-black pb-1">
                        <span className="font-serif font-bold">Prize Pool:</span>
                        <span className="font-bold text-green-700">$50,000 USDC</span>
                      </div>
                      <div className="flex justify-between border-b border-black pb-1">
                        <span className="font-serif font-bold">Entry Fee:</span>
                        <span className="font-bold">0.1 ETH</span>
                      </div>
                      <div className="flex justify-between border-b border-black pb-1">
                        <span className="font-serif font-bold">Start Date:</span>
                        <span className="font-bold">July 4th, 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-serif font-bold">Registration:</span>
                        <span className="font-bold text-red-700">Open Now!</span>
                      </div>
                    </div>
                  </div>

                  <Button className="newspaper-button w-full">
                    <Trophy className="h-4 w-4 mr-2" />
                    Register for Tournament
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="holograms" className="space-y-6">
          <div className="newspaper-article">
            <div className="newspaper-article-inner">
              <h2 className="newspaper-section-title text-center">
                <Sparkles className="inline h-8 w-8 mr-2" />
                FRONTIER HOLOGRAPHIC EXHIBITION
              </h2>
              <p className="newspaper-paragraph text-center mb-6">
                Witness the marvels of modern technology with interactive 3D holographic displays of your favorite
                WyoVerse characters
              </p>

              <div className="text-center mb-6">
                <Button
                  onClick={() => setHologramActive(!hologramActive)}
                  className={`newspaper-button text-lg px-8 py-4 ${hologramActive ? "bg-purple-700" : ""}`}
                >
                  {hologramActive ? <EyeOff className="h-5 w-5 mr-2" /> : <Eye className="h-5 w-5 mr-2" />}
                  {hologramActive ? "Deactivate Holographic Display" : "Activate Holographic Display"}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="newspaper-article">
                  <div
                    className={`newspaper-article-inner h-64 ${hologramActive ? "bg-purple-900/20 animate-pulse" : "bg-gray-100"}`}
                  >
                    <h3 className="newspaper-headline text-center mb-4">Bull vs Bear Hologram</h3>
                    {hologramActive ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-6xl animate-spin">🐂⚡🐻</div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <div className="text-center">
                          <Sparkles className="h-12 w-12 mx-auto mb-2" />
                          <p className="font-serif">Holographic Display Inactive</p>
                          <p className="text-sm font-serif">Activate to witness the spectacle</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="newspaper-article">
                  <div
                    className={`newspaper-article-inner h-64 ${hologramActive ? "bg-orange-900/20 animate-pulse" : "bg-gray-100"}`}
                  >
                    <h3 className="newspaper-headline text-center mb-4">Bull Boxer Hologram</h3>
                    {hologramActive ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-6xl animate-bounce">🥊🐂🥊</div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <div className="text-center">
                          <Sparkles className="h-12 w-12 mx-auto mb-2" />
                          <p className="font-serif">Holographic Display Inactive</p>
                          <p className="text-sm font-serif">Activate to witness the spectacle</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {hologramActive && (
                <div className="newspaper-ad mt-6 bg-purple-100 border-4 border-purple-600">
                  <p className="newspaper-headline text-center text-purple-800">🌟 HOLOGRAPHIC DISPLAYS ACTIVE! 🌟</p>
                  <p className="text-center font-serif text-purple-700">
                    Experience the future of gaming with interactive 3D frontier characters
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ecosystem" className="space-y-6">
          <div className="newspaper-article">
            <div className="newspaper-article-inner">
              <h2 className="newspaper-section-title text-center mb-6">WYOVERSE FRONTIER ECOSYSTEM</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Digital Rodeo", icon: "🤠", description: "Ride the crypto waves in style" },
                  { title: "Mining Operations", icon: "⛏️", description: "Extract digital gold from the earth" },
                  { title: "Trading Post", icon: "💰", description: "Buy, sell, and trade frontier assets" },
                  { title: "Saloon Social", icon: "🍺", description: "Meet fellow pioneers and share tales" },
                ].map((feature, index) => (
                  <div key={index} className="newspaper-article">
                    <div className="newspaper-article-inner text-center">
                      <div className="relative mb-4">
                        <Image
                          src="/images/clutch-on-horse.webp"
                          alt={feature.title}
                          width={200}
                          height={150}
                          className="w-full h-32 object-cover border-2 border-black"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-4xl">{feature.icon}</span>
                        </div>
                      </div>
                      <h3 className="newspaper-headline text-lg mb-2">{feature.title}</h3>
                      <p className="newspaper-paragraph text-sm mb-4">{feature.description}</p>
                      <Button className="newspaper-button w-full">
                        <Play className="h-4 w-4 mr-2" />
                        Explore Territory
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Devils Tower Mystery Section */}
          <div className="newspaper-article">
            <div className="newspaper-article-inner">
              <h2 className="newspaper-section-title text-center">🗿 THE DEVILS TOWER MYSTERY</h2>
              <div className="newspaper-dateline text-center mb-6">
                Strange Phenomena Reported in the Wyoming Wilderness
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Image
                  src="/images/devils-tower-mystery.png"
                  alt="Devils Tower Mystery"
                  width={500}
                  height={400}
                  className="w-full h-64 object-cover border-4 border-black"
                />
                <div className="space-y-4">
                  <h3 className="newspaper-headline text-2xl">Ancient Secrets Await Discovery</h3>
                  <p className="newspaper-paragraph">
                    Deep in the Wyoming wilderness, Devils Tower holds secrets that predate the digital frontier.
                    Strange phenomena have been reported by local prospectors, and some say the tower itself pulses with
                    an otherworldly energy that mysteriously affects cryptocurrency market fluctuations.
                  </p>
                  <div className="newspaper-quote">
                    "I seen things up there that ain't natural, partner. The very stones seem to whisper of fortunes yet
                    to be made and lost." - Anonymous Frontier Prospector
                  </div>
                  <p className="newspaper-paragraph">
                    Join expeditions to uncover the truth behind the mysterious figure that guards the tower, and
                    discover how ancient powers might influence modern blockchain technology and digital currencies.
                  </p>
                  <Button className="newspaper-button w-full">
                    <Zap className="h-4 w-4 mr-2" />
                    Investigate the Mystery
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
