"use client"

import type { ReactNode } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Grip, ListChecks, Plus, Settings, User, Activity } from "lucide-react"

/* ------------------------------------------------------------------------
   Sidebar navigation configuration.
   Extend or modify this object to add / remove items globally.
   --------------------------------------------------------------------- */
export const dashboardConfig = {
  sidebarNav: [
    { title: "Account", href: "/dashboard/account", icon: User },
    { title: "Servers", href: "/dashboard/servers", icon: Grip },
    { title: "Billing", href: "/dashboard/billing", icon: ListChecks },
    { title: "Settings", href: "/dashboard/settings", icon: Settings },
    { title: "Create", href: "/dashboard/create", icon: Plus },
    {
      title: "Live Data Verification",
      href: "/live-data-verification",
      icon: Activity,
      description: "Monitor real-time data feeds and system health",
    },
  ],
}

/* ------------------------------------------------------------------------
   DashboardLayout: shared shell for all dashboard pages
   --------------------------------------------------------------------- */
export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar navItems={dashboardConfig.sidebarNav} />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  )
}

/* Optional default export so both default & named imports work */
export default DashboardLayout
