"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { X, Mail } from "lucide-react"
import { signInWithGoogle } from "@/app/auth/actions"

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
)

const AppleIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 3.22C8.34 3.22 7.01 4.45 7.01 5.96c0 .4.1.78.28 1.12C6.01 7.49 5 8.76 5 10.22c0 1.93 1.56 3.5 3.49 3.5 1.03 0 1.95-.44 2.58-1.15.01.01.01.01.02.01.62.71 1.54 1.15 2.58 1.15 1.93 0 3.49-1.57 3.49-3.5C17 8.76 15.99 7.49 14.71 7.08c.18-.34.28-.72.28-1.12C15 4.45 13.66 3.22 12 3.22c-.93 0-1.75.44-2.28 1.12C9.19 3.66 8.37 3.22 7.4 3.22H10zM12 1.09c.79 0 1.5.29 2.06.76-.56.49-1.2.79-1.93.79s-1.37-.3-1.93-.79c.56-.47 1.27-.76 2.06-.76zM10.01 14.91c-1.56 0-2.83-1.15-2.83-2.57S8.45 9.77 10 9.77s2.83 1.15 2.83 2.57-1.27 2.57-2.82 2.57z" />
  </svg>
)

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const handleClose = () => {
    router.push("/home")
  }

  // O padrão é redirecionar para /home após o login do usuário padrão
  const nextUrl = searchParams.get("next") || "/home"
  const error = searchParams.get("error")

  return (
    <div className="flex flex-col h-screen bg-[#1E1E1E] text-white">
      <header className="flex justify-between items-center p-4 pt-6">
        <div className="flex-1 text-center">
          <h1 className="text-4xl font-bold">
            Hallow
            <span className="relative">
              <span className="absolute -top-1 -right-1.5 text-xs">◦</span>
            </span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">Terço Diário</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="bg-white/10 hover:bg-white/20 rounded-full absolute top-4 right-4"
          aria-label="Fechar"
        >
          <X className="h-5 w-5 text-white" />
        </Button>
      </header>

      <main className="flex-grow flex flex-col items-center justify-end px-6 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-2/3 sm:h-3/4 z-0 opacity-80">
          <Image
            src="/images/auth/login-background.jpeg"
            alt="Mãos segurando um terço"
            layout="fill"
            objectFit="cover"
            objectPosition="center 40%"
            priority
          />
        </div>

        {error && (
          <div className="relative z-10 mb-4 p-3 bg-red-500/20 text-red-300 border border-red-500 rounded-md">
            <p>Erro no login: {error}</p>
          </div>
        )}

        <div className="relative z-10 w-full max-w-sm space-y-4 mb-8">
          <form action={signInWithGoogle}>
            {/* Este campo hidden diz para a ação de login para onde voltar */}
            <input type="hidden" name="next" value={nextUrl} />
            <input type="hidden" name="originPath" value={pathname} />
            <Button
              type="submit"
              variant="outline"
              className="w-full bg-white text-black hover:bg-gray-100 border-gray-300 py-6 rounded-full text-base font-medium flex items-center justify-center"
            >
              <GoogleIcon />
              Continuar com o Google
            </Button>
          </form>
          <Button
            variant="secondary"
            className="w-full bg-white/20 text-white hover:bg-white/30 border-transparent py-6 rounded-full text-base font-medium flex items-center justify-center"
            onClick={() => console.log("Login com E-mail (ainda não implementado)")}
          >
            <Mail className="w-5 h-5 mr-3" />
            Continue com E-mail
          </Button>
          <Button
            variant="secondary"
            className="w-full bg-black/50 text-white hover:bg-black/70 border-transparent py-6 rounded-full text-base font-medium flex items-center justify-center"
            onClick={() => console.log("Login com Apple (ainda não implementado)")}
          >
            <AppleIcon />
            Continuar com a Apple
          </Button>
        </div>
      </main>

      <footer className="pb-8 px-6 text-center">
        <p className="text-xs text-gray-400">
          Ao usar o Hallow, você concorda com nossos{" "}
          <Link href="/termos" className="underline hover:text-white">
            Termos
          </Link>
          .
        </p>
      </footer>
    </div>
  )
}
