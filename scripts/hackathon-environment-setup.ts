#!/usr/bin/env tsx

import { config } from "@/lib/config/environment"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

/**
 * 🚀 HACKATHON ENVIRONMENT SETUP SCRIPT
 * Validates and configures all systems for Bar Keep Bill deployment
 */

async function validateHackathonEnvironment() {
  console.log("🤠 BAR KEEP BILL - HACKATHON ENVIRONMENT VALIDATION")
  console.log("=".repeat(60))

  const checks = [
    {
      name: "Database Connection",
      check: async () => {
        try {
          const result = await sql`SELECT NOW() as timestamp`
          return { success: true, message: `Connected at ${result[0].timestamp}` }
        } catch (error) {
          return { success: false, message: `Database error: ${error}` }
        }
      },
    },
    {
      name: "Supabase Configuration",
      check: async () => {
        const supabaseConfig = config.getSupabaseConfig()
        if (!supabaseConfig.url || !supabaseConfig.serviceKey) {
          return { success: false, message: "Missing Supabase credentials" }
        }
        return { success: true, message: "Supabase configured" }
      },
    },
    {
      name: "Coinbase API Setup",
      check: async () => {
        const coinbaseConfig = config.getCoinbaseConfig()
        if (!coinbaseConfig.apiKey || !coinbaseConfig.commerceId) {
          return { success: false, message: "Missing Coinbase credentials" }
        }
        return { success: true, message: "Coinbase ready for portfolio insights" }
      },
    },
    {
      name: "Avalanche Network",
      check: async () => {
        const avalancheConfig = config.getAvalancheConfig()
        try {
          const response = await fetch(avalancheConfig.rpcUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              jsonrpc: "2.0",
              method: "eth_blockNumber",
              params: [],
              id: 1,
            }),
          })
          const data = await response.json()
          return { success: true, message: `Connected to block ${Number.parseInt(data.result, 16)}` }
        } catch (error) {
          return { success: false, message: `Avalanche RPC error: ${error}` }
        }
      },
    },
    {
      name: "Production Readiness",
      check: async () => {
        if (!config.isHackathonReady()) {
          return { success: false, message: "Missing production configuration" }
        }
        return { success: true, message: "Ready for hackathon deployment!" }
      },
    },
  ]

  console.log("\n🔍 Running system checks...\n")

  let allPassed = true
  for (const check of checks) {
    try {
      const result = await check.check()
      const status = result.success ? "✅" : "❌"
      console.log(`${status} ${check.name}: ${result.message}`)
      if (!result.success) allPassed = false
    } catch (error) {
      console.log(`❌ ${check.name}: Unexpected error - ${error}`)
      allPassed = false
    }
  }

  console.log("\n" + "=".repeat(60))

  if (allPassed) {
    console.log("🎉 ALL SYSTEMS GO! Bar Keep Bill is ready for hackathon deployment!")
    console.log("🥃 'The saloon doors are open, partner!' - Bill")

    // Create hackathon readiness marker
    await sql`
      INSERT INTO system_status (component, status, message, timestamp)
      VALUES ('hackathon_readiness', 'ready', 'All systems validated for deployment', NOW())
      ON CONFLICT (component) DO UPDATE SET
        status = EXCLUDED.status,
        message = EXCLUDED.message,
        timestamp = EXCLUDED.timestamp
    `

    return true
  } else {
    console.log("⚠️  Some systems need attention before deployment")
    console.log("🔧 Fix the issues above and run this script again")
    return false
  }
}

async function setupHackathonDatabase() {
  console.log("\n🗄️ Setting up hackathon-specific database tables...")

  try {
    // Create system status table for monitoring
    await sql`
      CREATE TABLE IF NOT EXISTS system_status (
        component VARCHAR(100) PRIMARY KEY,
        status VARCHAR(50) NOT NULL,
        message TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create hackathon metrics table
    await sql`
      CREATE TABLE IF NOT EXISTS hackathon_metrics (
        id SERIAL PRIMARY KEY,
        metric_name VARCHAR(100) NOT NULL,
        metric_value DECIMAL(18, 8),
        metadata JSONB,
        recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Insert initial hackathon metrics
    await sql`
      INSERT INTO hackathon_metrics (metric_name, metric_value, metadata)
      VALUES 
        ('deployment_timestamp', EXTRACT(EPOCH FROM NOW()), '{"event": "hackathon_setup"}'),
        ('bill_wisdom_level', 100, '{"status": "maximum_frontier_knowledge"}'),
        ('revenue_potential', 1000000, '{"currency": "USD", "timeframe": "annual"}')
      ON CONFLICT DO NOTHING
    `

    console.log("✅ Hackathon database setup complete!")
  } catch (error) {
    console.error("❌ Database setup failed:", error)
    throw error
  }
}

// Main execution
async function main() {
  try {
    await setupHackathonDatabase()
    const isReady = await validateHackathonEnvironment()

    if (isReady) {
      console.log("\n🚀 READY TO LAUNCH HACKATHON DEPLOYMENT!")
      console.log("Run: npm run deploy:hackathon")
    } else {
      process.exit(1)
    }
  } catch (error) {
    console.error("💥 Setup failed:", error)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

export { validateHackathonEnvironment, setupHackathonDatabase }
