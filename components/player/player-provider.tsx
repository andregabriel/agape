"use client"

import { usePlayerStore } from "@/store/player-store"
import FullPlayer from "./full-player"
import MiniPlayer from "./mini-player"
import AudioPlayerEngine from "./audio-player-engine"
import PaymentModal from "@/components/payment-modal"

export function PlayerProvider() {
  const view = usePlayerStore((state) => state.view)
  const showPaymentModal = usePlayerStore((state) => state.showPaymentModal)
  const paymentAudioTitle = usePlayerStore((state) => state.paymentAudioTitle)
  const closePaymentModal = usePlayerStore((state) => state.closePaymentModal)

  return (
    <>
      {/* Engine de áudio global - sempre montado */}
      <AudioPlayerEngine />
      
      {view !== "hidden" && (
        <>
          {view === "mini" && <MiniPlayer />}
          {view === "full" && <FullPlayer />}
        </>
      )}
      
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={closePaymentModal}
        audioTitle={paymentAudioTitle || undefined}
      />
    </>
  )
}
