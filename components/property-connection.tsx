"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Home, MapPin } from "lucide-react"

export function PropertyConnection() {
  const [propertyType, setPropertyType] = useState("")
  const [address, setAddress] = useState("")
  const [coordinates, setCoordinates] = useState("")
  const [description, setDescription] = useState("")
  const { toast } = useToast()

  const handleConnect = () => {
    if (!propertyType || !address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Property Connection Initiated",
      description: "Your property connection request has been submitted for verification.",
    })

    // Reset form
    setPropertyType("")
    setAddress("")
    setCoordinates("")
    setDescription("")
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="p-4 border rounded-lg flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Home className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium">Connect Real Estate</h3>
          <p className="text-sm text-muted-foreground mt-1">Link your physical property to its digital twin</p>
        </div>

        <div className="p-4 border rounded-lg flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium">Geo-Synchronization</h3>
          <p className="text-sm text-muted-foreground mt-1">Sync real-world location data with WyoVerse</p>
        </div>

        <div className="p-4 border rounded-lg flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Check className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium">Verification</h3>
          <p className="text-sm text-muted-foreground mt-1">Secure property verification process</p>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-bold mb-4">Property Connection Form</h3>

        <Tabs defaultValue="residential" className="space-y-4">
          <TabsList>
            <TabsTrigger value="residential">Residential</TabsTrigger>
            <TabsTrigger value="commercial">Commercial</TabsTrigger>
            <TabsTrigger value="land">Land</TabsTrigger>
          </TabsList>

          <TabsContent value="residential" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="property-type">Property Type</Label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger id="property-type">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="condo">Condominium</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Enter your property address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coordinates">Coordinates (optional)</Label>
                <Input
                  id="coordinates"
                  placeholder="Latitude, Longitude"
                  value={coordinates}
                  onChange={(e) => setCoordinates(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Property Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your property"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={handleConnect}>Connect Property</Button>
          </TabsContent>

          <TabsContent value="commercial" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="commercial-type">Property Type</Label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger id="commercial-type">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="office">Office Building</SelectItem>
                    <SelectItem value="retail">Retail Space</SelectItem>
                    <SelectItem value="industrial">Industrial Property</SelectItem>
                    <SelectItem value="mixed">Mixed Use</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="commercial-address">Address</Label>
                <Input
                  id="commercial-address"
                  placeholder="Enter your property address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="commercial-coordinates">Coordinates (optional)</Label>
                <Input
                  id="commercial-coordinates"
                  placeholder="Latitude, Longitude"
                  value={coordinates}
                  onChange={(e) => setCoordinates(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="commercial-description">Property Description</Label>
                <Textarea
                  id="commercial-description"
                  placeholder="Describe your property"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={handleConnect}>Connect Property</Button>
          </TabsContent>

          <TabsContent value="land" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="land-type">Land Type</Label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger id="land-type">
                    <SelectValue placeholder="Select land type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ranch">Ranch</SelectItem>
                    <SelectItem value="farm">Farm</SelectItem>
                    <SelectItem value="vacant">Vacant Land</SelectItem>
                    <SelectItem value="recreational">Recreational Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="land-address">Address or Location</Label>
                <Input
                  id="land-address"
                  placeholder="Enter your land location"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="land-coordinates">Coordinates</Label>
                <Input
                  id="land-coordinates"
                  placeholder="Latitude, Longitude"
                  value={coordinates}
                  onChange={(e) => setCoordinates(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="land-description">Land Description</Label>
                <Textarea
                  id="land-description"
                  placeholder="Describe your land"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={handleConnect}>Connect Property</Button>
          </TabsContent>
        </Tabs>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-bold mb-4">Benefits of Property Connection</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium">Digital Twin</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Create a virtual representation of your property in the WyoVerse.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium">Asset Tokenization</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Convert real property value into digital assets and tokens.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium">Market Access</h4>
            <p className="text-sm text-muted-foreground mt-1">
              List your property in the WyoVerse marketplace for virtual tours and sales.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
