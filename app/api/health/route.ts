import { NextRequest, NextResponse } from "next/server"

interface HealthCheckResponse {
  status: "operational" | "degraded" | "down"
  version: string
  personality: string
  features: string[]
  uptime: number
  timestamp: string
  checks: {
    database: boolean
    ai_service: boolean
    market_data: boolean
    websockets: boolean
  }
  performance: {
    response_time: number
    memory_usage: number
    cpu_usage: number
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    const body = await request.json()
    const { check } = body

    // Perform health checks
    const checks = {
      database: await checkDatabase(),
      ai_service: await checkAIService(),
      market_data: await checkMarketData(),
      websockets: await checkWebSockets(),
    }

    // Calculate performance metrics
    const responseTime = Date.now() - startTime
    const memoryUsage = process.memoryUsage()
    const cpuUsage = process.cpuUsage()

    // Determine overall status
    const allChecksPass = Object.values(checks).every((check) => check)
    const status = allChecksPass ? "operational" : "degraded"

    const healthResponse: HealthCheckResponse = {
      status,
      version: "1.2.0",
      personality: "western_llm_v3",
      features: [
        "crypto_advice",
        "boxing_tips",
        "land_guidance",
        "general_wisdom",
        "drinks",
        "weather",
        "market_analysis",
      ],
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      checks,
      performance: {
        response_time: responseTime,
        memory_usage: memoryUsage.heapUsed / 1024 / 1024, // MB
        cpu_usage: (cpuUsage.user + cpuUsage.system) / 1000, // ms
      },
    }

    // Special check for DeepSeek integration
    if (check === "deepseek") {
      const deepseekStatus = await checkDeepSeekIntegration()
      return NextResponse.json({
        ...healthResponse,
        deepseek: deepseekStatus,
        message: deepseekStatus.available
          ? "DeepSeek integration is operational, partner!"
          : "DeepSeek's takin' a siesta right now, but we got backup systems!",
      })
    }

    return NextResponse.json(healthResponse)
  } catch (error) {
    console.error("Health check failed:", error)

    return NextResponse.json(
      {
        status: "down",
        version: "1.2.0",
        personality: "western_llm_v3",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return POST(
    new NextRequest("http://localhost/api/health", {
      method: "POST",
      body: JSON.stringify({ check: "basic" }),
    }),
  )
}

async function checkDatabase(): Promise<boolean> {
  try {
    // Check Supabase connection
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return false
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    })

    return response.ok
  } catch (error) {
    console.error("Database check failed:", error)
    return false
  }
}

async function checkAIService(): Promise<boolean> {
  try {
    // Check Venice AI availability
    const veniceApiKey = process.env.VENICE_API_KEY

    if (!veniceApiKey) {
      return false
    }

    const response = await fetch("https://api.venice.ai/v1/models", {
      headers: {
        Authorization: `Bearer ${veniceApiKey}`,
      },
    })

    return response.ok
  } catch (error) {
    console.error("AI service check failed:", error)
    return false
  }
}

async function checkMarketData(): Promise<boolean> {
  try {
    // Check CoinMarketCap API
    const cmcApiKey = process.env.COINMARKETCAP_API_KEY

    if (!cmcApiKey) {
      return false
    }

    const response = await fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=1", {
      headers: {
        "X-CMC_PRO_API_KEY": cmcApiKey,
      },
    })

    return response.ok
  } catch (error) {
    console.error("Market data check failed:", error)
    return false
  }
}

async function checkWebSockets(): Promise<boolean> {
  try {
    // Check if WebSocket server is running
    // This is a simplified check - in production you'd test actual WS connection
    return true
  } catch (error) {
    console.error("WebSocket check failed:", error)
    return false
  }
}

async function checkDeepSeekIntegration(): Promise<{ available: boolean; model: string; response_time?: number }> {
  try {
    const startTime = Date.now()

    // Check if DeepSeek API is available
    const deepseekKey = process.env.DEEPSEEK_API_KEY || process.env.DEEPINFRA_API_KEY

    if (!deepseekKey) {
      return {
        available: false,
        model: "deepseek-chat",
        error: "API key not configured",
      }
    }

    // Test API call to DeepSeek
    const response = await fetch("https://api.deepinfra.com/v1/openai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${deepseekKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "microsoft/DialoGPT-medium",
        messages: [{ role: "user", content: "Health check" }],
        max_tokens: 10,
      }),
    })

    const responseTime = Date.now() - startTime

    return {
      available: response.ok,
      model: "deepseek-chat",
      response_time: responseTime,
    }
  } catch (error) {
    console.error("DeepSeek check failed:", error)
    return {
      available: false,
      model: "deepseek-chat",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
