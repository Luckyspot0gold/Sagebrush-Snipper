"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Share2, Twitter, Facebook, Copy, Trophy, Star, Zap } from "lucide-react"
import { motion } from "framer-motion"

interface Milestone {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  shareText: string
  imageUrl: string
  value: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

const MAJOR_MILESTONES: Milestone[] = [
  {
    id: "first_land",
    title: "First Land Claimed",
    description: "Staked your claim in the digital frontier",
    icon: <Trophy className="w-6 h-6" />,
    shareText:
      "Just claimed my first piece of digital frontier land in @WyoVerse! 🏔️ Building my crypto empire one acre at a time. #WyoVerse #DigitalFrontier #Web3Gaming",
    imageUrl: "/images/land-claim-share.png",
    value: "1 Premium Acre",
    rarity: "rare",
  },
  {
    id: "boxing_champion",
    title: "Boxing Champion",
    description: "Won 10 consecutive boxing matches",
    icon: <Zap className="w-6 h-6" />,
    shareText:
      "🥊 UNDEFEATED! Just won my 10th straight boxing match in @WyoVerse! The digital frontier ain't big enough for all of us. Who's next? #BoxingChamp #WyoVerse #CryptoFighter",
    imageUrl: "/images/boxing-champion-share.png",
    value: "10 Win Streak",
    rarity: "epic",
  },
  {
    id: "stone_baron",
    title: "Stone Baron",
    description: "Collected 1,000 stones from your land",
    icon: <Star className="w-6 h-6" />,
    shareText:
      "💎 STONE BARON STATUS ACHIEVED! Just hit 1,000 stones collected in @WyoVerse. My digital mining operation is booming! #StoneBaron #WyoVerse #CryptoMining",
    imageUrl: "/images/stone-baron-share.png",
    value: "1,000 Stones",
    rarity: "legendary",
  },
]

export function SocialSharingSystem() {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null)
  const [shareSuccess, setShareSuccess] = useState(false)

  const shareToTwitter = (milestone: Milestone) => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(milestone.shareText)}&url=${encodeURIComponent("https://cryptoclashers.games")}`
    window.open(url, "_blank")
    trackShare("twitter", milestone.id)
  }

  const shareToFacebook = (milestone: Milestone) => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://cryptoclashers.games")}&quote=${encodeURIComponent(milestone.shareText)}`
    window.open(url, "_blank")
    trackShare("facebook", milestone.id)
  }

  const copyToClipboard = (milestone: Milestone) => {
    const shareText = `${milestone.shareText}\n\nJoin me at: https://cryptoclashers.games`
    navigator.clipboard.writeText(shareText)
    setShareSuccess(true)
    setTimeout(() => setShareSuccess(false), 2000)
    trackShare("clipboard", milestone.id)
  }

  const trackShare = (platform: string, milestoneId: string) => {
    // Analytics tracking
    console.log(`Shared ${milestoneId} on ${platform}`)
    // In real app: analytics.track('milestone_shared', { platform, milestoneId })
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2 font-serif">Share Your Frontier Victories</h1>
          <p className="text-lg text-amber-700">Let the world know about your legendary achievements!</p>
        </div>

        {/* Milestone Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {MAJOR_MILESTONES.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden border-2 border-amber-200 bg-gradient-to-br from-white to-amber-50 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-full bg-amber-200">{milestone.icon}</div>
                    <Badge className={`${getRarityColor(milestone.rarity)} text-white`}>
                      {milestone.rarity.toUpperCase()}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-serif text-amber-900">{milestone.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-amber-700 mb-3">{milestone.description}</p>

                  <div className="mb-4">
                    <span className="text-lg font-bold text-green-600">{milestone.value}</span>
                  </div>

                  {/* Share Preview */}
                  <div className="bg-gray-50 p-3 rounded-lg mb-4 text-xs">
                    <p className="text-gray-600 line-clamp-3">{milestone.shareText}</p>
                  </div>

                  {/* Share Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => shareToTwitter(milestone)}
                      className="bg-blue-500 hover:bg-blue-600 text-white flex-1"
                    >
                      <Twitter className="w-4 h-4 mr-1" />
                      Tweet
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => shareToFacebook(milestone)}
                      className="bg-blue-700 hover:bg-blue-800 text-white flex-1"
                    >
                      <Facebook className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(milestone)}
                      variant="outline"
                      className="border-amber-600 text-amber-600"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transform -skew-x-12 transition-opacity duration-500" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Success Message */}
        {shareSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            ✅ Copied to clipboard!
          </motion.div>
        )}

        {/* Call to Action */}
        <div className="text-center bg-amber-100 rounded-lg p-6">
          <h3 className="text-xl font-bold text-amber-900 mb-2">Spread the Word, Partner!</h3>
          <p className="text-amber-700 mb-4">
            Every share helps grow our frontier community. The more pioneers we have, the richer our digital territory
            becomes!
          </p>
          <Button className="bg-amber-600 hover:bg-amber-700">
            <Share2 className="w-4 h-4 mr-2" />
            Share WyoVerse
          </Button>
        </div>
      </div>
    </div>
  )
}
