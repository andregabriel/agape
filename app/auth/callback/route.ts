import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  console.log("Auth callback route hit!") // Log para depuração

  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const type = searchParams.get("type") // 'admin' or null

  if (code) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Se é login de admin, verifica permissões
      if (type === "admin") {
        const { data: { user } } = await supabase.auth.getUser()
        const isAdmin = user?.user_metadata?.is_admin || user?.role === "admin"
        
        if (!isAdmin) {
          // Não é admin, faz logout e redireciona
          await supabase.auth.signOut()
          return NextResponse.redirect(`${origin}/admin/login?message=Você não possui permissões de administrador`)
        }
        
        // É admin, redireciona para área administrativa
        return NextResponse.redirect(`${origin}/admin`)
      }
      
      // Login normal, redireciona para home
      return NextResponse.redirect(`${origin}/home`)
    }
    console.error("Error exchanging code for session:", error)
  }

  // Se não houver código ou se a troca falhar, redireciona para uma página de erro.
  console.error("Redirecting to auth-code-error page.")
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
