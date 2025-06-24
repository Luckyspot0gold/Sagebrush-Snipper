"use client"

import { useState, useCallback } from "react"

interface MarketData {
  volatility: number
  sentiment: number
  mood: string
  topGainer?: string
  topLoser?: string
}

interface FrontierDialogue {
  opening: string
  analysis: string[]
  recommendation: string
  closing: string
  mood: "bullish" | "bearish" | "cautious" | "excited" | "cheerful" | "wise"
}

const FRONTIER_EXPRESSIONS = {
  surprise: ["Well I'll be hornswoggled!", "Thunderation!", "Great jumpin' Jehosaphat!", "Well I'll be jiggered!"],
  approval: [
    "Well butter my biscuits!",
    "Finer than frog's hair!",
    "Sweeter than Georgia peach pie!",
    "Hotter than a pistol in July!",
  ],
  concern: [
    "Dagnabbit!",
    "That's a real pickle!",
    "Trouble's brewin' like a summer storm!",
    "Colder than a Wyoming winter!",
  ],
  wisdom: [
    "As my pappy used to say...",
    "In my years tendin' bar...",
    "Seen this before in '49...",
    "Back in the Gold Rush days...",
  ],
  excitement: [
    "Well butter my biscuits!",
    "Hotter than a pistol!",
    "Sweeter than sorghum molasses!",
    "Finer than frog's hair split four ways!",
  ],
}

const MARKET_METAPHORS = {
  volatile: [
    "wilder than a mustang stampede",
    "jumpier than a long-tailed cat in a room full of rockers",
    "more unpredictable than prairie weather",
    "shakier than a leaf in a tornado",
  ],
  bullish: [
    "risin' like smoke from a campfire",
    "climbin' faster than a cat up a tree",
    "hotter than a pistol in July",
    "stronger than a team of oxen",
  ],
  bearish: [
    "droppin' faster than a coyote down a mineshaft",
    "colder than a Wyoming winter",
    "fallin' like leaves in autumn",
    "weaker than watered-down whiskey",
  ],
}

export function useFrontierSpeech() {
  const [lastAdvice, setLastAdvice] = useState<string>("")

  const generateDialogue = useCallback((marketData: MarketData): FrontierDialogue => {
    const { volatility, sentiment, mood, topGainer, topLoser } = marketData

    const dialogueData: FrontierDialogue = {
      opening: "",
      analysis: [],
      recommendation: "",
      closing: "",
      mood: "cautious",
    }

    // Determine market condition and generate appropriate response
    if (volatility > 7) {
      // High volatility
      dialogueData.opening = `${FRONTIER_EXPRESSIONS.surprise[0]} This market's ${MARKET_METAPHORS.volatile[0]}!`
      dialogueData.analysis = [
        "Prices are bouncin' around like a rubber ball in a tornado.",
        "Seen volatility like this during the Gold Rush of '49.",
        "Smart money's either runnin' for the hills or doublin' down.",
      ]
      dialogueData.recommendation = "Reckon you should tighten them stop-losses and keep yer powder dry."
      dialogueData.mood = "cautious"
    } else if (sentiment > 0.5) {
      // Bullish market
      dialogueData.opening = `${FRONTIER_EXPRESSIONS.approval[0]} Market's ${MARKET_METAPHORS.bullish[0]}!`
      dialogueData.analysis = [
        "Bulls are runnin' the show today, partner.",
        "Optimism's thicker than molasses in January.",
        topGainer ? `That ${topGainer} is leadin' the charge like a cavalry captain.` : "Most assets are seein' green.",
      ]
      dialogueData.recommendation = "Might be time to ride this wave, but don't get too greedy now."
      dialogueData.mood = "bullish"
    } else if (sentiment < -0.3) {
      // Bearish market
      dialogueData.opening = `${FRONTIER_EXPRESSIONS.concern[0]} Market's ${MARKET_METAPHORS.bearish[0]}!`
      dialogueData.analysis = [
        "Bears got their claws out today, I tell ya.",
        "Fear's spreadin' faster than wildfire in dry grass.",
        topLoser ? `Poor ${topLoser} is takin' a beatin' like a rented mule.` : "Red numbers far as the eye can see.",
      ]
      dialogueData.recommendation = "Could be a buyin' opportunity for them with iron stomachs."
      dialogueData.mood = "bearish"
    } else {
      // Neutral/sideways market
      dialogueData.opening = `${FRONTIER_EXPRESSIONS.wisdom[0]} market's steadier than a church pew.`
      dialogueData.analysis = [
        "Not much excitement today - prices movin' sideways like a lazy river.",
        "Sometimes the best action is no action at all.",
        "Good time to study the charts and plan yer next move.",
      ]
      dialogueData.recommendation = "Patience is a virtue, partner. Wait for the right opportunity."
      dialogueData.mood = "cautious"
    }

    // Add closing wisdom
    const closingWisdom = [
      "Remember, it ain't about timing the market, it's about time in the market.",
      "Fortune favors the prepared mind, as they say.",
      "Keep yer wits about ya, and may the wind be at yer back.",
      "Trust yer gut, but verify with data, partner.",
    ]
    dialogueData.closing = closingWisdom[Math.floor(Math.random() * closingWisdom.length)]

    setLastAdvice(dialogueData.recommendation)
    return dialogueData
  }, [])

  const getRandomGreeting = useCallback(() => {
    const greetings = [
      "Howdy there, partner!",
      "Well looky who wandered into my establishment!",
      "Pull up a chair and set a spell!",
      "What brings ya to Bill's place today?",
      "Welcome to the finest waterin' hole this side of the Mississippi!",
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
  }, [])

  const getMarketQuip = useCallback((change: number) => {
    if (change > 5) {
      return `${FRONTIER_EXPRESSIONS.approval[1]} That's risin' faster than bread in a warm kitchen!`
    } else if (change < -5) {
      return `${FRONTIER_EXPRESSIONS.concern[1]} That's droppin' like a hot potato!`
    } else {
      return "Steady as she goes, partner."
    }
  }, [])

  const generateContextualDialogue = useCallback(
    (context: string, marketData: MarketData): FrontierDialogue => {
      const { volatility, sentiment, mood, topGainer, topLoser } = marketData

      switch (context) {
        case "welcome":
          return {
            opening: "Howdy, partner! Bill's the name. Seen more market booms than a Missouri riverboat gambler.",
            analysis: [
              "Been tendin' this establishment since the Gold Rush of '49.",
              "Helped many a pioneer navigate these financial waters.",
            ],
            recommendation: "What brings ya to the frontier today?",
            closing: "Pull up a stool and let's talk business!",
            mood: "cheerful",
          }

        case "tutorial":
          return {
            opening: "New to these parts? No worries, partner!",
            analysis: [
              "Every greenhorn needs a good guide.",
              "The frontier's full of opportunity for them that know where to look.",
            ],
            recommendation: "Start with small trades and work yer way up.",
            closing: "Remember, fortune favors the prepared mind!",
            mood: "wise",
          }

        default:
          return generateDialogue(marketData)
      }
    },
    [generateDialogue],
  )

  return {
    generateDialogue,
    getRandomGreeting,
    getMarketQuip,
    lastAdvice,
    generateContextualDialogue,
  }
}
