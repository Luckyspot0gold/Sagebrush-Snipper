"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"

import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface NavItemProps {
  href: string
  icon: LucideIcon
  title: string
  isCollapsed?: boolean
}

export function NavItem({ href, icon: Icon, title, isCollapsed }: NavItemProps) {
  const pathname = usePathname()

  const link = (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        pathname === href && "bg-accent text-accent-foreground",
        isCollapsed && "justify-center",
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!isCollapsed && <span>{title}</span>}
    </Link>
  )

  return (
    <TooltipProvider>
      {isCollapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>{link}</TooltipTrigger>
          <TooltipContent side="right">{title}</TooltipContent>
        </Tooltip>
      ) : (
        link
      )}
    </TooltipProvider>
  )
}
