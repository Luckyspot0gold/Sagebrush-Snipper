import { AdManagementDashboard } from "@/components/ad-management-dashboard"
import { NewspaperLayout } from "@/components/newspaper-layout"

export default function AdminAdsPage() {
  return (
    <NewspaperLayout title="Advertising Empire" subtitle="Manage Your Frontier Ad Network">
      <AdManagementDashboard />
    </NewspaperLayout>
  )
}
