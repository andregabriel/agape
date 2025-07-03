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

  // Se o usuário não estiver logado e tentar acessar uma rota protegida, redireciona para /login
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url))
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
    /*
     * Corresponde a todas as rotas de solicitação, exceto as que começam com:
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagem)
     * - favicon.ico (arquivo de favicon)
     * - images/ (arquivos de imagem)
     * - auth/ (rotas de autenticação)
     */
    "/((?!_next/static|_next/image|favicon.ico|images|auth).*)",
  ],
}
