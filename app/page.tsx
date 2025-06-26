import { NewspaperFrontPage } from "@/components/newspaper-front-page"
import { Sidebar } from "@/components/sidebar"
import { WantedPosterSidebar } from "@/components/wanted-poster-sidebar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f4f1e8] frontier-paper">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="hidden lg:block w-64 fixed left-0 top-0 h-full overflow-y-auto border-r-4 border-double border-[#8B4513] bg-[#f9f6f0]">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64 lg:mr-80">
          <NewspaperFrontPage />
        </div>

        {/* Right Sidebar - Wanted Posters */}
        <div className="hidden lg:block w-80 fixed right-0 top-0 h-full overflow-y-auto border-l-4 border-double border-[#8B4513] bg-[#f9f6f0]">
          <WantedPosterSidebar />
        </div>
      </div>
    </div>
  )
}
