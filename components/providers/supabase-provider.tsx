"use client"

import type { PropsWithChildren } from "react"

import { SessionContextProvider } from "@supabase/auth-helpers-react"

import sb from "@/lib/supabase/client"

export default function SupabaseProvider({ children }: PropsWithChildren) {
  return (
    <SessionContextProvider supabaseClient={sb} initialSession={null}>
      {children}
    </SessionContextProvider>
  )
}
