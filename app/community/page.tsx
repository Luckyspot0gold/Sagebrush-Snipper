import { DashboardLayout } from "@/components/dashboard-layout"
import { CommunityFeed } from "@/components/community-feed"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CommunityPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <h1 className="text-3xl font-bold">Community</h1>
        <Card>
          <CardHeader>
            <CardTitle>WyoVerse Community</CardTitle>
            <CardDescription>Connect with other pioneers in the digital frontier</CardDescription>
          </CardHeader>
          <CardContent>
            <CommunityFeed />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
