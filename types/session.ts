export type DifficultyLevel = "A" | "B" | "C"

export interface VocabularyWord {
  id: string
  word: string
  translation: string
  romanization?: string
  article?: string // German article for nouns (e.g. "der" | "die" | "das")
  exampleId?: string

}

export interface QuizQuestion {
  word: VocabularyWord
  options: string[]
  correctAnswer: string
  isArticleQuestion?: boolean
}

export interface SessionData {
  correct: number
  incorrect: number
  total: number
  startTime: number
  endTime?: number
}

export type ScreenState = "start" | "session" | "stats"

export interface AnswerState {
  selected: string | null
  isCorrect: boolean | null
  showResult: boolean
  exampleLoading: boolean
  exampleSentence: string
}
