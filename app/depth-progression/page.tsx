import { DepthProgressionHub } from "@/components/depth-progression-hub"
import { NewspaperLayout } from "@/components/newspaper-layout"

export default function DepthProgressionPage() {
  return (
    <NewspaperLayout>
      <div className="space-y-8">
        <div className="text-center border-4 border-black p-6 bg-gradient-to-r from-purple-50 to-blue-100">
          <h1 className="headline-primary text-4xl mb-4">🎯 FRONTIER MASTERY PROGRESSION 🎯</h1>
          <p className="headline-secondary text-xl">"Every Pioneer's Journey to Legendary Status"</p>
        </div>

        <DepthProgressionHub />
      </div>
    </NewspaperLayout>
  )
}
