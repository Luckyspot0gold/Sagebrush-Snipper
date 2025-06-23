"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, ExternalLink, Wrench } from "lucide-react"
import { linkRegistry, type LinkStatus } from "@/lib/utils/link-verification"

export function LinkChecker() {
  const [linkStatuses, setLinkStatuses] = useState<LinkStatus[]>([])
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    setLinkStatuses(Object.values(linkRegistry))
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "construction":
        return <Wrench className="h-4 w-4 text-yellow-600" />
      case "external":
        return <ExternalLink className="h-4 w-4 text-blue-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-red-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-300"
      case "construction":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "external":
        return "bg-blue-100 text-blue-800 border-blue-300"
      default:
        return "bg-red-100 text-red-800 border-red-300"
    }
  }

  const activeLinks = linkStatuses.filter((link) => link.status === "active").length
  const constructionLinks = linkStatuses.filter((link) => link.status === "construction").length
  const externalLinks = linkStatuses.filter((link) => link.status === "external").length

  return (
    <div className="newspaper-article">
      <div className="newspaper-article-inner">
        <h2 className="text-3xl font-bold font-serif text-center mb-6 border-b-2 border-black pb-2">
          WYOVERSE LINK STATUS REPORT
        </h2>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 border-2 border-black">
            <div className="text-2xl font-bold font-serif">{linkStatuses.length}</div>
            <div className="text-sm font-serif">Total Links</div>
          </div>
          <div className="text-center p-4 border-2 border-black">
            <div className="text-2xl font-bold font-serif text-green-600">{activeLinks}</div>
            <div className="text-sm font-serif">Active</div>
          </div>
          <div className="text-center p-4 border-2 border-black">
            <div className="text-2xl font-bold font-serif text-yellow-600">{constructionLinks}</div>
            <div className="text-sm font-serif">Under Construction</div>
          </div>
          <div className="text-center p-4 border-2 border-black">
            <div className="text-2xl font-bold font-serif text-blue-600">{externalLinks}</div>
            <div className="text-sm font-serif">External Games</div>
          </div>
        </div>

        {/* Link List */}
        <div className="space-y-3">
          {linkStatuses.map((link, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-black">
              <div className="flex items-center gap-3">
                {getStatusIcon(link.status)}
                <div>
                  <div className="font-serif font-medium">{link.title}</div>
                  <div className="text-sm font-serif text-gray-600">{link.url}</div>
                  {link.description && <div className="text-xs font-serif text-gray-500 mt-1">{link.description}</div>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`${getStatusColor(link.status)} font-serif`}>
                  {link.status.replace("-", " ").toUpperCase()}
                </Badge>
                {link.expectedCompletion && (
                  <Badge variant="outline" className="font-serif">
                    {link.expectedCompletion}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
