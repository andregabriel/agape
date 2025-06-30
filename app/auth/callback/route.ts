import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const cookieStore = cookies()

  // Lê o 'next' path do cookie que definimos na ação de login
  const next = cookieStore.get("next_url")?.value ?? "/"

  // Limpa o cookie para não ser reutilizado em logins futuros
  cookieStore.delete("next_url")

  if (code) {
    const supabase = createClient(cookieStore)
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Redirecionamento para o destino correto (`/home` ou `/admin`)
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Em caso de erro na troca do código, redireciona para uma página de erro
  console.error("Error in auth callback:", "Could not exchange code for session")
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
