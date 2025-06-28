import { NextRequest, NextResponse } from "next/server"
import { complianceChecker } from "@/lib/audit/compliance-checker"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, component } = body

    switch (action) {
      case "full_audit":
        const fullReport = await complianceChecker.runFullAudit()
        return NextResponse.json({
          success: true,
          report: fullReport,
          message: "Wyoming-Quantum Compliance Audit completed successfully, partner!",
        })

      case "quick_check":
        const quickResults = await Promise.all([
          complianceChecker.checkLinkIntegrity(),
          complianceChecker.checkBarKeepBillAI(),
        ])

        return NextResponse.json({
          success: true,
          results: quickResults,
          message: "Quick compliance check completed",
        })

      case "component_check":
        if (!component) {
          return NextResponse.json({ error: "Component parameter required for component_check" }, { status: 400 })
        }

        let componentResult
        switch (component) {
          case "links":
            componentResult = await complianceChecker.checkLinkIntegrity()
            break
          case "blockchain":
            componentResult = await complianceChecker.checkBlockchainConnectivity()
            break
          case "ai":
            componentResult = await complianceChecker.checkBarKeepBillAI()
            break
          case "market":
            componentResult = await complianceChecker.checkMarketDataAPIs()
            break
          case "wallet":
            componentResult = await complianceChecker.checkWalletIntegration()
            break
          case "security":
            componentResult = await complianceChecker.checkSecurityCompliance()
            break
          default:
            return NextResponse.json({ error: "Invalid component specified" }, { status: 400 })
        }

        return NextResponse.json({
          success: true,
          result: componentResult,
          message: `${component} compliance check completed`,
        })

      default:
        return NextResponse.json(
          {
            error: "Invalid action",
            available_actions: ["full_audit", "quick_check", "component_check"],
          },
          { status: 400 },
        )
    }
  } catch (error) {
    console.error("Audit API error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Audit failed",
        message: "Something went wrong during the compliance audit, partner.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const component = url.searchParams.get("component")
  const format = url.searchParams.get("format") || "json"

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
      // Return audit status and capabilities
      return NextResponse.json({
        status: "operational",
        version: "1.0.0",
        audit_id: complianceChecker.getAuditId(),
        quantum_signature: complianceChecker.getQuantumSignature(),
        available_components: ["links", "blockchain", "ai", "market", "wallet", "security"],
        available_actions: ["full_audit", "quick_check", "component_check"],
        supported_formats: ["json", "markdown", "csv"],
        last_audit: new Date().toISOString(),
      })
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "Audit service error",
        message: "Could not process audit request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
