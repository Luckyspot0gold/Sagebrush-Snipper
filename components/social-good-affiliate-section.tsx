"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, DollarSign, Users, TrendingUp, Award, ExternalLink, Globe, Leaf, BookOpen, Home } from "lucide-react"
import { affiliateTracker } from "@/lib/affiliate-tracking"

interface SocialGoodCause {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  totalRaised: number
  goal: number
  beneficiaries: number
  link?: string // This is where your social good link will go
}

export function SocialGoodAffiliateSection() {
  const [metrics, setMetrics] = useState({
    totalDonated: 0,
    causesSupported: [],
    impactScore: 0,
    participatingUsers: 0,
  })
  const [userContribution, setUserContribution] = useState(0)

  // Sample causes - you can replace with your actual social good link
  const [causes] = useState<SocialGoodCause[]>([
    {
      id: "education",
      name: "Digital Education Access",
      description: "Providing technology and internet access to underserved communities",
      icon: <BookOpen className="h-6 w-6" />,
      totalRaised: 2450.75,
      goal: 5000,
      beneficiaries: 127,
      link: "https://your-social-good-link-here.com", // Replace with your actual link
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

  useEffect(() => {
    loadSocialGoodData()
  }, [])

  const loadSocialGoodData = async () => {
    try {
      await affiliateTracker.initialize()
      const socialMetrics = affiliateTracker.getSocialGoodMetrics()
      const userContrib = affiliateTracker.getUserSocialGoodContribution("current_user_id")

      setMetrics(socialMetrics)
      setUserContribution(userContrib)
    } catch (error) {
      console.error("Failed to load social good data:", error)
    }
  }

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100)
  }

  const getTotalImpact = () => {
    return causes.reduce((total, cause) => total + cause.beneficiaries, 0)
  }

  return (
    <div className="social-good-section space-y-6 p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="h-8 w-8 text-red-500 fill-red-500" />
          <h2 className="text-3xl font-bold text-green-800 headline-primary">Social Good Impact</h2>
          <Heart className="h-8 w-8 text-red-500 fill-red-500" />
        </div>
        <p className="text-lg text-gray-700 font-serif">
          Every affiliate click contributes 5% to meaningful causes. Together, we're building a better world.
        </p>
      </div>

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
            <div className="text-2xl font-bold text-purple-800">{metrics.impactScore.toFixed(0)}</div>
            <div className="text-sm text-gray-600">Impact Score</div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-white/80">
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-800">{causes.length}</div>
            <div className="text-sm text-gray-600">Active Causes</div>
          </CardContent>
        </Card>
      </div>

      {/* Your Personal Contribution */}
      {userContribution > 0 && (
        <Card className="border-2 border-gold bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Award className="h-6 w-6" />
              Your Social Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-800 mb-2">${userContribution.toFixed(2)}</div>
              <p className="text-gray-700">You've contributed to social good through your affiliate activity!</p>
              <Badge className="mt-2 bg-orange-200 text-orange-800">Community Champion</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Causes */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-center text-gray-800 headline-secondary">Active Causes</h3>

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
      </div>

      {/* Benefits of Social Good */}
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
