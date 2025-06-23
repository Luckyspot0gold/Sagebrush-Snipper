"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Trophy, Eye } from "lucide-react"
import Image from "next/image"

// 3D Model Viewer Component (placeholder for actual 3D integration)
function Model3DViewer({ modelUrl, title }: { modelUrl: string; title: string }) {
  return (
    <div className="w-full h-64 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center border-2 border-black">
      <div className="text-center text-white">
        <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
          <Eye className="h-8 w-8" />
        </div>
        <p className="font-serif">3D Model: {title}</p>
        <p className="text-sm opacity-75">Interactive viewer coming soon</p>
      </div>
    </div>
  )
}

export function EnhancedGamesPortal() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const { toast } = useToast()

  const models3D = [
    {
      id: "boxers",
      title: "Wolf vs Bear Boxers",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3dboxerswolfbear-o0qPswFPOv3FYjwSZnQhspNkrS6drZ.glb",
      description: "3D boxing characters ready for the ring",
    },
    {
      id: "bullbear",
      title: "Bull vs Bear Shadow",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3dbullvsbearwhiteshadow-xCCXgrczpaGYSjMJ5TWWCv1q2SWM4C.glb",
      description: "Market-themed fighters with dynamic shadows",
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
  ]

  return (
    <div className="space-y-8">
      {/* 3D Models Showcase */}
      <div className="newspaper-article">
        <div className="newspaper-article-inner">
          <h2 className="text-3xl font-bold font-serif text-center mb-6 border-b-2 border-black pb-2">
            3D CHARACTER MODELS
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
                      className="mt-3 w-full bg-black text-white hover:bg-gray-800 font-serif"
                      onClick={() => {
                        toast({
                          title: "3D Viewer Loading",
                          description: "Interactive 3D model viewer coming soon!",
                        })
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View in 3D
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Character Gallery */}
      <div className="newspaper-article">
        <div className="newspaper-article-inner">
          <h2 className="text-3xl font-bold font-serif text-center mb-6 border-b-2 border-black pb-2">
            CHARACTER GALLERY
          </h2>

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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Game Features */}
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
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/windmillwyoig-BfQQ5TnzvtvoxDT0CpmGOv65oE1Uwt.png"
                    alt="Wind Energy"
                    fill
                    className="object-cover border border-black"
                  />
                </div>
                <h3 className="font-bold font-serif">Green Energy</h3>
                <p className="text-sm font-serif">Sustainable Wyoming power</p>
              </div>
            </div>

            <div className="border-4 border-black p-1">
              <div className="border-2 border-black p-4 bg-white text-center">
                <div className="relative h-32 mb-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CryptoClassicCoverimg-MP7eNrcTX11OHJqjqFUY9TwAUrI3Rq.png"
                    alt="Crypto Classic"
                    fill
                    className="object-cover border border-black"
                  />
                </div>
                <h3 className="font-bold font-serif">Horse Racing</h3>
                <p className="text-sm font-serif">8 horses in the gate</p>
              </div>
            </div>

            <div className="border-4 border-black p-1">
              <div className="border-2 border-black p-4 bg-white text-center">
                <div className="relative h-32 mb-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bitcoinlogovenice-3slWUd1x3tcMQdH3WO8vG0FRAQZk0J.png"
                    alt="Bitcoin"
                    fill
                    className="object-cover border border-black"
                  />
                </div>
                <h3 className="font-bold font-serif">Crypto Integration</h3>
                <p className="text-sm font-serif">Real market data</p>
              </div>
            </div>

            <div className="border-4 border-black p-1">
              <div className="border-2 border-black p-4 bg-white text-center">
                <div className="h-32 mb-4 flex items-center justify-center bg-gray-100 border border-black">
                  <Trophy className="h-16 w-16 text-yellow-600" />
                </div>
                <h3 className="font-bold font-serif">Tournaments</h3>
                <p className="text-sm font-serif">Compete for prizes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
