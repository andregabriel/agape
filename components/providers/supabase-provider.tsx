"use client"

import React, { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react"
import type { SupabaseClient, User, Session, AuthChangeEvent } from "@supabase/supabase-js"
import supabase from "@/lib/supabase/client"
import type { Database } from "@/types/supabase"

interface SupabaseContextType {
  supabaseClient: SupabaseClient<Database>
  user: User | null
  session: Session | null
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

export function useSupabaseClient() {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error("useSupabaseClient must be used within SupabaseProvider")
  }
  return context.supabaseClient
}

export function useUser() {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error("useUser must be used within SupabaseProvider")
  }
  return context.user
}

export function useSession() {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error("useSession must be used within SupabaseProvider")
  }
  return context.session
}

export default function SupabaseProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const value: SupabaseContextType = {
    supabaseClient: supabase,
    user,
    session,
  }

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  )
}
