"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, MessageSquare, Plus, Search } from "lucide-react"

type Listing = {
  id: string
  title: string
  description: string
  price: number
  seller: string
  category: "property" | "items" | "services" | "jobs" | "community"
  location: string
  image: string
  date: string
}

const listings: Listing[] = [
  {
    id: "listing-1",
    title: "Prime Virtual Land Plot Near River",
    description: "Beautiful 2.5 acre virtual land plot with water rights and mining access. Perfect for development.",
    price: 500,
    seller: "Wyoming Ranger",
    category: "property",
    location: "River Bend",
    image: "/placeholder.svg?height=100&width=100",
    date: "2023-07-15",
  },
  {
    id: "listing-2",
    title: "Mining Equipment Bundle",
    description: "Complete set of virtual mining equipment including drill, scanner, and storage containers.",
    price: 150,
    seller: "Digital Prospector",
    category: "items",
    location: "Gold Ridge",
    image: "/placeholder.svg?height=100&width=100",
    date: "2023-07-18",
  },
  {
    id: "listing-3",
    title: "Virtual Property Development Services",
    description:
      "Professional development services for your WyoVerse property. Custom building design and construction.",
    price: 75,
    seller: "Frontier Builder",
    category: "services",
    location: "WyoVerse",
    image: "/placeholder.svg?height=100&width=100",
    date: "2023-07-20",
  },
  {
    id: "listing-4",
    title: "Ranch Hand Needed",
    description:
      "Looking for help managing a large virtual ranch. Responsibilities include livestock management and property maintenance.",
    price: 25,
    seller: "Ranch Owner",
    category: "jobs",
    location: "Prairie View",
    image: "/placeholder.svg?height=100&width=100",
    date: "2023-07-22",
  },
  {
    id: "listing-5",
    title: "Community Event: Digital Rodeo",
    description: "Join us for a virtual rodeo event this weekend. Prizes for participants and spectators welcome.",
    price: 0,
    seller: "WyoVerse Events",
    category: "community",
    location: "Frontier Town",
    image: "/placeholder.svg?height=100&width=100",
    date: "2023-07-25",
  },
]

export function Classifieds() {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("all")
  const [showNewListingForm, setShowNewListingForm] = useState(false)
  const [newListing, setNewListing] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    location: "",
  })
  const { toast } = useToast()

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = category === "all" || listing.category === category
    return matchesSearch && matchesCategory
  })

  const handleContact = (listing: Listing) => {
    toast({
      title: "Contact Request Sent",
      description: `Your message has been sent to ${listing.seller} regarding "${listing.title}".`,
    })
  }

  const handlePurchase = (listing: Listing) => {
    toast({
      title: "Purchase Initiated",
      description: `You're purchasing "${listing.title}" for ${listing.price} WyoCoin.`,
    })
  }

  const handleSubmitListing = () => {
    if (!newListing.title || !newListing.description || !newListing.price || !newListing.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Listing Created",
      description: "Your classified listing has been submitted for review.",
    })

    setShowNewListingForm(false)
    setNewListing({
      title: "",
      description: "",
      price: "",
      category: "",
      location: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search classifieds..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="property">Property</SelectItem>
            <SelectItem value="items">Items</SelectItem>
            <SelectItem value="services">Services</SelectItem>
            <SelectItem value="jobs">Jobs</SelectItem>
            <SelectItem value="community">Community</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setShowNewListingForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Listing
        </Button>
      </div>

      {showNewListingForm && (
        <div className="border rounded-lg p-4">
          <h3 className="text-xl font-bold mb-4">Create New Listing</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter listing title"
                value={newListing.title}
                onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newListing.category}
                onValueChange={(value) => setNewListing({ ...newListing, category: value })}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="property">Property</SelectItem>
                  <SelectItem value="items">Items</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="jobs">Jobs</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (WyoCoin)</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                value={newListing.price}
                onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter location"
                value={newListing.location}
                onChange={(e) => setNewListing({ ...newListing, location: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your listing"
                value={newListing.description}
                onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowNewListingForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitListing}>Submit Listing</Button>
          </div>
        </div>
      )}

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Listings</TabsTrigger>
          <TabsTrigger value="property">Property</TabsTrigger>
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredListings.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} onContact={handleContact} onPurchase={handlePurchase} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No listings found matching your search criteria.</p>
            </div>
          )}
        </TabsContent>

        {["property", "items", "services", "jobs", "community"].map((cat) => (
          <TabsContent key={cat} value={cat} className="space-y-4">
            {filteredListings.filter((listing) => listing.category === cat).length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredListings
                  .filter((listing) => listing.category === cat)
                  .map((listing) => (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      onContact={handleContact}
                      onPurchase={handlePurchase}
                    />
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No listings found in this category.</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function ListingCard({
  listing,
  onContact,
  onPurchase,
}: {
  listing: Listing
  onContact: (listing: Listing) => void
  onPurchase: (listing: Listing) => void
}) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{listing.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{listing.location}</span>
              <span>•</span>
              <span>{listing.date}</span>
            </div>
          </div>
          <div
            className={`px-2 py-1 rounded-full text-xs ${
              listing.category === "property"
                ? "bg-blue-100 text-blue-800"
                : listing.category === "items"
                  ? "bg-green-100 text-green-800"
                  : listing.category === "services"
                    ? "bg-purple-100 text-purple-800"
                    : listing.category === "jobs"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
            }`}
          >
            {listing.category.charAt(0).toUpperCase() + listing.category.slice(1)}
          </div>
        </div>

        <p className="text-sm mt-2">{listing.description}</p>

        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="font-bold">{listing.price > 0 ? `${listing.price} WyoCoin` : "Free"}</span>
            <p className="text-xs text-muted-foreground">Seller: {listing.seller}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onContact(listing)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact
            </Button>
            {listing.price > 0 && (
              <Button size="sm" onClick={() => onPurchase(listing)}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Buy
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
