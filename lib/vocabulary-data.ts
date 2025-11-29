// quizData.ts
// Fetches vocabulary and examples from external JSON files, provides typed helpers
// Usage:
//   await loadAllData(); // once on app init (optional — lazy-loading also works)
//   const allWords = await loadVocabulary();
//   const q = generateQuizQuestion(targetWord, allWords);
//   const example = getExampleSentence(q.word.exampleId, q.word.translation, q.word.word);
// Or use getExampleSentenceAsync which will load examples automatically if not loaded.

export interface Word {
  id: string;
  word: string;
  translation: string;
  romanization?: string;
  article?: string;
  plural?: string;
  level?: string;
  exampleId?: string;
  // ... add other fields if present in your JSON
}

/** The shape of the JSON vocabulary file:
 *  { "A": [Word, ...], "B": [...], "C": [...] }
 */
export type VocabularyFile = Record<string, Word[]>;

export type ExamplesMap = Record<string, string>;

export interface QuizQuestion {
  word: Word;
  options: string[]; // shuffled options (includes correct)
  correctAnswer: string;
  isArticleQuestion: boolean;
}

let VOCAB_CACHE: Word[] | null = null;
let EXAMPLES_CACHE: ExamplesMap | null = null;

/**
 * Helper: generic JSON fetch with error handling.
 * Change/remove basePath if your JSON files are elsewhere.
 */
async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(path, { cache: "no-cache" });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.status} ${res.statusText}`);
  }
  const json = (await res.json()) as T;
  return json;
}

/**
 * Load vocabulary JSON and return flattened array of words.
 * Default path assumes the JSON is served at /data/vocabulary.json (adjust as needed).
 */
export async function loadVocabulary(path = "./vocabulary.json"): Promise<Word[]> {
  if (VOCAB_CACHE) return VOCAB_CACHE;

  const raw = await fetchJSON<VocabularyFile>(path);
  // Flatten object values into a single array and normalize keys.
  // Some vocabulary files use `exampleID` (capital D) while our code expects `exampleId`.
  type RawWord = Partial<Word> & { exampleID?: string };
  const flat = Object.values(raw).flat() as RawWord[];
  VOCAB_CACHE = flat.map((w) => ({
    // Spread the raw object and coerce to Word; keep exampleId normalized
    ...(w as Word),
    exampleId: w.exampleId ?? w.exampleID ?? undefined,
  }));
  return VOCAB_CACHE;
}

/**
 * Load examples JSON and return as map { id: sentence }
 * Default path assumes /data/examples.json
 */
export async function loadExamples(path = "./examples.json"): Promise<ExamplesMap> {
  if (EXAMPLES_CACHE) return EXAMPLES_CACHE;

  const raw = await fetchJSON<ExamplesMap>(path);
  EXAMPLES_CACHE = raw;
  return EXAMPLES_CACHE;
}

/**
 * Convenience: load both vocabulary & examples.
 */
export async function loadAllData(
  vocabPath = "./vocabulary.json",
  examplesPath = "./examples.json"
): Promise<{ words: Word[]; examples: ExamplesMap }> {
  const [words, examples] = await Promise.all([loadVocabulary(vocabPath), loadExamples(examplesPath)]);
  return { words, examples };
}

/**
 * generateQuizQuestion (synchronous).
 * - `word` should be a Word present in `allWords`.
 * - `allWords` is an array of Word objects (e.g. from loadVocabulary()).
 */
export function generateQuizQuestion(word: Word, allWords: Word[]): QuizQuestion {
  const correctAnswer = word.translation;
  // filter out the exact same translation (so duplicates of same translation removed)
  const otherWords = allWords.filter((w) => w.translation !== correctAnswer);

  // Shuffle otherWords with Fisher-Yates for better randomness
  const shuffledOthers = shuffleArray(otherWords.slice());

  // Pick up to 3 wrong answers
  const wrongAnswers = shuffledOthers.slice(0, 3).map((w) => w.translation);

  // Combine & shuffle options
  const options = shuffleArray([correctAnswer, ...wrongAnswers]);

  return {
    word,
    options,
    correctAnswer,
    isArticleQuestion: false,
  };
}

/**
 * getExampleSentence (synchronous, uses cached examples).
 * If examples are not yet loaded, returns fallback template.
 * Use getExampleSentenceAsync if you want automatic loading.
 */
export function getExampleSentence(id: string | undefined, translation: string, wordText: string): string {
  if (id && EXAMPLES_CACHE && EXAMPLES_CACHE[id]) {
    return EXAMPLES_CACHE[id];
  }

  // Fallback message if example not found / not loaded
  return `"${wordText}" bedeutet "${translation}" auf Englisch. ("${wordText}" means "${translation}" in English.)`;
}

/**
 * Async version: will load examples if not present in cache.
 */
export async function getExampleSentenceAsync(
  id: string | undefined,
  translation: string,
  wordText: string,
  examplesPath = "/examples.json"
): Promise<string> {
  if (id) {
    if (!EXAMPLES_CACHE) {
      try {
        await loadExamples(examplesPath);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // if load fails, return fallback
        return `"${wordText}" bedeutet "${translation}" auf Englisch. ("${wordText}" means "${translation}" in English.)`;
      }
    }
    if (EXAMPLES_CACHE && EXAMPLES_CACHE[id]) {
      return EXAMPLES_CACHE[id];
    }
  }

  return `"${wordText}" bedeutet "${translation}" auf Englisch. ("${wordText}" means "${translation}" in English.)`;
}

/* ---------------------------
   Utility: Fisher-Yates shuffle
   --------------------------- */
function shuffleArray<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

/* ---------------------------
   Optional: functions to clear caches (helpful for HMR in dev)
   --------------------------- */
export function clearCaches() {
  VOCAB_CACHE = null;
  EXAMPLES_CACHE = null;
}
