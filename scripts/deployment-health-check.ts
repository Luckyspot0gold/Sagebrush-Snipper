#!/usr/bin/env node

interface HealthCheckResult {
  service: string
  status: "healthy" | "unhealthy" | "warning"
  message: string
  timestamp: string
}

class DeploymentHealthChecker {
  private results: HealthCheckResult[] = []

  async runAllChecks(): Promise<void> {
    console.log("🔍 Running WyoVerse Health Checks...")
    console.log("=====================================")

    await this.checkEnvironmentVariables()
    await this.checkSupabaseConnection()
    await this.checkAvalancheNetwork()
    await this.checkCoinbaseIntegration()
    await this.checkAssetAvailability()
    await this.checkDatabaseSchema()

    this.generateReport()
  }

  private async checkEnvironmentVariables(): Promise<void> {
    try {
      const requiredVars = [
        "NEXT_PUBLIC_SUPABASE_URL",
        "SUPABASE_KEY",
        "NEXT_PUBLIC_AVALANCHE_RPC_URL",
        "COINBASE_API_KEY",
      ]

      const missing = requiredVars.filter((varName) => !process.env[varName])

      if (missing.length === 0) {
        this.addResult("Environment Variables", "healthy", "All required variables present")
      } else {
        this.addResult("Environment Variables", "unhealthy", `Missing: ${missing.join(", ")}`)
      }
    } catch (error) {
      this.addResult("Environment Variables", "unhealthy", `Error: ${error}`)
    }
  }

  private async checkSupabaseConnection(): Promise<void> {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      if (!supabaseUrl) {
        this.addResult("Supabase", "unhealthy", "URL not configured")
        return
      }

      const response = await fetch(`${supabaseUrl}/rest/v1/`, {
        headers: {
          apikey: process.env.SUPABASE_KEY || "",
          Authorization: `Bearer ${process.env.SUPABASE_KEY || ""}`,
        },
      })

      if (response.ok) {
        this.addResult("Supabase", "healthy", "Connection successful")
      } else {
        this.addResult("Supabase", "unhealthy", `HTTP ${response.status}`)
      }
    } catch (error) {
      this.addResult("Supabase", "unhealthy", `Connection failed: ${error}`)
    }
  }

  private async checkAvalancheNetwork(): Promise<void> {
    try {
      const rpcUrl = process.env.NEXT_PUBLIC_AVALANCHE_RPC_URL
      if (!rpcUrl) {
        this.addResult("Avalanche", "unhealthy", "RPC URL not configured")
        return
      }

      const response = await fetch(rpcUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "info.getNetworkID",
        }),
      })

      const data = await response.json()
      if (data.result) {
        this.addResult("Avalanche", "healthy", `Network ID: ${data.result}`)
      } else {
        this.addResult("Avalanche", "warning", "Network response unclear")
      }
    } catch (error) {
      this.addResult("Avalanche", "unhealthy", `Network unreachable: ${error}`)
    }
  }

  private async checkCoinbaseIntegration(): Promise<void> {
    try {
      const apiKey = process.env.COINBASE_API_KEY
      const commerceId = process.env.LUCKYSNAGBAGS_CB_ID

      if (!apiKey || !commerceId) {
        this.addResult("Coinbase", "warning", "API credentials not fully configured")
        return
      }

      // Basic validation - don't make actual API calls in health check
      this.addResult("Coinbase", "healthy", "Credentials configured")
    } catch (error) {
      this.addResult("Coinbase", "unhealthy", `Configuration error: ${error}`)
    }
  }

  private async checkAssetAvailability(): Promise<void> {
    try {
      const fs = await import("fs")
      const path = await import("path")

      const criticalAssets = [
        "public/images/crypto-classic.png",
        "public/images/frontier-days.png",
        "public/models/boxers-wolf-bear.glb",
      ]

      const missingAssets = criticalAssets.filter((asset) => !fs.existsSync(path.join(process.cwd(), asset)))

      if (missingAssets.length === 0) {
        this.addResult("Assets", "healthy", "All critical assets present")
      } else {
        this.addResult("Assets", "warning", `Missing: ${missingAssets.length} assets`)
      }
    } catch (error) {
      this.addResult("Assets", "warning", "Asset check failed")
    }
  }

  private async checkDatabaseSchema(): Promise<void> {
    try {
      // This would require actual database connection
      // For now, just check if schema file exists
      const fs = await import("fs")
      const schemaExists = fs.existsSync("scripts/create-wyoverse-schema.sql")

      if (schemaExists) {
        this.addResult("Database Schema", "healthy", "Schema file present")
      } else {
        this.addResult("Database Schema", "unhealthy", "Schema file missing")
      }
    } catch (error) {
      this.addResult("Database Schema", "warning", "Schema check failed")
    }
  }

  private addResult(service: string, status: HealthCheckResult["status"], message: string): void {
    this.results.push({
      service,
      status,
      message,
      timestamp: new Date().toISOString(),
    })
  }

  private generateReport(): void {
    console.log("\n📊 HEALTH CHECK REPORT")
    console.log("======================")

    const healthy = this.results.filter((r) => r.status === "healthy").length
    const warnings = this.results.filter((r) => r.status === "warning").length
    const unhealthy = this.results.filter((r) => r.status === "unhealthy").length

    this.results.forEach((result) => {
      const icon = result.status === "healthy" ? "✅" : result.status === "warning" ? "⚠️" : "❌"
      console.log(`${icon} ${result.service}: ${result.message}`)
    })

    console.log("\n📈 SUMMARY")
    console.log(`✅ Healthy: ${healthy}`)
    console.log(`⚠️ Warnings: ${warnings}`)
    console.log(`❌ Unhealthy: ${unhealthy}`)

    const overallStatus = unhealthy > 0 ? "CRITICAL" : warnings > 0 ? "WARNING" : "HEALTHY"

    console.log(`\n🎯 Overall Status: ${overallStatus}`)

    if (overallStatus === "HEALTHY") {
      console.log('\n🥃 "All systems are running smoother than aged whiskey!" - Bar Keep Bill')
    } else {
      console.log('\n🤠 "We got some work to do, partner. Let\'s fix these issues!" - Bar Keep Bill')
    }

    // Exit with appropriate code
    process.exit(unhealthy > 0 ? 1 : 0)
  }
}

// Run health checks if called directly
if (require.main === module) {
  const checker = new DeploymentHealthChecker()
  checker.runAllChecks().catch(console.error)
}

export { DeploymentHealthChecker }
