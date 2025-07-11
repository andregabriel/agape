import { create } from "zustand"
import type { AudioTrack, Playlist } from "@/types"

export type PlayerStatus = "playing" | "paused" | "stopped"
export type PlayerView = "hidden" | "mini" | "full"

interface PlayerState {
  currentTrack: AudioTrack | null
  playlist: (AudioTrack | Playlist)[]
  status: PlayerStatus
  view: PlayerView
  showPaymentModal: boolean
  paymentAudioTitle: string | null
  play: (track: AudioTrack, playlist?: (AudioTrack | Playlist)[], userType?: 'guest' | 'authenticated') => void
  pause: () => void
  resume: () => void
  showPlayer: () => void
  hidePlayer: () => void
  minimizePlayer: () => void
  expandPlayer: () => void
  closePlayer: () => void
  openPaymentModal: (audioTitle?: string) => void
  closePaymentModal: () => void
  prepare: (track: AudioTrack, playlist?: (AudioTrack | Playlist)[], userType?: 'guest' | 'authenticated') => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentTrack: null,
  playlist: [],
  status: "stopped",
  view: "hidden",
  showPaymentModal: false,
  paymentAudioTitle: null,

  play: (track, playlist = [], userType = 'authenticated') => {
    console.log("Tentando reproduzir:", track.title, "audioUrl:", track.audioUrl)
    
    // Se for convidado, mostra modal de pagamento ao invés de reproduzir
    if (userType === 'guest') {
      set({
        showPaymentModal: true,
        paymentAudioTitle: track.title,
      })
      return
    }

    // Funcionalidade original para usuários autenticados
    set({
      currentTrack: track,
      playlist: playlist.length > 0 ? playlist : [track],
      status: "playing",
      view: "mini", // Start with mini player as per flow
    })
  },

  pause: () => {
    console.log("Pausando áudio...")
    set({ status: "paused" })
  },
  resume: () => {
    console.log("Retomando áudio...")
    set({ status: "playing" })
  },

  showPlayer: () => set((state) => ({ view: state.view === "hidden" ? "mini" : state.view })),
  hidePlayer: () => set({ view: "hidden", status: "stopped", currentTrack: null }),
  minimizePlayer: () => set({ view: "mini" }),
  expandPlayer: () => set({ view: "full" }),
  closePlayer: () => set({ view: "hidden", status: "stopped", currentTrack: null, playlist: [] }),

  openPaymentModal: (audioTitle) => set({ showPaymentModal: true, paymentAudioTitle: audioTitle }),
  closePaymentModal: () => set({ showPaymentModal: false, paymentAudioTitle: null }),

  prepare: (track, playlist = [], userType = 'authenticated') => {
    console.log("Preparando player:", track.title, "audioUrl:", track.audioUrl)
    
    // Prepara o player mas não inicia a reprodução
    set({
      currentTrack: track,
      playlist: playlist.length > 0 ? playlist : [track],
      status: "paused",
      view: "mini",
    })
  },
}))
