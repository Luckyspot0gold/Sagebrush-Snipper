"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { BookOpen, Map, Users, Landmark, Calendar } from "lucide-react"

type Tribe = {
  id: string
  name: string
  description: string
  territory: string
  history: string
  culture: string
  image: string
}

const tribes: Tribe[] = [
  {
    id: "tribe-1",
    name: "Eastern Shoshone",
    description:
      "The Eastern Shoshone have lived in the Wind River region for centuries and have a rich cultural heritage.",
    territory: "Wind River Reservation",
    history:
      "The Eastern Shoshone were originally known as the Mountain People and have inhabited the Rocky Mountain region for thousands of years. In 1868, they were granted the Wind River Reservation through the Fort Bridger Treaty.",
    culture:
      "The Eastern Shoshone are known for their Sun Dance ceremony, traditional beadwork, and strong connection to the land. They have a rich oral tradition that preserves their history and cultural knowledge.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "tribe-2",
    name: "Northern Arapaho",
    description:
      "The Northern Arapaho share the Wind River Reservation with the Eastern Shoshone and maintain their distinct cultural identity.",
    territory: "Wind River Reservation",
    history:
      "The Northern Arapaho were originally Plains people who migrated to Wyoming. In 1878, they were relocated to the Wind River Reservation, which they now share with the Eastern Shoshone.",
    culture:
      "The Northern Arapaho are known for their ceremonial traditions, including the Sacred Pipe ceremony and the Offerings Lodge (Sun Dance). They have preserved their language and continue to teach it to younger generations.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "tribe-3",
    name: "Crow",
    description:
      "While primarily based in Montana, the Crow people have historical connections to parts of northern Wyoming.",
    territory: "Northern Wyoming/Southern Montana",
    history:
      "The Crow, or Apsáalooke, were originally part of the Hidatsa people. They migrated west and established themselves as a distinct tribe around the 1600s. They had a significant presence in northern Wyoming before being relocated to their current reservation in Montana.",
    culture:
      "The Crow are known for their horsemanship, distinctive beadwork patterns, and clan system. Their cultural traditions include the Sun Dance and other ceremonies that maintain their spiritual connection to the land and their ancestors.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "tribe-4",
    name: "Cheyenne",
    description: "The Cheyenne have historical ties to eastern Wyoming and were known for their warrior traditions.",
    territory: "Eastern Wyoming/Montana",
    history:
      "The Cheyenne migrated from the Great Lakes region to the Plains in the 1700s. They became skilled horsemen and buffalo hunters. After conflicts with settlers and the U.S. military, including the Battle of Little Bighorn, they were eventually relocated to reservations in Montana and Oklahoma.",
    culture:
      "The Cheyenne are known for their military societies, ceremonial traditions, and artistic expressions. Their cultural practices include the Arrow Renewal ceremony and the Sacred Buffalo Hat tradition.",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function NativeHistory() {
  const [selectedTribe, setSelectedTribe] = useState<Tribe | null>(null)
  const { toast } = useToast()

  const handleLearnMore = (tribe: Tribe) => {
    setSelectedTribe(tribe)
  }

  return (
    <div className="space-y-6">
      <div className="p-4 border rounded-lg">
        <p className="italic text-muted-foreground">
          This section is managed and curated by representatives from Wyoming's indigenous tribes to ensure authentic
          representation of their history, culture, and knowledge.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="p-4 border rounded-lg flex flex-col items-center text-center">
          <Users className="h-10 w-10 text-primary mb-2" />
          <h3 className="font-medium">Tribal Nations</h3>
          <p className="text-sm text-muted-foreground mt-1">Learn about Wyoming's indigenous peoples</p>
        </div>

        <div className="p-4 border rounded-lg flex flex-col items-center text-center">
          <Map className="h-10 w-10 text-primary mb-2" />
          <h3 className="font-medium">Sacred Lands</h3>
          <p className="text-sm text-muted-foreground mt-1">Explore culturally significant locations</p>
        </div>

        <div className="p-4 border rounded-lg flex flex-col items-center text-center">
          <BookOpen className="h-10 w-10 text-primary mb-2" />
          <h3 className="font-medium">Oral Traditions</h3>
          <p className="text-sm text-muted-foreground mt-1">Stories passed down through generations</p>
        </div>

        <div className="p-4 border rounded-lg flex flex-col items-center text-center">
          <Calendar className="h-10 w-10 text-primary mb-2" />
          <h3 className="font-medium">Cultural Events</h3>
          <p className="text-sm text-muted-foreground mt-1">Participate in virtual ceremonies and powwows</p>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-bold mb-4">Wyoming's Indigenous Tribes</h3>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="eastern-shoshone">Eastern Shoshone</TabsTrigger>
            <TabsTrigger value="northern-arapaho">Northern Arapaho</TabsTrigger>
            <TabsTrigger value="crow">Crow</TabsTrigger>
            <TabsTrigger value="cheyenne">Cheyenne</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {tribes.map((tribe) => (
                <div key={tribe.id} className="border rounded-lg overflow-hidden">
                  <div className="w-full h-40 bg-accent/10 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <p className="font-medium">{tribe.name}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{tribe.name}</h3>
                    <p className="text-sm text-muted-foreground">Territory: {tribe.territory}</p>
                    <p className="text-sm mt-2">{tribe.description}</p>
                    <Button className="mt-4" size="sm" onClick={() => handleLearnMore(tribe)}>
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {tribes.map((tribe) => (
            <TabsContent key={tribe.id} value={tribe.name.toLowerCase().replace(" ", "-")} className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="w-full h-64 bg-accent/10 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p className="font-medium">{tribe.name}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold">{tribe.name}</h2>
                  <p className="text-muted-foreground">Territory: {tribe.territory}</p>

                  <div className="mt-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">History</h3>
                      <p className="mt-2">{tribe.history}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Culture</h3>
                      <p className="mt-2">{tribe.culture}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {selectedTribe && (
        <div className="border-t pt-6">
          <div className="border rounded-lg overflow-hidden">
            <div className="w-full h-64 bg-accent/10 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p className="font-medium">{selectedTribe.name}</p>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold">{selectedTribe.name}</h2>
              <p className="text-muted-foreground">Territory: {selectedTribe.territory}</p>

              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-lg font-medium">History</h3>
                  <p className="mt-2">{selectedTribe.history}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Culture</h3>
                  <p className="mt-2">{selectedTribe.culture}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="border-t pt-6">
        <h3 className="text-xl font-bold mb-4">Sacred Sites</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="border rounded-lg overflow-hidden">
            <div className="w-full h-40 bg-accent/10 flex items-center justify-center">
              <Landmark className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="p-4">
              <h3 className="font-medium">Devils Tower (Bear Lodge)</h3>
              <p className="text-sm text-muted-foreground">Sacred to multiple tribes</p>
              <p className="text-sm mt-2">
                Known as Bear Lodge to many indigenous peoples, this site holds spiritual significance and is featured
                in many tribal creation stories.
              </p>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="w-full h-40 bg-accent/10 flex items-center justify-center">
              <Landmark className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="p-4">
              <h3 className="font-medium">Medicine Wheel</h3>
              <p className="text-sm text-muted-foreground">Bighorn Mountains</p>
              <p className="text-sm mt-2">
                This ancient stone circle has been used for centuries by various tribes for prayer, vision quests, and
                astronomical observations.
              </p>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="w-full h-40 bg-accent/10 flex items-center justify-center">
              <Landmark className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="p-4">
              <h3 className="font-medium">Wind River Hot Springs</h3>
              <p className="text-sm text-muted-foreground">Wind River Reservation</p>
              <p className="text-sm mt-2">
                These natural hot springs have been used for healing ceremonies by the Shoshone and Arapaho people for
                generations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-bold mb-4">Upcoming Cultural Events</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-primary" />
              <div>
                <h4 className="font-medium">Eastern Shoshone Indian Days</h4>
                <p className="text-sm text-muted-foreground">June 24-26, 2023</p>
              </div>
            </div>
            <p className="text-sm mt-2">
              Experience traditional dancing, drumming, and cultural exhibitions in this virtual celebration of Eastern
              Shoshone culture.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-primary" />
              <div>
                <h4 className="font-medium">Northern Arapaho Powwow</h4>
                <p className="text-sm text-muted-foreground">August 5-7, 2023</p>
              </div>
            </div>
            <p className="text-sm mt-2">
              Join the Northern Arapaho tribe for their annual powwow featuring dance competitions, traditional food,
              and cultural demonstrations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
