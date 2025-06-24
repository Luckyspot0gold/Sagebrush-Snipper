"use client"

import { useState, useCallback } from "react"

interface DialogueResponse {
  text: string
  mood: "friendly" | "gruff" | "excited" | "concerned"
  actions?: string[]
}

export function useVeniceAI() {
  const [dialogue, setDialogue] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateDialogue = useCallback(async (context: string, character = "trader"): Promise<DialogueResponse> => {
    setIsLoading(true)
    setError(null)

    try {
      // For demo purposes, use local generation
      // In production, replace with actual Venice AI API call
      const response = await generateLocalDialogue(context, character)

      setDialogue(response.text)
      return response
    } catch (err: any) {
      const fallbackResponse = getFallbackDialogue(character)
      setError(err.message)
      setDialogue(fallbackResponse.text)
      return fallbackResponse
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { dialogue, isLoading, error, generateDialogue }
}

async function generateLocalDialogue(context: string, character: string): Promise<DialogueResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const dialogueTemplates = {
    trader: {
      greeting: [
        "Well howdy there, partner! Got some fine goods fresh from the frontier.",
        "Welcome to my trading post! What brings you to these parts?",
        "Afternoon, friend! Looking to make some deals today?",
      ],
      market_up: [
        "Markets are hotter than a branding iron today! Perfect time to sell.",
        "Prices climbing faster than a mountain goat! You picked a good day.",
        "Bull market's got everyone excited - what you looking to trade?",
      ],
      market_down: [
        "Market's colder than a Wyoming winter, but that means bargains!",
        "Prices dropped like a stone, but smart traders buy the dip.",
        "Tough times make for tough traders - you got what it takes?",
      ],
      boxing: [
        "Heard you been throwing punches in the arena! Mighty impressive.",
        "Boxing's a fine sport - builds character and earns tokens!",
        "That was some fight! Here, let me offer you a special deal.",
      ],
    },
    bartender: {
      greeting: [
        "Pull up a stool, partner! What'll it be?",
        "Welcome to the finest saloon this side of the Rockies!",
        "Howdy! Whiskey's flowing and the stories are free.",
      ],
      celebration: [
        "Well butter my biscuit! That calls for a celebration drink!",
        "Success like that deserves the good stuff - on the house!",
        "Hot diggity! Let's toast to your good fortune!",
      ],
    },
  }

  const templates = dialogueTemplates[character as keyof typeof dialogueTemplates] || dialogueTemplates.trader
  const contextKey = getContextKey(context)
  const options = templates[contextKey as keyof typeof templates] || templates.greeting

  const selectedText = options[Math.floor(Math.random() * options.length)]

  return {
    text: selectedText,
    mood: getMoodFromContext(context),
    actions: getActionsFromContext(context),
  }
}

function getContextKey(context: string): string {
  const lowerContext = context.toLowerCase()

  if (lowerContext.includes("market") && lowerContext.includes("up")) return "market_up"
  if (lowerContext.includes("market") && lowerContext.includes("down")) return "market_down"
  if (lowerContext.includes("boxing") || lowerContext.includes("fight")) return "boxing"
  if (lowerContext.includes("celebrate") || lowerContext.includes("victory")) return "celebration"

  return "greeting"
}

function getMoodFromContext(context: string): "friendly" | "gruff" | "excited" | "concerned" {
  const lowerContext = context.toLowerCase()

  if (lowerContext.includes("victory") || lowerContext.includes("success")) return "excited"
  if (lowerContext.includes("problem") || lowerContext.includes("down")) return "concerned"
  if (lowerContext.includes("trade") || lowerContext.includes("deal")) return "friendly"

  return "friendly"
}

function getActionsFromContext(context: string): string[] {
  const lowerContext = context.toLowerCase()

  if (lowerContext.includes("trade")) {
    return ["View Inventory", "Check Prices", "Make Offer"]
  }

  if (lowerContext.includes("boxing")) {
    return ["Enter Arena", "View Stats", "Claim Rewards"]
  }

  return ["Continue", "Ask Question", "Leave"]
}

function getFallbackDialogue(character: string): DialogueResponse {
  const fallbacks = {
    trader: "Howdy partner! My tongue's a bit tied today, but I got goods to trade!",
    bartender: "Well howdy there! Whiskey's flowing even if my words ain't!",
    default: "Howdy! Good to see ya, even if I'm at a loss for words!",
  }

  return {
    text: fallbacks[character as keyof typeof fallbacks] || fallbacks.default,
    mood: "friendly",
    actions: ["Continue"],
  }
}
