import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const cookieStore = cookies()

  // Lê o 'next' path do cookie que definimos anteriormente
  const next = cookieStore.get("next_url")?.value ?? "/"

  // Limpa o cookie para não ser reutilizado
  cookieStore.delete("next_url")

  if (code) {
    const supabase = createClient(cookieStore)
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Redireciona para o destino correto após o login
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Em caso de erro, retorna para a página de erro
  console.error("Error in auth callback:", "Could not exchange code for session")
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
