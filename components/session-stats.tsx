"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Target,
  Clock,
  Heart,
  Star,
} from "lucide-react";
import type { SessionData } from "@/types/session";

interface SessionStatsProps {
  sessionData: SessionData;
  onNewSession: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export function SessionStats({ sessionData, onNewSession }: SessionStatsProps) {
  const attemptedQuestions = sessionData.correct + sessionData.incorrect;
  const accuracy =
    attemptedQuestions > 0
      ? Math.round((sessionData.correct / attemptedQuestions) * 100)
      : 0;
  const duration = sessionData.endTime
    ? Math.round((sessionData.endTime - sessionData.startTime) / 1000)
    : 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto px-6 py-12"
    >
      <motion.div
        variants={itemVariants}
        className="text-center mb-12 relative"
      >
        <motion.div
          className="inline-block mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <motion.div
              className="w-20 h-20 rounded-full gold-shine embossed flex items-center justify-center shadow-2xl"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <Trophy className="w-12 h-12 text-primary" />
            </motion.div>

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <Star className="absolute -top-2 -right-2 w-6 h-6 text-secondary fill-secondary" />
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, -360],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <Star className="absolute -bottom-1 -left-1 w-5 h-5 text-secondary fill-secondary" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-br from-primary via-accent to-secondary bg-clip-text text-transparent"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          Session Complete!
        </motion.h1>
        <div className="text-lg text-muted-foreground flex items-center justify-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <Heart className="w-5 h-5 text-error fill-error" />
          </motion.div>
          Great work! Here&apos;s how you did:
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.75 }}
          >
            <Heart className="w-5 h-5 text-error fill-error" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        {/* Large Score Card */}
        <motion.div
          className="col-span-2 row-span-2 relative glass-card texture-overlay rounded-3xl p-8 overflow-hidden active:scale-[0.98] transition-transform"
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-secondary/8" />

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
            <motion.div
              className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-primary to-accent embossed flex items-center justify-center shadow-lg"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <Target className="w-8 h-8 text-white" />
            </motion.div>
            <motion.div
              className="text-6xl font-bold mb-2 bg-gradient-to-br from-primary via-accent to-secondary bg-clip-text text-transparent"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
            >
              {accuracy}%
            </motion.div>
            <p className="text-lg font-semibold mb-1">Accuracy</p>
            <p className="text-sm text-muted-foreground">
              {sessionData.correct} out of {attemptedQuestions} correct
            </p>
          </div>
        </motion.div>

        {/* Correct Count */}
        <motion.div
          className="relative glass-card texture-overlay rounded-3xl p-6 overflow-hidden active:scale-[0.98] transition-transform"
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-success/5" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              className="w-12 h-12 mb-3 rounded-full bg-success/15 embossed flex items-center justify-center shadow-md"
              animate={{
                y: [0, -3, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <CheckCircle2 className="w-6 h-6 text-success" />
            </motion.div>
            <motion.div
              className="text-3xl font-bold mb-1 text-success"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.3,
              }}
            >
              {sessionData.correct}
            </motion.div>
            <p className="text-sm font-medium">Correct</p>
          </div>
        </motion.div>

        {/* Incorrect Count */}
        <motion.div
          className="relative glass-card texture-overlay rounded-3xl p-6 overflow-hidden active:scale-[0.98] transition-transform"
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-error/5" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              className="w-12 h-12 mb-3 rounded-full bg-error/15 embossed flex items-center justify-center shadow-md"
              animate={{
                rotate: [0, -10, 10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <XCircle className="w-6 h-6 text-error" />
            </motion.div>
            <motion.div
              className="text-3xl font-bold mb-1 text-error"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.4,
              }}
            >
              {sessionData.incorrect}
            </motion.div>
            <p className="text-sm font-medium">Incorrect</p>
          </div>
        </motion.div>

        {/* Duration */}
        <motion.div
          className="col-span-2 relative glass-card texture-overlay rounded-3xl p-6 overflow-hidden active:scale-[0.98] transition-transform"
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent embossed flex items-center justify-center flex-shrink-0 shadow-md"
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <Clock className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <motion.div
                className="text-2xl font-bold mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {Math.floor(duration / 60)}:
                {(duration % 60).toString().padStart(2, "0")}
              </motion.div>
              <p className="text-sm text-muted-foreground">Time spent</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.button
        variants={itemVariants}
        onClick={onNewSession}
        className="w-full relative glass-card texture-overlay rounded-3xl p-6 overflow-hidden group embossed active:scale-[0.98] transition-transform"
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-secondary/8 opacity-0 group-active:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10 flex items-center justify-center gap-3">
          <motion.div
            className="w-12 h-12 rounded-full gold-shine embossed flex items-center justify-center shadow-lg"
            animate={{
              y: [0, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <Trophy className="w-6 h-6 text-primary" />
          </motion.div>
          <span className="text-xl font-bold">Start New Session</span>
        </div>
      </motion.button>

      <motion.div variants={itemVariants} className="mt-8 text-center">
        <p className="text-muted-foreground flex items-center justify-center gap-2">
          {accuracy >= 80 ? (
            <>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <Star className="w-5 h-5 text-secondary fill-secondary" />
              </motion.div>
              Excellent work! You&apos;re making amazing progress!
              <motion.div
                animate={{ rotate: [0, -360] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <Star className="w-5 h-5 text-secondary fill-secondary" />
              </motion.div>
            </>
          ) : accuracy >= 60 ? (
            <>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <Heart className="w-5 h-5 text-error fill-error" />
              </motion.div>
              Good job! Keep practicing - you&apos;re doing great!
            </>
          ) : (
            <>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <Heart className="w-5 h-5 text-error fill-error" />
              </motion.div>
              Keep going! Every practice makes you better!
            </>
          )}
        </p>
      </motion.div>
    </motion.div>
  );
}
