import { ChevronDown } from "lucide-react"

const verses = [
  { number: 1, text: "No princípio, Deus criou o céu e a terra." },
  {
    number: 2,
    text: "A terra estava sem forma e vazia; as trevas cobriam o abismo e o Espírito de Deus pairava sobre as águas.",
  },
  { number: 3, text: "Deus disse: “Faça-se a luz!”. E a luz foi feita." },
  { number: 4, text: "Deus viu que a luz era boa, e separou a luz das trevas." },
]

export default function BiblePage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-gray-200">
        <button className="flex items-center">
          <h1 className="text-2xl font-bold">Gênesis</h1>
          <ChevronDown size={20} className="ml-1" />
        </button>
        <span className="text-2xl font-bold text-gray-700">1</span>
      </header>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-center my-6 underline decoration-2 underline-offset-4">Gênesis 1</h2>
        <div className="space-y-6">
          {verses.map((verse) => (
            <div key={verse.number} className="flex">
              <span className="text-sm text-gray-500 w-6 pt-1">{verse.number}</span>
              <p className="text-lg leading-relaxed">{verse.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
