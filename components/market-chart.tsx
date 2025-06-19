"use client"
import { useMarketStore } from "@/lib/stores/market-store"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export function MarketChart() {
  const { assets, marketHistory } = useMarketStore()

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={marketHistory}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(value) => {
              const date = new Date(value)
              return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
            }}
          />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [`$${value.toFixed(2)}`, ""]}
            labelFormatter={(label) => {
              const date = new Date(label)
              return date.toLocaleTimeString()
            }}
          />
          <Legend />
          {assets.map((asset, index) => (
            <Line
              key={asset.name}
              type="monotone"
              dataKey={asset.name}
              stroke={getAssetColor(index)}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function getAssetColor(index: number): string {
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]
  return colors[index % colors.length]
}
