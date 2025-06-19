import { DashboardLayout } from "@/components/dashboard-layout"
import { PropertyConnection } from "@/components/property-connection"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PropertyPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <h1 className="text-3xl font-bold">Connect Property</h1>
        <Card>
          <CardHeader>
            <CardTitle>Property Connection Portal</CardTitle>
            <CardDescription>Link your real-world property to the WyoVerse digital frontier</CardDescription>
          </CardHeader>
          <CardContent>
            <PropertyConnection />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
