import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/types/supabase"

// 🔥 HARDCODED CREDENTIALS FOR DEBUGGING - TEMPORARY SOLUTION
// Padrão Singleton robusto que reutiliza a instância entre os reloads do HMR.
// Usamos `createBrowserClient` da biblioteca @supabase/ssr, que é a
// abordagem moderna e correta para o Next.js App Router.
const supabase =
  (globalThis as any).__supabase_client ??
  ((globalThis as any).__supabase_client = createBrowserClient<Database>(
    "https://llomihbcknpzndlabmmt.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsb21paGJja25wem5kbGFibW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNTc1MzQsImV4cCI6MjA2NTgzMzUzNH0.lP6F0JwQZ-n6Y2w67MLCdTPcUaiVw-ddloryJrlbq7U",
  ))

export const createClient = () => supabase // <── NEW – satisfies modules that import { createClient }
export default supabase
