"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Activity, Database, Zap, TrendingUp, Clock, Target } from "lucide-react"

interface QueryResult {
  queryType: string
  executionTimeMs: number
  rowsExamined: number
  indexUsed: string
  planDetails: any
}

interface OptimizationReport {
  tableName: string
  beforeOptimization: QueryResult[]
  afterOptimization: QueryResult[]
  improvementPercentage: number
  recommendations: string[]
}

export function DatabasePerformanceDashboard() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [report, setReport] = useState<OptimizationReport | null>(null)
  const [selectedPlayerId, setSelectedPlayerId] = useState(123)
  const [indexStats, setIndexStats] = useState<any[]>([])
  const [tableStats, setTableStats] = useState<any[]>([])

  const runPerformanceAnalysis = async () => {
    setIsAnalyzing(true)
    try {
      // Simulate the database analysis
      const mockReport: OptimizationReport = {
        tableName: "d1_player_stats",
        beforeOptimization: [
          {
            queryType: "Single Player Lookup",
            executionTimeMs: 1.678,
            rowsExamined: 1000,
            indexUsed: "Sequential Scan",
            planDetails: { cost: 25.0, rows: 1 },
          },
          {
            queryType: "Player Game History",
            executionTimeMs: 3.245,
            rowsExamined: 1000,
            indexUsed: "Sequential Scan",
            planDetails: { cost: 45.0, rows: 10 },
          },
          {
            queryType: "Top Scores Query",
            executionTimeMs: 5.123,
            rowsExamined: 1000,
            indexUsed: "Sequential Scan",
            planDetails: { cost: 65.0, rows: 20 },
          },
        ],
        afterOptimization: [
          {
            queryType: "Single Player Lookup",
            executionTimeMs: 0.045,
            rowsExamined: 1,
            indexUsed: "Index Scan",
            planDetails: { cost: 8.3, rows: 1 },
          },
          {
            queryType: "Player Game History",
            executionTimeMs: 0.123,
            rowsExamined: 10,
            indexUsed: "Index Scan",
            planDetails: { cost: 12.5, rows: 10 },
          },
          {
            queryType: "Top Scores Query",
            executionTimeMs: 0.234,
            rowsExamined: 20,
            indexUsed: "Index Scan",
            planDetails: { cost: 18.7, rows: 20 },
          },
        ],
        improvementPercentage: 96.8,
        recommendations: [
          "✅ Successfully optimized Single Player Lookup with player_id index",
          "✅ Successfully optimized Player Game History with composite index",
          "✅ Successfully optimized Top Scores Query with score index",
          "🚀 Single Player Lookup improved by 97.3%",
          "🚀 Player Game History improved by 96.2%",
          "🚀 Top Scores Query improved by 95.4%",
        ],
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setReport(mockReport)

      // Mock index statistics
      setIndexStats([
        { indexname: "idx_player_stats_player_id", scans: 1250, usage_status: "ACTIVE" },
        { indexname: "idx_player_stats_score_desc", scans: 890, usage_status: "ACTIVE" },
        { indexname: "idx_player_stats_created_at", scans: 456, usage_status: "ACTIVE" },
        { indexname: "idx_player_stats_composite", scans: 234, usage_status: "LOW_USAGE" },
      ])

      setTableStats([
        { attname: "player_id", n_distinct: 500, correlation: 0.95 },
        { attname: "score", n_distinct: 1000, correlation: -0.12 },
        { attname: "game_id", n_distinct: 50, correlation: 0.34 },
        { attname: "created_at", n_distinct: 800, correlation: 0.89 },
      ])
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const chartData = report
    ? report.beforeOptimization.map((before, index) => ({
        name: before.queryType.replace(" Query", "").replace(" Lookup", ""),
        before: before.executionTimeMs,
        after: report.afterOptimization[index]?.executionTimeMs || 0,
        improvement:
          ((before.executionTimeMs - (report.afterOptimization[index]?.executionTimeMs || 0)) /
            before.executionTimeMs) *
          100,
      }))
    : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      {/* Newspaper Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center border-b-4 border-amber-800 pb-4 mb-6">
          <h1 className="text-5xl font-bold text-amber-900 mb-2" style={{ fontFamily: "serif" }}>
            THE WYOVERSE TELEGRAPH
          </h1>
          <p className="text-lg text-amber-700" style={{ fontFamily: "serif" }}>
            Database Performance Bureau • Established 1880 • "Speed Through Science"
          </p>
          <div className="flex justify-center items-center gap-4 mt-2">
            <span className="text-sm text-amber-600">Vol. CXLIV, No. 1</span>
            <span className="text-sm text-amber-600">•</span>
            <span className="text-sm text-amber-600">{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-amber-900 mb-2" style={{ fontFamily: "serif" }}>
            FRONTIER DATABASE OPTIMIZATION STATION
          </h2>
          <p className="text-lg text-amber-700" style={{ fontFamily: "serif" }}>
            "Turning Slow Queries into Lightning Fast Lookups Since the Digital Gold Rush"
          </p>
        </div>

        {/* Control Panel */}
        <Card className="mb-6 border-2 border-amber-800">
          <CardHeader className="bg-amber-100">
            <CardTitle className="flex items-center gap-2 text-amber-900" style={{ fontFamily: "serif" }}>
              <Database className="h-5 w-5" />
              Telegraph Control Station
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-amber-800">Player ID to Test:</label>
                <input
                  type="number"
                  value={selectedPlayerId}
                  onChange={(e) => setSelectedPlayerId(Number(e.target.value))}
                  className="w-24 px-2 py-1 border border-amber-300 rounded"
                />
              </div>
              <Button
                onClick={runPerformanceAnalysis}
                disabled={isAnalyzing}
                className="bg-amber-700 hover:bg-amber-800 text-white"
              >
                {isAnalyzing ? (
                  <>
                    <Activity className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing Telegraph Lines...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Test Database Performance
                  </>
                )}
              </Button>
            </div>

            {isAnalyzing && (
              <div className="space-y-2">
                <div className="text-sm text-amber-700">Running frontier database analysis...</div>
                <Progress value={66} className="w-full" />
                <div className="text-xs text-amber-600">Testing query speeds across the digital frontier...</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {report && (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-amber-100">
              <TabsTrigger value="overview" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
                Telegraph Report
              </TabsTrigger>
              <TabsTrigger
                value="performance"
                className="data-[state=active]:bg-amber-700 data-[state=active]:text-white"
              >
                Speed Charts
              </TabsTrigger>
              <TabsTrigger value="indexes" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
                Index Usage
              </TabsTrigger>
              <TabsTrigger
                value="recommendations"
                className="data-[state=active]:bg-amber-700 data-[state=active]:text-white"
              >
                Frontier Wisdom
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Performance Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-2 border-amber-800">
                  <CardHeader className="bg-amber-100">
                    <CardTitle className="flex items-center gap-2 text-amber-900" style={{ fontFamily: "serif" }}>
                      <TrendingUp className="h-5 w-5" />
                      Speed Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {report.improvementPercentage.toFixed(1)}%
                    </div>
                    <p className="text-sm text-amber-700">Faster than a frontier telegraph</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-amber-800">
                  <CardHeader className="bg-amber-100">
                    <CardTitle className="flex items-center gap-2 text-amber-900" style={{ fontFamily: "serif" }}>
                      <Clock className="h-5 w-5" />
                      Average Query Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {(
                        report.afterOptimization.reduce((sum, r) => sum + r.executionTimeMs, 0) /
                        report.afterOptimization.length
                      ).toFixed(3)}
                      ms
                    </div>
                    <p className="text-sm text-amber-700">Lightning fast responses</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-amber-800">
                  <CardHeader className="bg-amber-100">
                    <CardTitle className="flex items-center gap-2 text-amber-900" style={{ fontFamily: "serif" }}>
                      <Target className="h-5 w-5" />
                      Queries Optimized
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-purple-600 mb-2">{report.afterOptimization.length}</div>
                    <p className="text-sm text-amber-700">All systems optimized</p>
                  </CardContent>
                </Card>
              </div>

              {/* Before/After Comparison */}
              <Card className="border-2 border-amber-800">
                <CardHeader className="bg-amber-100">
                  <CardTitle className="text-amber-900" style={{ fontFamily: "serif" }}>
                    Telegraph Speed Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {report.beforeOptimization.map((before, index) => {
                      const after = report.afterOptimization[index]
                      const improvement =
                        ((before.executionTimeMs - after.executionTimeMs) / before.executionTimeMs) * 100

                      return (
                        <div key={before.queryType} className="border border-amber-200 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-amber-900">{before.queryType}</h4>
                            <Badge variant={improvement > 90 ? "default" : improvement > 50 ? "secondary" : "outline"}>
                              {improvement.toFixed(1)}% faster
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-red-600 font-medium">Before: </span>
                              {before.executionTimeMs.toFixed(3)}ms ({before.indexUsed})
                            </div>
                            <div>
                              <span className="text-green-600 font-medium">After: </span>
                              {after.executionTimeMs.toFixed(3)}ms ({after.indexUsed})
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <Card className="border-2 border-amber-800">
                <CardHeader className="bg-amber-100">
                  <CardTitle className="text-amber-900" style={{ fontFamily: "serif" }}>
                    Query Performance Telegraph Chart
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="before" fill="#dc2626" name="Before (ms)" />
                      <Bar dataKey="after" fill="#16a34a" name="After (ms)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="indexes" className="space-y-6">
              <Card className="border-2 border-amber-800">
                <CardHeader className="bg-amber-100">
                  <CardTitle className="text-amber-900" style={{ fontFamily: "serif" }}>
                    Index Usage Telegraph Report
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {indexStats.map((index, i) => (
                      <div key={i} className="flex justify-between items-center p-3 border border-amber-200 rounded">
                        <div>
                          <div className="font-medium text-amber-900">{index.indexname}</div>
                          <div className="text-sm text-amber-600">{index.scans} scans performed</div>
                        </div>
                        <Badge
                          variant={
                            index.usage_status === "ACTIVE"
                              ? "default"
                              : index.usage_status === "LOW_USAGE"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {index.usage_status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Card className="border-2 border-amber-800">
                <CardHeader className="bg-amber-100">
                  <CardTitle className="text-amber-900" style={{ fontFamily: "serif" }}>
                    Frontier Database Wisdom
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {report.recommendations.map((rec, index) => (
                      <Alert key={index} className="border-amber-200">
                        <AlertDescription className="text-amber-800">{rec}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
