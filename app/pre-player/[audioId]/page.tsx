"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, MoreHorizontal, ChevronDown, Play, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { AudioTrack } from "@/types"
import { usePlayerStore } from "@/store/player-store"
import { useEffect, useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { getAudioMappingBySupabaseId, getAudioMapping } from "@/lib/audio-mapping"

export default function PrePlayerPage({ params }: { params: Promise<{ audioId: string }> }) {
  const router = useRouter()
  const prepare = usePlayerStore((state) => state.prepare)
  const [audioData, setAudioData] = useState<AudioTrack | null>(null)
  const [loading, setLoading] = useState(true)
  const [audioId, setAudioId] = useState<string>("")
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    async function initializeParams() {
      const resolvedParams = await params
      setAudioId(resolvedParams.audioId)
    }
    initializeParams()
  }, [params])

  useEffect(() => {
    if (!audioId) return

    async function fetchAudioData() {
      try {
        console.log("Fetching audio data for ID:", audioId)
        
        // Primeiro, verificar se é um ID da home e obter o ID real do Supabase
        let realSupabaseId = audioId
        const homeMapping = getAudioMapping(audioId)
        if (homeMapping) {
          realSupabaseId = homeMapping.supabaseId
          console.log("Mapped home ID to Supabase ID:", audioId, "->", realSupabaseId)
        }
        
        const { data, error } = await supabase
          .from('audios')
          .select('*')
          .eq('id', realSupabaseId)
          .single()

        if (error) {
          console.error("Error fetching audio data:", error)
          // Fallback to mapping data if available
          if (homeMapping) {
            const fallbackAudioData: AudioTrack = {
              id: homeMapping.supabaseId,
              type: "audio",
              title: homeMapping.title,
              subCategory: homeMapping.subtitle || "Meditação",
              imageUrl: homeMapping.imageUrl,
              duration: `${homeMapping.durationMinutes} min`,
              description: "Oração cristã",
              audioUrl: homeMapping.audioUrl
            }
            console.log("Using fallback mapping data:", fallbackAudioData)
            setAudioData(fallbackAudioData)
          } else {
            // Final fallback
            setAudioData({
              id: audioId,
              type: "audio",
              title: "Oração Teste",
              subCategory: "Meditação",
              imageUrl: "/placeholder.svg?width=400&height=400",
              duration: "5 min",
              description: "Oração de teste para desenvolvimento",
              audioUrl: undefined
            })
          }
        } else if (data) {
          console.log("Fetched audio data from Supabase:", data)
          
          // Map Supabase data to AudioTrack format
          const mappedAudioData: AudioTrack = {
            id: data.id,
            type: "audio",
            title: data.title || "Oração",
            subCategory: data.sub_category || data.description || "Meditação",
            imageUrl: data.image_url || "/placeholder.svg?width=400&height=400",
            duration: data.duration_seconds ? `${Math.round(data.duration_seconds / 60)} min` : "5 min",
            description: data.description || "Oração cristã",
            audioUrl: data.audio_url || undefined
          }
          
          console.log("Mapped audio data:", mappedAudioData)
          setAudioData(mappedAudioData)
        }
      } catch (error) {
        console.error("Error in fetchAudioData:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAudioData()
  }, [audioId, supabase])

  const handlePlay = () => {
    if (audioData) {
      console.log("Preparing audio data for player:", audioData)
      prepare(audioData)
      // Redirect to full player instead of showing mini player
      router.push('/player')
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-background text-foreground items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    )
  }

  if (!audioData) {
    return (
      <div className="flex flex-col h-screen bg-background text-foreground items-center justify-center">
        <div className="text-lg">Áudio não encontrado</div>
        <Button onClick={() => router.back()} className="mt-4">
          Voltar
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <div className="relative h-2/5">
        <Image
          src={audioData.imageUrl || "/placeholder.svg"}
          alt={audioData.title}
          fill
          style={{ objectFit: "cover" }}
          className="opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-12 left-4 bg-black/20 hover:bg-black/30 text-white rounded-full"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-12 right-4 bg-black/20 hover:bg-black/30 text-white rounded-full"
        >
          <MoreHorizontal />
        </Button>
        <div className="absolute bottom-4 left-4 right-4 text-white z-10">
          <h1 className="text-3xl font-bold">{audioData.title}</h1>
          <p className="text-lg">{audioData.subCategory}</p>
        </div>
      </div>

      <div className="flex-grow p-4 flex flex-col justify-between">
        <div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button variant="secondary" className="justify-between h-12">
              Guia Daniel <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="secondary" className="justify-between h-12">
              Opções de Mídia <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <Button
              className="w-full h-12 bg-foreground text-background hover:bg-foreground/80 text-lg"
              onClick={handlePlay}
              disabled={!audioData.audioUrl}
            >
              <Play className="mr-2 h-5 w-5 fill-background" />
              {audioData.audioUrl ? "Reproduzir Sessão" : "Áudio não disponível"}
            </Button>
            <Button variant="secondary" className="w-full h-12 text-lg">
              <Bell className="mr-2 h-5 w-5" />
              Rezar por uma Intenção
            </Button>
          </div>
        </div>

        <div className="text-center text-muted-foreground">
          <p>{audioData.description}</p>
          {audioData.audioUrl && (
            <p className="text-xs mt-2 text-green-600">✓ Áudio disponível</p>
          )}
        </div>
      </div>
    </div>
  )
}
