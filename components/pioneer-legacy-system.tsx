"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, Crown, TrendingUp, Users, MapPin, Star } from "lucide-react"

interface PioneerLegacy {
  address: string
  handle: string
  joinDate: Date
  landClaims: number
  influenceScore: number
  legacyHash: string
  permanentAchievements: string[]
  economicImpact: {
    marketInfluence: number
    tradeVolume: number
    priceImpacts: { commodity: string; impact: number }[]
  }
  socialStanding: {
    communityVotes: number
    leadershipRoles: string[]
    mentorships: number
  }
}

export function PioneerLegacySystem() {
  const [pioneer, setPioneer] = useState<PioneerLegacy>({
    address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8c",
    handle: "WyomingProspector",
    joinDate: new Date("2024-01-15"),
    landClaims: 12,
    influenceScore: 847,
    legacyHash: "0x8912a3f4b7c2d8e9f1a5b6c3d7e8f2a4b5c6d9e1f3a7b8c4d2e5f9a1b3c7d8e2",
    permanentAchievements: [
      "First Land Claim in Thunder Valley",
      "Established Regional Lumber Trade",
      "Founded Miners' Cooperative",
      "Blockchain Legacy Pioneer",
    ],
    economicImpact: {
      marketInfluence: 3.7,
      tradeVolume: 125000,
      priceImpacts: [
        { commodity: "Lumber", impact: 3.7 },
        { commodity: "Grain", impact: 1.2 },
        { commodity: "Iron Ore", impact: 2.1 },
      ],
    },
    socialStanding: {
      communityVotes: 23,
      leadershipRoles: ["Trade Council Member", "Land Dispute Mediator"],
      mentorships: 8,
    },
  })

  const [legacyForging, setLegacyForging] = useState(false)

  const calculateOverallInfluence = () => {
    const landValue = pioneer.landClaims * 100
    const economicWeight = pioneer.economicImpact.marketInfluence * 50
    const socialWeight = pioneer.socialStanding.communityVotes * 25
    const legacyBonus = pioneer.legacyHash ? 1.15 : 1.0

    return Math.floor((landValue + economicWeight + socialWeight) * legacyBonus)
  }

  const forgeLegacy = async () => {
    setLegacyForging(true)

    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const newLegacyHash = `0x${Math.random().toString(16).substr(2, 64)}`
    setPioneer((prev) => ({
      ...prev,
      legacyHash: newLegacyHash,
      permanentAchievements: [...prev.permanentAchievements, `Legacy Forged: ${new Date().toLocaleDateString()}`],
    }))

    setLegacyForging(false)
  }

  const daysSinceJoining = Math.floor((new Date().getTime() - pioneer.joinDate.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="space-y-6">
      {/* Pioneer Identity Card */}
      <Card className="border-4 border-black bg-gradient-to-r from-amber-50 to-yellow-100">
        <CardHeader>
          <CardTitle className="headline-secondary text-center text-3xl flex items-center justify-center gap-2">
            <Crown className="h-8 w-8 text-yellow-600" />
            PIONEER LEGACY REGISTRY
            <Crown className="h-8 w-8 text-yellow-600" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Identity Section */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-6xl mb-2">🤠</div>
                <h3 className="text-2xl font-bold">{pioneer.handle}</h3>
                <p className="text-sm text-gray-600">Pioneer since {pioneer.joinDate.toLocaleDateString()}</p>
                <Badge className="mt-2 bg-blue-500 text-white">{daysSinceJoining} Days on the Frontier</Badge>
              </div>

              <div className="border-2 border-black p-3 bg-white">
                <h4 className="font-bold mb-2">🏛️ Blockchain Legacy</h4>
                <div className="text-xs font-mono break-all bg-gray-100 p-2 rounded">{pioneer.legacyHash}</div>
                <div className="mt-2 text-center">
                  {!pioneer.legacyHash ? (
                    <Button
                      onClick={forgeLegacy}
                      disabled={legacyForging}
                      className="bg-gold text-black hover:bg-yellow-500"
                    >
                      {legacyForging ? "Forging..." : "🔨 Forge Permanent Legacy"}
                    </Button>
                  ) : (
                    <Badge className="bg-green-500 text-white">✅ Legacy Permanently Recorded</Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Influence Metrics */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Overall Influence</h3>
                <div className="text-4xl font-bold text-blue-600">{calculateOverallInfluence().toLocaleString()}</div>
                <Progress value={(calculateOverallInfluence() / 10000) * 100} className="mt-2" />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="border border-black p-2 bg-green-50">
                  <MapPin className="h-6 w-6 mx-auto mb-1 text-green-600" />
                  <div className="font-bold">{pioneer.landClaims}</div>
                  <div className="text-xs">Land Claims</div>
                </div>
                <div className="border border-black p-2 bg-blue-50">
                  <TrendingUp className="h-6 w-6 mx-auto mb-1 text-blue-600" />
                  <div className="font-bold">{pioneer.economicImpact.marketInfluence}%</div>
                  <div className="text-xs">Market Impact</div>
                </div>
                <div className="border border-black p-2 bg-purple-50">
                  <Users className="h-6 w-6 mx-auto mb-1 text-purple-600" />
                  <div className="font-bold">{pioneer.socialStanding.communityVotes}</div>
                  <div className="text-xs">Community Votes</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permanent Achievements */}
      <Card className="border-4 border-black">
        <CardHeader>
          <CardTitle className="headline-secondary flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500" />
            PERMANENT ACHIEVEMENTS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pioneer.permanentAchievements.map((achievement, index) => (
              <div key={index} className="border-2 border-amber-400 p-3 bg-amber-50 rounded">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-amber-600" />
                  <span className="font-serif font-medium">{achievement}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Economic Impact Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-4 border-black">
          <CardHeader>
            <CardTitle className="headline-secondary flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
              ECONOMIC DOMINANCE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Trade Volume:</span>
                <Badge className="bg-green-500 text-white">
                  ${pioneer.economicImpact.tradeVolume.toLocaleString()}
                </Badge>
              </div>

              <div>
                <h4 className="font-bold mb-2">Market Price Impacts:</h4>
                {pioneer.economicImpact.priceImpacts.map((impact, index) => (
                  <div key={index} className="flex justify-between items-center mb-2">
                    <span>{impact.commodity}:</span>
                    <Badge className={impact.impact > 2 ? "bg-red-500" : "bg-blue-500"}>+{impact.impact}%</Badge>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 italic">
                  "Your trading decisions ripple through the entire frontier economy, affecting prices and opportunities
                  for all pioneers."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-black">
          <CardHeader>
            <CardTitle className="headline-secondary flex items-center gap-2">
              <Users className="h-6 w-6 text-purple-600" />
              SOCIAL INFLUENCE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Community Standing:</span>
                <Badge className="bg-purple-500 text-white">{pioneer.socialStanding.communityVotes} Votes</Badge>
              </div>

              <div>
                <h4 className="font-bold mb-2">Leadership Roles:</h4>
                {pioneer.socialStanding.leadershipRoles.map((role, index) => (
                  <Badge key={index} className="mr-2 mb-2 bg-blue-500 text-white">
                    {role}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <span>Pioneers Mentored:</span>
                <Badge className="bg-green-500 text-white">{pioneer.socialStanding.mentorships}</Badge>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 italic">
                  "Your reputation precedes you across the territory. New pioneers seek your guidance and wisdom."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legacy Verification */}
      <Card className="border-4 border-black bg-black text-green-400">
        <CardHeader>
          <CardTitle className="text-center font-mono">🔗 BLOCKCHAIN VERIFICATION TERMINAL 🔗</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-mono text-sm space-y-2">
            <div>{">"} VERIFYING PIONEER LEGACY...</div>
            <div>
              {">"} ADDRESS: {pioneer.address}
            </div>
            <div>
              {">"} LEGACY_HASH: {pioneer.legacyHash}
            </div>
            <div>{">"} BLOCK_HEIGHT: 47,892,341</div>
            <div>{">"} STATUS: ✅ PERMANENTLY RECORDED</div>
            <div>
              {">"} INFLUENCE_SCORE: {calculateOverallInfluence()}
            </div>
            <div className="text-yellow-400">{">"} LEGACY AUTHENTICATED - IMMUTABLE PROOF OF FRONTIER IMPACT</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
