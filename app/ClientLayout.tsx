"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import BottomNav from "@/components/bottom-nav"
import { PlayerProvider } from "@/components/player/player-provider"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const showBottomNav = !["/login", "/admin/login"].includes(pathname)

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="relative h-screen w-screen overflow-hidden bg-background font-sans text-foreground">
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
