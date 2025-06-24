"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useUserProfileStore } from "@/lib/stores/user-profile-store"
import { Crown, Zap, Star, TrendingUp, Shield, Gem, Target, Award } from "lucide-react"

interface SubscriptionTier {
  id: string
  name: string
  price: number
  features: string[]
  icon: React.ReactNode
  color: string
  popular?: boolean
}

interface UserStats {
  successfulTrades: number
  portfolioGrowth: number
  billAccuracy: number
  premiumSavings: number
}

const subscriptionTiers: SubscriptionTier[] = [
  {
    id: "prospector",
    name: "Prospector",
    price: 0,
    features: [
      "Basic market data (15min delay)",
      "Daily frontier fortune",
      "General market sentiment",
      "Access to saloon chat",
      "Basic land parcel info",
    ],
    icon: <Target className="h-6 w-6" />,
    color: "bg-gray-100 border-gray-300",
  },
  {
    id: "claim-owner",
    name: "Claim Owner",
    price: 4.99,
    features: [
      "Real-time market alerts",
      "NFT valuation analysis",
      "Land parcel trend analysis",
      "Priority saloon access",
      "Personalized trading insights",
      "Cross-game integration",
      "Bill's exclusive tips",
    ],
    icon: <Star className="h-6 w-6" />,
    color: "bg-blue-50 border-blue-300",
    popular: true,
  },
  {
    id: "baron",
    name: "Territory Baron",
    price: 19.99,
    features: [
      "AI-powered trade signals",
      "Portfolio stress testing",
      "Exclusive land deals",
      "VIP saloon access",
      "Custom market reports",
      "Direct line to Bill",
      "Showdown mode access",
      "Data export privileges",
      "Affiliate revenue sharing",
    ],
    icon: <Crown className="h-6 w-6" />,
    color: "bg-yellow-50 border-yellow-400",
  },
]

export function BillPremiumSystem() {
  const [currentTier, setCurrentTier] = useState("prospector")
  const [userStats, setUserStats] = useState<UserStats>({
    successfulTrades: 0,
    portfolioGrowth: 0,
    billAccuracy: 0,
    premiumSavings: 0,
  })
  const [showdownActive, setShowdownActive] = useState(false)
  const [prediction, setPrediction] = useState("")

  const { profile } = useUserProfileStore()

  useEffect(() => {
    // Simulate user stats
    setUserStats({
      successfulTrades: Math.floor(Math.random() * 50) + 10,
      portfolioGrowth: Math.random() * 30 + 5,
      billAccuracy: Math.random() * 20 + 75,
      premiumSavings: Math.floor(Math.random() * 500) + 100,
    })
  }, [])

  const handleUpgrade = (tierId: string) => {
    setCurrentTier(tierId)
    // Here you would integrate with your payment processor
    console.log(`Upgrading to ${tierId}`)
  }

  const startShowdown = () => {
    setShowdownActive(true)
    // Implement showdown logic
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Card className="border-4 border-black shadow-lg mb-6">
        <CardHeader className="border-b-2 border-black bg-gradient-to-r from-yellow-100 to-amber-100">
          <div className="text-center">
            <CardTitle className="text-3xl font-serif flex items-center justify-center gap-2">
              <Gem className="h-8 w-8 text-yellow-600" />
              Bill's Whiskey Wisdom Tiers
              <Gem className="h-8 w-8 text-yellow-600" />
            </CardTitle>
            <CardDescription className="text-lg font-serif mt-2">
              "Partner, the frontier rewards those who invest in knowledge"
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <Tabs defaultValue="tiers" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="tiers" className="font-serif">
                <Crown className="h-4 w-4 mr-2" />
                Subscription Tiers
              </TabsTrigger>
              <TabsTrigger value="stats" className="font-serif">
                <TrendingUp className="h-4 w-4 mr-2" />
                Your Performance
              </TabsTrigger>
              <TabsTrigger value="showdown" className="font-serif">
                <Target className="h-4 w-4 mr-2" />
                Showdown Mode
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tiers">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subscriptionTiers.map((tier) => (
                  <Card
                    key={tier.id}
                    className={`relative ${tier.color} ${tier.popular ? "ring-2 ring-blue-500" : ""}`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-blue-500 text-white font-serif">Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-2">{tier.icon}</div>
                      <CardTitle className="font-serif text-xl">{tier.name}</CardTitle>
                      <div className="text-3xl font-bold">
                        {tier.price === 0 ? "FREE" : `$${tier.price}`}
                        {tier.price > 0 && <span className="text-sm font-normal">/month</span>}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {tier.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Zap className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="font-serif">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full font-serif"
                        variant={currentTier === tier.id ? "secondary" : "default"}
                        onClick={() => handleUpgrade(tier.id)}
                        disabled={currentTier === tier.id}
                      >
                        {currentTier === tier.id ? "Current Plan" : tier.price === 0 ? "Get Started" : "Upgrade Now"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 p-6 bg-amber-50 border-2 border-amber-300 rounded-lg">
                <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Value Guarantee
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-serif">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">95%</div>
                    <div>User Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">24/7</div>
                    <div>Market Monitoring</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">30-Day</div>
                    <div>Money Back Guarantee</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stats">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-green-300 bg-green-50">
                  <CardHeader>
                    <CardTitle className="font-serif flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Trading Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-serif">Successful Trades</span>
                          <span className="font-bold">{userStats.successfulTrades}</span>
                        </div>
                        <Progress value={(userStats.successfulTrades / 100) * 100} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-serif">Portfolio Growth</span>
                          <span className="font-bold text-green-600">+{userStats.portfolioGrowth.toFixed(1)}%</span>
                        </div>
                        <Progress value={userStats.portfolioGrowth} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-300 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="font-serif flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Bill's Accuracy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-serif">Prediction Accuracy</span>
                          <span className="font-bold">{userStats.billAccuracy.toFixed(1)}%</span>
                        </div>
                        <Progress value={userStats.billAccuracy} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-serif">Premium Savings</span>
                          <span className="font-bold text-blue-600">${userStats.premiumSavings}</span>
                        </div>
                        <p className="text-xs text-gray-600 font-serif">Estimated value from Bill's premium insights</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-300 bg-purple-50 md:col-span-2">
                  <CardHeader>
                    <CardTitle className="font-serif flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Achievement Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl mb-1">🏆</div>
                        <div className="text-xs font-serif">First Trade</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl mb-1">💎</div>
                        <div className="text-xs font-serif">Diamond Hands</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl mb-1">🎯</div>
                        <div className="text-xs font-serif">Sharp Shooter</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl mb-1">🤠</div>
                        <div className="text-xs font-serif">True Pioneer</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="showdown">
              <Card className="border-2 border-red-300 bg-red-50">
                <CardHeader>
                  <CardTitle className="font-serif text-center text-2xl">🔫 High Noon Showdown with Bill 🔫</CardTitle>
                  <CardDescription className="text-center font-serif">
                    "Think you can out-predict this old barkeep? Let's see what you're made of, partner!"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!showdownActive ? (
                    <div className="text-center space-y-4">
                      <div className="text-6xl">🤠</div>
                      <p className="font-serif text-lg">
                        Challenge Bill to a market prediction duel! Winner takes all the glory (and maybe some STONES).
                      </p>
                      <Button onClick={startShowdown} size="lg" className="font-serif">
                        Draw! (Start Showdown)
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="font-serif text-xl mb-4">Make Your Prediction</h3>
                        <p className="font-serif">
                          "Bitcoin will be above $45,000 by next Friday. What's your call, partner?"
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-20 font-serif">
                          <div>
                            <div className="text-lg">📈</div>
                            <div>Higher</div>
                          </div>
                        </Button>
                        <Button variant="outline" className="h-20 font-serif">
                          <div>
                            <div className="text-lg">📉</div>
                            <div>Lower</div>
                          </div>
                        </Button>
                      </div>
                      <div className="text-center">
                        <Badge className="font-serif">Showdown ends in 6 days, 14 hours</Badge>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
