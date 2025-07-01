"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { PlayerProvider } from "@/components/player/player-provider"
import { Toaster } from "@/components/ui/sonner"
import BottomNav from "@/components/bottom-nav"
import { ThemeProvider } from "@/components/theme-provider"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const showBottomNav = !["/login", "/admin/login", "/auth/confirm", "/termos"].includes(pathname)

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <PlayerProvider>
            <div className="relative flex flex-col min-h-screen bg-background">
              <main className="flex-1 pb-24">{children}</main>
              {showBottomNav && (
                <footer className="fixed bottom-0 left-0 right-0 z-10">
                  <BottomNav />
                </footer>
              )}
            </div>
            <Toaster />
          </PlayerProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
