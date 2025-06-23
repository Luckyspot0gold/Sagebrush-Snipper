"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Coins, Star, Clock, TrendingUp, Eye } from "lucide-react"
import Image from "next/image"
import { useSoundEffects } from "@/lib/sound-effects"

interface MarketplaceItem {
  id: string
  title: string
  price: number
  currency: string
  rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary"
  image: string
  seller: string
  timeLeft: string
  bids: number
  category: string
  description: string
}

const mockItems: MarketplaceItem[] = [
  {
    id: "1",
    title: "Victory Bull NFT",
    price: 2.5,
    currency: "ETH",
    rarity: "Legendary",
    image: "/images/victory-bull-colosseum.webp",
    seller: "CowboyTrader",
    timeLeft: "2h 15m",
    bids: 12,
    category: "Arena Champions",
    description: "Rare Victory Bull from the Colosseum battles",
  },
  {
    id: "2",
    title: "Crypto Clashers Fighter",
    price: 1.8,
    currency: "ETH",
    rarity: "Epic",
    image: "/images/crypto-clashers-fighter.png",
    seller: "FighterCollector",
    timeLeft: "1h 42m",
    bids: 8,
    category: "Fighters",
    description: "Elite street fighter with special abilities",
  },
  {
    id: "3",
    title: "Pink Racing Machine",
    price: 3.2,
    currency: "ETH",
    rarity: "Legendary",
    image: "/images/pink-race-car.png",
    seller: "SpeedDemon",
    timeLeft: "4h 33m",
    bids: 15,
    category: "Vehicles",
    description: "High-speed racing car with cosmic abilities",
  },
  {
    id: "4",
    title: "Digital Mountain Deed",
    price: 5.0,
    currency: "ETH",
    rarity: "Epic",
    image: "/images/wyoverse-digital-mountain.png",
    seller: "LandBaron",
    timeLeft: "6h 18m",
    bids: 23,
    category: "Land",
    description: "Prime digital real estate in the mountains",
  },
]

export function VintageMarketplaceWidget() {
  const [items, setItems] = useState<MarketplaceItem[]>(mockItems)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { playCoinDrop, playWaxSeal } = useSoundEffects()

  const categories = ["All", "Arena Champions", "Fighters", "Vehicles", "Land"]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-100 text-gray-800"
      case "Uncommon":
        return "bg-green-100 text-green-800"
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

  const filteredItems = selectedCategory === "All" ? items : items.filter((item) => item.category === selectedCategory)

  const handleBid = (itemId: string) => {
    playCoinDrop()
    // Handle bidding logic
    console.log("Bidding on item:", itemId)
  }

  const handleBuyNow = (itemId: string) => {
    playWaxSeal()
    // Handle purchase logic
    console.log("Buying item:", itemId)
  }

  return (
    <div className="vintage-card p-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-steampunk brass-text mb-2">🏛️ FRONTIER TRADING POST 🏛️</h2>
        <p className="font-vintage text-sm text-gray-600">"Where Digital Treasures Meet Pioneer Spirit"</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={`font-vintage ${
              selectedCategory === category
                ? "brass-border text-white"
                : "border-2 border-amber-600 text-amber-800 hover:bg-amber-50"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="vintage-card p-4 hover:shadow-lg transition-all duration-300 ink-bleed">
            <div className="relative mb-3">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                width={200}
                height={150}
                className="w-full h-32 object-cover border-2 border-amber-600 rounded"
              />
              <Badge className={`absolute top-2 right-2 ${getRarityColor(item.rarity)}`}>
                <Star className="h-3 w-3 mr-1" />
                {item.rarity}
              </Badge>
            </div>

            <div className="space-y-2">
              <h3 className="font-vintage font-bold text-lg">{item.title}</h3>
              <p className="text-xs font-serif text-gray-600 line-clamp-2">{item.description}</p>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Coins className="h-4 w-4 text-amber-600" />
                  <span className="font-bold">
                    {item.price} {item.currency}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Eye className="h-3 w-3" />
                  <span>{item.bids} bids</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="font-serif">by {item.seller}</span>
                <div className="flex items-center gap-1 text-red-600">
                  <Clock className="h-3 w-3" />
                  <span>{item.timeLeft}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBid(item.id)}
                  className="flex-1 font-vintage border-amber-600 text-amber-800 hover:bg-amber-50"
                >
                  Place Bid
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleBuyNow(item.id)}
                  className="flex-1 font-vintage bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-6">
        <Button variant="outline" className="font-vintage border-2 border-amber-600 text-amber-800 hover:bg-amber-50">
          View Full Marketplace
          <TrendingUp className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
