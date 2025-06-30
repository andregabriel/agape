import { createBrowserClient } from "@supabase/ssr"

// Padrão Singleton para garantir uma única instância do cliente Supabase no navegador.
// Isso resolve o aviso "Multiple GoTrueClient instances".
export const createClient = () =>
  createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
