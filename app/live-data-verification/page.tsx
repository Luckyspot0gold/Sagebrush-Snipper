import { DashboardLayout } from "@/components/dashboard-layout"
import { LiveDataVerification } from "@/components/live-data-verification"

export default function LiveDataVerificationPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <LiveDataVerification />
      </div>
    </DashboardLayout>
  )
}
