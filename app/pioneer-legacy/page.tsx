import { PioneerLegacySystem } from "@/components/pioneer-legacy-system"
import { WorldSimulationEngine } from "@/components/world-simulation-engine"
import { NewspaperLayout } from "@/components/newspaper-layout"

export default function PioneerLegacyPage() {
  return (
    <NewspaperLayout>
      <div className="space-y-8">
        <div className="text-center border-4 border-black p-6 bg-gradient-to-r from-gold to-yellow-200">
          <h1 className="headline-primary text-4xl mb-4">🏆 PIONEER LEGACY & WORLD SIMULATION 🏆</h1>
          <p className="headline-secondary text-xl">"Where Every Action Echoes Through Eternity"</p>
        </div>

        <PioneerLegacySystem />
        <WorldSimulationEngine />
      </div>
    </NewspaperLayout>
  )
}
