"use client"

import { useState, useCallback } from "react"

interface DialogueResponse {
  text: string
  mood: "friendly" | "gruff" | "excited" | "concerned" | "mysterious"
  actions?: string[]
  context?: string
}

interface VeniceAIConfig {
  character: "trader" | "bartender" | "sheriff" | "prospector"
  personality: "western" | "modern" | "hybrid"
  responseLength: "short" | "medium" | "long"
}

export function useVeniceAIEnhanced(
  config: VeniceAIConfig = {
    character: "trader",
    personality: "western",
    responseLength: "medium",
  },
) {
  const [dialogue, setDialogue] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [conversationHistory, setConversationHistory] = useState<string[]>([])

  const generateDialogue = useCallback(
    async (context: string, userInput?: string): Promise<DialogueResponse> => {
      setIsLoading(true)
      setError(null)

      try {
        // In production, this would call Venice AI API
        const response = await generateVeniceDialogue(context, config, conversationHistory, userInput)

        setDialogue(response.text)
        setConversationHistory((prev) => [...prev, context, response.text])

        return response
      } catch (err: any) {
        const fallbackResponse = getFallbackDialogue(config.character, context)
        setError(err.message)
        setDialogue(fallbackResponse.text)
        return fallbackResponse
      } finally {
        setIsLoading(false)
      }
    },
    [config, conversationHistory],
  )

  const clearHistory = () => {
    setConversationHistory([])
    setDialogue("")
    setError(null)
  }

  return {
    dialogue,
    isLoading,
    error,
    conversationHistory,
    generateDialogue,
    clearHistory,
  }
}

async function generateVeniceDialogue(
  context: string,
  config: VeniceAIConfig,
  history: string[],
  userInput?: string,
): Promise<DialogueResponse> {
  // Simulate Venice AI API call
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const prompt = buildPrompt(context, config, history, userInput)
  const response = await simulateVeniceResponse(prompt, config)

  return response
}

function buildPrompt(context: string, config: VeniceAIConfig, history: string[], userInput?: string): string {
  const characterPrompts = {
    trader:
      "You are a savvy frontier trader in the WyoVerse, always looking for profitable deals and market opportunities.",
    bartender:
      "You are Bill, the wise bartender of the WyoVerse saloon, dispensing drinks and wisdom in equal measure.",
    sheriff: "You are the sheriff of WyoVerse, maintaining law and order in the digital frontier.",
    prospector: "You are an old prospector who's struck it rich in crypto mining, full of stories and advice.",
  }

  const personalityModifiers = {
    western: "Speak with authentic Old West dialect and mannerisms.",
    modern: "Use contemporary language while maintaining the frontier theme.",
    hybrid: "Blend Old West charm with modern crypto and gaming terminology.",
  }

  let prompt = `${characterPrompts[config.character]} ${personalityModifiers[config.personality]}\n\n`

  if (history.length > 0) {
    prompt += `Previous conversation:\n${history.slice(-4).join("\n")}\n\n`
  }

  prompt += `Current situation: ${context}\n`

  if (userInput) {
    prompt += `User says: "${userInput}"\n`
  }

  prompt += `Respond appropriately as this character:`

  return prompt
}

async function simulateVeniceResponse(prompt: string, config: VeniceAIConfig): Promise<DialogueResponse> {
  // Advanced dialogue templates based on context analysis
  const contextKeywords = prompt.toLowerCase()

  const dialogueDatabase = {
    trader: {
      market_bullish: [
        "Well I'll be hornswoggled! These markets are hotter than a brandin' iron in July! Perfect time to cash in them chips, partner.",
        "Market's climbin' faster than a cat up a tree! You picked a mighty fine time to come trading.",
        "Bulls are runnin' wild today! Got some premium assets that'll make your wallet fatter than a prize hog.",
      ],
      market_bearish: [
        "Markets colder than a Wyoming winter, but that's when smart traders make their move. Buy low, sell high - oldest rule in the book.",
        "Bear's got everyone spooked, but I see opportunity where others see trouble. What you lookin' to pick up cheap?",
        "Tough times separate the wheat from the chaff. You got the grit to trade in a bear market, partner?",
      ],
      boxing_victory: [
        "Heard you laid out that varmint in the boxing ring! That kind of grit deserves a special deal.",
        "Word travels fast 'round these parts - you're quite the fighter! Let me offer you something worthy of a champion.",
        "That was some fine pugilism! A warrior like you deserves warrior-grade equipment.",
      ],
      general: [
        "Welcome to my trading post, partner! Got goods from all corners of the WyoVerse.",
        "Step right up! Fresh inventory just came in from the digital frontier.",
        "What brings you to my establishment today? Looking to buy, sell, or just chew the fat?",
      ],
    },
    bartender: {
      celebration: [
        "Well butter my biscuit! That calls for the good stuff - this round's on the house!",
        "Success like that deserves a proper toast! *slides over a whiskey* Here's to your good fortune!",
        "Hot diggity dog! Let's celebrate proper-like. What'll you have, champion?",
      ],
      consolation: [
        "Don't let it get you down, partner. Every cowpoke takes a tumble now and then. Whiskey helps ease the sting.",
        "Tough break, friend. But I've seen plenty of folks bounce back stronger. Care for something to lift your spirits?",
        "Life's got a way of knockin' us down, but it's how we get back up that counts. Let me pour you something special.",
      ],
      general: [
        "Welcome to the finest saloon this side of the digital divide! What's your poison?",
        "Pull up a stool and stay a while. Got stories, drinks, and wisdom - all flowing freely.",
        "Howdy there! The whiskey's aged, the company's good, and the advice is free.",
      ],
    },
  }

  // Determine context and select appropriate response
  let selectedResponses = dialogueDatabase[config.character]?.general || []

  if (contextKeywords.includes("market") && contextKeywords.includes("up")) {
    selectedResponses = dialogueDatabase[config.character]?.market_bullish || selectedResponses
  } else if (contextKeywords.includes("market") && contextKeywords.includes("down")) {
    selectedResponses = dialogueDatabase[config.character]?.market_bearish || selectedResponses
  } else if (contextKeywords.includes("boxing") || contextKeywords.includes("victory")) {
    selectedResponses = dialogueDatabase[config.character]?.boxing_victory || selectedResponses
  } else if (contextKeywords.includes("celebrate") || contextKeywords.includes("win")) {
    selectedResponses = dialogueDatabase[config.character]?.celebration || selectedResponses
  }

  const selectedText = selectedResponses[Math.floor(Math.random() * selectedResponses.length)]

  return {
    text: selectedText,
    mood: determineMood(contextKeywords),
    actions: generateContextActions(contextKeywords, config.character),
    context: extractContext(contextKeywords),
  }
}

function determineMood(contextKeywords: string): DialogueResponse["mood"] {
  if (contextKeywords.includes("victory") || contextKeywords.includes("success")) return "excited"
  if (contextKeywords.includes("problem") || contextKeywords.includes("defeat")) return "concerned"
  if (contextKeywords.includes("mystery") || contextKeywords.includes("secret")) return "mysterious"
  if (contextKeywords.includes("angry") || contextKeywords.includes("fight")) return "gruff"
  return "friendly"
}

function generateContextActions(contextKeywords: string, character: string): string[] {
  const baseActions = {
    trader: ["View Inventory", "Check Prices", "Make Offer", "Ask About Market"],
    bartender: ["Order Drink", "Ask for Advice", "Share Story", "Listen to Rumors"],
    sheriff: ["Report Crime", "Ask for Help", "Check Wanted Posters", "Get Directions"],
    prospector: ["Ask About Mining", "Trade Resources", "Hear Stories", "Get Tips"],
  }

  const actions = baseActions[character] || ["Continue", "Ask Question", "Leave"]

  // Add context-specific actions
  if (contextKeywords.includes("trade")) {
    actions.unshift("Execute Trade")
  }
  if (contextKeywords.includes("boxing")) {
    actions.unshift("Enter Arena")
  }

  return actions.slice(0, 4) // Limit to 4 actions
}

function extractContext(contextKeywords: string): string {
  if (contextKeywords.includes("market")) return "trading"
  if (contextKeywords.includes("boxing")) return "combat"
  if (contextKeywords.includes("mining")) return "resource_gathering"
  return "general"
}

function getFallbackDialogue(character: string, context: string): DialogueResponse {
  const fallbacks = {
    trader: "Well howdy there, partner! My tongue's a bit tied today, but I got goods to trade!",
    bartender: "Welcome to the saloon! Even when words fail me, the whiskey flows true.",
    sheriff: "Afternoon, citizen. Keeping the peace, even when I'm at a loss for words.",
    prospector: "Howdy! Found plenty of gold, but seems I've misplaced my words today!",
  }

  return {
    text: fallbacks[character] || "Howdy! Good to see ya!",
    mood: "friendly",
    actions: ["Continue", "Try Again", "Leave"],
  }
}
