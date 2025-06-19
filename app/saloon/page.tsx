import { DashboardLayout } from "@/components/dashboard-layout"
import { NPCDialogue } from "@/components/npc-dialogue"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SaloonPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <h1 className="text-3xl font-bold">Saloon</h1>
        <Card>
          <CardHeader>
            <CardTitle>Chat with NPCs</CardTitle>
            <CardDescription>Interact with WyoVerse characters to get market tips and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <NPCDialogue />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
