import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

export function createClient(cookieStore?: ReturnType<typeof cookies>) {
  // Se cookieStore não for fornecido, usa cookies() como padrão.
  // Esta é a correção principal para evitar o erro 'get' of undefined.
  const store = cookieStore ?? cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
