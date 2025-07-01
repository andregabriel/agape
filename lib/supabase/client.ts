import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/types/supabase"
import type { SupabaseClient } from "@supabase/supabase-js"
import { supabase } from "./browser"

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

// Este arquivo atua como um adaptador para importações legadas.
// Ele garante que qualquer parte do código que ainda chame `createClient`
// receba a instância singleton correta do cliente Supabase do navegador.
export function createClient() {
  return supabase()
}
