import { DashboardLayout } from "@/components/dashboard-layout"
import { WyomingRecords } from "@/components/wyoming-records"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function WyomingRecordsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <h1 className="text-3xl font-bold">Wyoming State Records</h1>
        <Card>
          <CardHeader>
            <CardTitle>Economic & Educational Excellence</CardTitle>
            <CardDescription>Explore Wyoming's impressive economic and educational achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <WyomingRecords />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
