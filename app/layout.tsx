import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { MusicPlayer } from "@/components/music-player"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WyoVerse Pioneer - Digital Frontier Newspaper",
  description: "The authentic 1880s frontier experience with modern blockchain technology",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {/* Frontier Music Player */}
          <div className="fixed top-4 right-4 z-50">
            <MusicPlayer />
          </div>

          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
