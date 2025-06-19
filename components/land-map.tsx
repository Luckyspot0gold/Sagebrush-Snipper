"use client"

import { useEffect, useRef, useState } from "react"
import { useLandStore } from "@/lib/stores/land-store"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import type { LandDeed } from "@/lib/types"

export function LandMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const { landDeeds, availableLand, mintLandDeed } = useLandStore()
  const { toast } = useToast()
  const [selectedPlot, setSelectedPlot] = useState<LandDeed | null>(null)

  useEffect(() => {
    // This would be replaced with actual map rendering code
    // For now, we'll just show a placeholder
    if (mapRef.current) {
      const ctx = document.createElement("canvas").getContext("2d")
      // Map rendering would go here
    }
  }, [landDeeds, availableLand])

  const handleSelectPlot = (plot: LandDeed) => {
    setSelectedPlot(plot)
  }

  const handleMintDeed = () => {
    if (selectedPlot) {
      mintLandDeed(selectedPlot)
      toast({
        title: "Land Deed Minted",
        description: `Successfully minted deed for ${selectedPlot.name}`,
      })
      setSelectedPlot(null)
    }
  }

  return (
    <div className="space-y-4">
      <div ref={mapRef} className="w-full h-[400px] bg-accent/20 rounded-lg flex items-center justify-center relative">
        <div className="grid grid-cols-5 gap-2 p-4 w-full h-full">
          {availableLand.map((plot) => (
            <div
              key={plot.id}
              className={`
                border-2 rounded-md cursor-pointer flex items-center justify-center
                ${selectedPlot?.id === plot.id ? "border-primary bg-primary/20" : "border-accent"}
                ${
                  plot.attributes.water === "high"
                    ? "bg-blue-500/20"
                    : plot.attributes.water === "medium"
                      ? "bg-blue-500/10"
                      : "bg-yellow-500/10"
                }
              `}
              onClick={() => handleSelectPlot(plot)}
            >
              <span className="text-xs font-medium">{plot.id}</span>
            </div>
          ))}
          {landDeeds.map((deed) => (
            <div
              key={deed.id}
              className="border-2 border-green-500 bg-green-500/20 rounded-md flex items-center justify-center"
            >
              <span className="text-xs font-medium">{deed.id}</span>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500/20 border border-accent"></div>
            <span>High Water</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500/10 border border-accent"></div>
            <span>Medium Water</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500/10 border border-accent"></div>
            <span>Low Water</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500/20 border-2 border-green-500"></div>
            <span>Owned Land</span>
          </div>
        </div>
      </div>

      {selectedPlot && (
        <div className="border p-4 rounded-lg">
          <h3 className="font-medium">{selectedPlot.name}</h3>
          <p className="text-sm text-muted-foreground">{selectedPlot.coordinates}</p>
          <div className="mt-2">
            <p className="text-sm">Size: {selectedPlot.size} acres</p>
            <p className="text-sm">Water: {selectedPlot.attributes.water}</p>
            <p className="text-sm">Mining Rights: {selectedPlot.attributes.mining_rights}</p>
          </div>
          <Button className="mt-4" onClick={handleMintDeed}>
            Mint Land Deed
          </Button>
        </div>
      )}
    </div>
  )
}
