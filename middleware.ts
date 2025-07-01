import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl

  // --- Redireciona usuários LOGADOS ---
  // Se o usuário está logado e tenta acessar a página de login, redireciona para /home.
  if (session && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/home", request.url))
  }

  // --- Redireciona usuários NÃO LOGADOS ---
  // Define as rotas que são públicas e não precisam de login.
  const publicRoutes = ["/login", "/termos", "/auth/callback", "/auth/confirm"]

  // Verifica se a rota atual é pública.
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

  // Se a rota NÃO é pública e o usuário NÃO está logado, redireciona para /login.
  if (!isPublicRoute && !session) {
    const redirectUrl = new URL("/login", request.url)
    // Preserva a URL que o usuário tentou acessar para redirecioná-lo após o login.
    redirectUrl.searchParams.set("next", pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Se o usuário não está logado e acessa a raiz, redireciona para o login.
  if (!session && pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Se nenhuma das condições acima for atendida, permite que a requisição continue normalmente.
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images folder)
     * - auth/auth-code-error (specific error page)
     */
    "/((?!_next/static|_next/image|favicon.ico|images|auth/auth-code-error).*)",
  ],
}
