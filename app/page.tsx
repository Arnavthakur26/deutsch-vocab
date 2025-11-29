"use client";

import { useState } from "react";
import { SessionStart } from "@/components/session-start";
import { VocabularyCard } from "@/components/vocabulary-card";
import { SessionStats } from "@/components/session-stats";
import { ThemeToggle } from "@/components/theme-toggle";
import { FloatingOrbs } from "@/components/floating-orbs";
import type {
  DifficultyLevel,
  ScreenState,
  SessionData,
  QuizQuestion,
} from "@/types/session";
import type { Word } from "@/lib/vocabulary-data";
import { loadVocabulary, generateQuizQuestion } from "@/lib/vocabulary-data";

export default function Home() {
  const [screenState, setScreenState] = useState<ScreenState>("start");
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel>("A");

  // wordsPool holds all available words for the selected level.
  // We'll generate one QuizQuestion on demand from this pool each time the user clicks Next.
  const [wordsPool, setWordsPool] = useState<Word[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(
    null
  );
  const [sessionData, setSessionData] = useState<SessionData>({
    correct: 0,
    incorrect: 0,
    total: 0,
    startTime: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Start session: load vocabulary at runtime, then build questions
  const startSession = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const vocabByLevel = await loadVocabulary(); // returns Record<"A"|"B"|"C", Word[]> or Word[] depending on your loader implementation
      // If your loadVocabulary returns a flattened array (Word[]), adapt accordingly.
      // This code expects an object grouped by level: { A: Word[], B: Word[], C: Word[] }
      const wordsForLevel: Word[] = Array.isArray(vocabByLevel)
        ? // If loader returns flattened array, filter by level
          (vocabByLevel as Word[]).filter((w) => w.level === selectedLevel)
        : // If loader returns grouped object, pick the array
          (vocabByLevel as Record<string, Word[]>)[selectedLevel] || [];

      if (!wordsForLevel || wordsForLevel.length === 0) {
        console.error(`No words found for level ${selectedLevel}`);
        alert(
          `No words found for level ${selectedLevel}. Check your vocabulary file.`
        );
        setIsLoading(false);
        return;
      }

      // Set the pool of words for this session and generate the first question.
      setWordsPool(wordsForLevel);

      // Pick a random word from the pool
      const firstWord =
        wordsForLevel[Math.floor(Math.random() * wordsForLevel.length)];
      const firstQuestion = generateQuizQuestion(firstWord, wordsForLevel);

      setCurrentQuestion(firstQuestion);
      setSessionData({
        correct: 0,
        incorrect: 0,
        total: 1,
        startTime: Date.now(),
      });
      setScreenState("session");
    } catch (err) {
      console.error("Failed to load vocabulary or generate session:", err);
      alert("Failed to start session. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    setSessionData((prev: SessionData) => ({
      ...prev,
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
    }));
  };

  const handleNext = () => {
    // Generate a fresh question from the pool and increment total.
    if (!wordsPool || wordsPool.length === 0) {
      // No pool available — end the session.
      endSession();
      return;
    }

    const nextWord = wordsPool[Math.floor(Math.random() * wordsPool.length)];
    const nextQuestion = generateQuizQuestion(nextWord, wordsPool);
    setCurrentQuestion(nextQuestion);
    setSessionData((prev: SessionData) => ({ ...prev, total: prev.total + 1 }));
  };

  const endSession = () => {
    setSessionData((prev: SessionData) => ({
      ...prev,
      endTime: Date.now(),
    }));
    setScreenState("stats");
  };

  const startNewSession = () => {
    setScreenState("start");
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Floating Orbs Background */}
      <FloatingOrbs />

      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-8">
        {screenState === "start" && (
          <SessionStart
            onStartSession={startSession}
            selectedLevel={selectedLevel}
            onLevelChange={setSelectedLevel}
            // If SessionStart supports disabled prop you can pass isLoading to disable the start button
          />
        )}

        {screenState === "session" && currentQuestion && (
          <VocabularyCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onEndSession={endSession}
            currentQuestion={sessionData.total}
            totalQuestions={sessionData.total}
          />
        )}

        {screenState === "stats" && (
          <SessionStats
            sessionData={sessionData}
            onNewSession={startNewSession}
          />
        )}
      </div>
    </main>
  );
}
