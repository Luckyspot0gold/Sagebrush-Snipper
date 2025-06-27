import { createClient } from "@supabase/supabase-js"

interface QueryPerformanceResult {
  queryType: string
  executionTimeMs: number
  rowsExamined: number
  indexUsed: string
  planDetails: any
}

interface OptimizationReport {
  tableName: string
  beforeOptimization: QueryPerformanceResult[]
  afterOptimization: QueryPerformanceResult[]
  improvementPercentage: number
  recommendations: string[]
}

class DatabasePerformanceAnalyzer {
  private supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

  async analyzeQuery(query: string, params: any[] = []): Promise<QueryPerformanceResult> {
    const startTime = performance.now()

    try {
      // Execute EXPLAIN ANALYZE
      const explainQuery = `EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) ${query}`
      const { data: explainData, error: explainError } = await this.supabase.rpc("execute_sql", {
        sql_query: explainQuery,
        params: params,
      })

      if (explainError) throw explainError

      // Execute actual query for timing
      const { data, error } = await this.supabase.rpc("execute_sql", {
        sql_query: query,
        params: params,
      })

      if (error) throw error

      const endTime = performance.now()
      const executionTime = endTime - startTime

      // Parse explain plan
      const plan = explainData[0]?.["QUERY PLAN"]?.[0]
      const nodeType = plan?.["Node Type"] || "Unknown"
      const actualRows = plan?.["Actual Rows"] || 0
      const actualTime = plan?.["Actual Total Time"] || 0

      return {
        queryType: this.determineQueryType(query),
        executionTimeMs: actualTime || executionTime,
        rowsExamined: actualRows,
        indexUsed: nodeType.includes("Index") ? "Index Scan" : "Sequential Scan",
        planDetails: plan,
      }
    } catch (error) {
      console.error("Query analysis failed:", error)
      throw error
    }
  }

  async runPlayerStatsOptimizationTest(playerId: number): Promise<OptimizationReport> {
    const testQueries = [
      {
        name: "Single Player Lookup",
        query: "SELECT * FROM d1_player_stats WHERE player_id = $1",
        params: [playerId],
      },
      {
        name: "Player Game History",
        query: "SELECT * FROM d1_player_stats WHERE player_id = $1 ORDER BY created_at DESC LIMIT 10",
        params: [playerId],
      },
      {
        name: "Top Scores Query",
        query: "SELECT * FROM d1_player_stats WHERE score > 1000 ORDER BY score DESC LIMIT 20",
        params: [],
      },
    ]

    // Test before optimization
    console.log("Testing queries before optimization...")
    const beforeResults: QueryPerformanceResult[] = []
    for (const testQuery of testQueries) {
      const result = await this.analyzeQuery(testQuery.query, testQuery.params)
      result.queryType = testQuery.name
      beforeResults.push(result)
    }

    // Apply optimizations
    console.log("Applying database optimizations...")
    await this.applyOptimizations()

    // Test after optimization
    console.log("Testing queries after optimization...")
    const afterResults: QueryPerformanceResult[] = []
    for (const testQuery of testQueries) {
      const result = await this.analyzeQuery(testQuery.query, testQuery.params)
      result.queryType = testQuery.name
      afterResults.push(result)
    }

    // Calculate improvements
    const avgBefore = beforeResults.reduce((sum, r) => sum + r.executionTimeMs, 0) / beforeResults.length
    const avgAfter = afterResults.reduce((sum, r) => sum + r.executionTimeMs, 0) / afterResults.length
    const improvementPercentage = ((avgBefore - avgAfter) / avgBefore) * 100

    return {
      tableName: "d1_player_stats",
      beforeOptimization: beforeResults,
      afterOptimization: afterResults,
      improvementPercentage,
      recommendations: this.generateRecommendations(beforeResults, afterResults),
    }
  }

  private async applyOptimizations(): Promise<void> {
    const optimizationQueries = [
      "CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_player_stats_player_id ON d1_player_stats(player_id)",
      "CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_player_stats_score_desc ON d1_player_stats(score DESC)",
      "CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_player_stats_created_at ON d1_player_stats(created_at DESC)",
      "ANALYZE d1_player_stats",
    ]

    for (const query of optimizationQueries) {
      try {
        await this.supabase.rpc("execute_sql", { sql_query: query })
        console.log(`Applied: ${query}`)
      } catch (error) {
        console.error(`Failed to apply: ${query}`, error)
      }
    }
  }

  private determineQueryType(query: string): string {
    const lowerQuery = query.toLowerCase()
    if (lowerQuery.includes("where") && lowerQuery.includes("player_id")) {
      return "Player Lookup"
    } else if (lowerQuery.includes("order by") && lowerQuery.includes("score")) {
      return "Score Ranking"
    } else if (lowerQuery.includes("order by") && lowerQuery.includes("created_at")) {
      return "Chronological Query"
    }
    return "General Query"
  }

  private generateRecommendations(before: QueryPerformanceResult[], after: QueryPerformanceResult[]): string[] {
    const recommendations: string[] = []

    // Check for sequential scans that should use indexes
    before.forEach((result, index) => {
      if (result.indexUsed === "Sequential Scan" && after[index]?.indexUsed === "Index Scan") {
        recommendations.push(`✅ Successfully optimized ${result.queryType} with index`)
      } else if (result.indexUsed === "Sequential Scan") {
        recommendations.push(`⚠️ ${result.queryType} still using sequential scan - consider additional indexes`)
      }
    })

    // Check for performance improvements
    before.forEach((result, index) => {
      const afterResult = after[index]
      if (afterResult && result.executionTimeMs > afterResult.executionTimeMs * 2) {
        const improvement = (
          ((result.executionTimeMs - afterResult.executionTimeMs) / result.executionTimeMs) *
          100
        ).toFixed(1)
        recommendations.push(`🚀 ${result.queryType} improved by ${improvement}%`)
      }
    })

    // General recommendations
    if (recommendations.length === 0) {
      recommendations.push("Consider composite indexes for multi-column WHERE clauses")
      recommendations.push("Monitor query patterns and add indexes for frequently used filters")
      recommendations.push("Run ANALYZE regularly to keep statistics up to date")
    }

    return recommendations
  }

  async getTableStatistics(tableName: string): Promise<any> {
    const { data, error } = await this.supabase.rpc("execute_sql", {
      sql_query: `
          SELECT 
            schemaname,
            tablename,
            attname,
            n_distinct,
            correlation,
            most_common_vals,
            most_common_freqs
          FROM pg_stats 
          WHERE tablename = $1
        `,
      params: [tableName],
    })

    if (error) throw error
    return data
  }

  async getIndexUsageStats(tableName: string): Promise<any> {
    const { data, error } = await this.supabase.rpc("execute_sql", {
      sql_query: `
          SELECT 
            indexname,
            idx_scan as scans,
            idx_tup_read as tuples_read,
            idx_tup_fetch as tuples_fetched,
            CASE 
              WHEN idx_scan = 0 THEN 'UNUSED'
              WHEN idx_scan < 100 THEN 'LOW_USAGE'
              ELSE 'ACTIVE'
            END as usage_status
          FROM pg_stat_user_indexes 
          WHERE tablename = $1
          ORDER BY idx_scan DESC
        `,
      params: [tableName],
    })

    if (error) throw error
    return data
  }
}

// Export for use in components
export const dbAnalyzer = new DatabasePerformanceAnalyzer()

// CLI usage example
if (require.main === module) {
  async function runAnalysis() {
    try {
      console.log("🔍 Starting database performance analysis...")

      const report = await dbAnalyzer.runPlayerStatsOptimizationTest(123)

      console.log("\n📊 OPTIMIZATION REPORT")
      console.log("=".repeat(50))
      console.log(`Table: ${report.tableName}`)
      console.log(`Overall Improvement: ${report.improvementPercentage.toFixed(2)}%`)

      console.log("\n📈 BEFORE OPTIMIZATION:")
      report.beforeOptimization.forEach((result) => {
        console.log(`  ${result.queryType}: ${result.executionTimeMs.toFixed(2)}ms (${result.indexUsed})`)
      })

      console.log("\n🚀 AFTER OPTIMIZATION:")
      report.afterOptimization.forEach((result) => {
        console.log(`  ${result.queryType}: ${result.executionTimeMs.toFixed(2)}ms (${result.indexUsed})`)
      })

      console.log("\n💡 RECOMMENDATIONS:")
      report.recommendations.forEach((rec) => {
        console.log(`  ${rec}`)
      })
    } catch (error) {
      console.error("Analysis failed:", error)
    }
  }

  runAnalysis()
}
