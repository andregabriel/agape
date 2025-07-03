import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/types/supabase"
import type { SupabaseClient } from "@supabase/supabase-js"

// Variável para armazenar a instância do cliente (Singleton)
let client: SupabaseClient<Database> | undefined

/**
 * Retorna uma instância singleton do Supabase client para o navegador.
 * Evita a criação de múltiplas instâncias e o aviso "Multiple GoTrueClient instances".
 */
export function getSupabaseBrowserClient() {
  if (client === undefined) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Missing Supabase URL or Anon Key in client environment")
    }

    client = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
  }

  return client
}
