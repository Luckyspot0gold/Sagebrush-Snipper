import { DashboardLayout } from "@/components/dashboard-layout"
import { EducationPortal } from "@/components/education-portal"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function EducationPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <h1 className="text-3xl font-bold">Education Portal</h1>
        <Card>
          <CardHeader>
            <CardTitle>WyoVerse Learning Center</CardTitle>
            <CardDescription>Discover educational opportunities and courses in the digital frontier</CardDescription>
          </CardHeader>
          <CardContent>
            <EducationPortal />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
