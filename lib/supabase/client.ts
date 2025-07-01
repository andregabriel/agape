import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/types/supabase"
import type { SupabaseClient } from "@supabase/supabase-js"

let browserClient: SupabaseClient<Database> | undefined

export function getSupabaseBrowser(): SupabaseClient<Database> {
  if (!browserClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Missing Supabase URL or Anon Key in client environment")
    }
    browserClient = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
  }
  return browserClient
}

/** Alias mantido por retro-compatibilidade com trechos de código que
 * ainda fazem `import { createClient } from "@/lib/supabase/client"`.
 * Internamente ele reaproveita o singleton já criado.
 */
export function createClient(): SupabaseClient<Database> {
  return getSupabaseBrowser()
}
