"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Trophy, Car, Swords, Mountain, Palette } from "lucide-react"
import Image from "next/image"
import { useSoundEffects } from "@/lib/sound-effects"

interface GameArt {
  id: string
  title: string
  description: string
  image: string
  category: "boxing" | "racing" | "trading" | "landscape" | "character" | "abstract"
  game: string
  rarity: string
  artist: string
  year: string
}

const gameArtCollection: GameArt[] = [
  {
    id: "1",
    title: "Victory Bull Colosseum",
    description: "Epic battle scene from the crypto arena where Victory Bull dominates the ring",
    image: "/images/victory-bull-colosseum.webp",
    category: "boxing",
    game: "Crypto Clashers Boxing",
    rarity: "Legendary",
    artist: "Arena Studios",
    year: "2024",
  },
  {
    id: "2",
    title: "Bears Boxing Championship",
    description: "Intense bear market vs bull market boxing match in the grand arena",
    image: "/images/bears-boxing-arena.jpeg",
    category: "boxing",
    game: "Crypto Clashers Boxing",
    rarity: "Epic",
    artist: "Combat Arts",
    year: "2024",
  },
  {
    id: "3",
    title: "Street Fighter Champion",
    description: "Elite crypto fighter with special market-based abilities and energy aura",
    image: "/images/crypto-clashers-fighter.png",
    category: "character",
    game: "Crypto Clashers Boxing",
    rarity: "Rare",
    artist: "Fighter Studios",
    year: "2024",
  },
  {
    id: "4",
    title: "Cosmic Racing Machine",
    description: "High-speed pink racing car traveling through cosmic energy tunnels",
    image: "/images/pink-race-car.png",
    category: "racing",
    game: "Crypto Clashers Racing",
    rarity: "Legendary",
    artist: "Speed Dynamics",
    year: "2024",
  },
  {
    id: "5",
    title: "Racing Championship Poster",
    description: "Vintage-style poster advertising the crypto racing championships",
    image: "/images/crypto-clashers-racing-poster.png",
    category: "racing",
    game: "Crypto Clashers Racing",
    rarity: "Common",
    artist: "Poster Design Co.",
    year: "2024",
  },
  {
    id: "6",
    title: "Digital Mountain Range",
    description: "Futuristic landscape showing Wyoming mountains with blockchain networks",
    image: "/images/wyoverse-digital-mountain.png",
    category: "landscape",
    game: "WyoVerse Explorer",
    rarity: "Epic",
    artist: "Landscape Labs",
    year: "2024",
  },
  {
    id: "7",
    title: "Mandala of the Frontier",
    description: "Intricate black and white mandala representing the complexity of the digital frontier",
    image: "/images/venice-mandala-art.png",
    category: "abstract",
    game: "Frontier Meditation",
    rarity: "Rare",
    artist: "Venice AI",
    year: "2024",
  },
]

export function GameArtGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedArt, setSelectedArt] = useState<GameArt | null>(null)
  const { playWaxSeal, playInkDrop } = useSoundEffects()

  const categories = [
    { id: "all", name: "All Artwork", icon: Palette },
    { id: "boxing", name: "Boxing Arena", icon: Trophy },
    { id: "racing", name: "Racing Circuit", icon: Car },
    { id: "character", name: "Characters", icon: Swords },
    { id: "landscape", name: "Landscapes", icon: Mountain },
    { id: "abstract", name: "Abstract Art", icon: Palette },
  ]

  const filteredArt =
    selectedCategory === "all"
      ? gameArtCollection
      : gameArtCollection.filter((art) => art.category === selectedCategory)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-100 text-gray-800"
      case "Rare":
        return "bg-blue-100 text-blue-800"
      case "Epic":
        return "bg-purple-100 text-purple-800"
      case "Legendary":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleArtClick = (art: GameArt) => {
    playInkDrop()
    setSelectedArt(art)
  }

  const handlePlayGame = (game: string) => {
    playWaxSeal()
    // Navigate to game
    console.log("Playing game:", game)
  }

  return (
    <div className="space-y-6">
      {/* Gallery Header */}
      <div className="newspaper-article">
        <div className="newspaper-article-inner text-center">
          <h1 className="text-4xl font-steampunk brass-text mb-2">🎨 WYOVERSE ART GALLERY 🎨</h1>
          <p className="font-vintage text-lg mb-4">"Where Digital Art Meets Frontier Spirit"</p>
          <div className="flex justify-center">
            <Badge className="bg-amber-100 text-amber-800 font-vintage">
              {gameArtCollection.length} Masterpieces on Display
            </Badge>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-6">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="font-vintage text-xs">
              <category.icon className="h-4 w-4 mr-1" />
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-6">
          {/* Art Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArt.map((art) => (
              <Card
                key={art.id}
                className="vintage-card p-4 cursor-pointer hover:shadow-xl transition-all duration-300 ink-bleed"
                onClick={() => handleArtClick(art)}
              >
                <div className="relative mb-4">
                  <Image
                    src={art.image || "/placeholder.svg"}
                    alt={art.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover border-2 border-amber-600 rounded"
                  />
                  <Badge className={`absolute top-2 right-2 ${getRarityColor(art.rarity)}`}>{art.rarity}</Badge>
                </div>

                <div className="space-y-2">
                  <h3 className="font-vintage font-bold text-lg">{art.title}</h3>
                  <p className="text-sm font-serif text-gray-600 line-clamp-2">{art.description}</p>

                  <div className="flex justify-between items-center text-xs font-serif">
                    <span>by {art.artist}</span>
                    <span className="text-amber-600">{art.year}</span>
                  </div>

                  <div className="pt-2">
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePlayGame(art.game)
                      }}
                      className="w-full font-vintage bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Play {art.game}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Art Detail Modal */}
      {selectedArt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="vintage-card max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-steampunk brass-text">{selectedArt.title}</h2>
                <Button variant="ghost" onClick={() => setSelectedArt(null)} className="text-2xl font-bold">
                  ×
                </Button>
              </div>

              <div className="relative mb-4">
                <Image
                  src={selectedArt.image || "/placeholder.svg"}
                  alt={selectedArt.title}
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-96 object-cover border-2 border-amber-600 rounded"
                />
              </div>

              <div className="space-y-4">
                <p className="font-serif text-gray-700">{selectedArt.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm font-serif">
                  <div>
                    <strong>Artist:</strong> {selectedArt.artist}
                  </div>
                  <div>
                    <strong>Year:</strong> {selectedArt.year}
                  </div>
                  <div>
                    <strong>Game:</strong> {selectedArt.game}
                  </div>
                  <div>
                    <strong>Rarity:</strong>
                    <Badge className={`ml-2 ${getRarityColor(selectedArt.rarity)}`}>{selectedArt.rarity}</Badge>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => handlePlayGame(selectedArt.game)}
                    className="flex-1 font-vintage bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Play Game
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 font-vintage border-amber-600 text-amber-800 hover:bg-amber-50"
                  >
                    Add to Collection
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
