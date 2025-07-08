"use client"

import { useEffect, useRef } from "react"
import { usePlayerStore } from "@/store/player-store"

export default function AudioPlayerEngine() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const { currentTrack, status } = usePlayerStore()

  useEffect(() => {
    if (!audioRef.current || !currentTrack?.audioUrl) {
      console.log("AudioPlayerEngine: Sem áudio para reproduzir", { currentTrack, status })
      return
    }

    console.log("AudioPlayerEngine: Status mudou para", status, "audioUrl:", currentTrack.audioUrl)

    if (status === "playing") {
      audioRef.current.src = currentTrack.audioUrl
      audioRef.current.play().catch((error) => {
        console.error("Erro ao reproduzir áudio:", error)
      })
    } else if (status === "paused") {
      audioRef.current.pause()
    }
  }, [currentTrack?.audioUrl, status])

  // Sincronizar eventos do áudio com o store
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => {
      console.log("Áudio terminou")
      // Quando o áudio terminar, pausar o player
      usePlayerStore.getState().pause()
    }

    const handleError = (e: Event) => {
      console.error("Erro no elemento de áudio:", e)
      usePlayerStore.getState().pause()
    }

    const handleLoadStart = () => {
      console.log("Áudio começando a carregar")
    }

    const handleCanPlay = () => {
      console.log("Áudio pronto para reprodução")
    }

    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)
    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("canplay", handleCanPlay)

    return () => {
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("canplay", handleCanPlay)
    }
  }, [])

  return <audio ref={audioRef} />
} 