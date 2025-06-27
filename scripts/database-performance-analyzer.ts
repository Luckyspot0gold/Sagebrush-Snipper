#!/usr/bin/env tsx

import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

/**
 * WyoVerse Database Performance Analyzer
 * Analyzes query performance and suggests optimizations
 */

interface QueryAnalysis {
  query: string
  executionTime: number
  planningTime: number
  scanType: string
  rowsFiltered: number
  suggestions: string[]
}

async function analyzeQuery(query: string): Promise<QueryAnalysis> {
  console.log("🔍 Analyzing query performance...")
  console.log(`Query: ${query}`)

  try {
    // Run EXPLAIN ANALYZE
    const explainQuery = `EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) ${query}`
    const result = await sql(explainQuery)

    const plan = result[0]["QUERY PLAN"][0]
    const execution = plan["Execution Time"]
    const planning = plan["Planning Time"]

    // Extract scan type and performance metrics
    const scanType = plan["Node Type"]
    const actualRows = plan["Actual Rows"] || 0
    const rowsRemoved = plan["Rows Removed by Filter"] || 0

    // Generate optimization suggestions
    const suggestions: string[] = []

    if (scanType === "Seq Scan") {
      suggestions.push("🚀 Add an index on the filtered column(s)")
      suggestions.push("📊 Consider composite indexes for multi-column filters")
    }

    if (rowsRemoved > actualRows * 10) {
      suggestions.push("⚡ High filter ratio - index will significantly improve performance")
    }

    if (execution > 1.0) {
      suggestions.push("🎯 Query execution time > 1ms - optimization recommended")
    }

    return {
      query,
      executionTime: execution,
      planningTime: planning,
      scanType,
      rowsFiltered: rowsRemoved,
      suggestions,
    }
  } catch (error) {
    console.error("❌ Query analysis failed:", error)
    throw error
  }
}

async function optimizePlayerStatsTable() {
  console.log("🤠 WyoVerse Database Optimization - Player Stats")
  console.log("=".repeat(60))

  // Test the problematic query
  const testQuery = "SELECT * FROM d1_player_stats WHERE player_id = 123"

  console.log("\n📋 BEFORE Optimization:")
  const beforeAnalysis = await analyzeQuery(testQuery)

  console.log(`⏱️  Execution Time: ${beforeAnalysis.executionTime}ms`)
  console.log(`🧠 Planning Time: ${beforeAnalysis.planningTime}ms`)
  console.log(`🔍 Scan Type: ${beforeAnalysis.scanType}`)
  console.log(`🗑️  Rows Filtered: ${beforeAnalysis.rowsFiltered}`)

  // Apply optimizations
  console.log("\n🔧 Applying optimizations...")

  try {
    // Create the index
    await sql`
      CREATE INDEX IF NOT EXISTS idx_d1_player_stats_player_id 
      ON d1_player_stats(player_id)
    `
    console.log("✅ Created index on player_id")

    // Update statistics
    await sql`ANALYZE d1_player_stats`
    console.log("✅ Updated table statistics")

    // Test again
    console.log("\n📋 AFTER Optimization:")
    const afterAnalysis = await analyzeQuery(testQuery)

    console.log(`⏱️  Execution Time: ${afterAnalysis.executionTime}ms`)
    console.log(`🧠 Planning Time: ${afterAnalysis.planningTime}ms`)
    console.log(`🔍 Scan Type: ${afterAnalysis.scanType}`)
    console.log(`🗑️  Rows Filtered: ${afterAnalysis.rowsFiltered}`)

    // Calculate improvement
    const speedImprovement = (
      ((beforeAnalysis.executionTime - afterAnalysis.executionTime) / beforeAnalysis.executionTime) *
      100
    ).toFixed(1)

    console.log("\n🎉 OPTIMIZATION RESULTS:")
    console.log(`🚀 Speed Improvement: ${speedImprovement}%`)
    console.log(`📈 Scan Type Changed: ${beforeAnalysis.scanType} → ${afterAnalysis.scanType}`)

    if (afterAnalysis.scanType.includes("Index")) {
      console.log("✨ SUCCESS: Query now uses index scan!")
    }
  } catch (error) {
    console.error("❌ Optimization failed:", error)
  }
}

async function checkIndexUsage() {
  console.log("\n📊 Index Usage Statistics:")

  try {
    const indexStats = await sql`
      SELECT 
        schemaname,
        tablename,
        indexname,
        idx_scan as index_scans,
        idx_tup_read as tuples_read,
        idx_tup_fetch as tuples_fetched
      FROM pg_stat_user_indexes 
      WHERE tablename = 'd1_player_stats'
      ORDER BY idx_scan DESC
    `

    console.table(indexStats)

    const tableSize = await sql`
      SELECT 
        pg_size_pretty(pg_total_relation_size('d1_player_stats'::regclass)) as total_size,
        pg_size_pretty(pg_relation_size('d1_player_stats'::regclass)) as table_size,
        pg_size_pretty(pg_total_relation_size('d1_player_stats'::regclass) - pg_relation_size('d1_player_stats'::regclass)) as index_size
    `

    console.log("\n💾 Storage Usage:")
    console.table(tableSize)
  } catch (error) {
    console.error("❌ Failed to get index statistics:", error)
  }
}

// Main execution
async function main() {
  try {
    await optimizePlayerStatsTable()
    await checkIndexUsage()

    console.log("\n🎯 Optimization complete! Your queries should now be much faster.")
    console.log("🔍 Run the same EXPLAIN ANALYZE query to see the improvement.")
  } catch (error) {
    console.error("💥 Optimization script failed:", error)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

export { analyzeQuery, optimizePlayerStatsTable }
