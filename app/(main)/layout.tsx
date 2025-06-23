import type React from "react"
import BottomNav from "@/components/bottom-nav"
import Player from "@/components/player"

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-full">
      <main className="flex-grow overflow-y-auto pb-32">{children}</main>
      <Player />
      <BottomNav />
    </div>
  )
}
