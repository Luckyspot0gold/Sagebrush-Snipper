import { DashboardLayout } from "@/components/dashboard-layout"
import { NativeHistory } from "@/components/native-history"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NativeHistoryPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <h1 className="text-3xl font-bold">Native History</h1>
        <Card>
          <CardHeader>
            <CardTitle>Indigenous Knowledge & History</CardTitle>
            <CardDescription>Authentic history and knowledge of Wyoming's native tribes</CardDescription>
          </CardHeader>
          <CardContent>
            <NativeHistory />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
