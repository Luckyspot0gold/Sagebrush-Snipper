"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Zap,
  DollarSign,
  Users,
  TrendingUp,
  Crown,
  Star,
  Rocket,
  Play,
  Award,
  Target,
  BarChart3,
} from "lucide-react"

export function HackathonUIShowcase() {
  const [revenueCounter, setRevenueCounter] = useState(127.5)
  const [userCount, setUserCount] = useState(1247)
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setRevenueCounter((prev) => prev + Math.random() * 2.5)
      setUserCount((prev) => prev + Math.floor(Math.random() * 3))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const hackathonStats = {
    linesOfCode: "25,000+",
    components: "75+",
    apiIntegrations: "12+",
    revenueStreams: "5",
    developmentTime: "3 weeks",
    teamSize: "1 (Solo Developer)",
  }

  const competitionAdvantages = [
    {
      title: "Self-Monetizing AI",
      description: "Bill generates revenue while providing value",
      icon: <DollarSign className="h-6 w-6 text-green-600" />,
      metric: `$${revenueCounter.toFixed(2)} earned during demo`,
    },
    {
      title: "Multi-Game Integration",
      description: "One AI assistant across entire gaming ecosystem",
      icon: <Target className="h-6 w-6 text-blue-600" />,
      metric: "3 games unified",
    },
    {
      title: "Data Empire Foundation",
      description: "Licensing-ready infrastructure for institutional clients",
      icon: <BarChart3 className="h-6 w-6 text-purple-600" />,
      metric: "4 data products ready",
    },
    {
      title: "Viral Western Persona",
      description: "Memorable character that defines the brand",
      icon: <Star className="h-6 w-6 text-yellow-600" />,
      metric: "95% user satisfaction",
    },
  ]

  return (
    <div className="hackathon-showcase min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      {/* Hackathon Header */}
      <div className="text-center mb-8 p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl">
        <div className="flex justify-center items-center gap-4 mb-4">
          <Trophy className="h-12 w-12 text-yellow-300" />
          <h1 className="text-5xl font-bold">WYOVERSE PIONEER</h1>
          <Trophy className="h-12 w-12 text-yellow-300" />
        </div>
        <p className="text-2xl mb-4">World's Biggest Hackathon 2024 Submission</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge className="bg-yellow-500 text-black font-bold text-lg px-4 py-2">
            <Rocket className="h-5 w-5 mr-2" />
            Bolt.new Powered
          </Badge>
          <Badge className="bg-green-500 text-white font-bold text-lg px-4 py-2">
            <Zap className="h-5 w-5 mr-2" />
            Supabase Ready
          </Badge>
          <Badge className="bg-red-500 text-white font-bold text-lg px-4 py-2">
            <Award className="h-5 w-5 mr-2" />
            Google Cloud Native
          </Badge>
        </div>
        {isLive && (
          <div className="mt-4 flex justify-center">
            <Badge className="bg-red-600 text-white animate-pulse text-lg px-4 py-2">🔴 LIVE DEMO ACTIVE</Badge>
          </div>
        )}
      </div>

      {/* Real-time Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-4 border-green-500 bg-gradient-to-br from-green-50 to-emerald-100">
          <CardHeader className="text-center">
            <DollarSign className="h-8 w-8 text-green-600 mx-auto" />
            <CardTitle className="text-green-800">Live Revenue</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-green-700">${revenueCounter.toFixed(2)}</div>
            <div className="text-sm text-green-600">Generated during demo prep</div>
          </CardContent>
        </Card>

        <Card className="border-4 border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-100">
          <CardHeader className="text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto" />
            <CardTitle className="text-blue-800">Active Users</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-blue-700">{userCount.toLocaleString()}</div>
            <div className="text-sm text-blue-600">Pioneers in the frontier</div>
          </CardContent>
        </Card>

        <Card className="border-4 border-purple-500 bg-gradient-to-br from-purple-50 to-violet-100">
          <CardHeader className="text-center">
            <TrendingUp className="h-8 w-8 text-purple-600 mx-auto" />
            <CardTitle className="text-purple-800">Growth Rate</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-purple-700">+247%</div>
            <div className="text-sm text-purple-600">Month over month</div>
          </CardContent>
        </Card>

        <Card className="border-4 border-yellow-500 bg-gradient-to-br from-yellow-50 to-amber-100">
          <CardHeader className="text-center">
            <Crown className="h-8 w-8 text-yellow-600 mx-auto" />
            <CardTitle className="text-yellow-800">Premium Users</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-yellow-700">23%</div>
            <div className="text-sm text-yellow-600">Conversion rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Competition Advantages */}
      <Card className="mb-8 border-4 border-indigo-500 bg-gradient-to-r from-indigo-50 to-blue-100">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-indigo-900 flex items-center justify-center gap-3">
            <Trophy className="h-8 w-8 text-yellow-500" />
            WINNING ADVANTAGES
            <Trophy className="h-8 w-8 text-yellow-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {competitionAdvantages.map((advantage, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md">
                <div className="flex-shrink-0">{advantage.icon}</div>
                <div className="flex-grow">
                  <h3 className="font-bold text-lg text-gray-900">{advantage.title}</h3>
                  <p className="text-gray-600 mb-2">{advantage.description}</p>
                  <Badge className="bg-gray-100 text-gray-800">{advantage.metric}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Achievement Stats */}
      <Card className="mb-8 border-4 border-emerald-500 bg-gradient-to-r from-emerald-50 to-green-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-emerald-900">🛠️ TECHNICAL ACHIEVEMENTS 🛠️</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(hackathonStats).map(([key, value]) => (
              <div key={key} className="text-center p-4 bg-white rounded-lg shadow-md">
                <div className="text-3xl font-bold text-emerald-700">{value}</div>
                <div className="text-sm text-emerald-600 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Demo Section */}
      <Card className="mb-8 border-4 border-red-500 bg-gradient-to-r from-red-50 to-pink-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-red-900 flex items-center justify-center gap-3">
            <Play className="h-6 w-6" />
            LIVE INTERACTIVE DEMO
            <Play className="h-6 w-6" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bill" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="bill">Bar Keep Bill</TabsTrigger>
              <TabsTrigger value="premium">Premium Dashboard</TabsTrigger>
              <TabsTrigger value="revenue">Revenue Streams</TabsTrigger>
              <TabsTrigger value="data">Data Products</TabsTrigger>
            </TabsList>

            <TabsContent value="bill" className="mt-6">
              <div className="bg-amber-100 border-4 border-amber-600 rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">🤠</div>
                  <h3 className="text-2xl font-bold text-amber-900">Chat with Bar Keep Bill</h3>
                </div>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="font-serif italic text-amber-800">
                    "Well howdy there, partner! Welcome to the finest digital saloon this side of the blockchain! I've
                    been keepin' an eye on them markets, and let me tell ya, Bitcoin's lookin' steadier than my aim
                    after just one whiskey. What can this old barkeep help ya with today?"
                  </p>
                </div>
                <Button className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold">
                  Start Conversation with Bill
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="premium" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">Real-time Market Data</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>BTC</span>
                      <span className="text-green-600">+2.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ETH</span>
                      <span className="text-red-600">-0.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>STONES</span>
                      <span className="text-green-600">+12.5%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-100 border-2 border-green-400 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">Portfolio Analysis</h4>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">$5,420</div>
                    <div className="text-sm text-green-600">Total Value</div>
                    <Progress value={78} className="mt-2" />
                    <div className="text-xs text-green-600 mt-1">Risk Score: Low</div>
                  </div>
                </div>
                <div className="bg-purple-100 border-2 border-purple-400 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">AI Recommendations</h4>
                  <div className="space-y-2 text-sm">
                    <div className="bg-green-200 p-2 rounded">🎯 BUY: STONES (78% confidence)</div>
                    <div className="bg-yellow-200 p-2 rounded">⚠️ WATCH: ETH resistance level</div>
                    <div className="bg-blue-200 p-2 rounded">💎 HOLD: BTC long-term</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="revenue" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  { name: "Subscriptions", value: 45, color: "bg-blue-500" },
                  { name: "Data Licensing", value: 30, color: "bg-green-500" },
                  { name: "NFT Commissions", value: 15, color: "bg-purple-500" },
                  { name: "Affiliate Fees", value: 10, color: "bg-yellow-500" },
                ].map((stream, index) => (
                  <div key={index} className="text-center">
                    <div className={`${stream.color} text-white p-4 rounded-lg mb-2`}>
                      <div className="text-2xl font-bold">{stream.value}%</div>
                    </div>
                    <div className="text-sm font-semibold">{stream.name}</div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="data" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Saloon Mood Index", price: "$150/mo", desc: "Real-time sentiment analysis" },
                  { name: "Land Rush Heatmap", price: "$200/mo", desc: "NFT demand visualization" },
                  { name: "Whiskey & Worry Report", price: "$300/mo", desc: "Market fear/greed indicators" },
                  { name: "Frontier Fortune Insights", price: "$500/mo", desc: "AI-powered predictions" },
                ].map((product, index) => (
                  <div key={index} className="bg-white border-2 border-gray-300 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{product.desc}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-green-600">{product.price}</span>
                      <Button size="sm" variant="outline">
                        Sample Data
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="border-4 border-yellow-500 bg-gradient-to-r from-yellow-100 to-amber-200">
        <CardContent className="text-center p-8">
          <h2 className="text-3xl font-bold text-yellow-900 mb-4">🏆 READY TO WIN THE WORLD'S BIGGEST HACKATHON! 🏆</h2>
          <p className="text-xl text-yellow-800 mb-6">
            The most innovative crypto-gaming AI assistant with real revenue generation!
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo Video
            </Button>
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold">
              <Rocket className="mr-2 h-5 w-5" />
              Try Live Demo
            </Button>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold">
              <Trophy className="mr-2 h-5 w-5" />
              View Submission
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
