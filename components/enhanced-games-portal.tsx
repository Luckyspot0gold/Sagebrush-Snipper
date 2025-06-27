"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { AvalancheIntegration } from "@/lib/integrations/avalanche-integration"
import { CoinbaseAPI } from "@/lib/coinbase-api-enhanced"

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

  // Initialize APIs
  const avalancheIntegration = new AvalancheIntegration()
  const coinbaseAPI = new CoinbaseAPI()

  useEffect(() => {
    // Load crypto prices on component mount
    loadCryptoPrices()
  }, [])

  const loadCryptoPrices = async () => {
    try {
      const prices = await coinbaseAPI.getSpotPrices(["BTC-USD", "ETH-USD", "AVAX-USD"])
      setCryptoPrices(prices)
    } catch (error) {
      console.error("Failed to load crypto prices:", error)
    }
  }

  const connectWallet = async (walletName: string) => {
    setIsConnecting(walletName)

    try {
      let connection: Partial<WalletConnection> = {}

      switch (walletName) {
        case "Avalanche":
          const avalancheResult = await avalancheIntegration.connectWallet()
          if (avalancheResult.success) {
            connection = {
              connected: true,
              address: avalancheResult.address,
              balance: `${avalancheResult.balance} AVAX`,
            }
            toast({
              title: "Avalanche Connected!",
              description: `Connected to ${avalancheResult.address?.slice(0, 6)}...${avalancheResult.address?.slice(-4)}`,
            })
          }
          break

        case "Coinbase":
          // Coinbase Wallet connection logic
          if (typeof window !== "undefined" && (window as any).ethereum) {
            const accounts = await (window as any).ethereum.request({
              method: "eth_requestAccounts",
            })
            if (accounts.length > 0) {
              const balance = await (window as any).ethereum.request({
                method: "eth_getBalance",
                params: [accounts[0], "latest"],
              })
              connection = {
                connected: true,
                address: accounts[0],
                balance: `${Number.parseInt(balance, 16) / 1e18} ETH`,
              }
              toast({
                title: "Coinbase Connected!",
                description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
              })
            }
          }
          break

        case "MetaMask":
          if (typeof window !== "undefined" && (window as any).ethereum) {
            const accounts = await (window as any).ethereum.request({
              method: "eth_requestAccounts",
            })
            if (accounts.length > 0) {
              const balance = await (window as any).ethereum.request({
                method: "eth_getBalance",
                params: [accounts[0], "latest"],
              })
              connection = {
                connected: true,
                address: accounts[0],
                balance: `${(Number.parseInt(balance, 16) / 1e18).toFixed(4)} ETH`,
              }
              toast({
                title: "MetaMask Connected!",
                description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
              })
            }
          }
          break

        default:
          // Simulate connection for other wallets
          connection = {
            connected: true,
            address: `0x${Math.random().toString(16).substr(2, 8)}...`,
            balance: `${(Math.random() * 10).toFixed(2)} tokens`,
          }
          toast({
            title: `${walletName} Connected!`,
            description: "Wallet connected successfully",
          })
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
      <div className="relative mb-8 overflow-hidden rounded-lg border-4 border-black">
        <Image
          src="/images/wyoverse-stone-wanted-poster.png"
          alt="WyoVerse Gaming Portal"
          width={1200}
          height={600}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-6xl font-serif font-bold mb-4 headline-primary">WYOVERSE GAMING PORTAL</h1>
            <p className="text-2xl font-serif headline-secondary">
              New Era in GameFi - Where Crypto Meets the Frontier
            </p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8 border-2 border-black">
          <TabsTrigger value="overview" className="font-serif">
            🎮 Overview
          </TabsTrigger>
          <TabsTrigger value="characters" className="font-serif">
            👤 Characters
          </TabsTrigger>
          <TabsTrigger value="tournaments" className="font-serif">
            🏆 Tournaments
          </TabsTrigger>
          <TabsTrigger value="holograms" className="font-serif">
            ✨ 3D Models
          </TabsTrigger>
          <TabsTrigger value="ecosystem" className="font-serif">
            🌐 Ecosystem
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Wallet Connection Section */}
          <Card className="border-4 border-black newspaper-article">
            <CardHeader className="border-b-2 border-black bg-amber-100">
              <CardTitle className="font-serif headline-primary flex items-center gap-2">
                <Wallet className="h-6 w-6" />
                Connect Your Wallets
              </CardTitle>
              <CardDescription className="font-serif">
                Connect multiple wallets to access all WyoVerse features
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {walletConnections.map((wallet) => (
                  <div key={wallet.name} className="text-center">
                    <Button
                      onClick={() => connectWallet(wallet.name)}
                      disabled={isConnecting === wallet.name}
                      className={`w-full h-20 flex flex-col items-center justify-center gap-2 ${
                        wallet.connected ? "bg-green-500 hover:bg-green-600" : wallet.color
                      } text-white font-serif`}
                    >
                      <span className="text-2xl">{wallet.icon}</span>
                      <span className="text-xs">{isConnecting === wallet.name ? "Connecting..." : wallet.name}</span>
                      {wallet.connected && <span className="text-xs">✓</span>}
                    </Button>
                    {wallet.connected && wallet.address && (
                      <div className="mt-2 text-xs font-mono">
                        <div>
                          {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                        </div>
                        <div className="text-green-600 font-bold">{wallet.balance}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Game Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-4 border-black newspaper-article">
              <CardHeader className="border-b-2 border-black bg-red-100">
                <CardTitle className="font-serif headline-primary">🥊 Crypto Clashers</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Image
                  src="/images/crypto-clashers-fighter.png"
                  alt="Crypto Clashers"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="font-serif mb-4">
                  Enter the ring and battle with crypto-powered fighters in the ultimate blockchain boxing experience.
                </p>
                <Link href="https://CryptoClashers.games" target="_blank">
                  <Button className="frontier-button w-full font-serif">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Play Crypto Clashers
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-4 border-black newspaper-article">
              <CardHeader className="border-b-2 border-black bg-amber-100">
                <CardTitle className="font-serif headline-primary">⛏️ Stone Yard</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Image
                  src="/images/bar-keep-bill-poster.png"
                  alt="Stone Yard"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="font-serif mb-4">
                  Mine, trade, and build your fortune in the digital frontier's premier mining simulation.
                </p>
                <Link href="https://StoneYard.cash" target="_blank">
                  <Button className="frontier-button w-full font-serif">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Stone Yard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Live Market Data */}
          {Object.keys(cryptoPrices).length > 0 && (
            <Card className="border-4 border-black newspaper-article">
              <CardHeader className="border-b-2 border-black bg-green-100">
                <CardTitle className="font-serif headline-primary flex items-center gap-2">
                  <Coins className="h-6 w-6" />
                  Live Market Data
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(cryptoPrices).map(([pair, price]: [string, any]) => (
                    <div key={pair} className="text-center p-4 border-2 border-black rounded-lg">
                      <div className="font-serif font-bold text-lg">{pair}</div>
                      <div className="text-2xl font-bold text-green-600">${price.amount}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="characters" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gameCharacters.map((character) => (
              <Card
                key={character.id}
                className={`border-4 border-black newspaper-article cursor-pointer hover:shadow-lg transition-shadow ${getRarityColor(character.rarity)}`}
              >
                <CardHeader className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={character.image || "/placeholder.svg"} alt={character.name} />
                    <AvatarFallback>{character.name[0]}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="font-serif">{character.name}</CardTitle>
                  <Badge variant="outline" className={getRarityColor(character.rarity)}>
                    {character.rarity}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-serif">Power:</span>
                      <Progress value={character.stats.power} className="w-20" />
                    </div>
                    <div className="flex justify-between">
                      <span className="font-serif">Speed:</span>
                      <Progress value={character.stats.speed} className="w-20" />
                    </div>
                    <div className="flex justify-between">
                      <span className="font-serif">Defense:</span>
                      <Progress value={character.stats.defense} className="w-20" />
                    </div>
                  </div>
                  {character.id === "frontier-trader" && (
                    <Link href="/frontier-trader" className="mt-4 block">
                      <Button className="frontier-button w-full font-serif">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Frontier Trader
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tournaments" className="space-y-6">
          <Card className="border-4 border-black newspaper-article">
            <CardHeader className="border-b-2 border-black bg-yellow-100">
              <CardTitle className="font-serif headline-primary flex items-center gap-2">
                <Trophy className="h-6 w-6" />
                Cheyenne Frontier Days Championship
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Image
                    src="/images/weirdC.H.F.D.img.png"
                    alt="Cheyenne Frontier Days Championship"
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover rounded-lg border-2 border-black"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold">The Ultimate Frontier Tournament</h3>
                  <p className="font-serif">
                    Join the most prestigious gaming tournament in the digital frontier. Compete in multiple games
                    across the WyoVerse ecosystem for massive crypto prizes and eternal glory.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-serif">Prize Pool:</span>
                      <span className="font-bold">$50,000 USDC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-serif">Entry Fee:</span>
                      <span className="font-bold">0.1 ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-serif">Start Date:</span>
                      <span className="font-bold">July 4th, 2024</span>
                    </div>
                  </div>
                  <Button className="frontier-button w-full font-serif">
                    <Trophy className="h-4 w-4 mr-2" />
                    Register for Tournament
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="holograms" className="space-y-6">
          <Card className="border-4 border-black newspaper-article">
            <CardHeader className="border-b-2 border-black bg-purple-100">
              <CardTitle className="font-serif headline-primary flex items-center gap-2">
                <Sparkles className="h-6 w-6" />
                3D Holographic Models
              </CardTitle>
              <CardDescription className="font-serif">
                View interactive 3D models of your favorite WyoVerse characters
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <Button
                  onClick={() => setHologramActive(!hologramActive)}
                  className={`frontier-button font-serif ${hologramActive ? "bg-purple-600" : ""}`}
                >
                  {hologramActive ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                  {hologramActive ? "Deactivate Holograms" : "Activate Holograms"}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div
                  className={`relative border-4 border-purple-500 rounded-lg p-6 h-64 ${hologramActive ? "bg-purple-900/20 animate-pulse" : "bg-gray-100"}`}
                >
                  <h3 className="font-serif font-bold text-center mb-4">Bull vs Bear Hologram</h3>
                  {hologramActive ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-6xl animate-spin">🐂⚡🐻</div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <Sparkles className="h-12 w-12 mx-auto mb-2" />
                        <p className="font-serif">Hologram Inactive</p>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className={`relative border-4 border-orange-500 rounded-lg p-6 h-64 ${hologramActive ? "bg-orange-900/20 animate-pulse" : "bg-gray-100"}`}
                >
                  <h3 className="font-serif font-bold text-center mb-4">Bull Boxer Hologram</h3>
                  {hologramActive ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-6xl animate-bounce">🥊🐂🥊</div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <Sparkles className="h-12 w-12 mx-auto mb-2" />
                        <p className="font-serif">Hologram Inactive</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {hologramActive && (
                <div className="mt-6 p-4 bg-purple-100 border-2 border-purple-500 rounded-lg">
                  <p className="font-serif text-center text-purple-800">
                    🌟 Holograms Active! Experience the future of gaming with interactive 3D characters 🌟
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ecosystem" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Digital Rodeo", icon: "🤠", description: "Ride the crypto waves" },
              { title: "Mining Operations", icon: "⛏️", description: "Extract digital gold" },
              { title: "Trading Post", icon: "💰", description: "Buy, sell, trade assets" },
              { title: "Saloon Social", icon: "🍺", description: "Meet fellow pioneers" },
            ].map((feature, index) => (
              <Card key={index} className="border-4 border-black newspaper-article">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <Image
                      src="/images/clutch-on-horse.webp"
                      alt={feature.title}
                      width={200}
                      height={150}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                      <span className="text-4xl">{feature.icon}</span>
                    </div>
                  </div>
                  <h3 className="font-serif font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="font-serif text-sm text-gray-600 mb-4">{feature.description}</p>
                  <Button className="frontier-button w-full font-serif">
                    <Play className="h-4 w-4 mr-2" />
                    Explore
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Devils Tower Mystery Section */}
          <Card className="border-4 border-black newspaper-article">
            <CardHeader className="border-b-2 border-black bg-gray-100">
              <CardTitle className="font-serif headline-primary">🗿 The Devils Tower Mystery</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Image
                  src="/images/devils-tower-mystery.png"
                  alt="Devils Tower Mystery"
                  width={500}
                  height={400}
                  className="w-full h-64 object-cover rounded-lg border-2 border-black"
                />
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold">Ancient Secrets Await</h3>
                  <p className="font-serif">
                    Deep in the Wyoming wilderness, Devils Tower holds secrets that predate the digital frontier.
                    Strange phenomena have been reported, and some say the tower itself pulses with an otherworldly
                    energy that affects cryptocurrency markets.
                  </p>
                  <p className="font-serif">
                    Join expeditions to uncover the truth behind the mysterious figure that guards the tower, and
                    discover how ancient powers might influence modern blockchain technology.
                  </p>
                  <Button className="frontier-button w-full font-serif">
                    <Zap className="h-4 w-4 mr-2" />
                    Investigate the Mystery
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
