import { DashboardLayout } from "@/components/dashboard-layout"
import { ExploreMap } from "@/components/explore-map"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ExplorePage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <h1 className="text-3xl font-bold">Explore WyoVerse</h1>
        <Card>
          <CardHeader>
            <CardTitle>Interactive Map</CardTitle>
            <CardDescription>Explore the WyoVerse territory and discover new opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <ExploreMap />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
