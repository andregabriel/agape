import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/types/supabase"

// Padrão Singleton robusto que reutiliza a instância entre os reloads do HMR.
// Usamos `createBrowserClient` da biblioteca @supabase/ssr, que é a
// abordagem moderna e correta para o Next.js App Router.
const supabase =
  (globalThis as any).__supabase_client ??
  ((globalThis as any).__supabase_client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  ))

export const createClient = () => supabase // <── NEW – satisfies modules that import { createClient }
export default supabase
