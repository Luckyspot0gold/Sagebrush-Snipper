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
import { RevenueDashboard } from "@/components/revenue-dashboard"

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
  mood: "bullish" | "bearish" | "neutral" | "excited" | "concerned" | "cheerful"
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

const FRONTIER_DIALOGUE_LIBRARY = {
  launch: [
    "Howdy, partner! Bill's the name. Seen more market booms than a Missouri riverboat gambler. Need help navigating these choppy waters?",
    "Welcome to my establishment! Been tendin' bar since the Gold Rush of '49. What brings ya to the frontier today?",
    "Pull up a stool, friend! This old bartender's got wisdom older than the hills and fresher than morning dew.",
  ],
  marketCrash: [
    "Dagnabbit! Prices are dropping faster than a coyote down a mineshaft. Reckon you should batten down the hatches!",
    "Thunderation! Market's colder than a Wyoming winter. Time to hunker down and wait for spring.",
    "Well I'll be jiggered! Haven't seen a crash this bad since the Panic of '73. Hold onto your hat, partner!",
  ],
  successfulTrade: [
    "Well butter my biscuits! That trade's sweeter than Georgia peach pie. Celebrate with a sarsaparilla?",
    "Finer than frog's hair! You just struck gold, partner. How 'bout a drink to celebrate?",
    "Hotter than a pistol in July! That was some mighty fine trading. Care for some liquid celebration?",
  ],
  newFeature: [
    "Say... back in '49 we used claim jumpers to stake territory. This new option's mighty similar...",
    "Reminds me of the old mining claims. Same principle, different century, partner.",
    "In my day, we called this 'staking a claim.' Looks like you got the same opportunity here!",
  ],
  volatileMarket: [
    "Thunderation! This market's wilder than a mustang stampede! Best to rein in them leveraged positions.",
    "Jumpier than a long-tailed cat in a room full of rockers! Consider hedging with gold or land deeds.",
    "More unpredictable than prairie weather! Time to play it safe, partner.",
  ],
}

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
  const [sarsaparillaOffered, setSarsaparillaOffered] = useState(false)
  const [marketInsightBoost, setMarketInsightBoost] = useState(1.0)

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
    let response = ""
    let mood: BillResponse["mood"] = "neutral"
    const confidence = 0.8
    const recommendations: string[] = []

    // Use dialogue library based on market conditions
    if (marketSentiment < -0.5) {
      response =
        FRONTIER_DIALOGUE_LIBRARY.marketCrash[Math.floor(Math.random() * FRONTIER_DIALOGUE_LIBRARY.marketCrash.length)]
      mood = "bearish"
    } else if (marketSentiment > 0.5) {
      response =
        FRONTIER_DIALOGUE_LIBRARY.successfulTrade[
          Math.floor(Math.random() * FRONTIER_DIALOGUE_LIBRARY.successfulTrade.length)
        ]
      mood = "bullish"
    } else if (marketMood === "Volatile") {
      response =
        FRONTIER_DIALOGUE_LIBRARY.volatileMarket[
          Math.floor(Math.random() * FRONTIER_DIALOGUE_LIBRARY.volatileMarket.length)
        ]
      mood = "concerned"
    } else {
      response = FRONTIER_DIALOGUE_LIBRARY.launch[Math.floor(Math.random() * FRONTIER_DIALOGUE_LIBRARY.launch.length)]
      mood = "cheerful"
    }

    // Add context-specific advice
    if (lowerQuery.includes("help") || lowerQuery.includes("guide")) {
      recommendations.push(
        "Check the market sentiment indicator",
        "Review your portfolio balance",
        "Consider diversifying your holdings",
      )
    }

    return { message: response, mood, confidence, recommendations }
  }

  const offerSarsaparilla = () => {
    if (!sarsaparillaOffered && marketSentiment > 0.3) {
      return {
        text: "Buy ya a celebratory sarsaparilla?",
        reward: "10% market insight boost for 5 minutes!",
        action: () => {
          setSarsaparillaOffered(true)
          setMarketInsightBoost(1.1)
          // playSound("whiskey-pour")

          // Remove boost after 5 minutes
          setTimeout(() => {
            setMarketInsightBoost(1.0)
          }, 300000)

          // setCurrentDialogue({
          //   greeting: "Much obliged, partner!",
          //   advice: [
          //     "That sarsaparilla's got some special ingredients from the old country...",
          //     "Yer market instincts should be sharper now!",
          //     "Use this wisdom well, and may fortune smile upon ya!"
          //   ],
          //   mood: "excited"
          // })
        },
      }
    }
    return null
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
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="chat" className="font-serif">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat with Bill
              </TabsTrigger>
              <TabsTrigger value="insights" className="font-serif">
                <Zap className="h-4 w-4 mr-2" />
                Market Intel
              </TabsTrigger>
              <TabsTrigger value="revenue" className="font-serif">
                <Coins className="h-4 w-4 mr-2" />
                Revenue Saloon
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

            <TabsContent value="revenue" className="space-y-4">
              <Card className="border-2 border-gray-300">
                <CardHeader>
                  <CardTitle className="font-serif">Bill's Revenue Dashboard</CardTitle>
                  <CardDescription>Live earnings from the digital frontier</CardDescription>
                </CardHeader>
                <CardContent>
                  <RevenueDashboard />
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
