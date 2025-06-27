interface HealthCheckResult {
  service: string
  status: "healthy" | "degraded" | "unhealthy"
  latency: number
  error?: string
  details?: Record<string, any>
}

interface SystemHealth {
  overall: "healthy" | "degraded" | "unhealthy"
  services: HealthCheckResult[]
  timestamp: string
  uptime: number
}

export async function testSupabaseConnection(): Promise<HealthCheckResult> {
  const startTime = Date.now()

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
      method: "HEAD",
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      },
    })

    const latency = Date.now() - startTime

    return {
      service: "supabase",
      status: response.ok ? "healthy" : "unhealthy",
      latency,
      details: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        statusCode: response.status,
      },
    }
  } catch (error) {
    return {
      service: "supabase",
      status: "unhealthy",
      latency: Date.now() - startTime,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function testDialogflowConnection(): Promise<HealthCheckResult> {
  const startTime = Date.now()

  try {
    const response = await fetch("/api/bartender", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: "health check",
        sessionId: "health-check-session",
      }),
    })

    const latency = Date.now() - startTime
    const data = await response.json()

    return {
      service: "dialogflow",
      status: response.ok && data.reply ? "healthy" : "degraded",
      latency,
      details: {
        confidence: data.confidence,
        intent: data.intent,
        statusCode: response.status,
      },
    }
  } catch (error) {
    return {
      service: "dialogflow",
      status: "unhealthy",
      latency: Date.now() - startTime,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function testAvalancheRPC(): Promise<HealthCheckResult> {
  const startTime = Date.now()

  try {
    const rpcUrl = process.env.NEXT_PUBLIC_AVALANCHE_RPC_URL || "https://api.avax.network/ext/bc/C/rpc"

    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params: [],
        id: 1,
      }),
    })

    const latency = Date.now() - startTime
    const data = await response.json()

    return {
      service: "avalanche",
      status: response.ok && data.result ? "healthy" : "unhealthy",
      latency,
      details: {
        blockNumber: data.result,
        rpcUrl: rpcUrl,
        statusCode: response.status,
      },
    }
  } catch (error) {
    return {
      service: "avalanche",
      status: "unhealthy",
      latency: Date.now() - startTime,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function testBoltAPI(): Promise<HealthCheckResult> {
  const startTime = Date.now()

  try {
    // Mock Bolt API health check
    // In production, this would ping actual Bolt endpoints
    await new Promise((resolve) => setTimeout(resolve, 100 + Math.random() * 200))

    const latency = Date.now() - startTime
    const isHealthy = Math.random() > 0.05 // 95% uptime simulation

    return {
      service: "bolt",
      status: isHealthy ? "healthy" : "degraded",
      latency,
      details: {
        apiKey: process.env.BOLT_API_KEY ? "configured" : "missing",
        environment: process.env.NODE_ENV,
      },
    }
  } catch (error) {
    return {
      service: "bolt",
      status: "unhealthy",
      latency: Date.now() - startTime,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function testCoinbaseAPI(): Promise<HealthCheckResult> {
  const startTime = Date.now()

  try {
    const response = await fetch("https://api.coinbase.com/v2/time")
    const latency = Date.now() - startTime
    const data = await response.json()

    return {
      service: "coinbase",
      status: response.ok && data.data ? "healthy" : "unhealthy",
      latency,
      details: {
        serverTime: data.data?.iso,
        statusCode: response.status,
      },
    }
  } catch (error) {
    return {
      service: "coinbase",
      status: "unhealthy",
      latency: Date.now() - startTime,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function runHealthChecks(): Promise<SystemHealth> {
  const startTime = Date.now()

  try {
    const [supabase, dialogflow, avalanche, bolt, coinbase] = await Promise.all([
      testSupabaseConnection(),
      testDialogflowConnection(),
      testAvalancheRPC(),
      testBoltAPI(),
      testCoinbaseAPI(),
    ])

    const services = [supabase, dialogflow, avalanche, bolt, coinbase]

    // Determine overall health
    const healthyCount = services.filter((s) => s.status === "healthy").length
    const degradedCount = services.filter((s) => s.status === "degraded").length

    let overall: "healthy" | "degraded" | "unhealthy"
    if (healthyCount === services.length) {
      overall = "healthy"
    } else if (healthyCount + degradedCount >= services.length * 0.6) {
      overall = "degraded"
    } else {
      overall = "unhealthy"
    }

    return {
      overall,
      services,
      timestamp: new Date().toISOString(),
      uptime: Date.now() - startTime,
    }
  } catch (error) {
    return {
      overall: "unhealthy",
      services: [],
      timestamp: new Date().toISOString(),
      uptime: Date.now() - startTime,
    }
  }
}

// Continuous health monitoring
export class HealthMonitor {
  private interval: NodeJS.Timeout | null = null
  private callbacks: ((health: SystemHealth) => void)[] = []

  start(intervalMs = 30000) {
    if (this.interval) return

    this.interval = setInterval(async () => {
      const health = await runHealthChecks()
      this.callbacks.forEach((callback) => callback(health))
    }, intervalMs)
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  subscribe(callback: (health: SystemHealth) => void) {
    this.callbacks.push(callback)
    return () => {
      const index = this.callbacks.indexOf(callback)
      if (index > -1) {
        this.callbacks.splice(index, 1)
      }
    }
  }
}

// Export singleton instance
export const healthMonitor = new HealthMonitor()

// Utility functions for health status
export function getHealthColor(status: "healthy" | "degraded" | "unhealthy"): string {
  switch (status) {
    case "healthy":
      return "text-green-600"
    case "degraded":
      return "text-yellow-600"
    case "unhealthy":
      return "text-red-600"
  }
}

export function getHealthIcon(status: "healthy" | "degraded" | "unhealthy"): string {
  switch (status) {
    case "healthy":
      return "✅"
    case "degraded":
      return "⚠️"
    case "unhealthy":
      return "❌"
  }
}

export function formatLatency(latency: number): string {
  if (latency < 100) return `${latency}ms`
  if (latency < 1000) return `${latency}ms`
  return `${(latency / 1000).toFixed(1)}s`
}
