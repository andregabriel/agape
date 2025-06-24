// Novo componente para seções como "Histórias Bíblicas Para Dormir" (3 linhas, N colunas, scroll H)
import Image from "next/image"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GridItemData {
  id: string
  imageUrl: string
  title: string
  subtitle: string
  details: string
  link: string
}

interface HorizontalGridScrollSectionProps {
  title: string
  items: GridItemData[]
}

export default function HorizontalGridScrollSection({ title, items }: HorizontalGridScrollSectionProps) {
  return (
    <section className="py-6 md:py-8">
      <div className="container px-0 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-4 px-4 md:px-0">{title}</h2>
        {/* 
          Para 3 linhas, definimos uma altura fixa para o container de scroll.
          Cada item terá uma largura fixa. O container de scroll terá overflow-x.
          A altura do container será aproximadamente 3 * (altura do item + gap).
          Os itens serão dispostos em colunas usando flex-col e flex-wrap dentro do container de scroll.
        */}
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent -mx-4 px-4 md:mx-0 md:px-0 pb-4">
          <div
            className="flex flex-col flex-wrap h-[calc(3*(theme(spacing.28)+theme(spacing.3)))] md:h-[calc(3*(theme(spacing.32)+theme(spacing.3)))] gap-3"
            style={{ writingMode: "horizontal-tb" }}
          >
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="flex items-center p-2 bg-card rounded-lg shadow-sm hover:bg-muted transition-colors w-64 md:w-72 h-28 md:h-32" // Largura fixa, altura para caber 3 linhas
              >
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-md overflow-hidden mr-3 shrink-0">
                  <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} layout="fill" objectFit="cover" />
                </div>
                <div className="flex-grow overflow-hidden">
                  <h3 className="font-semibold text-sm md:text-base leading-tight truncate">{item.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.details}</p>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground ml-1 shrink-0 self-start">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
