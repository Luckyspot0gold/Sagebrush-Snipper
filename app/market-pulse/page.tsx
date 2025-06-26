import { MarketPulseEngine } from "@/components/market-pulse-engine"
import { SupplyChainVisualization } from "@/components/supply-chain-visualization"

export default function MarketPulsePage() {
  return (
    <main className="container mx-auto flex flex-col gap-6 py-10">
      <h1 className="text-3xl font-bold">Market Pulse</h1>
      <MarketPulseEngine />
      <SupplyChainVisualization />
    </main>
  )
}
