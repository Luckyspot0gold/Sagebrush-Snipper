"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Calendar, MapPin, Mountain, Ticket } from "lucide-react"
import Link from "next/link"

type Attraction = {
  id: string
  name: string
  description: string
  location: string
  category: "landmark" | "event" | "activity" | "dining"
  image: string
  rating: number
  price: number | null
  dates?: string
}

const attractions: Attraction[] = [
  {
    id: "attraction-1",
    name: "Cheyenne Frontier Days VR Experience",
    description:
      "Experience the world's largest outdoor rodeo and western celebration in virtual reality. Participate in events, watch performances, and explore the grounds.",
    location: "Virtual Cheyenne",
    category: "event",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    price: 15,
    dates: "July 22-31, 2023",
  },
  {
    id: "attraction-2",
    name: "Digital Grand Teton",
    description:
      "Explore a meticulously recreated version of Grand Teton National Park with interactive wildlife and climbing experiences.",
    location: "Northwest WyoVerse",
    category: "landmark",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    price: null,
  },
  {
    id: "attraction-3",
    name: "Virtual Yellowstone Geysers",
    description:
      "Witness the power of Yellowstone's geysers, including Old Faithful, in a safe virtual environment with educational content.",
    location: "Northwest WyoVerse",
    category: "landmark",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    price: 5,
  },
  {
    id: "attraction-4",
    name: "Digital Rodeo Competition",
    description:
      "Test your skills in various rodeo events including bull riding, barrel racing, and roping in this interactive experience.",
    location: "Frontier Town",
    category: "activity",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.5,
    price: 10,
  },
  {
    id: "attraction-5",
    name: "Western Saloon Dining Experience",
    description:
      "Enjoy virtual western cuisine and entertainment in an authentic saloon setting with live music and performances.",
    location: "Frontier Town",
    category: "dining",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.3,
    price: 25,
  },
  {
    id: "attraction-6",
    name: "Devil's Tower Climbing Simulation",
    description:
      "Experience the thrill of climbing Wyoming's famous Devil's Tower in a realistic VR simulation with varying difficulty levels.",
    location: "Northeast WyoVerse",
    category: "activity",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    price: 12,
  },
]

export function TourismPortal() {
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null)
  const { toast } = useToast()

  const handleBookTicket = (attraction: Attraction) => {
    toast({
      title: "Booking Confirmed",
      description: `Your visit to ${attraction.name} has been booked.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="p-4 border rounded-lg flex flex-col items-center text-center">
          <Mountain className="h-10 w-10 text-primary mb-2" />
          <h3 className="font-medium">Natural Wonders</h3>
          <p className="text-sm text-muted-foreground mt-1">Explore Wyoming's iconic landscapes in virtual reality</p>
        </div>

        <div className="p-4 border rounded-lg flex flex-col items-center text-center">
          <Calendar className="h-10 w-10 text-primary mb-2" />
          <h3 className="font-medium">Events & Festivals</h3>
          <p className="text-sm text-muted-foreground mt-1">Experience Wyoming's cultural celebrations</p>
        </div>

        <div className="p-4 border rounded-lg flex flex-col items-center text-center">
          <Ticket className="h-10 w-10 text-primary mb-2" />
          <h3 className="font-medium">Activities</h3>
          <p className="text-sm text-muted-foreground mt-1">Participate in interactive western experiences</p>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-bold mb-4">Featured Attractions</h3>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Attractions</TabsTrigger>
            <TabsTrigger value="landmark">Landmarks</TabsTrigger>
            <TabsTrigger value="event">Events</TabsTrigger>
            <TabsTrigger value="activity">Activities</TabsTrigger>
            <TabsTrigger value="dining">Dining</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {attractions.map((attraction) => (
                <AttractionCard
                  key={attraction.id}
                  attraction={attraction}
                  onClick={() => setSelectedAttraction(attraction)}
                />
              ))}
            </div>
          </TabsContent>

          {["landmark", "event", "activity", "dining"].map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {attractions
                  .filter((attraction) => attraction.category === category)
                  .map((attraction) => (
                    <AttractionCard
                      key={attraction.id}
                      attraction={attraction}
                      onClick={() => setSelectedAttraction(attraction)}
                    />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {selectedAttraction && (
        <div className="border-t pt-6">
          <div className="border rounded-lg overflow-hidden">
            <div className="w-full h-64 bg-accent/10 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p className="font-medium">{selectedAttraction.name}</p>
                <p className="text-sm">{selectedAttraction.location}</p>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedAttraction.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{selectedAttraction.location}</span>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedAttraction.category === "landmark"
                      ? "bg-blue-100 text-blue-800"
                      : selectedAttraction.category === "event"
                        ? "bg-purple-100 text-purple-800"
                        : selectedAttraction.category === "activity"
                          ? "bg-green-100 text-green-800"
                          : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {selectedAttraction.category.charAt(0).toUpperCase() + selectedAttraction.category.slice(1)}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < Math.floor(selectedAttraction.rating) ? "text-yellow-500" : "text-gray-300"}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm">{selectedAttraction.rating.toFixed(1)}</span>
              </div>

              <p className="mt-4">{selectedAttraction.description}</p>

              {selectedAttraction.dates && (
                <div className="mt-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>{selectedAttraction.dates}</span>
                </div>
              )}

              <div className="mt-6 flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold">
                    {selectedAttraction.price ? `${selectedAttraction.price} WyoCoin` : "Free Entry"}
                  </span>
                  <p className="text-sm text-muted-foreground">per person</p>
                </div>
                <Button onClick={() => handleBookTicket(selectedAttraction)}>Book Now</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="border-t pt-6">
        <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-primary" />
              <div>
                <h4 className="font-medium">Cheyenne Frontier Days</h4>
                <p className="text-sm text-muted-foreground">July 22-31, 2023</p>
              </div>
            </div>
            <p className="text-sm mt-2">
              The "Daddy of 'em All" is coming to the WyoVerse! Experience rodeo events, concerts, and western
              celebrations in virtual reality.
            </p>
            <div className="mt-4">
              <Link href="#" className="text-primary text-sm hover:underline">
                View Event Details
              </Link>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-primary" />
              <div>
                <h4 className="font-medium">Digital Wyoming State Fair</h4>
                <p className="text-sm text-muted-foreground">August 15-20, 2023</p>
              </div>
            </div>
            <p className="text-sm mt-2">
              Join us for the virtual state fair featuring agricultural exhibits, competitions, and entertainment for
              the whole family.
            </p>
            <div className="mt-4">
              <Link href="#" className="text-primary text-sm hover:underline">
                View Event Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AttractionCard({
  attraction,
  onClick,
}: {
  attraction: Attraction
  onClick: () => void
}) {
  return (
    <div
      className="border rounded-lg overflow-hidden cursor-pointer hover:border-primary transition-colors"
      onClick={onClick}
    >
      <div className="w-full h-40 bg-accent/10 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p className="font-medium">{attraction.name}</p>
          <p className="text-sm">{attraction.location}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{attraction.name}</h3>
          <div
            className={`px-2 py-1 rounded-full text-xs ${
              attraction.category === "landmark"
                ? "bg-blue-100 text-blue-800"
                : attraction.category === "event"
                  ? "bg-purple-100 text-purple-800"
                  : attraction.category === "activity"
                    ? "bg-green-100 text-green-800"
                    : "bg-orange-100 text-orange-800"
            }`}
          >
            {attraction.category.charAt(0).toUpperCase() + attraction.category.slice(1)}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <MapPin className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{attraction.location}</span>
        </div>
        <p className="text-sm mt-2 line-clamp-2">{attraction.description}</p>
        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm">{attraction.rating.toFixed(1)}</span>
          </div>
          <span className="font-medium">{attraction.price ? `${attraction.price} WyoCoin` : "Free"}</span>
        </div>
      </div>
    </div>
  )
}
