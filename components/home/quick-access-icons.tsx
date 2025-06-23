import { Star, Download, CalendarDays, History } from "lucide-react" // Adicionado History
import { Button } from "@/components/ui/button"
import Link from "next/link"

const accessItems = [
  { label: "Favoritos", icon: Star, href: "/favoritos" },
  { label: "Downloads", icon: Download, href: "/downloads" },
  { label: "Rotina", icon: CalendarDays, href: "/rotina" },
  { label: "Recentes", icon: History, href: "/recentes" }, // Novo item adicionado
]

export default function QuickAccessIcons() {
  return (
    <div className="bg-background p-4">
      {/* Alterado para grid-cols-4 para acomodar o novo ícone */}
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        {accessItems.map((item) => (
          <Link key={item.label} href={item.href} passHref>
            <Button
              variant="secondary"
              className="flex flex-col items-center justify-center h-20 md:h-24 w-full text-xs md:text-sm bg-muted hover:bg-muted/80"
            >
              <item.icon className="h-5 w-5 md:h-6 md:w-6 mb-1" />
              {item.label}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}
