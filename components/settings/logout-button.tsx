"use client"

import { Button } from "@/components/ui/button"
import { signOutUser } from "@/app/auth/actions"
import { LogOut, Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      variant="ghost"
      className="w-full justify-start text-base text-destructive hover:bg-destructive/10 p-2 h-auto"
      type="submit"
      disabled={pending}
      aria-label="Sair da sua conta"
    >
      <div className="flex items-center gap-3">
        {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogOut className="h-5 w-5" />}
        Sair
      </div>
    </Button>
  )
}

export default function LogoutButton() {
  return (
    <form action={signOutUser}>
      <SubmitButton />
    </form>
  )
}
