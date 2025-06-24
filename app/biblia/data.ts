import type { BookData, ChaptersPerBook, Translation } from "./types"

export const initialBook = "Gênesis"
export const initialChapter = 1

export const translations: Translation[] = [
  { id: "ave-maria", name: "Ave Maria", shortName: "Ave-M..." },
  { id: "cnbb", name: "CNBB", shortName: "CNBB" },
  // Add other translations as needed
]

export const books: string[] = [
  "Gênesis",
  "Êxodo",
  "Levítico",
  "Números",
  "Deuteronômio",
  "Josué",
  "Juízes",
  "Rute",
  "I Samuel",
  "II Samuel",
  "I Reis",
  "II Reis",
  "I Crônicas",
  "II Crônicas",
  "Esdras",
  "Neemias",
  "Ester",
  "Jó",
  "Salmos",
  "Provérbios",
  "Eclesiastes",
  "Cânticos",
  "Isaías",
  "Jeremias",
  "Lamentações",
  "Ezequiel",
  "Daniel",
  "Oséias",
  "Joel",
  "Amós",
  "Obadias",
  "Jonas",
  "Miquéias",
  "Naum",
  "Habacuque",
  "Sofonias",
  "Ageu",
  "Zacarias",
  "Malaquias",
  // Novo Testamento
  "Mateus",
  "Marcos",
  "Lucas",
  "João",
  "Atos",
  "Romanos",
  "I Coríntios",
  "II Coríntios",
  "Gálatas",
  "Efésios",
  "Filipenses",
  "Colossenses",
  "I Tessalonicenses",
  "II Tessalonicenses",
  "I Timóteo",
  "II Timóteo",
  "Tito",
  "Filemom",
  "Hebreus",
  "Tiago",
  "I Pedro",
  "II Pedro",
  "I João",
  "II João",
  "III João",
  "Judas",
  "Apocalipse",
]

export const chaptersPerBook: ChaptersPerBook = {
  Gênesis: 50,
  Êxodo: 40,
  Levítico: 27,
  Números: 36,
  Deuteronômio: 34,
  Josué: 24,
  Juízes: 21,
  Rute: 4,
  "I Samuel": 31,
  "II Samuel": 24,
  "I Reis": 22,
  "II Reis": 25,
  // ... preencher para todos os livros
  Mateus: 28,
  Marcos: 16,
  Lucas: 24,
  João: 21,
  Apocalipse: 22,
}

export const versesData: BookData = {
  Gênesis: {
    1: [
      { number: 1, text: "No princípio, Deus criou o céu e a terra." },
      {
        number: 2,
        text: "A terra estava sem forma e vazia; as trevas cobriam o abismo e o Espírito de Deus pairava sobre as águas.",
      },
      { number: 3, text: "Deus disse: “Faça-se a luz!”. E a luz foi feita." },
      { number: 4, text: "Deus viu que a luz era boa, e separou a luz das trevas." },
      {
        number: 5,
        text: "Deus chamou à luz Dia, e às trevas Noite. Houve tarde e manhã, o primeiro dia.",
      },
    ],
    2: [
      { number: 1, text: "Assim foram concluídos o céu e a terra, com todo o seu exército." },
      {
        number: 2,
        text: "No sétimo dia, Deus concluiu a obra que fizera; e no sétimo dia descansou de toda a sua obra.",
      },
    ],
  },
  Êxodo: {
    1: [
      {
        number: 1,
        text: "Estes são os nomes dos filhos de Israel que entraram no Egito com Jacó, cada um com sua família:",
      },
      { number: 2, text: "Rúben, Simeão, Levi e Judá;" },
    ],
  },
  // Adicionar mais livros e capítulos conforme necessário
}
