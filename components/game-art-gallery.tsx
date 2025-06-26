"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ExternalLink, Share2, ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"

interface ArtPiece {
  id: string
  title: string
  artist: string
  description: string
  imageUrl: string
  price: number
  currency: string
  rarity: "common" | "rare" | "epic" | "legendary"
  likes: number
  gameConnection?: string
  externalLink?: string
  githubRepo?: string
}

const ART_COLLECTION: ArtPiece[] = [
  {
    id: "celtic-wolf-mandala",
    title: "Celtic Wolf Mandala",
    artist: "Venice AI Studio",
    description:
      "An intricate Celtic-inspired mandala featuring a golden wolf surrounded by ornate purple and gold scrollwork. This legendary NFT represents the spiritual connection between ancient Celtic traditions and the digital frontier.",
    imageUrl: "/images/wolfirishscotishposter.png",
    price: 2.5,
    currency: "AVAX",
    rarity: "legendary",
    likes: 847,
    gameConnection: "Mystical Wolves Collection",
    externalLink: "https://github.com/LuckyspotOgold",
  },
  {
    id: "crypto-clashers-boxing",
    title: "Crypto Clashers Boxing Arena",
    artist: "Stoneyard Gaming",
    description:
      "Epic promotional artwork for the legendary Crypto Clashers Boxing game featuring the ultimate showdown between Bull and Bear fighters in the mountain wilderness arena.",
    imageUrl: "/images/cryptoclasherboxingposter.jpg",
    price: 1.8,
    currency: "AVAX",
    rarity: "epic",
    likes: 623,
    gameConnection: "Crypto Clashers Boxing",
    externalLink: "https://github.com/LuckyspotOgold",
    githubRepo: "https://github.com/LuckyspotOgold/crypto-clashers-boxing",
  },
  {
    id: "crypto-clashers-racing",
    title: "Crypto Clashers Racing Circuit",
    artist: "Stoneyard Gaming",
    description:
      "High-octane promotional poster showcasing both the boxing arena and racing circuit elements of the Crypto Clashers universe, featuring classic and modern vehicles.",
    imageUrl: "/images/cryptoclasherwcarsposter.jpg",
    price: 1.8,
    currency: "AVAX",
    rarity: "epic",
    likes: 591,
    gameConnection: "Crypto Clashers Racing",
    externalLink: "https://github.com/LuckyspotOgold",
    githubRepo: "https://github.com/LuckyspotOgold/crypto-clashers-racing",
  },
  {
    id: "wyoverse-wanted-poster",
    title: "WyoVerse Digital Frontier",
    artist: "WyoVerse Studios",
    description:
      "Iconic silhouette of a frontier marshal against the backdrop of a digital frontier town, with cryptocurrency symbols floating in the starry sky above.",
    imageUrl: "/images/wyoversestonewanted.png",
    price: 3.2,
    currency: "AVAX",
    rarity: "legendary",
    likes: 1024,
    gameConnection: "WyoVerse Metaverse",
    externalLink: "https://wyoverse.com",
  },
  {
    id: "frontier-encampment",
    title: "Historical Frontier Encampment",
    artist: "Frontier Archives",
    description:
      "Rare historical photograph documenting a Native American encampment with teepees and horseback riders, preserved for the digital frontier archives.",
    imageUrl: "/images/weirdC.H.F.D.img.png",
    price: 0.9,
    currency: "AVAX",
    rarity: "rare",
    likes: 342,
    gameConnection: "Native History Collection",
  },
  {
    id: "clutch-armored-knight",
    title: "Clutch: The Armored Knight",
    artist: "Venice AI Studio",
    description:
      "Steampunk fantasy artwork featuring the legendary wolf warrior Clutch in full armor, riding through a modern cityscape on his trusty steed.",
    imageUrl: "/images/clutchonhorse.webp",
    price: 2.1,
    currency: "AVAX",
    rarity: "epic",
    likes: 756,
    gameConnection: "Clutch Chronicles RPG",
    externalLink: "https://github.com/LuckyspotOgold",
  },
  {
    id: "cheyenne-frontier-days",
    title: "Cheyenne Frontier Days Spectacular",
    artist: "Aerial Photography Co.",
    description:
      "Breathtaking aerial view of the famous Cheyenne Frontier Days rodeo, capturing thousands of spectators and the authentic Western atmosphere.",
    imageUrl: "/images/arialcheyennerodeo.png",
    price: 1.2,
    currency: "AVAX",
    rarity: "rare",
    likes: 445,
    gameConnection: "Digital Rodeo Events",
  },
  {
    id: "bolt-market-simulator",
    title: "Bolt Market Simulator Interface",
    artist: "Bolt.new Studios",
    description:
      "Screenshot of the revolutionary market simulator built with Bolt.new, showcasing advanced trading interfaces and real-time market analysis tools.",
    imageUrl: "/images/bolt-market-simulator.jpeg",
    price: 0.7,
    currency: "AVAX",
    rarity: "common",
    likes: 289,
    gameConnection: "Market Simulator Pro",
    externalLink: "https://bolt.new/~/market-simulator",
  },
]

export function GameArtGallery() {
  const [likedPieces, setLikedPieces] = useState<Set<string>>(new Set())
  const [selectedRarity, setSelectedRarity] = useState<string>("all")

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

  const handlePurchase = (piece: ArtPiece) => {
    // Simulate NFT purchase
    alert(`Initiating purchase of "${piece.title}" for ${piece.price} ${piece.currency}`)
  }

  const handleShare = (piece: ArtPiece) => {
    const shareText = `Check out this amazing NFT: "${piece.title}" by ${piece.artist} - Available for ${piece.price} ${piece.currency} on WyoVerse!`
    if (navigator.share) {
      navigator.share({
        title: piece.title,
        text: shareText,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(shareText)
      alert("Share text copied to clipboard!")
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500"
      case "rare":
        return "bg-blue-500"
      case "epic":
        return "bg-purple-500"
      case "legendary":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredArt =
    selectedRarity === "all" ? ART_COLLECTION : ART_COLLECTION.filter((piece) => piece.rarity === selectedRarity)

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2 font-serif">🎨 FRONTIER ART GALLERY 🎨</h1>
          <p className="text-lg text-amber-700">Discover and collect exclusive digital frontier artwork</p>

          {/* LuckyspotOgold@github Promotion */}
          <div className="mt-4 p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg border-2 border-purple-300">
            <h3 className="text-xl font-bold text-purple-800 mb-2">🎮 Featured Games by LuckyspotOgold@github</h3>
            <p className="text-purple-700">
              Explore amazing games including <strong>Crypto Clashers Boxing</strong>,{" "}
              <strong>Crypto Clashers Racing</strong>, and more!
            </p>
            <Button
              className="mt-2 bg-purple-600 hover:bg-purple-700"
              onClick={() => window.open("https://github.com/LuckyspotOgold", "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit GitHub Portfolio
            </Button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-2 mb-8">
          {["all", "common", "rare", "epic", "legendary"].map((rarity) => (
            <Button
              key={rarity}
              variant={selectedRarity === rarity ? "default" : "outline"}
              onClick={() => setSelectedRarity(rarity)}
              className={`${selectedRarity === rarity ? getRarityColor(rarity) : ""} font-serif`}
            >
              {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
            </Button>
          ))}
        </div>

        {/* Art Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArt.map((piece, index) => (
            <motion.div
              key={piece.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-4 border-amber-200 bg-white hover:shadow-xl transition-shadow">
                {/* Image */}
                <div className="relative">
                  <img
                    src={piece.imageUrl || "/placeholder.svg"}
                    alt={piece.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className={`absolute top-2 right-2 ${getRarityColor(piece.rarity)} text-white`}>
                    {piece.rarity.toUpperCase()}
                  </Badge>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-serif text-amber-900">{piece.title}</CardTitle>
                  <p className="text-sm text-amber-700">by {piece.artist}</p>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">{piece.description}</p>

                  {piece.gameConnection && (
                    <div className="mb-3">
                      <Badge variant="outline" className="text-xs">
                        🎮 {piece.gameConnection}
                      </Badge>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-green-600">
                      {piece.price} {piece.currency}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Heart className="w-4 h-4" />
                      {piece.likes + (likedPieces.has(piece.id) ? 1 : 0)}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handlePurchase(piece)}
                      className="bg-green-600 hover:bg-green-700 flex-1"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Buy
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleLike(piece.id)}
                      className={likedPieces.has(piece.id) ? "text-red-500 border-red-500" : ""}
                    >
                      <Heart className={`w-4 h-4 ${likedPieces.has(piece.id) ? "fill-current" : ""}`} />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleShare(piece)}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                    {piece.externalLink && (
                      <Button size="sm" variant="outline" onClick={() => window.open(piece.externalLink, "_blank")}>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-6 bg-amber-100 rounded-lg">
          <h3 className="text-xl font-bold text-amber-900 mb-2">Support Digital Frontier Artists</h3>
          <p className="text-amber-700 mb-4">
            Every purchase supports independent game developers and digital artists in the frontier community.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-amber-600 hover:bg-amber-700">Submit Your Art</Button>
            <Button variant="outline" className="border-amber-600 text-amber-600">
              Artist Guidelines
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
