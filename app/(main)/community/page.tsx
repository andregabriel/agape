import Image from "next/image"
import { ChevronDown, Users, Search, Plus, Check, X } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="bg-gray-50 min-h-full">
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-white border-b">
        <button className="flex items-center">
          <h1 className="text-2xl font-bold">Amigos</h1>
          <ChevronDown size={20} className="ml-1" />
        </button>
        <div className="flex items-center space-x-3">
          <button className="p-1">
            <Users size={24} />
          </button>
          <button className="p-1">
            <Search size={24} />
          </button>
        </div>
      </header>

      {/* Top Actions */}
      <section className="p-4 bg-white flex justify-around items-start text-center">
        <div className="flex flex-col items-center w-1/3">
          <button className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center mb-1">
            <Plus size={32} className="text-gray-700" />
          </button>
          <span className="text-xs font-medium">Nova Intenção</span>
        </div>
        <div className="flex flex-col items-center w-1/3">
          <div className="bg-purple-200 border-2 border-purple-500 rounded-full w-16 h-16 flex items-center justify-center mb-1">
            <Image src="/placeholder.svg?height=40&width=40" alt="Hallow" width={40} height={40} />
          </div>
          <span className="text-xs font-medium">Hallow</span>
        </div>
        <div className="flex flex-col items-center w-1/3">
          <Image
            src="/placeholder.svg?height=64&width=64"
            alt="Suas Intenções Eu"
            width={64}
            height={64}
            className="rounded-full mb-1"
          />
          <span className="text-xs font-medium">Suas Intenções</span>
          <span className="text-xs text-gray-500">Eu</span>
        </div>
      </section>

      {/* Começar Section */}
      <section className="p-4 mt-2">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold">Começar</h2>
          <span className="text-sm text-gray-500">2 of 3 complete</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-purple-100 p-6 rounded-xl shadow-lg text-center relative overflow-hidden h-48 flex flex-col justify-between items-center">
            <div className="absolute -bottom-8 -left-8 opacity-30">
              <Image src="/images/community-profile-placeholder.png" alt="" width={120} height={120} />
            </div>
            <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center self-start mb-2">
              <Check size={16} />
            </div>
            <p className="font-semibold text-purple-800 mt-auto">Complete Seu Perfil</p>
          </div>
          <div className="bg-blue-300 p-6 rounded-xl shadow-lg text-center relative overflow-hidden h-48 flex flex-col justify-between items-center">
            <div className="absolute -bottom-4 -right-4 opacity-50">
              <Image src="/images/community-add-friends-placeholder.png" alt="" width={100} height={100} />
            </div>
            <p className="font-semibold text-blue-900 mt-auto">Find & Add Friends</p>
          </div>
        </div>
      </section>

      {/* Partially visible card */}
      <section className="p-4">
        <div className="bg-white p-4 rounded-xl shadow-lg flex items-center space-x-4 relative">
          <Image src="/images/virgin-mary-community.jpeg" alt="St. Ann" width={80} height={80} className="rounded-lg" />
          <div>
            <h3 className="font-semibold">St. Ann está pronto para...</h3>
            <p className="text-sm text-gray-500">Convidado por Hallow</p>
          </div>
          <button className="absolute top-3 right-3 text-gray-500">
            <X size={20} />
          </button>
        </div>
      </section>
    </div>
  )
}
