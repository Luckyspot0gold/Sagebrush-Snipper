import { NewspaperLayout } from "@/components/newspaper-layout"
import { EnergyMarkets } from "@/components/energy-markets"

export default function EnergyPage() {
  return (
    <NewspaperLayout title="ENERGY CHRONICLE" subtitle="Wyoming's Power Production and Resource Management">
      <div className="newspaper-paragraph">
        Wyoming's diverse energy landscape powers the digital frontier. From wind farms to oil fields, the territory's
        resources drive innovation and prosperity in the WyoVerse economy.
      </div>
      <EnergyMarkets />
    </NewspaperLayout>
  )
}
