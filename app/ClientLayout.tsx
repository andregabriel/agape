"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import BottomNav from "@/components/bottom-nav"
import { PlayerProvider } from "@/components/player/player-provider"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const showBottomNav = !["/login", "/admin/login"].includes(pathname)

  useEffect(() => {
    // Initialize the logger only on the client side when the app mounts.
  }, [])

  return (
    <html lang="pt-BR" suppressHydrationWarning className="app-background">
      <head>
        <link rel="icon" href="/images/agape-logo.svg" />
        <link rel="apple-touch-icon" href="/images/agape-logo.svg" />
      </head>
      <body style={{ backgroundColor: '#F5F5F5' }}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="relative min-h-screen w-screen font-sans text-foreground" style={{ backgroundColor: '#F5F5F5' }}>
            {children}
          </main>
          {showBottomNav && <BottomNav />}
          <PlayerProvider />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
