import { create } from "zustand"
import type { AudioTrack, Playlist } from "@/types"

export type PlayerStatus = "playing" | "paused" | "stopped"
export type PlayerView = "hidden" | "mini" | "full"

interface PlayerState {
  currentTrack: AudioTrack | null
  playlist: (AudioTrack | Playlist)[]
  status: PlayerStatus
  view: PlayerView
  play: (track: AudioTrack, playlist?: (AudioTrack | Playlist)[]) => void
  pause: () => void
  resume: () => void
  showPlayer: () => void
  hidePlayer: () => void
  minimizePlayer: () => void
  expandPlayer: () => void
  closePlayer: () => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentTrack: null,
  playlist: [],
  status: "stopped",
  view: "hidden",

  play: (track, playlist = []) =>
    set({
      currentTrack: track,
      playlist: playlist.length > 0 ? playlist : [track],
      status: "playing",
      view: "mini", // Start with mini player as per flow
    }),

  pause: () => set({ status: "paused" }),
  resume: () => set({ status: "playing" }),

  showPlayer: () => set((state) => ({ view: state.view === "hidden" ? "mini" : state.view })),
  hidePlayer: () => set({ view: "hidden", status: "stopped", currentTrack: null }),
  minimizePlayer: () => set({ view: "mini" }),
  expandPlayer: () => set({ view: "full" }),
  closePlayer: () => set({ view: "hidden", status: "stopped", currentTrack: null, playlist: [] }),
}))
