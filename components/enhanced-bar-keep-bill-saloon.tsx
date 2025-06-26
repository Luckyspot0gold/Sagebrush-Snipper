"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { useMarketStore } from "@/lib/stores/market-store"
import { Volume2, VolumeX } from "lucide-react"

interface Bottle {
  id: string
  name: string
  type: "whiskey" | "beer" | "sarsaparilla" | "coffee" | "milk"
  price: number
  effect: string
  image: string
  alcoholContent: number
}

interface BillMood {
  current: "cheerful" | "wise" | "concerned" | "excited" | "tipsy"
  energy: number
  wisdom: number
  tips_given: number
}

const SALOON_BOTTLES: Bottle[] = [
  {
    id: "wyoverse-whiskey",
    name: "Wyoverse Whiskey",
    type: "whiskey",
    price: 25,
    effect: "+20 Wisdom, Market insights boost",
    image: "🥃",
    alcoholContent: 40,
  },
  {
    id: "buffalo-bourbon",
    name: "Buffalo Bourbon",
    type: "whiskey",
    price: 35,
    effect: "+30 Wisdom, Trading confidence boost",
    image: "🥃",
    alcoholContent: 45,
  },
  {
    id: "prairie-pilsner",
    name: "Prairie Pilsner",
    type: "beer",
    price: 15,
    effect: "+10 Energy, Social boost",
    image: "🍺",
    alcoholContent: 5,
  },
  {
    id: "snipers-sarsaparilla",
    name: "Snipers Sarsaparilla",
    type: "sarsaparilla",
    price: 10,
    effect: "+15 Energy, Clear thinking",
    image: "🥤",
    alcoholContent: 0,
  },
  {
    id: "cowboy-coffee",
    name: "Cowboy Coffee",
    type: "coffee",
    price: 8,
    effect: "+25 Energy, Alert mind",
    image: "☕",
    alcoholContent: 0,
  },
  {
    id: "frontier-milk",
    name: "Fresh Frontier Milk",
    type: "milk",
    price: 5,
    effect: "+10 Health, Growing strong",
    image: "🥛",
    alcoholContent: 0,
  },
]

export function EnhancedBarKeepBillSaloon() {
  const [query, setQuery] = useState("")
  const [conversation, setConversation] = useState<
    Array<{ sender: "user" | "bill"; message: string; timestamp: Date; mood?: string }>
  >([
    {
      sender: "bill",
      message:
        "Well howdy there, partner! *wipes down bar with a weathered rag* Welcome to the finest saloon in the digital frontier. What can old Bill pour for ya today?",
      timestamp: new Date(),
      mood: "cheerful",
    },
  ])

  const [billMood, setBillMood] = useState<BillMood>({
    current: "cheerful",
    energy: 85,
    wisdom: 90,
    tips_given: 0,
  })

  const [soundEnabled, setSoundEnabled] = useState(true)
  const [volume, setVolume] = useState(0.7)
  const [isTyping, setIsTyping] = useState(false)
  const [selectedBottle, setSelectedBottle] = useState<Bottle | null>(null)
  const [barAtmosphere, setBarAtmosphere] = useState("busy")
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)

  const { assets, marketMood, marketSentiment } = useMarketStore()

  // Initialize Web Audio API
  useEffect(() => {
    if (typeof window !== "undefined" && !audioContext) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      setAudioContext(ctx)
    }
  }, [audioContext])

  // Enhanced sound system with actual audio generation
  const playSound = (frequency: number, duration: number, type: "sine" | "square" | "sawtooth" = "sine") => {
    if (!soundEnabled || !audioContext) return

    try {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
      oscillator.type = type

      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(volume * 0.3, audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration)
    } catch (error) {
      console.warn("Audio playback failed:", error)
    }
  }

  const playBottleClink = () => {
    playSound(800, 0.1, "sine")
    setTimeout(() => playSound(600, 0.1, "sine"), 100)
  }

  const playPourDrink = () => {
    // Simulate pouring sound with multiple frequencies
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        playSound(200 + Math.random() * 100, 0.1, "sawtooth")
      }, i * 50)
    }
  }

  const playPianoMusic = () => {
    // Simple piano melody
    const notes = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88] // C major scale
    notes.forEach((note, index) => {
      setTimeout(() => {
        playSound(note, 0.5, "sine")
      }, index * 200)
    })
  }

  const playWelcomeSound = () => {
    playSound(440, 0.2, "sine")
    setTimeout(() => playSound(554.37, 0.2, "sine"), 200)
    setTimeout(() => playSound(659.25, 0.3, "sine"), 400)
  }

  // Bill's enhanced dialogue system
  const generateBillResponse = (userQuery: string): string => {
    const lowerQuery = userQuery.toLowerCase()

    // Market-based responses
    if (marketSentiment > 0.5) {
      return `*polishes glass with a grin* Well I'll be! Markets are hotter than a branding iron today! ${getMarketAdvice("bullish")} *slides a celebratory drink across the bar*`
    } else if (marketSentiment < -0.3) {
      return `*furrows brow while cleaning shot glass* Thunderation! Markets are colder than a Wyoming winter. ${getMarketAdvice("bearish")} *pours a stiff drink* This'll help ya think clearer, partner.`
    }

    // Drink-related responses
    if (lowerQuery.includes("drink") || lowerQuery.includes("whiskey") || lowerQuery.includes("beer")) {
      return `*gestures to the impressive bottle collection behind the bar* Take yer pick, partner! Got everything from smooth Buffalo Bourbon to refreshing Snipers Sarsaparilla. Even got fresh milk for the young'uns!`
    }

    // General wisdom
    const wisdomResponses = [
      "*leans on bar* In my 40 years tendin' this establishment, I've learned that patience and good whiskey solve most problems.",
      "*adjusts suspenders* The frontier teaches ya that fortune favors the prepared mind and the steady hand.",
      "*wipes down another glass* Been through more market booms and busts than a Missouri riverboat gambler. Key is knowin' when to hold and when to fold.",
    ]

    return wisdomResponses[Math.floor(Math.random() * wisdomResponses.length)]
  }

  const getMarketAdvice = (trend: "bullish" | "bearish"): string => {
    if (trend === "bullish") {
      return "Might be time to take some profits off the table, but don't get too greedy now."
    } else {
      return "Good time to look for bargains, but keep yer powder dry for the real opportunities."
    }
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

    // Play message sound
    playSound(300, 0.1, "sine")

    // Simulate Bill thinking and responding
    setTimeout(
      () => {
        const billResponse = generateBillResponse(query)
        const billMessage = {
          sender: "bill" as const,
          message: billResponse,
          timestamp: new Date(),
          mood: billMood.current,
        }

        setConversation((prev) => [...prev, billMessage])
        setIsTyping(false)
        playWelcomeSound()

        // Update Bill's stats
        setBillMood((prev) => ({
          ...prev,
          tips_given: prev.tips_given + 1,
          wisdom: Math.min(100, prev.wisdom + 2),
        }))
      },
      1500 + Math.random() * 1000,
    )
  }

  const orderDrink = (bottle: Bottle) => {
    playPourDrink()
    setTimeout(() => playBottleClink(), 500)

    setSelectedBottle(bottle)

    // Apply drink effects to Bill
    setBillMood((prev) => {
      let newMood = prev.current
      let energyChange = 0
      let wisdomChange = 0

      switch (bottle.type) {
        case "whiskey":
          newMood = "wise"
          wisdomChange = bottle.alcoholContent
          energyChange = -5
          break
        case "beer":
          newMood = "cheerful"
          energyChange = 10
          break
        case "coffee":
          newMood = "excited"
          energyChange = 25
          break
        case "sarsaparilla":
          newMood = "cheerful"
          energyChange = 15
          wisdomChange = 5
          break
        case "milk":
          newMood = "cheerful"
          energyChange = 10
          wisdomChange = 5
          break
      }

      return {
        ...prev,
        current: newMood,
        energy: Math.min(100, Math.max(0, prev.energy + energyChange)),
        wisdom: Math.min(100, Math.max(0, prev.wisdom + wisdomChange)),
      }
    })

    // Bill's response to the drink order
    const drinkResponses = {
      whiskey:
        "*pours a generous shot* Now that's the good stuff! This here whiskey's aged longer than some of the claims in these parts.",
      beer: "*draws a frothy mug* Fresh from the brewery! Nothing beats a cold one after a hard day's trading.",
      coffee:
        "*pours steaming black coffee* Strong enough to wake the dead! This'll keep ya sharp for them market moves.",
      sarsaparilla:
        "*slides the fizzy drink across* The sharpshooter's choice! Clear head, clear profits, I always say.",
      milk: "*pours fresh milk* Perfect for the young pioneers! Gotta grow up strong in this frontier.",
    }

    const responseMessage = {
      sender: "bill" as const,
      message: drinkResponses[bottle.type],
      timestamp: new Date(),
      mood: billMood.current,
    }

    setConversation((prev) => [...prev, responseMessage])
  }

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
    if (!soundEnabled) {
      playWelcomeSound()
    }
  }

  const getMoodEmoji = () => {
    switch (billMood.current) {
      case "cheerful":
        return "😊"
      case "wise":
        return "🤔"
      case "concerned":
        return "😟"
      case "excited":
        return "😃"
      case "tipsy":
        return "😵"
      default:
        return "🤠"
    }
  }

  useEffect(() => {
    // Start ambient saloon sounds
    if (soundEnabled && audioContext) {
      playPianoMusic()
    }

    // Simulate saloon atmosphere changes
    const atmosphereInterval = setInterval(() => {
      const atmospheres = ["busy", "quiet", "rowdy"]
      setBarAtmosphere(atmospheres[Math.floor(Math.random() * atmospheres.length)])
    }, 30000)

    return () => {
      clearInterval(atmosphereInterval)
    }
  }, [soundEnabled, audioContext])

  return (
    <div className="newspaper-bg min-h-screen p-6">
      <Card className="border-4 border-black shadow-lg max-w-6xl mx-auto newspaper-article">
        <CardHeader className="border-b-2 border-black bg-amber-900 text-white newspaper-article-inner">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20 border-4 border-yellow-400">
                <AvatarImage src="/placeholder.svg?height=80&width=80&text=🤠" alt="Bar Keep Bill" />
                <AvatarFallback className="text-3xl bg-amber-700">🤠</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl font-serif headline-primary text-white">
                  Bar Keep Bill's Frontier Saloon
                </CardTitle>
                <CardDescription className="text-lg font-serif text-amber-200">
                  Est. 1852 • Finest Whiskey & Market Wisdom in the Territory
                </CardDescription>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="text-white border-white">
                    Mood: {getMoodEmoji()} {billMood.current}
                  </Badge>
                  <Badge variant="outline" className="text-white border-white">
                    Atmosphere: {barAtmosphere}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Button variant="ghost" size="sm" onClick={toggleSound} className="text-white hover:bg-white/20">
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <div className="flex flex-col items-center">
                <span className="text-xs text-white mb-1">Volume</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 newspaper-article-inner">
          <Tabs defaultValue="bar" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6 border-2 border-black">
              <TabsTrigger value="bar" className="font-serif">
                🍺 The Bar
              </TabsTrigger>
              <TabsTrigger value="chat" className="font-serif">
                💬 Chat with Bill
              </TabsTrigger>
              <TabsTrigger value="bottles" className="font-serif">
                🥃 Bottle Collection
              </TabsTrigger>
              <TabsTrigger value="atmosphere" className="font-serif">
                🎵 Saloon Atmosphere
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bar" className="space-y-6">
              {/* The Actual Bar */}
              <div className="border-4 border-black p-6 bg-gradient-to-b from-amber-100 to-amber-200">
                <h3 className="text-2xl font-serif headline-secondary mb-4 text-center">The Frontier Bar</h3>

                {/* Bar Counter */}
                <div className="relative bg-amber-800 h-32 rounded-lg mb-4 border-4 border-amber-900">
                  <div className="absolute inset-2 bg-amber-700 rounded"></div>
                  <div className="absolute top-2 left-4 right-4 h-2 bg-amber-600 rounded"></div>

                  {/* Bill behind the bar */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <div className="text-6xl animate-bounce">{getMoodEmoji()}</div>
                  </div>

                  {/* Bar stools */}
                  <div className="absolute -bottom-6 left-8 w-8 h-6 bg-amber-900 rounded-t-full"></div>
                  <div className="absolute -bottom-6 left-20 w-8 h-6 bg-amber-900 rounded-t-full"></div>
                  <div className="absolute -bottom-6 right-20 w-8 h-6 bg-amber-900 rounded-t-full"></div>
                  <div className="absolute -bottom-6 right-8 w-8 h-6 bg-amber-900 rounded-t-full"></div>
                </div>

                {/* Bottle Shelf */}
                <div className="bg-amber-900 p-4 rounded-lg border-2 border-black">
                  <h4 className="text-lg font-serif text-white mb-3 text-center">Bill's Premium Collection</h4>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4 justify-items-center">
                    {SALOON_BOTTLES.map((bottle) => (
                      <div
                        key={bottle.id}
                        className="text-center cursor-pointer hover:scale-110 transition-transform"
                        onClick={() => orderDrink(bottle)}
                      >
                        <div className="text-4xl mb-1">{bottle.image}</div>
                        <div className="text-xs text-white font-serif">{bottle.name}</div>
                        <div className="text-xs text-yellow-400">${bottle.price}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bill's Stats */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-sm font-serif mb-1">Energy</div>
                    <Progress value={billMood.energy} className="h-3 border border-black" />
                    <div className="text-xs">{billMood.energy}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-serif mb-1">Wisdom</div>
                    <Progress value={billMood.wisdom} className="h-3 border border-black" />
                    <div className="text-xs">{billMood.wisdom}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-serif mb-1">Tips Given</div>
                    <div className="text-2xl font-bold">{billMood.tips_given}</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="chat" className="space-y-4">
              <Card className="border-2 border-black">
                <CardHeader>
                  <CardTitle className="font-serif">Conversation with Bill</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96 w-full border-2 border-black rounded-lg p-4 mb-4 bg-amber-50">
                    <div className="space-y-4">
                      {conversation.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              msg.sender === "user"
                                ? "bg-blue-600 text-white"
                                : "bg-amber-200 border-2 border-amber-400"
                            }`}
                          >
                            <p className="font-serif">{msg.message}</p>
                            <p className="text-xs opacity-70 mt-1">{msg.timestamp.toLocaleTimeString()}</p>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-amber-200 border-2 border-amber-400 rounded-lg p-3">
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
                      placeholder="Ask Bill about markets, drinks, or frontier wisdom..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      className="font-serif border-2 border-black"
                    />
                    <Button onClick={handleSendMessage} disabled={isTyping} className="frontier-button font-serif">
                      Send
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bottles" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SALOON_BOTTLES.map((bottle) => (
                  <Card key={bottle.id} className="border-2 border-black hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 text-center">
                      <div className="text-6xl mb-3">{bottle.image}</div>
                      <h3 className="font-serif font-bold text-lg mb-2">{bottle.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{bottle.effect}</p>
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-green-600">${bottle.price}</span>
                        <span className="text-xs">
                          {bottle.alcoholContent > 0 ? `${bottle.alcoholContent}% ABV` : "Non-alcoholic"}
                        </span>
                      </div>
                      <Button onClick={() => orderDrink(bottle)} className="frontier-button w-full font-serif">
                        Order Drink
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="atmosphere" className="space-y-4">
              <div className="border-4 border-black p-6 bg-gradient-to-b from-amber-100 to-amber-200">
                <h3 className="text-2xl font-serif headline-secondary mb-4 text-center">Saloon Atmosphere</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <h4 className="font-serif font-bold mb-3">Current Mood: {barAtmosphere}</h4>
                    <div className="text-8xl mb-4">
                      {barAtmosphere === "busy" ? "🎵" : barAtmosphere === "quiet" ? "🤫" : "🎉"}
                    </div>
                    <p className="font-serif text-sm">
                      {barAtmosphere === "busy" && "The saloon is bustling with traders and prospectors"}
                      {barAtmosphere === "quiet" && "A peaceful evening with soft piano music"}
                      {barAtmosphere === "rowdy" && "Lively crowd celebrating successful trades"}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold mb-3">Sound Controls</h4>
                    <div className="space-y-3">
                      <Button onClick={() => playPianoMusic()} className="frontier-button w-full font-serif">
                        🎹 Play Piano Music
                      </Button>
                      <Button onClick={() => playBottleClink()} className="frontier-button w-full font-serif">
                        🥃 Bottle Clink
                      </Button>
                      <Button onClick={() => playPourDrink()} className="frontier-button w-full font-serif">
                        🍺 Pour Drink
                      </Button>
                      <Button onClick={() => playWelcomeSound()} className="frontier-button w-full font-serif">
                        🤠 Welcome Sound
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
