import { NewspaperLayout } from "@/components/newspaper-layout"
import { GamesPortal } from "@/components/games-portal"

export default function GamesPage() {
  return (
    <NewspaperLayout title="STONEYARD GAMING GAZETTE" subtitle="The Premier Gaming Destination of the Digital Frontier">
      <div className="newspaper-paragraph">
        Welcome to the most comprehensive gaming experience in the WyoVerse! From the creators at LuckyspotOgold comes a
        revolutionary collection of blockchain-powered games that merge traditional gaming with cutting-edge
        cryptocurrency mechanics.
      </div>
      <GamesPortal />
    </NewspaperLayout>
  )
}
