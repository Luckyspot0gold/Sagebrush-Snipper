import { DashboardLayout } from "@/components/dashboard-layout"
import { StonesAndNFTs } from "@/components/stones-and-nfts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function StonesPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <h1 className="text-3xl font-bold">Stones & NFTs</h1>
        <Card>
          <CardHeader>
            <CardTitle>Digital Collectibles</CardTitle>
            <CardDescription>Learn about and collect unique digital assets in the WyoVerse</CardDescription>
          </CardHeader>
          <CardContent>
            <StonesAndNFTs />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
