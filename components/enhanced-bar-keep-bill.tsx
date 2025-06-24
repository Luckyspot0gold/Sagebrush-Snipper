"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMarketStore } from "@/lib/stores/market-store"
import { TrendingUp, TrendingDown, MessageSquare, Coins, MapPin, BarChart3, Zap, Star } from "lucide-react"

interface MarketInsight {
  id: string
  source: "twitter" | "cmc" | "base" | "coinstats"
  content: string
  sentiment: number
  timestamp: Date
  relevance: number
}

interface BillResponse {
  message: string
  mood: "bullish" | "bearish" | "neutral" | "excited"
  confidence: number
  recommendations?: string[]
}

const SALOON_GREETINGS = [
  "Pull up a stool, partner!",
  "What brings you to my establishment?",
  "The whiskey's flowing and the wisdom's free!",
  "Heard some mighty interesting tales today...",
  "The frontier's buzzing with opportunity!",
]

const WHISKEY_WISDOM = [
  "Remember, fortune favors the bold, but wisdom keeps you alive.",
  "In this digital frontier, information is worth more than gold.",
  "The market's like a wild bronco - respect it or get thrown.",
  "Every pioneer needs a good map and better instincts.",
  "Trust your gut, but verify with data, partner.",
]

export function EnhancedBarKeepBill() {
  const [query, setQuery] = useState("")
  const [conversation, setConversation] = useState<
    Array<{ sender: "user" | "bill"; message: string; timestamp: Date }>
  >([
    {
      sender: "bill",
      message:
        "Well howdy there, partner! Welcome to the finest saloon in the digital frontier. What can old Bill help you with today?",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [marketInsights, setMarketInsights] = useState<MarketInsight[]>([])
  const [billMood, setBillMood] = useState<"bullish" | "bearish" | "neutral">("neutral")

  const { assets, marketMood, marketSentiment } = useMarketStore()

  // Simulate real-time market insights
  useEffect(() => {
    const generateInsight = () => {
      const sources = ["twitter", "cmc", "base", "coinstats"] as const
      const insights = [
        "Bitcoin showing strong support at $43K level",
        "Ethereum gas fees dropping, DeFi activity increasing",
        "Base chain seeing 300% increase in daily transactions",
        "Social sentiment turning bullish on altcoins",
        "Whale movements detected in STONES token",
        "Wyoming crypto legislation gaining momentum",
      ]

      const newInsight: MarketInsight = {
        id: Date.now().toString(),
        source: sources[Math.floor(Math.random() * sources.length)],
        content: insights[Math.floor(Math.random() * insights.length)],
        sentiment: (Math.random() - 0.5) * 2, // -1 to 1
        timestamp: new Date(),
        relevance: Math.random(),
      }

      setMarketInsights((prev) => [newInsight, ...prev.slice(0, 9)])
    }

    const interval = setInterval(generateInsight, 8000)
    generateInsight() // Initial insight

    return () => clearInterval(interval)
  }, [])

  // Update Bill's mood based on market conditions
  useEffect(() => {
    if (marketSentiment > 0.3) {
      setBillMood("bullish")
    } else if (marketSentiment < -0.3) {
      setBillMood("bearish")
    } else {
      setBillMood("neutral")
    }
  }, [marketSentiment])

  const generateBillResponse = (userQuery: string): BillResponse => {
    const lowerQuery = userQuery.toLowerCase()
    let response = `${SALOON_GREETINGS[Math.floor(Math.random() * SALOON_GREETINGS.length)]} `
    let mood: BillResponse["mood"] = "neutral"
    const confidence = 0.8
    const recommendations: string[] = []

    if (lowerQuery.includes("price") || lowerQuery.includes("cost")) {
      const asset = assets.find((a) => lowerQuery.includes(a.name.toLowerCase()))
      if (asset) {
        response += `Now that ${asset.name}... last I heard it was trading at $${asset.price.toFixed(2)} `
        response += `with a ${asset.priceChange > 0 ? "mighty fine" : "rough"} ${Math.abs(asset.priceChange).toFixed(1)}% change. `
        mood = asset.priceChange > 0 ? "bullish" : "bearish"
        recommendations.push(
          `Keep an eye on ${asset.name} - it's showing ${asset.priceChange > 0 ? "strength" : "weakness"}`,
        )
      } else {
        response += "Prices are dancing like tumbleweeds in the wind today. "
      }
    } else if (lowerQuery.includes("land") || lowerQuery.includes("deed")) {
      response +=
        "The land rush continues, partner! Prime parcels near the digital mountains are going for 150 STONES. "
      response += "Heard tell of a new settlement opening up near the crypto mines. "
      mood = "excited"
      recommendations.push("Consider diversifying into virtual real estate", "Check out the new mining territories")
    } else if (lowerQuery.includes("market") || lowerQuery.includes("trend")) {
      response += `The market's feeling ${marketMood.toLowerCase()} today. `
      response += `Sentiment's running at ${(marketSentiment * 100).toFixed(0)}% - `
      response += marketSentiment > 0 ? "folks are optimistic!" : "people are being cautious."
      mood = marketSentiment > 0 ? "bullish" : "bearish"
    } else if (lowerQuery.includes("game") || lowerQuery.includes("boxing") || lowerQuery.includes("racing")) {
      response +=
        "The arena's been packed lately! Crypto Clashers Boxing is drawing crowds from all over the territory. "
      response += "Racing circuit's heating up too - saw some mighty fine times on the track yesterday. "
      mood = "excited"
      recommendations.push("Try your luck in the boxing arena", "Check out the racing leaderboards")
    } else {
      response += "That's an interesting question, partner. "
      response += "The frontier's full of opportunities for those brave enough to seize them. "
    }

    response += ` ${WHISKEY_WISDOM[Math.floor(Math.random() * WHISKEY_WISDOM.length)]}`

    return { message: response, mood, confidence, recommendations }
  }

  const handleSendMessage = async () => {
    if (!query.trim()) return

    const userMessage = {
      sender: "user" as const,
      message: query,
      timestamp: new Date(),
    }

    setConversation((prev) => [...prev, userMessage])
    setQuery("")
    setIsTyping(true)

    // Simulate thinking time
    setTimeout(
      () => {
        const billResponse = generateBillResponse(query)
        const billMessage = {
          sender: "bill" as const,
          message: billResponse.message,
          timestamp: new Date(),
        }

        setConversation((prev) => [...prev, billMessage])
        setIsTyping(false)
      },
      1500 + Math.random() * 1000,
    )
  }

  const getMoodIcon = () => {
    switch (billMood) {
      case "bullish":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "bearish":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <BarChart3 className="h-4 w-4 text-yellow-500" />
    }
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "twitter":
        return "🐦"
      case "cmc":
        return "📊"
      case "base":
        return "🔗"
      case "coinstats":
        return "💰"
      default:
        return "📈"
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Card className="border-4 border-black shadow-lg">
        <CardHeader className="border-b-2 border-black bg-amber-50">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 border-2 border-black">
              <AvatarImage src="/placeholder.svg?height=80&width=80&text=🤠" alt="Bar Keep Bill" />
              <AvatarFallback className="text-2xl">🤠</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl font-serif flex items-center gap-2">
                Bar Keep Bill's Market Saloon
                {getMoodIcon()}
              </CardTitle>
              <CardDescription className="text-lg font-serif">
                Est. 1852 • Whiskey, Wisdom & Market Intelligence
              </CardDescription>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="font-serif">
                  Market Mood: {marketMood}
                </Badge>
                <Badge variant="outline" className="font-serif">
                  Sentiment: {(marketSentiment * 100).toFixed(0)}%
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="chat" className="font-serif">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat with Bill
              </TabsTrigger>
              <TabsTrigger value="insights" className="font-serif">
                <Zap className="h-4 w-4 mr-2" />
                Market Intel
              </TabsTrigger>
              <TabsTrigger value="assets" className="font-serif">
                <Coins className="h-4 w-4 mr-2" />
                Asset Watch
              </TabsTrigger>
              <TabsTrigger value="territory" className="font-serif">
                <MapPin className="h-4 w-4 mr-2" />
                Territory News
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="space-y-4">
              <Card className="border-2 border-gray-300">
                <CardHeader>
                  <CardTitle className="font-serif">Conversation with Bill</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96 w-full border rounded-lg p-4 mb-4">
                    <div className="space-y-4">
                      {conversation.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              msg.sender === "user"
                                ? "bg-blue-500 text-white"
                                : "bg-amber-100 border-2 border-amber-300"
                            }`}
                          >
                            <p className="font-serif">{msg.message}</p>
                            <p className="text-xs opacity-70 mt-1">{msg.timestamp.toLocaleTimeString()}</p>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-amber-100 border-2 border-amber-300 rounded-lg p-3">
                            <div className="flex space-x-2">
                              <div className="w-2 h-2 rounded-full bg-amber-600 animate-bounce" />
                              <div className="w-2 h-2 rounded-full bg-amber-600 animate-bounce delay-75" />
                              <div className="w-2 h-2 rounded-full bg-amber-600 animate-bounce delay-150" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask Bill about markets, land, games, or frontier wisdom..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      className="font-serif"
                    />
                    <Button onClick={handleSendMessage} disabled={isTyping} className="font-serif">
                      Send
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <Card className="border-2 border-gray-300">
                <CardHeader>
                  <CardTitle className="font-serif">Live Market Intelligence</CardTitle>
                  <CardDescription>Real-time insights from across the digital frontier</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      {marketInsights.map((insight) => (
                        <div key={insight.id} className="border rounded-lg p-3 bg-gray-50">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{getSourceIcon(insight.source)}</span>
                              <Badge variant="outline" className="text-xs">
                                {insight.source.toUpperCase()}
                              </Badge>
                              <Badge variant={insight.sentiment > 0 ? "default" : "destructive"} className="text-xs">
                                {insight.sentiment > 0 ? "Bullish" : "Bearish"}
                              </Badge>
                            </div>
                            <span className="text-xs text-gray-500">{insight.timestamp.toLocaleTimeString()}</span>
                          </div>
                          <p className="font-serif text-sm">{insight.content}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assets" className="space-y-4">
              <Card className="border-2 border-gray-300">
                <CardHeader>
                  <CardTitle className="font-serif">Bill's Asset Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {assets.map((asset) => (
                      <div key={asset.name} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-serif font-bold">{asset.name}</h3>
                          <div className="flex items-center gap-1">
                            {asset.priceChange > 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            <span
                              className={`text-sm font-bold ${
                                asset.priceChange > 0 ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {asset.priceChange > 0 ? "+" : ""}
                              {asset.priceChange.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                        <p className="text-lg font-bold">${asset.price.toFixed(2)}</p>
                        <div className="flex items-center gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(Math.random() * 5) + 1 ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-xs text-gray-600 ml-1">Bill's Rating</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="territory" className="space-y-4">
              <Card className="border-2 border-gray-300">
                <CardHeader>
                  <CardTitle className="font-serif">Territory Updates</CardTitle>
                  <CardDescription>Latest news from around the WyoVerse</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 bg-blue-50">
                      <h3 className="font-serif font-bold mb-2">🏔️ Digital Mountain Mining</h3>
                      <p className="font-serif text-sm">
                        New veins of STONES discovered in the northern territories. Mining permits available at the Land
                        Office.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4 bg-green-50">
                      <h3 className="font-serif font-bold mb-2">🏟️ Arena Championships</h3>
                      <p className="font-serif text-sm">
                        Crypto Clashers Boxing tournament starts next week. Registration open for all weight classes.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4 bg-yellow-50">
                      <h3 className="font-serif font-bold mb-2">🏇 Racing Circuit News</h3>
                      <p className="font-serif text-sm">
                        New track opened at Thunder Valley. First race this Saturday with 1000 STONES prize pool.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4 bg-purple-50">
                      <h3 className="font-serif font-bold mb-2">🏛️ Pyramid Expedition</h3>
                      <p className="font-serif text-sm">
                        Archaeological team reports strange energy readings from the Wyoming Pyramid. Investigation
                        ongoing.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
