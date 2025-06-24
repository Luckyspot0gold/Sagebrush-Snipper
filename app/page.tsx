import { NewspaperFrontPage } from "@/components/newspaper-front-page"
import { HackathonUIShowcase } from "@/components/hackathon-ui-showcase"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Tabs defaultValue="newspaper" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-gradient-to-r from-blue-600 to-purple-600">
          <TabsTrigger value="newspaper" className="text-white font-bold text-lg">
            📰 WyoVerse Pioneer Newspaper
          </TabsTrigger>
          <TabsTrigger value="hackathon" className="text-white font-bold text-lg">
            🏆 Hackathon Showcase
          </TabsTrigger>
        </TabsList>

        <TabsContent value="newspaper">
          <NewspaperFrontPage />
        </TabsContent>

        <TabsContent value="hackathon">
          <HackathonUIShowcase />
        </TabsContent>
      </Tabs>
    </div>
  )
}
