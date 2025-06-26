import Link from "next/link"
import { Home, Compass, BookOpenCheck, Crown, Target } from "lucide-react"

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-100 p-4">
      <nav className="space-y-4">
        <Link href="/" className="flex items-center gap-2 hover:underline">
          <Home className="h-4 w-4" />
          Home
        </Link>
        <Link href="/quests" className="flex items-center gap-2 hover:underline">
          <Compass className="h-4 w-4" />
          Quests
        </Link>
        <Link href="/completed-quests" className="flex items-center gap-2 hover:underline">
          <BookOpenCheck className="h-4 w-4" />
          Completed Quests
        </Link>
        <Link href="/pioneer-legacy" className="flex items-center gap-2 hover:underline">
          <Crown className="h-4 w-4" />
          Pioneer Legacy
        </Link>
        <Link href="/depth-progression" className="flex items-center gap-2 hover:underline">
          <Target className="h-4 w-4" />
          Progression Hub
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar
