'use server'

import { ContentItem } from '@/lib/content-mapping'
import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/auth-utils'

// Tipos para as respostas das APIs
interface OpenAIResponse {
  id: string
  object: string
  created: number
  choices: {
    message: {
      content: string
    }
  }[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

interface ElevenLabsResponse {
  audio_url: string
  duration: number
  size: number
}

interface GenerationResult {
  success: boolean
  contentId: string
  generatedText?: string
  audioUrl?: string
  duration?: number
  error?: string
}

// Configurações das APIs
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY

// Configurações de geração
interface GenerationConfig {
  creativity: 'low' | 'medium' | 'high'
  language: 'formal' | 'casual' | 'spiritual' | 'traditional'
  duration: 'short' | 'medium' | 'long'
  voiceId: string
}

// Mapeamento de vozes para ElevenLabs
const VOICE_MAPPING = {
  'padre-joao': 'voice_id_1',
  'padre-miguel': 'voice_id_2', 
  'padre-antonio': 'voice_id_3',
  'clara-narrativa': 'voice_id_4',
  'maria-contadora': 'voice_id_5',
  'jose-narrador': 'voice_id_6'
}

// Função para verificar se o usuário atual é admin (server-side)
async function requireAdminAuth() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user || !user.email) {
    throw new Error('Usuário não autenticado')
  }
  
  if (!isAdmin(user.email)) {
    throw new Error('Acesso negado: Apenas administradores podem gerar conteúdo')
  }
  
  return user
}

// Função para gerar texto com OpenAI
export async function generateText(
  contentItem: ContentItem,
  config: GenerationConfig
): Promise<{ success: boolean; text?: string; error?: string }> {
  try {
    if (!OPENAI_API_KEY) {
      return { success: false, error: 'API key do OpenAI não configurada' }
    }

    // Construir prompt baseado no item de conteúdo
    const systemPrompt = buildSystemPrompt(contentItem, config)
    const userPrompt = contentItem.prompt || `Crie conteúdo para: ${contentItem.title}`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: getDurationTokens(config.duration),
        temperature: getCreativityTemperature(config.creativity),
        presence_penalty: 0.6,
        frequency_penalty: 0.3
      })
    })

    if (!response.ok) {
      const error = await response.json()
      return { success: false, error: `Erro OpenAI: ${error.error?.message || 'Erro desconhecido'}` }
    }

    const data: OpenAIResponse = await response.json()
    const generatedText = data.choices[0]?.message?.content

    if (!generatedText) {
      return { success: false, error: 'Texto não gerado pela OpenAI' }
    }

    return { success: true, text: generatedText }
  } catch (error) {
    return { 
      success: false, 
      error: `Erro na geração de texto: ${error instanceof Error ? error.message : 'Erro desconhecido'}` 
    }
  }
}

// Função para gerar áudio com ElevenLabs
export async function generateAudio(
  text: string,
  voiceId: string,
  config: GenerationConfig
): Promise<{ success: boolean; audioUrl?: string; duration?: number; error?: string }> {
  try {
    if (!ELEVENLABS_API_KEY) {
      return { success: false, error: 'API key do ElevenLabs não configurada' }
    }

    // Mapear voz para ID do ElevenLabs
    const elevenLabsVoiceId = VOICE_MAPPING[voiceId as keyof typeof VOICE_MAPPING]
    if (!elevenLabsVoiceId) {
      return { success: false, error: 'Voz não encontrada' }
    }

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${elevenLabsVoiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.8,
          style: 0.0,
          use_speaker_boost: true
        }
      })
    })

    if (!response.ok) {
      const error = await response.json()
      return { success: false, error: `Erro ElevenLabs: ${error.detail || 'Erro desconhecido'}` }
    }

    // Converter resposta para blob e salvar
    const audioBlob = await response.blob()
    const audioUrl = await saveAudioFile(audioBlob)

    // Estimar duração baseada no texto (aproximado)
    const estimatedDuration = Math.round(text.length / 15) // ~15 caracteres por segundo

    return { 
      success: true, 
      audioUrl: audioUrl,
      duration: estimatedDuration 
    }
  } catch (error) {
    return { 
      success: false, 
      error: `Erro na geração de áudio: ${error instanceof Error ? error.message : 'Erro desconhecido'}` 
    }
  }
}

// Função principal para gerar conteúdo completo
export async function generateCompleteContent(
  contentItem: ContentItem,
  config: GenerationConfig
): Promise<GenerationResult> {
  try {
    // Verificar se usuário é admin
    await requireAdminAuth()
    
    // Passo 1: Gerar texto
    const textResult = await generateText(contentItem, config)
    if (!textResult.success || !textResult.text) {
      return {
        success: false,
        contentId: contentItem.id,
        error: textResult.error || 'Falha na geração de texto'
      }
    }

    // Passo 2: Determinar voz baseada no tipo
    const voiceId = getVoiceForContent(contentItem)

    // Passo 3: Gerar áudio
    const audioResult = await generateAudio(textResult.text, voiceId, config)
    if (!audioResult.success) {
      return {
        success: false,
        contentId: contentItem.id,
        generatedText: textResult.text,
        error: audioResult.error || 'Falha na geração de áudio'
      }
    }

    return {
      success: true,
      contentId: contentItem.id,
      generatedText: textResult.text,
      audioUrl: audioResult.audioUrl,
      duration: audioResult.duration
    }
  } catch (error) {
    return {
      success: false,
      contentId: contentItem.id,
      error: `Erro na geração completa: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
    }
  }
}

// Função para geração em lote
export async function generateBatchContent(
  contentItems: ContentItem[],
  config: GenerationConfig,
  onProgress?: (progress: number, current: string) => void
): Promise<GenerationResult[]> {
  // Verificar se usuário é admin
  await requireAdminAuth()
  
  const results: GenerationResult[] = []
  
  for (let i = 0; i < contentItems.length; i++) {
    const item = contentItems[i]
    
    // Callback de progresso
    if (onProgress) {
      onProgress((i / contentItems.length) * 100, item.title)
    }
    
    // Gerar conteúdo (sem verificação de admin novamente, já verificado acima)
    const result = await generateCompleteContentInternal(item, config)
    results.push(result)
    
    // Pequena pausa para evitar rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  return results
}

// Função interna sem verificação de admin (para uso em lote)
async function generateCompleteContentInternal(
  contentItem: ContentItem,
  config: GenerationConfig
): Promise<GenerationResult> {
  try {
    // Passo 1: Gerar texto
    const textResult = await generateText(contentItem, config)
    if (!textResult.success || !textResult.text) {
      return {
        success: false,
        contentId: contentItem.id,
        error: textResult.error || 'Falha na geração de texto'
      }
    }

    // Passo 2: Determinar voz baseada no tipo
    const voiceId = getVoiceForContent(contentItem)

    // Passo 3: Gerar áudio
    const audioResult = await generateAudio(textResult.text, voiceId, config)
    if (!audioResult.success) {
      return {
        success: false,
        contentId: contentItem.id,
        generatedText: textResult.text,
        error: audioResult.error || 'Falha na geração de áudio'
      }
    }

    return {
      success: true,
      contentId: contentItem.id,
      generatedText: textResult.text,
      audioUrl: audioResult.audioUrl,
      duration: audioResult.duration
    }
  } catch (error) {
    return {
      success: false,
      contentId: contentItem.id,
      error: `Erro na geração completa: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
    }
  }
}

// Funções auxiliares
function buildSystemPrompt(contentItem: ContentItem, config: GenerationConfig): string {
  const basePrompt = `Você é um assistente especializado em conteúdo católico. Crie conteúdo espiritual de alta qualidade.`
  
  const voiceStyle = contentItem.voiceType === 'padre' 
    ? 'Adote um tom reverente e pastoral, como um sacerdote experiente.'
    : 'Adote um tom narrativo e envolvente, como um contador de histórias.'
  
  const languageStyle = {
    formal: 'Use linguagem formal e teológica apropriada.',
    casual: 'Use linguagem acessível e próxima do cotidiano.',
    spiritual: 'Use linguagem contemplativa e inspiradora.',
    traditional: 'Use linguagem tradicional católica clássica.'
  }[config.language]
  
  const durationGuide = {
    short: 'Mantenha o conteúdo conciso, entre 1-3 minutos de fala.',
    medium: 'Desenvolva o conteúdo com profundidade média, 5-10 minutos.',
    long: 'Explore o tema profundamente, 15-20 minutos de conteúdo.'
  }[config.duration]
  
  return `${basePrompt}\n\n${voiceStyle}\n${languageStyle}\n${durationGuide}\n\nTema: ${contentItem.category}\nTipo: ${contentItem.contentType}`
}

function getCreativityTemperature(creativity: string): number {
  switch (creativity) {
    case 'low': return 0.3
    case 'medium': return 0.7
    case 'high': return 1.0
    default: return 0.7
  }
}

function getDurationTokens(duration: string): number {
  switch (duration) {
    case 'short': return 300
    case 'medium': return 800
    case 'long': return 1500
    default: return 800
  }
}

function getVoiceForContent(contentItem: ContentItem): string {
  // Determinar voz baseada no tipo de conteúdo
  if (contentItem.voiceType === 'padre') {
    // Prioridade alta usa voz padrão
    return contentItem.priority === 'high' ? 'padre-joao' : 'padre-miguel'
  } else {
    // Storytelling
    return contentItem.category.includes('infantil') || contentItem.category.includes('Criança')
      ? 'maria-contadora'
      : 'clara-narrativa'
  }
}

// Função para salvar arquivo de áudio (implementação simplificada)
async function saveAudioFile(audioBlob: Blob): Promise<string> {
  // Em produção, salvaria no storage (AWS S3, etc.)
  // Por enquanto, simula URL
  const timestamp = Date.now()
  const filename = `generated-audio-${timestamp}.mp3`
  
  // Simular salvamento e retornar URL
  return `/generated-audio/${filename}`
}

// Função para testar conexão com APIs
export async function testAPIConnections(): Promise<{
  openai: boolean
  elevenlabs: boolean
  errors: string[]
}> {
  // Verificar se usuário é admin
  await requireAdminAuth()
  
  const errors: string[] = []
  let openaiWorking = false
  let elevenlabsWorking = false
  
  // Testar OpenAI
  try {
    if (!OPENAI_API_KEY) {
      errors.push('API key do OpenAI não configurada')
    } else {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` }
      })
      openaiWorking = response.ok
      if (!response.ok) {
        errors.push('Erro na conexão com OpenAI')
      }
    }
  } catch (error) {
    errors.push(`Erro OpenAI: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
  }
  
  // Testar ElevenLabs
  try {
    if (!ELEVENLABS_API_KEY) {
      errors.push('API key do ElevenLabs não configurada')
    } else {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: { 'xi-api-key': ELEVENLABS_API_KEY }
      })
      elevenlabsWorking = response.ok
      if (!response.ok) {
        errors.push('Erro na conexão com ElevenLabs')
      }
    }
  } catch (error) {
    errors.push(`Erro ElevenLabs: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
  }
  
  return {
    openai: openaiWorking,
    elevenlabs: elevenlabsWorking,
    errors
  }
}