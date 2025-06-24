import { NewspaperLayout } from "@/components/newspaper-layout"
import { URLVerification } from "@/components/url-verification"

export default function SystemStatusPage() {
  return (
    <NewspaperLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="headline-primary text-4xl mb-2">🔧 SYSTEM STATUS 🔧</h1>
          <p className="body-text text-lg">WyoVerse Pioneer System Verification</p>
        </div>

        <URLVerification />
      </div>
    </NewspaperLayout>
  )
}
