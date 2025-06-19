import { DashboardLayout } from "@/components/dashboard-layout"
import { Classifieds } from "@/components/classifieds"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ClassifiedsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <h1 className="text-3xl font-bold">Classifieds</h1>
        <Card>
          <CardHeader>
            <CardTitle>WyoVerse Marketplace</CardTitle>
            <CardDescription>Buy, sell, and trade items in the digital frontier</CardDescription>
          </CardHeader>
          <CardContent>
            <Classifieds />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
