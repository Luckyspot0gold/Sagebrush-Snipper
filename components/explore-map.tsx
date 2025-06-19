"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useLandStore } from "@/lib/stores/land-store"
import { Compass, Map, MapPin } from "lucide-react"

export function ExploreMap() {
  const { availableLand, landDeeds } = useLandStore()
  const { toast } = useToast()
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  const handleExplore = () => {
    toast({
      title: "Exploration Started",
      description: "You're now exploring the WyoVerse territory.",
    })
  }

  return (
    <div className="space-y-4">
      <div className="w-full h-[500px] bg-accent/20 rounded-lg relative">
        {/* This would be replaced with an actual interactive map */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Map className="h-16 w-16 text-muted-foreground" />
        </div>

        {/* Sample map markers */}
        <div className="absolute top-1/4 left-1/3 cursor-pointer" onClick={() => setSelectedLocation("town")}>
          <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
            <MapPin className="h-4 w-4 text-primary" />
          </div>
        </div>

        <div className="absolute top-1/2 left-2/3 cursor-pointer" onClick={() => setSelectedLocation("mine")}>
          <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
            <MapPin className="h-4 w-4 text-yellow-500" />
          </div>
        </div>

        <div className="absolute top-3/4 left-1/4 cursor-pointer" onClick={() => setSelectedLocation("river")}>
          <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
            <MapPin className="h-4 w-4 text-blue-500" />
          </div>
        </div>

        {/* Map controls */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button size="icon" variant="outline">
            <Compass className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={handleExplore}>
            Explore
          </Button>
        </div>
      </div>

      {selectedLocation && (
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium">
            {selectedLocation === "town" && "Frontier Town"}
            {selectedLocation === "mine" && "Gold Rush Mine"}
            {selectedLocation === "river" && "Snake River"}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {selectedLocation === "town" &&
              "The central hub of WyoVerse. Trade, socialize, and find new opportunities."}
            {selectedLocation === "mine" && "A lucrative mining operation. Land here grants special mining rights."}
            {selectedLocation === "river" && "A vital water source. Land near here has high water ratings."}
          </p>
          <Button className="mt-4" size="sm">
            Visit Location
          </Button>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium">Available Land</h3>
          <p className="text-2xl font-bold">{availableLand.length}</p>
          <p className="text-sm text-muted-foreground">Parcels available for purchase</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium">Your Territory</h3>
          <p className="text-2xl font-bold">{landDeeds.length}</p>
          <p className="text-sm text-muted-foreground">Parcels in your possession</p>
        </div>
      </div>
    </div>
  )
}
