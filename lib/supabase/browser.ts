import { createBrowserClient } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

let sb: SupabaseClient | undefined // Módulo = singleton real

export function supabase(): SupabaseClient {
  if (!sb) {
    sb = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  }
  return sb
}
