"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MessageSquare, DollarSign, CheckCircle, XCircle } from "lucide-react"
import { useAppointmentStore } from "@/lib/stores/appointment-store"
import { useUserProfileStore } from "@/lib/stores/user-profile-store"
import type { MarketplaceListing } from "@/lib/marketplace-api"
import type { Offer } from "@/lib/types/marketplace"
import { format } from "date-fns"

interface OfferManagementProps {
  listing: MarketplaceListing
  isOwner?: boolean
}

export function OfferManagement({ listing, isOwner = false }: OfferManagementProps) {
  const [showOfferDialog, setShowOfferDialog] = useState(false)
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)

  const { profile } = useUserProfileStore()
  const { offers, createOffer, updateOfferStatus, getOffersForListing, scheduleAppointment } = useAppointmentStore()

  const { toast } = useToast()

  const [newOffer, setNewOffer] = useState({
    amount: listing.price,
    message: "",
  })

  const [appointmentData, setAppointmentData] = useState({
    date: new Date(),
    time: "10:00",
    duration: 30,
    location: {
      address: "",
      meetingType: "public_place" as const,
      notes: "",
    },
  })

  const listingOffers = getOffersForListing(listing.id)

  const handleCreateOffer = () => {
    if (!profile?.id) {
      toast({
        title: "Please Sign In",
        description: "You need to be signed in to make an offer.",
        variant: "destructive",
      })
      return
    }

    if (newOffer.amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid offer amount.",
        variant: "destructive",
      })
      return
    }

    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // Offer expires in 7 days

    createOffer({
      listingId: listing.id,
      buyerId: profile.id,
      buyerName: profile.name,
      buyerAvatar: profile.avatar,
      amount: newOffer.amount,
      message: newOffer.message,
      status: "pending",
      expiresAt: expiresAt.toISOString(),
    })

    toast({
      title: "Offer Submitted",
      description: `Your offer of $${newOffer.amount} has been sent to the seller.`,
    })

    setShowOfferDialog(false)
    setNewOffer({ amount: listing.price, message: "" })
  }

  const handleOfferResponse = (
    offerId: string,
    status: "accepted" | "rejected",
    counterAmount?: number,
    counterMessage?: string,
  ) => {
    if (status === "accepted") {
      // Accept offer and allow scheduling
      updateOfferStatus(offerId, "accepted")
      const offer = offers.find((o) => o.id === offerId)
      if (offer) {
        setSelectedOffer(offer)
        setShowScheduleDialog(true)
      }
      toast({
        title: "Offer Accepted",
        description: "You can now schedule a meeting with the buyer.",
      })
    } else if (status === "rejected") {
      updateOfferStatus(offerId, "rejected")
      toast({
        title: "Offer Rejected",
        description: "The offer has been declined.",
      })
    } else if (status === "countered" && counterAmount && counterMessage) {
      updateOfferStatus(offerId, "countered", {
        amount: counterAmount,
        message: counterMessage,
        createdAt: new Date().toISOString(),
      })
      toast({
        title: "Counter Offer Sent",
        description: `Counter offer of $${counterAmount} has been sent.`,
      })
    }
  }

  const handleScheduleAppointment = () => {
    if (!selectedOffer || !profile?.id) return

    if (!appointmentData.location.address) {
      toast({
        title: "Missing Location",
        description: "Please enter a meeting location.",
        variant: "destructive",
      })
      return
    }

    scheduleAppointment({
      listingId: listing.id,
      offerId: selectedOffer.id,
      sellerId: profile.id,
      sellerName: profile.name,
      buyerId: selectedOffer.buyerId,
      buyerName: selectedOffer.buyerName,
      scheduledDate: format(appointmentData.date, "yyyy-MM-dd"),
      scheduledTime: appointmentData.time,
      duration: appointmentData.duration,
      location: appointmentData.location,
      status: "scheduled",
      notifications: {
        seller: { email: true, sms: true, push: true },
        buyer: { email: true, sms: true, push: true },
      },
      listing: {
        title: listing.title,
        price: listing.price,
        images: listing.images,
      },
    })

    toast({
      title: "Appointment Scheduled",
      description: `Meeting scheduled for ${format(appointmentData.date, "MMM dd")} at ${appointmentData.time}. Both parties will receive notifications.`,
    })

    setShowScheduleDialog(false)
    setSelectedOffer(null)
  }

  const getOfferStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "countered":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {/* Make Offer Button (for buyers) */}
      {!isOwner && (
        <Dialog open={showOfferDialog} onOpenChange={setShowOfferDialog}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <DollarSign className="h-4 w-4 mr-2" />
              Make Offer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Make an Offer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="offer-amount">Offer Amount (USD)</Label>
                <Input
                  id="offer-amount"
                  type="number"
                  value={newOffer.amount}
                  onChange={(e) => setNewOffer({ ...newOffer, amount: Number(e.target.value) })}
                  placeholder="Enter your offer"
                />
                <p className="text-sm text-muted-foreground mt-1">Listed price: ${listing.price}</p>
              </div>
              <div>
                <Label htmlFor="offer-message">Message (Optional)</Label>
                <Textarea
                  id="offer-message"
                  value={newOffer.message}
                  onChange={(e) => setNewOffer({ ...newOffer, message: e.target.value })}
                  placeholder="Add a message to your offer..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowOfferDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateOffer}>Submit Offer</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Offers List */}
      {listingOffers.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold">
            {isOwner ? "Offers Received" : "Your Offers"} ({listingOffers.length})
          </h4>

          {listingOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} isOwner={isOwner} onRespond={handleOfferResponse} />
          ))}
        </div>
      )}

      {/* Schedule Appointment Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Meeting</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Meeting Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(appointmentData.date, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={appointmentData.date}
                    onSelect={(date) => date && setAppointmentData({ ...appointmentData, date })}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="meeting-time">Time</Label>
                <Select
                  value={appointmentData.time}
                  onValueChange={(time) => setAppointmentData({ ...appointmentData, time })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, "0")
                      return (
                        <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="duration">Duration</Label>
                <Select
                  value={appointmentData.duration.toString()}
                  onValueChange={(duration) => setAppointmentData({ ...appointmentData, duration: Number(duration) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 min</SelectItem>
                    <SelectItem value="30">30 min</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="meeting-type">Meeting Type</Label>
              <Select
                value={appointmentData.location.meetingType}
                onValueChange={(type: any) =>
                  setAppointmentData({
                    ...appointmentData,
                    location: { ...appointmentData.location, meetingType: type },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public_place">Public Place</SelectItem>
                  <SelectItem value="seller_location">My Location</SelectItem>
                  <SelectItem value="buyer_location">Buyer's Location</SelectItem>
                  <SelectItem value="neutral_location">Neutral Location</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="meeting-address">Meeting Address</Label>
              <Input
                id="meeting-address"
                value={appointmentData.location.address}
                onChange={(e) =>
                  setAppointmentData({
                    ...appointmentData,
                    location: { ...appointmentData.location, address: e.target.value },
                  })
                }
                placeholder="Enter full address"
              />
            </div>

            <div>
              <Label htmlFor="meeting-notes">Notes (Optional)</Label>
              <Textarea
                id="meeting-notes"
                value={appointmentData.location.notes}
                onChange={(e) =>
                  setAppointmentData({
                    ...appointmentData,
                    location: { ...appointmentData.location, notes: e.target.value },
                  })
                }
                placeholder="Additional meeting details..."
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleScheduleAppointment}>Schedule Meeting</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function OfferCard({
  offer,
  isOwner,
  onRespond,
}: {
  offer: Offer
  isOwner: boolean
  onRespond: (offerId: string, status: "accepted" | "rejected", counterAmount?: number, counterMessage?: string) => void
}) {
  const [showCounterDialog, setShowCounterDialog] = useState(false)
  const [counterOffer, setCounterOffer] = useState({
    amount: offer.amount,
    message: "",
  })

  const handleCounter = () => {
    onRespond(offer.id, "countered", counterOffer.amount, counterOffer.message)
    setShowCounterDialog(false)
  }

  return (
    <div className="border-2 border-black p-3 bg-white">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-semibold">{offer.buyerName}</p>
          <p className="text-2xl font-bold">${offer.amount}</p>
        </div>
        <Badge className={`${getOfferStatusColor(offer.status)}`}>{offer.status.toUpperCase()}</Badge>
      </div>

      {offer.message && <p className="text-sm mb-3 p-2 bg-gray-50 border border-gray-200 rounded">"{offer.message}"</p>}

      {offer.counterOffer && (
        <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm font-semibold">Counter Offer: ${offer.counterOffer.amount}</p>
          <p className="text-sm">"{offer.counterOffer.message}"</p>
        </div>
      )}

      <div className="flex justify-between items-center text-xs text-muted-foreground mb-3">
        <span>Expires: {format(new Date(offer.expiresAt), "MMM dd, yyyy")}</span>
        <span>{format(new Date(offer.createdAt), "MMM dd, HH:mm")}</span>
      </div>

      {isOwner && offer.status === "pending" && (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => onRespond(offer.id, "rejected")}>
            <XCircle className="h-4 w-4 mr-1" />
            Decline
          </Button>
          <Dialog open={showCounterDialog} onOpenChange={setShowCounterDialog}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <MessageSquare className="h-4 w-4 mr-1" />
                Counter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Counter Offer</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Counter Amount</Label>
                  <Input
                    type="number"
                    value={counterOffer.amount}
                    onChange={(e) => setCounterOffer({ ...counterOffer, amount: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Message</Label>
                  <Textarea
                    value={counterOffer.message}
                    onChange={(e) => setCounterOffer({ ...counterOffer, message: e.target.value })}
                    placeholder="Explain your counter offer..."
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowCounterDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCounter}>Send Counter</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button size="sm" onClick={() => onRespond(offer.id, "accepted")}>
            <CheckCircle className="h-4 w-4 mr-1" />
            Accept
          </Button>
        </div>
      )}
    </div>
  )
}

function getOfferStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "accepted":
      return "bg-green-100 text-green-800"
    case "rejected":
      return "bg-red-100 text-red-800"
    case "countered":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
