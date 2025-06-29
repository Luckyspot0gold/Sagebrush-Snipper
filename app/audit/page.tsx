"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Play,
  Download,
  RefreshCw,
  Shield,
  Link,
  Cpu,
  Bot,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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
  "Link Integrity": Link,
  "Blockchain Connectivity": Cpu,
  "Bar Keep Bill AI": Bot,
  "Market Data APIs": TrendingUp,
  "Wallet Integration": Wallet,
  "Security Compliance": Shield,
}

const statusColors = {
  PASS: "text-green-600 bg-green-50 border-green-200",
  FAIL: "text-red-600 bg-red-50 border-red-200",
  WARN: "text-yellow-600 bg-yellow-50 border-yellow-200",
}

const statusIcons = {
  PASS: CheckCircle,
  FAIL: XCircle,
  WARN: AlertTriangle,
}

export default function AuditPage() {
  const [auditReport, setAuditReport] = useState<AuditReport | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [currentTest, setCurrentTest] = useState("")
  const [progress, setProgress] = useState(0)
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const { toast } = useToast()

  const runFullAudit = async () => {
    setIsRunning(true)
    setProgress(0)
    setCurrentTest("Initializing Wyoming-Quantum Compliance Audit...")

    try {
      const components = [
        "Link Integrity",
        "Blockchain Connectivity",
        "Bar Keep Bill AI",
        "Market Data APIs",
        "Wallet Integration",
        "Security Compliance",
      ]

      for (let i = 0; i < components.length; i++) {
        setCurrentTest(`Testing ${components[i]}...`)
        setProgress(((i + 1) / components.length) * 100)

        // Simulate test delay for realistic progress
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }

      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "full_audit" }),
      })

      const data = await response.json()

      if (data.success) {
        setAuditReport(data.report)
        toast({
          title: "🤠 Audit Complete!",
          description: `Wyoming-Quantum Compliance Score: ${data.report.overallScore}%`,
          duration: 3000,
        })
      } else {
        throw new Error(data.message || "Audit failed")
      }
    } catch (error) {
      console.error("Audit error:", error)
      toast({
        title: "❌ Audit Failed",
        description: "Could not complete compliance audit",
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

      if (data.success) {
        // Update the specific component in the report
        if (auditReport) {
          const updatedResults = auditReport.results.map((result) =>
            result.component === component ? data.result : result,
          )

          setAuditReport({
            ...auditReport,
            results: updatedResults,
          })
        }

        toast({
          title: `✅ ${component} Test Complete`,
          description: `Status: ${data.result.status} (${data.result.score}%)`,
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
    if (!auditReport) return

    const reportData = {
      ...auditReport,
      generatedBy: "WyoVerse Quantum Audit System v1.0",
      generatedAt: new Date().toISOString(),
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

    toast({
      title: "📄 Report Downloaded",
      description: "Audit report saved successfully",
    })
  }

  const downloadMarkdownReport = () => {
    if (!auditReport) return

    const markdown = `# Wyoming-Quantum Compliance Audit Report

**Audit ID:** ${auditReport.auditId}  
**Timestamp:** ${new Date(auditReport.timestamp).toLocaleString()}  
**Overall Score:** ${auditReport.overallScore}%  
**Status:** ${auditReport.status}  
**Quantum Signature:** ${auditReport.quantumSignature}  

## Summary

${
  auditReport.status === "COMPLIANT"
    ? "🏆 **WYOMING-QUANTUM COMPLIANT**"
    : auditReport.status === "PARTIALLY_COMPLIANT"
      ? "⚠️ **PARTIALLY COMPLIANT**"
      : "❌ **NON-COMPLIANT**"
}

## Component Results

${auditReport.results
  .map(
    (result) => `
### ${result.component}

- **Status:** ${result.status}
- **Score:** ${result.score}%
- **Details:** ${result.details}
- **Timestamp:** ${new Date(result.timestamp).toLocaleString()}
`,
  )
  .join("\n")}

## Recommendations

${auditReport.recommendations.map((rec) => `- ${rec}`).join("\n")}

---
*Generated by WyoVerse Quantum Audit System v1.0*
`

    const blob = new Blob([markdown], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `wyoverse_audit_${auditReport.auditId}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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

  return (
    <div className="newspaper-bg min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="border-4 border-black shadow-lg mb-6 newspaper-article">
          <CardHeader className="border-b-2 border-black bg-blue-900 text-white">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-3xl font-serif headline-primary text-white">
                  🤠 Wyoming-Quantum Compliance Audit
                </CardTitle>
                <CardDescription className="text-lg font-serif text-gray-200">
                  Comprehensive system verification with Venice AI precision
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={runFullAudit}
                  disabled={isRunning}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isRunning ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Run Full Audit
                    </>
                  )}
                </Button>
                {auditReport && (
                  <>
                    <Button
                      onClick={downloadReport}
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-blue-900 bg-transparent"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      JSON
                    </Button>
                    <Button
                      onClick={downloadMarkdownReport}
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-blue-900 bg-transparent"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Markdown
                    </Button>
                  </>
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

        {/* Audit Results */}
        {auditReport && (
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
                    <CardTitle className="text-2xl font-serif headline-secondary">Overall Status</CardTitle>
                    <div className="text-4xl font-bold mt-4">{auditReport.overallScore}%</div>
                    <div className="mt-2">
                      {getStatusBadge(
                        auditReport.overallScore >= 90 ? "PASS" : auditReport.overallScore >= 75 ? "WARN" : "FAIL",
                      )}
                    </div>
                  </CardHeader>
                </Card>

                {/* Quantum Signature */}
                <Card className="border-4 border-black newspaper-article">
                  <CardHeader className="newspaper-article-inner">
                    <CardTitle className="text-xl font-serif headline-secondary flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Quantum Signature
                    </CardTitle>
                    <div className="font-mono text-sm break-all bg-gray-100 p-2 rounded">
                      {auditReport.quantumSignature}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">Audit ID: {auditReport.auditId}</div>
                  </CardHeader>
                </Card>

                {/* Test Summary */}
                <Card className="border-4 border-black newspaper-article">
                  <CardHeader className="newspaper-article-inner">
                    <CardTitle className="text-xl font-serif headline-secondary">Test Summary</CardTitle>
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between">
                        <span>Passed:</span>
                        <span className="text-green-600 font-bold">
                          {auditReport.results.filter((r) => r.status === "PASS").length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Warnings:</span>
                        <span className="text-yellow-600 font-bold">
                          {auditReport.results.filter((r) => r.status === "WARN").length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Failed:</span>
                        <span className="text-red-600 font-bold">
                          {auditReport.results.filter((r) => r.status === "FAIL").length}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>

              {/* Status Alert */}
              <Alert
                className={`border-4 ${
                  auditReport.status === "COMPLIANT"
                    ? "border-green-500 bg-green-50"
                    : auditReport.status === "PARTIALLY_COMPLIANT"
                      ? "border-yellow-500 bg-yellow-50"
                      : "border-red-500 bg-red-50"
                }`}
              >
                <Shield className="h-4 w-4" />
                <AlertTitle className="font-serif headline-secondary">
                  {auditReport.status === "COMPLIANT"
                    ? "🏆 WYOMING-QUANTUM COMPLIANT"
                    : auditReport.status === "PARTIALLY_COMPLIANT"
                      ? "⚠️ PARTIALLY COMPLIANT"
                      : "❌ NON-COMPLIANT"}
                </AlertTitle>
                <AlertDescription>
                  {auditReport.status === "COMPLIANT"
                    ? "All systems are operating within Wyoming-Quantum compliance standards. Your platform is ready for production deployment."
                    : auditReport.status === "PARTIALLY_COMPLIANT"
                      ? "Most systems are compliant, but some components need attention. Review the warnings and recommendations."
                      : "Critical compliance issues detected. Address failed components before deployment."}
                </AlertDescription>
              </Alert>
            </TabsContent>

            {/* Components Tab */}
            <TabsContent value="components">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {auditReport.results.map((result, index) => {
                  const Icon = componentIcons[result.component as keyof typeof componentIcons] || Shield
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
                        <div className="text-2xl font-bold mt-2">{result.score}%</div>
                      </CardHeader>
                      <CardContent className="newspaper-article-inner">
                        <p className="text-sm text-gray-600 mb-4">{result.details}</p>
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
                              <RefreshCw className="w-3 h-3 animate-spin" />
                            ) : (
                              "Retest"
                            )}
                          </Button>
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
                  <CardTitle className="text-2xl font-serif headline-secondary">Audit Recommendations</CardTitle>
                  <CardDescription>Follow these recommendations to improve your compliance score</CardDescription>
                </CardHeader>
                <CardContent className="newspaper-article-inner">
                  <div className="space-y-4">
                    {auditReport.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 border-l-4 border-blue-500 bg-blue-50">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <p className="text-sm">{recommendation}</p>
                      </div>
                    ))}
                  </div>

                  {/* Additional Resources */}
                  <div className="mt-8 p-4 bg-gray-50 rounded border-2 border-gray-200">
                    <h4 className="font-serif headline-secondary text-lg mb-3">Additional Resources</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-bold mb-2">Documentation:</h5>
                        <ul className="space-y-1 text-blue-600">
                          <li>
                            •{" "}
                            <a href="/docs/compliance" className="hover:underline">
                              Compliance Guide
                            </a>
                          </li>
                          <li>
                            •{" "}
                            <a href="/docs/security" className="hover:underline">
                              Security Best Practices
                            </a>
                          </li>
                          <li>
                            •{" "}
                            <a href="/docs/deployment" className="hover:underline">
                              Deployment Checklist
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-bold mb-2">Support:</h5>
                        <ul className="space-y-1 text-blue-600">
                          <li>
                            •{" "}
                            <a href="mailto:support@wyoverse.com" className="hover:underline">
                              Technical Support
                            </a>
                          </li>
                          <li>
                            •{" "}
                            <a href="/community" className="hover:underline">
                              Community Forum
                            </a>
                          </li>
                          <li>
                            •{" "}
                            <a href="/docs/api" className="hover:underline">
                              API Documentation
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

        {/* No Audit Message */}
        {!auditReport && !isRunning && (
          <Card className="border-4 border-black newspaper-article">
            <CardContent className="text-center py-12 newspaper-article-inner">
              <Shield className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-serif headline-secondary mb-2">No Audit Results</h3>
              <p className="text-gray-600 mb-6">
                Run a compliance audit to verify your WyoVerse platform meets all Wyoming-Quantum standards.
              </p>
              <Button onClick={runFullAudit} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Play className="w-4 h-4 mr-2" />
                Start Compliance Audit
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
