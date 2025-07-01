import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MailCheck } from "lucide-react"

export default function AuthConfirmPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex justify-center">
          <MailCheck className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Confirme seu e-mail</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Enviamos um link de confirmação para o seu endereço de e-mail. Por favor, verifique sua caixa de entrada (e a
          pasta de spam) para concluir o cadastro.
        </p>
        <Button asChild className="w-full">
          <Link href="/login">Voltar para o Login</Link>
        </Button>
      </div>
    </div>
  )
}
