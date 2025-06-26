import type React from "react"
import Image from "next/image"

interface WantedPoster {
  id: string
  name: string
  img?: string
  reward: number
}

interface WantedPosterSidebarProps {
  posters: WantedPoster[]
}

const WantedPosterSidebar: React.FC<WantedPosterSidebarProps> = ({ posters }) => {
  return (
    <div className="sidebar wanted-theme p-4">
      <div className="wanted-header text-center mb-4">
        <Image
          src="/placeholder.svg?height=24&width=24&text=⭐"
          alt="Wanted Star"
          width={24}
          height={24}
          className="mx-auto mb-2"
        />
        <h3 className="text-xl font-bold">WANTED DEAD OR ALIVE</h3>
      </div>

      <div className="space-y-4">
        {posters.map((poster) => (
          <div key={poster.id} className="wanted-poster border-2 border-dashed border-amber-800 p-4 bg-amber-50">
            <Image
              src={poster.img || "/placeholder.svg?height=120&width=120&text=Outlaw"}
              alt={poster.name}
              width={120}
              height={120}
              className="outlaw-img mx-auto mb-2 sepia"
            />
            <div className="bounty absolute top-2 right-2 bg-yellow-500 px-2 py-1 text-xs font-bold transform rotate-12">
              ${poster.reward} IN GOLD
            </div>
            <div className="text-center">
              <h4 className="font-bold">{poster.name}</h4>
              <p className="text-sm">Reward: ${poster.reward}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WantedPosterSidebar
