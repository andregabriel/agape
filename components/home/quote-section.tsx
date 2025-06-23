import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function QuoteSection() {
  return (
    <section className="py-6 md:py-8">
      <div className="container px-4 md:px-6">
        {/* Título da seção implícito, não mostrado na imagem */}
        {/* <h2 className="text-2xl font-bold tracking-tight mb-4">Frases</h2> */}
        <div className="bg-card p-6 md:p-8 rounded-lg shadow-md text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">SÃO BOAVENTURA</p>
          <blockquote className="text-2xl md:text-3xl font-serif italic text-card-foreground mb-6">
            {'"Toda criatura é uma palavra divina porque proclama Deus."'}
          </blockquote>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Upload className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
