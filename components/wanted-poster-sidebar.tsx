"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, DollarSign, Target, Award, ExternalLink, Volume2, VolumeX } from "lucide-react"
import { useFrontierAudio } from "@/lib/frontier-audio-system"

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

export function WantedPosterSidebar() {
  const [outlaws] = useState<OutlawPlayer[]>(mockOutlaws)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [volume, setVolume] = useState(0.7)
  const { playWarning, playCoinDrop } = useFrontierAudio()

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
    return `$${bounty.toLocaleString()}`
  }

  const handleBountyHunt = (outlaw: OutlawPlayer) => {
    if (soundEnabled) {
      playWarning()
    }
    console.log(`Starting bounty hunt for ${outlaw.alias}`)
  }

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
  }

  return (
    <div className="wanted-sidebar w-80 p-4 space-y-4 newspaper-bg border-4 border-black">
      {/* Wanted Header with authentic 1880s styling */}
      <div className="wanted-header text-center border-4 border-black bg-red-800 text-white p-4 relative newspaper-article">
        {/* Corner decorations */}
        <div className="absolute -top-2 -left-2">
          <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
        </div>
        <div className="absolute -top-2 -right-2">
          <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
        </div>
        <div className="absolute -bottom-2 -left-2">
          <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
        </div>
        <div className="absolute -bottom-2 -right-2">
          <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
        </div>

        {/* Nail holes */}
        <div className="absolute top-2 left-2 w-3 h-3 bg-gray-600 rounded-full border border-black"></div>
        <div className="absolute top-2 right-2 w-3 h-3 bg-gray-600 rounded-full border border-black"></div>

        <h3 className="text-3xl font-bold uppercase tracking-wider headline-primary text-white mb-2">WANTED</h3>
        <p className="text-xl font-bold headline-secondary">DEAD OR ALIVE</p>
        <div className="text-sm mt-2 opacity-90 font-serif">By Order of the Wyoming Territory Marshal</div>

        {/* Sound control */}
        <div className="absolute top-2 right-8 flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={toggleSound} className="text-white hover:bg-white/20 h-6 w-6 p-0">
            {soundEnabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
          </Button>
        </div>
      </div>

      {/* Wanted Posters */}
      {outlaws.slice(0, 3).map((outlaw, index) => (
        <Card
          key={outlaw.id}
          className="wanted-poster border-4 border-black bg-amber-50 p-4 relative newspaper-article transform rotate-1 hover:rotate-0 transition-transform"
        >
          {/* Rank Badge */}
          <div className="absolute -top-3 -left-3 z-10">
            <Badge
              className={`${getReputationColor(outlaw.reputation)} text-sm font-bold px-3 py-2 border-2 border-black headline-primary`}
            >
              #{index + 1} MOST WANTED
            </Badge>
          </div>

          {/* Bounty Badge */}
          <div className="absolute -top-3 -right-3 bg-yellow-400 border-4 border-black p-3 transform rotate-12 z-20">
            <div className="text-center">
              <div className="text-lg font-bold text-black headline-primary">REWARD</div>
              <div className="text-xl font-bold text-black headline-primary">{getBountyDisplay(outlaw.bounty)}</div>
              <div className="text-sm font-bold text-black">IN GOLD</div>
            </div>
          </div>

          {/* Nail holes */}
          <div className="absolute top-3 left-3 w-2 h-2 bg-gray-600 rounded-full"></div>
          <div className="absolute top-3 right-3 w-2 h-2 bg-gray-600 rounded-full"></div>

          <div className="text-center space-y-3 pt-6">
            {/* Outlaw Image */}
            <div className="relative mx-auto w-32 h-32 border-4 border-black bg-sepia">
              <img
                src={outlaw.avatar || "/placeholder.svg"}
                alt={outlaw.alias}
                className="w-full h-full object-cover grayscale sepia contrast-125"
              />
              <div className="absolute inset-0 bg-amber-100 opacity-20"></div>
              {/* Photo corners */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-black"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-black"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-black"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-black"></div>
            </div>

            {/* Details */}
            <div className="space-y-2 text-sm">
              <p className="font-bold text-2xl headline-primary text-black">"{outlaw.alias}"</p>
              <p className="text-lg italic font-serif text-gray-800">{outlaw.name}</p>

              <div className="border-t-2 border-b-2 border-black py-2 my-3">
                <p className="font-bold text-red-700 headline-secondary">CRIME: {outlaw.crime}</p>
              </div>

              <p className="text-sm text-gray-700 font-serif">
                <strong>LAST SEEN:</strong> {outlaw.lastSeen}
              </p>

              {outlaw.captures > 0 && (
                <p className="text-sm text-green-600 font-serif">
                  <Award className="inline h-4 w-4 mr-1" />
                  CAPTURED {outlaw.captures} TIME{outlaw.captures > 1 ? "S" : ""}
                </p>
              )}

              <div className="text-xs text-gray-600 font-serif italic border-t border-gray-400 pt-2">
                "Armed and extremely dangerous. Approach with caution."
              </div>
            </div>

            {/* Action Button */}
            <Button
              size="sm"
              className="frontier-button w-full text-sm font-serif font-bold py-3"
              onClick={() => handleBountyHunt(outlaw)}
            >
              <Target className="h-4 w-4 mr-2" />
              CLAIM BOUNTY
            </Button>
          </div>

          {/* Torn paper effect */}
          <div
            className="absolute bottom-0 left-0 right-0 h-2 bg-amber-50"
            style={{
              clipPath:
                "polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)",
            }}
          ></div>
        </Card>
      ))}

      {/* Advertisement Space */}
      <Card className="wanted-poster ad-slot border-4 border-dashed border-green-600 bg-green-50 p-4 text-center newspaper-article">
        <div className="space-y-3">
          <div className="absolute -top-3 -right-3 bg-green-400 border-2 border-black p-2 transform -rotate-12 z-20">
            <div className="text-sm font-bold text-black headline-primary">ADVERTISE HERE</div>
          </div>

          <div className="pt-4">
            <h4 className="text-lg font-bold headline-primary">YOUR BUSINESS HERE</h4>
            <p className="text-sm text-gray-700 my-2 font-serif">Reach frontier traders and prospectors</p>
            <p className="text-xs text-green-600 mb-3 font-serif">
              <DollarSign className="inline h-3 w-3 mr-1" />
              5-15% commission on referrals
            </p>
          </div>

          <Button className="frontier-button w-full font-serif" size="sm">
            <ExternalLink className="h-3 w-3 mr-1" />
            CLAIM THIS SPOT
          </Button>
        </div>
      </Card>

      {/* Footer */}
      <div className="text-center text-xs text-gray-600 border-t-2 border-black pt-3 font-serif">
        <p className="italic mb-2">"Justice comes to those who wait... and those who hunt."</p>
        <p className="font-bold">- Marshal Bill, Wyoming Territory Sheriff's Office</p>
        <p className="text-xs mt-2 opacity-75">Est. 1868 • Serving the Digital Frontier</p>
      </div>
    </div>
  )
}
