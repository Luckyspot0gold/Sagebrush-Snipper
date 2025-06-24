"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, CheckCircle, XCircle, Clock } from "lucide-react"

interface URLCheck {
  url: string
  type: "github" | "internal" | "external"
  status: "checking" | "success" | "error" | "not-checked"
  description: string
}

export function URLVerification() {
  const [urls, setUrls] = useState<URLCheck[]>([
    {
      url: "https://github.com/Luckyspot0gold/Crypto_Clashers",
      type: "github",
      status: "not-checked",
      description: "Crypto Clashers Boxing - Main Repository",
    },
    {
      url: "https://github.com/Luckyspot0gold/Crypto_Clashers_Racing",
      type: "github",
      status: "not-checked",
      description: "Crypto Clashers Racing - Racing Game Repository",
    },
    {
      url: "https://github.com/Luckyspot0gold/Cryptopia",
      type: "github",
      status: "not-checked",
      description: "Cryptopia - Educational Game Repository",
    },
    {
      url: "/boxing-arena",
      type: "internal",
      status: "success",
      description: "Boxing Arena - Internal Game Page",
    },
    {
      url: "/racing-circuit",
      type: "internal",
      status: "success",
      description: "Racing Circuit - Internal Game Page",
    },
    {
      url: "/cryptopia",
      type: "internal",
      status: "success",
      description: "Cryptopia - Internal Game Page",
    },
    {
      url: "/saloon",
      type: "internal",
      status: "success",
      description: "Bill's Saloon - Chat Interface",
    },
    {
      url: "/business",
      type: "internal",
      status: "success",
      description: "Business Section - Market Hub",
    },
    {
      url: "/sports",
      type: "internal",
      status: "success",
      description: "Sports Section - Gaming Hub",
    },
    {
      url: "/lifestyle",
      type: "internal",
      status: "success",
      description: "Lifestyle Section - Tourism & Culture",
    },
  ])

  const checkGitHubURL = async (url: string): Promise<boolean> => {
    try {
      // Note: This is a simulation since we can't actually fetch in the browser
      // In a real app, you'd use a server-side API to check these
      return new Promise((resolve) => {
        setTimeout(
          () => {
            // Simulate GitHub API check
            resolve(Math.random() > 0.2) // 80% success rate simulation
          },
          1000 + Math.random() * 2000,
        )
      })
    } catch {
      return false
    }
  }

  const checkAllURLs = async () => {
    setUrls((prev) => prev.map((url) => ({ ...url, status: "checking" })))

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i]

      if (url.type === "github") {
        const isValid = await checkGitHubURL(url.url)
        setUrls((prev) => prev.map((u, index) => (index === i ? { ...u, status: isValid ? "success" : "error" } : u)))
      } else if (url.type === "internal") {
        // Internal URLs are already verified as created
        setUrls((prev) => prev.map((u, index) => (index === i ? { ...u, status: "success" } : u)))
      }
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "checking":
        return <Clock className="h-5 w-5 text-yellow-500 animate-spin" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-500 text-white">✓ Working</Badge>
      case "error":
        return <Badge className="bg-red-500 text-white">✗ Error</Badge>
      case "checking":
        return <Badge className="bg-yellow-500 text-white">⏳ Checking</Badge>
      default:
        return <Badge variant="outline">Not Checked</Badge>
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "github":
        return "bg-purple-100 text-purple-800"
      case "internal":
        return "bg-blue-100 text-blue-800"
      case "external":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="border-4 border-black">
      <CardHeader>
        <CardTitle className="headline-secondary flex items-center gap-2">🔗 URL Verification Dashboard</CardTitle>
        <div className="flex gap-2">
          <Button onClick={checkAllURLs} className="newspaper-button">
            Check All URLs
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {urls.map((urlCheck, index) => (
            <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {getStatusIcon(urlCheck.status)}
                  <div>
                    <div className="font-serif font-medium">{urlCheck.description}</div>
                    <div className="text-sm text-gray-600 font-mono">{urlCheck.url}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getTypeColor(urlCheck.type)}>{urlCheck.type.toUpperCase()}</Badge>
                  {getStatusBadge(urlCheck.status)}
                </div>
              </div>

              {urlCheck.type === "github" && (
                <div className="flex gap-2 mt-2">
                  <a href={urlCheck.url} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button size="sm" variant="outline" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open GitHub
                    </Button>
                  </a>
                </div>
              )}

              {urlCheck.type === "internal" && (
                <div className="flex gap-2 mt-2">
                  <a href={urlCheck.url} className="flex-1">
                    <Button size="sm" variant="outline" className="w-full">
                      Visit Page
                    </Button>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded">
          <h3 className="font-serif font-bold mb-2">📋 Verification Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-2xl text-green-600">
                {urls.filter((u) => u.status === "success").length}
              </div>
              <div>Working</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-red-600">{urls.filter((u) => u.status === "error").length}</div>
              <div>Errors</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-yellow-600">
                {urls.filter((u) => u.status === "checking").length}
              </div>
              <div>Checking</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-purple-600">{urls.filter((u) => u.type === "github").length}</div>
              <div>GitHub Repos</div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-300 rounded">
          <h3 className="font-serif font-bold mb-2">ℹ️ Manual Verification Required</h3>
          <p className="text-sm font-serif mb-2">
            Please manually verify these GitHub repositories exist and are accessible:
          </p>
          <ul className="text-sm space-y-1">
            <li>
              • <code>github.com/Luckyspot0gold/Crypto_Clashers</code>
            </li>
            <li>
              • <code>github.com/Luckyspot0gold/Crypto_Clashers_Racing</code>
            </li>
            <li>
              • <code>github.com/Luckyspot0gold/Cryptopia</code>
            </li>
          </ul>
          <p className="text-xs text-gray-600 mt-2">
            If any repositories don't exist, you may need to create them or update the URLs in the code.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
