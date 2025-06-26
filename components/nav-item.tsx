"use client"

import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface NavItemProps {
  href: string
  icon: LucideIcon
  title: string
  description?: string
  isCollapsed?: boolean
}

export function NavItem({ href, icon: Icon, title, description, isCollapsed = false }: NavItemProps) {
  const baseClasses =
    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"

  // When the sidebar is collapsed we only show the icon,
  // but keep the link accessible via a tooltip.
  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Link href={href} className={cn(baseClasses, "justify-center")}>
              <Icon className="h-5 w-5" aria-hidden />
              <span className="sr-only">{title}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="font-medium">{title}</p>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  // Expanded sidebar: show icon, title, and (optionally) description.
  return (
    <Link href={href} className={baseClasses}>
      <Icon className="h-5 w-5 shrink-0" aria-hidden />
      <div className="flex flex-col">
        <span>{title}</span>
        {description && <span className="text-xs text-muted-foreground">{description}</span>}
      </div>
    </Link>
  )
}
