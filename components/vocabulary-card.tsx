"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, XCircle, Heart, Star } from "lucide-react";
import type { QuizQuestion, AnswerState } from "@/types/session";
import { getExampleSentenceAsync } from "@/lib/vocabulary-data";
import { ExampleLoader } from "./example-loader";
import { DecorativeGlyph } from "./decorative-glyph";

interface VocabularyCardProps {
  question: QuizQuestion;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
  onEndSession: () => void;
  currentQuestion: number;
  totalQuestions: number;
}

interface ExtendedAnswerState extends AnswerState {
  selectedArticle: string | null;
  articleCorrect: boolean | null;
}

export function VocabularyCard({
  question,
  onAnswer,
  onNext,
  onEndSession,
  currentQuestion,
  totalQuestions,
}: VocabularyCardProps) {
  const [answerState, setAnswerState] = useState<ExtendedAnswerState>({
    selected: null,
    selectedArticle: null,
    isCorrect: null,
    articleCorrect: null,
    showResult: false,
    exampleLoading: false,
    exampleSentence: "",
  });

  // Treat only a truthy `article` as meaning an article is present.
  // This avoids showing article buttons for empty string / null values.
  const hasArticle = Boolean(question.word.article);

  useEffect(() => {
    setAnswerState({
      selected: null,
      selectedArticle: null,
      isCorrect: null,
      articleCorrect: null,
      showResult: false,
      exampleLoading: false,
      exampleSentence: "",
    });
  }, [question]);

  const handleArticleClick = (article: string) => {
    if (answerState.showResult) return;
    setAnswerState((prev) => ({ ...prev, selectedArticle: article }));
  };

  const handleOptionClick = (option: string) => {
    if (answerState.selected) return;

    // Check if article is required but not selected
    if (hasArticle && !answerState.selectedArticle) {
      // Animate the article buttons to draw attention
      return;
    }

    const translationCorrect = option === question.correctAnswer;
    const articleCorrect = hasArticle
      ? answerState.selectedArticle === question.word.article
      : true;
    const bothCorrect = translationCorrect && articleCorrect;

    setAnswerState({
      selected: option,
      selectedArticle: answerState.selectedArticle,
      isCorrect: bothCorrect,
      articleCorrect: articleCorrect,
      showResult: true,
      exampleLoading: true,
      exampleSentence: "",
    });

    onAnswer(bothCorrect);

    // Load example sentence (async). If examples aren't loaded this will fetch them.
    setTimeout(async () => {
      const example = await getExampleSentenceAsync(
        question.word.exampleId,
        question.word.translation,
        question.word.word
      );
      setAnswerState((prev) => ({
        ...prev,
        exampleLoading: false,
        exampleSentence: example,
      }));
    }, 1);
  };

  const getOptionClassName = (option: string) => {
    const baseClasses =
      "relative p-4 rounded-2xl text-left font-medium transition-all transform-gpu overflow-hidden";

    if (!answerState.selected) {
      return `${baseClasses} glass-card texture-overlay cursor-pointer active:scale-[0.98]`;
    }

    if (option === question.correctAnswer && answerState.isCorrect) {
      return `${baseClasses} bg-success/20 border-2 border-success embossed`;
    }

    if (option === question.correctAnswer) {
      return `${baseClasses} bg-success/10 border-2 border-success/50 embossed`;
    }

    if (option === answerState.selected && !answerState.isCorrect) {
      return `${baseClasses} bg-error/20 border-2 border-error`;
    }

    return `${baseClasses} glass-card opacity-50`;
  };

  const getArticleClassName = (article: string) => {
    const baseClasses =
      "px-6 py-3 rounded-xl font-bold text-lg transition-all transform-gpu";
    const colorClass =
      article === "der"
        ? "text-blue-500"
        : article === "die"
        ? "text-rose-500"
        : "text-amber-500";

    if (!answerState.showResult) {
      const isSelected = answerState.selectedArticle === article;
      return `${baseClasses} ${colorClass} glass-card embossed cursor-pointer active:scale-95 ${
        isSelected
          ? "!bg-primary/20 ring-4 ring-primary scale-110 shadow-lg shadow-primary/50"
          : "hover:scale-105"
      }`;
    }

    // After answer is shown
    if (article === question.word.article) {
      return `${baseClasses} ${colorClass} bg-success/20 border-2 border-success embossed`;
    }

    if (
      article === answerState.selectedArticle &&
      !answerState.articleCorrect
    ) {
      return `${baseClasses} ${colorClass} bg-error/20 border-2 border-error`;
    }

    return `${baseClasses} ${colorClass} glass-card opacity-50`;
  };

  const getArticleColor = (article: string) => {
    switch (article) {
      case "der":
        return "text-blue-500";
      case "die":
        return "text-rose-500";
      case "das":
        return "text-amber-500";
      default:
        return "text-foreground";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <motion.div
          className="text-lg font-semibold px-5 py-2.5 glass-card embossed rounded-full"
          key={currentQuestion}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-primary">{currentQuestion}</span>
          <span className="text-muted-foreground mx-1">/</span>
          <span className="text-muted-foreground">{totalQuestions}</span>
        </motion.div>

        <motion.button
          onClick={onEndSession}
          className="px-4 py-2 glass-card embossed rounded-full text-sm font-medium active:bg-error/10 active:text-error transition-colors active:scale-95"
          whileTap={{ scale: 0.95 }}
        >
          End Session
        </motion.button>
      </div>

      <motion.div
        className="relative glass-card texture-overlay rounded-3xl p-8 md:p-12 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <DecorativeGlyph position="top-left" type="star" />
        <DecorativeGlyph position="top-right" type="circle" />
        <DecorativeGlyph position="bottom-left" type="square" />
        <DecorativeGlyph position="bottom-right" type="star" />

        <div className="text-center mb-12">
          <motion.p
            className="text-sm font-medium text-muted-foreground mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {hasArticle
              ? "Select the article, then translate to English:"
              : "Translate to English:"}
          </motion.p>

          <motion.h2
            className="text-5xl md:text-6xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, y: [0, -2, 0] }}
            transition={{
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
              y: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
          >
            {question.word.word}
          </motion.h2>
          {question.word.romanization && (
            <motion.p
              className="text-sm text-muted-foreground mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {question.word.romanization}
            </motion.p>
          )}

          {hasArticle && (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <motion.p
                className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2"
                animate={
                  !answerState.selectedArticle && answerState.selected === null
                    ? { scale: [1, 1.05, 1] }
                    : {}
                }
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <Star className="w-4 h-4" />
                First, select the article:
              </motion.p>
              <div className="flex items-center justify-center gap-4">
                {["der", "die", "das"].map((article, index) => (
                  <motion.button
                    key={article}
                    onClick={() => handleArticleClick(article)}
                    className={getArticleClassName(article)}
                    disabled={answerState.showResult}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.2 }}
                    whileTap={!answerState.showResult ? { scale: 0.95 } : {}}
                  >
                    {article}
                    {answerState.selectedArticle === article &&
                      !answerState.showResult && (
                        <motion.div
                          // keep the icon centered as it scales/rotates to avoid "orbiting"
                          className="absolute -top-1 -right-1 origin-center"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                          }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </motion.div>
                      )}
                    {answerState.showResult &&
                      article === question.word.article && (
                        <motion.div
                          className="absolute -top-1 -right-1 origin-center"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                          }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        </motion.div>
                      )}
                    {article === answerState.selectedArticle &&
                      !answerState.articleCorrect &&
                      answerState.showResult && (
                        <motion.div
                          className="absolute -top-1 -right-1 origin-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.3 }}
                        >
                          <XCircle className="w-5 h-5 text-error" />
                        </motion.div>
                      )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <motion.div
          className="grid gap-4 mb-8 grid-cols-1 md:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.3 }}
        >
          {question.options.map((option, index) => (
            <motion.button
              key={option}
              onClick={() => handleOptionClick(option)}
              className={getOptionClassName(option)}
              disabled={answerState.selected !== null}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05, duration: 0.2 }}
              whileTap={!answerState.selected ? { scale: 0.96 } : {}}
            >
              <span className="relative z-10">{option}</span>

              {answerState.selected &&
                option === question.correctAnswer &&
                answerState.isCorrect && (
                  <motion.div
                    // Make the wrapper absolutely positioned and center the transform origin
                    className="absolute right-4 top-1/2 -translate-y-1/2 origin-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  </motion.div>
                )}
              {option === answerState.selected && !answerState.isCorrect && (
                <motion.div
                  className="absolute right-4 top-1/2 -translate-y-1/2 origin-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  <XCircle className="w-6 h-6 text-error" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Result Section */}
        <AnimatePresence>
          {answerState.showResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-border pt-6"
            >
              <motion.div
                className={`flex items-center gap-3 p-4 rounded-2xl mb-6 embossed ${
                  answerState.isCorrect
                    ? "bg-success/10 border border-success/20"
                    : "bg-error/10 border border-error/20"
                }`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {answerState.isCorrect ? (
                  <>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <Star className="w-6 h-6 text-success fill-success" />
                    </motion.div>
                    <span className="font-semibold text-success">
                      {hasArticle
                        ? "Perfect! You got both right!"
                        : "Perfect! That's correct!"}
                    </span>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: 2 }}
                      className="ml-auto"
                    >
                      <Heart className="w-5 h-5 text-success fill-success" />
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Heart className="w-6 h-6 text-error" />
                    </motion.div>
                    <span className="font-semibold text-error">
                      {hasArticle &&
                      !answerState.articleCorrect &&
                      answerState.selected === question.correctAnswer
                        ? "Wrong article! Keep practicing!"
                        : hasArticle &&
                          answerState.articleCorrect &&
                          answerState.selected !== question.correctAnswer
                        ? "Wrong word! But article was right!"
                        : "Keep trying! You're learning!"}
                    </span>
                  </>
                )}
              </motion.div>

              <motion.div
                className="mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <p className="text-sm text-muted-foreground mb-2">
                  Correct Answer:
                </p>
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    {hasArticle && (
                      <motion.span
                        className={`text-2xl font-bold ${getArticleColor(
                          question.word.article!
                        )}`}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5 }}
                      >
                        {question.word.article}
                      </motion.span>
                    )}
                    <span className="text-2xl font-bold">
                      {question.word.word}
                    </span>
                  </div>
                  <p className="text-lg text-muted-foreground">
                    = {question.correctAnswer}
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                <p className="text-sm text-muted-foreground mb-2">Example:</p>
                {answerState.exampleLoading ? (
                  <ExampleLoader />
                ) : (
                  <motion.p
                    className="text-base leading-relaxed italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {answerState.exampleSentence}
                  </motion.p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {answerState.showResult && !answerState.exampleLoading && (
          <motion.button
            onClick={onNext}
            className="fixed bottom-8 right-8 w-14 h-14 rounded-full gold-shine embossed text-primary shadow-2xl transition-all z-50 flex items-center justify-center active:scale-95"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <ArrowRight className="w-6 h-6" />
            </motion.div>

            {/* Pulse ring for attention on mobile */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeOut",
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
