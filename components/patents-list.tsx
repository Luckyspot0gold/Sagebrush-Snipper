"use client"

import { usePatentStore } from "@/lib/stores/patent-store"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import type { Patent } from "@/lib/types"
import { FileText, Shield } from "lucide-react"

export function PatentsList() {
  const { patents } = usePatentStore()
  const { toast } = useToast()

  const handleViewPatent = (patent: Patent) => {
    toast({
      title: "Viewing Patent",
      description: `Viewing details for ${patent.title}`,
    })
  }

  return (
    <div className="space-y-4">
      {patents.map((patent) => (
        <div key={patent.id} className="flex items-center justify-between border p-4 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{patent.title}</h3>
              <p className="text-sm text-muted-foreground">Patent ID: {patent.id}</p>
              <p className="text-sm mt-1">{patent.description}</p>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={() => handleViewPatent(patent)}>
            <FileText className="h-4 w-4 mr-2" />
            View
          </Button>
        </div>
      ))}
    </div>
  )
}
