import { DashboardLayout } from "@/components/dashboard-layout"
import { StoreItems } from "@/components/store-items"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function StorePage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <h1 className="text-3xl font-bold">WyoVerse Store</h1>
        <Card>
          <CardHeader>
            <CardTitle>Marketplace</CardTitle>
            <CardDescription>Purchase assets, equipment, and upgrades for your WyoVerse experience</CardDescription>
          </CardHeader>
          <CardContent>
            <StoreItems />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
