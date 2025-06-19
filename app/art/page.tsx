import { DashboardLayout } from "@/components/dashboard-layout"
import { ArtGallery } from "@/components/art-gallery"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ArtPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <h1 className="text-3xl font-bold">WyoVerse Art Gallery</h1>
        <Card>
          <CardHeader>
            <CardTitle>Digital Frontier Art</CardTitle>
            <CardDescription>Explore and collect digital art from Wyoming's virtual frontier</CardDescription>
          </CardHeader>
          <CardContent>
            <ArtGallery />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
