"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ExternalLink, Heart, Share2, Download, Palette, Trophy, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ArtPiece {
  id: string
  title: string
  artist: string
  description: string
  image: string
  category: "poster" | "concept" | "character" | "environment" | "promotional"
  game?: string
  rarity: "common" | "rare" | "epic" | "legendary"
  price?: string
  likes: number
  isNFT?: boolean
  githubRepo?: string
}

const ART_COLLECTION: ArtPiece[] = [
  {
    id: "wolf-celtic-mandala",
    title: "Celtic Wolf Mandala",
    artist: "Venice AI Studios",
    description:
      "An intricate Celtic-inspired mandala featuring a majestic wolf surrounded by ornate purple and gold scrollwork. This piece represents the spiritual connection between the frontier and ancient wisdom.",
    image: "/images/wolfirishscotishposter.png",
    category: "concept",
    rarity: "legendary",
    price: "500 STONES",
    likes: 247,
    isNFT: true,
    githubRepo: "LuckyspotOgold",
  },
  {
    id: "crypto-clashers-boxing-cars",
    title: "Crypto Clashers: Boxing & Racing",
    artist: "Stoneyard Gaming",
    description:
      "Epic promotional artwork showcasing both the boxing arena and racing circuit from our hit game Crypto Clashers. Features the iconic bull vs bear showdown with classic and modern racing vehicles.",
    image: "/images/cryptoclasherwcarsposter.jpg",
    category: "promotional",
    game: "Crypto Clashers",
    rarity: "epic",
    price: "250 STONES",
    likes: 189,
    isNFT: true,
    githubRepo: "LuckyspotOgold",
  },
  {
    id: "crypto-clashers-boxing-pure",
    title: "Crypto Clashers: Pure Boxing",
    artist: "Stoneyard Gaming",
    description:
      "Intense boxing match artwork featuring our signature bull and bear fighters in the mountain arena. This piece captures the raw energy and competitive spirit of blockchain gaming.",
    image: "/images/cryptoclasherboxingposter.jpg",
    category: "promotional",
    game: "Crypto Clashers Boxing",
    rarity: "epic",
    price: "300 STONES",
    likes: 156,
    isNFT: true,
    githubRepo: "LuckyspotOgold",
  },
  {
    id: "wyoverse-wanted-poster",
    title: "WyoVerse: New Era Wanted Poster",
    artist: "Frontier Design Co.",
    description:
      "Iconic WyoVerse promotional poster featuring the mysterious cowboy silhouette against a frontier town backdrop. Crypto symbols in the starry sky represent the bridge between old west and digital future.",
    image: "/images/wyoversestonewanted.png",
    category: "promotional",
    game: "WyoVerse",
    rarity: "legendary",
    price: "750 STONES",
    likes: 312,
    isNFT: true,
    githubRepo: "LuckyspotOgold",
  },
  {
    id: "frontier-encampment",
    title: "Historical Frontier Encampment",
    artist: "Wyoming Historical Society",
    description:
      "Authentic historical scene depicting Native American encampment with traditional teepees and horseback riders. This piece honors the original inhabitants of the Wyoming territory.",
    image: "/images/weirdC.H.F.D.img.png",
    category: "environment",
    rarity: "rare",
    price: "150 STONES",
    likes: 98,
    isNFT: false,
  },
  {
    id: "clutch-armored-knight",
    title: "Clutch: The Armored Knight",
    artist: "Venice AI Studios",
    description:
      "Fantasy steampunk artwork featuring Clutch, our beloved wolf mascot, as an armored knight riding through a modern cityscape. Represents the evolution from frontier to future.",
    image: "/images/clutchonhorse.webp",
    category: "character",
    rarity: "epic",
    price: "400 STONES",
    likes: 203,
    isNFT: true,
    githubRepo: "LuckyspotOgold",
  },
  {
    id: "cheyenne-rodeo-aerial",
    title: "Cheyenne Frontier Days Aerial View",
    artist: "Wyoming Tourism Board",
    description:
      "Spectacular aerial photograph of the famous Cheyenne Frontier Days rodeo, showing the massive crowds, arena, and festival atmosphere that defines Wyoming's frontier spirit.",
    image: "/images/arialcheyennerodeo.png",
    category: "environment",
    rarity: "rare",
    price: "200 STONES",
    likes: 134,
    isNFT: false,
  },
  {
    id: "frontier-trader-poster",
    title: "Frontier Trader: GameFi Revolution",
    artist: "Stoneyard Gaming",
    description:
      "Official promotional artwork for Frontier Trader, showcasing the mysterious cowboy figure who bridges the gap between traditional frontier trading and modern blockchain technology.",
    image: "/images/frontiertraderposter.jpg",
    category: "promotional",
    game: "Frontier Trader",
    rarity: "legendary",
    price: "600 STONES",
    likes: 278,
    isNFT: true,
    githubRepo: "LuckyspotOgold",
  },
]

export function GameArtGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedPiece, setSelectedPiece] = useState<ArtPiece | null>(null)
  const [likedPieces, setLikedPieces] = useState<Set<string>>(new Set())

  const categories = ["all", "promotional", "character", "concept", "environment"]

  const filteredArt =
    selectedCategory === "all" ? ART_COLLECTION : ART_COLLECTION.filter((piece) => piece.category === selectedCategory)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "bg-yellow-500 text-black"
      case "epic":
        return "bg-purple-600 text-white"
      case "rare":
        return "bg-blue-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const handleLike = (pieceId: string) => {
    setLikedPieces((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(pieceId)) {
        newSet.delete(pieceId)
      } else {
        newSet.add(pieceId)
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Gallery Header */}
        <div className="text-center mb-8 border-4 border-black bg-white p-6 shadow-lg">
          <h1 className="text-4xl font-serif font-bold mb-4 headline-primary">
            🎨 WYOVERSE ART GALLERY & EXHIBITION HALL
          </h1>
          <p className="text-lg font-serif mb-4">
            "Showcasing the Finest Digital Art from the Frontier" • Featuring Games from LuckyspotOgold@github
          </p>
          <div className="flex justify-center items-center gap-4 text-sm font-serif">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span>{ART_COLLECTION.length} Masterpieces</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>Crypto Clashers Collection</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>NFT Marketplace Ready</span>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`font-serif border-black ${
                selectedCategory === category ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        {/* LuckyspotOgold Games Showcase */}
        <div className="mb-8 border-4 border-purple-600 bg-purple-50 p-6 rounded-lg">
          <h2 className="text-2xl font-serif font-bold mb-4 text-center">
            🎮 FEATURED GAMES FROM LUCKYSPOTOGOLD@GITHUB
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-2 border-purple-600">
              <CardHeader className="text-center">
                <CardTitle className="font-serif">🥊 Crypto Clashers Boxing</CardTitle>
                <CardDescription>Epic bull vs bear boxing matches</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/boxing-arena">
                  <Button className="w-full frontier-button">Play Now</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="border-2 border-purple-600">
              <CardHeader className="text-center">
                <CardTitle className="font-serif">🏁 Crypto Clashers Racing</CardTitle>
                <CardDescription>High-speed blockchain racing</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/racing-circuit">
                  <Button className="w-full frontier-button">Race Now</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="border-2 border-purple-600">
              <CardHeader className="text-center">
                <CardTitle className="font-serif">🤠 Frontier Trader</CardTitle>
                <CardDescription>Revolutionary GameFi platform</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/frontier-trader">
                  <Button className="w-full frontier-button">Trade Now</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Art Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArt.map((piece) => (
            <Card key={piece.id} className="border-4 border-black shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="p-0">
                <div className="relative">
                  <Image
                    src={piece.image || "/placeholder.svg"}
                    alt={piece.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 left-2 flex gap-2">
                    <Badge className={getRarityColor(piece.rarity)}>{piece.rarity.toUpperCase()}</Badge>
                    {piece.isNFT && <Badge className="bg-green-600 text-white">NFT</Badge>}
                  </div>
                  {piece.githubRepo && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-purple-600 text-white">@{piece.githubRepo}</Badge>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="font-serif text-lg mb-2">{piece.title}</CardTitle>
                <CardDescription className="font-serif text-sm mb-3">By {piece.artist}</CardDescription>
                {piece.game && <Badge className="mb-3 bg-blue-600 text-white">{piece.game}</Badge>}
                <p className="font-serif text-sm text-gray-700 mb-4 line-clamp-3">{piece.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleLike(piece.id)}
                      className={likedPieces.has(piece.id) ? "text-red-600" : ""}
                    >
                      <Heart className={`h-4 w-4 ${likedPieces.has(piece.id) ? "fill-current" : ""}`} />
                      {piece.likes + (likedPieces.has(piece.id) ? 1 : 0)}
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {piece.price && <span className="font-serif font-bold text-green-600">{piece.price}</span>}
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="flex-1 frontier-button">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle className="font-serif text-2xl">{piece.title}</DialogTitle>
                        <DialogDescription className="font-serif">
                          By {piece.artist} • {piece.category} • {piece.rarity}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <Image
                            src={piece.image || "/placeholder.svg"}
                            alt={piece.title}
                            width={600}
                            height={400}
                            className="w-full h-auto rounded-lg border-2 border-black"
                          />
                        </div>
                        <div className="space-y-4">
                          <p className="font-serif">{piece.description}</p>
                          {piece.game && (
                            <div>
                              <strong>Featured Game:</strong> {piece.game}
                            </div>
                          )}
                          {piece.githubRepo && (
                            <div>
                              <strong>Developer:</strong> @{piece.githubRepo}
                            </div>
                          )}
                          <div className="flex gap-2">
                            {piece.isNFT && (
                              <Button className="frontier-button">
                                <Download className="h-4 w-4 mr-2" />
                                Mint NFT
                              </Button>
                            )}
                            {piece.githubRepo && (
                              <Button variant="outline" className="border-black">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View on GitHub
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  {piece.isNFT && (
                    <Button size="sm" variant="outline" className="border-black">
                      Buy NFT
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center border-4 border-black bg-white p-6">
          <h3 className="text-2xl font-serif font-bold mb-4">Visit Our Gaming Portfolio</h3>
          <p className="font-serif mb-4">Explore more games and projects from LuckyspotOgold on GitHub</p>
          <div className="flex justify-center gap-4">
            <Button className="frontier-button">
              <ExternalLink className="h-4 w-4 mr-2" />
              GitHub Repository
            </Button>
            <Button variant="outline" className="border-black">
              <Trophy className="h-4 w-4 mr-2" />
              Game Collection
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameArtGallery
