export interface HealthCheckResult {
  service: string
  status: "healthy" | "unhealthy" | "degraded"
  latency?: number
  error?: string
  timestamp: string
}

export async function testSupabaseConnection(): Promise<HealthCheckResult> {
  const start = Date.now()
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      },
    })

    const latency = Date.now() - start

    return {
      service: "Supabase",
      status: response.ok ? "healthy" : "unhealthy",
      latency,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      service: "Supabase",
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    }
  }
}

export async function testAvalancheRPC(): Promise<HealthCheckResult> {
  const start = Date.now()
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_AVALANCHE_RPC_URL!, {
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

    const latency = Date.now() - start
    const data = await response.json()

    return {
      service: "Avalanche RPC",
      status: data.result ? "healthy" : "unhealthy",
      latency,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      service: "Avalanche RPC",
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    }
  }
}

export async function testBoltAPI(): Promise<HealthCheckResult> {
  const start = Date.now()
  try {
    // Mock Bolt API test - replace with actual Bolt health check
    const response = await fetch("/api/payments/health")
    const latency = Date.now() - start

    return {
      service: "Bolt Payments",
      status: response.ok ? "healthy" : "unhealthy",
      latency,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      service: "Bolt Payments",
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    }
  }
}

export async function runHealthChecks(): Promise<HealthCheckResult[]> {
  const checks = await Promise.all([testSupabaseConnection(), testAvalancheRPC(), testBoltAPI()])

  return checks
}
