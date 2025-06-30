import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)

  // Atualiza a sessão do usuário. Essencial para o funcionamento da autenticação no lado do servidor.
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Se o usuário estiver logado e tentar acessar a página de login principal, redireciona para /home
  if (session && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url))
  }

  // Se o usuário não estiver logado e tentar acessar uma rota protegida (ex: /home),
  // pode-se redirecioná-lo para o login. (Lógica a ser adicionada se necessário)

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
