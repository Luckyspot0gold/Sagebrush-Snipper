import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Appointment, Offer, CalendarEvent } from "@/lib/types/marketplace"

interface AppointmentStore {
  appointments: Appointment[]
  offers: Offer[]
  calendarEvents: CalendarEvent[]

  // Offer management
  createOffer: (offer: Omit<Offer, "id" | "createdAt">) => void
  updateOfferStatus: (offerId: string, status: Offer["status"], counterOffer?: Offer["counterOffer"]) => void
  getOffersForListing: (listingId: string) => Offer[]
  getOffersForUser: (userId: string, type: "buyer" | "seller") => Offer[]

  // Appointment management
  scheduleAppointment: (appointment: Omit<Appointment, "id" | "createdAt" | "updatedAt">) => void
  updateAppointment: (appointmentId: string, updates: Partial<Appointment>) => void
  cancelAppointment: (appointmentId: string, reason?: string) => void
  confirmAppointment: (appointmentId: string) => void
  completeAppointment: (appointmentId: string) => void

  // Calendar management
  getCalendarEvents: (date?: string) => CalendarEvent[]
  addCalendarEvent: (event: Omit<CalendarEvent, "id">) => void
  removeCalendarEvent: (eventId: string) => void

  // Notifications
  getUpcomingAppointments: (hours?: number) => Appointment[]
  markNotificationSent: (appointmentId: string, type: "email" | "sms" | "push", recipient: "buyer" | "seller") => void
}

export const useAppointmentStore = create<AppointmentStore>()(
  persist(
    (set, get) => ({
      appointments: [],
      offers: [],
      calendarEvents: [],

      createOffer: (offerData) => {
        const offer: Offer = {
          ...offerData,
          id: `offer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
        }

        set((state) => ({
          offers: [...state.offers, offer],
        }))
      },

      updateOfferStatus: (offerId, status, counterOffer) => {
        set((state) => ({
          offers: state.offers.map((offer) => (offer.id === offerId ? { ...offer, status, counterOffer } : offer)),
        }))
      },

      getOffersForListing: (listingId) => {
        return get().offers.filter((offer) => offer.listingId === listingId)
      },

      getOffersForUser: (userId, type) => {
        return get().offers.filter((offer) =>
          type === "buyer" ? offer.buyerId === userId : offer.listingId.includes(userId),
        )
      },

      scheduleAppointment: (appointmentData) => {
        const appointment: Appointment = {
          ...appointmentData,
          id: `apt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        // Create calendar event
        const calendarEvent: CalendarEvent = {
          id: `cal-${appointment.id}`,
          title: `Meeting: ${appointment.listing.title}`,
          date: appointment.scheduledDate,
          time: appointment.scheduledTime,
          type: "appointment",
          priority: "high",
          appointment,
          navigationUrl: generateNavigationUrl(appointment.location.address),
        }

        set((state) => ({
          appointments: [...state.appointments, appointment],
          calendarEvents: [...state.calendarEvents, calendarEvent],
        }))
      },

      updateAppointment: (appointmentId, updates) => {
        set((state) => ({
          appointments: state.appointments.map((apt) =>
            apt.id === appointmentId ? { ...apt, ...updates, updatedAt: new Date().toISOString() } : apt,
          ),
        }))
      },

      cancelAppointment: (appointmentId, reason) => {
        get().updateAppointment(appointmentId, {
          status: "cancelled",
          location: { ...get().appointments.find((a) => a.id === appointmentId)?.location!, notes: reason },
        })

        // Remove from calendar
        set((state) => ({
          calendarEvents: state.calendarEvents.filter((event) => event.id !== `cal-${appointmentId}`),
        }))
      },

      confirmAppointment: (appointmentId) => {
        get().updateAppointment(appointmentId, { status: "confirmed" })
      },

      completeAppointment: (appointmentId) => {
        get().updateAppointment(appointmentId, { status: "completed" })
      },

      getCalendarEvents: (date) => {
        const events = get().calendarEvents
        if (!date) return events
        return events.filter((event) => event.date === date)
      },

      addCalendarEvent: (eventData) => {
        const event: CalendarEvent = {
          ...eventData,
          id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        }

        set((state) => ({
          calendarEvents: [...state.calendarEvents, event],
        }))
      },

      removeCalendarEvent: (eventId) => {
        set((state) => ({
          calendarEvents: state.calendarEvents.filter((event) => event.id !== eventId),
        }))
      },

      getUpcomingAppointments: (hours = 24) => {
        const now = new Date()
        const futureTime = new Date(now.getTime() + hours * 60 * 60 * 1000)

        return get().appointments.filter((apt) => {
          const aptDateTime = new Date(`${apt.scheduledDate}T${apt.scheduledTime}`)
          return aptDateTime >= now && aptDateTime <= futureTime && apt.status === "confirmed"
        })
      },

      markNotificationSent: (appointmentId, type, recipient) => {
        // This would typically update a backend service
        console.log(`Notification sent: ${type} to ${recipient} for appointment ${appointmentId}`)
      },
    }),
    {
      name: "wyoverse-appointments",
    },
  ),
)

function generateNavigationUrl(address: string): string {
  const encodedAddress = encodeURIComponent(address)
  // Generate Google Maps URL - could also support Apple Maps, Waze, etc.
  return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
}
