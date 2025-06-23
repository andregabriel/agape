import Image from "next/image"
import { Settings, ChevronRight, Zap } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image src="/images/profile-avatar.jpeg" alt="André" width={40} height={40} className="rounded-full" />
          <h1 className="text-2xl font-bold">André</h1>
        </div>
        <button className="p-2">
          <Settings size={24} />
        </button>
      </header>
      <p className="px-4 text-sm text-gray-500 -mt-2 mb-4">André Gabriel</p>

      {/* Sequência Section */}
      <section className="px-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Sequência</h2>
          <ChevronRight size={20} className="text-gray-500" />
        </div>
        <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-3 shadow">
          <Zap size={24} className="text-yellow-500 fill-yellow-500" />
          <span className="font-bold text-xl">0</span>
          <p className="text-sm text-gray-700">Reze hoje e construa um hábito de oração!</p>
        </div>
      </section>

      {/* Rotina Section */}
      <section className="px-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Rotina das 05:00 PM</h2>
          <ChevronRight size={20} className="text-gray-500" />
        </div>
        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/images/profile-recent-1.jpeg" // Using one of the rosary images
            alt="Terço Diário"
            width={400}
            height={200}
            className="w-full object-cover h-40"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-3">
            <h3 className="text-white text-lg font-bold">Terço Diário - Sábado</h3>
            <p className="text-white text-xs">Mistérios Gozosos</p>
          </div>
        </div>
      </section>

      {/* Rezadas Recentemente Section */}
      <section className="mb-4">
        <div className="flex justify-between items-center px-4 mb-2">
          <h2 className="text-lg font-semibold">Rezadas Recentemente</h2>
          <ChevronRight size={20} className="text-gray-500" />
        </div>
        <div className="px-4 overflow-x-auto flex space-x-3 pb-2">
          {[
            { img: "/images/profile-recent-1.jpeg", title: "Terço da Manhã" },
            { img: "/images/profile-recent-2.png", title: "Oração da Noite" },
            { img: "/placeholder.svg?height=100&width=150", title: "Meditação Guiada" },
          ].map((item, index) => (
            <div key={index} className="flex-shrink-0 w-40">
              <Image
                src={item.img || "/placeholder.svg"}
                alt={item.title}
                width={150}
                height={100}
                className="rounded-lg object-cover h-24 w-full shadow"
              />
              <p className="text-sm mt-1 truncate">{item.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
