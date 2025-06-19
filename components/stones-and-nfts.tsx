"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Gem, ShoppingCart, Info, Layers, Shield } from "lucide-react"

type Stone = {
  id: string
  name: string
  description: string
  rarity: "common" | "uncommon" | "rare" | "legendary"
  price: number
  image: string
  attributes: {
    power: number
    utility: string
    origin: string
  }
}

type NFT = {
  id: string
  name: string
  description: string
  collection: string
  creator: string
  price: number
  image: string
}

const stones: Stone[] = [
  {
    id: "stone-1",
    name: "Founding Stone",
    description: "The original stone of the WyoVerse, granting special access to founding members.",
    rarity: "legendary",
    price: 10.0,
    image: "/placeholder.svg?height=100&width=100",
    attributes: {
      power: 100,
      utility: "Governance voting rights, access to exclusive areas",
      origin: "Genesis Block",
    },
  },
  {
    id: "stone-2",
    name: "Wind Stone",
    description: "Harnesses the power of Wyoming's winds, providing energy benefits.",
    rarity: "rare",
    price: 5.0,
    image: "/placeholder.svg?height=100&width=100",
    attributes: {
      power: 75,
      utility: "Energy production boost, weather resistance",
      origin: "Wind River Range",
    },
  },
  {
    id: "stone-3",
    name: "Frontier Stone",
    description: "Embodies the pioneer spirit, enhancing exploration abilities.",
    rarity: "uncommon",
    price: 2.5,
    image: "/placeholder.svg?height=100&width=100",
    attributes: {
      power: 50,
      utility: "Exploration bonuses, discovery chances",
      origin: "Cheyenne",
    },
  },
  {
    id: "stone-4",
    name: "Mining Stone",
    description: "Increases mining efficiency and resource discovery.",
    rarity: "common",
    price: 1.0,
    image: "/placeholder.svg?height=100&width=100",
    attributes: {
      power: 25,
      utility: "Mining speed boost, resource yield increase",
      origin: "Black Hills",
    },
  },
]

const nfts: NFT[] = [
  {
    id: "nft-1",
    name: "Cheyenne Frontier Days #001",
    description: "Commemorative NFT from the first digital Cheyenne Frontier Days.",
    collection: "Frontier Celebrations",
    creator: "WyoVerse Official",
    price: 0.5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "nft-2",
    name: "Wyoming Landscape Series - Grand Teton",
    description: "Digital art capturing the majesty of Grand Teton National Park.",
    collection: "Wyoming Landscapes",
    creator: "Digital Ranger",
    price: 0.3,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "nft-3",
    name: "Crypto Cowboy #042",
    description: "Part of the popular Crypto Cowboys collection, featuring unique western characters.",
    collection: "Crypto Cowboys",
    creator: "Blockchain Brushstrokes",
    price: 0.8,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function StonesAndNFTs() {
  const [selectedStone, setSelectedStone] = useState<Stone | null>(null)
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)
  const { toast } = useToast()

  const handlePurchaseStone = (stone: Stone) => {
    toast({
      title: "Stone Purchase Initiated",
      description: `You're purchasing a ${stone.name} for ${stone.price} WyoCoin.`,
    })
  }

  const handlePurchaseNFT = (nft: NFT) => {
    toast({
      title: "NFT Purchase Initiated",
      description: `You're purchasing "${nft.name}" for ${nft.price} WyoCoin.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Gem className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-bold">Stones</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Stones are powerful digital assets that provide utility and benefits within the WyoVerse ecosystem. Each
            stone has unique properties and can be used to enhance your experience in different ways.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 border rounded-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm">Governance</span>
            </div>
            <div className="p-3 border rounded-lg flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <span className="text-sm">Utility</span>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Layers className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-bold">NFTs</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Non-Fungible Tokens (NFTs) are unique digital collectibles that represent ownership of digital art, virtual
            land, and other assets in the WyoVerse. Each NFT is one-of-a-kind and stored on the blockchain.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 border rounded-lg flex items-center gap-2">
              <Gem className="h-5 w-5 text-primary" />
              <span className="text-sm">Collectible</span>
            </div>
            <div className="p-3 border rounded-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm">Provable Ownership</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <Tabs defaultValue="stones" className="space-y-4">
          <TabsList>
            <TabsTrigger value="stones">Stones</TabsTrigger>
            <TabsTrigger value="nfts">NFTs</TabsTrigger>
            <TabsTrigger value="learn">Learn More</TabsTrigger>
          </TabsList>

          <TabsContent value="stones" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stones.map((stone) => (
                <div
                  key={stone.id}
                  className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors"
                  onClick={() => setSelectedStone(stone)}
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Gem className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-medium text-center">{stone.name}</h3>
                  <div className="flex justify-center mt-1">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        stone.rarity === "legendary"
                          ? "bg-purple-100 text-purple-800"
                          : stone.rarity === "rare"
                            ? "bg-blue-100 text-blue-800"
                            : stone.rarity === "uncommon"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {stone.rarity.charAt(0).toUpperCase() + stone.rarity.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm mt-2 line-clamp-2">{stone.description}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="font-bold">{stone.price} WyoCoin</span>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePurchaseStone(stone)
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Buy
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {selectedStone && (
              <div className="mt-6 border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Gem className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{selectedStone.name}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          selectedStone.rarity === "legendary"
                            ? "bg-purple-100 text-purple-800"
                            : selectedStone.rarity === "rare"
                              ? "bg-blue-100 text-blue-800"
                              : selectedStone.rarity === "uncommon"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {selectedStone.rarity.charAt(0).toUpperCase() + selectedStone.rarity.slice(1)}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => handlePurchaseStone(selectedStone)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy for {selectedStone.price} WyoCoin
                  </Button>
                </div>

                <p className="mt-4">{selectedStone.description}</p>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Power Level</h4>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${selectedStone.attributes.power}%` }}
                        />
                      </div>
                      <span className="text-xs">{selectedStone.attributes.power}%</span>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Utility</h4>
                    <p className="text-sm mt-1">{selectedStone.attributes.utility}</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Origin</h4>
                    <p className="text-sm mt-1">{selectedStone.attributes.origin}</p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="nfts" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {nfts.map((nft) => (
                <div
                  key={nft.id}
                  className="border rounded-lg overflow-hidden cursor-pointer hover:border-primary transition-colors"
                  onClick={() => setSelectedNFT(nft)}
                >
                  <div className="w-full h-48 bg-accent/10 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <p className="font-medium">{nft.name}</p>
                      <p className="text-sm">by {nft.creator}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{nft.name}</h3>
                    <p className="text-sm text-muted-foreground">Collection: {nft.collection}</p>
                    <p className="text-sm mt-2 line-clamp-2">{nft.description}</p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="font-bold">{nft.price} WyoCoin</span>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePurchaseNFT(nft)
                        }}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Buy
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedNFT && (
              <div className="mt-6 border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{selectedNFT.name}</h3>
                    <p className="text-sm text-muted-foreground">by {selectedNFT.creator}</p>
                  </div>
                  <Button size="sm" onClick={() => handlePurchaseNFT(selectedNFT)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy for {selectedNFT.price} WyoCoin
                  </Button>
                </div>

                <div className="mt-4 w-full h-64 bg-accent/10 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p className="font-medium">{selectedNFT.name}</p>
                    <p className="text-sm">by {selectedNFT.creator}</p>
                  </div>
                </div>

                <p className="mt-4">{selectedNFT.description}</p>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Collection</h4>
                    <p className="text-sm mt-1">{selectedNFT.collection}</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Creator</h4>
                    <p className="text-sm mt-1">{selectedNFT.creator}</p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="learn" className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Info className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">What are Stones?</h3>
              </div>
              <p className="mb-4">
                Stones are unique digital assets in the WyoVerse that provide utility and benefits to their owners.
                Unlike traditional NFTs, Stones have functional properties that can be used within the ecosystem.
              </p>
              <p>
                Each Stone has different attributes, including power level, utility functions, and origin. Stones can be
                used for governance voting, enhancing your property's capabilities, boosting mining operations, and
                accessing exclusive areas of the WyoVerse.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Info className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">What are NFTs?</h3>
              </div>
              <p className="mb-4">
                Non-Fungible Tokens (NFTs) are unique digital assets that represent ownership of a specific item or
                piece of content in the digital world. In the WyoVerse, NFTs can represent digital art, collectibles,
                event tickets, and more.
              </p>
              <p>
                Each NFT is stored on the blockchain, ensuring its authenticity and provable ownership. NFTs can be
                bought, sold, and traded on the WyoVerse marketplace, and some may provide special access or benefits
                within the ecosystem.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Info className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">How to Use Stones & NFTs</h3>
              </div>
              <div className="space-y-2">
                <p className="font-medium">Stones:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Place Stones on your virtual property to enhance its capabilities</li>
                  <li>Use Stones to vote on governance proposals in the WyoVerse</li>
                  <li>Combine multiple Stones to unlock special features</li>
                  <li>Trade Stones with other users in the marketplace</li>
                </ul>

                <p className="font-medium mt-4">NFTs:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Display NFTs in your virtual property or gallery</li>
                  <li>Use special NFTs to access exclusive events and areas</li>
                  <li>Trade and collect NFTs from various collections</li>
                  <li>Create your own NFTs to sell in the marketplace</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
