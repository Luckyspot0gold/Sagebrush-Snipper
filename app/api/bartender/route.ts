import { type NextRequest, NextResponse } from "next/server"

// Mock Dialogflow integration - replace with actual Google Cloud SDK
interface DialogflowResponse {
  reply: string
  confidence: number
  intent: string
  mood: string
}

// Western frontier personality responses
const WESTERN_RESPONSES = {
  greeting: [
    "Well howdy there, partner! Pull up a stool and tell old Bill what's on yer mind.",
    "Welcome to my establishment, friend! What can this old bartender do for ya?",
    "Howdy! *tips hat* Name's Bill, and I've been tendin' this saloon since the digital frontier opened up.",
  ],
  crypto_advice: [
    "In my experience, partner, crypto's like breakin' wild horses - takes patience and a steady hand.",
    "Been watchin' these digital currencies longer than most. Key is knowin' when to hold and when to fold.",
    "Market's wilder than a mustang today! But remember, fortune favors the prepared mind.",
  ],
  boxing_tips: [
    "Boxing's like life on the frontier - it ain't about the size of the dog in the fight, but the fight in the dog!",
    "Keep yer guard up and yer wits about ya. A good boxer knows when to strike and when to dodge.",
    "Seen many a fighter come through these parts. The winners all had one thing in common - they never gave up.",
  ],
  land_advice: [
    "Land's the only thing they ain't makin' more of, partner. Stake yer claim while the gettin's good!",
    "A wise man once told me: buy land, they ain't makin' any more of it. Still true in the digital age!",
    "These here land deeds are like gold claims back in '49 - get in early and hold tight.",
  ],
  general_wisdom: [
    "Life's like tendin' bar - ya gotta know when to pour and when to cut 'em off.",
    "Been through more booms and busts than a Missouri riverboat gambler. Key is stayin' steady.",
    "The frontier teaches ya that preparation meets opportunity, and that's where luck is made.",
  ],
}

const CRYPTO_KNOWLEDGE = {
  bitcoin: "Digital gold, partner! Wilder than a mustang but solid as bedrock when ya understand it.",
  avalanche: "Faster than a runaway stagecoach! This here network's got speed and power.",
  ethereum: "The granddaddy of smart contracts. Like the railroad - changed everything when it came through.",
  defi: "The new frontier of finance! No banks, no middlemen, just you and the code.",
  nft: "Digital deeds, like land claims but for art and collectibles. Mighty interesting concept!",
  staking: "Like puttin' yer money to work while ya sleep. Earns ya interest for helpin' secure the network.",
}

function generateBillResponse(userInput: string, sessionId: string): DialogflowResponse {
  const input = userInput.toLowerCase()
  let response = ""
  let intent = "general"
  let confidence = 0.8
  let mood = "cheerful"

  // Greeting detection
  if (input.includes("hello") || input.includes("hi") || input.includes("hey") || input.includes("howdy")) {
    response = WESTERN_RESPONSES.greeting[Math.floor(Math.random() * WESTERN_RESPONSES.greeting.length)]
    intent = "greeting"
    confidence = 0.95
  }
  // Crypto advice
  else if (
    input.includes("crypto") ||
    input.includes("bitcoin") ||
    input.includes("trading") ||
    input.includes("market")
  ) {
    response = WESTERN_RESPONSES.crypto_advice[Math.floor(Math.random() * WESTERN_RESPONSES.crypto_advice.length)]
    intent = "crypto_advice"
    mood = "wise"

    // Add specific crypto knowledge
    Object.entries(CRYPTO_KNOWLEDGE).forEach(([crypto, knowledge]) => {
      if (input.includes(crypto)) {
        response += ` ${knowledge}`
      }
    })
  }
  // Boxing advice
  else if (input.includes("boxing") || input.includes("fight") || input.includes("arena") || input.includes("punch")) {
    response = WESTERN_RESPONSES.boxing_tips[Math.floor(Math.random() * WESTERN_RESPONSES.boxing_tips.length)]
    intent = "boxing_tips"
    mood = "excited"
  }
  // Land/property advice
  else if (
    input.includes("land") ||
    input.includes("property") ||
    input.includes("deed") ||
    input.includes("real estate")
  ) {
    response = WESTERN_RESPONSES.land_advice[Math.floor(Math.random() * WESTERN_RESPONSES.land_advice.length)]
    intent = "land_advice"
    mood = "wise"
  }
  // General wisdom
  else {
    response = WESTERN_RESPONSES.general_wisdom[Math.floor(Math.random() * WESTERN_RESPONSES.general_wisdom.length)]
    intent = "general_wisdom"
    mood = "thoughtful"
  }

  return {
    reply: response,
    confidence,
    intent,
    mood,
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { question, sessionId = "default-session" } = body

    if (!question) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 })
    }

    // For production, replace this with actual Dialogflow integration:
    /*
    const sessionClient = new dialogflow.SessionsClient({
      credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON!)
    });
    
    const sessionPath = sessionClient.projectAgentSessionPath(
      process.env.GOOGLE_PROJECT_ID!,
      sessionId
    );

    const response = await sessionClient.detectIntent({
      session: sessionPath,
      queryInput: {
        text: {
          text: question,
          languageCode: 'en-US'
        }
      }
    });

    const result = response[0].queryResult;
    */

    // Mock response for now
    const billResponse = generateBillResponse(question, sessionId)

    // Log the conversation for analytics
    console.log(
      `[${new Date().toISOString()}] Session: ${sessionId}, Question: "${question}", Response: "${billResponse.reply}"`,
    )

    return NextResponse.json({
      reply: billResponse.reply,
      confidence: billResponse.confidence,
      intent: billResponse.intent,
      mood: billResponse.mood,
      sessionId,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Bartender API error:", error)

    return NextResponse.json(
      {
        reply: "Well, partner, seems like I'm havin' some trouble hearin' ya right now. Mind tryin' that again?",
        confidence: 0.1,
        intent: "error",
        mood: "apologetic",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: "operational",
    version: "1.2.0",
    personality: "western_llm_v3",
    features: ["crypto_advice", "boxing_tips", "land_guidance", "general_wisdom"],
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
}
