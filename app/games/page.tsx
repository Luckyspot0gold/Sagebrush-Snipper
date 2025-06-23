import { EnhancedGamesPortal } from "@/components/enhanced-games-portal"
import { CharacterProgression } from "@/components/character-progression"
import { NewspaperLayout } from "@/components/newspaper-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GamesPage() {
  return (
    <NewspaperLayout>
      <Tabs defaultValue="games" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="games">Games Portal</TabsTrigger>
          <TabsTrigger value="character">Character</TabsTrigger>
        </TabsList>

        <TabsContent value="games">
          <EnhancedGamesPortal />
        </TabsContent>

        <TabsContent value="character">
          <CharacterProgression />
        </TabsContent>
      </Tabs>
    </NewspaperLayout>
  )
}
