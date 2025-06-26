import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* IM Fell English – main newspaper font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IM+Fell+English:ital,wght@0,400;0,700;1,400&display=swap"
          fetchPriority="high"
        />
        {/* Crimson Text – body copy fallback */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap"
          fetchPriority="high"
        />
        {/* Playfair Display – feature headings */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap"
          fetchPriority="high"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
