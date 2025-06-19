import { DashboardLayout } from "@/components/dashboard-layout"
import { OSHATraining } from "@/components/osha-training"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function OSHAPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <h1 className="text-3xl font-bold">OSHA VR Training</h1>
        <Card>
          <CardHeader>
            <CardTitle>Virtual Reality Safety Training</CardTitle>
            <CardDescription>OSHA-certified safety training in immersive virtual environments</CardDescription>
          </CardHeader>
          <CardContent>
            <OSHATraining />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
