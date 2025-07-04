import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

export function createClient(cookieStore?: ReturnType<typeof cookies>) {
  const store = cookieStore ?? cookies()

  const supabaseUrl = "https://llomihbcknpzndlabmmt.supabase.co"
  const supabaseServiceKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsb21paGJja25wem5kbGFibW10Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDI1NzUzNCwiZXhwIjoyMDY1ODMzNTM0fQ.fCUHZBkeuBtcb5IxTT7JvpHSoV6au2mwFpEPXHTjFXU"

  return createServerClient<Database>(supabaseUrl, supabaseServiceKey, {
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
  })
}
