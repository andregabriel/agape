// Mapeamento entre thumbnails da home e registros reais do Supabase
// Cada thumbnail da home deve ter um ID correspondente na tabela audios

export interface AudioMapping {
  homeId: string // ID usado na home (ex: "teste_padre")
  supabaseId: string // ID real do Supabase (UUID)
  title: string
  subtitle?: string
  category: string
  elevenlabsVoiceId: string
  imageUrl: string
  audioUrl?: string
  durationMinutes: number
}

// Mapeamento completo dos thumbnails da home para registros do Supabase
export const audioMapping: Record<string, AudioMapping> = {
  // Teste - Já existe no Supabase
  "teste_padre": {
    homeId: "teste_padre",
    supabaseId: "d7e7a808-44e9-4f4a-b012-2575bc3a81a0",
    title: "Oração Matinal de Teste",
    subtitle: "Teste com voz de padre",
    category: "Teste",
    elevenlabsVoiceId: "L0Dsvb3SLTyegXwtm47J", // Archer - padre
    imageUrl: "/images/home/thumbnails/teste-padre-oracao-matinal.png",
    audioUrl: "https://llomihbcknpzndlabmmt.supabase.co/storage/v1/object/public/audios/teste_padre/openai-elevenlabs-teste.mp3",
    durationMinutes: 3
  },
  
  // Corpus Christi - Registros existentes
  "cc1": {
    homeId: "cc1",
    supabaseId: "08625105-b318-4936-88bb-6a0ec53bb227",
    title: "Santo Ambrósio de Milão",
    subtitle: "Homilias Pai, Corpus Christi",
    category: "Corpus Christi",
    elevenlabsVoiceId: "L0Dsvb3SLTyegXwtm47J", // Archer - padre
    imageUrl: "/images/home/03-corpus-christi.png",
    durationMinutes: 7
  },
  
  "cc2": {
    homeId: "cc2",
    supabaseId: "b24ad2bf-1cb2-47b0-9b41-f9f762a27f24",
    title: "Amor de Deus na Eucaristia",
    subtitle: "Livro II, Capítulo 2",
    category: "Corpus Christi",
    elevenlabsVoiceId: "L0Dsvb3SLTyegXwtm47J", // Archer - padre
    imageUrl: "/images/home/thumbnails/amor-deus-eucaristia.png",
    durationMinutes: 8
  },
  
  // Rotinas Matinais - Registros existentes
  "mr1": {
    homeId: "mr1",
    supabaseId: "cba1a372-0e7c-4530-816c-c70bdc197cc4",
    title: "Terço Diário",
    subtitle: "Com os mistérios diários",
    category: "Rotinas Matinais",
    elevenlabsVoiceId: "L0Dsvb3SLTyegXwtm47J", // Archer - padre
    imageUrl: "/images/home/thumbnails/terco-diario.png",
    durationMinutes: 25
  },
  
  "mr2": {
    homeId: "mr2",
    supabaseId: "ad9d0c05-dde8-4af4-8e66-f36306df911d",
    title: "Evangelho Diário",
    subtitle: "Lectio Divina Diária",
    category: "Rotinas Matinais",
    elevenlabsVoiceId: "L0Dsvb3SLTyegXwtm47J", // Archer - padre
    imageUrl: "/images/home/thumbnails/evangelho-diario.png",
    durationMinutes: 15
  },
  
  // Música - Registros existentes
  "m2": {
    homeId: "m2",
    supabaseId: "8636b8e5-0491-44e8-9056-085d607825fb",
    title: "Sacred Heart Lofi Beats",
    subtitle: "Lofi católico para oração",
    category: "Música",
    elevenlabsVoiceId: "g6xIsTj2HwM6VR4iXFCw", // Jessica - storytelling
    imageUrl: "/images/home/thumbnails/sacred-heart-lofi.png",
    durationMinutes: 60
  },
  
  "m1": {
    homeId: "m1",
    supabaseId: "109ee364-8ddb-4f37-a85e-6ad653a6bb75",
    title: "Piano: Sagrado Coração",
    subtitle: "Música para meditação",
    category: "Música",
    elevenlabsVoiceId: "g6xIsTj2HwM6VR4iXFCw", // Jessica - storytelling
    imageUrl: "/images/home/thumbnails/tome-ao-vivo.png",
    durationMinutes: 45
  }
}

// Função para obter o mapeamento por ID da home
export function getAudioMapping(homeId: string): AudioMapping | null {
  return audioMapping[homeId] || null
}

// Função para obter o mapeamento por ID do Supabase
export function getAudioMappingBySupabaseId(supabaseId: string): AudioMapping | null {
  return Object.values(audioMapping).find(mapping => mapping.supabaseId === supabaseId) || null
}

// Função para listar todos os mapeamentos
export function getAllAudioMappings(): AudioMapping[] {
  return Object.values(audioMapping)
}

// Função para obter mapeamentos por categoria
export function getAudioMappingsByCategory(category: string): AudioMapping[] {
  return Object.values(audioMapping).filter(mapping => mapping.category === category)
} 