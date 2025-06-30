"use client"

import { usePlayerStore } from "@/store/player-store"
import FullPlayer from "./full-player"
import MiniPlayer from "./mini-player"

export function PlayerProvider() {
  const view = usePlayerStore((state) => state.view)

  if (view === "hidden") {
    return null
  }

  return (
    <>
      {view === "mini" && <MiniPlayer />}
      {view === "full" && <FullPlayer />}
    </>
  )
}
