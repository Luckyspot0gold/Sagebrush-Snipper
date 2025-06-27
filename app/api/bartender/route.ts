import { type NextRequest, NextResponse } from "next/server"

// Mock Dialogflow integration - replace with actual Google Cloud SDK
interface DialogflowResponse {
  reply: string
  confidence: number
  intent: string
  mood: string
  personality: string
  slang_used: string
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

// Western frontier personality configuration
const WESTERN_SLANG = [
  "dagnabbit",
  "consarnit",
  "young whippersnapper",
  "by tarnation",
  "that dog won't hunt",
  "spittoon worthy",
  "well I'll be hornswoggled",
  "ain't that a kick in the teeth",
  "madder than a wet hen",
  "happy as a tornado in a trailer park",
]

const CRYPTO_KNOWLEDGE = {
  bitcoin: "Digital gold, wilder than a mustang! Been around since '09 and still kickin'.",
  avalanche: "Faster than a runaway stagecoach! This here network's got speed and power, partner.",
  ethereum: "The granddaddy of smart contracts. Like the railroad - changed everything when it came through.",
  defi: "The new frontier of finance, partner! No banks, no middlemen, just you and the code.",
  nft: "Digital deeds, like land claims but for art and collectibles. Mighty interesting concept!",
  staking: "Like puttin' yer money to work while ya sleep. Earns ya interest for helpin' secure the network.",
  mining: "Digital prospecting! Instead of pickaxes, ya use computer power to find them crypto nuggets.",
  wallet: "Yer digital saddlebags, partner. Keep yer crypto safe and sound in there.",
  blockchain: "Like a ledger that can't be tampered with. Every transaction written in stone, so to speak.",
}

const BILL_RESPONSES = {
  greeting: [
    "Well howdy there, partner! Pull up a stool and tell old Bill what's on yer mind.",
    "Welcome to my establishment, friend! What can this old bartender do for ya?",
    "Howdy! *tips hat* Name's Bill, and I've been tendin' this saloon since the digital frontier opened up.",
    "Well ain't you a sight for sore eyes! Come on in and wet yer whistle.",
  ],
  crypto_advice: [
    "In my experience, partner, crypto's like breakin' wild horses - takes patience and a steady hand.",
    "Been watchin' these digital currencies longer than most. Key is knowin' when to hold and when to fold.",
    "Market's wilder than a mustang today! But remember, fortune favors the prepared mind.",
    "Crypto's like pannin' for gold - ya gotta sift through a lot of dirt to find the nuggets.",
  ],
  boxing_tips: [
    "Boxing's like life on the frontier - it ain't about the size of the dog in the fight, but the fight in the dog!",
    "Keep yer guard up and yer wits about ya. A good boxer knows when to strike and when to dodge.",
    "Seen many a fighter come through these parts. The winners all had one thing in common - they never gave up.",
    "Boxing's about heart, partner. Ya can teach technique, but ya can't teach grit.",
  ],
  land_advice: [
    "Land's the only thing they ain't makin' more of, partner. Stake yer claim while the gettin's good!",
    "A wise man once told me: buy land, they ain't makin' any more of it. Still true in the digital age!",
    "These here land deeds are like gold claims back in '49 - get in early and hold tight.",
    "Prime real estate in the digital frontier is scarcer than hen's teeth. Don't let it slip through yer fingers.",
  ],
  general_wisdom: [
    "Life's like tendin' bar - ya gotta know when to pour and when to cut 'em off.",
    "Been through more booms and busts than a Missouri riverboat gambler. Key is stayin' steady.",
    "The frontier teaches ya that preparation meets opportunity, and that's where luck is made.",
    "Remember, partner - it ain't about how hard ya fall, it's about how quick ya get back up.",
  ],
  drinks: [
    "How 'bout a shot of our finest WyoVerse Whiskey? Smooth as silk and twice as strong!",
    "Got some fresh Crypto Crusher cocktails - guaranteed to give ya the courage to make them big trades!",
    "Our Blockchain Bourbon is aged in digital oak barrels. One sip and you'll understand the future!",
    "Might I suggest the Frontier Fizz? It's got enough kick to wake up a hibernatin' bear.",
  ],
  weather: [
    "It's a beautiful day in Wyoming, partner! Perfect weather for some outdoor adventures.",
    "Sun's shinin' bright as a new penny today. Good day for prospectin' or boxin'!",
    "Weather's finer than frog's hair split four ways. Couldn't ask for better!",
    "Clear skies and gentle breezes - the kind of day that makes ya glad to be alive.",
  ],
}

function generateBillResponse(userInput: string, sessionId: string): DialogflowResponse {
  const input = userInput.toLowerCase()
  let response = ""
  let intent = "general"
  let confidence = 0.8
  let mood = "cheerful"

  // Add some western flair
  const slang = WESTERN_SLANG[Math.floor(Math.random() * WESTERN_SLANG.length)]

  // Greeting detection
  if (input.includes("hello") || input.includes("hi") || input.includes("hey") || input.includes("howdy")) {
    response = BILL_RESPONSES.greeting[Math.floor(Math.random() * BILL_RESPONSES.greeting.length)]
    intent = "greeting"
    confidence = 0.95
  }
  // Crypto advice
  else if (
    input.includes("crypto") ||
    input.includes("bitcoin") ||
    input.includes("trading") ||
    input.includes("market") ||
    input.includes("invest")
  ) {
    response = BILL_RESPONSES.crypto_advice[Math.floor(Math.random() * BILL_RESPONSES.crypto_advice.length)]
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
    response = BILL_RESPONSES.boxing_tips[Math.floor(Math.random() * BILL_RESPONSES.boxing_tips.length)]
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
    response = BILL_RESPONSES.land_advice[Math.floor(Math.random() * BILL_RESPONSES.land_advice.length)]
    intent = "land_advice"
    mood = "wise"
  }
  // Drinks
  else if (
    input.includes("drink") ||
    input.includes("whiskey") ||
    input.includes("beer") ||
    input.includes("cocktail")
  ) {
    response = BILL_RESPONSES.drinks[Math.floor(Math.random() * BILL_RESPONSES.drinks.length)]
    intent = "drinks"
    mood = "friendly"
  }
  // Weather
  else if (input.includes("weather") || input.includes("sunny") || input.includes("rain") || input.includes("cold")) {
    response = BILL_RESPONSES.weather[Math.floor(Math.random() * BILL_RESPONSES.weather.length)]
    intent = "weather"
    mood = "cheerful"
  }
  // Health check
  else if (input.includes("health") || input.includes("status") || input.includes("check")) {
    response = `Well ${slang}, everything's runnin' smoother than a greased pig! All systems are go, partner.`
    intent = "health_check"
    mood = "confident"
  }
  // General wisdom
  else {
    response = BILL_RESPONSES.general_wisdom[Math.floor(Math.random() * BILL_RESPONSES.general_wisdom.length)]
    intent = "general_wisdom"
    mood = "thoughtful"

    // Add some western flair
    response += ` ${slang}!`
  }

  return {
    reply: response,
    confidence,
    intent,
    mood,
    personality: "western_llm_v3",
    slang_used: slang,
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
      personality: billResponse.personality,
      slang_used: billResponse.slang_used,
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
        personality: "western_llm_v3",
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
    features: ["crypto_advice", "boxing_tips", "land_guidance", "general_wisdom", "drinks", "weather"],
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    slang_count: WESTERN_SLANG.length,
    knowledge_base: Object.keys(CRYPTO_KNOWLEDGE).length,
  })
}
