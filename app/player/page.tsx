"use client"

import FullPlayer from "@/components/player/full-player"
import { usePlayerStore } from "@/store/player-store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function PlayerPage() {
  const { currentTrack } = usePlayerStore()
  const router = useRouter()

  useEffect(() => {
    // If no track is playing, redirect back to home
    if (!currentTrack) {
      router.push('/home')
    }
  }, [currentTrack, router])

  if (!currentTrack) {
    return null
  }

  return <FullPlayer />
}