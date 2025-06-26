"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Pickaxe, Zap, Trophy, ArrowRight } from "lucide-react"

interface LandParcel {
  id: string
  name: string
  type: "mountain" | "valley" | "river" | "desert"
  stonesPerHour: number
  level: number
  upgradesCost: number
  owned: boolean
}

interface BoxingGear {
  id: string
  name: string
  power: number
  cost: number
  owned: boolean
  description: string
}

export function LandUtilityLoop() {
  const [stones, setStones] = useState(1250)
  const [avax, setAvax] = useState(0.75)
  const [landParcels, setLandParcels] = useState<LandParcel[]>([
    {
      id: "mountain_1",
      name: "Thunder Peak Mine",
      type: "mountain",
      stonesPerHour: 25,
      level: 2,
      upgradesCost: 500,
      owned: true,
    },
    {
      id: "valley_1",
      name: "Golden Valley Claim",
      type: "valley",
      stonesPerHour: 15,
      level: 1,
      upgradesCost: 300,
      owned: true,
    },
    {
      id: "river_1",
      name: "Silver Creek Prospect",
      type: "river",
      stonesPerHour: 35,
      level: 1,
      upgradesCost: 750,
      owned: false,
    },
  ])

  const [boxingGear, setBoxingGear] = useState<BoxingGear[]>([
    {
      id: "basic_gloves",
      name: "Frontier Leather Gloves",
      power: 10,
      cost: 100,
      owned: true,
      description: "Basic cowhide gloves from the general store",
    },
    {
      id: "iron_gloves",
      name: "Iron-Knuckle Brawlers",
      power: 25,
      cost: 500,
      owned: false,
      description: "Reinforced with Wyoming iron ore",
    },
    {
      id: "gold_gloves",
      name: "Golden Prospector Mitts",
      power: 50,
      cost: 1500,
      owned: false,
      description: "Legendary gloves of the mining champions",
    },
  ])

  const [miningActive, setMiningActive] = useState(false)
  const [totalPower, setTotalPower] = useState(10)

  // Auto-generate STONES from owned land
  useEffect(() => {
    if (miningActive) {
      const interval = setInterval(() => {
        const ownedLand = landParcels.filter((land) => land.owned)
        const totalGeneration = ownedLand.reduce((sum, land) => sum + land.stonesPerHour, 0)

        setStones((prev) => prev + Math.floor(totalGeneration / 60)) // Per minute
      }, 60000) // Every minute

      return () => clearInterval(interval)
    }
  }, [miningActive, landParcels])

  // Calculate total boxing power
  useEffect(() => {
    const ownedGear = boxingGear.filter((gear) => gear.owned)
    const power = ownedGear.reduce((sum, gear) => sum + gear.power, 0)
    setTotalPower(power)
  }, [boxingGear])

  const purchaseLand = (landId: string) => {
    const land = landParcels.find((l) => l.id === landId)
    if (land && stones >= land.upgradesCost) {
      setStones((prev) => prev - land.upgradesCost)
      setLandParcels((prev) => prev.map((l) => (l.id === landId ? { ...l, owned: true } : l)))
    }
  }

  const upgradeLand = (landId: string) => {
    const land = landParcels.find((l) => l.id === landId)
    if (land && land.owned && stones >= land.upgradesCost) {
      setStones((prev) => prev - land.upgradesCost)
      setLandParcels((prev) =>
        prev.map((l) =>
          l.id === landId
            ? {
                ...l,
                level: l.level + 1,
                stonesPerHour: Math.floor(l.stonesPerHour * 1.5),
                upgradesCost: Math.floor(l.upgradesCost * 1.8),
              }
            : l,
        ),
      )
    }
  }

  const purchaseGear = (gearId: string) => {
    const gear = boxingGear.find((g) => g.id === gearId)
    if (gear && stones >= gear.cost) {
      setStones((prev) => prev - gear.cost)
      setBoxingGear((prev) => prev.map((g) => (g.id === gearId ? { ...g, owned: true } : g)))
    }
  }

  const simulateFight = () => {
    // Simulate boxing match based on gear power
    const winChance = Math.min(totalPower / 100, 0.95) // Max 95% win rate
    const won = Math.random() < winChance

    if (won) {
      const reward = Math.floor((totalPower / 10) * (Math.random() * 0.5 + 0.5)) / 100
      setAvax((prev) => prev + reward)
      return { won: true, reward }
    }

    return { won: false, reward: 0 }
  }

  const getLandIcon = (type: string) => {
    switch (type) {
      case "mountain":
        return "🏔️"
      case "valley":
        return "🌄"
      case "river":
        return "🏞️"
      case "desert":
        return "🏜️"
      default:
        return "🗺️"
    }
  }

  return (
    <div className="space-y-6">
      {/* Resource Display */}
      <Card className="border-4 border-black bg-yellow-50">
        <CardHeader>
          <CardTitle className="headline-secondary text-center">💰 PIONEER'S TREASURY 💰</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl mb-2">💎</div>
              <div className="text-2xl font-bold">{stones.toLocaleString()}</div>
              <div className="text-sm">STONES</div>
            </div>
            <div>
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-2xl font-bold">{avax.toFixed(3)}</div>
              <div className="text-sm">AVAX</div>
            </div>
            <div>
              <div className="text-3xl mb-2">🥊</div>
              <div className="text-2xl font-bold">{totalPower}</div>
              <div className="text-sm">POWER</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* The Loop Visualization */}
      <Card className="border-4 border-black bg-green-50">
        <CardHeader>
          <CardTitle className="headline-secondary text-center">🔄 THE PROSPERITY LOOP 🔄</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <MapPin className="h-12 w-12 mx-auto mb-2 text-amber-600" />
              <div className="font-bold">LAND</div>
              <div className="text-sm">Generates Resources</div>
            </div>
            <ArrowRight className="h-8 w-8 text-gray-600" />
            <div className="text-center">
              <Pickaxe className="h-12 w-12 mx-auto mb-2 text-blue-600" />
              <div className="font-bold">STONES</div>
              <div className="text-sm">Mining Output</div>
            </div>
            <ArrowRight className="h-8 w-8 text-gray-600" />
            <div className="text-center">
              <Zap className="h-12 w-12 mx-auto mb-2 text-purple-600" />
              <div className="font-bold">GEAR</div>
              <div className="text-sm">Boxing Upgrades</div>
            </div>
            <ArrowRight className="h-8 w-8 text-gray-600" />
            <div className="text-center">
              <Trophy className="h-12 w-12 mx-auto mb-2 text-red-600" />
              <div className="font-bold">FIGHTS</div>
              <div className="text-sm">Win AVAX</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Land Management */}
        <Card className="border-4 border-black">
          <CardHeader>
            <CardTitle className="headline-secondary">🏔️ LAND CLAIMS & MINING</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setMiningActive(!miningActive)}
                className={miningActive ? "bg-green-500" : "bg-gray-500"}
              >
                {miningActive ? "⚡ Mining Active" : "⏸️ Mining Paused"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {landParcels.map((land) => (
                <div key={land.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getLandIcon(land.type)}</span>
                      <div>
                        <div className="font-bold">{land.name}</div>
                        <div className="text-sm text-gray-600">Level {land.level}</div>
                      </div>
                    </div>
                    <Badge className={land.owned ? "bg-green-500" : "bg-gray-500"}>
                      {land.owned ? "OWNED" : "AVAILABLE"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span>Production:</span>
                    <span className="font-bold">{land.stonesPerHour} STONES/hour</span>
                  </div>

                  {land.owned ? (
                    <Button
                      onClick={() => upgradeLand(land.id)}
                      disabled={stones < land.upgradesCost}
                      className="w-full"
                    >
                      Upgrade ({land.upgradesCost} STONES)
                    </Button>
                  ) : (
                    <Button
                      onClick={() => purchaseLand(land.id)}
                      disabled={stones < land.upgradesCost}
                      className="w-full"
                    >
                      Purchase ({land.upgradesCost} STONES)
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Boxing Gear */}
        <Card className="border-4 border-black">
          <CardHeader>
            <CardTitle className="headline-secondary">🥊 BOXING GEAR SHOP</CardTitle>
            <div className="text-sm">
              Total Power: <Badge className="bg-red-500 text-white">{totalPower}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {boxingGear.map((gear) => (
                <div key={gear.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-bold">{gear.name}</div>
                      <div className="text-sm text-gray-600">{gear.description}</div>
                    </div>
                    <Badge className={gear.owned ? "bg-green-500" : "bg-gray-500"}>
                      {gear.owned ? "OWNED" : "SHOP"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span>Power:</span>
                    <span className="font-bold">+{gear.power}</span>
                  </div>

                  {!gear.owned && (
                    <Button onClick={() => purchaseGear(gear.id)} disabled={stones < gear.cost} className="w-full">
                      Buy ({gear.cost} STONES)
                    </Button>
                  )}
                </div>
              ))}

              <div className="border-t pt-4">
                <Button
                  onClick={() => {
                    const result = simulateFight()
                    if (result.won) {
                      alert(`🏆 Victory! Earned ${result.reward.toFixed(3)} AVAX!`)
                    } else {
                      alert(`💥 Defeat! Train harder and upgrade your gear!`)
                    }
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-lg"
                  disabled={totalPower < 10}
                >
                  🥊 ENTER BOXING MATCH
                </Button>
                <div className="text-xs text-center mt-2">Win chance: {Math.min(totalPower, 95)}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
