import { NewspaperLayout } from "@/components/newspaper-layout"
import { MarketOverview } from "@/components/market-overview"

export default function MarketPage() {
  return (
    <NewspaperLayout title="MARKET WATCH" subtitle="Latest Trends in the Digital Frontier Economy">
      <div className="newspaper-paragraph">
        Stay informed with the latest market movements and asset valuations in the WyoVerse economy. Monitor your
        investments and discover new opportunities in this rapidly evolving digital frontier.
      </div>
      <MarketOverview />
    </NewspaperLayout>
  )
}
