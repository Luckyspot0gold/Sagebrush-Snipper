import { type NextRequest, NextResponse } from "next/server"

// Mock Dialogflow integration for development
export async function POST(request: NextRequest) {
  try {
    const { question, sessionId } = await request.json()

    // In production, this would use actual Dialogflow
    const responses = {
      hello: "Howdy partner! Welcome to Bill's Saloon. What can I get ya?",
      drink: "We got the finest whiskey this side of the Rockies! That'll be 5 STONES.",
      boxing: "The boxing arena is right next door! Big fight tonight - Bull vs Bear!",
      mining: "Mining's been good lately. Lots of gold and crypto stones coming out of them hills.",
      weather: "It's a beautiful day in Wyoming! Perfect for some outdoor adventures.",
      default: "Well I'll be! That's an interesting question, partner. Let me think on that...",
    }

    // Simple keyword matching (replace with actual Dialogflow in production)
    let reply = responses.default
    for (const [keyword, response] of Object.entries(responses)) {
      if (question.toLowerCase().includes(keyword)) {
        reply = response
        break
      }
    }

    // Log the conversation
    console.log(`Bartender conversation - Session: ${sessionId}, Question: ${question}, Reply: ${reply}`)

    return NextResponse.json({
      reply,
      sessionId,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Bartender API error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
