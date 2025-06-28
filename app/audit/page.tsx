"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Loader2,
  Download,
  RefreshCw,
  Zap,
  Activity,
  Globe,
  Wallet,
  Bot,
  TrendingUp,
  Lock,
} from "lucide-react"

interface ComplianceResult {
  component: string
  status: "PASS" | "FAIL" | "WARN"
  score: number
  details: string
  timestamp: string
  quantumSignature?: string
}

interface AuditReport {
  auditId: string
  timestamp: string
  overallScore: number
  status: "COMPLIANT" | "PARTIALLY_COMPLIANT" | "NON_COMPLIANT"
  results: ComplianceResult[]
  quantumSignature: string
  recommendations: string[]
}

const componentIcons = {
  "Link Integrity": Globe,
  "Blockchain Connectivity": Activity,
  "Bar Keep Bill AI": Bot,
  "Market Data APIs": TrendingUp,
  "Wallet Integration": Wallet,
  "Security Compliance": Lock,
}

export default function AuditPage() {
  const [auditReport, setAuditReport] = useState<AuditReport | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [lastAuditTime, setLastAuditTime] = useState<string>("")

  useEffect(() => {
    // Load last audit from localStorage
    const savedAudit = localStorage.getItem("wyoverse_audit")
    if (savedAudit) {
      try {
        const parsed = JSON.parse(savedAudit)
        setAuditReport(parsed)
        setLastAuditTime(parsed.timestamp)
      } catch (error) {
        console.error("Failed to load saved audit:", error)
      }
    }
  }, [])

  const runFullAudit = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "full_audit" }),
      })

      const data = await response.json()

      if (data.success) {
        setAuditReport(data.report)
        setLastAuditTime(data.report.timestamp)
        localStorage.setItem("wyoverse_audit", JSON.stringify(data.report))
      } else {
        throw new Error(data.message || "Audit failed")
      }
    } catch (error) {
      console.error("Audit failed:", error)
      alert("Audit failed: " + (error instanceof Error ? error.message : "Unknown error"))
    } finally {
      setLoading(false)
    }
  }

  const runQuickCheck = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "quick_check" }),
      })

      const data = await response.json()

      if (data.success) {
        // Update only the checked components
        if (auditReport) {
          const updatedResults = auditReport.results.map((result) => {
            const quickResult = data.results.find((r: ComplianceResult) => r.component === result.component)
            return quickResult || result
          })

          const updatedReport = {
            ...auditReport,
            results: updatedResults,
            timestamp: new Date().toISOString(),
          }

          setAuditReport(updatedReport)
          localStorage.setItem("wyoverse_audit", JSON.stringify(updatedReport))
        }
      }
    } catch (error) {
      console.error("Quick check failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const checkComponent = async (component: string) => {
    setLoading(true)
    setSelectedComponent(component)

    try {
      const componentMap: Record<string, string> = {
        "Link Integrity": "links",
        "Blockchain Connectivity": "blockchain",
        "Bar Keep Bill AI": "ai",
        "Market Data APIs": "market",
        "Wallet Integration": "wallet",
        "Security Compliance": "security",
      }

      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "component_check",
          component: componentMap[component],
        }),
      })

      const data = await response.json()

      if (data.success && auditReport) {
        const updatedResults = auditReport.results.map((result) =>
          result.component === component ? data.result : result,
        )

        const updatedReport = {
          ...auditReport,
          results: updatedResults,
          timestamp: new Date().toISOString(),
        }

        setAuditReport(updatedReport)
        localStorage.setItem("wyoverse_audit", JSON.stringify(updatedReport))
      }
    } catch (error) {
      console.error("Component check failed:", error)
    } finally {
      setLoading(false)
      setSelectedComponent(null)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PASS":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "WARN":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "FAIL":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Activity className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PASS":
        return "bg-green-100 text-green-800"
      case "WARN":
        return "bg-yellow-100 text-yellow-800"
      case "FAIL":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const downloadReport = () => {
    if (!auditReport) return

    const reportData = {
      ...auditReport,
      generatedAt: new Date().toISOString(),
      format: "JSON",
    }

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `wyoverse_audit_${auditReport.auditId}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-amber-900 mb-2">🤠 Wyoming-Quantum Compliance Audit</h1>
        <p className="text-lg text-amber-700">Comprehensive system verification with Venice AI precision</p>
        {lastAuditTime && (
          <p className="text-sm text-gray-600 mt-2">Last audit: {new Date(lastAuditTime).toLocaleString()}</p>
        )}
      </div>

      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-6 w-6" />
            Audit Control Panel
          </CardTitle>
          <CardDescription>Run comprehensive compliance checks on all WyoVerse systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={runFullAudit} disabled={loading} className="bg-amber-600 hover:bg-amber-700">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
              Run Full Audit
            </Button>

            <Button onClick={runQuickCheck} disabled={loading} variant="outline">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
              Quick Check
            </Button>

            {auditReport && (
              <Button onClick={downloadReport} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Audit Results */}
      {auditReport && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Overall Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Overall Compliance Status</span>
                  <Badge className={getStatusColor(auditReport.status)}>{auditReport.status.replace("_", " ")}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Overall Score</span>
                      <span className="text-2xl font-bold">{auditReport.overallScore}%</span>
                    </div>
                    <Progress value={auditReport.overallScore} className="h-3" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {auditReport.results.filter((r) => r.status === "PASS").length}
                      </div>
                      <div className="text-sm text-gray-600">Passed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {auditReport.results.filter((r) => r.status === "WARN").length}
                      </div>
                      <div className="text-sm text-gray-600">Warnings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {auditReport.results.filter((r) => r.status === "FAIL").length}
                      </div>
                      <div className="text-sm text-gray-600">Failed</div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm font-medium text-blue-900">Quantum Signature</div>
                    <div className="font-mono text-xs text-blue-700 break-all">{auditReport.quantumSignature}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="components" className="space-y-4">
            {auditReport.results.map((result, index) => {
              const IconComponent = componentIcons[result.component as keyof typeof componentIcons] || Activity
              const isChecking = loading && selectedComponent === result.component

              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <IconComponent className="mr-2 h-5 w-5" />
                        {result.component}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(result.status)}>{result.status}</Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => checkComponent(result.component)}
                          disabled={loading}
                        >
                          {isChecking ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <RefreshCw className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Score</span>
                        <span className="text-lg font-bold">{result.score}%</span>
                      </div>
                      <Progress value={result.score} className="h-2" />

                      <div className="text-sm text-gray-600">
                        <strong>Details:</strong> {result.details}
                      </div>

                      <div className="text-xs text-gray-500">
                        Last checked: {new Date(result.timestamp).toLocaleString()}
                      </div>

                      {result.quantumSignature && (
                        <div className="text-xs font-mono text-blue-600 bg-blue-50 p-2 rounded">
                          Quantum: {result.quantumSignature}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Audit Recommendations</CardTitle>
                <CardDescription>Action items to improve system compliance and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {auditReport.recommendations.map((recommendation, index) => (
                    <Alert key={index}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{recommendation}</AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audit Metadata</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Audit ID:</strong> {auditReport.auditId}
                  </div>
                  <div>
                    <strong>Timestamp:</strong> {new Date(auditReport.timestamp).toLocaleString()}
                  </div>
                  <div className="md:col-span-2">
                    <strong>Quantum Signature:</strong>
                    <div className="font-mono text-xs bg-gray-100 p-2 rounded mt-1 break-all">
                      {auditReport.quantumSignature}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* No Audit Message */}
      {!auditReport && !loading && (
        <Card>
          <CardContent className="p-12 text-center">
            <Shield className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold mb-2">No Audit Data Available</h3>
            <p className="text-gray-600 mb-6">Run your first Wyoming-Quantum Compliance Audit to get started</p>
            <Button onClick={runFullAudit} className="bg-amber-600 hover:bg-amber-700">
              <Zap className="mr-2 h-4 w-4" />
              Run First Audit
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
