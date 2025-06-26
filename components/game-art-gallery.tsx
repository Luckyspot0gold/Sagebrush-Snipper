"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Share2, ExternalLink, Coins } from "lucide-react"
import Image from "next/image"

const artworks = [
  {
    id: 1,
    title: "Celtic Wolf Mandala",
    artist: "LuckyspotOgold",
    image: "/images/wolfirishscotishposter.png",
    rarity: "Legendary",
    price: "2.5 AVAX",
    likes: 847,
    description:
      "An intricate Celtic-inspired mandala featuring a golden wolf surrounded by ornate purple and gold scrollwork. This piece represents the spiritual connection between the digital frontier and ancient wisdom.",
    gameConnection: "Featured in Crypto Clashers as the Wolf Clan emblem",
    githubLink: "https://github.com/LuckyspotOgold",
  },
  {
    id: 2,
    title: "Crypto Clashers: Bull vs Bear Arena",
    artist: "Stoneyard Gaming",
    image: "/images/cryptoclasherboxingposter.jpg",
    rarity: "Epic",
    price: "1.8 AVAX",
    likes: 623,
    description:
      "The ultimate showdown between market forces! This dynamic poster captures the intensity of the Crypto Clashers boxing arena where bulls and bears settle their differences in the ring.",
    gameConnection: "Official poster for Crypto Clashers Boxing game",
    githubLink: "https://github.com/LuckyspotOgold/crypto-clashers",
  },
  {
    id: 3,
    title: "Racing & Boxing Championship",
    artist: "Stoneyard Gaming",
    image: "/images/cryptoclasherwcarsposter.jpg",
    rarity: "Epic",
    price: "1.6 AVAX",
    likes: 592,
    description:
      "A spectacular dual-sport poster showcasing both the boxing arena and racing circuit. Features classic muscle cars alongside the iconic bull vs bear matchup against a stunning mountain sunset.",
    gameConnection: "Promotional art for Crypto Clashers multi-game platform",
    githubLink: "https://github.com/LuckyspotOgold/crypto-racing",
  },
  {
    id: 4,
    title: "WyoVerse Wanted Poster",
    artist: "WyoVerse Studios",
    image: "/images/wyoversestonewanted.png",
    rarity: "Legendary",
    price: "3.2 AVAX",
    likes: 1024,
    description:
      "The iconic silhouette of a frontier marshal against the backdrop of a crypto-enhanced Wild West town. Bitcoin, AVAX, and SOL symbols float in the starry sky above.",
    gameConnection: "Main character poster for WyoVerse metaverse",
    githubLink: "https://github.com/LuckyspotOgold",
  },
  {
    id: 5,
    title: "Frontier Encampment Discovery",
    artist: "Historical Archives",
    image: "/images/weirdC.H.F.D.img.png",
    rarity: "Rare",
    price: "0.8 AVAX",
    likes: 445,
    description:
      "A remarkable historical photograph showing a Native American encampment with teepees and horseback riders. This sepia-toned image captures the authentic spirit of the American frontier.",
    gameConnection: "Historical reference for WyoVerse world building",
    githubLink: "https://github.com/LuckyspotOgold",
  },
  {
    id: 6,
    title: "Clutch: The Armored Knight",
    artist: "Venice AI Studios",
    image: "/images/clutchonhorse.webp",
    rarity: "Epic",
    price: "2.1 AVAX",
    likes: 756,
    description:
      "A majestic steampunk fantasy featuring an armored wolf warrior mounted on horseback, set against a dramatic cityscape. This piece blends medieval aesthetics with futuristic elements.",
    gameConnection: "Character design for Clutch Chronicles RPG",
    githubLink: "https://github.com/LuckyspotOgold/clutch-chronicles",
  },
  {
    id: 7,
    title: "Cheyenne Frontier Days Aerial",
    artist: "Frontier Photography",
    image: "/images/arialcheyennerodeo.png",
    rarity: "Rare",
    price: "1.2 AVAX",
    likes: 389,
    description:
      "A breathtaking aerial view of the famous Cheyenne Frontier Days rodeo, showing thousands of spectators, colorful tents, and the grand arena where cowboys and cowgirls compete.",
    gameConnection: "Inspiration for WyoVerse rodeo events",
    githubLink: "https://github.com/LuckyspotOgold",
  },
  {
    id: 8,
    title: "Bolt Market Simulator Interface",
    artist: "Bolt.new",
    image: "/images/bolt-market-simulator.jpeg",
    rarity: "Common",
    price: "0.5 AVAX",
    likes: 234,
    description:
      "A sleek screenshot of the Bolt.new market simulator interface, showcasing the dark theme and professional trading dashboard used by digital frontier traders.",
    gameConnection: "Trading interface for Frontier Trader game",
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-amber-900 mb-4">🎨 WyoVerse Art Gallery</h1>
          <p className="text-xl text-amber-700 mb-6">Featuring exclusive artwork from LuckyspotOgold@github games</p>
          <div className="flex justify-center gap-4 mb-8">
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Coins className="w-4 h-4 mr-2" />
              NFT Marketplace
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              🎮 Game Art Collection
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              🤠 Frontier Themed
            </Badge>
          </div>
        </div>

        {/* Featured Games Section */}
        <div className="bg-amber-900 text-white p-8 rounded-lg mb-12">
          <h2 className="text-3xl font-bold mb-4 text-center">🎮 Featured Games by LuckyspotOgold@github</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">🥊 Crypto Clashers Boxing</h3>
              <p className="text-amber-200">Epic bull vs bear combat in the digital arena</p>
              <Button variant="outline" className="mt-2" asChild>
                <a href="https://github.com/LuckyspotOgold/crypto-clashers" target="_blank" rel="noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Play Now
                </a>
              </Button>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">🏁 Crypto Racing Circuit</h3>
              <p className="text-amber-200">High-speed blockchain racing action</p>
              <Button variant="outline" className="mt-2" asChild>
                <a href="https://github.com/LuckyspotOgold/crypto-racing" target="_blank" rel="noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Race Now
                </a>
              </Button>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">⚔️ Clutch Chronicles</h3>
              <p className="text-amber-200">Steampunk RPG adventures await</p>
              <Button variant="outline" className="mt-2" asChild>
                <a href="https://github.com/LuckyspotOgold/clutch-chronicles" target="_blank" rel="noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Adventure
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Art Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artworks.map((artwork) => (
            <Card
              key={artwork.id}
              className="overflow-hidden hover:shadow-xl transition-shadow border-2 border-amber-200"
            >
              <div className="relative">
                <Image
                  src={artwork.image || "/placeholder.svg"}
                  alt={artwork.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <Badge
                  className={`absolute top-2 right-2 ${rarityColors[artwork.rarity as keyof typeof rarityColors]} text-white`}
                >
                  {artwork.rarity}
                </Badge>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-amber-900">{artwork.title}</CardTitle>
                <p className="text-sm text-amber-700">by {artwork.artist}</p>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600 line-clamp-3">{artwork.description}</p>

                <div className="bg-amber-50 p-2 rounded text-xs text-amber-800">
                  <strong>Game Connection:</strong> {artwork.gameConnection}
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-900">{artwork.price}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLike(artwork.id)}
                      className={likedItems.includes(artwork.id) ? "text-red-500" : ""}
                    >
                      <Heart className="w-4 h-4" />
                      {artwork.likes + (likedItems.includes(artwork.id) ? 1 : 0)}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-amber-600 hover:bg-amber-700">
                    <Coins className="w-4 h-4 mr-2" />
                    Buy NFT
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={artwork.githubLink} target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-8 bg-amber-900 text-white rounded-lg">
          <h3 className="text-2xl font-bold mb-4">🤠 Support Digital Frontier Artists</h3>
          <p className="text-amber-200 mb-4">
            All artwork featured here supports the growing ecosystem of blockchain gaming and digital art. Visit
            LuckyspotOgold@github for more amazing games and experiences!
          </p>
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/LuckyspotOgold" target="_blank" rel="noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit GitHub Portfolio
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
