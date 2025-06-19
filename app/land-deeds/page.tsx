import { NewspaperLayout } from "@/components/newspaper-layout"
import { LandDeedsList } from "@/components/land-deeds-list"
import { LandMap } from "@/components/land-map"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandDeedsPage() {
  return (
    <NewspaperLayout title="LAND DEEDS" subtitle="Stake Your Claim in the Digital Frontier">
      <div className="newspaper-paragraph">
        The Wyoming Territory offers vast opportunities for pioneers seeking to establish themselves in the digital
        frontier. Explore available parcels, stake your claim, and build your legacy in the WyoVerse.
      </div>

      <div className="newspaper-article">
        <div className="newspaper-article-inner">
          <Tabs defaultValue="map" className="space-y-4">
            <TabsList>
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <TabsContent value="map" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">WyoVerse Territory</CardTitle>
                  <CardDescription className="font-serif">
                    Interactive map of available and owned land parcels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LandMap />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="list" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Your Land Deeds</CardTitle>
                  <CardDescription className="font-serif">Manage your WyoVerse property portfolio</CardDescription>
                </CardHeader>
                <CardContent>
                  <LandDeedsList />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </NewspaperLayout>
  )
}
