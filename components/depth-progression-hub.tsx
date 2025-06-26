"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { User, MapPin, TrendingUp, Users, Crown, Target, ArrowRight } from "lucide-react"

export function DepthProgressionHub() {
  const progressionPillars = [
    {
      title: "Player Identity",
      icon: <User className="h-8 w-8 text-blue-600" />,
      description: "Forge your permanent legacy on the blockchain",
      progress: 75,
      nextMilestone: "Blockchain Legacy Hash",
      href: "/pioneer-legacy",
    },
    {
      title: "Land Development",
      icon: <MapPin className="h-8 w-8 text-green-600" />,
      description: "Transform raw territory into productive assets",
      progress: 60,
      nextMilestone: "Automated Resource Generation",
      href: "/land-deeds",
    },
    {
      title: "Economic Power",
      icon: <TrendingUp className="h-8 w-8 text-yellow-600" />,
      description: "Influence markets and drive frontier economy",
      progress: 85,
      nextMilestone: "Regional Market Dominance",
      href: "/frontier-trader",
    },
    {
      title: "Social Influence",
      icon: <Users className="h-8 w-8 text-purple-600" />,
      description: "Lead communities and shape territorial laws",
      progress: 45,
      nextMilestone: "Community Leadership Role",
      href: "/community",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Core Pillars Overview */}
      <Card className="border-4 border-black bg-gradient-to-r from-amber-50 to-yellow-100">
        <CardHeader>
          <CardTitle className="headline-secondary text-center text-3xl flex items-center justify-center gap-2">
            <Crown className="h-8 w-8 text-yellow-600" />
            CORE PILLARS OF FRONTIER MASTERY
            <Crown className="h-8 w-8 text-yellow-600" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {progressionPillars.map((pillar, index) => (
              <Card key={index} className="border-2 border-black hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  {pillar.icon}
                  <CardTitle className="text-lg">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{pillar.description}</p>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{pillar.progress}%</span>
                    </div>
                    <Progress value={pillar.progress} />
                  </div>

                  <div className="mb-4">
                    <Badge className="w-full justify-center bg-blue-500 text-white text-xs">
                      Next: {pillar.nextMilestone}
                    </Badge>
                  </div>

                  <Link href={pillar.href}>
                    <Button className="w-full newspaper-button text-sm">
                      Advance <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progression Journey Map */}
      <Card className="border-4 border-black">
        <CardHeader>
          <CardTitle className="headline-secondary text-center">🗺️ YOUR FRONTIER PROGRESSION JOURNEY 🗺️</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Journey Path */}
            <div className="flex items-center justify-between mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2">
                  ✓
                </div>
                <div className="font-bold">Arrived</div>
                <div className="text-sm">Territory Claimed</div>
              </div>

              <div className="flex-1 h-1 bg-green-500 mx-4"></div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2">
                  2
                </div>
                <div className="font-bold">Developing</div>
                <div className="text-sm">Building Resources</div>
              </div>

              <div className="flex-1 h-1 bg-blue-300 mx-4"></div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-300 border-4 border-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xl mb-2">
                  3
                </div>
                <div className="font-bold">Expanding</div>
                <div className="text-sm">Market Influence</div>
              </div>

              <div className="flex-1 h-1 bg-gray-300 mx-4"></div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-xl mb-2">
                  4
                </div>
                <div className="font-bold">Mastering</div>
                <div className="text-sm">Regional Control</div>
              </div>

              <div className="flex-1 h-1 bg-gray-300 mx-4"></div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-xl mb-2">
                  👑
                </div>
                <div className="font-bold">Legend</div>
                <div className="text-sm">Permanent Legacy</div>
              </div>
            </div>

            {/* Current Status */}
            <div className="text-center p-4 bg-blue-50 border-2 border-blue-300 rounded">
              <h3 className="text-xl font-bold mb-2">Current Status: Expanding Pioneer</h3>
              <p className="text-sm mb-4">
                You've established your territory and are building economic influence. Focus on market dominance to
                reach the next tier.
              </p>
              <div className="flex justify-center gap-4">
                <Badge className="bg-green-500 text-white">Land: Secured</Badge>
                <Badge className="bg-blue-500 text-white">Economy: Growing</Badge>
                <Badge className="bg-yellow-500 text-black">Influence: Rising</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Immediate Actions */}
      <Card className="border-4 border-black bg-red-50">
        <CardHeader>
          <CardTitle className="headline-secondary flex items-center gap-2">
            <Target className="h-6 w-6 text-red-600" />
            IMMEDIATE ACTION ITEMS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-red-300 p-4 rounded bg-white">
              <h4 className="font-bold mb-2">🏔️ Upgrade Land</h4>
              <p className="text-sm mb-3">Increase resource generation by 50%</p>
              <Button className="w-full bg-red-600 text-white">Invest 500 STONES</Button>
            </div>

            <div className="border-2 border-blue-300 p-4 rounded bg-white">
              <h4 className="font-bold mb-2">📈 Execute Trade</h4>
              <p className="text-sm mb-3">Lumber prices up 3.7% - perfect timing</p>
              <Button className="w-full bg-blue-600 text-white">Trade Now</Button>
            </div>

            <div className="border-2 border-purple-300 p-4 rounded bg-white">
              <h4 className="font-bold mb-2">🤝 Community Vote</h4>
              <p className="text-sm mb-3">New territorial law needs your input</p>
              <Button className="w-full bg-purple-600 text-white">Cast Vote</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
