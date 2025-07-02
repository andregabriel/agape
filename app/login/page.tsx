"use client"

import { useState, useEffect, useTransition } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { X, Mail, User, Loader2, ArrowLeft, Pencil } from "lucide-react"
import { signInWithGoogle, signInWithApple, loginWithEmail, signupWithEmail, checkUserExists } from "@/app/auth/actions"
import { useSupabaseClient } from "@/components/providers/supabase-provider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.15,1.42a5.2,5.2,0,0,0-4.4,2.58,11.2,11.2,0,0,0-2.8,8.3,10.7,10.7,0,0,0,3.4,7.4,5.5,5.5,0,0,0,4.1,1.8c1.1,0,2.2-.4,3.3-.4a3.4,3.4,0,0,1,1.1.2,3.8,3.8,0,0,1,2.6,3.4,1.2,1.2,0,0,0,1.2,1.1,1.1,1.1,0,0,0,1.1-1.1,6.6,6.6,0,0,0-3.2-5.9,5.4,5.4,0,0,1-1.9-4.4,10.9,10.9,0,0,1,2.5-7.2,5.3,5.3,0,0,0-4.2-2.3C12.75,1.42,12.45,1.42,12.15,1.42ZM11.7,0c.8,0,1.8.5,2.4.5s1.5-.5,2.4-.5,1.7.9,1.7,2.1-.9,2.1-1.9,2.1-1.8-.9-2.6-.9-1.6.9-2.6.9-1.7-1-1.7-2.1S10.9,0,11.7,0Z" />
  </svg>
)

export default function LoginPage() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const supabase = useSupabaseClient()

  // State for general flow
  const [isGuestLoading, setIsGuestLoading] = useState(false)
  const [showEmailFlow, setShowEmailFlow] = useState(false)
  const [step, setStep] = useState("enterEmail") // 'enterEmail', 'enterPassword', 'register'
  const [flowError, setFlowError] = useState("")

  // State for form fields
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [whatsapp, setWhatsapp] = useState("")

  // State for transitions/loading
  const [isChecking, startChecking] = useTransition()
  const [isSubmitting, startSubmitting] = useTransition()

  const nextUrl = searchParams.get("next") || "/home"
  const serverError = searchParams.get("error")
  const initialEmail = searchParams.get("email")

  useEffect(() => {
    if (serverError) {
      setFlowError(serverError)
      setShowEmailFlow(true)
      if (initialEmail) {
        setEmail(initialEmail)
        setStep("enterPassword") // Assume user exists if redirected with error and email
      }
    }
  }, [serverError, initialEmail])

  const handleGuestLogin = async () => {
    setIsGuestLoading(true)
    const { error } = await supabase.auth.signInAnonymously()
    if (!error) {
      window.location.href = "/home"
    } else {
      setFlowError(error.message)
      setIsGuestLoading(false)
    }
  }

  const handleEmailContinue = async () => {
    setFlowError("")
    if (!email) {
      setFlowError("Por favor, insira seu e-mail.")
      return
    }
    startChecking(async () => {
      const { exists, error } = await checkUserExists(email)
      if (error) {
        setFlowError(error)
      } else if (exists) {
        setStep("enterPassword")
      } else {
        setStep("register")
      }
    })
  }

  const resetFlow = () => {
    setShowEmailFlow(false)
    setStep("enterEmail")
    setEmail("")
    setPassword("")
    setFirstName("")
    setLastName("")
    setWhatsapp("")
    setFlowError("")
  }

  const editEmail = () => {
    setStep("enterEmail")
    setPassword("")
  }

  const renderEmailFlow = () => (
    <div className="w-[280px] mx-auto">
      <Button variant="ghost" onClick={resetFlow} className="mb-2">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>

      {step === "enterEmail" && (
        <div className="space-y-4 pt-4">
          <Label htmlFor="email">Qual é o seu e-mail?</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleEmailContinue} disabled={isChecking} className="w-full">
            {isChecking ? <Loader2 className="animate-spin" /> : "Continuar"}
          </Button>
        </div>
      )}

      {step === "enterPassword" && (
        <form
          action={(formData) => {
            startSubmitting(async () => {
              await loginWithEmail(formData)
            })
          }}
          className="space-y-4 pt-4"
        >
          <div className="flex items-center justify-between">
            <Label>E-mail</Label>
            <Button variant="link" size="sm" type="button" onClick={editEmail} className="p-0 h-auto">
              <Pencil className="w-3 h-3 mr-1" /> Trocar
            </Button>
          </div>
          <Input readOnly value={email} className="bg-gray-100" />
          <input type="hidden" name="email" value={email} />
          <div>
            <Label htmlFor="login-password">Senha</Label>
            <Input id="login-password" name="password" type="password" required />
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Entrar"}
          </Button>
        </form>
      )}

      {step === "register" && (
        <form
          action={(formData) => {
            startSubmitting(async () => {
              await signupWithEmail(formData)
            })
          }}
          className="space-y-3 pt-4"
        >
          <div className="flex items-center justify-between">
            <Label>E-mail</Label>
            <Button variant="link" size="sm" type="button" onClick={editEmail} className="p-0 h-auto">
              <Pencil className="w-3 h-3 mr-1" /> Trocar
            </Button>
          </div>
          <Input readOnly value={email} className="bg-gray-100" />
          <input type="hidden" name="email" value={email} />
          <div>
            <Label htmlFor="firstName">Primeiro Nome</Label>
            <Input id="firstName" name="firstName" type="text" required />
          </div>
          <div>
            <Label htmlFor="lastName">Sobrenome</Label>
            <Input id="lastName" name="lastName" type="text" required />
          </div>
          <div>
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input id="whatsapp" name="whatsapp" type="tel" placeholder="(XX) XXXXX-XXXX" />
          </div>
          <div>
            <Label htmlFor="signup-password">Crie uma Senha</Label>
            <Input id="signup-password" name="password" type="password" required minLength={6} />
            <p className="text-xs text-gray-500 mt-1">Mínimo de 6 caracteres.</p>
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full pt-2">
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Criar conta e continuar"}
          </Button>
        </form>
      )}
    </div>
  )

  const renderMainButtons = () => (
    <div className="w-[280px] mx-auto space-y-3">
      <form action={signInWithGoogle}>
        <input type="hidden" name="next" value={nextUrl} />
        <input type="hidden" name="originPath" value={pathname} />
        <Button
          type="submit"
          className="w-full bg-zinc-300 text-zinc-800 hover:bg-zinc-400 border-transparent py-6 rounded-xl text-base font-medium flex items-center justify-start px-6"
        >
          <GoogleIcon />
          Continue com o Google
        </Button>
      </form>
      <form action={signInWithApple}>
        <input type="hidden" name="next" value={nextUrl} />
        <input type="hidden" name="originPath" value={pathname} />
        <Button
          type="submit"
          variant="secondary"
          className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 border-transparent py-6 rounded-xl text-base font-medium flex items-center justify-start px-6"
        >
          <AppleIcon />
          Continue com a Apple
        </Button>
      </form>
      <Button
        variant="secondary"
        className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200 border-transparent py-6 rounded-xl text-base font-medium flex items-center justify-start px-6"
        onClick={() => setShowEmailFlow(true)}
      >
        <Mail className="w-5 h-5 mr-3" />
        Continue com E-mail
      </Button>
      <Button
        className="w-full bg-gray-50 text-gray-700 hover:bg-gray-100 border-transparent py-6 rounded-xl text-base font-medium flex items-center justify-start px-6"
        onClick={handleGuestLogin}
        disabled={isGuestLoading}
      >
        {isGuestLoading ? <Loader2 className="w-5 h-5 mr-3 animate-spin" /> : <User className="w-5 h-5 mr-3" />}
        Continue como Convidado
      </Button>
    </div>
  )

  return (
    <div className="flex flex-col h-screen bg-white text-gray-800 relative">
      <header className="absolute top-0 right-0 p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleGuestLogin}
          disabled={isGuestLoading}
          className="bg-gray-100 hover:bg-gray-200 rounded-full"
          aria-label="Entrar como convidado"
        >
          {isGuestLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <X className="h-5 w-5 text-gray-600" />}
        </Button>
      </header>

      <main className="flex-grow flex flex-col items-center justify-end pb-8 text-center">
        <div className="flex flex-col items-center">
          <Image src="/images/agape-logo.png" alt="Agape Logo" width={280} height={70} priority />
        </div>
      </main>

      <div className="px-6 pb-8">
        {flowError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-center text-sm">
            <p>{flowError}</p>
          </div>
        )}

        {showEmailFlow ? renderEmailFlow() : renderMainButtons()}
      </div>

      <footer className="pb-8 px-6 text-center">
        <p className="text-xs text-gray-500">
          Ao usar a Agape, você concorda com nossos{" "}
          <Link href="/termos" className="underline hover:text-black">
            Termos
          </Link>
          .
        </p>
      </footer>
    </div>
  )
}
