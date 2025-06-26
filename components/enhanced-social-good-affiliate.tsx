"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  DollarSign,
  Users,
  TrendingUp,
  Award,
  ExternalLink,
  Globe,
  Leaf,
  BookOpen,
  Home,
  ShoppingCart,
  Coins,
  Share2,
} from "lucide-react"

interface SocialGoodCause {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  totalRaised: number
  goal: number
  beneficiaries: number
  link?: string
}

interface AffiliateLink {
  id: string
  name: string
  description: string
  url: string
  commission: number
  category: string
  specialCode?: string
  isActive: boolean
}

export function EnhancedSocialGoodAffiliate() {
  const [metrics, setMetrics] = useState({
    totalDonated: 1247.85,
    causesSupported: 3,
    impactScore: 892,
    participatingUsers: 156,
  })

  const [userContribution, setUserContribution] = useState(23.45)
  const [selectedTab, setSelectedTab] = useState("overview")

  // Social Good Causes
  const [causes] = useState<SocialGoodCause[]>([
    {
      id: "education",
      name: "Digital Education Access",
      description: "Providing technology and internet access to underserved communities",
      icon: <BookOpen className="h-6 w-6" />,
      totalRaised: 2450.75,
      goal: 5000,
      beneficiaries: 127,
      link: "https://go.socialgood.inc/?adj_redirect=https%3A%2F%2Fsocialgood.inc%2Fapp%2F1%2F&adj_t=1gbx67rh&adj_deeplink_js=1&referralCode=SVJDQ6",
    },
    {
      id: "environment",
      name: "Carbon Offset Program",
      description: "Offsetting blockchain energy consumption through renewable projects",
      icon: <Leaf className="h-6 w-6" />,
      totalRaised: 1875.25,
      goal: 3000,
      beneficiaries: 89,
    },
    {
      id: "housing",
      name: "Affordable Housing Initiative",
      description: "Supporting housing projects in Wyoming communities",
      icon: <Home className="h-6 w-6" />,
      totalRaised: 3200.5,
      goal: 8000,
      beneficiaries: 45,
    },
  ])

  // Affiliate Links
  const [affiliateLinks] = useState<AffiliateLink[]>([
    {
      id: "socialgood",
      name: "SocialGood.inc",
      description: "Earn while shopping for social good causes",
      url: "https://go.socialgood.inc/?adj_redirect=https%3A%2F%2Fsocialgood.inc%2Fapp%2F1%2F&adj_t=1gbx67rh&adj_deeplink_js=1&referralCode=SVJDQ6",
      commission: 0.05,
      category: "social_good",
      isActive: true,
    },
    {
      id: "deso",
      name: "DeSo Blockchain",
      description: "Decentralized social blockchain platform",
      url: "https://docs.deso.org/",
      commission: 0.03,
      category: "blockchain",
      isActive: true,
    },
    {
      id: "temu_main",
      name: "Temu Shopping",
      description: "🔥 Hot deals just a click away! Get $0 gifts and 30% off discount!",
      url: "https://temu.to/m/u7wq0kfazcq",
      commission: 0.08,
      category: "shopping",
      specialCode: "frp288931",
      isActive: true,
    },
    {
      id: "temu_app",
      name: "Temu App Direct",
      description: "Direct app access with exclusive deals",
      url: "https://app.temu.com/m/qqmjtu4t3jr",
      commission: 0.08,
      category: "shopping",
      isActive: true,
    },
    {
      id: "temu_earn",
      name: "Temu Earn Together",
      description: "Earn with friends program - Search inv961284",
      url: "https://temu.to/m/uk5c470tnv3",
      commission: 0.08,
      category: "shopping",
      specialCode: "inv961284",
      isActive: true,
    },
  ])

  const handleAffiliateClick = async (link: AffiliateLink) => {
    try {
      // Track the click
      const response = await fetch("/api/affiliate/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          affiliateId: link.id,
          userId: "current_user_id",
          userTier: "silver",
          timestamp: new Date().toISOString(),
          socialGoodEnabled: true,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log("✅ Affiliate click tracked:", result)

        // Update user contribution
        setUserContribution((prev) => prev + link.commission * 10) // Simulate earning
      }

      // Open the affiliate link
      window.open(link.url, "_blank")
    } catch (error) {
      console.error("❌ Affiliate tracking failed:", error)
      // Still open the link even if tracking fails
      window.open(link.url, "_blank")
    }
  }

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100)
  }

  const getTotalImpact = () => {
    return causes.reduce((total, cause) => total + cause.beneficiaries, 0)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "social_good":
        return <Heart className="h-5 w-5" />
      case "blockchain":
        return <Coins className="h-5 w-5" />
      case "shopping":
        return <ShoppingCart className="h-5 w-5" />
      default:
        return <Globe className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "social_good":
        return "bg-red-100 text-red-800 border-red-200"
      case "blockchain":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "shopping":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="social-good-section space-y-6 p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="h-8 w-8 text-red-500 fill-red-500" />
          <h2 className="text-3xl font-bold text-green-800 headline-primary">Social Good Affiliate Network</h2>
          <Heart className="h-8 w-8 text-red-500 fill-red-500" />
        </div>
        <p className="text-lg text-gray-700 font-serif">
          Every click contributes 5% to meaningful causes. Shop, earn, and make a difference!
        </p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="affiliates">Affiliate Links</TabsTrigger>
          <TabsTrigger value="causes">Social Causes</TabsTrigger>
          <TabsTrigger value="impact">My Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-green-200 bg-white/80">
              <CardContent className="p-4 text-center">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-800">${metrics.totalDonated.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Total Donated</div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-white/80">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-800">{getTotalImpact()}</div>
                <div className="text-sm text-gray-600">Lives Impacted</div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-white/80">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-800">{metrics.impactScore}</div>
                <div className="text-sm text-gray-600">Impact Score</div>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-white/80">
              <CardContent className="p-4 text-center">
                <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-800">{affiliateLinks.length}</div>
                <div className="text-sm text-gray-600">Active Partners</div>
              </CardContent>
            </Card>
          </div>

          {/* Featured Affiliates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {affiliateLinks.slice(0, 3).map((link) => (
              <Card key={link.id} className="border-2 hover:border-green-300 transition-colors cursor-pointer">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {getCategoryIcon(link.category)}
                    {link.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{link.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getCategoryColor(link.category)}>
                      {(link.commission * 100).toFixed(1)}% commission
                    </Badge>
                    {link.specialCode && (
                      <Badge variant="outline" className="text-xs">
                        Code: {link.specialCode}
                      </Badge>
                    )}
                  </div>
                  <Button
                    onClick={() => handleAffiliateClick(link)}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit & Earn
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="affiliates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {affiliateLinks.map((link) => (
              <Card key={link.id} className="border-2 hover:border-green-300 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(link.category)}
                      {link.name}
                    </div>
                    <Badge className={getCategoryColor(link.category)}>{link.category.replace("_", " ")}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">{link.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Commission Rate:</span>
                    <span className="text-lg font-bold text-green-600">{(link.commission * 100).toFixed(1)}%</span>
                  </div>

                  {link.specialCode && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                      <div className="text-xs font-medium text-yellow-800">Special Code:</div>
                      <div className="text-sm font-bold text-yellow-900">{link.specialCode}</div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAffiliateClick(link)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      size="sm"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit
                    </Button>
                    <Button onClick={() => navigator.clipboard.writeText(link.url)} variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="causes" className="space-y-4">
          {causes.map((cause) => (
            <Card key={cause.id} className="border-2 border-gray-200 hover:border-green-300 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-full">{cause.icon}</div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">{cause.name}</h4>
                      <p className="text-sm text-gray-600">{cause.description}</p>
                    </div>
                  </div>
                  {cause.link && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(cause.link, "_blank")}
                      className="border-green-300 text-green-700 hover:bg-green-50"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Learn More
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-semibold">
                    ${cause.totalRaised.toFixed(2)} / ${cause.goal.toFixed(2)}
                  </span>
                </div>

                <Progress value={getProgressPercentage(cause.totalRaised, cause.goal)} className="h-3" />

                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1 text-blue-600">
                    <Users className="h-4 w-4" />
                    <span>{cause.beneficiaries} beneficiaries</span>
                  </div>
                  <div className="text-green-600 font-semibold">
                    {getProgressPercentage(cause.totalRaised, cause.goal).toFixed(1)}% funded
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          {/* Personal Impact */}
          <Card className="border-2 border-gold bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <Award className="h-6 w-6" />
                Your Social Impact Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-3xl font-bold text-green-600">${userContribution.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Your Total Contribution</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-gray-600">Affiliate Clicks</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">5</div>
                  <div className="text-sm text-gray-600">Lives Impacted</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Recent Activity</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Temu Shopping Click</span>
                    <span className="text-green-600">+$0.80 to social good</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SocialGood.inc Referral</span>
                    <span className="text-green-600">+$0.50 to education</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DeSo Platform Visit</span>
                    <span className="text-green-600">+$0.30 to environment</span>
                  </div>
                </div>
              </div>

              <Badge className="w-full justify-center py-2 bg-orange-200 text-orange-800">
                🏆 Community Champion - Keep up the great work!
              </Badge>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Globe className="h-6 w-6" />
                Benefits of Social Good Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-800">For Your Business:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Enhanced brand reputation and trust</li>
                    <li>• Increased customer loyalty and engagement</li>
                    <li>• Tax benefits from charitable contributions</li>
                    <li>• Positive PR and marketing opportunities</li>
                    <li>• ESG (Environmental, Social, Governance) compliance</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-800">For Your Community:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Direct positive impact on local communities</li>
                    <li>• Sustainable development support</li>
                    <li>• Educational and environmental benefits</li>
                    <li>• Increased social awareness and participation</li>
                    <li>• Long-term community building</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Call to Action */}
      <div className="text-center space-y-4 p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border-2 border-green-300">
        <h3 className="text-2xl font-bold text-green-800 headline-primary">Join the Movement</h3>
        <p className="text-gray-700 font-serif">
          Every click, every referral, every interaction contributes to positive change. Start earning while making a
          difference today!
        </p>
        <div className="flex justify-center gap-4">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Heart className="h-4 w-4 mr-2" />
            Start Contributing
          </Button>
          <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
            <ExternalLink className="h-4 w-4 mr-2" />
            Learn More
          </Button>
        </div>
      </div>
    </div>
  )
}
