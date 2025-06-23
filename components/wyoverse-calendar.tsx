"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CalendarIcon, Clock, MapPin, Navigation, Bell, CheckCircle, XCircle } from "lucide-react"
import { useAppointmentStore } from "@/lib/stores/appointment-store"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isFuture } from "date-fns"
import type { Appointment } from "@/lib/types/marketplace"

export function WyoVerseCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false)

  const {
    appointments,
    calendarEvents,
    getCalendarEvents,
    getUpcomingAppointments,
    confirmAppointment,
    cancelAppointment,
    completeAppointment,
    updateAppointment,
  } = useAppointmentStore()

  const { toast } = useToast()

  // Get calendar days for current month
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get events for selected date
  const selectedDateEvents = selectedDate ? getCalendarEvents(format(selectedDate, "yyyy-MM-dd")) : []

  // Get upcoming appointments for notifications
  const upcomingAppointments = getUpcomingAppointments(24) // Next 24 hours

  useEffect(() => {
    // Check for upcoming appointments and show notifications
    upcomingAppointments.forEach((appointment) => {
      const appointmentTime = new Date(`${appointment.scheduledDate}T${appointment.scheduledTime}`)
      const hoursUntil = (appointmentTime.getTime() - new Date().getTime()) / (1000 * 60 * 60)

      if (hoursUntil <= 2 && hoursUntil > 0) {
        toast({
          title: "Upcoming Appointment",
          description: `Meeting for "${appointment.listing.title}" in ${Math.round(hoursUntil)} hour(s)`,
          duration: 10000,
        })
      }
    })
  }, [upcomingAppointments, toast])

  const getEventsForDate = (date: Date) => {
    return getCalendarEvents(format(date, "yyyy-MM-dd"))
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    const events = getEventsForDate(date)
    if (events.length > 0 && events[0].appointment) {
      setSelectedAppointment(events[0].appointment)
      setShowAppointmentDialog(true)
    }
  }

  const handleAppointmentAction = (appointmentId: string, action: "confirm" | "cancel" | "complete") => {
    switch (action) {
      case "confirm":
        confirmAppointment(appointmentId)
        toast({ title: "Appointment Confirmed", description: "Both parties will be notified." })
        break
      case "cancel":
        cancelAppointment(appointmentId, "Cancelled by user")
        toast({ title: "Appointment Cancelled", description: "Both parties will be notified." })
        break
      case "complete":
        completeAppointment(appointmentId)
        toast({ title: "Appointment Completed", description: "Thank you for using WyoVerse Marketplace!" })
        break
    }
    setShowAppointmentDialog(false)
  }

  const openNavigation = (address: string) => {
    const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
    window.open(navigationUrl, "_blank")
  }

  const getEventPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="newspaper-article">
      <div className="newspaper-article-inner">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold font-serif">WYOVERSE CALENDAR</h2>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Bell className="h-3 w-3" />
              {upcomingAppointments.length} upcoming
            </Badge>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="outline"
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          >
            Previous
          </Button>
          <h3 className="text-xl font-bold font-serif">{format(currentDate, "MMMM yyyy")}</h3>
          <Button
            variant="outline"
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          >
            Next
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {/* Day headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 text-center font-bold border border-black bg-gray-100">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {calendarDays.map((day) => {
            const events = getEventsForDate(day)
            const hasEvents = events.length > 0
            const isCurrentDay = isToday(day)

            return (
              <div
                key={day.toISOString()}
                className={`
                  p-2 min-h-[60px] border border-black cursor-pointer hover:bg-gray-50
                  ${isCurrentDay ? "bg-yellow-100 font-bold" : "bg-white"}
                  ${hasEvents ? "border-2 border-red-500" : ""}
                `}
                onClick={() => handleDateClick(day)}
              >
                <div className="text-sm font-semibold">{format(day, "d")}</div>
                {events.map((event, index) => (
                  <div
                    key={event.id}
                    className={`
                      text-xs p-1 mt-1 rounded text-white truncate
                      ${getEventPriorityColor(event.priority)}
                    `}
                    title={event.title}
                  >
                    {event.time} - {event.title.substring(0, 15)}...
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        {/* Upcoming Appointments List */}
        {upcomingAppointments.length > 0 && (
          <div className="border-2 border-black p-4 bg-yellow-50">
            <h3 className="text-xl font-bold font-serif mb-3 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Upcoming Appointments
            </h3>
            <div className="space-y-2">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex justify-between items-center p-2 bg-white border border-gray-300 rounded"
                >
                  <div>
                    <p className="font-semibold">{appointment.listing.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(`${appointment.scheduledDate}T${appointment.scheduledTime}`), "MMM dd, HH:mm")}-{" "}
                      {appointment.location.address}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => openNavigation(appointment.location.address)}>
                      <Navigation className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedAppointment(appointment)
                        setShowAppointmentDialog(true)
                      }}
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Appointment Details Dialog */}
        <Dialog open={showAppointmentDialog} onOpenChange={setShowAppointmentDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
            </DialogHeader>
            {selectedAppointment && (
              <div className="space-y-4">
                <div className="border-2 border-black p-3">
                  <h4 className="font-bold text-lg">{selectedAppointment.listing.title}</h4>
                  <p className="text-2xl font-bold">${selectedAppointment.listing.price}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Seller:</p>
                    <p>{selectedAppointment.sellerName}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Buyer:</p>
                    <p>{selectedAppointment.buyerName}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{format(new Date(selectedAppointment.scheduledDate), "EEEE, MMMM dd, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      {selectedAppointment.scheduledTime} ({selectedAppointment.duration} minutes)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedAppointment.location.address}</span>
                  </div>
                </div>

                {selectedAppointment.location.notes && (
                  <div className="p-2 bg-gray-50 border border-gray-200 rounded">
                    <p className="text-sm">
                      <strong>Notes:</strong> {selectedAppointment.location.notes}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-center">
                  <Badge className={`${getAppointmentStatusColor(selectedAppointment.status)}`}>
                    {selectedAppointment.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => openNavigation(selectedAppointment.location.address)}
                    className="flex-1"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Navigate
                  </Button>

                  {selectedAppointment.status === "scheduled" && (
                    <Button
                      onClick={() => handleAppointmentAction(selectedAppointment.id, "confirm")}
                      className="flex-1"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Confirm
                    </Button>
                  )}

                  {selectedAppointment.status === "confirmed" &&
                    isFuture(new Date(`${selectedAppointment.scheduledDate}T${selectedAppointment.scheduledTime}`)) && (
                      <Button
                        onClick={() => handleAppointmentAction(selectedAppointment.id, "complete")}
                        className="flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Complete
                      </Button>
                    )}

                  {(selectedAppointment.status === "scheduled" || selectedAppointment.status === "confirmed") && (
                    <Button
                      variant="destructive"
                      onClick={() => handleAppointmentAction(selectedAppointment.id, "cancel")}
                      className="flex-1"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

function getAppointmentStatusColor(status: string) {
  switch (status) {
    case "scheduled":
      return "bg-yellow-100 text-yellow-800"
    case "confirmed":
      return "bg-green-100 text-green-800"
    case "completed":
      return "bg-blue-100 text-blue-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    case "no_show":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
