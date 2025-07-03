import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  console.log("Auth callback route hit!") // Log para depuração

  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")

  if (code) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Sucesso! Redireciona para /home.
      // O cookie de sessão é definido automaticamente pelo exchangeCodeForSession.
      return NextResponse.redirect(`${origin}/home`)
    }
    console.error("Error exchanging code for session:", error)
  }

  // Se não houver código ou se a troca falhar, redireciona para uma página de erro.
  console.error("Redirecting to auth-code-error page.")
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
