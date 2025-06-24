"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Star, Target, Check, Shield, Award } from "lucide-react"

interface SubscriptionPlan {
  id: string
  name: string
  slug: string
  price: number
  features: string[]
  whiskey_bonus: number
  popular?: boolean
  icon: React.ReactNode
  color: string
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "1",
    name: "Prospector",
    slug: "prospector",
    price: 0,
    features: [
      "Basic market data (15min delay)",
      "Daily frontier fortune",
      "General market sentiment",
      "Access to saloon chat",
      "Basic land parcel info",
    ],
    whiskey_bonus: 0,
    icon: <Target className="h-6 w-6" />,
    color: "bg-gray-100 border-gray-300",
  },
  {
    id: "2",
    name: "Claim Owner",
    slug: "claim-owner",
    price: 4.99,
    features: [
      "Real-time market alerts",
      "NFT valuation analysis",
      "Land parcel trend analysis",
      "Priority saloon access",
      "Personalized trading insights",
      "Cross-game integration",
      "Bills exclusive tips",
    ],
    whiskey_bonus: 10,
    popular: true,
    icon: <Star className="h-6 w-6" />,
    color: "bg-blue-50 border-blue-300",
  },
  {
    id: "3",
    name: "Territory Baron",
    slug: "baron",
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
    whiskey_bonus: 50,
    icon: <Crown className="h-6 w-6" />,
    color: "bg-yellow-50 border-yellow-400",
  },
]

export function SubscriptionManagement() {
  const [currentPlan, setCurrentPlan] = useState("prospector")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (planSlug: string) => {
    setIsLoading(true)

    try {
      // Here you would integrate with Stripe
      const response = await fetch("/api/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planSlug }),
      })

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error("Subscription error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="subscription-saloon p-6 bg-gradient-to-b from-amber-50 to-yellow-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 p-6 bg-gradient-to-r from-yellow-200 to-amber-200 rounded-lg border-4 border-amber-800 shadow-lg">
          <h1 className="text-4xl font-serif font-bold text-amber-900 mb-2">🥃 WHISKEY WISDOM SUBSCRIPTION TIERS 🥃</h1>
          <p className="text-lg font-serif text-amber-800">
            "Partner, the frontier rewards those who invest in knowledge"
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <Badge className="bg-green-600 text-white font-serif">
              <Shield className="h-4 w-4 mr-1" />
              30-Day Money Back Guarantee
            </Badge>
            <Badge className="bg-blue-600 text-white font-serif">
              <Award className="h-4 w-4 mr-1" />
              95% User Satisfaction
            </Badge>
          </div>
        </div>

        {/* Subscription Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {subscriptionPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${plan.color} ${plan.popular ? "ring-4 ring-blue-500 scale-105" : ""} 
                         border-4 border-amber-700 shadow-lg transition-all duration-300 hover:shadow-xl`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white font-serif text-lg px-4 py-1">🌟 MOST POPULAR 🌟</Badge>
                </div>
              )}

              <CardHeader className="text-center border-b-2 border-amber-700 bg-gradient-to-b from-amber-100 to-yellow-200">
                <div className="flex justify-center mb-2">{plan.icon}</div>
                <CardTitle className="font-serif text-2xl text-amber-900">{plan.name.toUpperCase()}</CardTitle>
                <div className="text-4xl font-bold text-amber-800">
                  {plan.price === 0 ? "FREE" : `$${plan.price}`}
                  {plan.price > 0 && <span className="text-lg font-normal">/month</span>}
                </div>
                {plan.whiskey_bonus > 0 && (
                  <Badge className="bg-amber-600 text-white font-serif">+ {plan.whiskey_bonus} Whiskey Tokens</Badge>
                )}
              </CardHeader>

              <CardContent className="p-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="font-serif text-amber-900">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full font-serif text-lg py-3 ${
                    currentPlan === plan.slug ? "bg-gray-500 cursor-not-allowed" : "bg-amber-700 hover:bg-amber-800"
                  }`}
                  onClick={() => handleSubscribe(plan.slug)}
                  disabled={currentPlan === plan.slug || isLoading}
                >
                  {currentPlan === plan.slug
                    ? "✅ CURRENT PLAN"
                    : plan.price === 0
                      ? "🚀 JOIN THE RUSH"
                      : "💎 CLAIM YOUR LAND"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Value Guarantee Section */}
        <Card className="border-4 border-amber-700 bg-gradient-to-r from-green-100 to-emerald-200 shadow-lg">
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-center flex items-center justify-center gap-2">
              <Shield className="h-6 w-6 text-green-600" />
              BILL'S VALUE GUARANTEE
              <Shield className="h-6 w-6 text-green-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-green-700">95%</div>
                <div className="font-serif text-green-800">User Satisfaction</div>
                <div className="text-xs text-gray-600">Based on 1,200+ reviews</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-700">24/7</div>
                <div className="font-serif text-blue-800">Market Monitoring</div>
                <div className="text-xs text-gray-600">Never miss an opportunity</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-purple-700">30-Day</div>
                <div className="font-serif text-purple-800">Money Back</div>
                <div className="text-xs text-gray-600">No questions asked</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-orange-700">$500+</div>
                <div className="font-serif text-orange-800">Avg. Savings</div>
                <div className="text-xs text-gray-600">From Bill's insights</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <Card className="mt-6 border-4 border-amber-700 bg-gradient-to-r from-purple-100 to-pink-100">
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-center">🗣️ WHAT PIONEERS ARE SAYING 🗣️</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="text-4xl">🤠</div>
                <blockquote className="font-serif italic">
                  "Bill's advice helped me 3x my portfolio in 6 months!"
                </blockquote>
                <div className="text-sm text-gray-600">- Sarah, Territory Baron</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl">💎</div>
                <blockquote className="font-serif italic">
                  "The land rush alerts are pure gold. Never missing a deal again!"
                </blockquote>
                <div className="text-sm text-gray-600">- Mike, Claim Owner</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl">🚀</div>
                <blockquote className="font-serif italic">
                  "Best investment I've made. Bill's like having a crypto mentor!"
                </blockquote>
                <div className="text-sm text-gray-600">- Alex, Territory Baron</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
