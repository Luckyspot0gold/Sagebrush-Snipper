export interface Offer {
  id: string
  listingId: string
  buyerId: string
  buyerName: string
  buyerAvatar?: string
  amount: number
  message: string
  status: "pending" | "accepted" | "rejected" | "countered"
  createdAt: string
  expiresAt: string
  counterOffer?: {
    amount: number
    message: string
    createdAt: string
  }
}

export interface Appointment {
  id: string
  listingId: string
  offerId: string
  sellerId: string
  sellerName: string
  buyerId: string
  buyerName: string
  scheduledDate: string
  scheduledTime: string
  duration: number // in minutes
  location: {
    address: string
    coordinates?: {
      lat: number
      lng: number
    }
    meetingType: "public_place" | "seller_location" | "buyer_location" | "neutral_location"
    notes?: string
  }
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no_show"
  notifications: {
    seller: {
      email: boolean
      sms: boolean
      push: boolean
    }
    buyer: {
      email: boolean
      sms: boolean
      push: boolean
    }
  }
  createdAt: string
  updatedAt: string
  listing: {
    title: string
    price: number
    images: string[]
  }
}

export interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  type: "appointment" | "reminder" | "deadline"
  priority: "low" | "medium" | "high"
  appointment?: Appointment
  navigationUrl?: string
}
