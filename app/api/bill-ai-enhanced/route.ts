import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

// Bill's enhanced AI personality system
interface BillState {
  mood: "cheerful" | "concerned" | "excited" | "wise" | "welcoming"
  energy: number // 0-100
  wisdom_points: number
  last_drink_served?: string
  market_awareness: boolean
}

interface MarketData {
  symbol: string
  price: number
  change_24h: number
  volume: number
}

class EnhancedBillAI {
  private state: BillState
  private personality_traits = {
    speech_patterns: [
      "Well partner,",
      "I reckon",
      "Much obliged",
      "By thunder!",
      "Well I'll be jiggered!",
      "That's mighty fine",
      "Howdy there",
    ],
    drink_recommendations: {
      market_up: "How 'bout we celebrate with some Buffalo Bourbon?",
      market_down: "Looks like you could use some Wyoverse Whiskey to steady them nerves.",
      new_player: "Welcome! Try our famous Snipers Sarsaparilla - it's got quite the kick!",
      default: "What'll it be today, friend?",
    },
    wisdom_quotes: [
      "The market's like a wild bronco - sometimes you ride it, sometimes it throws ya.",
      "In my years tendin' bar, I've learned that patience pays better than panic.",
      "Every trader needs a good drink and better friends.",
      "The frontier teaches ya that what goes down usually comes back up, given time.",
    ],
  }

  constructor() {
    this.state = {
      mood: "cheerful",
      energy: 75,
      wisdom_points: 0,
      market_awareness: true,
    }
  }

  async getMarketData(): Promise<MarketData | null> {
    try {
      // In production, this would call real market APIs
      // For demo, return simulated data
      const mockData: MarketData = {
        symbol: "AVAX",
        price: 42.5 + (Math.random() - 0.5) * 10,
        change_24h: (Math.random() - 0.5) * 20,
        volume: Math.floor(Math.random() * 2000000) + 500000,
      }
      return mockData
    } catch (error) {
      console.error("Market data fetch failed:", error)
      return null
    }
  }

  updateMoodFromMarket(marketData: MarketData | null) {
    if (!marketData) return

    if (Math.abs(marketData.change_24h) > 10) {
      this.state.mood = marketData.change_24h > 0 ? "excited" : "concerned"
      this.state.energy =
        marketData.change_24h > 0 ? Math.min(100, this.state.energy + 15) : Math.max(20, this.state.energy - 10)
    } else if (marketData.volume > 1000000) {
      this.state.mood = "excited"
      this.state.energy = Math.min(100, this.state.energy + 10)
    }
  }

  generateResponse(userMessage: string, marketData: MarketData | null): string {
    // Update mood based on market conditions
    this.updateMoodFromMarket(marketData)

    const message = userMessage.toLowerCase()
    let response = ""

    // Greeting detection
    if (message.includes("hello") || message.includes("hi") || message.includes("howdy")) {
      const greeting = this.personality_traits.speech_patterns[Math.floor(Math.random() * 3)]
      response = `${greeting} Welcome to my saloon! `

      if (marketData) {
        if (marketData.change_24h > 5) {
          response +=
            "Markets are lookin' mighty fine today! " + this.personality_traits.drink_recommendations.market_up
        } else if (marketData.change_24h < -5) {
          response +=
            "Markets are rougher than a bronco today. " + this.personality_traits.drink_recommendations.market_down
        } else {
          response += this.personality_traits.drink_recommendations.default
        }
      } else {
        response += this.personality_traits.drink_recommendations.default
      }
    }

    // Drink orders
    else if (
      message.includes("drink") ||
      message.includes("order") ||
      message.includes("sarsaparilla") ||
      message.includes("whiskey") ||
      message.includes("bourbon") ||
      message.includes("beer") ||
      message.includes("milk")
    ) {
      let drink = "Snipers Sarsaparilla"
      if (message.includes("whiskey")) drink = "Wyoverse Whiskey"
      else if (message.includes("bourbon")) drink = "Buffalo Bourbon"
      else if (message.includes("beer") || message.includes("pilsner")) drink = "Prairie Pilsner"
      else if (message.includes("milk")) drink = "Fresh Frontier Milk"

      this.state.last_drink_served = drink
      this.state.energy = Math.max(10, this.state.energy - 5) // Serving drinks takes energy

      const speech =
        this.personality_traits.speech_patterns[
          Math.floor(Math.random() * this.personality_traits.speech_patterns.length)
        ]
      response = `${speech} One ${drink} comin' right up! *slides glass across the bar* `

      // Add drink-specific commentary
      switch (drink) {
        case "Wyoverse Whiskey":
          response += "That's our finest digital-aged whiskey. Smooth as silk and twice as strong!"
          break
        case "Buffalo Bourbon":
          response += "Now that's a drink with some backbone! Made from the finest prairie grains."
          break
        case "Snipers Sarsaparilla":
          response += "Sharp as a tack and twice as refreshing! Perfect for keepin' your wits about ya."
          break
        case "Fresh Frontier Milk":
          response += "Good choice, partner! Nothin' beats fresh milk from our frontier cows."
          break
        default:
          response += "Enjoy that fine beverage!"
      }
    }

    // Market discussion
    else if (
      message.includes("market") ||
      message.includes("trading") ||
      message.includes("price") ||
      message.includes("crypto") ||
      message.includes("avax")
    ) {
      this.state.wisdom_points += 2
      const wisdom =
        this.personality_traits.wisdom_quotes[Math.floor(Math.random() * this.personality_traits.wisdom_quotes.length)]

      if (marketData) {
        response = `Well partner, I've been watchin' the markets, and ${marketData.symbol} is sittin' at $${marketData.price.toFixed(2)}, `

        if (marketData.change_24h > 0) {
          response += `up ${marketData.change_24h.toFixed(1)}% today. ${wisdom} How 'bout a celebratory drink?`
        } else {
          response += `down ${Math.abs(marketData.change_24h).toFixed(1)}% today. ${wisdom} Maybe some whiskey to steady the nerves?`
        }
      } else {
        response = `${wisdom} I always keep an ear to the ground about market happenings. What's on your mind about trading?`
      }
    }

    // General conversation
    else {
      const speech =
        this.personality_traits.speech_patterns[
          Math.floor(Math.random() * this.personality_traits.speech_patterns.length)
        ]

      if (this.state.mood === "excited") {
        response = `${speech} I'm feelin' mighty energetic today! The saloon's buzzin' with activity. What brings you by?`
      } else if (this.state.mood === "concerned") {
        response = `${speech} Times have been a bit rough lately, but that's what friends and good conversation are for. What's troublin' ya, partner?`
      } else {
        response = `${speech} Always happy to chat with a fellow frontier dweller. What can old Bill do for ya today?`
      }
    }

    // Add mood indicators
    const moodEmoji = {
      cheerful: "😊",
      concerned: "😟",
      excited: "🤠",
      wise: "🧠",
      welcoming: "👋",
    }

    return `${moodEmoji[this.state.mood]} ${response}`
  }

  getState(): BillState {
    return { ...this.state }
  }
}

// Initialize Bill AI instance
const billAI = new EnhancedBillAI()

export async function POST(request: NextRequest) {
  try {
    const { message, playerId } = await request.json()

    if (!message || !playerId) {
      return NextResponse.json({ error: "Message and playerId are required" }, { status: 400 })
    }

    // Get current market data
    const marketData = await billAI.getMarketData()

    // Generate Bill's response
    const response = billAI.generateResponse(message, marketData)
    const currentState = billAI.getState()

    // Save conversation to Supabase
    const { error: dbError } = await supabase.from("bill_conversations").insert([
      {
        player_id: playerId,
        message_role: "user",
        content: message,
        bill_mood: currentState.mood,
        energy_level: currentState.energy,
        wisdom_points: currentState.wisdom_points,
      },
      {
        player_id: playerId,
        message_role: "assistant",
        content: response,
        bill_mood: currentState.mood,
        energy_level: currentState.energy,
        wisdom_points: currentState.wisdom_points,
      },
    ])

    if (dbError) {
      console.error("Database error:", dbError)
    }

    // Return enhanced response
    return NextResponse.json({
      response,
      billState: {
        mood: currentState.mood,
        energy: currentState.energy,
        wisdom_points: currentState.wisdom_points,
        last_drink: currentState.last_drink_served,
      },
      marketData: marketData
        ? {
            symbol: marketData.symbol,
            price: marketData.price,
            change_24h: marketData.change_24h,
          }
        : null,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Bill AI API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        response: "Well partner, seems my brain's a bit foggy right now. How 'bout we try that again?",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const playerId = searchParams.get("playerId")

    if (!playerId) {
      return NextResponse.json({ error: "PlayerId is required" }, { status: 400 })
    }

    // Get conversation history from Supabase
    const { data: conversations, error } = await supabase
      .from("bill_conversations")
      .select("*")
      .eq("player_id", playerId)
      .order("created_at", { ascending: true })
      .limit(20)

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch conversation history" }, { status: 500 })
    }

    // Get current Bill state
    const currentState = billAI.getState()
    const marketData = await billAI.getMarketData()

    return NextResponse.json({
      conversations: conversations || [],
      billState: currentState,
      marketData,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Bill AI GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
