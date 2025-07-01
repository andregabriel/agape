"use client"

import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signOut } from "@/app/auth/actions"

export default function LogoutButton() {
  return (
    <form action={signOut}>
      <Button variant="ghost" className="w-full justify-start">
        <LogOut className="mr-2 h-4 w-4" />
        <span>Sair</span>
      </Button>
    </form>
  )
}
