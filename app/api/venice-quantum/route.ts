import { NextRequest, NextResponse } from "next/server"
import { veniceQuantumVerifier } from "@/lib/venice-ai-quantum-verifier"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, cryptoToken, marketCondition, opponentToken, moveData, data } = body

    console.log(`🧠 Venice Quantum API: ${action}`)

    switch (action) {
      case "verify_integration":
        const verification = await veniceQuantumVerifier.verifyCompleteIntegration()
        return NextResponse.json({
          success: true,
          verification,
          message: "Venice AI quantum integration verified, partner!",
        })

      case "generate_strategy":
        if (!cryptoToken || !marketCondition || !opponentToken) {
          return NextResponse.json(
            { error: "Missing required parameters: cryptoToken, marketCondition, opponentToken" },
            { status: 400 }
          )
        }

        const strategy = await veniceQuantumVerifier.generateCombatStrategy(
          cryptoToken,
          marketCondition,
          opponentToken
        )

        return NextResponse.json({
          success: true,
          strategy,
          message: `Venice AI generated ${strategy.length} moves for ${cryptoToken} vs ${opponentToken}`,
        })

      case "validate_move":
        if (!moveData) {
          return NextResponse.json({ error: "Move data required for validation" }, { status: 400 })
        }

        const boxerStats = {
          name: `${moveData.cryptoToken} Fighter`,
          health: 100,
          energy: 100,
          cryptoToken: moveData.cryptoToken,
          marketSentiment: 0.8,
          koCount: 0,
          sprite: "/images/crypto-clashers-fighter.png",
        }

        const isValid = await veniceQuantumVerifier.validateCombatMove(moveData, boxerStats)

        return NextResponse.json({
          success: true,
          valid: isValid,
          message: isValid ? "Move validated by Wyoming DAO" : "Move rejected by compliance system",
        })

      case "encrypt_data":
        if (!data) {
          return NextResponse.json({ error: "Data required for encryption" }, { status: 400 })
        }

        const encrypted = await veniceQuantumVerifier.encryptWithAllLayers(data)

        return NextResponse.json({
          success: true,
          encrypted,
          layers: 5,
          message: "Data encrypted with 5-layer Undead$stackerS system",
        })

      case "hackathon_signature":
        const signature = veniceQuantumVerifier.generateHackathonSignature()

        return NextResponse.json({
          success: true,
          signature,
          timestamp: new Date().toISOString(),
          message: "Hackathon submission signature generated",
        })

      case "test_venice_ai":
        try {
          const testPrompt = "Test Venice AI integration for WyoVerse crypto boxing"
          const testResponse = await fetch("https://api.venice.ai/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.VENICE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "llama-3.1-8b",
              messages: [
                {
                  role: "system",
                  content: "You are Bar Keep Bill from WyoVerse. Respond briefly.",
                },
                {
                  role: "user",
                  content: testPrompt,
                },
              ],
              max_tokens: 50,
            }),
          })

          if (testResponse.ok) {
            const testData = await testResponse.json()
            const aiResponse = testData.choices[0]?.message?.content || ""

            return NextResponse.json({
              success: true,
              venice_ai_working: true,
              ai_response: aiResponse,
              tokens_used: testData.usage?.total_tokens || 0,
              message: "Venice AI test successful",
            })
          } else {
            throw new Error(`Venice AI API error: ${testResponse.status}`)
          }
        } catch (error) {
          return NextResponse.json({
            success: false,
            venice_ai_working: false,
            error: error instanceof Error ? error.message : "Unknown error",
            message: "Venice AI test failed",
          })
        }

      default:
        return NextResponse.json(
          {
            error: "Invalid action",
            available_actions: [
              "verify_integration",
              "generate_strategy",
              "validate_move",
              "encrypt_data",
              "hackathon_signature",
              "test_venice_ai",
            ],
          },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error("Venice Quantum API error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Venice Quantum API failed",
        message: "Something went wrong with the quantum system, partner.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const test = url.searchParams.get("test")

  try {
    if (test === "quick") {
      // Quick health check
      const verification = await veniceQuantumVerifier.verifyCompleteIntegration()

      return NextResponse.json({
        status: "operational",
        version: "1.0.0",
        venice_ai_model: "llama-3.1-8b",
        quantum_layers: 5,
        wyoming_compliant: true,
        integration_score: verification.overallScore,
        available_actions: [
          "verify_integration",
          "generate_strategy",
          "validate_move",
          "encrypt_data",
          "hackathon_signature",
          "test_venice_ai",
        ],
        last_check: new Date().toISOString(),
      })
    } else {
      // Return Venice Quantum status and capabilities
      return NextResponse.json({
        status: "operational",
        version: "1.0.0",
        venice_ai_model: "llama-3.1-8b",
        quantum_layers: 5,
        encryption_system: "5-Layer Undead$stackerS",
        wyoming_compliant: true,
        aleo_integrated: true,
        available_actions: [
          "verify_integration",
          "generate_strategy",
          "validate_move",
          "encrypt_data",
          "hackathon_signature",
          "test_venice_ai",
        ],
        supported_tokens: ["BTC", "ETH", "AVAX", "SOL", "LINK", "WYO"],
        market_conditions: ["bullish", "bearish", "volatile", "stable"],
        last_verification: new Date().toISOString(),
      })
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "Venice Quantum service error",
        message: "Could not process Venice Quantum request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
