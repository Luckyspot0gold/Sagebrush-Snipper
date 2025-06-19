import "./styles.css"
import { NewspaperLayout } from "@/components/newspaper-layout"
import { DigitalRodeoEnhanced } from "@/components/digital-rodeo-enhanced"

export default function DigitalRodeoPage() {
  return (
    <NewspaperLayout title="DIGITAL RODEO" subtitle="Ride the Market Volatility with Cryptocurrency-Themed Bulls">
      <div className="newspaper-paragraph">
        Experience the thrill of riding the market volatility with our new Digital Rodeo featuring Bitcoin Bull and
        Solana Stampede. Patent-driven metrics influence bull behavior in this unique crypto-themed rodeo experience.
      </div>
      <DigitalRodeoEnhanced />
    </NewspaperLayout>
  )
}
