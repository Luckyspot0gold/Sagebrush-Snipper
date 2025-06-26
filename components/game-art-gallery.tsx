"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Share2, ExternalLink, Palette, Trophy, Star } from "lucide-react"
import Image from "next/image"

interface ArtPiece {
  id: string
  title: string
  artist: string
  description: string
  image: string
  category: "nft" | "poster" | "historical" | "fantasy" | "photography"
  rarity: "common" | "rare" | "epic" | "legendary"
  price?: number
  likes: number
  gameConnection?: string
  githubRepo?: string
}

const ART_COLLECTION: ArtPiece[] = [
  {
    id: "celtic-wolf-mandala",
    title: "Celtic Wolf Mandala",
    artist: "Venice AI Studios",
    description:
      "An intricate Celtic-inspired mandala featuring a majestic wolf surrounded by ornate purple and gold scrollwork. This legendary NFT represents the spiritual connection between ancient Celtic traditions and the digital frontier.",
    image: "/images/wolfirishscotishposter.png",
    category: "nft",
    rarity: "legendary",
    price: 2.5,
    likes: 847,
    gameConnection: "Spiritual Guardian NFT - Provides +50 Wisdom in all games",
  },
  {
    id: "crypto-clashers-racing",
    title: "Crypto Clashers: Racing Edition",
    artist: "LuckyspotOgold Studios",
    description:
      "Epic promotional poster for the revolutionary Crypto Clashers Racing game featuring bull vs bear market dynamics with high-speed blockchain racing action set against the majestic Wyoming mountains.",
    image: "/images/cryptoclasherwcarsposter.jpg",
    category: "poster",
    rarity: "epic",
    price: 1.2,
    likes: 623,
    gameConnection: "Crypto Clashers Racing",
    githubRepo: "LuckyspotOgold@github",
  },
  {
    id: "crypto-clashers-boxing",
    title: "Crypto Clashers: Boxing Championship",
    artist: "LuckyspotOgold Studios",
    description:
      "Intense boxing match poster showcasing the eternal battle between bulls and bears in the crypto market. Features stunning mountain backdrop and explosive combat action from the hit blockchain game.",
    image: "/images/cryptoclasherboxingposter.jpg",
    category: "poster",
    rarity: "epic",
    price: 1.2,
    likes: 789,
    gameConnection: "Crypto Clashers Boxing",
    githubRepo: "LuckyspotOgold@github",
  },
  {
    id: "wyoverse-wanted-poster",
    title: "WyoVerse: Digital Frontier Marshal",
    artist: "Stoneyard Gaming",
    description:
      "Iconic wanted poster style artwork featuring a mysterious cowboy silhouette against the frontier town backdrop. Crypto symbols dance in the starry sky above, representing the new era of GameFi.",
    image: "/images/wyoversestonewanted.png",
    category: "poster",
    rarity: "rare",
    price: 0.8,
    likes: 456,
    gameConnection: "WyoVerse Main Character NFT",
  },
  {
    id: "frontier-encampment",
    title: "Historical Frontier Encampment",
    artist: "Venice Historical Archives",
    description:
      "Authentic sepia-toned photograph capturing a Native American encampment with traditional teepees and horseback riders. This rare historical piece documents the true spirit of the American frontier.",
    image: "/images/weirdC.H.F.D.img.png",
    category: "historical",
    rarity: "rare",
    price: 0.6,
    likes: 234,
    gameConnection: "Unlocks Historical Knowledge in Native History section",
  },
  {
    id: "clutch-armored-knight",
    title: "Clutch: The Armored Knight",
    artist: "Venice Fantasy Studios",
    description:
      "Spectacular fantasy artwork featuring Clutch, the legendary wolf warrior, mounted on his trusty steed in full battle armor. Set against a steampunk cityscape, this piece bridges medieval fantasy with modern adventure.",
    image: "/images/clutchonhorse.webp",
    category: "fantasy",
    rarity: "epic",
    price: 1.5,
    likes: 567,
    gameConnection: "Clutch Character Skin - Unlocks special abilities",
  },
  {
    id: "cheyenne-rodeo-aerial",
    title: "Cheyenne Frontier Days Spectacular",
    artist: "Wyoming Tourism Board",
    description:
      "Breathtaking aerial photography of the world-famous Cheyenne Frontier Days rodeo. Captures thousands of spectators, arena action, and the authentic spirit of the American West in stunning detail.",
    image: "/images/arialcheyennerodeo.png",
    category: "photography",
    rarity: "common",
    price: 0.3,
    likes: 345,
    gameConnection: "Unlocks Rodeo Events in Sports section",
  },
]

export function GameArtGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [likedPieces, setLikedPieces] = useState<Set<string>>(new Set())

  const filteredArt =
    selectedCategory === "all" ? ART_COLLECTION : ART_COLLECTION.filter((piece) => piece.category === selectedCategory)

  const handleLike = (pieceId: string) => {
    const newLiked = new Set(likedPieces)
    if (newLiked.has(pieceId)) {
      newLiked.delete(pieceId)
    } else {
      newLiked.add(pieceId)
    }
    setLikedPieces(newLiked)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 text-black"
      case "epic":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      case "rare":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return <Trophy className="h-4 w-4" />
      case "epic":
        return <Star className="h-4 w-4" />
      case "rare":
        return <Palette className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="newspaper-bg min-h-screen p-6">
      <Card className="border-4 border-black shadow-lg max-w-7xl mx-auto newspaper-article">
        <CardHeader className="border-b-2 border-black bg-amber-900 text-white newspaper-article-inner">
          <CardTitle className="text-4xl font-serif headline-primary text-center">
            🎨 WyoVerse Art Gallery & NFT Marketplace
          </CardTitle>
          <CardDescription className="text-xl font-serif text-center text-amber-200">
            Featuring Exclusive Artwork from LuckyspotOgold@github Games
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 newspaper-article-inner">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-6 border-2 border-black">
              <TabsTrigger value="all" className="font-serif">
                All Art
              </TabsTrigger>
              <TabsTrigger value="nft" className="font-serif">
                NFTs
              </TabsTrigger>
              <TabsTrigger value="poster" className="font-serif">
                Game Posters
              </TabsTrigger>
              <TabsTrigger value="historical" className="font-serif">
                Historical
              </TabsTrigger>
              <TabsTrigger value="fantasy" className="font-serif">
                Fantasy
              </TabsTrigger>
              <TabsTrigger value="photography" className="font-serif">
                Photography
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory} className="space-y-6">
              {/* Featured LuckyspotOgold Games Banner */}
              <Card className="border-4 border-red-600 bg-gradient-to-r from-red-100 to-yellow-100">
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="text-2xl font-serif font-bold text-red-800 mb-2">
                      🎮 Featured Games from LuckyspotOgold@github
                    </h3>
                    <p className="text-lg font-serif text-red-700 mb-3">
                      Experience the Revolutionary Crypto Clashers Series!
                    </p>
                    <div className="flex justify-center gap-4">
                      <Button className="frontier-button font-serif">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Play Crypto Clashers Boxing
                      </Button>
                      <Button className="frontier-button font-serif">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Play Crypto Clashers Racing
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Art Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArt.map((piece) => (
                  <Card
                    key={piece.id}
                    className="border-2 border-black hover:shadow-xl transition-shadow newspaper-article"
                  >
                    <div className="relative">
                      <Image
                        src={piece.image || "/placeholder.svg"}
                        alt={piece.title}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover rounded-t-lg"
                      />
                      <Badge className={`absolute top-2 right-2 ${getRarityColor(piece.rarity)} font-serif`}>
                        {getRarityIcon(piece.rarity)}
                        <span className="ml-1 capitalize">{piece.rarity}</span>
                      </Badge>
                    </div>

                    <CardContent className="p-4 newspaper-article-inner">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-xl font-serif font-bold headline-secondary">{piece.title}</h3>
                          <p className="text-sm text-gray-600 font-serif">by {piece.artist}</p>
                        </div>

                        <p className="text-sm font-serif text-gray-700 leading-relaxed">{piece.description}</p>

                        {piece.gameConnection && (
                          <div className="bg-blue-50 p-2 rounded border">
                            <p className="text-xs font-serif text-blue-800">
                              🎮 <strong>Game Connection:</strong> {piece.gameConnection}
                            </p>
                          </div>
                        )}

                        {piece.githubRepo && (
                          <div className="bg-green-50 p-2 rounded border">
                            <p className="text-xs font-serif text-green-800">
                              💻 <strong>Developer:</strong> {piece.githubRepo}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLike(piece.id)}
                              className={`font-serif ${likedPieces.has(piece.id) ? "text-red-500" : "text-gray-500"}`}
                            >
                              <Heart className={`h-4 w-4 mr-1 ${likedPieces.has(piece.id) ? "fill-current" : ""}`} />
                              {piece.likes + (likedPieces.has(piece.id) ? 1 : 0)}
                            </Button>
                            <Button variant="ghost" size="sm" className="font-serif text-gray-500">
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                          </div>

                          {piece.price && (
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-600 font-serif">{piece.price} AVAX</p>
                              <Button size="sm" className="frontier-button font-serif">
                                Buy NFT
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Gallery Stats */}
              <Card className="border-2 border-black bg-amber-50">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-amber-800 font-serif">{ART_COLLECTION.length}</p>
                      <p className="text-sm text-amber-600 font-serif">Total Artworks</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-amber-800 font-serif">
                        {ART_COLLECTION.filter((p) => p.rarity === "legendary").length}
                      </p>
                      <p className="text-sm text-amber-600 font-serif">Legendary NFTs</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-amber-800 font-serif">
                        {ART_COLLECTION.filter((p) => p.githubRepo).length}
                      </p>
                      <p className="text-sm text-amber-600 font-serif">LuckyspotOgold Games</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-amber-800 font-serif">
                        {ART_COLLECTION.reduce((sum, p) => sum + p.likes, 0)}
                      </p>
                      <p className="text-sm text-amber-600 font-serif">Total Likes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
