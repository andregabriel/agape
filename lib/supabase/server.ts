import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

export function createClient(cookieStore?: ReturnType<typeof cookies>) {
  // Se cookieStore não for fornecido, usa cookies() como padrão.
  // Esta é a correção principal para evitar o erro 'get' of undefined.
  const store = cookieStore ?? cookies()

  return createServerClient<Database>(
    "https://llomihbcknpzndlabmmt.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsb21paGJja25wem5kbGFibW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNTc1MzQsImV4cCI6MjA2NTgzMzUzNH0.lP6F0JwQZ-n6Y2w67MLCdTPcUaiVw-ddloryJrlbq7U",
    {
      cookies: {
        get(name: string) {
          return store.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            store.set({ name, value, ...options })
          } catch (error) {
            // O método `set` foi chamado de um Server Component.
            // Isso pode ser ignorado se você tiver um middleware atualizando as sessões.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            store.set({ name, value: "", ...options })
          } catch (error) {
            // O método `delete` foi chamado de um Server Component.
          }
        },
      },
    },
  )
}
