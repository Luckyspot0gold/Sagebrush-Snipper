"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Brain,
  Link,
  GraduationCap,
  Swords,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Loader2,
  Play,
  RefreshCw,
  Download,
  Zap,
  Activity,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface VerificationResult {
  component: string
  status: "ACTIVE" | "PARTIAL" | "FAILED" | "DEGRADED"
  confidence: number
  details: Record<string, any>
  recommendations: string[]
  timestamp: string
  quantumSignature: string
}

interface VeniceReport {
  verificationId: string
  timestamp: string
  overallStatus: string
  overallConfidence: number
  results: VerificationResult[]
  recommendations: string[]
  readyForHackathon: boolean
}

const componentIcons = {
  "Venice AI Core Engine": Brain,
  "Venice AI Blockchain Bridge": Link,
  "Venice AI Learning Module": GraduationCap,
  "Venice AI Combat Integration": Swords,
  "Venice AI Market Prediction": TrendingUp,
}

const statusColors = {
  ACTIVE: "text-green-600 bg-green-50 border-green-200",
  PARTIAL: "text-yellow-600 bg-yellow-50 border-yellow-200",
  FAILED: "text-red-600 bg-red-50 border-red-200",
  DEGRADED: "text-orange-600 bg-orange-50 border-orange-200",
}

const statusIcons = {
  ACTIVE: CheckCircle,
  PARTIAL: AlertTriangle,
  FAILED: XCircle,
  DEGRADED: AlertTriangle,
}

export function VeniceAIDashboard() {
  const [veniceReport, setVeniceReport] = useState<VeniceReport | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [currentTest, setCurrentTest] = useState("")
  const [progress, setProgress] = useState(0)
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Load saved Venice AI report
    const savedReport = localStorage.getItem("venice_ai_report")
    if (savedReport) {
      try {
        setVeniceReport(JSON.parse(savedReport))
      } catch (error) {
        console.error("Failed to load saved Venice AI report:", error)
      }
    }
  }, [])

  const runFullVerification = async () => {
    setIsRunning(true)
    setProgress(0)
    setCurrentTest("Initializing Venice AI verification...")

    try {
      const components = [
        "Core AI Engine",
        "Blockchain Bridge",
        "Learning Module",
        "Combat Integration",
        "Market Prediction",
      ]

      for (let i = 0; i < components.length; i++) {
        setCurrentTest(`Testing Venice AI ${components[i]}...`)
        setProgress(((i + 1) / components.length) * 100)
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }

      const response = await fetch("/api/venice-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "full_verification" }),
      })

      const data = await response.json()

      if (data.success) {
        setVeniceReport(data.report)
        localStorage.setItem("venice_ai_report", JSON.stringify(data.report))

        toast({
          title: "🧠 Venice AI Verification Complete!",
          description: `Overall Confidence: ${data.report.overallConfidence}% | Ready: ${data.report.readyForHackathon ? "Yes" : "No"}`,
          duration: 3000,
        })
      } else {
        throw new Error(data.message || "Venice AI verification failed")
      }
    } catch (error) {
      console.error("Venice AI verification error:", error)
      toast({
        title: "❌ Venice AI Verification Failed",
        description: "Could not complete Venice AI verification",
        variant: "destructive",
      })
    } finally {
      setIsRunning(false)
      setCurrentTest("")
      setProgress(0)
    }
  }

  const runComponentTest = async (component: string) => {
    setSelectedComponent(component)

    try {
      const componentMap: Record<string, string> = {
        "Venice AI Core Engine": "core",
        "Venice AI Blockchain Bridge": "blockchain",
        "Venice AI Learning Module": "learning",
        "Venice AI Combat Integration": "combat",
        "Venice AI Market Prediction": "market",
      }

      const response = await fetch("/api/venice-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "component_check",
          component: componentMap[component],
        }),
      })

      const data = await response.json()

      if (data.success && veniceReport) {
        const updatedResults = veniceReport.results.map((result) =>
          result.component === component ? data.result : result,
        )

        const updatedReport = {
          ...veniceReport,
          results: updatedResults,
          timestamp: new Date().toISOString(),
        }

        setVeniceReport(updatedReport)
        localStorage.setItem("venice_ai_report", JSON.stringify(updatedReport))

        toast({
          title: `✅ ${component} Test Complete`,
          description: `Status: ${data.result.status} (${data.result.confidence}%)`,
        })
      }
    } catch (error) {
      toast({
        title: `❌ ${component} Test Failed`,
        description: "Could not complete component test",
        variant: "destructive",
      })
    } finally {
      setSelectedComponent(null)
    }
  }

  const downloadReport = () => {
    if (!veniceReport) return

    const reportData = {
      ...veniceReport,
      generatedBy: "WyoVerse Venice AI Verification System v1.0",
      generatedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `venice_ai_report_${veniceReport.verificationId}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "📄 Venice AI Report Downloaded",
      description: "Verification report saved successfully",
    })
  }

  const getStatusBadge = (status: string) => {
    const Icon = statusIcons[status as keyof typeof statusIcons]
    return (
      <Badge className={statusColors[status as keyof typeof statusColors]}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    )
  }

  const getOverallStatusColor = (status: string) => {
    switch (status) {
      case "FULLY_OPERATIONAL":
        return "text-green-600 bg-green-50 border-green-200"
      case "PARTIALLY_OPERATIONAL":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "DEGRADED":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "CRITICAL_ISSUES":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="newspaper-bg min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="border-4 border-black shadow-lg mb-6 newspaper-article">
          <CardHeader className="border-b-2 border-black bg-purple-900 text-white">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-3xl font-serif headline-primary text-white">
                  🧠 Venice AI Integration Dashboard
                </CardTitle>
                <CardDescription className="text-lg font-serif text-gray-200">
                  Quantum-enhanced AI verification for WyoVerse combat systems
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={runFullVerification}
                  disabled={isRunning}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isRunning ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Run Full Verification
                    </>
                  )}
                </Button>
                {veniceReport && (
                  <Button
                    onClick={downloadReport}
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-purple-900 bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>

          {/* Progress Bar */}
          {isRunning && (
            <CardContent className="p-4 newspaper-article-inner">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{currentTest}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          )}
        </Card>

        {/* Venice AI Results */}
        {veniceReport && (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Overall Status */}
                <Card className="border-4 border-black newspaper-article">
                  <CardHeader className="text-center newspaper-article-inner">
                    <CardTitle className="text-2xl font-serif headline-secondary">Venice AI Status</CardTitle>
                    <div className="text-4xl font-bold mt-4">{veniceReport.overallConfidence}%</div>
                    <div className="mt-2">
                      <Badge className={getOverallStatusColor(veniceReport.overallStatus)}>
                        {veniceReport.overallStatus.replace("_", " ")}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>

                {/* Verification Details */}
                <Card className="border-4 border-black newspaper-article">
                  <CardHeader className="newspaper-article-inner">
                    <CardTitle className="text-xl font-serif headline-secondary flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Verification Details
                    </CardTitle>
                    <div className="space-y-2 mt-4">
                      <div className="text-sm">
                        <strong>ID:</strong> {veniceReport.verificationId}
                      </div>
                      <div className="text-sm">
                        <strong>Timestamp:</strong> {new Date(veniceReport.timestamp).toLocaleString()}
                      </div>
                      <div className="text-sm">
                        <strong>Ready for Hackathon:</strong>{" "}
                        <span className={veniceReport.readyForHackathon ? "text-green-600" : "text-red-600"}>
                          {veniceReport.readyForHackathon ? "✅ Yes" : "❌ No"}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Component Summary */}
                <Card className="border-4 border-black newspaper-article">
                  <CardHeader className="newspaper-article-inner">
                    <CardTitle className="text-xl font-serif headline-secondary">Component Summary</CardTitle>
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between">
                        <span>Active:</span>
                        <span className="text-green-600 font-bold">
                          {veniceReport.results.filter((r) => r.status === "ACTIVE").length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Partial:</span>
                        <span className="text-yellow-600 font-bold">
                          {veniceReport.results.filter((r) => r.status === "PARTIAL").length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Degraded:</span>
                        <span className="text-orange-600 font-bold">
                          {veniceReport.results.filter((r) => r.status === "DEGRADED").length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Failed:</span>
                        <span className="text-red-600 font-bold">
                          {veniceReport.results.filter((r) => r.status === "FAILED").length}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>

              {/* Status Alert */}
              <Alert className={`border-4 ${getOverallStatusColor(veniceReport.overallStatus)}`}>
                <Activity className="h-4 w-4" />
                <AlertTitle className="font-serif headline-secondary">
                  {veniceReport.overallStatus === "FULLY_OPERATIONAL"
                    ? "🏆 VENICE AI FULLY OPERATIONAL"
                    : veniceReport.overallStatus === "PARTIALLY_OPERATIONAL"
                      ? "⚠️ VENICE AI PARTIALLY OPERATIONAL"
                      : veniceReport.overallStatus === "DEGRADED"
                        ? "🔧 VENICE AI DEGRADED"
                        : "❌ VENICE AI CRITICAL ISSUES"}
                </AlertTitle>
                <AlertDescription>
                  {veniceReport.overallStatus === "FULLY_OPERATIONAL"
                    ? "All Venice AI systems are operating optimally. Your crypto boxing platform is ready for hackathon submission."
                    : veniceReport.overallStatus === "PARTIALLY_OPERATIONAL"
                      ? "Most Venice AI systems are operational, but some components need attention. Review the recommendations."
                      : veniceReport.overallStatus === "DEGRADED"
                        ? "Venice AI systems are experiencing performance issues. Address degraded components."
                        : "Critical Venice AI issues detected. Address failed components immediately."}
                </AlertDescription>
              </Alert>
            </TabsContent>

            {/* Components Tab */}
            <TabsContent value="components">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {veniceReport.results.map((result, index) => {
                  const Icon = componentIcons[result.component as keyof typeof componentIcons] || Brain
                  return (
                    <Card key={index} className="border-4 border-black newspaper-article">
                      <CardHeader className="newspaper-article-inner">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-2">
                            <Icon className="w-5 h-5" />
                            <CardTitle className="text-lg font-serif headline-secondary">{result.component}</CardTitle>
                          </div>
                          {getStatusBadge(result.status)}
                        </div>
                        <div className="text-2xl font-bold mt-2">{result.confidence}%</div>
                      </CardHeader>
                      <CardContent className="newspaper-article-inner">
                        <div className="space-y-3">
                          <Progress value={result.confidence} className="h-2" />

                          {/* Component Details */}
                          <div className="text-sm space-y-1">
                            {Object.entries(result.details)
                              .slice(0, 3)
                              .map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="capitalize">{key.replace(/_/g, " ")}:</span>
                                  <span className="font-mono text-xs">
                                    {typeof value === "boolean" ? (value ? "✅" : "❌") : String(value)}
                                  </span>
                                </div>
                              ))}
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">{new Date(result.timestamp).toLocaleString()}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => runComponentTest(result.component)}
                              disabled={selectedComponent === result.component}
                              className="frontier-button"
                            >
                              {selectedComponent === result.component ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <RefreshCw className="w-3 h-3" />
                              )}
                            </Button>
                          </div>

                          {/* Quantum Signature */}
                          <div className="text-xs font-mono text-blue-600 bg-blue-50 p-2 rounded border">
                            Quantum: {result.quantumSignature.slice(0, 16)}...
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations">
              <Card className="border-4 border-black newspaper-article">
                <CardHeader className="newspaper-article-inner">
                  <CardTitle className="text-2xl font-serif headline-secondary">
                    Venice AI Optimization Recommendations
                  </CardTitle>
                  <CardDescription>Follow these recommendations to optimize your Venice AI integration</CardDescription>
                </CardHeader>
                <CardContent className="newspaper-article-inner">
                  <div className="space-y-4">
                    {veniceReport.recommendations.map((recommendation, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 border-l-4 border-purple-500 bg-purple-50"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <p className="text-sm">{recommendation}</p>
                      </div>
                    ))}
                  </div>

                  {/* Venice AI Resources */}
                  <div className="mt-8 p-4 bg-gray-50 rounded border-2 border-gray-200">
                    <h4 className="font-serif headline-secondary text-lg mb-3">🧠 Venice AI Resources</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-bold mb-2">Documentation:</h5>
                        <ul className="space-y-1 text-blue-600">
                          <li>
                            •{" "}
                            <a href="https://venice.ai/docs" className="hover:underline">
                              Venice AI API Docs
                            </a>
                          </li>
                          <li>
                            •{" "}
                            <a href="/docs/venice-integration" className="hover:underline">
                              Integration Guide
                            </a>
                          </li>
                          <li>
                            •{" "}
                            <a href="/docs/quantum-enhancement" className="hover:underline">
                              Quantum Enhancement
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-bold mb-2">Support:</h5>
                        <ul className="space-y-1 text-blue-600">
                          <li>
                            •{" "}
                            <a href="https://discord.gg/venice-ai" className="hover:underline">
                              Venice AI Discord
                            </a>
                          </li>
                          <li>
                            •{" "}
                            <a href="/community/venice" className="hover:underline">
                              Community Forum
                            </a>
                          </li>
                          <li>
                            •{" "}
                            <a href="/docs/troubleshooting" className="hover:underline">
                              Troubleshooting
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* No Report Message */}
        {!veniceReport && !isRunning && (
          <Card className="border-4 border-black newspaper-article">
            <CardContent className="text-center py-12 newspaper-article-inner">
              <Brain className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-serif headline-secondary mb-2">No Venice AI Verification Data</h3>
              <p className="text-gray-600 mb-6">
                Run a Venice AI verification to check your quantum-enhanced combat systems.
              </p>
              <Button onClick={runFullVerification} className="bg-purple-600 hover:bg-purple-700 text-white">
                <Play className="w-4 h-4 mr-2" />
                Start Venice AI Verification
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default VeniceAIDashboard
