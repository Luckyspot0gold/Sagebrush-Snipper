import { NewspaperLayout } from "@/components/newspaper-layout"
import { WyomingPyramid } from "@/components/wyoming-pyramid"

export default function WyomingPyramidPage() {
  return (
    <NewspaperLayout title="THE MYSTERIOUS WYOMING PYRAMID" subtitle="Ancient Mystery in the Modern Frontier">
      <div className="newspaper-dateline">WYOMING TERRITORY, 1868</div>
      <div className="newspaper-paragraph">
        Nestled in the vast Wyoming landscape, a remarkable structure has captured the imagination of researchers and
        visitors alike: the Wyoming Pyramid. This mysterious monument, located at a precise geographical position that
        aligns with significant celestial events, has become a subject of fascination for those interested in ancient
        architecture and astronomical alignments.
      </div>
      <WyomingPyramid />
    </NewspaperLayout>
  )
}
