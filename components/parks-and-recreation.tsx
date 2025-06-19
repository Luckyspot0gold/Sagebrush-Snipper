"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Cloud, Fish, Mountain, Sun, Tent, ThermometerSun } from "lucide-react"
import { Progress } from "@/components/ui/progress"

type Park = {
  id: string
  name: string
  description: string
  type: "national" | "state"
  activities: string[]
  image: string
  weather: {
    temperature: number
    conditions: "sunny" | "cloudy" | "rainy" | "snowy"
    windSpeed: number
  }
}

type License = {
  id: string
  name: string
  description: string
  price: number
  duration: string
  type: "fishing" | "hunting" | "camping"
}

const parks: Park[] = [
  {
    id: "park-1",
    name: "Virtual Yellowstone",
    description:
      "Experience the world's first national park with geysers, hot springs, and diverse wildlife in a fully interactive environment.",
    type: "national",
    activities: ["hiking", "wildlife viewing", "camping", "fishing"],
    image: "/placeholder.svg?height=200&width=300",
    weather: {
      temperature: 72,
      conditions: "sunny",
      windSpeed: 5,
    },
  },
  {
    id: "park-2",
    name: "Digital Grand Teton",
    description:
      "Explore the majestic Teton Range with its stunning mountain peaks, pristine lakes, and abundant wildlife.",
    type: "national",
    activities: ["hiking", "climbing", "boating", "photography"],
    image: "/placeholder.svg?height=200&width=300",
    weather: {
      temperature: 68,
      conditions: "cloudy",
      windSpeed: 8,
    },
  },
  {
    id: "park-3",
    name: "Curt Gowdy State Park",
    description:
      "A virtual recreation of this popular state park with reservoirs, trails, and recreational opportunities.",
    type: "state",
    activities: ["mountain biking", "fishing", "hiking", "camping"],
    image: "/placeholder.svg?height=200&width=300",
    weather: {
      temperature: 75,
      conditions: "sunny",
      windSpeed: 3,
    },
  },
  {
    id: "park-4",
    name: "Hot Springs State Park",
    description: "Experience Wyoming's thermal wonders with interactive hot springs and historic bathhouse.",
    type: "state",
    activities: ["hot springs", "hiking", "bison viewing"],
    image: "/placeholder.svg?height=200&width=300",
    weather: {
      temperature: 80,
      conditions: "sunny",
      windSpeed: 2,
    },
  },
]

const licenses: License[] = [
  {
    id: "license-1",
    name: "Annual Fishing License",
    description: "Allows fishing in all WyoVerse waters for one year.",
    price: 25,
    duration: "1 year",
    type: "fishing",
  },
  {
    id: "license-2",
    name: "3-Day Fishing License",
    description: "Short-term fishing license for visitors.",
    price: 10,
    duration: "3 days",
    type: "fishing",
  },
  {
    id: "license-3",
    name: "General Hunting License",
    description: "Required for all hunting activities in the WyoVerse.",
    price: 40,
    duration: "1 season",
    type: "hunting",
  },
  {
    id: "license-4",
    name: "Camping Permit",
    description: "Allows camping in designated areas throughout WyoVerse parks.",
    price: 15,
    duration: "7 days",
    type: "camping",
  },
]

export function ParksAndRecreation() {
  const [selectedPark, setSelectedPark] = useState<Park | null>(null)
  const { toast } = useToast()

  const handlePurchaseLicense = (license: License) => {
    toast({
      title: "License Purchased",
      description: `You've successfully purchased a ${license.name}.`,
    })
  }

  const getWeatherIcon = (conditions: string) => {
    switch (conditions) {
      case "sunny":
        return <Sun className="h-6 w-6 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-6 w-6 text-gray-500" />
      case "rainy":
        return <Cloud className="h-6 w-6 text-blue-500" />
      case "snowy":
        return <Cloud className="h-6 w-6 text-blue-200" />
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 border rounded-lg">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">Weather Conditions</h3>
            <ThermometerSun className="h-5 w-5 text-primary" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span>Yellowstone</span>
              <div className="flex items-center gap-1">
                <Sun className="h-4 w-4 text-yellow-500" />
                <span>72°F</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Grand Teton</span>
              <div className="flex items-center gap-1">
                <Cloud className="h-4 w-4 text-gray-500" />
                <span>68°F</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Curt Gowdy</span>
              <div className="flex items-center gap-1">
                <Sun className="h-4 w-4 text-yellow-500" />
                <span>75°F</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">Fishing Conditions</h3>
            <Fish className="h-5 w-5 text-primary" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span>Yellowstone Lake</span>
              <span className="text-green-500">Excellent</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Snake River</span>
              <span className="text-green-500">Good</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Flaming Gorge</span>
              <span className="text-amber-500">Fair</span>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">Trail Conditions</h3>
            <Mountain className="h-5 w-5 text-primary" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span>Grand Teton Trails</span>
              <span className="text-green-500">Open</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Medicine Bow</span>
              <span className="text-green-500">Open</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Bighorn Mountains</span>
              <span className="text-amber-500">Partial</span>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">Camping Availability</h3>
            <Tent className="h-5 w-5 text-primary" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span>Yellowstone</span>
              <div className="flex items-center gap-1">
                <Progress value={75} className="h-2 w-16" />
                <span className="text-xs">75%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Grand Teton</span>
              <div className="flex items-center gap-1">
                <Progress value={90} className="h-2 w-16" />
                <span className="text-xs">90%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Curt Gowdy</span>
              <div className="flex items-center gap-1">
                <Progress value={40} className="h-2 w-16" />
                <span className="text-xs">40%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-bold mb-4">Parks & Recreation Areas</h3>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Parks</TabsTrigger>
            <TabsTrigger value="national">National Parks</TabsTrigger>
            <TabsTrigger value="state">State Parks</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {parks.map((park) => (
                <ParkCard
                  key={park.id}
                  park={park}
                  onClick={() => setSelectedPark(park)}
                  getWeatherIcon={getWeatherIcon}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="national" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {parks
                .filter((park) => park.type === "national")
                .map((park) => (
                  <ParkCard
                    key={park.id}
                    park={park}
                    onClick={() => setSelectedPark(park)}
                    getWeatherIcon={getWeatherIcon}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="state" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {parks
                .filter((park) => park.type === "state")
                .map((park) => (
                  <ParkCard
                    key={park.id}
                    park={park}
                    onClick={() => setSelectedPark(park)}
                    getWeatherIcon={getWeatherIcon}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {selectedPark && (
        <div className="border-t pt-6">
          <div className="border rounded-lg overflow-hidden">
            <div className="w-full h-64 bg-accent/10 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p className="font-medium">{selectedPark.name}</p>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedPark.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        selectedPark.type === "national" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                      }`}
                    >
                      {selectedPark.type === "national" ? "National Park" : "State Park"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 border rounded-lg">
                  {getWeatherIcon(selectedPark.weather.conditions)}
                  <div>
                    <p className="font-medium">{selectedPark.weather.temperature}°F</p>
                    <p className="text-xs text-muted-foreground">Wind: {selectedPark.weather.windSpeed} mph</p>
                  </div>
                </div>
              </div>

              <p className="mt-4">{selectedPark.description}</p>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Activities</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPark.activities.map((activity, index) => (
                    <span key={index} className="px-3 py-1 bg-accent rounded-full text-sm">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <Button>Plan Your Visit</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="border-t pt-6">
        <h3 className="text-xl font-bold mb-4">Licenses & Permits</h3>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Licenses</TabsTrigger>
            <TabsTrigger value="fishing">Fishing</TabsTrigger>
            <TabsTrigger value="hunting">Hunting</TabsTrigger>
            <TabsTrigger value="camping">Camping</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {licenses.map((license) => (
                <LicenseCard key={license.id} license={license} onPurchase={handlePurchaseLicense} />
              ))}
            </div>
          </TabsContent>

          {["fishing", "hunting", "camping"].map((type) => (
            <TabsContent key={type} value={type} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {licenses
                  .filter((license) => license.type === type)
                  .map((license) => (
                    <LicenseCard key={license.id} license={license} onPurchase={handlePurchaseLicense} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

function ParkCard({
  park,
  onClick,
  getWeatherIcon,
}: {
  park: Park
  onClick: () => void
  getWeatherIcon: (conditions: string) => React.ReactNode
}) {
  return (
    <div
      className="border rounded-lg overflow-hidden cursor-pointer hover:border-primary transition-colors"
      onClick={onClick}
    >
      <div className="w-full h-40 bg-accent/10 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p className="font-medium">{park.name}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{park.name}</h3>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              park.type === "national" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
            }`}
          >
            {park.type === "national" ? "National Park" : "State Park"}
          </span>
        </div>
        <p className="text-sm mt-2 line-clamp-2">{park.description}</p>
        <div className="mt-3 flex justify-between items-center">
          <div className="flex flex-wrap gap-1">
            {park.activities.slice(0, 3).map((activity, index) => (
              <span key={index} className="px-2 py-0.5 bg-accent rounded-full text-xs">
                {activity}
              </span>
            ))}
            {park.activities.length > 3 && (
              <span className="px-2 py-0.5 bg-accent rounded-full text-xs">+{park.activities.length - 3}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {getWeatherIcon(park.weather.conditions)}
            <span className="text-sm">{park.weather.temperature}°F</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function LicenseCard({ 
  license, 
  onPurchase 
}: { 
  license: License, 
  onPurchase: (license: License) => void 
}) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{license.name}</h3>
          <p className="text-sm text-muted-foreground">Duration: {license.duration}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          license.type === "fishing" ? "bg-blue-100 text-blue-800" :
          license.type === "hunting" ? "bg-amber-100 text-amber-800" :
          "bg-green-100 text-green-800"
