import { NextRequest, NextResponse } from "next/server"
import { veniceVerifier } from "@/lib/venice-ai-verifier"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { component, action } = body

    switch (action) {
      case "full_verification":
        const fullReport = await veniceVerifier.runFullVerification()
        return NextResponse.json({
          success: true,
          report: fullReport,
          message: "Venice AI verification completed successfully, partner!",
        })

      case "component_check":
        if (!component) {
          return NextResponse.json({ error: "Component parameter required for component_check" }, { status: 400 })
        }

        let componentResult
        switch (component) {
          case "core":
            componentResult = await veniceVerifier.verifyCoreAIEngine()
            break
          case "blockchain":
            componentResult = await veniceVerifier.verifyBlockchainBridge()
            break
          case "learning":
            componentResult = await veniceVerifier.verifyLearningModule()
            break
          case "combat":
            componentResult = await veniceVerifier.verifyCombatIntegration()
            break
          case "market":
            componentResult = await veniceVerifier.verifyMarketPrediction()
            break
          default:
            return NextResponse.json({ error: "Invalid component specified" }, { status: 400 })
        }

        return NextResponse.json({
          success: true,
          result: componentResult,
          message: `${component} verification completed`,
        })

      case "health_check":
        // Quick health check
        const healthResult = await veniceVerifier.verifyCoreAIEngine()
        return NextResponse.json({
          success: true,
          status: healthResult.status,
          confidence: healthResult.confidence,
          message: "Venice AI health check completed",
        })

      default:
        return NextResponse.json(
          {
            error: "Invalid action",
            available_actions: ["full_verification", "component_check", "health_check"],
          },
          { status: 400 },
        )
    }
  } catch (error) {
    console.error("Venice AI verification error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Venice AI verification failed",
        message: "Something went wrong during Venice AI verification, partner.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const component = url.searchParams.get("component")

  try {
    if (component) {
      // Single component check
      const result = await POST(
        new NextRequest(request.url, {
          method: "POST",
          body: JSON.stringify({ action: "component_check", component }),
        }),
      )
      return result
    } else {
      // Return Venice AI status and capabilities
      return NextResponse.json({
        status: "operational",
        version: "1.0.0",
        venice_ai_model: "llama-3.1-8b",
        available_components: ["core", "blockchain", "learning", "combat", "market"],
        available_actions: ["full_verification", "component_check", "health_check"],
        quantum_enabled: true,
        wyoming_compliant: true,
        last_verification: new Date().toISOString(),
      })
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "Venice AI verification service error",
        message: "Could not process Venice AI verification request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
