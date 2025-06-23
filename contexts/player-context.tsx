"use client"

import type React from "react"
import { createContext, useContext, useState, useRef, useEffect, useCallback } from "react"

export interface Session {
  id: string
  title: string
  subtitle?: string
  image_url?: string
  audio_url: string
}

interface PlayerContextType {
  currentSession: Session | null
  isPlaying: boolean
  isLoading: boolean
  progress: number
  duration: number
  playerMode: "hidden" | "mini" | "full"
  playSession: (session: Session) => void
  togglePlayPause: () => void
  setPlayerMode: (mode: "hidden" | "mini" | "full") => void
  seek: (time: number) => void
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentSession, setCurrentSession] = useState<Session | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playerMode, setPlayerMode] = useState<"hidden" | "mini" | "full">("hidden")

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize Audio element on client
    audioRef.current = new Audio()
    audioRef.current.crossOrigin = "anonymous"
    const audio = audioRef.current

    const handleTimeUpdate = () => setProgress(audio.currentTime)
    const handleDurationChange = () => {
      if (!isNaN(audio.duration) && audio.duration !== Number.POSITIVE_INFINITY) {
        setDuration(audio.duration)
      }
    }
    const handleCanPlay = () => setIsLoading(false)
    const handleWaiting = () => setIsLoading(true)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("durationchange", handleDurationChange)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("waiting", handleWaiting)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("loadeddata", handleDurationChange) // Added to catch duration on initial load

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("durationchange", handleDurationChange)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("waiting", handleWaiting)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("loadeddata", handleDurationChange)
      audio.pause()
    }
  }, [])

  const playSession = useCallback((session: Session) => {
    if (!session.audio_url) {
      console.error("Session has no audio_url.")
      // Optionally, you could show a toast or alert to the user here.
      // alert("Esta sessão não possui um áudio associado.");
      return
    }
    if (!audioRef.current) return

    const audio = audioRef.current
    setCurrentSession(session)
    setPlayerMode("full")
    setIsLoading(true)

    if (audio.src !== session.audio_url) {
      audio.src = session.audio_url
      audio.load() // Important: load the new source
    }

    // Attempt to play
    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch((e) => {
          console.error("Error playing audio:", e)
          setIsPlaying(false)
          setIsLoading(false)
          // Optionally, inform the user about the playback error.
          // alert(`Erro ao reproduzir áudio: ${e.message}`);
        })
    }
  }, [])

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current || isLoading) return // Don't toggle if loading
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying, isLoading])

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }, [])

  const value = {
    currentSession,
    isPlaying,
    isLoading,
    progress,
    duration,
    playerMode,
    playSession,
    togglePlayPause,
    setPlayerMode,
    seek,
  }

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export const usePlayer = () => {
  const context = useContext(PlayerContext)
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider")
  }
  return context
}
