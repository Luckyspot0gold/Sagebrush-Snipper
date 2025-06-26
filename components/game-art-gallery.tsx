"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ExternalLink, Share2, ShoppingCart } from "lucide-react"

interface ArtPiece {
  id: string
  title: string
  artist: string
  image: string
  description: string
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
  price: number
  likes: number
  gameConnection?: string
  githubLink?: string
}

const artPieces: ArtPiece[] = [
  {
    id: "1",
    title: "Celtic Wolf Mandala",
    artist: "Venice AI",
    image: "/images/wolfirishscotishposter.png",
    description:
      "An intricate Celtic-inspired mandala featuring a golden wolf surrounded by ornate purple and gold scrollwork. This legendary NFT represents the mystical connection between ancient Celtic traditions and the digital frontier.",
    rarity: "Legendary",
    price: 2.5,
    likes: 234,
    gameConnection: "Mystical Realms",
    githubLink: "https://github.com/LuckyspotOgold",
  },
  {
    id: "2",
    title: "Crypto Clashers Boxing Arena",
    artist: "Stoneyard Gaming",
    image: "/images/cryptoclasherboxingposter.jpg",
    description:
      "Epic promotional art for the legendary Crypto Clashers boxing matches. Features the iconic bull vs bear showdown in a mountain arena setting with dramatic lighting.",
    rarity: "Epic",
    price: 1.8,
    likes: 189,
    gameConnection: "Crypto Clashers Boxing",
    githubLink: "https://github.com/LuckyspotOgold/crypto-clashers",
  },
  {
    id: "3",
    title: "Crypto Clashers Racing Circuit",
    artist: "Stoneyard Gaming",
    image: "/images/cryptoclasherwcarsposter.jpg",
    description:
      "High-octane promotional poster showcasing both boxing and racing elements of the Crypto Clashers universe. Features classic and modern vehicles in an epic mountain sunset.",
    rarity: "Epic",
    price: 1.8,
    likes: 156,
    gameConnection: "Crypto Clashers Racing",
    githubLink: "https://github.com/LuckyspotOgold/crypto-racing",
  },
  {
    id: "4",
    title: "WyoVerse Wanted Poster",
    artist: "Frontier Studios",
    image: "/images/wyoversestonewanted.png",
    description:
      "Iconic silhouette of a frontier marshal against the backdrop of a digital Wild West town. Features crypto symbols in the starry sky, representing the new era of GameFi.",
    rarity: "Rare",
    price: 0.9,
    likes: 298,
    gameConnection: "WyoVerse Metaverse",
    githubLink: "https://github.com/LuckyspotOgold",
  },
  {
    id: "5",
    title: "Frontier Encampment Historical",
    artist: "Historical Archives",
    image: "/images/weirdC.H.F.D.img.png",
    description:
      "Authentic historical photograph of a Native American encampment with teepees and horsemen. A rare glimpse into the real frontier days that inspire our digital world.",
    rarity: "Rare",
    price: 1.2,
    likes: 87,
    gameConnection: "Historical Collection",
  },
  {
    id: "6",
    title: "Clutch Armored Knight",
    artist: "Steampunk Studios",
    image: "/images/clutchonhorse.webp",
    description:
      "Fantasy steampunk artwork featuring an armored wolf warrior on horseback in an urban setting. Represents the Clutch Chronicles RPG series.",
    rarity: "Epic",
    price: 2.1,
    likes: 167,
    gameConnection: "Clutch Chronicles",
    githubLink: "https://github.com/LuckyspotOgold/clutch-chronicles",
  },
  {
    id: "7",
    title: "Cheyenne Frontier Days Aerial",
    artist: "Drone Photography Co.",
    image: "/images/arialcheyennerodeo.png",
    description:
      "Spectacular aerial view of the famous Cheyenne Frontier Days rodeo, showing the massive crowds and authentic Western atmosphere that inspires our digital frontier.",
    rarity: "Common",
    price: 0.3,
    likes: 145,
    gameConnection: "Rodeo Events",
  },
  {
    id: "8",
    title: "Bolt Market Simulator",
    artist: "Bolt.new",
    image: "/images/bolt-market-simulator.jpeg",
    description:
      "Screenshot of the revolutionary market simulator built with Bolt.new technology. Represents the cutting-edge tools powering the WyoVerse economy.",
    rarity: "Rare",
    price: 1.5,
    likes: 203,
    gameConnection: "Market Tools",
    githubLink: "https://bolt.new/~/market-simulator",
  },
]

export function GameArtGallery() {
  const [selectedRarity, setSelectedRarity] = useState<string>("All")
  const [likedPieces, setLikedPieces] = useState<Set<string>>(new Set())

  const rarities = ["All", "Common", "Rare", "Epic", "Legendary"]

  const filteredPieces =
    selectedRarity === "All" ? artPieces : artPieces.filter((piece) => piece.rarity === selectedRarity)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-500"
      case "Rare":
        return "bg-blue-500"
      case "Epic":
        return "bg-purple-500"
      case "Legendary":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleLike = (id: string) => {
    const newLiked = new Set(likedPieces)
    if (newLiked.has(id)) {
      newLiked.delete(id)
    } else {
      newLiked.add(id)
    }
    setLikedPieces(newLiked)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">WyoVerse Art Gallery</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Discover and collect exclusive NFT artwork from the digital frontier. Each piece connects to games and
          experiences from LuckyspotOgold@github.
        </p>

        {/* Rarity Filter */}
        <div className="flex gap-2 mb-6">
          {rarities.map((rarity) => (
            <Button
              key={rarity}
              variant={selectedRarity === rarity ? "default" : "outline"}
              onClick={() => setSelectedRarity(rarity)}
              className={selectedRarity === rarity ? getRarityColor(rarity) : ""}
            >
              {rarity}
            </Button>
          ))}
        </div>
      </div>

      {/* Art Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPieces.map((piece) => (
          <Card key={piece.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img src={piece.image || "/placeholder.svg"} alt={piece.title} className="w-full h-48 object-cover" />
              <Badge className={`absolute top-2 right-2 ${getRarityColor(piece.rarity)}`}>{piece.rarity}</Badge>
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{piece.title}</CardTitle>
              <p className="text-sm text-muted-foreground">by {piece.artist}</p>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-3">{piece.description}</p>

              {piece.gameConnection && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    🎮 {piece.gameConnection}
                  </Badge>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleLike(piece.id)}
                    className={likedPieces.has(piece.id) ? "text-red-500" : ""}
                  >
                    <Heart className={`h-4 w-4 ${likedPieces.has(piece.id) ? "fill-current" : ""}`} />
                    {piece.likes + (likedPieces.has(piece.id) ? 1 : 0)}
                  </Button>

                  <Button size="sm" variant="ghost">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold">{piece.price} AVAX</p>
                  <p className="text-xs text-muted-foreground">~${(piece.price * 32.15).toFixed(2)}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Buy NFT
                </Button>

                {piece.githubLink && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={piece.githubLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>

              {piece.githubLink && (
                <p className="text-xs text-center text-muted-foreground">
                  🎮 Play games from <strong>LuckyspotOgold@github</strong>
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* LuckyspotOgold Promotion */}
      <Card className="mt-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
        <CardContent className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">🎮 Discover More Games!</h2>
          <p className="text-muted-foreground mb-4">
            Explore the complete collection of games and experiences from LuckyspotOgold@github
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <a href="https://github.com/LuckyspotOgold" target="_blank" rel="noopener noreferrer">
                Visit GitHub Portfolio
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/games">Play Games Now</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
