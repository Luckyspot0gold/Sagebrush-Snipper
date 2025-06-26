"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ExternalLink, Github } from "lucide-react"

const artworks = [
  {
    id: 1,
    title: "Celtic Wolf Mandala",
    artist: "Venice AI",
    image: "/images/wolfirishscotishposter.png",
    price: "2.5 AVAX",
    rarity: "Legendary",
    likes: 127,
    description: "An intricate Celtic-inspired mandala featuring a golden wolf in ornate purple and gold scrollwork.",
    gameConnection: "Clutch Chronicles RPG",
    githubLink: "https://github.com/LuckyspotOgold",
  },
  {
    id: 2,
    title: "Crypto Clashers Boxing Arena",
    artist: "Stoneyard Gaming",
    image: "/images/cryptoclasherboxingposter.jpg",
    price: "1.8 AVAX",
    rarity: "Epic",
    likes: 89,
    description: "Epic bull vs bear boxing match in the mountain wilderness arena.",
    gameConnection: "Crypto Clashers Boxing",
    githubLink: "https://github.com/LuckyspotOgold/crypto-clashers",
  },
  {
    id: 3,
    title: "Racing Circuit Championship",
    artist: "Stoneyard Gaming",
    image: "/images/cryptoclasherwcarsposter.jpg",
    price: "1.5 AVAX",
    rarity: "Epic",
    likes: 76,
    description: "High-speed racing action with classic and modern vehicles in the crypto arena.",
    gameConnection: "Crypto Clashers Racing",
    githubLink: "https://github.com/LuckyspotOgold/crypto-racing",
  },
  {
    id: 4,
    title: "WyoVerse Wanted Poster",
    artist: "Frontier Studios",
    image: "/images/wyoversestonewanted.png",
    price: "3.2 AVAX",
    rarity: "Legendary",
    likes: 156,
    description: "Iconic cowboy silhouette against frontier town with crypto symbols in the starry sky.",
    gameConnection: "WyoVerse Metaverse",
    githubLink: "https://github.com/LuckyspotOgold",
  },
  {
    id: 5,
    title: "Frontier Encampment",
    artist: "Historical Archives",
    image: "/images/weirdC.H.F.D.img.png",
    price: "0.8 AVAX",
    rarity: "Rare",
    likes: 43,
    description: "Authentic historical scene of Native American encampment with teepees and horseback riders.",
    gameConnection: "Native History Module",
    githubLink: "https://github.com/LuckyspotOgold",
  },
  {
    id: 6,
    title: "Clutch Armored Knight",
    artist: "Venice AI",
    image: "/images/clutchonhorse.webp",
    price: "2.1 AVAX",
    rarity: "Epic",
    likes: 98,
    description: "Fantasy steampunk wolf warrior in full armor riding through a modern cityscape.",
    gameConnection: "Clutch Chronicles",
    githubLink: "https://github.com/LuckyspotOgold/clutch-chronicles",
  },
  {
    id: 7,
    title: "Cheyenne Frontier Days",
    artist: "Aerial Photography",
    image: "/images/arialcheyennerodeo.png",
    price: "1.2 AVAX",
    rarity: "Rare",
    likes: 67,
    description: "Spectacular aerial view of Cheyenne Frontier Days rodeo with crowds and arena activities.",
    gameConnection: "Digital Rodeo",
    githubLink: "https://github.com/LuckyspotOgold",
  },
  {
    id: 8,
    title: "Bolt Market Simulator",
    artist: "Bolt.new",
    image: "/images/bolt-market-simulator.jpeg",
    price: "1.0 AVAX",
    rarity: "Common",
    likes: 34,
    description: "Advanced market simulation interface built with Bolt.new technology.",
    gameConnection: "Market Simulator",
    githubLink: "https://bolt.new/~/market-simulator",
  },
]

const rarityColors = {
  Common: "bg-gray-500",
  Rare: "bg-blue-500",
  Epic: "bg-purple-500",
  Legendary: "bg-yellow-500",
}

export function GameArtGallery() {
  const [likedItems, setLikedItems] = useState<number[]>([])

  const toggleLike = (id: number) => {
    setLikedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">WyoVerse Art Gallery</h1>
        <p className="text-lg text-muted-foreground">
          Discover and collect exclusive NFT artwork from the digital frontier
        </p>
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800">
            🎮 <strong>Featured Games by LuckyspotOgold@github:</strong> Crypto Clashers Boxing, Racing Circuit, Clutch
            Chronicles
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {artworks.map((artwork) => (
          <Card key={artwork.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img src={artwork.image || "/placeholder.svg"} alt={artwork.title} className="w-full h-48 object-cover" />
              <Badge
                className={`absolute top-2 right-2 ${rarityColors[artwork.rarity as keyof typeof rarityColors]} text-white`}
              >
                {artwork.rarity}
              </Badge>
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{artwork.title}</CardTitle>
              <p className="text-sm text-muted-foreground">by {artwork.artist}</p>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-sm">{artwork.description}</p>

              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">{artwork.price}</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleLike(artwork.id)}
                    className="flex items-center gap-1"
                  >
                    <Heart
                      className={`h-4 w-4 ${likedItems.includes(artwork.id) ? "fill-red-500 text-red-500" : ""}`}
                    />
                    {artwork.likes + (likedItems.includes(artwork.id) ? 1 : 0)}
                  </Button>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">🎮 Connected to: {artwork.gameConnection}</div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Buy NFT
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={artwork.githubLink} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Visit LuckyspotOgold on GitHub</h2>
          <p className="mb-4">Explore our complete collection of blockchain games and NFT projects</p>
          <Button variant="secondary" asChild>
            <a href="https://github.com/LuckyspotOgold" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              View All Projects
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
