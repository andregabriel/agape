import type { AudioTrack } from "@/types"
import AudioThumbnail from "./audio-thumbnail"

const corpusChristiItems: AudioTrack[] = [
  {
    id: "santo-ambrosio",
    title: "Santo Ambrósio de Milão",
    subCategory: "Homilias Pai, Corpus Christi",
    duration: "7-15 min",
    imageUrl: "/placeholder.svg?width=160&height=160",
    type: "audio",
  },
  {
    id: "amor-de-deus",
    title: "Amor de Deus na Euc...",
    subCategory: "Livro II, Capítulo 2",
    duration: "8-11 min",
    imageUrl: "/placeholder.svg?width=160&height=160",
    type: "audio",
  },
  {
    id: "comunhao-espiritual-pio",
    title: "Comunhão Espiritual",
    subCategory: "Padre Pio em italiano",
    duration: "1 min",
    imageUrl: "/placeholder.svg?width=160&height=160",
    type: "audio",
  },
  {
    id: "hora-santa-1",
    title: "Hora Santa",
    subCategory: "Uma hora com Jesus",
    type: "playlist",
    itemCount: 7,
    imageUrl: "/placeholder.svg?width=160&height=160",
  },
  {
    id: "comunhao-espiritual-alma",
    title: "Comunhão Espiritual",
    subCategory: "Minha alma suspira por Vós",
    duration: "1 min",
    imageUrl: "/placeholder.svg?width=160&height=160",
    type: "audio",
  },
  {
    id: "inacio-a-comunhao",
    title: "Inácio: A Comunhão",
    subCategory: "Dia 10: Prof. Felipe Aquino",
    duration: "9-11 min",
    imageUrl: "/placeholder.svg?width=160&height=160",
    type: "audio",
  },
  {
    id: "hora-santa-2",
    title: "Hora Santa",
    subCategory: "Para Oração Silenciosa",
    type: "playlist",
    itemCount: 11,
    imageUrl: "/placeholder.svg?width=160&height=160",
  },
]

export default async function CorpusChristiSection() {
  const items = corpusChristiItems

  return (
    <section className="py-6 md:py-8">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Corpus Christi</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 scrollbar-thin scrollbar-thumb-muted-foreground/50 scrollbar-track-transparent">
          {items.map((item) => (
            <AudioThumbnail key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
