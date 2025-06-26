import { NewspaperFrontPage } from "@/components/newspaper-front-page"
import { Sidebar } from "@/components/sidebar"
import { WantedPosterSidebar } from "@/components/wanted-poster-sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { TestTube, Eye } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f4f1e8] frontier-paper">
      {/* Creator Testing Banner */}
      <div className="bg-yellow-100 border-b-2 border-yellow-400 p-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge className="bg-yellow-500 text-black font-serif">
              <TestTube className="h-4 w-4 mr-1" />
              CREATOR TESTING MODE
            </Badge>
            <span className="font-serif text-sm">Wyoming Pioneer Newspaper - Live Preview</span>
          </div>
          <div className="flex gap-2">
            <Link href="/games">
              <Button size="sm" variant="outline" className="font-serif">
                <Eye className="h-4 w-4 mr-1" />
                Test Games
              </Button>
            </Link>
            <Link href="/market">
              <Button size="sm" variant="outline" className="font-serif">
                Test Market
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button size="sm" variant="outline" className="font-serif">
                Test Onboarding
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="hidden lg:block w-64 fixed left-0 top-12 h-full overflow-y-auto border-r-4 border-double border-[#8B4513] bg-[#f9f6f0]">
          <Sidebar />
        </div>

        {/* Main Content - Wyoming Pioneer Newspaper */}
        <div className="flex-1 lg:ml-64 lg:mr-80 pt-2">
          <NewspaperFrontPage />
        </div>

        {/* Right Sidebar - Wanted Posters */}
        <div className="hidden lg:block w-80 fixed right-0 top-12 h-full overflow-y-auto border-l-4 border-double border-[#8B4513] bg-[#f9f6f0]">
          <WantedPosterSidebar />
        </div>
      </div>
    </div>
  )
}
