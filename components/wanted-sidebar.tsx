"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, DollarSign, Target, Award, ExternalLink } from "lucide-react"
import { affiliateTracker } from "@/lib/affiliate-tracking"

interface OutlawPlayer {
  id: string
  name: string
  alias: string
  bounty: number
  crime: string
  avatar: string
  reputation: "notorious" | "dangerous" | "wanted" | "legendary"
  lastSeen: string
  captures: number
}

interface AdSlot {
  id: string
  position: string
  currentBid: number
  advertiser: string
  destinationUrl: string
  commissionRate: number
  isActive: boolean
  adContent?: {
    title: string
    description: string
    buttonText: string
  }
}

const mockOutlaws: OutlawPlayer[] = [
  {
    id: "1",
    name: 'Henry "Black Hat" Morgan',
    alias: "Black Hat Hank",
    bounty: 2500,
    crime: "Market Manipulation & Claim Jumping",
    avatar: "/old-west-outlaw.png",
    reputation: "legendary",
    lastSeen: "Cheyenne Trading Post",
    captures: 0,
  },
  {
    id: "2",
    name: 'Sarah "Silver Dollar" McKenzie',
    alias: "Silver Dollar Sally",
    bounty: 1800,
    crime: "Land Deed Forgery",
    avatar: "/female-outlaw-old-west.png",
    reputation: "notorious",
    lastSeen: "Wyoming Territory Bank",
    captures: 2,
  },
  {
    id: "3",
    name: 'Jake "The Snake" Rodriguez',
    alias: "Sidewinder Jake",
    bounty: 1200,
    crime: "Cattle Rustling & Stock Fraud",
    avatar: "/placeholder-62dsp.png",
    reputation: "dangerous",
    lastSeen: "Digital Rodeo Arena",
    captures: 1,
  },
]

export function WantedSidebar() {
  const [outlaws] = useState<OutlawPlayer[]>(mockOutlaws)
  const [showAdForm, setShowAdForm] = useState(false)
  const [adSlot, setAdSlot] = useState<AdSlot | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load active ad slot for sidebar position
    loadAdSlot()
  }, [])

  const loadAdSlot = async () => {
    try {
      // In a real app, this would fetch from your database
      const mockAdSlot: AdSlot = {
        id: "sidebar_ad_1",
        position: "sidebar",
        currentBid: 75,
        advertiser: "Frontier Trading Co.",
        destinationUrl: "https://frontier-trading.example.com",
        commissionRate: 0.08,
        isActive: true,
        adContent: {
          title: "FRONTIER TRADING CO.",
          description: "Best prices on mining equipment & supplies",
          buttonText: "VISIT STORE",
        },
      }
      setAdSlot(mockAdSlot)
    } catch (error) {
      console.error("Failed to load ad slot:", error)
    }
  }

  const handleAdClick = async (adId: string) => {
    try {
      setIsLoading(true)
      const userId = "current_user_id" // Get from auth context
      const userTier = "silver" // Get from user profile

      const destinationUrl = await affiliateTracker.trackClick(adId, userId, userTier)

      // Open in new tab
      window.open(destinationUrl, "_blank")
    } catch (error) {
      console.error("Failed to track ad click:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getReputationColor = (reputation: string) => {
    switch (reputation) {
      case "legendary":
        return "bg-red-600 text-white"
      case "notorious":
        return "bg-orange-500 text-white"
      case "dangerous":
        return "bg-yellow-500 text-black"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getBountyDisplay = (bounty: number) => {
    return `$${bounty.toLocaleString()} IN GOLD`
  }

  return (
    <div className="sidebar wanted-theme w-80 p-4 space-y-4">
      {/* Header */}
      <div className="wanted-header text-center border-4 border-black bg-red-600 text-white p-4 relative">
        <div className="absolute -top-2 -left-2">
          <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
        </div>
        <div className="absolute -top-2 -right-2">
          <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
        </div>
        <h3 className="text-2xl font-bold uppercase tracking-wider headline-primary">WANTED</h3>
        <p className="text-lg font-bold">DEAD OR ALIVE</p>
        <div className="text-xs mt-2 opacity-90">By Order of the Wyoming Territory Marshal</div>
      </div>

      {/* Top Outlaws */}
      {outlaws.slice(0, 3).map((outlaw, index) => (
        <Card key={outlaw.id} className="wanted-poster border-4 border-black bg-amber-50 p-4 relative">
          {/* Rank Badge */}
          <div className="absolute -top-2 -left-2 z-10">
            <Badge className={`${getReputationColor(outlaw.reputation)} text-xs font-bold px-2 py-1`}>
              #{index + 1}
            </Badge>
          </div>

          {/* Nail holes */}
          <div className="absolute top-2 left-2 w-2 h-2 bg-gray-600 rounded-full"></div>
          <div className="absolute top-2 right-2 w-2 h-2 bg-gray-600 rounded-full"></div>

          <div className="text-center space-y-3">
            {/* Outlaw Image */}
            <div className="relative mx-auto w-24 h-24 border-2 border-black">
              <img
                src={outlaw.avatar || "/placeholder.svg"}
                alt={outlaw.alias}
                className="outlaw-img w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-black opacity-10"></div>
            </div>

            {/* Bounty */}
            <div className="bounty absolute -top-2 -right-2 bg-yellow-400 border-2 border-black p-2 transform rotate-12 z-20">
              <div className="text-sm font-bold text-black headline-primary">{getBountyDisplay(outlaw.bounty)}</div>
            </div>

            {/* Details */}
            <div className="space-y-1 text-sm pt-4">
              <p className="font-bold text-lg headline-secondary">"{outlaw.alias}"</p>
              <p className="text-xs italic">{outlaw.name}</p>
              <p className="font-semibold text-red-700">
                <strong>Crime:</strong> {outlaw.crime}
              </p>
              <p className="text-xs text-gray-600">
                <strong>Last Seen:</strong> {outlaw.lastSeen}
              </p>
              {outlaw.captures > 0 && (
                <p className="text-xs text-green-600">
                  <Award className="inline h-3 w-3 mr-1" />
                  Captured {outlaw.captures} time{outlaw.captures > 1 ? "s" : ""}
                </p>
              )}
            </div>

            {/* Action Button */}
            <Button
              size="sm"
              className="frontier-button w-full text-xs"
              onClick={() => console.log(`Hunting ${outlaw.alias}`)}
            >
              <Target className="h-3 w-3 mr-1" />
              HUNT FOR BOUNTY
            </Button>
          </div>
        </Card>
      ))}

      {/* Ad Slot */}
      {adSlot && adSlot.isActive ? (
        <Card className="wanted-poster ad-slot border-4 border-dashed border-green-600 bg-green-50 p-4 text-center">
          <div className="space-y-3">
            <div className="bounty absolute -top-2 -right-2 bg-green-400 border-2 border-black p-2 transform -rotate-12 z-20">
              <div className="text-sm font-bold text-black headline-primary">${adSlot.currentBid} BID</div>
            </div>

            <div className="pt-4">
              <h4 className="text-lg font-bold headline-primary">{adSlot.adContent?.title}</h4>
              <p className="text-sm text-gray-700 my-2">{adSlot.adContent?.description}</p>
              <p className="text-xs text-green-600 mb-3">
                <DollarSign className="inline h-3 w-3 mr-1" />
                {(adSlot.commissionRate * 100).toFixed(0)}% commission on referrals
              </p>
            </div>

            <Button
              onClick={() => handleAdClick(adSlot.id)}
              className="frontier-button w-full"
              size="sm"
              disabled={isLoading}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              {isLoading ? "TRACKING..." : adSlot.adContent?.buttonText || "VISIT"}
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="wanted-poster ad-slot border-4 border-dashed border-gray-600 bg-gray-100 p-4 text-center">
          <div className="space-y-3">
            <div className="bounty absolute -top-2 -right-2 bg-gray-400 border-2 border-black p-2 transform rotate-6 z-20">
              <div className="text-sm font-bold text-black headline-primary">YOUR AD HERE</div>
            </div>

            <div className="space-y-2 text-sm pt-4">
              <p className="font-semibold">
                <DollarSign className="inline h-4 w-4 mr-1" />
                5-15% commission on referred players
              </p>
              <p className="text-xs text-gray-600">Advertise your business to frontier traders</p>
            </div>

            {!showAdForm ? (
              <Button onClick={() => setShowAdForm(true)} className="frontier-button w-full" size="sm">
                CLAIM THIS SPOT
              </Button>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Your Business Name"
                  className="w-full p-2 border border-gray-400 text-xs rounded"
                />
                <input
                  type="email"
                  placeholder="Contact Email"
                  className="w-full p-2 border border-gray-400 text-xs rounded"
                />
                <input
                  type="number"
                  placeholder="Bid Amount ($)"
                  className="w-full p-2 border border-gray-400 text-xs rounded"
                />
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 text-xs frontier-button">
                    Submit Bid
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={() => setShowAdForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Footer */}
      <div className="text-center text-xs text-gray-600 border-t border-gray-400 pt-2">
        <p className="italic">"Justice comes to those who wait... and those who hunt."</p>
        <p className="font-bold mt-1">- Marshal Bill, Wyoming Territory</p>
      </div>
    </div>
  )
}
