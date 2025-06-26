import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase/client"

// Enhanced Bill AI with LangGraph integration
export async function POST(request: NextRequest) {
  try {
    const { message, walletAddress, eventType = "idle", playerData } = await request.json()

    // Log the interaction
    const interactionData = {
      event_type: eventType,
      context: `User message: ${message}, Wallet: ${walletAddress}`,
      player_id: playerData?.id || null,
      executed_at: new Date().toISOString(),
    }

    // Enhanced Bill responses with LangGraph-style decision making
    const billPersonality = {
      greeting: [
        "Well howdy there, partner! *tips hat and wipes down bar* Welcome to the finest digital saloon this side of the blockchain!",
        "Pull up a stool, friend! *slides glass across bar* Name's Bill, and I've been tendin' this establishment since the great crypto rush of '52.",
        "New face in town, eh? *polishes glass thoughtfully* What brings ya to our neck of the digital frontier?",
      ],
      market_boom: [
        "Well I'll be jiggered! *polishes glass excitedly* Markets are hotter than a branding iron today! Your AVAX position's lookin' mighty fine, but remember - what goes up like a rocket can come down like a rock.",
        "Thunderation! Haven't seen a bull run like this since the gold rush! *slides celebratory whiskey* Time to take some profits off the table, but don't get too greedy now, partner.",
      ],
      market_crash: [
        "*furrows brow while cleaning shot glass* Markets are colder than a Wyoming winter, partner. But this old bartender's seen plenty of storms - they always pass.",
        "Dagnabbit! Market's taken a tumble, but don't you go sellin' in a panic now. *pours stiff drink* This here whiskey'll help ya think clearer about them opportunities.",
      ],
      trading_advice: [
        "In my 40 years tendin' this establishment, I've learned that patience and good whiskey solve most problems. Your portfolio shows promise - consider diversifyin' into land deeds for steady income.",
        "*leans on bar thoughtfully* Back in '52, we learned that timing the market is like trying to rope a tornado. Focus on solid fundamentals instead, partner.",
        "That trading pattern of yours reminds me of the smart prospectors from the old days. They knew when to hold and when to fold. Keep that steady approach!",
      ],
      general_wisdom: [
        "*adjusts suspenders* The frontier teaches ya that fortune favors the prepared mind and the steady hand. What's your next move gonna be?",
        "Been through more market booms and busts than a Missouri riverboat gambler. Key is knowin' when to hold and when to fold.",
        "*wipes down another glass* This digital frontier's got its own rules, but the principles stay the same - work hard, trade smart, and always keep some powder dry.",
      ],
    }

    // Simulate market analysis
    const mockMarketData = {
      avax_price: 34.21 + (Math.random() - 0.5) * 10,
      avax_change: (Math.random() - 0.5) * 20,
      stones_price: 2.47 + (Math.random() - 0.5) * 1,
      volume_24h: Math.random() * 10000 + 1000,
    }

    // Decision logic (simplified LangGraph-style)
    let responseCategory = "general_wisdom"
    let confidence = 0.85

    if (eventType === "welcome" || message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi")) {
      responseCategory = "greeting"
      confidence = 0.95
    } else if (mockMarketData.avax_change > 10) {
      responseCategory = "market_boom"
      confidence = 0.9
    } else if (mockMarketData.avax_change < -10) {
      responseCategory = "market_crash"
      confidence = 0.9
    } else if (
      message.toLowerCase().includes("trade") ||
      message.toLowerCase().includes("buy") ||
      message.toLowerCase().includes("sell")
    ) {
      responseCategory = "trading_advice"
      confidence = 0.88
    }

    // Select response
    const responses = billPersonality[responseCategory as keyof typeof billPersonality]
    const selectedResponse = responses[Math.floor(Math.random() * responses.length)]

    // Enhanced wallet analysis
    const walletAnalysis = walletAddress
      ? {
          address: walletAddress,
          estimated_value: Math.random() * 5000 + 1000,
          risk_score: Math.random() * 0.6 + 0.2,
          recommendations: [
            "Consider staking your AVAX for passive rewards",
            "Diversify into STONES for mining opportunities",
            "Land deeds provide steady rental income",
            "Boxing NFTs can appreciate with tournament wins",
          ].slice(0, Math.floor(Math.random() * 3) + 1),
        }
      : null

    // Action items based on context
    const actionItems = []
    if (mockMarketData.avax_change > 5) {
      actionItems.push("Consider taking some profits")
    }
    if (mockMarketData.avax_change < -5) {
      actionItems.push("Look for buying opportunities")
    }
    actionItems.push("Check land deed opportunities")
    actionItems.push("Visit boxing arena for upgrades")

    // Store interaction in Supabase
    try {
      await supabase.from("bill_interactions").insert({
        ...interactionData,
        response: selectedResponse,
        confidence: confidence,
      })
    } catch (dbError) {
      console.warn("Database logging failed:", dbError)
    }

    // Human-in-the-loop check
    const requiresApproval =
      confidence < 0.7 || selectedResponse.includes("large") || selectedResponse.includes("emergency")

    if (requiresApproval) {
      try {
        await supabase.from("bill_responses_review").insert({
          event_type: eventType,
          context: interactionData.context,
          proposed_response: selectedResponse,
          confidence: confidence,
          requires_approval: true,
          status: "pending_review",
        })
      } catch (reviewError) {
        console.warn("Review queue failed:", reviewError)
      }
    }

    return NextResponse.json({
      success: true,
      response: selectedResponse,
      mood:
        responseCategory === "market_boom" ? "bullish" : responseCategory === "market_crash" ? "bearish" : "cheerful",
      confidence: confidence,
      walletAnalysis,
      actionItems,
      marketData: mockMarketData,
      requiresApproval,
      eventType: eventType,
      timestamp: new Date().toISOString(),
      // LangGraph-style metadata
      workflow: {
        nodes_executed: [
          "detect_event",
          "analyze_context",
          "generate_response",
          requiresApproval ? "human_review" : "execute_action",
        ],
        decision_path: responseCategory,
        confidence_threshold: 0.7,
        human_oversight: requiresApproval,
      },
    })
  } catch (error) {
    console.error("Bill AI Enhanced error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Bill spilled his whiskey on the telegraph machine!",
        response:
          "Well partner, seems my brain's a bit foggy from that last shot of whiskey. *chuckles and wipes bar* Try askin' again in a spell - this old bartender's still got plenty of wisdom to share!",
        mood: "apologetic",
        confidence: 0.3,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

// GET endpoint for Bill's current status
export async function GET() {
  try {
    // Get recent interactions count
    const { data: recentInteractions } = await supabase
      .from("bill_interactions")
      .select("id")
      .gte("executed_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

    // Get pending reviews
    const { data: pendingReviews } = await supabase
      .from("bill_responses_review")
      .select("id")
      .eq("status", "pending_review")

    return NextResponse.json({
      status: "operational",
      interactions_24h: recentInteractions?.length || 0,
      pending_reviews: pendingReviews?.length || 0,
      mood: "cheerful",
      energy: Math.floor(Math.random() * 30) + 70,
      wisdom: Math.floor(Math.random() * 20) + 80,
      last_updated: new Date().toISOString(),
      message: "Bar Keep Bill's AI brain is running smooth as Tennessee whiskey!",
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Bill's having some technical difficulties with his telegraph machine.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
