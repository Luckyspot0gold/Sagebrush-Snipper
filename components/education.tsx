"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const courses = [
  {
    id: "blockchain-bounties",
    title: "Blockchain Bounties",
    level: "K-12 Aligned",
    progress: 65,
    modules: ["Crypto Basics", "Smart Contracts", "DeFi Fundamentals", "NFT Creation"],
    tutor: "GPT-4 + Wolfram Alpha",
    credits: "Khan Academy Certified",
  },
  {
    id: "ranch-mba",
    title: "Ranch MBA",
    level: "Advanced",
    progress: 30,
    modules: ["Agricultural Economics", "DeFi Yield Farming", "Land Management", "Commodity Trading"],
    tutor: "AI Business Mentor",
    credits: "WGU College Credits",
  },
  {
    id: "wyoming-history",
    title: "Wyoming Digital Heritage",
    level: "All Ages",
    progress: 85,
    modules: ["Pioneer Stories", "Native American Culture", "Mining History", "Modern Wyoming"],
    tutor: "AR Historical Guide",
    credits: "State Archives Certified",
  },
]

export function Education() {
  const [selectedCourse, setSelectedCourse] = useState(null)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-amber-800 mb-2">WyoVerse Academy</h2>
        <p className="text-amber-600">Learn, Earn, and Grow in the Digital Frontier</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <Badge variant="outline">{course.level}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} />
              </div>

              <div>
                <h4 className="font-semibold mb-2">Modules:</h4>
                <div className="space-y-1">
                  {course.modules.map((module, index) => (
                    <div key={module} className="flex items-center gap-2 text-sm">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          index < Math.floor((course.modules.length * course.progress) / 100)
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      {module}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">AI Tutor:</span>
                  <span className="font-medium">{course.tutor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Credits:</span>
                  <span className="font-medium">{course.credits}</span>
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setSelectedCourse(course)}>
                {course.progress > 0 ? "Continue Learning" : "Start Course"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* NFT Diploma Showcase */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">🎓 NFT Diploma Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-purple-700 mb-6">
            Earn verifiable credentials as NFTs that prove your knowledge and skills
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-4xl mb-2">🏆</div>
              <h4 className="font-semibold">Blockchain Pioneer</h4>
              <p className="text-xs text-gray-600 mt-1">Complete Blockchain Bounties</p>
              <Badge variant="outline" className="mt-2">
                ERC-1155
              </Badge>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-4xl mb-2">🎯</div>
              <h4 className="font-semibold">Ranch Master</h4>
              <p className="text-xs text-gray-600 mt-1">Graduate Ranch MBA</p>
              <Badge variant="outline" className="mt-2">
                WGU Credits
              </Badge>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-4xl mb-2">📜</div>
              <h4 className="font-semibold">Heritage Keeper</h4>
              <p className="text-xs text-gray-600 mt-1">Master Wyoming History</p>
              <Badge variant="outline" className="mt-2">
                State Certified
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* COPPA Compliance Notice */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🛡️</div>
            <div>
              <h4 className="font-semibold text-green-800">COPPA Certified Safe Learning</h4>
              <p className="text-sm text-green-700">
                All educational content is verified safe for children under 13. Parental controls available for advanced
                features.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
