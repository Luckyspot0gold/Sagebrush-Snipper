"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle, Clock, Database, Zap } from "lucide-react"

interface QueryPerformance {
  query: string
  beforeTime: number
  afterTime: number
  scanType: string
  improvement: number
  status: "analyzing" | "optimized" | "error"
}

export default function DatabasePerformanceDashboard() {
  const [performance, setPerformance] = useState<QueryPerformance[]>([])
  const [isOptimizing, setIsOptimizing] = useState(false)

  const sampleQueries = [
    "SELECT * FROM d1_player_stats WHERE player_id = 123",
    "SELECT * FROM d1_player_stats WHERE game_date > '2024-01-01'",
    "SELECT player_id, AVG(score) FROM d1_player_stats GROUP BY player_id",
  ]

  const runOptimization = async () => {
    setIsOptimizing(true)

    // Simulate the optimization process
    for (let i = 0; i < sampleQueries.length; i++) {
      const query = sampleQueries[i]

      // Add query to performance tracking
      setPerformance((prev) => [
        ...prev,
        {
          query,
          beforeTime: Math.random() * 5 + 1, // 1-6ms
          afterTime: 0,
          scanType: "Seq Scan",
          improvement: 0,
          status: "analyzing",
        },
      ])

      // Simulate optimization delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Update with optimized results
      setPerformance((prev) =>
        prev.map((perf, index) =>
          index === i
            ? {
                ...perf,
                afterTime: Math.random() * 0.5 + 0.1, // 0.1-0.6ms
                scanType: "Index Scan",
                improvement: Math.random() * 80 + 60, // 60-140% improvement
                status: "optimized",
              }
            : perf,
        ),
      )
    }

    setIsOptimizing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2" style={{ fontFamily: "serif" }}>
            WyoVerse Database Performance Station
          </h1>
          <p className="text-lg text-amber-700" style={{ fontFamily: "serif" }}>
            "Optimizing queries faster than a frontier telegraph" - Database Bill
          </p>
        </div>

        {/* Control Panel */}
        <Card className="mb-6 border-2 border-amber-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2" style={{ fontFamily: "serif" }}>
              <Database className="h-5 w-5" />
              Query Optimization Control Panel
            </CardTitle>
            <CardDescription>Analyze and optimize your database queries for peak performance</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={runOptimization} disabled={isOptimizing} className="bg-amber-600 hover:bg-amber-700">
              {isOptimizing ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Optimizing Queries...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Run Query Optimization
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Performance Results */}
        <div className="grid gap-4">
          {performance.map((perf, index) => (
            <Card key={index} className="border-2 border-amber-200">
              <CardHeader>
                <CardTitle className="text-sm font-mono bg-gray-100 p-2 rounded">{perf.query}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Status */}
                  <div className="flex items-center gap-2">
                    {perf.status === "analyzing" && (
                      <>
                        <Clock className="h-4 w-4 animate-spin text-blue-500" />
                        <Badge variant="secondary">Analyzing</Badge>
                      </>
                    )}
                    {perf.status === "optimized" && (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <Badge className="bg-green-100 text-green-800">Optimized</Badge>
                      </>
                    )}
                    {perf.status === "error" && (
                      <>
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <Badge variant="destructive">Error</Badge>
                      </>
                    )}
                  </div>

                  {/* Performance Metrics */}
                  <div>
                    <p className="text-sm text-gray-600">Execution Time</p>
                    <p className="font-bold">
                      {perf.beforeTime.toFixed(2)}ms → {perf.afterTime.toFixed(2)}ms
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Scan Type</p>
                    <p className="font-bold">{perf.scanType}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Improvement</p>
                    {perf.improvement > 0 && (
                      <div>
                        <p className="font-bold text-green-600">+{perf.improvement.toFixed(1)}%</p>
                        <Progress value={Math.min(perf.improvement, 100)} className="mt-1" />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analysis Summary */}
        {performance.length > 0 && (
          <Card className="mt-6 border-2 border-green-300 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800" style={{ fontFamily: "serif" }}>
                Optimization Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {performance.filter((p) => p.status === "optimized").length}
                  </p>
                  <p className="text-sm text-green-700">Queries Optimized</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {performance.length > 0
                      ? (performance.reduce((acc, p) => acc + p.improvement, 0) / performance.length).toFixed(1)
                      : "0"}
                    %
                  </p>
                  <p className="text-sm text-green-700">Average Improvement</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {performance.filter((p) => p.scanType === "Index Scan").length}
                  </p>
                  <p className="text-sm text-green-700">Using Index Scans</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
