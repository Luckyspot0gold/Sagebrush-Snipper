import { DashboardLayout } from "@/components/dashboard-layout"
import { ParksAndRecreation } from "@/components/parks-and-recreation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ParksPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <h1 className="text-3xl font-bold">Parks & Recreation</h1>
        <Card>
          <CardHeader>
            <CardTitle>Wyoming's Natural Wonders</CardTitle>
            <CardDescription>Explore parks, wildlife, and outdoor activities in the WyoVerse</CardDescription>
          </CardHeader>
          <CardContent>
            <ParksAndRecreation />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
