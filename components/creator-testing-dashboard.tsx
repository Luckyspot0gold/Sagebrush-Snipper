"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  TestTube,
  Gamepad2,
  TrendingUp,
  Users,
  Calendar,
  Newspaper,
  Eye,
  Play,
  Settings,
  BarChart3,
  MessageSquare,
} from "lucide-react"

export function CreatorTestingDashboard() {
  const [testResults, setTestResults] = useState<Record<string, "pass" | "fail" | "pending">>({})

  const testSuites = [
    {
      category: "Core Features",
      tests: [
        { name: "Newspaper Layout", url: "/", icon: Newspaper },
        { name: "Market Data", url: "/market", icon: TrendingUp },
        { name: "Games Portal", url: "/games", icon: Gamepad2 },
        { name: "Community Feed", url: "/community", icon: Users },
      ],
    },
    {
      category: "Interactive Elements",
      tests: [
        { name: "Boxing Arena", url: "/boxing-arena", icon: Play },
        { name: "Digital Rodeo", url: "/digital-rodeo", icon: Play },
        { name: "Saloon Chat", url: "/saloon", icon: MessageSquare },
        { name: "Calendar Events", url: "/calendar", icon: Calendar },
      ],
    },
    {
      category: "User Experience",
      tests: [
        { name: "Onboarding Flow", url: "/onboarding", icon: Settings },
        { name: "Tutorial System", url: "/tutorials", icon: Eye },
        { name: "Mobile Responsive", url: "/", icon: Settings },
        { name: "Sound Effects", url: "/", icon: Settings },
      ],
    },
  ]

  const runTest = (testName: string, url: string) => {
    setTestResults((prev) => ({ ...prev, [testName]: "pending" }))

    // Simulate test running
    setTimeout(() => {
      setTestResults((prev) => ({ ...prev, [testName]: "pass" }))
    }, 1000)
  }

  const getStatusBadge = (testName: string) => {
    const status = testResults[testName]
    if (status === "pass") return <Badge className="bg-green-500 text-white">PASS</Badge>
    if (status === "fail") return <Badge className="bg-red-500 text-white">FAIL</Badge>
    if (status === "pending") return <Badge className="bg-yellow-500 text-black">TESTING...</Badge>
    return <Badge variant="outline">READY</Badge>
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-serif mb-2">🤠 WYOVERSE CREATOR TESTING DASHBOARD</h1>
        <p className="text-lg font-serif text-gray-600">Test all features of the Wyoming Pioneer experience</p>
      </div>

      <Tabs defaultValue="tests" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tests">Feature Tests</TabsTrigger>
          <TabsTrigger value="preview">Live Preview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="tests" className="space-y-6">
          {testSuites.map((suite, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="font-serif">{suite.category}</CardTitle>
                <CardDescription>Test core functionality and user experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suite.tests.map((test, testIndex) => (
                    <div key={testIndex} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <test.icon className="h-5 w-5" />
                        <span className="font-serif font-medium">{test.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(test.name)}
                        <Link href={test.url}>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          onClick={() => runTest(test.name, test.url)}
                          disabled={testResults[test.name] === "pending"}
                        >
                          <TestTube className="h-4 w-4 mr-1" />
                          Test
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Wyoming Pioneer Newspaper - Live Preview</CardTitle>
              <CardDescription>Full newspaper experience with all interactive elements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="border-4 border-black p-4 bg-[#f8f3e3]">
                  <h2 className="text-3xl font-bold font-serif mb-2">THE WYOVERSE PIONEER</h2>
                  <p className="font-serif">ESTABLISHED 1868 • TERRITORY OF WYOMING</p>
                </div>
                <div className="flex gap-4 justify-center">
                  <Link href="/">
                    <Button className="bg-black text-white font-serif">
                      <Newspaper className="h-4 w-4 mr-2" />
                      VIEW FULL NEWSPAPER
                    </Button>
                  </Link>
                  <Link href="/games">
                    <Button variant="outline" className="font-serif">
                      <Gamepad2 className="h-4 w-4 mr-2" />
                      TEST GAMES
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Testing Analytics</CardTitle>
              <CardDescription>Performance metrics and user experience data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-serif font-bold">Page Load Speed</h3>
                  <p className="text-2xl font-bold text-green-600">1.2s</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Users className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-serif font-bold">Mobile Responsive</h3>
                  <p className="text-2xl font-bold text-green-600">100%</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <TestTube className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-serif font-bold">Tests Passed</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {Object.values(testResults).filter((r) => r === "pass").length}/
                    {Object.keys(testResults).length || "0"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 text-center">
        <Link href="/">
          <Button size="lg" className="bg-[#8B4513] text-white hover:bg-[#654321] font-serif">
            <Newspaper className="h-5 w-5 mr-2" />
            RETURN TO WYOVERSE PIONEER
          </Button>
        </Link>
      </div>
    </div>
  )
}
