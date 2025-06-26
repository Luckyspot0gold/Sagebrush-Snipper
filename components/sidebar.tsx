import { BarChart3, LayoutDashboard, ListChecks, TrendingUp, User2, Users } from "lucide-react"

import type { MainNavItem, SidebarNavItem } from "@/types"

interface DashboardConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      title: "Users",
      href: "/dashboard/users",
      icon: Users,
    },
    {
      title: "Customers",
      href: "/dashboard/customers",
      icon: User2,
    },
    {
      title: "Invoices",
      href: "/dashboard/invoices",
      icon: ListChecks,
    },
    {
      href: "/market-pulse",
      icon: TrendingUp,
      title: "Market Pulse",
      description: "Real-time trading & supply chain",
    },
  ],
}
