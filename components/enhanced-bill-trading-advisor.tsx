"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, TrendingUp, TrendingDown, AlertTriangle, Lightbulb } from "lucide-react"
import { useSoundEffects } from "@/lib/sound-effects"

interface TradingAdvice {
  id: string
  message: string
  sentiment: "bullish" | "bearish" | "neutral" | "warning"
  confidence: number
  timestamp: Date
  marketContext: string
}

const billsAdvice: TradingAdvice[] = [
  {
    id: "advice-1",
    message:
      "Well partner, I've been watchin' them Bitcoin charts like a hawk watches a prairie dog, and I reckon we're seein' some mighty fine support at $43,000. Reminds me of the time we found that gold vein back in '79 - sometimes ya gotta dig a little deeper to strike it rich!",
    sentiment: "bullish",
    confidence: 78,
    timestamp: new Date(Date.now() - 300000),
    marketContext: "BTC showing strong support levels",
  },
  {
    id: "advice-2",
    message:
      "Now hold yer horses there, cowpoke! That Ethereum's been ridin' high like a mustang in a thunderstorm. My old pappy always said 'what goes up like a rocket, sometimes comes down like a rock.' Might be time to take some profits off the table.",
    sentiment: "warning",
    confidence: 85,
    timestamp: new Date(Date.now() - 600000),
    marketContext: "ETH overbought conditions detected",
  },
  {
    id: "advice-3",
    message:
      "Avalanche is lookin' prettier than a sunset over the Grand Tetons! The way it's been climbin' steady-like reminds me of a good pack mule - reliable, strong, and gets ya where ya need to go. This one's got legs, partner!",
    sentiment: "bullish",
    confidence: 92,
    timestamp: new Date(Date.now() - 900000),
    marketContext: "AVAX showing consistent upward momentum",
  },
]

export function EnhancedBillTradingAdvisor() {
  const [currentAdvice, setCurrentAdvice] = useState<TradingAdvice>(billsAdvice[0])
  const [isListening, setIsListening] = useState(false)
  const { playWaxSeal, playCoinDrop } = useSoundEffects()

  useEffect(() => {
    const interval = setInterval(() => {
      const randomAdvice = billsAdvice[Math.floor(Math.random() * billsAdvice.length)]
      setCurrentAdvice(randomAdvice)
      if (isListening) {
        playCoinDrop()
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [isListening, playCoinDrop])

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "bearish":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <Lightbulb className="h-4 w-4 text-blue-600" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return "bg-green-100 text-green-800 border-green-300"
      case "bearish":
        return "bg-red-100 text-red-800 border-red-300"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-blue-100 text-blue-800 border-blue-300"
    }
  }

  const handleListenToggle = () => {
    setIsListening(!isListening)
    playWaxSeal()
  }

  return (
    <Card className="bills-trading-wisdom border-4 border-black">
      <CardHeader className="border-b-2 border-black bg-amber-50">
        <CardTitle className="font-serif text-center flex items-center justify-center gap-2">
          🤠 BILL'S FRONTIER TRADING WISDOM 🤠
          <Button
            size="sm"
            variant={isListening ? "default" : "outline"}
            onClick={handleListenToggle}
            className="ml-4 font-serif"
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            {isListening ? "Listening..." : "Get Advice"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="text-6xl animate-bounce">🤠</div>
          <div className="flex-1">
            <div className="border-2 border-black p-4 bg-white speech-bubble-tail mb-4">
              <div className="flex items-center gap-2 mb-2">
                {getSentimentIcon(currentAdvice.sentiment)}
                <Badge className={`${getSentimentColor(currentAdvice.sentiment)} font-serif`}>
                  {currentAdvice.confidence}% Confidence
                </Badge>
                <span className="text-xs font-serif text-gray-500">{currentAdvice.timestamp.toLocaleTimeString()}</span>
              </div>

              <p className="font-serif italic text-lg mb-3 leading-relaxed">"{currentAdvice.message}"</p>

              <div className="border-t border-gray-200 pt-2">
                <p className="font-serif text-sm text-gray-600">
                  <strong>Market Context:</strong> {currentAdvice.marketContext}
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex gap-2 flex-wrap">
              <Button size="sm" className="frontier-buy-button font-serif" onClick={() => playCoinDrop()}>
                Follow Bill's Lead
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="font-serif border-2 border-amber-600 text-amber-800"
                onClick={() => setCurrentAdvice(billsAdvice[Math.floor(Math.random() * billsAdvice.length)])}
              >
                More Wisdom
              </Button>
              <Button size="sm" variant="outline" className="font-serif border-2 border-black">
                Ask Bill a Question
              </Button>
            </div>
          </div>
        </div>

        {/* Bill's Trading Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center p-3 border-2 border-black bg-green-50">
            <div className="text-2xl font-serif font-bold text-green-600">87.3%</div>
            <div className="text-xs font-serif text-gray-600">Bill's Win Rate</div>
          </div>
          <div className="text-center p-3 border-2 border-black bg-blue-50">
            <div className="text-2xl font-serif font-bold text-blue-600">$12,847</div>
            <div className="text-xs font-serif text-gray-600">Profits This Month</div>
          </div>
          <div className="text-center p-3 border-2 border-black bg-purple-50">
            <div className="text-2xl font-serif font-bold text-purple-600">23 Years</div>
            <div className="text-xs font-serif text-gray-600">Trading Experience</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
