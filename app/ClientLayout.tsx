"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Toaster } from "sonner"
import BottomNav from "@/components/bottom-nav"
import { PlayerProvider } from "@/components/player/player-provider"
import SupabaseProvider from "@/components/providers/supabase-provider"

// Initialize console capture for development environments only
if (process.env.NODE_ENV === "development") {
  import("@/lib/dev/consoleCapture").then(({ initConsoleCapture }) => {
    initConsoleCapture()
  })
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const showBottomNav = !["/login", "/admin/login", "/pre-player", "/playlist"].some((path) =>
    pathname.startsWith(path),
  )

  return (
    <SupabaseProvider>
      <PlayerProvider>
        <main className="flex-1">{children}</main>
        {showBottomNav && <BottomNav />}
        <Toaster />
      </PlayerProvider>
    </SupabaseProvider>
  )
}
