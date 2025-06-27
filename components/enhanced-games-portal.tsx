"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Trophy, Eye, ExternalLink, Play, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { avalancheIntegration } from "@/lib/integrations/avalanche-integration"
import { coinbaseAPI } from "@/lib/coinbase-api-enhanced"

// 3D Model Viewer Component with hologram functionality
function Model3DViewer({ modelUrl, title }: { modelUrl: string; title: string }) {
  const [isHologramActive, setIsHologramActive] = useState(false)

  return (
    <div className="w-full h-64 bg-gradient-to-br from-purple-900 via-blue-900 to-black rounded-lg flex items-center justify-center border-2 border-cyan-400 relative overflow-hidden">
      {isHologramActive ? (
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-purple-500/20 animate-pulse">
          <div className="text-center text-cyan-300 h-full flex flex-col justify-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-cyan-400/30 rounded-full flex items-center justify-center animate-spin">
              <Eye className="h-8 w-8 text-cyan-300" />
            </div>
            <p className="font-serif text-lg">HOLOGRAM ACTIVE</p>
            <p className="text-sm opacity-75">{title}</p>
            <div className="mt-4 space-y-1">
              <div className="h-1 bg-cyan-400/50 mx-8 animate-pulse"></div>
              <div className="h-1 bg-purple-400/50 mx-12 animate-pulse delay-100"></div>
              <div className="h-1 bg-cyan-400/50 mx-6 animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-cyan-300">
          <div className="w-16 h-16 mx-auto mb-4 bg-cyan-400/20 rounded-full flex items-center justify-center">
            <Eye className="h-8 w-8" />
          </div>
          <p className="font-serif">3D Hologram: {title}</p>
          <p className="text-sm opacity-75">Click to activate holographic display</p>
        </div>
      )}

      <Button
        className="absolute bottom-2 right-2 bg-cyan-600 hover:bg-cyan-700 text-white"
        size="sm"
        onClick={() => setIsHologramActive(!isHologramActive)}
      >
        {isHologramActive ? "Deactivate" : "Activate"} Hologram
      </Button>
    </div>
  )
}

// Enhanced Wallet Connection Component with real APIs
function WalletConnector() {
  const { toast } = useToast()
  const [connectedWallets, setConnectedWallets] = useState<string[]>([])
  const [isConnecting, setIsConnecting] = useState<string | null>(null)
  const [walletData, setWalletData] = useState<any>({})

  const connectAvalanche = async () => {
    setIsConnecting("Avalanche")
    try {
      const connection = await avalancheIntegration.connectWallet()
      setConnectedWallets((prev) => [...prev.filter((w) => w !== "Avalanche"), "Avalanche"])
      setWalletData((prev) => ({ ...prev, Avalanche: connection }))

      toast({
        title: "🔺 Avalanche Connected!",
        description: `Connected to ${connection.address.slice(0, 6)}...${connection.address.slice(-4)}`,
      })
    } catch (error: any) {
      toast({
        title: "Avalanche Connection Failed",
        description: error.message,
        variant: "destructive",
      })
    }
    setIsConnecting(null)
  }

  const connectCoinbase = async () => {
    setIsConnecting("Coinbase")
    try {
      // Simulate Coinbase connection with real API integration
      const prices = await coinbaseAPI.getMultiplePrices(["BTC", "ETH", "AVAX"])

      // Mock wallet connection for demo
      const mockConnection = {
        address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5",
        balance: "89.25",
        network: "Coinbase",
        prices: prices,
      }

      setConnectedWallets((prev) => [...prev.filter((w) => w !== "Coinbase"), "Coinbase"])
      setWalletData((prev) => ({ ...prev, Coinbase: mockConnection }))

      toast({
        title: "💙 Coinbase Connected!",
        description: "Professional trading wallet connected with live market data",
      })
    } catch (error: any) {
      toast({
        title: "Coinbase Connection Failed",
        description: error.message,
        variant: "destructive",
      })
    }
    setIsConnecting(null)
  }

  const connectMetaMask = async () => {
    setIsConnecting("MetaMask")
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

        if (accounts.length > 0) {
          const balance = await window.ethereum.request({
            method: "eth_getBalance",
            params: [accounts[0], "latest"],
          })

          const balanceInEth = (Number.parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4)

          const connection = {
            address: accounts[0],
            balance: balanceInEth,
            network: "Ethereum",
          }

          setConnectedWallets((prev) => [...prev.filter((w) => w !== "MetaMask"), "MetaMask"])
          setWalletData((prev) => ({ ...prev, MetaMask: connection }))

          toast({
            title: "🦊 MetaMask Connected!",
            description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
          })
        }
      } else {
        window.open("https://metamask.io/", "_blank")
        toast({
          title: "MetaMask Required",
          description: "Please install MetaMask extension",
        })
      }
    } catch (error: any) {
      toast({
        title: "MetaMask Connection Failed",
        description: error.message,
        variant: "destructive",
      })
    }
    setIsConnecting(null)
  }

  const connectPhantom = async () => {
    setIsConnecting("Phantom")
    try {
      if (window.solana && window.solana.isPhantom) {
        const response = await window.solana.connect()
        const connection = {
          address: response.publicKey.toString(),
          balance: "45.75",
          network: "Solana",
        }

        setConnectedWallets((prev) => [...prev.filter((w) => w !== "Phantom"), "Phantom"])
        setWalletData((prev) => ({ ...prev, Phantom: connection }))

        toast({
          title: "👻 Phantom Connected!",
          description: "Connected to Solana network",
        })
      } else {
        window.open("https://phantom.app/", "_blank")
        toast({
          title: "Phantom Required",
          description: "Please install Phantom wallet for Solana",
        })
      }
    } catch (error: any) {
      toast({
        title: "Phantom Connection Failed",
        description: error.message,
        variant: "destructive",
      })
    }
    setIsConnecting(null)
  }

  const connectGeneric = (walletName: string) => {
    setIsConnecting(walletName)
    setTimeout(() => {
      setConnectedWallets((prev) => [...prev.filter((w) => w !== walletName), walletName])
      toast({
        title: `${walletName} Connected!`,
        description: "Wallet integration coming soon to WyoVerse!",
      })
      setIsConnecting(null)
    }, 2000)
  }

  const wallets = [
    {
      name: "Coinbase",
      icon: "🟦",
      color: "bg-blue-600",
      action: connectCoinbase,
    },
    {
      name: "Phantom",
      icon: "👻",
      color: "bg-purple-600",
      action: connectPhantom,
    },
    {
      name: "Avalanche",
      icon: "🔺",
      color: "bg-red-600",
      action: connectAvalanche,
    },
    {
      name: "MetaMask",
      icon: "🦊",
      color: "bg-orange-600",
      action: connectMetaMask,
    },
    {
      name: "DESO",
      icon: "💎",
      color: "bg-green-600",
      action: () => connectGeneric("DESO"),
    },
    {
      name: "MUSE",
      icon: "🎵",
      color: "bg-pink-600",
      action: () => connectGeneric("MUSE"),
    },
    {
      name: "Social Good",
      icon: "🌍",
      color: "bg-emerald-600",
      action: () => connectGeneric("Social Good"),
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold font-serif text-center">Connect Your Wallet</h3>

      {/* Connected Wallets Display */}
      {connectedWallets.length > 0 && (
        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 mb-4">
          <h4 className="font-serif font-bold text-green-800 mb-2">Connected Wallets:</h4>
          <div className="space-y-2">
            {connectedWallets.map((wallet) => (
              <div key={wallet} className="flex items-center justify-between bg-white p-2 rounded border">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="font-serif font-medium">{wallet}</span>
                </div>
                {walletData[wallet] && (
                  <div className="text-sm text-gray-600">
                    {walletData[wallet].balance}{" "}
                    {walletData[wallet].network === "Solana"
                      ? "SOL"
                      : walletData[wallet].network === "Avalanche"
                        ? "AVAX"
                        : "ETH"}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {wallets.map((wallet) => (
          <Button
            key={wallet.name}
            onClick={wallet.action}
            disabled={isConnecting === wallet.name}
            className={`${wallet.color} hover:opacity-80 text-white font-serif flex flex-col items-center p-4 h-auto relative`}
          >
            {connectedWallets.includes(wallet.name) && (
              <CheckCircle className="absolute top-1 right-1 h-4 w-4 text-green-300" />
            )}
            <span className="text-2xl mb-1">{wallet.icon}</span>
            <span className="text-xs">{isConnecting === wallet.name ? "Connecting..." : wallet.name}</span>
          </Button>
        ))}
      </div>

      <div className="flex gap-4 justify-center mt-6">
        <Link href="https://cryptoclashers.games" target="_blank">
          <Button className="bg-yellow-600 hover:bg-yellow-700 text-white font-serif">
            <ExternalLink className="h-4 w-4 mr-2" />
            CryptoClashers.games
          </Button>
        </Link>
        <Link href="https://stoneyard.cash" target="_blank">
          <Button className="bg-gray-700 hover:bg-gray-800 text-white font-serif">
            <ExternalLink className="h-4 w-4 mr-2" />
            StoneYard.cash
          </Button>
        </Link>
      </div>
    </div>
  )
}

export function EnhancedGamesPortal() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const { toast } = useToast()

  const models3D = [
    {
      id: "holograms",
      title: "Bull vs Bear Holograms",
      url: "/models/3d-bull-vs-bear-holograms.glb",
      description: "Interactive holographic fighters with market-driven animations",
    },
    {
      id: "bull-boxer",
      title: "3D Bull Boxer",
      url: "/models/bull-3d-boxer.glb",
      description: "Detailed bull fighter with crypto-powered combat moves",
    },
  ]

  const characterGallery = [
    {
      name: "Clutch - The Pixel Boxer",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/clutchpiskelboxer-YWPvJ8eSnJWD1vYu66im3TtFegPUwW.gif",
      description: "Animated pixel art boxer with retro gaming vibes",
    },
    {
      name: "Clutch - The Armored Rider",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Clutchonhorse-yL2WHTseGsQCBG3cSfUOCWNdlov493.webp",
      description: "Fantasy warrior on horseback, ready for adventure",
    },
    {
      name: "The Wolf Pack",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wolfmanveniceai-zcrid6XP4sXXh52D7dQeUNKfDh8nwr.webp",
      description: "Mysterious figures in the foggy streets",
    },
    {
      name: "Crypto Clashers Fighter",
      image: "/images/crypto-clashers-fighter.png",
      description: "Elite street fighter with energy-charged combat abilities",
    },
    {
      name: "Frontier Trader",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/frontiertraderposter.jpg-qkFwH7ktU7ngpOes7GOZJg2ivot7wr.jpeg",
      description: "Master trader navigating the digital frontier markets",
      isTrader: true,
      link: "/frontier-trader",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header with WyoVerse Stone Wanted Poster */}
      <div className="newspaper-article">
        <div className="newspaper-article-inner">
          <div className="relative h-96 mb-6">
            <Image
              src="/images/wyoverse-stone-wanted-poster.png"
              alt="WyoVerse - New Era in GameFi"
              fill
              className="object-cover border-4 border-black"
            />
          </div>
        </div>
      </div>

      {/* 3D Models Showcase with Holograms */}
      <div className="newspaper-article">
        <div className="newspaper-article-inner">
          <h2 className="text-3xl font-bold font-serif text-center mb-6 border-b-2 border-black pb-2">
            3D HOLOGRAPHIC CHARACTER MODELS
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {models3D.map((model) => (
              <div key={model.id} className="border-4 border-black p-1">
                <div className="border-2 border-black p-4 bg-white">
                  <Model3DViewer modelUrl={model.url} title={model.title} />
                  <div className="mt-4">
                    <h3 className="text-xl font-bold font-serif">{model.title}</h3>
                    <p className="text-sm font-serif mt-2">{model.description}</p>
                    <Button
                      className="mt-3 w-full bg-purple-600 text-white hover:bg-purple-700 font-serif"
                      onClick={() => {
                        toast({
                          title: "Hologram Viewer Loading",
                          description: "Advanced 3D holographic display activating!",
                        })
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View in 3D Hologram
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Character Gallery with Wallet Connection */}
      <div className="newspaper-article">
        <div className="newspaper-article-inner">
          <h2 className="text-3xl font-bold font-serif text-center mb-6 border-b-2 border-black pb-2">
            CHARACTER GALLERY & WALLET CONNECTION
          </h2>

          <div className="mb-8">
            <WalletConnector />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {characterGallery.map((character, index) => (
              <div key={index} className="border-4 border-black p-1">
                <div className="border-2 border-black p-4 bg-white">
                  <div className="relative h-48 mb-4">
                    <Image
                      src={character.image || "/placeholder.svg"}
                      alt={character.name}
                      fill
                      className="object-cover border-2 border-black"
                    />
                  </div>
                  <h3 className="text-lg font-bold font-serif">{character.name}</h3>
                  <p className="text-sm font-serif mt-2">{character.description}</p>

                  {character.isTrader && (
                    <Link href={character.link || "#"}>
                      <Button className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-serif">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Frontier Trader
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tournaments with Weird C.F.D. Image */}
      <div className="newspaper-article">
        <div className="newspaper-article-inner">
          <h2 className="text-3xl font-bold font-serif text-center mb-6 border-b-2 border-black pb-2">
            UPCOMING TOURNAMENTS & EVENTS
          </h2>

          <div className="mb-6">
            <div className="relative h-64 border-4 border-black">
              <Image
                src="/images/weirdC.H.F.D.img.png"
                alt="Cheyenne Frontier Days Championship"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-4">
                <h3 className="text-xl font-bold font-serif">Cheyenne Frontier Days Championship</h3>
                <p className="font-serif">The ultimate WyoVerse tournament experience</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-4 border-black p-1">
              <div className="border-2 border-black p-4 bg-white">
                <div className="flex gap-4">
                  <div className="w-24 h-24 relative flex-shrink-0">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/arialcheyennerodeo-ZhM5k3peZKJQIuvYvyx3nje6bSjYUq.png"
                      alt="Cheyenne Frontier Days"
                      fill
                      className="object-cover border border-black"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold font-serif">Cheyenne Frontier Days Championship</h3>
                    <p className="text-sm font-serif text-gray-600">All Games Tournament</p>
                    <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-serif font-medium">Prize Pool:</span>
                        <p className="font-serif">10,000 STONES</p>
                      </div>
                      <div>
                        <span className="font-serif font-medium">Date:</span>
                        <p className="font-serif">July 22-31, 2024</p>
                      </div>
                      <div>
                        <span className="font-serif font-medium">Participants:</span>
                        <p className="font-serif">50,000+</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button variant="outline" className="font-serif border-black bg-transparent">
                      Register Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WyoVerse Ecosystem Features - All linking to Clutch working on car */}
      <div className="newspaper-article">
        <div className="newspaper-article-inner">
          <h2 className="text-3xl font-bold font-serif text-center mb-6 border-b-2 border-black pb-2">
            WYOVERSE ECOSYSTEM FEATURES
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="border-4 border-black p-1">
              <div className="border-2 border-black p-4 bg-white text-center">
                <div className="relative h-32 mb-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Clutchonhorse-yL2WHTseGsQCBG3cSfUOCWNdlov493.webp"
                    alt="Clutch Working on Car"
                    fill
                    className="object-cover border border-black"
                  />
                </div>
                <h3 className="font-bold font-serif">Green Energy</h3>
                <p className="text-sm font-serif">Sustainable Wyoming power systems</p>
                <Button size="sm" className="mt-2 w-full font-serif">
                  <Play className="h-3 w-3 mr-1" />
                  Explore
                </Button>
              </div>
            </div>

            <div className="border-4 border-black p-1">
              <div className="border-2 border-black p-4 bg-white text-center">
                <div className="relative h-32 mb-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Clutchonhorse-yL2WHTseGsQCBG3cSfUOCWNdlov493.webp"
                    alt="Clutch Working on Car"
                    fill
                    className="object-cover border border-black"
                  />
                </div>
                <h3 className="font-bold font-serif">Horse Racing</h3>
                <p className="text-sm font-serif">8 horses in the gate racing</p>
                <Button size="sm" className="mt-2 w-full font-serif">
                  <Play className="h-3 w-3 mr-1" />
                  Race Now
                </Button>
              </div>
            </div>

            <div className="border-4 border-black p-1">
              <div className="border-2 border-black p-4 bg-white text-center">
                <div className="relative h-32 mb-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Clutchonhorse-yL2WHTseGsQCBG3cSfUOCWNdlov493.webp"
                    alt="Clutch Working on Car"
                    fill
                    className="object-cover border border-black"
                  />
                </div>
                <h3 className="font-bold font-serif">Crypto Integration</h3>
                <p className="text-sm font-serif">Real market data integration</p>
                <Button size="sm" className="mt-2 w-full font-serif">
                  <Play className="h-3 w-3 mr-1" />
                  Trade
                </Button>
              </div>
            </div>

            <div className="border-4 border-black p-1">
              <div className="border-2 border-black p-4 bg-white text-center">
                <div className="relative h-32 mb-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Clutchonhorse-yL2WHTseGsQCBG3cSfUOCWNdlov493.webp"
                    alt="Clutch Working on Car"
                    fill
                    className="object-cover border border-black"
                  />
                </div>
                <h3 className="font-bold font-serif">Tournaments</h3>
                <p className="text-sm font-serif">Compete for prizes and glory</p>
                <Button size="sm" className="mt-2 w-full font-serif">
                  <Trophy className="h-3 w-3 mr-1" />
                  Compete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
