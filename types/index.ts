export interface AudioTrack {
  id: string
  title: string // Obrigatório
  artist?: string
  duration: string
  imageUrl: string // Obrigatório
  audioUrl?: string // Arquivo de áudio em si - Obrigatório para áudios
  type: "audio" | "playlist"
  itemCount?: number
  description?: string // Opcional
  subtitle?: string // Opcional
  category?: string
  subCategory?: string
  link?: string
}

export interface Playlist extends AudioTrack {
  type: "playlist"
  tracks: AudioTrack[]
  itemCount: number
  name: string // Nome da playlist - Obrigatório
  audioList: string[] // Lista de IDs dos áudios que compõem a playlist
}

export interface Category {
  id: string
  name: string // Nome da categoria - Obrigatório
  audioList: string[] // Lista de IDs dos áudios que compõem a categoria
  playlistList: string[] // Lista de IDs das playlists que compõem a categoria
  description?: string
  color?: string
  imageUrl?: string
  order?: number
  visible?: boolean
}

export interface Database {
  public: {
    Tables: {
      audios: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string | null
          duration_seconds: number | null
          image_url: string | null
          audio_url: string | null
          category: string | null
          sub_category: string | null
          item_count: number | null
          is_playlist: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description?: string | null
          duration_seconds?: number | null
          image_url?: string | null
          audio_url?: string | null
          category?: string | null
          sub_category?: string | null
          item_count?: number | null
          is_playlist?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string | null
          duration_seconds?: number | null
          image_url?: string | null
          audio_url?: string | null
          category?: string | null
          sub_category?: string | null
          item_count?: number | null
          is_playlist?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
  }
}
