export interface Verse {
  number: number
  text: string
}

// Poderíamos expandir isso no futuro
export interface Chapter {
  number: number
  verses: Verse[]
}

export interface Book {
  name: string
  chapters: Chapter[]
}
