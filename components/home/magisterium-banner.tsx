import Link from "next/link"
import { ChevronRight, Triangle } from "lucide-react"

export default function MagisteriumBanner() {
  return (
    <section className="py-6 md:py-8">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Magisterium IA</h2>
        <Link href="/magisterium-ai" className="block group">
          <div className="bg-slate-800 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-3">
              <Triangle className="h-5 w-5 mr-2 fill-amber-400 stroke-amber-400" />
              <span className="text-sm font-semibold tracking-wider">MAGISTERIUM</span>
            </div>
            <p className="text-xl md:text-2xl font-semibold mb-3">
              Olá, eu sou o Magisterium AI. Faça-me perguntas sobre a fé e os ensinamentos da Igreja!
            </p>
            <div className="flex items-center text-sm text-amber-400 group-hover:underline">
              Experimente
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
