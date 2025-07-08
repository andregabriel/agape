import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl

  // Adicionado '/home' às rotas protegidas para exigir login.
  const protectedRoutes = ["/home", "/eu", "/playlist"]

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Novo: Permitir acesso a rotas protegidas para qualquer sessão (autenticada ou anônima)
  if (!session && isProtectedRoute) {
    console.log("[middleware] Sem sessão, redirecionando para /login")
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Log do tipo de usuário para depuração
  if (session) {
    const isAnonymous = session.user?.is_anonymous
    console.log(`[middleware] Sessão detectada. Usuário anônimo? ${isAnonymous}`)
  }

  // Se o usuário estiver logado e tentar acessar a página de login ou a raiz, redireciona para /home
  if (session && (pathname === "/login" || pathname === "/")) {
    return NextResponse.redirect(new URL("/home", request.url))
  }

  // Se o usuário não estiver logado e acessar a raiz, redireciona para a página de login
  if (!session && pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|auth).*)",
  ],
}
