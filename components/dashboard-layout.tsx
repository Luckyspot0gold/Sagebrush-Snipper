import { Grip, ListChecks, Plus, Settings, User, Activity } from "lucide-react"

export const dashboardConfig = {
  sidebarNav: [
    {
      title: "Account",
      href: "/dashboard/account",
      icon: User,
    },
    {
      title: "Servers",
      href: "/dashboard/servers",
      icon: Grip,
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: ListChecks,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "Create",
      href: "/dashboard/create",
      icon: Plus,
    },
    {
      title: "Live Data Verification",
      href: "/live-data-verification",
      icon: Activity,
      description: "Monitor real-time data feeds and system health",
    },
  ],
}
