import { NewspaperLayout } from "@/components/newspaper-layout"
import { TourismPortal } from "@/components/tourism-portal"

export default function TourismPage() {
  return (
    <NewspaperLayout title="TOURISM GAZETTE" subtitle="Explore Wyoming's Digital Wonders and Attractions">
      <div className="newspaper-paragraph">
        The digital frontier of Wyoming offers countless wonders for the intrepid explorer. From virtual national parks
        to immersive cultural experiences, there's something for every traveler in the WyoVerse.
      </div>
      <TourismPortal />
    </NewspaperLayout>
  )
}
