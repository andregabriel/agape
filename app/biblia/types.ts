export interface Verse {
  number: number
  text: string
}

export interface Chapter {
  [chapterNumber: number]: Verse[]
}

export interface BookData {
  [bookName: string]: Chapter
}

export interface ChaptersPerBook {
  [bookName: string]: number
}

export interface Translation {
  id: string
  name: string
  shortName: string
}
