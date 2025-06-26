import type React from "react"
import type { WantedPoster } from "@/types"
import Image from "next/image"

interface WantedPosterSidebarProps {
  posters: WantedPoster[]
}

const WantedPosterSidebar: React.FC<WantedPosterSidebarProps> = ({ posters }) => {
  return (
    <div className="sidebar">
      <h2>Most Wanted</h2>
      <div className="posters-container">
        {posters.map((poster) => (
          <div key={poster.id} className="poster">
            <div className="poster-header">
              <Image src="/wanted-star.svg" alt="Wanted Star" width={24} height={24} priority />
              <h3>Wanted</h3>
            </div>
            <Image
              src={poster.img || "/placeholder.svg"}
              alt={poster.name}
              width={120}
              height={160}
              className="outlaw-img"
              priority
            />
            <div className="poster-details">
              <h4>{poster.name}</h4>
              <p>Reward: ${poster.reward}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WantedPosterSidebar
