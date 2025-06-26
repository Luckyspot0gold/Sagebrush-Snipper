import type { WantedPoster } from "@/types"
import Image from "next/image"

interface WantedPosterSidebarProps {
  posters?: WantedPoster[]
}

const fallbackPosters: WantedPoster[] = [
  {
    id: "demo-1",
    name: "Unknown Outlaw",
    img: "/placeholder-user.jpg",
    reward: 500,
  },
]

/* --------------------------- FIXED NAMED EXPORT --------------------------- */
export function WantedPosterSidebar({ posters }: WantedPosterSidebarProps) {
  const postersToShow = posters && posters.length > 0 ? posters : fallbackPosters

  return (
    <div className="sidebar">
      <h2 className="font-serif text-lg mb-2">Most Wanted</h2>
      <div className="posters-container space-y-4">
        {postersToShow.map((poster) => (
          <div key={poster.id} className="poster border-2 border-black p-2 bg-[#fffbea]">
            <div className="poster-header flex items-center gap-2 mb-1">
              <Image src="/wanted-star.svg" alt="Wanted Star" width={24} height={24} priority />
              <h3 className="font-serif font-bold uppercase text-sm">Wanted</h3>
            </div>
            <Image
              src={poster.img || "/placeholder.svg"}
              alt={poster.name}
              width={120}
              height={160}
              className="outlaw-img border border-black mx-auto"
              priority
            />
            <div className="poster-details text-center mt-2">
              <h4 className="font-serif font-medium">{poster.name}</h4>
              <p className="font-serif text-xs">Reward: ${poster.reward}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WantedPosterSidebar
