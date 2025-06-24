import { NewspaperFrontPage } from "@/components/newspaper-front-page"
import { HackathonUIShowcase } from "@/components/hackathon-ui-showcase"
import { RevenueDashboard } from "@/components/revenue-dashboard"
import { GamePreviewSystem } from "@/components/game-preview-system"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HomePage() {
  return (
    <div className="min-h-screen newspaper-bg">
      <Tabs defaultValue="newspaper" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6 bg-gradient-to-r from-amber-600 to-amber-800">
          <TabsTrigger value="newspaper" className="text-white font-bold">
            📰 Pioneer News
          </TabsTrigger>
          <TabsTrigger value="games" className="text-white font-bold">
            🎮 Gaming Arcade
          </TabsTrigger>
          <TabsTrigger value="revenue" className="text-white font-bold">
            💰 Revenue Saloon
          </TabsTrigger>
          <TabsTrigger value="hackathon" className="text-white font-bold">
            🏆 Hackathon Demo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="newspaper">
          <div className="max-w-7xl mx-auto p-6">
            <NewspaperFrontPage />
          </div>
        </TabsContent>

        <TabsContent value="games">
          <div className="max-w-7xl mx-auto p-6">
            <GamePreviewSystem />
          </div>
        </TabsContent>

        <TabsContent value="revenue">
          <div className="max-w-7xl mx-auto p-6">
            <RevenueDashboard />
          </div>
        </TabsContent>

        <TabsContent value="hackathon">
          <div className="max-w-7xl mx-auto p-6">
            <HackathonUIShowcase />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
