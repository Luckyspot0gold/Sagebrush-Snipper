import { DashboardLayout } from "@/components/dashboard-layout"
import { NewspaperFrontPage } from "@/components/newspaper-front-page"

export default function Home() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6 newspaper-bg">
        <NewspaperFrontPage />
      </div>
    </DashboardLayout>
  )
}
