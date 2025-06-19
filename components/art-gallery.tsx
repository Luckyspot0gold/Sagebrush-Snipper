"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Share2, ShoppingCart } from "lucide-react"

type ArtPiece = {
  id: string
  title: string
  artist: string
  description: string
  price: number
  image: string
  category: "landscape" | "western" | "abstract" | "digital" | "nft"
  likes: number
  liked: boolean
}

const artPieces: ArtPiece[] = [
  {
    id: "art-1",
    title: "Digital Frontier Sunset",
    artist: "Prairie Pixel",
    description: "A stunning digital representation of a Wyoming sunset over the virtual plains.",
    price: 0.5,
    image: "/placeholder.svg?height=200&width=300",
    category: "landscape",
    likes: 24,
    liked: false,
  },
  {
    id: "art-2",
    title: "Crypto Cowboy",
    artist: "Blockchain Brushstrokes",
    description: "A modern take on the classic cowboy, riding through the digital wild west.",
    price: 0.75,
    image: "/placeholder.svg?height=200&width=300",
    category: "western",
    likes: 18,
    liked: false,
  },
  {
    id: "art-3",
    title: "Market Volatility",
    artist: "Data Dauber",
    description: "An abstract visualization of cryptocurrency market movements.",
    price: 0.3,
    image: "/placeholder.svg?height=200&width=300",
    category: "abstract",
    likes: 12,
    liked: false,
  },
  {
    id: "art-4",
    title: "Virtual Yellowstone",
    artist: "Geo Genesis",
    description: "A digital recreation of Yellowstone's natural wonders in the WyoVerse.",
    price: 1.2,
    image: "/placeholder.svg?height=200&width=300",
    category: "landscape",
    likes: 32,
    liked: false,
  },
  {
    id: "art-5",
    title: "Rodeo Pixels",
    artist: "Frontier Fabricator",
    description: "A dynamic digital capture of a virtual rodeo in action.",
    price: 0.8,
    image: "/placeholder.svg?height=200&width=300",
    category: "western",
    likes: 27,
    liked: false,
  },
  {
    id: "art-6",
    title: "Quantum Bison",
    artist: "Native Numerics",
    description:
      "A digital bison composed of quantum particles, representing the bridge between tradition and technology.",
    price: 2.0,
    image: "/placeholder.svg?height=200&width=300",
    category: "nft",
    likes: 45,
    liked: false,
  },
]

export function ArtGallery() {
  const [pieces, setPieces] = useState<ArtPiece[]>(artPieces)
  const { toast } = useToast()

  const handleLike = (artId: string) => {
    setPieces((prev) =>
      prev.map((piece) => {
        if (piece.id === artId) {
          return {
            ...piece,
            likes: piece.liked ? piece.likes - 1 : piece.likes + 1,
            liked: !piece.liked,
          }
        }
        return piece
      }),
    )
  }

  const handlePurchase = (piece: ArtPiece) => {
    toast({
      title: "Purchase Initiated",
      description: `You're purchasing "${piece.title}" by ${piece.artist} for ${piece.price} WyoCoin.`,
    })
  }

  const handleShare = (piece: ArtPiece) => {
    toast({
      title: "Sharing Art",
      description: `Sharing "${piece.title}" by ${piece.artist} with the WyoVerse community.`,
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Art</TabsTrigger>
          <TabsTrigger value="landscape">Landscapes</TabsTrigger>
          <TabsTrigger value="western">Western</TabsTrigger>
          <TabsTrigger value="abstract">Abstract</TabsTrigger>
          <TabsTrigger value="nft">NFT Collections</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pieces.map((piece) => (
              <ArtCard
                key={piece.id}
                piece={piece}
                onLike={handleLike}
                onPurchase={handlePurchase}
                onShare={handleShare}
              />
            ))}
          </div>
        </TabsContent>

        {["landscape", "western", "abstract", "nft"].map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pieces
                .filter((piece) => piece.category === category)
                .map((piece) => (
                  <ArtCard
                    key={piece.id}
                    piece={piece}
                    onLike={handleLike}
                    onPurchase={handlePurchase}
                    onShare={handleShare}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function ArtCard({
  piece,
  onLike,
  onPurchase,
  onShare,
}: {
  piece: ArtPiece
  onLike: (id: string) => void
  onPurchase: (piece: ArtPiece) => void
  onShare: (piece: ArtPiece) => void
}) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="w-full h-48 bg-accent/10 flex items-center justify-center">
        {/* This would be replaced with the actual art image */}
        <div className="text-center text-muted-foreground">
          <p className="font-medium">{piece.title}</p>
          <p className="text-sm">by {piece.artist}</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium">{piece.title}</h3>
        <p className="text-sm text-muted-foreground">by {piece.artist}</p>
        <p className="text-sm mt-2">{piece.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold">{piece.price} WyoCoin</span>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onLike(piece.id)}
              className={piece.liked ? "text-red-500" : ""}
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Like</span>
            </Button>
            <Button size="icon" variant="ghost" onClick={() => onShare(piece)}>
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
            <Button size="sm" onClick={() => onPurchase(piece)}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
