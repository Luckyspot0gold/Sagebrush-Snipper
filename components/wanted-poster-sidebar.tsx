"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, DollarSign, AlertTriangle } from "lucide-react"

interface WantedPoster {
  id: string
  name: string
  img: string
  reward: number
  crimes: string[]
  dangerLevel: "LOW" | "MEDIUM" | "HIGH" | "EXTREME"
  lastSeen: string
}

const dynamicWantedPosters: WantedPoster[] = [
  {
    id: "crypto-bandit",
    name: "The Crypto Bandit",
    img: "/old-west-outlaw.png",
    reward: 1000,
    crimes: ["NFT Rustling", "Smart Contract Fraud", "Rug Pull Schemes"],
    dangerLevel: "HIGH",
    lastSeen: "Cheyenne Digital Saloon",
  },
  {
    id: "market-manipulator",
    name: "Bear Market Bill",
    img: "/female-outlaw-old-west.png",
    reward: 750,
    crimes: ["Market Manipulation", "Pump & Dump", "False Trading Signals"],
    dangerLevel: "MEDIUM",
    lastSeen: "Wyoming Trading Post",
  },
  {
    id: "nft-thief",
    name: "Pixel Pete",
    img: "/placeholder-user.jpg",
    reward: 500,
    crimes: ["NFT Theft", "Digital Art Forgery", "Metadata Tampering"],
    dangerLevel: "LOW",
    lastSeen: "Digital Art Gallery",
  },
  {
    id: "defi-desperado",
    name: "DeFi Desperado",
    img: "/ranch-tools.png",
    reward: 2000,
    crimes: ["Protocol Exploitation", "Flash Loan Attacks", "Liquidity Drain"],
    dangerLevel: "EXTREME",
    lastSeen: "Unknown - Highly Mobile",
  },
]

interface WantedPosterSidebarProps {
  posters?: WantedPoster[]
}

export function WantedPosterSidebar({ posters }: WantedPosterSidebarProps) {
  const [currentPosters, setCurrentPosters] = useState<WantedPoster[]>(dynamicWantedPosters)
  const [selectedPoster, setSelectedPoster] = useState<WantedPoster | null>(null)

  useEffect(() => {
    // Rotate posters every 30 seconds
    const interval = setInterval(() => {
      setCurrentPosters((prev) => {
        const shuffled = [...prev].sort(() => Math.random() - 0.5)
        return shuffled
      })
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const getDangerColor = (level: string) => {
    switch (level) {
      case "LOW":
        return "bg-green-100 text-green-800 border-green-300"
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "HIGH":
        return "bg-orange-100 text-orange-800 border-orange-300"
      case "EXTREME":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const postersToShow = posters && posters.length > 0 ? posters : currentPosters.slice(0, 3)

  return (
    <div className="p-4 bg-[#f9f6f0] border-l-4 border-double border-[#8B4513]">
      {/* Header */}
      <div className="text-center mb-6 border-4 border-black p-2">
        <div className="border-2 border-black p-3 bg-[#f4f1e8]">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="h-6 w-6 text-yellow-600" />
            <h2 className="font-serif text-2xl font-bold uppercase">Most Wanted</h2>
            <Star className="h-6 w-6 text-yellow-600" />
          </div>
          <p className="font-serif text-sm italic">Digital Frontier Outlaws</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <span className="font-serif text-xs">APPROACH WITH CAUTION</span>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </div>
        </div>
      </div>

      {/* Wanted Posters */}
      <div className="space-y-6">
        {postersToShow.map((poster) => (
          <div key={poster.id} className="border-4 border-black p-1 bg-[#fffbea]">
            <div className="border-2 border-black p-3">
              {/* Poster Header */}
              <div className="text-center mb-3">
                <h3 className="font-serif text-xl font-bold uppercase tracking-wider">WANTED</h3>
                <div className="w-full h-[1px] bg-black my-1"></div>
                <p className="font-serif text-xs">DEAD OR ALIVE</p>
              </div>

              {/* Photo */}
              <div className="border-2 border-black p-2 mb-3 bg-white">
                <Image
                  src={poster.img || "/placeholder-user.jpg"}
                  alt={poster.name}
                  width={120}
                  height={160}
                  className="w-full h-32 object-cover border border-gray-300"
                  priority
                />
              </div>

              {/* Name */}
              <div className="text-center mb-3">
                <h4 className="font-serif text-lg font-bold uppercase">{poster.name}</h4>
              </div>

              {/* Danger Level */}
              <div className="flex justify-center mb-3">
                <Badge className={`${getDangerColor(poster.dangerLevel)} font-serif text-xs`}>
                  {poster.dangerLevel} THREAT
                </Badge>
              </div>

              {/* Crimes */}
              <div className="mb-3">
                <p className="font-serif text-sm font-bold mb-1">CHARGES:</p>
                <ul className="space-y-1">
                  {poster.crimes.map((crime, index) => (
                    <li key={index} className="font-serif text-xs flex items-start gap-1">
                      <span>•</span>
                      <span>{crime}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Last Seen */}
              <div className="mb-3">
                <p className="font-serif text-xs">
                  <span className="font-bold">LAST SEEN:</span> {poster.lastSeen}
                </p>
              </div>

              {/* Reward */}
              <div className="text-center border-t-2 border-black pt-2">
                <div className="flex items-center justify-center gap-1">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-serif text-lg font-bold text-green-700">REWARD: ${poster.reward}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="text-center mt-3">
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white font-serif text-xs"
                  onClick={() => setSelectedPoster(poster)}
                >
                  REPORT SIGHTING
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sheriff's Notice */}
      <div className="mt-6 border-4 border-black p-1 bg-blue-50">
        <div className="border-2 border-black p-3">
          <div className="text-center mb-2">
            <h3 className="font-serif text-sm font-bold uppercase">Sheriff's Notice</h3>
          </div>
          <p className="font-serif text-xs text-center leading-tight">
            Citizens are advised to report any suspicious digital activity to the Wyoming Territory Marshal's Office.
            Rewards paid in crypto or gold.
          </p>
          <div className="text-center mt-2">
            <Button size="sm" variant="outline" className="font-serif text-xs">
              CONTACT SHERIFF
            </Button>
          </div>
        </div>
      </div>

      {/* Bounty Hunter Registration */}
      <div className="mt-4 border-4 border-black p-1 bg-yellow-50">
        <div className="border-2 border-black p-3">
          <div className="text-center mb-2">
            <h3 className="font-serif text-sm font-bold uppercase">Bounty Hunters Wanted</h3>
          </div>
          <p className="font-serif text-xs text-center leading-tight">
            Join the Digital Frontier Marshal Service. Track outlaws, earn rewards, and help keep the territory safe.
          </p>
          <div className="text-center mt-2">
            <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-black font-serif text-xs">
              REGISTER NOW
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WantedPosterSidebar
