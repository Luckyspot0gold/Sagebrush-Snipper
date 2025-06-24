"use client"

import { useState, useEffect } from "react"
import { useSpring, animated } from "@react-spring/web"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useMarketStore } from "@/lib/stores/market-store"
import { Volume2, VolumeX, Coffee, Star } from "lucide-react"

interface BillDialogue {
  greeting: string
  advice: string[]
  mood: "cheerful" | "concerned" | "excited" | "wise"
  action?: {
    text: string
    reward: string
  }
}

const FRONTIER_GREETINGS = [
  "Howdy there, partner!",
  "Well I'll be hornswoggled!",
  "Mighty fine day for tradin'!",
  "Pull up a chair, friend!",
  "What brings ya to my establishment?",
]

const FRONTIER_SLANG = {
  positive: ["Well butter my biscuits!", "Sweeter than Georgia peach pie!", "Finer than frog's hair!"],
  negative: ["Dagnabbit!", "Thunderation!", "Well, I'll be jiggered!"],
  neutral: ["Reckon so...", "That's the way the cookie crumbles", "Ain't that somethin'"],
}

export function BarKeepBillAvatar() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentDialogue, setCurrentDialogue] = useState<BillDialogue | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [hasOfferedDrink, setHasOfferedDrink] = useState(false)
  const [userBonus, setUserBonus] = useState(0)

  const { marketMood, marketSentiment, assets } = useMarketStore()

  // Animated entrance
  const springProps = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0px)" : "translateX(50px)",
    config: { tension: 120, friction: 14 },
  })

  // Speech bubble animation
  const bubbleProps = useSpring({
    opacity: currentDialogue ? 1 : 0,
    transform: currentDialogue ? "scale(1)" : "scale(0.8)",
    config: { tension: 200, friction: 20 },
  })

  // Generate context-aware dialogue
  const generateDialogue = (): BillDialogue => {
    const greeting = FRONTIER_GREETINGS[Math.floor(Math.random() * FRONTIER_GREETINGS.length)]
    let mood: BillDialogue["mood"] = "wise"
    let advice: string[] = []
    let action: BillDialogue["action"] | undefined

    // Market-based responses
    if (marketSentiment > 0.5) {
      mood = "excited"
      advice = [
        `${FRONTIER_SLANG.positive[0]} This market's hotter than a pistol!`,
        "Prices are climbin' faster than a cat up a tree!",
        "Might be time to cash in some of them chips, partner.",
      ]
      if (!hasOfferedDrink) {
        action = {
          text: "Buy ya a celebratory sarsaparilla?",
          reward: "10% market insight boost for 5 minutes!",
        }
      }
    } else if (marketSentiment < -0.3) {
      mood = "concerned"
      advice = [
        `${FRONTIER_SLANG.negative[0]} Prices are droppin' faster than a coyote down a mineshaft!`,
        "Market's colder than a Wyoming winter, I tell ya.",
        "Might be a good time to buy low, if you got the grit.",
      ]
    } else if (marketMood === "Volatile") {
      mood = "concerned"
      advice = [
        `${FRONTIER_SLANG.negative[1]} This market's wilder than a mustang stampede!`,
        "Volatility's higher than a Georgia pine!",
        "Best to keep yer powder dry and watch fer patterns.",
      ]
    } else {
      mood = "cheerful"
      advice = [
        `${FRONTIER_SLANG.neutral[0]} Market's steady as she goes.`,
        "Good time to plan yer next move, partner.",
        "Remember, fortune favors the prepared mind.",
      ]
    }

    // Add asset-specific advice
    const topAsset = assets.reduce((prev, current) => (prev.priceChange > current.priceChange ? prev : current))
    if (topAsset.priceChange > 5) {
      advice.push(`That ${topAsset.name} is risin' like smoke from a campfire!`)
    }

    return { greeting, advice, mood, action }
  }

  // Initialize Bill
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      setCurrentDialogue(generateDialogue())
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Update dialogue based on market changes
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentDialogue(generateDialogue())
      }, 30000) // Update every 30 seconds

      return () => clearInterval(interval)
    }
  }, [isVisible, marketSentiment, marketMood])

  // Handle sarsaparilla offer
  const handleDrinkOffer = () => {
    setHasOfferedDrink(true)
    setUserBonus(1.1) // 10% bonus
    playSound("whiskey-pour")

    // Remove bonus after 5 minutes
    setTimeout(() => {
      setUserBonus(0)
    }, 300000)

    setCurrentDialogue({
      greeting: "Much obliged, partner!",
      advice: [
        "That sarsaparilla's got some special ingredients...",
        "Yer market instincts should be sharper now!",
        "Use this wisdom well, and may fortune smile upon ya!",
      ],
      mood: "cheerful",
    })
  }

  // Sound effects
  const playSound = (soundType: string) => {
    if (!soundEnabled) return

    const sounds = {
      "whiskey-pour": "/sounds/whiskey-pour.mp3",
      "wooden-thunk": "/sounds/wooden-thunk.mp3",
      "saloon-piano": "/sounds/saloon-piano.mp3",
    }

    // In a real app, you'd play the actual sound file
    console.log(`Playing sound: ${soundType}`)
  }

  const getMoodEmoji = (mood: BillDialogue["mood"]) => {
    switch (mood) {
      case "excited":
        return "🤠"
      case "concerned":
        return "😟"
      case "cheerful":
        return "😊"
      default:
        return "🧔"
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <animated.div style={springProps}>
        <Card className="border-4 border-amber-800 bg-amber-50 shadow-2xl max-w-sm">
          <div className="p-4">
            {/* Bill's Avatar */}
            <div className="flex items-start gap-3 mb-3">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-amber-200 border-2 border-amber-800 flex items-center justify-center text-2xl">
                  🤠
                </div>
                {userBonus > 0 && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-yellow-500 text-black text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      BONUS
                    </Badge>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-amber-900 font-serif">Bar Keep Bill</h3>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className="h-6 w-6 p-0"
                    >
                      {soundEnabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setIsVisible(false)} className="h-6 w-6 p-0">
                      ×
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-amber-700 font-serif">Est. 1852 • Frontier Wisdom</p>
              </div>
            </div>

            {/* Speech Bubble */}
            {currentDialogue && (
              <animated.div style={bubbleProps}>
                <div className="bg-white border-2 border-amber-800 rounded-lg p-3 relative">
                  {/* Speech bubble arrow */}
                  <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white"></div>
                  <div className="absolute -left-3 top-4 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-amber-800"></div>

                  <div className="space-y-2">
                    <p className="font-serif text-sm font-bold text-amber-900 flex items-center gap-2">
                      {getMoodEmoji(currentDialogue.mood)} {currentDialogue.greeting}
                    </p>

                    {currentDialogue.advice.map((line, index) => (
                      <p key={index} className="font-serif text-xs text-gray-700 leading-relaxed">
                        {line}
                      </p>
                    ))}

                    {currentDialogue.action && !hasOfferedDrink && (
                      <div className="mt-3 p-2 bg-amber-100 rounded border border-amber-300">
                        <p className="font-serif text-xs text-amber-800 mb-2">{currentDialogue.action.text}</p>
                        <div className="flex items-center justify-between">
                          <Button
                            size="sm"
                            onClick={handleDrinkOffer}
                            className="bg-amber-700 hover:bg-amber-800 text-white font-serif text-xs"
                          >
                            <Coffee className="w-3 h-3 mr-1" />
                            Sure thing!
                          </Button>
                          <span className="text-xs text-amber-600 font-serif">{currentDialogue.action.reward}</span>
                        </div>
                      </div>
                    )}

                    {userBonus > 0 && (
                      <div className="mt-2 p-2 bg-yellow-100 rounded border border-yellow-300">
                        <p className="font-serif text-xs text-yellow-800 flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Market insight boost active! ({Math.round((userBonus - 1) * 100)}%)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </animated.div>
            )}

            {/* Bill's Journal Entry */}
            <div className="mt-3 text-center">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentDialogue(generateDialogue())}
                className="font-serif text-xs border-amber-800 text-amber-800 hover:bg-amber-100"
              >
                Ask Bill for Wisdom
              </Button>
            </div>
          </div>
        </Card>
      </animated.div>
    </div>
  )
}
