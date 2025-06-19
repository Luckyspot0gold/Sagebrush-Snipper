"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, GraduationCap, Building, Wind, Mountain } from "lucide-react"

const economicData = [
  { year: 2018, gdp: 38.5, unemployment: 4.1, exports: 1.8 },
  { year: 2019, gdp: 39.2, unemployment: 3.7, exports: 2.0 },
  { year: 2020, gdp: 36.8, unemployment: 5.8, exports: 1.5 },
  { year: 2021, gdp: 40.5, unemployment: 4.2, exports: 2.2 },
  { year: 2022, gdp: 43.2, unemployment: 3.3, exports: 2.5 },
  { year: 2023, gdp: 45.1, unemployment: 2.9, exports: 2.8 },
]

const educationData = [
  { year: 2018, graduationRate: 82.3, collegeEnrollment: 48.2, testScores: 76 },
  { year: 2019, graduationRate: 83.1, collegeEnrollment: 49.0, testScores: 77 },
  { year: 2020, graduationRate: 83.8, collegeEnrollment: 47.5, testScores: 78 },
  { year: 2021, graduationRate: 84.5, collegeEnrollment: 50.2, testScores: 79 },
  { year: 2022, graduationRate: 85.2, collegeEnrollment: 51.8, testScores: 81 },
  { year: 2023, graduationRate: 86.0, collegeEnrollment: 53.0, testScores: 83 },
]

const industryData = [
  { name: "Energy", value: 35 },
  { name: "Agriculture", value: 20 },
  { name: "Tourism", value: 15 },
  { name: "Manufacturing", value: 10 },
  { name: "Technology", value: 8 },
  { name: "Other", value: 12 },
]

const highlights = [
  {
    title: "Lowest Tax Burden",
    description: "Wyoming consistently ranks as having one of the lowest tax burdens in the United States.",
    icon: TrendingUp,
  },
  {
    title: "Education Excellence",
    description: "Wyoming ranks among the top states for K-12 education funding per student.",
    icon: GraduationCap,
  },
  {
    title: "Business Friendly",
    description: "Ranked as one of the most business-friendly states with minimal regulations.",
    icon: Building,
  },
  {
    title: "Renewable Energy Leader",
    description: "Wyoming is becoming a leader in wind energy production with significant growth.",
    icon: Wind,
  },
  {
    title: "Natural Resources",
    description: "Home to some of the nation's most beautiful national parks and natural resources.",
    icon: Mountain,
  },
]

export function WyomingRecords() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {highlights.map((highlight, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex items-start gap-3">
              <highlight.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium">{highlight.title}</h3>
                <p className="text-sm text-muted-foreground">{highlight.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="economic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="economic">Economic Records</TabsTrigger>
          <TabsTrigger value="education">Education Records</TabsTrigger>
          <TabsTrigger value="industry">Industry Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="economic" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Wyoming Economic Indicators</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={economicData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="gdp" name="GDP (Billion $)" stroke="#8884d8" />
                    <Line type="monotone" dataKey="unemployment" name="Unemployment Rate (%)" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="exports" name="Exports (Billion $)" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="p-3 border rounded-lg">
                  <h4 className="text-sm font-medium">GDP Growth</h4>
                  <p className="text-2xl font-bold text-green-600">+4.4%</p>
                  <p className="text-xs text-muted-foreground">Year over year</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="text-sm font-medium">Unemployment</h4>
                  <p className="text-2xl font-bold text-green-600">2.9%</p>
                  <p className="text-xs text-muted-foreground">Among lowest in US</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="text-sm font-medium">Export Growth</h4>
                  <p className="text-2xl font-bold text-green-600">+12%</p>
                  <p className="text-xs text-muted-foreground">Year over year</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Wyoming Education Metrics</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={educationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="graduationRate"
                      name="High School Graduation Rate (%)"
                      stroke="#8884d8"
                    />
                    <Line type="monotone" dataKey="collegeEnrollment" name="College Enrollment (%)" stroke="#82ca9d" />
                    <Line
                      type="monotone"
                      dataKey="testScores"
                      name="Standardized Test Scores (Percentile)"
                      stroke="#ffc658"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="p-3 border rounded-lg">
                  <h4 className="text-sm font-medium">Graduation Rate</h4>
                  <p className="text-2xl font-bold text-green-600">86%</p>
                  <p className="text-xs text-muted-foreground">Above national average</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="text-sm font-medium">College Enrollment</h4>
                  <p className="text-2xl font-bold text-green-600">53%</p>
                  <p className="text-xs text-muted-foreground">Growing steadily</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="text-sm font-medium">Test Scores</h4>
                  <p className="text-2xl font-bold text-green-600">83</p>
                  <p className="text-xs text-muted-foreground">Percentile ranking</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="industry" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Wyoming Industry Breakdown</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={industryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="Percentage of Economy" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg">
                  <h4 className="text-sm font-medium">Energy Sector Highlights</h4>
                  <ul className="mt-2 text-sm space-y-1">
                    <li>• Leading producer of coal in the United States</li>
                    <li>• Significant natural gas and oil production</li>
                    <li>• Rapidly growing wind energy sector</li>
                    <li>• Emerging uranium mining industry</li>
                  </ul>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="text-sm font-medium">Technology Growth</h4>
                  <ul className="mt-2 text-sm space-y-1">
                    <li>• Blockchain and cryptocurrency friendly legislation</li>
                    <li>• Growing data center presence</li>
                    <li>• Increasing tech startups in Cheyenne and Laramie</li>
                    <li>• University of Wyoming technology initiatives</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
