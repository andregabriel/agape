"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowLeft, MoreHorizontal, ChevronDown, Play, Heart } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { usePlayer, type Session } from "@/contexts/player-context" // Session type is updated here

export default function PrePlayerPage({ params }: { params: { id: string } }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const { playSession } = usePlayer()

  useEffect(() => {
    const fetchSession = async () => {
      const supabase = createClient()
      // Fetch from 'audios' table, map 'description' to 'subtitle' if needed
      const { data, error } = await supabase
        .from("audios") // Changed from "sessions" to "audios"
        .select("id, title, description, image_url, audio_url, duration_minutes") // Select relevant fields
        .eq("id", params.id)
        .single()

      if (error) {
        console.error("Error fetching session from audios table:", error)
        // Try fetching from 'sessions' table as a fallback if it still exists from previous script
        const { data: oldData, error: oldError } = await supabase
          .from("sessions")
          .select("*")
          .eq("id", params.id)
          .single()
        if (oldError) {
          console.error("Error fetching session from old sessions table:", oldError)
        } else if (oldData) {
          setSession({
            ...oldData,
            subtitle: oldData.subtitle || oldData.description, // Ensure subtitle exists
          } as Session)
        }
      } else if (data) {
        // Map fields to the Session interface, e.g., use description as subtitle
        setSession({
          ...data,
          subtitle: data.description, // Using description as subtitle
        } as Session)
      }
      setLoading(false)
    }

    if (params.id) {
      fetchSession()
    } else {
      setLoading(false)
      console.error("No session ID provided to PrePlayerPage")
    }
  }, [params.id])

  if (loading) {
    return <div className="flex items-center justify-center h-full text-black">Carregando...</div>
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center h-full text-black">
        Sessão não encontrada. Verifique o ID: {params.id}
      </div>
    )
  }

  const handlePlay = () => {
    if (session) {
      playSession(session)
    }
  }

  return (
    <div className="bg-[#1E40AF] text-white h-full flex flex-col">
      <header className="flex justify-between items-center p-4">
        <Link href="/" className="p-2">
          <ArrowLeft size={24} />
        </Link>
        <button className="p-2">
          <MoreHorizontal size={24} />
        </button>
      </header>

      <div className="relative w-full h-64">
        <Image
          src={session.image_url || "/placeholder.svg?query=rosary+hands"}
          alt={session.title}
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
      </div>

      <div className="flex-grow flex flex-col p-4 bg-white text-black rounded-t-3xl -mt-6">
        <div className="text-center -mt-12 mb-4">
          <h1 className="text-2xl font-bold text-white">{session.title}</h1>
          <p className="text-base text-gray-200">{session.subtitle}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="bg-gray-100 p-3 rounded-lg text-left text-sm">
            <span className="text-gray-500">Guia</span>
            <div className="flex justify-between items-center font-semibold">
              {/* Placeholder for guide, you'll need to fetch this or add to 'audios' table */}
              <span>Daniel</span> <ChevronDown size={16} />
            </div>
          </button>
          <button className="bg-gray-100 p-3 rounded-lg text-left text-sm">
            <span className="text-gray-500">Opções de Mídia</span>
            <div className="flex justify-between items-center font-semibold">
              {/* @ts-ignore */}
              <span>{session.duration_minutes || "N/A"} min</span> <ChevronDown size={16} />
            </div>
          </button>
        </div>
        <button
          onClick={handlePlay}
          className="w-full bg-black text-white font-semibold py-4 rounded-full flex items-center justify-center text-lg mb-3"
        >
          <Play size={20} className="mr-2 fill-white" />
          Reproduzir Sessão
        </button>
        <button className="w-full bg-gray-100 font-semibold py-4 rounded-full flex items-center justify-center text-lg mb-6">
          <Heart size={20} className="mr-2" />
          Rezar por uma Intenção
        </button>
        <p className="text-gray-700 leading-relaxed">{session.subtitle}</p>{" "}
        {/* Using subtitle which is mapped from description */}
      </div>
    </div>
  )
}
