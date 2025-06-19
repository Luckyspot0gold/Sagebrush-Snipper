import { DashboardLayout } from "@/components/dashboard-layout"
import { PatentsList } from "@/components/patents-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PatentsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <h1 className="text-3xl font-bold">Patents</h1>
        <Card>
          <CardHeader>
            <CardTitle>WyoVerse Patents</CardTitle>
            <CardDescription>Intellectual property and patents in the WyoVerse ecosystem</CardDescription>
          </CardHeader>
          <CardContent>
            <PatentsList />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
