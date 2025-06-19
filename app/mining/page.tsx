import { DashboardLayout } from "@/components/dashboard-layout"
import { MiningDashboard } from "@/components/mining-dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MiningPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <h1 className="text-3xl font-bold">Mining</h1>
        <Card>
          <CardHeader>
            <CardTitle>Mining Operations</CardTitle>
            <CardDescription>Manage your WyoVerse mining operations and resources</CardDescription>
          </CardHeader>
          <CardContent>
            <MiningDashboard />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
