"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Factory, TrendingUp } from "lucide-react"

interface ResourceNode {
  id: string
  name: string
  type: "land" | "processing" | "market" | "consumer"
  position: { x: number; y: number }
  resource: string
  production: number
  connections: string[]
  status: "active" | "idle" | "overloaded"
}

interface TradeRoute {
  from: string
  to: string
  resource: string
  volume: number
  efficiency: number
}

export function SupplyChainVisualization() {
  const [nodes, setNodes] = useState<ResourceNode[]>([
    {
      id: "thunder_peak",
      name: "Thunder Peak Mine",
      type: "land",
      position: { x: 10, y: 20 },
      resource: "lumber",
      production: 150,
      connections: ["sawmill_1"],
      status: "active",
    },
    {
      id: "golden_valley",
      name: "Golden Valley Farm",
      type: "land",
      position: { x: 80, y: 15 },
      resource: "grain",
      production: 200,
      connections: ["mill_1"],
      status: "active",
    },
    {
      id: "sawmill_1",
      name: "Pioneer Sawmill",
      type: "processing",
      position: { x: 30, y: 40 },
      resource: "lumber",
      production: 120,
      connections: ["market_hub"],
      status: "active",
    },
    {
      id: "mill_1",
      name: "Frontier Mill",
      type: "processing",
      position: { x: 70, y: 35 },
      resource: "grain",
      production: 180,
      connections: ["market_hub"],
      status: "overloaded",
    },
    {
      id: "market_hub",
      name: "Central Market",
      type: "market",
      position: { x: 50, y: 60 },
      resource: "mixed",
      production: 0,
      connections: ["consumer_1", "consumer_2"],
      status: "active",
    },
    {
      id: "consumer_1",
      name: "Boxing Arena",
      type: "consumer",
      position: { x: 30, y: 80 },
      resource: "lumber",
      production: -50,
      connections: [],
      status: "active",
    },
    {
      id: "consumer_2",
      name: "Saloon District",
      type: "consumer",
      position: { x: 70, y: 80 },
      resource: "grain",
      production: -80,
      connections: [],
      status: "active",
    },
  ])

  const [tradeRoutes, setTradeRoutes] = useState<TradeRoute[]>([
    { from: "thunder_peak", to: "sawmill_1", resource: "lumber", volume: 150, efficiency: 0.8 },
    { from: "golden_valley", to: "mill_1", resource: "grain", volume: 200, efficiency: 0.9 },
    { from: "sawmill_1", to: "market_hub", resource: "lumber", volume: 120, efficiency: 0.85 },
    { from: "mill_1", to: "market_hub", resource: "grain", volume: 180, efficiency: 0.75 },
    { from: "market_hub", to: "consumer_1", resource: "lumber", volume: 50, efficiency: 0.95 },
    { from: "market_hub", to: "consumer_2", resource: "grain", volume: 80, efficiency: 0.95 },
  ])

  const [flowAnimation, setFlowAnimation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setFlowAnimation((prev) => (prev + 1) % 100)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "land":
        return "🏔️"
      case "processing":
        return "🏭"
      case "market":
        return "🏪"
      case "consumer":
        return "🏘️"
      default:
        return "📦"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "idle":
        return "bg-yellow-500"
      case "overloaded":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRouteColor = (efficiency: number) => {
    if (efficiency > 0.8) return "#10B981" // Green
    if (efficiency > 0.6) return "#F59E0B" // Yellow
    return "#EF4444" // Red
  }

  return (
    <div className="space-y-6">
      {/* Supply Chain Overview */}
      <Card className="border-4 border-black bg-blue-50">
        <CardHeader>
          <CardTitle className="headline-secondary text-center flex items-center justify-center gap-2">
            <Truck className="h-6 w-6 text-blue-600" />
            FRONTIER SUPPLY CHAIN NETWORK
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-white border-2 border-green-400 rounded">
              <div className="text-2xl font-bold text-green-600">{nodes.filter((n) => n.type === "land").length}</div>
              <div className="text-sm">Production Sites</div>
            </div>
            <div className="text-center p-3 bg-white border-2 border-blue-400 rounded">
              <div className="text-2xl font-bold text-blue-600">
                {nodes.filter((n) => n.type === "processing").length}
              </div>
              <div className="text-sm">Processing Plants</div>
            </div>
            <div className="text-center p-3 bg-white border-2 border-purple-400 rounded">
              <div className="text-2xl font-bold text-purple-600">{tradeRoutes.length}</div>
              <div className="text-sm">Trade Routes</div>
            </div>
            <div className="text-center p-3 bg-white border-2 border-red-400 rounded">
              <div className="text-2xl font-bold text-red-600">
                {((tradeRoutes.reduce((sum, route) => sum + route.efficiency, 0) / tradeRoutes.length) * 100).toFixed(
                  0,
                )}
                %
              </div>
              <div className="text-sm">Avg Efficiency</div>
            </div>
          </div>

          {/* Interactive Supply Chain Map */}
          <div className="relative bg-amber-100 border-4 border-amber-400 rounded-lg p-4" style={{ height: "400px" }}>
            <svg width="100%" height="100%" className="absolute inset-0">
              {/* Trade Routes */}
              {tradeRoutes.map((route, index) => {
                const fromNode = nodes.find((n) => n.id === route.from)
                const toNode = nodes.find((n) => n.id === route.to)

                if (!fromNode || !toNode) return null

                const x1 = (fromNode.position.x / 100) * 100 + "%"
                const y1 = (fromNode.position.y / 100) * 100 + "%"
                const x2 = (toNode.position.x / 100) * 100 + "%"
                const y2 = (toNode.position.y / 100) * 100 + "%"

                return (
                  <g key={index}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={getRouteColor(route.efficiency)}
                      strokeWidth={Math.max(2, route.volume / 50)}
                      strokeDasharray={route.efficiency < 0.7 ? "5,5" : "none"}
                    />
                    {/* Animated flow indicator */}
                    <circle cx={x1} cy={y1} r="3" fill={getRouteColor(route.efficiency)} opacity="0.8">
                      <animateMotion dur="3s" repeatCount="indefinite" path={`M ${x1} ${y1} L ${x2} ${y2}`} />
                    </circle>
                  </g>
                )
              })}
            </svg>

            {/* Resource Nodes */}
            {nodes.map((node) => (
              <div
                key={node.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${node.position.x}%`,
                  top: `${node.position.y}%`,
                }}
              >
                <div className="text-center">
                  <div className="relative">
                    <div className="text-3xl mb-1">{getNodeIcon(node.type)}</div>
                    <Badge className={`${getStatusColor(node.status)} text-white text-xs`}>{node.status}</Badge>
                  </div>
                  <div className="bg-white border-2 border-black rounded p-2 text-xs min-w-max">
                    <div className="font-bold">{node.name}</div>
                    <div>{node.resource}</div>
                    <div className="font-mono">{node.production > 0 ? `+${node.production}` : node.production}/hr</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Production Flow Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-4 border-black">
          <CardHeader>
            <CardTitle className="headline-secondary flex items-center gap-2">
              <Factory className="h-6 w-6 text-blue-600" />
              PRODUCTION ANALYSIS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nodes
                .filter((n) => n.production !== 0)
                .map((node) => (
                  <div key={node.id} className="border-2 border-gray-300 p-3 rounded">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold">{node.name}</span>
                      <Badge className={getStatusColor(node.status)}>{node.status}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{node.resource}</span>
                      <span className={node.production > 0 ? "text-green-600" : "text-red-600"}>
                        {node.production > 0 ? "+" : ""}
                        {node.production}/hr
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${node.production > 0 ? "bg-green-500" : "bg-red-500"}`}
                          style={{ width: `${Math.min(100, Math.abs(node.production) / 2)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-black">
          <CardHeader>
            <CardTitle className="headline-secondary flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
              EFFICIENCY METRICS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tradeRoutes.map((route, index) => {
                const fromNode = nodes.find((n) => n.id === route.from)
                const toNode = nodes.find((n) => n.id === route.to)

                return (
                  <div key={index} className="border-2 border-gray-300 p-3 rounded">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-sm">
                        {fromNode?.name} → {toNode?.name}
                      </span>
                      <Badge
                        className={
                          route.efficiency > 0.8
                            ? "bg-green-500"
                            : route.efficiency > 0.6
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }
                      >
                        {(route.efficiency * 100).toFixed(0)}%
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{route.resource}</span>
                      <span>{route.volume}/hr</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: `${route.efficiency * 100}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Impact Summary */}
      <Card className="border-4 border-black bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="headline-secondary text-center">🌐 SUPPLY CHAIN MARKET IMPACT</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-white border-2 border-green-400 rounded">
                <div className="text-2xl font-bold text-green-600">
                  {nodes.filter((n) => n.production > 0).reduce((sum, n) => sum + n.production, 0)}
                </div>
                <div className="text-sm">Total Production/hr</div>
              </div>
              <div className="p-4 bg-white border-2 border-blue-400 rounded">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.abs(nodes.filter((n) => n.production < 0).reduce((sum, n) => sum + n.production, 0))}
                </div>
                <div className="text-sm">Total Consumption/hr</div>
              </div>
              <div className="p-4 bg-white border-2 border-purple-400 rounded">
                <div className="text-2xl font-bold text-purple-600">
                  {((tradeRoutes.reduce((sum, r) => sum + r.efficiency, 0) / tradeRoutes.length) * 100).toFixed(0)}%
                </div>
                <div className="text-sm">Network Efficiency</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-100 border-2 border-yellow-400 rounded">
              <p className="font-serif italic">
                "Your supply chain decisions ripple through the entire frontier economy. Optimize production, upgrade
                trade routes, and watch your influence grow across the territory!"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
