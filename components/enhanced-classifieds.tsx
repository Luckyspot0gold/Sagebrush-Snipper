"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ShoppingCart, MessageSquare, Plus, Search, Link, FolderSyncIcon as Sync, Facebook, MapPin } from "lucide-react"
import { marketplaceAPI, type MarketplaceListing } from "@/lib/marketplace-api"
import { useUserProfileStore } from "@/lib/stores/user-profile-store"
import Image from "next/image"

export function EnhancedClassifieds() {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("all")
  const [showNewListingForm, setShowNewListingForm] = useState(false)
  const [externalListings, setExternalListings] = useState<MarketplaceListing[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showMarketplaceSettings, setShowMarketplaceSettings] = useState(false)

  const { profile, connectMarketplace, disconnectMarketplace } = useUserProfileStore()
  const { toast } = useToast()

  const [newListing, setNewListing] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    location: "",
    crossPost: {
      facebook: false,
      nextdoor: false,
      offerup: false,
    },
  })

  // Load external marketplace listings
  useEffect(() => {
    loadExternalListings()
  }, [])

  const loadExternalListings = async () => {
    setIsLoading(true)
    try {
      const listings = await marketplaceAPI.getListings()
      setExternalListings(listings)
    } catch (error) {
      console.error("Failed to load external listings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarketplaceConnect = async (platform: "facebook" | "nextdoor" | "offerup") => {
    try {
      let success = false

      switch (platform) {
        case "facebook":
          // In a real implementation, this would open Facebook OAuth
          success = await marketplaceAPI.connectFacebook("mock-token")
          break
        case "nextdoor":
          success = await marketplaceAPI.connectNextdoor({ apiKey: "mock-key" })
          break
        case "offerup":
          success = await marketplaceAPI.connectOfferUp({ username: "mock-user" })
          break
      }

      if (success) {
        connectMarketplace(platform, `${platform}-user-id`)
        toast({
          title: "Connected Successfully",
          description: `Your ${platform} account has been connected.`,
        })
        loadExternalListings()
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: `Failed to connect to ${platform}. Please try again.`,
        variant: "destructive",
      })
    }
  }

  const handleSubmitListing = async () => {
    if (!newListing.title || !newListing.description || !newListing.price || !newListing.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Create listing in WyoVerse
    toast({
      title: "Listing Created",
      description: "Your classified listing has been submitted for review.",
    })

    // Cross-post to connected platforms
    const crossPostPromises = []
    if (newListing.crossPost.facebook && profile?.marketplaceConnections.facebook.connected) {
      crossPostPromises.push(crossPostToFacebook(newListing))
    }
    if (newListing.crossPost.nextdoor && profile?.marketplaceConnections.nextdoor.connected) {
      crossPostPromises.push(crossPostToNextdoor(newListing))
    }
    if (newListing.crossPost.offerup && profile?.marketplaceConnections.offerup.connected) {
      crossPostPromises.push(crossPostToOfferUp(newListing))
    }

    if (crossPostPromises.length > 0) {
      try {
        await Promise.all(crossPostPromises)
        toast({
          title: "Cross-Posted Successfully",
          description: `Your listing has been posted to ${crossPostPromises.length} additional platform(s).`,
        })
      } catch (error) {
        toast({
          title: "Cross-Post Warning",
          description: "Some cross-posts may have failed. Check your marketplace connections.",
          variant: "destructive",
        })
      }
    }

    setShowNewListingForm(false)
    setNewListing({
      title: "",
      description: "",
      price: "",
      category: "",
      location: "",
      crossPost: { facebook: false, nextdoor: false, offerup: false },
    })
  }

  const crossPostToFacebook = async (listing: any) => {
    // Mock implementation - would use Facebook Graph API
    console.log("Cross-posting to Facebook:", listing)
  }

  const crossPostToNextdoor = async (listing: any) => {
    // Mock implementation - would use Nextdoor API
    console.log("Cross-posting to Nextdoor:", listing)
  }

  const crossPostToOfferUp = async (listing: any) => {
    // Mock implementation - would use OfferUp API or automation
    console.log("Cross-posting to OfferUp:", listing)
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook className="h-4 w-4" />
      case "nextdoor":
        return <MapPin className="h-4 w-4" />
      case "offerup":
        return <ShoppingCart className="h-4 w-4" />
      default:
        return null
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "facebook":
        return "bg-blue-100 text-blue-800"
      case "nextdoor":
        return "bg-green-100 text-green-800"
      case "offerup":
        return "bg-purple-100 text-purple-800"
      case "wyoverse":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const allListings = [...externalListings]
  const filteredListings = allListings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = category === "all" || listing.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header with Marketplace Connections */}
      <div className="newspaper-article">
        <div className="newspaper-article-inner">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold font-serif">WYOVERSE CLASSIFIEDS</h1>
            <Button variant="outline" onClick={() => setShowMarketplaceSettings(!showMarketplaceSettings)}>
              <Link className="h-4 w-4 mr-2" />
              Marketplace Connections
            </Button>
          </div>

          {showMarketplaceSettings && (
            <div className="border-2 border-black p-4 mb-4 bg-gray-50">
              <h3 className="text-xl font-bold font-serif mb-4">Connect Your Marketplace Accounts</h3>
              <div className="grid gap-4 md:grid-cols-3">
                {(["facebook", "nextdoor", "offerup"] as const).map((platform) => (
                  <div key={platform} className="border border-gray-300 p-3 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getPlatformIcon(platform)}
                        <span className="font-semibold capitalize">{platform}</span>
                      </div>
                      <Badge variant={profile?.marketplaceConnections[platform].connected ? "default" : "secondary"}>
                        {profile?.marketplaceConnections[platform].connected ? "Connected" : "Not Connected"}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant={profile?.marketplaceConnections[platform].connected ? "destructive" : "default"}
                      onClick={() => {
                        if (profile?.marketplaceConnections[platform].connected) {
                          disconnectMarketplace(platform)
                          toast({ title: `Disconnected from ${platform}` })
                        } else {
                          handleMarketplaceConnect(platform)
                        }
                      }}
                      className="w-full"
                    >
                      {profile?.marketplaceConnections[platform].connected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search all marketplaces..."
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
            <SelectItem value="sporting-goods">Sporting Goods</SelectItem>
            <SelectItem value="tools">Tools</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setShowNewListingForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Listing
        </Button>
        <Button variant="outline" onClick={loadExternalListings} disabled={isLoading}>
          <Sync className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Sync
        </Button>
      </div>

      {/* New Listing Form with Cross-Posting */}
      {showNewListingForm && (
        <div className="newspaper-article">
          <div className="newspaper-article-inner">
            <h3 className="text-xl font-bold font-serif mb-4">Create New Listing</h3>
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
                    <SelectItem value="sporting-goods">Sporting Goods</SelectItem>
                    <SelectItem value="tools">Tools</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (USD)</Label>
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

              {/* Cross-posting options */}
              <div className="space-y-2 md:col-span-2">
                <Label>Cross-post to connected marketplaces:</Label>
                <div className="flex gap-4">
                  {(["facebook", "nextdoor", "offerup"] as const).map((platform) => (
                    <div key={platform} className="flex items-center space-x-2">
                      <Switch
                        id={`crosspost-${platform}`}
                        checked={newListing.crossPost[platform]}
                        onCheckedChange={(checked) =>
                          setNewListing({
                            ...newListing,
                            crossPost: { ...newListing.crossPost, [platform]: checked },
                          })
                        }
                        disabled={!profile?.marketplaceConnections[platform].connected}
                      />
                      <Label htmlFor={`crosspost-${platform}`} className="capitalize">
                        {platform}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowNewListingForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitListing}>Submit Listing</Button>
            </div>
          </div>
        </div>
      )}

      {/* Listings Grid */}
      <div className="newspaper-article">
        <div className="newspaper-article-inner">
          <h2 className="text-2xl font-bold font-serif mb-4">All Marketplace Listings ({filteredListings.length})</h2>

          {filteredListings.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredListings.map((listing) => (
                <MarketplaceListingCard key={`${listing.platform}-${listing.id}`} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No listings found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function MarketplaceListingCard({ listing }: { listing: MarketplaceListing }) {
  const { toast } = useToast()

  const handleContact = () => {
    if (listing.url) {
      window.open(listing.url, "_blank")
    } else {
      toast({
        title: "Contact Request Sent",
        description: `Your message has been sent to ${listing.seller.name} regarding "${listing.title}".`,
      })
    }
  }

  const handlePurchase = () => {
    if (listing.url) {
      window.open(listing.url, "_blank")
    } else {
      toast({
        title: "Purchase Initiated",
        description: `You're purchasing "${listing.title}" for $${listing.price}.`,
      })
    }
  }

  return (
    <div className="border-4 border-black p-1">
      <div className="border-2 border-black p-4 bg-white">
        <div className="flex justify-between items-start mb-2">
          <Badge className={getPlatformColor(listing.platform)}>{listing.platform.toUpperCase()}</Badge>
          <span className="text-lg font-bold">${listing.price}</span>
        </div>

        {listing.images.length > 0 && (
          <div className="relative h-32 mb-3">
            <Image
              src={listing.images[0] || "/placeholder.svg"}
              alt={listing.title}
              fill
              className="object-cover border border-black"
            />
          </div>
        )}

        <h3 className="font-bold font-serif text-lg mb-2">{listing.title}</h3>
        <p className="text-sm mb-3 line-clamp-2">{listing.description}</p>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>{listing.location}</span>
          <span>{listing.datePosted}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold">{listing.seller.name}</p>
            {listing.seller.rating && <p className="text-xs">⭐ {listing.seller.rating}/5.0</p>}
          </div>
          {listing.seller.verified && (
            <Badge variant="secondary" className="text-xs">
              Verified
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleContact} className="flex-1">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact
          </Button>
          <Button size="sm" onClick={handlePurchase} className="flex-1">
            <ShoppingCart className="h-4 w-4 mr-2" />
            {listing.url ? "View" : "Buy"}
          </Button>
        </div>
      </div>
    </div>
  )
}

function getPlatformColor(platform: string) {
  switch (platform) {
    case "facebook":
      return "bg-blue-100 text-blue-800"
    case "nextdoor":
      return "bg-green-100 text-green-800"
    case "offerup":
      return "bg-purple-100 text-purple-800"
    case "wyoverse":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
