"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertTriangle, Lightbulb, Trophy, Target, Zap } from "lucide-react"

export function ProjectEvaluationDashboard() {
  const strengths = [
    { item: "Unique 1880s Newspaper Theme", score: 95, status: "excellent" },
    { item: "Multi-Domain Architecture", score: 90, status: "excellent" },
    { item: "Blockchain Integration (Avalanche)", score: 85, status: "good" },
    { item: "Comprehensive Tech Stack", score: 88, status: "excellent" },
    { item: "Social Capital Innovation", score: 92, status: "excellent" },
    { item: "Multiple Game Types", score: 80, status: "good" },
    { item: "Authentic Frontier Aesthetics", score: 95, status: "excellent" },
    { item: "Real-time Market Integration", score: 75, status: "good" },
  ]

  const gaps = [
    { item: "User Onboarding Flow", priority: "high", impact: "critical" },
    { item: "Mobile Responsiveness", priority: "high", impact: "high" },
    { item: "Tutorial/Demo System", priority: "high", impact: "high" },
    { item: "Community Features", priority: "medium", impact: "high" },
    { item: "Analytics Dashboard", priority: "medium", impact: "medium" },
    { item: "Performance Optimization", priority: "medium", impact: "medium" },
    { item: "Accessibility Features", priority: "low", impact: "medium" },
    { item: "Testing Coverage", priority: "low", impact: "low" },
  ]

  const standoutFeatures = [
    { feature: "AI-Powered Frontier NPCs", impact: "Revolutionary", difficulty: "Medium" },
    { feature: "Real-time Multiplayer Tournaments", impact: "High", difficulty: "High" },
    { feature: "Historical Education Integration", impact: "Unique", difficulty: "Low" },
    { feature: "Cross-Game Achievement System", impact: "High", difficulty: "Medium" },
    { feature: "Dynamic Storytelling Engine", impact: "Revolutionary", difficulty: "High" },
    { feature: "Frontier Music & Sound System", impact: "Medium", difficulty: "Low" },
    { feature: "Social Media Integration", impact: "High", difficulty: "Low" },
    { feature: "Referral & Affiliate System", impact: "High", difficulty: "Medium" },
  ]

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 newspaper-bg">
      {/* Header */}
      <div className="text-center border-4 border-black p-6 bg-amber-50">
        <h1 className="text-4xl font-bold font-serif mb-4">🏆 WYOVERSE PROJECT EVALUATION</h1>
        <p className="text-xl font-serif italic">Comprehensive Analysis for Hackathon Excellence</p>
      </div>

      {/* Overall Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-4 border-green-600">
          <CardHeader className="bg-green-100">
            <CardTitle className="text-center font-serif">Overall Score</CardTitle>
          </CardHeader>
          <CardContent className="text-center p-6">
            <div className="text-6xl font-bold text-green-600 mb-2">87%</div>
            <Badge className="bg-green-600 text-white">EXCELLENT</Badge>
          </CardContent>
        </Card>

        <Card className="border-4 border-blue-600">
          <CardHeader className="bg-blue-100">
            <CardTitle className="text-center font-serif">Innovation Level</CardTitle>
          </CardHeader>
          <CardContent className="text-center p-6">
            <div className="text-6xl font-bold text-blue-600 mb-2">92%</div>
            <Badge className="bg-blue-600 text-white">REVOLUTIONARY</Badge>
          </CardContent>
        </Card>

        <Card className="border-4 border-purple-600">
          <CardHeader className="bg-purple-100">
            <CardTitle className="text-center font-serif">Market Potential</CardTitle>
          </CardHeader>
          <CardContent className="text-center p-6">
            <div className="text-6xl font-bold text-purple-600 mb-2">89%</div>
            <Badge className="bg-purple-600 text-white">HIGH IMPACT</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Strengths */}
      <Card className="border-4 border-black">
        <CardHeader className="bg-green-100 border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 font-serif">
            <CheckCircle className="h-6 w-6 text-green-600" />🎯 PROJECT STRENGTHS
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {strengths.map((strength, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-serif font-medium">{strength.item}</div>
                  <Progress value={strength.score} className="mt-2 h-2" />
                </div>
                <div className="ml-4">
                  <Badge
                    className={
                      strength.status === "excellent"
                        ? "bg-green-600 text-white"
                        : strength.status === "good"
                          ? "bg-blue-600 text-white"
                          : "bg-yellow-600 text-white"
                    }
                  >
                    {strength.score}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Critical Gaps */}
      <Card className="border-4 border-black">
        <CardHeader className="bg-red-100 border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 font-serif">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            ⚠️ AREAS FOR IMPROVEMENT
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gaps.map((gap, index) => (
              <div key={index} className="border-2 border-gray-300 p-4 rounded">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif font-medium">{gap.item}</h3>
                  <div className="flex gap-2">
                    <Badge
                      className={
                        gap.priority === "high"
                          ? "bg-red-600 text-white"
                          : gap.priority === "medium"
                            ? "bg-yellow-600 text-white"
                            : "bg-green-600 text-white"
                      }
                    >
                      {gap.priority.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{gap.impact} Impact</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Standout Features to Add */}
      <Card className="border-4 border-black">
        <CardHeader className="bg-yellow-100 border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 font-serif">
            <Lightbulb className="h-6 w-6 text-yellow-600" />💡 STANDOUT FEATURES TO ADD
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {standoutFeatures.map((feature, index) => (
              <div key={index} className="border-2 border-yellow-300 p-4 rounded bg-yellow-50">
                <h3 className="font-serif font-bold mb-2">{feature.feature}</h3>
                <div className="flex gap-2">
                  <Badge
                    className={
                      feature.impact === "Revolutionary"
                        ? "bg-purple-600 text-white"
                        : feature.impact === "High"
                          ? "bg-blue-600 text-white"
                          : feature.impact === "Unique"
                            ? "bg-green-600 text-white"
                            : "bg-gray-600 text-white"
                    }
                  >
                    {feature.impact}
                  </Badge>
                  <Badge variant="outline">{feature.difficulty} Effort</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hackathon Winning Strategy */}
      <Card className="border-4 border-black">
        <CardHeader className="bg-gold-100 border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 font-serif">
            <Trophy className="h-6 w-6 text-yellow-600" />🏆 HACKATHON WINNING STRATEGY
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Target className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-serif font-bold mb-2">IMMEDIATE WINS</h3>
              <ul className="text-sm font-serif space-y-1">
                <li>• Add user onboarding flow</li>
                <li>• Create demo tutorial</li>
                <li>• Optimize mobile view</li>
                <li>• Add sound effects</li>
              </ul>
            </div>

            <div className="text-center">
              <Zap className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <h3 className="font-serif font-bold mb-2">GAME CHANGERS</h3>
              <ul className="text-sm font-serif space-y-1">
                <li>• AI-powered NPCs</li>
                <li>• Real-time tournaments</li>
                <li>• Social media integration</li>
                <li>• Historical education</li>
              </ul>
            </div>

            <div className="text-center">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-gold-600" />
              <h3 className="font-serif font-bold mb-2">WINNING EDGE</h3>
              <ul className="text-sm font-serif space-y-1">
                <li>• Unique theme execution</li>
                <li>• Multi-domain innovation</li>
                <li>• Social capital system</li>
                <li>• Complete ecosystem</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Recommendation */}
      <div className="text-center border-4 border-black p-6 bg-green-50">
        <h2 className="text-3xl font-bold font-serif mb-4">🎯 FINAL VERDICT</h2>
        <p className="text-xl font-serif mb-4">
          <strong>WyoVerse is 87% ready to WIN the World's Biggest Hackathon!</strong>
        </p>
        <p className="font-serif mb-4">
          Your unique 1880s frontier theme combined with cutting-edge blockchain tech creates an unmatched experience.
          Focus on the immediate wins above to push your score to 95%+
        </p>
        <Badge className="bg-green-600 text-white text-lg px-6 py-2">HACKATHON WINNER POTENTIAL: VERY HIGH</Badge>
      </div>
    </div>
  )
}
