"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { useLandStore } from "@/lib/stores/land-store"
import { useMarketStore } from "@/lib/stores/market-store"

export function MiningDashboard() {
  const { landDeeds } = useLandStore()
  const { assets } = useMarketStore()
  const { toast } = useToast()
  const [miningActive, setMiningActive] = useState(false)
  const [miningProgress, setMiningProgress] = useState(0)
  const [miningStats, setMiningStats] = useState({
    hashRate: 0,
    totalMined: 0,
    activeMiners: 0,
  })

  useEffect(() => {
    if (miningActive) {
      const interval = setInterval(() => {
        setMiningProgress((prev) => {
          if (prev >= 100) {
            // Mining cycle complete
            setMiningStats((prev) => ({
              ...prev,
              totalMined: prev.totalMined + Math.random() * 0.01,
            }))
            return 0
          }
          return prev + 1
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [miningActive])

  const toggleMining = () => {
    if (!miningActive) {
      // Check if user has land with mining rights
      const miningLand = landDeeds.filter((deed) => deed.attributes.mining_rights === "granted")

      if (miningLand.length === 0) {
        toast({
          title: "Mining Failed",
          description: "You need land with mining rights to start mining operations.",
          variant: "destructive",
        })
        return
      }

      // Start mining
      setMiningStats({
        hashRate: miningLand.length * 25,
        totalMined: miningStats.totalMined,
        activeMiners: miningLand.length,
      })

      toast({
        title: "Mining Started",
        description: `Mining operations started with ${miningLand.length} active miners.`,
      })
    } else {
      toast({
        title: "Mining Stopped",
        description: "Mining operations have been stopped.",
      })
    }

    setMiningActive(!miningActive)
  }

  return (
    <div className="space-y-6">
      {landDeeds.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">You need to own land with mining rights to start mining operations.</p>
          <Button className="mt-4">Acquire Land</Button>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Hash Rate</h3>
              <p className="text-2xl font-bold">{miningStats.hashRate} H/s</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Total Mined</h3>
              <p className="text-2xl font-bold">{miningStats.totalMined.toFixed(4)} WyoCoin</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Active Miners</h3>
              <p className="text-2xl font-bold">{miningStats.activeMiners}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <h3 className="font-medium">Mining Progress</h3>
              <span>{miningProgress}%</span>
            </div>
            <Progress value={miningProgress} className="h-2" />
          </div>

          <Button onClick={toggleMining} variant={miningActive ? "destructive" : "default"}>
            {miningActive ? "Stop Mining" : "Start Mining"}
          </Button>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Mining Rights</h3>
            <div className="space-y-2">
              {landDeeds.map((deed) => (
                <div key={deed.id} className="flex justify-between items-center p-2 border rounded-lg">
                  <div>
                    <p className="font-medium">{deed.name}</p>
                    <p className="text-sm text-muted-foreground">Mining Rights: {deed.attributes.mining_rights}</p>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      deed.attributes.mining_rights === "granted" ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
