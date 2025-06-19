"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Wind, Droplet, Flame, Mountain, Zap } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"

type EnergySource = {
  id: string
  name: string
  production: number
  price: number
  change: number
  trend: number[]
  color: string
  icon: "wind" | "water" | "gas" | "mineral" | "electric"
}

const energySources: EnergySource[] = [
  {
    id: "energy-1",
    name: "Wind Power",
    production: 42,
    price: 0.045,
    change: 2.3,
    trend: [40, 41, 39, 40, 42, 43, 42],
    color: "#4ade80",
    icon: "wind",
  },
  {
    id: "energy-2",
    name: "Oil & Gas",
    production: 35,
    price: 3.75,
    change: -1.2,
    trend: [38, 37, 36, 35, 34, 35, 35],
    color: "#f97316",
    icon: "gas",
  },
  {
    id: "energy-3",
    name: "Coal",
    production: 15,
    price: 65.2,
    change: -3.5,
    trend: [20, 19, 18, 17, 16, 15, 15],
    color: "#6b7280",
    icon: "mineral",
  },
  {
    id: "energy-4",
    name: "Hydroelectric",
    production: 8,
    price: 0.038,
    change: 0.5,
    trend: [7, 7.5, 8, 8, 7.5, 8, 8],
    color: "#3b82f6",
    icon: "water",
  },
]

const productionData = [
  { name: "Wind", value: 42, color: "#4ade80" },
  { name: "Oil & Gas", value: 35, color: "#f97316" },
  { name: "Coal", value: 15, color: "#6b7280" },
  { name: "Hydro", value: 8, color: "#3b82f6" },
]

const historicalData = [
  { month: "Jan", Wind: 38, "Oil & Gas": 40, Coal: 22, Hydro: 7 },
  { month: "Feb", Wind: 39, "Oil & Gas": 39, Coal: 21, Hydro: 7 },
  { month: "Mar", Wind: 40, "Oil & Gas": 38, Coal: 20, Hydro: 7.5 },
  { month: "Apr", Wind: 41, "Oil & Gas": 37, Coal: 19, Hydro: 8 },
  { month: "May", Wind: 42, "Oil & Gas": 36, Coal: 18, Hydro: 8 },
  { month: "Jun", Wind: 43, "Oil & Gas": 35, Coal: 17, Hydro: 7.5 },
  { month: "Jul", Wind: 42, "Oil & Gas": 35, Coal: 15, Hydro: 8 },
]

export function EnergyMarkets() {
  const { toast } = useToast()
  const [geoData, setGeoData] = useState({
    latitude: 43.0731,
    longitude: 107.2903,
    region: "Central Wyoming",
  })

  useEffect(() => {
    // Simulate getting user's location
    const interval = setInterval(() => {
      // Randomly adjust location slightly to simulate movement
      setGeoData((prev) => ({
        ...prev,
        latitude: prev.latitude + (Math.random() * 0.01 - 0.005),
        longitude: prev.longitude + (Math.random() * 0.01 - 0.005),
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleInvest = (source: EnergySource) => {
    toast({
      title: "Investment Initiated",
      description: `You're investing in ${source.name} at $${source.price.toFixed(2)}.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-bold mb-4">Energy Production</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {productionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Historical Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={historicalData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Wind" stroke="#4ade80" />
                <Line type="monotone" dataKey="Oil & Gas" stroke="#f97316" />
                <Line type="monotone" dataKey="Coal" stroke="#6b7280" />
                <Line type="monotone" dataKey="Hydro" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Energy Sources</h3>
          <div className="text-sm text-muted-foreground">
            <span>Geo Location: </span>
            <span>
              {geoData.latitude.toFixed(4)}°, {geoData.longitude.toFixed(4)}° ({geoData.region})
            </span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {energySources.map((source) => (
            <EnergyCard key={source.id} source={source} onInvest={handleInvest} />
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-bold mb-4">Regional Energy Availability</h3>
        <div className="p-4 border rounded-lg">
          <p className="mb-4">Based on your current location in the WyoVerse, these energy sources are available:</p>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="p-3 border rounded-lg flex items-center gap-2">
              <Wind className="h-5 w-5 text-green-500" />
              <span>Wind: High</span>
            </div>
            <div className="p-3 border rounded-lg flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <span>Natural Gas: Medium</span>
            </div>
            <div className="p-3 border rounded-lg flex items-center gap-2">
              <Mountain className="h-5 w-5 text-gray-500" />
              <span>Coal: Low</span>
            </div>
            <div className="p-3 border rounded-lg flex items-center gap-2">
              <Droplet className="h-5 w-5 text-blue-500" />
              <span>Water: Medium</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EnergyCard({
  source,
  onInvest,
}: {
  source: EnergySource
  onInvest: (source: EnergySource) => void
}) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center gap-3">
        {source.icon === "wind" && <Wind className="h-6 w-6" style={{ color: source.color }} />}
        {source.icon === "water" && <Droplet className="h-6 w-6" style={{ color: source.color }} />}
        {source.icon === "gas" && <Flame className="h-6 w-6" style={{ color: source.color }} />}
        {source.icon === "mineral" && <Mountain className="h-6 w-6" style={{ color: source.color }} />}
        {source.icon === "electric" && <Zap className="h-6 w-6" style={{ color: source.color }} />}
        <div>
          <h3 className="font-medium">{source.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm">${source.price.toFixed(3)}</span>
            <span className={`text-xs ${source.change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {source.change >= 0 ? "+" : ""}
              {source.change.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${source.production}%`,
              backgroundColor: source.color,
            }}
          />
        </div>
        <span className="text-xs">{source.production}%</span>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm">Production: {source.production}%</span>
        <Button size="sm" onClick={() => onInvest(source)}>
          Invest
        </Button>
      </div>
    </div>
  )
}
