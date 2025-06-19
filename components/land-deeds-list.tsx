"use client"

import { useLandStore } from "@/lib/stores/land-store"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import type { LandDeed } from "@/lib/types"
import { Eye, MapPin } from "lucide-react"

export function LandDeedsList() {
  const { landDeeds } = useLandStore()
  const { toast } = useToast()

  const handleViewDeed = (deed: LandDeed) => {
    toast({
      title: "Viewing Deed",
      description: `Viewing details for ${deed.name}`,
    })
  }

  if (landDeeds.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">You don't own any land deeds yet.</p>
        <Button className="mt-4">Browse Available Land</Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {landDeeds.map((deed) => (
        <div key={deed.id} className="flex items-center justify-between border p-4 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-md flex items-center justify-center">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{deed.name}</h3>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{deed.size} acres</span>
                <span className="text-sm text-muted-foreground">{deed.coordinates}</span>
              </div>
              <p className="text-sm mt-1">
                {deed.attributes.water} water · {deed.attributes.mining_rights} mining rights
              </p>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={() => handleViewDeed(deed)}>
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
        </div>
      ))}
    </div>
  )
}
