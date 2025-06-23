import Image from "next/image"
import { SearchIcon } from "lucide-react"

export default function DiscoverPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="p-4">
        <h1 className="text-3xl font-bold mb-4">Descobrir</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Orações, Categorias, Bíblia e Mais"
            className="w-full bg-gray-100 border border-gray-200 rounded-lg py-3 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <SearchIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </header>

      {/* Featured Section */}
      <section className="p-4">
        <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/images/pope-leo-xiv.jpeg"
            alt="Papa Leão XIV"
            width={400}
            height={200}
            className="w-full h-80 object-cover"
          />
        </div>
      </section>

      {/* Recommended Categories */}
      <section className="p-4">
        <h2 className="text-xl font-bold mb-3">Categorias Recomendadas</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/easter-category.png"
              alt="Páscoa"
              width={200}
              height={120}
              className="w-full h-24 object-cover"
            />
            <div className="p-3 bg-white">
              <h3 className="font-semibold">Páscoa</h3>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/daily-category.jpeg"
              alt="Diárias"
              width={200}
              height={120}
              className="w-full h-24 object-cover"
            />
            <div className="p-3 bg-white">
              <h3 className="font-semibold">Diárias</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
