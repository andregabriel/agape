// Serviço para geração de áudio via admin
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

export interface AudioGenerationRequest {
  title: string
  subtitle?: string
  description?: string
  category: string
  voiceType: 'padre' | 'storytelling'
  duration: string
  prompt?: string
}

export interface AudioGenerationResponse {
  success: boolean
  audioId?: string
  audioUrl?: string
  error?: string
}

// Mapeamento de vozes do ElevenLabs
const VOICE_IDS = {
  padre: 'L0Dsvb3SLTyegXwtm47J', // Archer - grounded and friendly British male
  storytelling: 'g6xIsTj2HwM6VR4iXFCw' // Jessica Anne Bogart - empathetic and expressive
}

export async function generateAudioFromAdmin(request: AudioGenerationRequest): Promise<AudioGenerationResponse> {
  try {
    console.log('Starting audio generation for admin:', request)
    
    // 1. Gerar texto com OpenAI
    const openaiResponse = await fetch('/api/generate-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: request.title,
        subtitle: request.subtitle,
        description: request.description,
        category: request.category,
        prompt: request.prompt,
        voiceType: request.voiceType
      })
    })

    if (!openaiResponse.ok) {
      throw new Error('Failed to generate text with OpenAI')
    }

    const { text, error: openaiError } = await openaiResponse.json()
    
    if (openaiError) {
      throw new Error(`OpenAI Error: ${openaiError}`)
    }

    console.log('Text generated successfully:', text.substring(0, 100) + '...')

    // 2. Gerar áudio com ElevenLabs
    const elevenlabsResponse = await fetch('/api/generate-audio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        voiceId: VOICE_IDS[request.voiceType],
        title: request.title
      })
    })

    if (!elevenlabsResponse.ok) {
      throw new Error('Failed to generate audio with ElevenLabs')
    }

    const { audioUrl, audioId, error: elevenlabsError } = await elevenlabsResponse.json()
    
    if (elevenlabsError) {
      throw new Error(`ElevenLabs Error: ${elevenlabsError}`)
    }

    console.log('Audio generated successfully:', audioUrl)

    // 3. Salvar no Supabase
    const supabase = getSupabaseBrowserClient()
    const { data: audioData, error: supabaseError } = await supabase
      .from('audios')
      .insert({
        title: request.title,
        subtitle: request.subtitle,
        description: request.description,
        category: request.category,
        audio_url: audioUrl,
        duration_seconds: parseInt(request.duration) * 60,
        image_url: null, // Pode ser gerado depois
        is_visible: true
      })
      .select()
      .single()

    if (supabaseError) {
      throw new Error(`Supabase Error: ${supabaseError.message}`)
    }

    console.log('Audio saved to database:', audioData.id)

    return {
      success: true,
      audioId: audioData.id,
      audioUrl
    }

  } catch (error) {
    console.error('Error in audio generation:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

// Função para listar áudios gerados pelo admin
export async function getAdminGeneratedAudios() {
  try {
    const supabase = getSupabaseBrowserClient()
    const { data, error } = await supabase
      .from('audios')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) {
      throw error
    }

    return { success: true, audios: data }
  } catch (error) {
    console.error('Error fetching admin audios:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
} 