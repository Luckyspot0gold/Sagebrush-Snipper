import { createClient } from "@supabase/supabase-js"

interface QueryPerformanceResult {
  queryType: string
  executionTime: number
  planningTime: number
  totalCost: number
  actualRows: number
  scanType: string
  improvement?: number
  status: "success" | "error" | "pending"
  timestamp: string
}

interface ExplainAnalyzeResult {
  "Execution Time": number
  "Planning Time": number
  Plan: {
    "Total Cost": number
    "Actual Rows": number
    "Node Type": string
    "Actual Total Time": number
  }
}

export class DatabasePerformanceAnalyzer {
  private supabase
  private results: QueryPerformanceResult[] = []

  constructor() {
    this.supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)
  }

  async analyzeQuery(query: string, queryType: string): Promise<QueryPerformanceResult> {
    const startTime = Date.now()

    try {
      // Execute EXPLAIN ANALYZE
      const { data, error } = await this.supabase.rpc("explain_analyze_query", {
        query_text: query,
      })

      if (error) {
        console.error("Database error:", error)
        return {
          queryType,
          executionTime: 0,
          planningTime: 0,
          totalCost: 0,
          actualRows: 0,
          scanType: "Error",
          status: "error",
          timestamp: new Date().toISOString(),
        }
      }

      // Parse the EXPLAIN ANALYZE results
      const result = data[0] as ExplainAnalyzeResult

      const performanceResult: QueryPerformanceResult = {
        queryType,
        executionTime: result["Execution Time"],
        planningTime: result["Planning Time"],
        totalCost: result.Plan["Total Cost"],
        actualRows: result.Plan["Actual Rows"],
        scanType: result.Plan["Node Type"],
        status: "success",
        timestamp: new Date().toISOString(),
      }

      // Store result
      this.results.push(performanceResult)

      // Log to database
      await this.logPerformance(performanceResult)

      return performanceResult
    } catch (error) {
      console.error("Analysis error:", error)
      return {
        queryType,
        executionTime: 0,
        planningTime: 0,
        totalCost: 0,
        actualRows: 0,
        scanType: "Error",
        status: "error",
        timestamp: new Date().toISOString(),
      }
    }
  }

  async runOptimizationTest(): Promise<{
    before: QueryPerformanceResult
    after: QueryPerformanceResult
    improvement: number
  }> {
    console.log("🔍 Running database optimization test...")

    // Test query before optimization
    const beforeQuery = "SELECT * FROM d1_player_stats WHERE player_id = 123"
    const before = await this.analyzeQuery(beforeQuery, "before_optimization")

    // Apply optimizations (create indexes)
    console.log("📈 Applying database optimizations...")
    await this.applyOptimizations()

    // Test query after optimization
    const after = await this.analyzeQuery(beforeQuery, "after_optimization")

    // Calculate improvement
    const improvement =
      before.executionTime > 0 ? ((before.executionTime - after.executionTime) / before.executionTime) * 100 : 0

    after.improvement = improvement

    console.log(`✅ Optimization complete! ${improvement.toFixed(1)}% improvement`)

    return { before, after, improvement }
  }

  private async applyOptimizations(): Promise<void> {
    const optimizationQueries = [
      "CREATE INDEX IF NOT EXISTS idx_player_stats_player_id ON d1_player_stats(player_id)",
      "CREATE INDEX IF NOT EXISTS idx_player_stats_game_date ON d1_player_stats(game_date)",
      "CREATE INDEX IF NOT EXISTS idx_player_stats_composite ON d1_player_stats(player_id, game_date, season)",
      "ANALYZE d1_player_stats",
    ]

    for (const query of optimizationQueries) {
      try {
        await this.supabase.rpc("execute_sql", { sql_query: query })
        console.log(`✅ Applied: ${query.substring(0, 50)}...`)
      } catch (error) {
        console.error(`❌ Failed to apply: ${query}`, error)
      }
    }
  }

  private async logPerformance(result: QueryPerformanceResult): Promise<void> {
    try {
      await this.supabase.from("query_performance_log").insert({
        query_type: result.queryType,
        execution_time: result.executionTime,
        planning_time: result.planningTime,
        total_cost: result.totalCost,
        actual_rows: result.actualRows,
        scan_type: result.scanType,
      })
    } catch (error) {
      console.error("Failed to log performance:", error)
    }
  }

  async getPerformanceHistory(): Promise<QueryPerformanceResult[]> {
    try {
      const { data, error } = await this.supabase
        .from("query_performance_log")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50)

      if (error) throw error

      return data.map((row) => ({
        queryType: row.query_type,
        executionTime: row.execution_time,
        planningTime: row.planning_time,
        totalCost: row.total_cost,
        actualRows: row.actual_rows,
        scanType: row.scan_type,
        status: "success" as const,
        timestamp: row.created_at,
      }))
    } catch (error) {
      console.error("Failed to get performance history:", error)
      return []
    }
  }

  async getIndexUsageStats(): Promise<any[]> {
    try {
      const { data, error } = await this.supabase.rpc("get_index_usage_stats")
      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Failed to get index usage stats:", error)
      return []
    }
  }

  generateReport(): string {
    if (this.results.length === 0) {
      return "No performance data available. Run some tests first!"
    }

    const latest = this.results[this.results.length - 1]
    const improvement = latest.improvement || 0

    return `
🏆 WyoVerse Database Performance Report
=====================================

📊 Latest Query Performance:
• Execution Time: ${latest.executionTime.toFixed(3)}ms
• Planning Time: ${latest.planningTime.toFixed(3)}ms
• Total Cost: ${latest.totalCost.toFixed(2)}
• Scan Type: ${latest.scanType}
• Rows Returned: ${latest.actualRows}

${
  improvement > 0
    ? `
🚀 Performance Improvement: ${improvement.toFixed(1)}%
💡 Optimization Status: SUCCESS
`
    : ""
}

📈 Recommendations:
${latest.scanType === "Seq Scan" ? "• Add index on frequently queried columns" : "• Indexes are working effectively"}
${latest.executionTime > 1 ? "• Consider query optimization" : "• Query performance is good"}
${latest.totalCost > 100 ? "• High cost query - review execution plan" : "• Query cost is acceptable"}

Generated: ${new Date().toLocaleString()}
    `.trim()
  }

  getResults(): QueryPerformanceResult[] {
    return [...this.results]
  }

  clearResults(): void {
    this.results = []
  }
}

// Export singleton instance
export const performanceAnalyzer = new DatabasePerformanceAnalyzer()

// Example usage
export async function runPerformanceTest() {
  console.log("🎯 Starting WyoVerse database performance test...")

  const analyzer = new DatabasePerformanceAnalyzer()

  // Test various query patterns
  const testQueries = [
    {
      query: "SELECT * FROM d1_player_stats WHERE player_id = 123",
      type: "single_player_lookup",
    },
    {
      query: "SELECT * FROM d1_player_stats WHERE game_date >= '2023-01-01'",
      type: "date_range_query",
    },
    {
      query: "SELECT * FROM d1_player_stats WHERE player_id = 123 AND game_date >= '2023-01-01'",
      type: "composite_query",
    },
    {
      query: "SELECT * FROM d1_player_stats WHERE points > 20 ORDER BY points DESC LIMIT 10",
      type: "performance_query",
    },
  ]

  const results = []

  for (const test of testQueries) {
    console.log(`Testing: ${test.type}`)
    const result = await analyzer.analyzeQuery(test.query, test.type)
    results.push(result)

    // Small delay between tests
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  console.log("\n" + analyzer.generateReport())

  return results
}
