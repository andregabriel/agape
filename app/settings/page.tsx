import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/settings/theme-toggle"
import LogoutButton from "@/components/settings/logout-button"

export default function SettingsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background border-b">
        <div className="w-10">
          <Link href="/eu" passHref>
            <Button variant="ghost" size="icon" aria-label="Voltar">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
        </div>
        <h1 className="text-xl font-bold text-center">Configurações</h1>
        <div className="w-10" /> {/* Spacer to balance the header */}
      </header>
      <main className="flex-grow p-6 space-y-8">
        <section>
          <h2 className="text-sm font-semibold mb-2 text-muted-foreground px-2">APARÊNCIA</h2>
          <div className="bg-card rounded-lg overflow-hidden">
            <div className="p-4">
              <ThemeToggle />
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-sm font-semibold mb-2 text-muted-foreground px-2">CONTA</h2>
          <div className="bg-card rounded-lg overflow-hidden">
            <div className="p-2">
              <LogoutButton />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
