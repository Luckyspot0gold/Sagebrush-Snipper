"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Trophy, Users, TrendingUp, Zap, Star } from "lucide-react"
import Image from "next/image"

export function HackathonDemo() {
  const [demoStep, setDemoStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const demoSteps = [
    {
      title: "Welcome to WyoVerse Pioneer",
      description: "The world's first crypto frontier newspaper metaverse",
      image: "/images/wyoverse-digital-mountain.png",
      features: ["Immersive 1800s newspaper interface", "Real-time crypto market integration", "Multi-game platform"],
    },
    {
      title: "Crypto Clashers Boxing",
      description: "Market-driven combat where volatility powers punches",
      image: "/images/crypto-clashers-fighter.png",
      features: ["Live market data affects fight intensity", "NFT fighter collections", "Real-time streaming"],
    },
    {
      title: "Crypto Clashers Racing",
      description: "High-speed racing where markets determine velocity",
      image: "/images/pink-race-car.png",
      features: ["Market momentum drives speed", "Cosmic racing environments", "Competitive leaderboards"],
    },
    {
      title: "Frontier Trading Post",
      description: "Advanced trading tools with vintage marketplace",
      image: "/images/wyoverse-digital-mountain.png",
      features: ["AI-powered trading bots", "NFT marketplace", "Portfolio management"],
    },
  ]

  const hackathonStats = {
    linesOfCode: "15,000+",
    components: "50+",
    features: "25+",
    integrations: "8+",
    developmentTime: "2 weeks",
  }

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setDemoStep((prev) => (prev + 1) % demoSteps.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, demoSteps.length])

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Hackathon Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center gap-4 mb-4">
          <Image src="/images/stoneyard-games.jpeg" alt="WyoVerse" width={60} height={60} className="rounded-full" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            WyoVerse Pioneer
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          The world's first crypto frontier newspaper metaverse - combining immersive gaming, real-time market data, and
          authentic 1800s newspaper aesthetics
        </p>
        <div className="flex justify-center gap-2">
          <Badge className="bg-blue-100 text-blue-800">🏆 Bolt Hackathon 2024</Badge>
          <Badge className="bg-green-100 text-green-800">⚡ Supabase Powered</Badge>
          <Badge className="bg-yellow-100 text-yellow-800">☁️ Google Cloud Ready</Badge>
        </div>
      </div>

      {/* Interactive Demo */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Interactive Demo</h2>
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            className={isPlaying ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
          >
            {isPlaying ? "Pause Demo" : "Start Demo"}
            <Play className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{demoSteps[demoStep].title}</h3>
            <p className="text-gray-600">{demoSteps[demoStep].description}</p>
            <ul className="space-y-2">
              {demoSteps[demoStep].features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <Image
              src={demoSteps[demoStep].image || "/placeholder.svg"}
              alt={demoSteps[demoStep].title}
              width={400}
              height={300}
              className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
            />
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {demoStep + 1} / {demoSteps.length}
            </div>
          </div>
        </div>

        {/* Demo Navigation */}
        <div className="flex justify-center gap-2 mt-4">
          {demoSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setDemoStep(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === demoStep ? "bg-blue-600" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </Card>

      {/* Technical Achievements */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(hackathonStats).map(([key, value]) => (
          <Card key={key} className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{value}</div>
            <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</div>
          </Card>
        ))}
      </div>

      {/* Key Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <h3 className="text-xl font-semibold">Real-time Market Integration</h3>
          </div>
          <p className="text-gray-600">
            Live cryptocurrency market data drives game mechanics, creating unique gameplay experiences that respond to
            real-world market conditions.
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-8 w-8 text-yellow-600" />
            <h3 className="text-xl font-semibold">Multi-Game Platform</h3>
          </div>
          <p className="text-gray-600">
            Three integrated games: Crypto Clashers Boxing, Racing, and Frontier Trading - all unified under one
            immersive newspaper interface.
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-8 w-8 text-purple-600" />
            <h3 className="text-xl font-semibold">Community-Driven</h3>
          </div>
          <p className="text-gray-600">
            Built-in social features, marketplace, and community spaces that bring players together in the digital
            frontier.
          </p>
        </Card>
      </div>

      {/* Technology Stack */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Frontend</h4>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• Next.js 14</li>
              <li>• TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• Framer Motion</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Backend</h4>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• Neon Database</li>
              <li>• Server Actions</li>
              <li>• API Routes</li>
              <li>• Real-time Updates</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Integrations</h4>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• CoinGecko API</li>
              <li>• Streaming APIs</li>
              <li>• Music Services</li>
              <li>• NFT Marketplaces</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Features</h4>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• Sound Effects</li>
              <li>• Animations</li>
              <li>• Responsive Design</li>
              <li>• PWA Ready</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Call to Action */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Ready to Explore the Digital Frontier?</h2>
        <div className="flex justify-center gap-4">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Play className="mr-2 h-5 w-5" />
            Try Live Demo
          </Button>
          <Button size="lg" variant="outline">
            <Zap className="mr-2 h-5 w-5" />
            View Source Code
          </Button>
        </div>
      </div>
    </div>
  )
}
