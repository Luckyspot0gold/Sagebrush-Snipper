import { MarketPulseEngine } from "@/components/market-pulse-engine"
import { SupplyChainVisualization } from "@/components/supply-chain-visualization"
import { NewspaperLayout } from "@/components/newspaper-layout"

export default function MarketPulsePage() {
  return (
    <NewspaperLayout>
      <div className="space-y-8">
        <div className="text-center border-4 border-black p-6 bg-yellow-50">
          <h1 className="headline-primary text-4xl mb-4">📈 FRONTIER MARKET PULSE 📈</h1>
          <p className="headline-secondary text-xl mb-2">"Where Your Trades Move Mountains"</p>
          <p className="body-text">Real-time market dynamics powered by player influence</p>
        </div>

        <MarketPulseEngine />
        <SupplyChainVisualization />
      </div>
    </NewspaperLayout>
  )
}
