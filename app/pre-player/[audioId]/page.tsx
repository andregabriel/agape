"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, MoreHorizontal, ChevronDown, Play, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { AudioTrack } from "@/types"
import { usePlayerStore } from "@/store/player-store"

// Placeholder data - this would be fetched from Supabase using the `audioId` param
const audioData: AudioTrack = {
  id: "terco-diario-sabado",
  type: "audio",
  title: "Terço Diário - Sábado",
  subCategory: "Mistérios Gozosos",
  imageUrl: "/images/tela-pre-player.jpeg",
  duration: "25 min",
  description: "Hoje vamos meditar os cinco Mistérios Gozosos. Não sabe rezar o terço?",
}

export default function PrePlayerPage({ params }: { params: { audioId: string } }) {
  const router = useRouter()
  const play = usePlayerStore((state) => state.play)

  const handlePlay = () => {
    play(audioData)
    // Redirect to full player instead of showing mini player
    router.push('/player')
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <div className="relative h-2/5">
        <Image
          src={audioData.imageUrl || "/placeholder.svg"}
          alt={audioData.title}
          layout="fill"
          objectFit="cover"
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
            >
              <Play className="mr-2 h-5 w-5 fill-background" />
              Reproduzir Sessão
            </Button>
            <Button variant="secondary" className="w-full h-12 text-lg">
              <Bell className="mr-2 h-5 w-5" />
              Rezar por uma Intenção
            </Button>
          </div>
        </div>

        <div className="text-center text-muted-foreground">
          <p>{audioData.description}</p>
        </div>
      </div>
    </div>
  )
}
