export interface AudioTrack {
  id: string
  title: string
  artist?: string
  duration: string
  imageUrl: string
  type: "audio" | "playlist"
  itemCount?: number
  description?: string
  category?: string
  subCategory?: string
}

export interface Playlist extends AudioTrack {
  type: "playlist"
  tracks: AudioTrack[]
  itemCount: number
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
