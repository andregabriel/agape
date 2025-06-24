import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Upload, QrCode, Gift } from "lucide-react"
import Link from "next/link"

export default function FinalSection() {
  return (
    <section className="py-10 md:py-16 bg-muted/50">
      <div className="container px-4 md:px-6 text-center">
        <p className="text-4xl md:text-5xl font-bold text-foreground mb-1">992,285,955</p>
        <p className="text-sm md:text-base text-muted-foreground mb-6">Orações Rezadas com o Hallow</p>

        <div className="flex justify-center space-x-3 md:space-x-4 mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/share">
              <Upload className="h-4 w-4 mr-2" />
              Compartilhar
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/share-code">
              <QrCode className="h-4 w-4 mr-2" />
              Código
            </Link>
          </Button>
        </div>

        <div className="max-w-xs mx-auto mb-4">
          <Image
            src="/placeholder.svg?width=200&height=150" // Placeholder for gift image
            alt="Presentes Hallow"
            width={200}
            height={150}
            className="mx-auto"
          />
        </div>
        <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
          Incentive outras pessoas a rezar dando a elas acesso ao Hallow.
        </p>

        <Button
          size="lg"
          className="bg-foreground text-background hover:bg-foreground/80 w-full max-w-xs mx-auto"
          asChild
        >
          <Link href="/gift">
            <Gift className="h-5 w-5 mr-2" />
            Presente Hallow
          </Link>
        </Button>
      </div>
    </section>
  )
}
