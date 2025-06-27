"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Trophy, Eye, ExternalLink, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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

// Wallet Connection Component
function WalletConnector() {
  const { toast } = useToast()

  const wallets = [
    { name: "Coinbase", icon: "🟦", color: "bg-blue-600" },
    { name: "Phantom", icon: "👻", color: "bg-purple-600" },
    { name: "Avalanche", icon: "🔺", color: "bg-red-600" },
    { name: "MetaMask", icon: "🦊", color: "bg-orange-600" },
    { name: "DESO", icon: "💎", color: "bg-green-600" },
    { name: "MUSE", icon: "🎵", color: "bg-pink-600" },
    { name: "Social Good", icon: "🌍", color: "bg-emerald-600" },
  ]

  const connectWallet = (walletName: string) => {
    toast({
      title: `Connecting to ${walletName}`,
      description: "Wallet integration coming soon to WyoVerse!",
    })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold font-serif text-center">Connect Your Wallet</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {wallets.map((wallet) => (
          <Button
            key={wallet.name}
            onClick={() => connectWallet(wallet.name)}
            className={`${wallet.color} hover:opacity-80 text-white font-serif flex flex-col items-center p-4 h-auto`}
          >
            <span className="text-2xl mb-1">{wallet.icon}</span>
            <span className="text-xs">{wallet.name}</span>
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
