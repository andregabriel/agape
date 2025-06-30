import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  // se "next" estiver no parâmetro, use-o como URL de redirecionamento
  const next = searchParams.get("next") ?? "/"

  if (code) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // retorna o usuário para uma página de erro com instruções
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
