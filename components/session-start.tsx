"use client";

import { motion } from "framer-motion";
import { BookOpen, Brain, Trophy, Zap, Star } from "lucide-react";
import type { DifficultyLevel } from "@/types/session";
import { LevelSelector } from "./level-selector";
import { DecorativeGlyph } from "./decorative-glyph";

interface SessionStartProps {
  onStartSession: () => void;
  selectedLevel: DifficultyLevel;
  onLevelChange: (level: DifficultyLevel) => void;
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

export function SessionStart({
  onStartSession,
  selectedLevel,
  onLevelChange,
}: SessionStartProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto px-6 py-12"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants} className="text-center mb-12">
        <motion.h1
          className="text-6xl md:text-7xl font-bold mb-4 tracking-tight bg-gradient-to-br from-primary via-accent to-secondary bg-clip-text text-transparent"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Deutsch Lernen
        </motion.h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Master German vocabulary with engaging practice sessions. Choose your
          level and start learning!
        </p>
      </motion.div>

      {/* Level Selector */}
      <motion.div variants={itemVariants} className="mb-8">
        <LevelSelector
          selectedLevel={selectedLevel}
          onLevelChange={onLevelChange}
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <motion.button
          onClick={onStartSession}
          className="col-span-2 md:col-span-2 row-span-2 relative glass-card texture-overlay rounded-3xl p-8 overflow-hidden group active:scale-[0.98] transition-transform"
          whileTap={{ scale: 0.98 }}
        >
          <DecorativeGlyph position="top-left" type="star" />
          <DecorativeGlyph position="bottom-right" type="circle" />

          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-active:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <motion.div
              className="w-16 h-16 mb-4 rounded-full gold-shine embossed flex items-center justify-center shadow-lg"
              whileTap={{ scale: 0.9, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <Zap className="w-8 h-8 text-primary" />
              </motion.div>
            </motion.div>
            <h2 className="text-3xl font-bold mb-2">Start Session</h2>
            <p className="text-sm text-muted-foreground">Begin your practice</p>
          </div>
        </motion.button>

        <motion.div
          className="relative glass-card texture-overlay rounded-3xl p-6 overflow-hidden active:scale-[0.98] transition-transform"
          whileTap={{ scale: 0.98 }}
        >
          <DecorativeGlyph position="top-right" type="triangle" />
          <div className="flex flex-col items-center text-center">
            <motion.div
              className="w-12 h-12 mb-3 rounded-full bg-primary/10 embossed flex items-center justify-center"
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <BookOpen className="w-6 h-6 text-primary" />
            </motion.div>
            <h3 className="font-semibold mb-1 text-sm">20 Words</h3>
            <p className="text-xs text-muted-foreground">Per level</p>
          </div>
        </motion.div>

        <motion.div
          className="relative glass-card texture-overlay rounded-3xl p-6 overflow-hidden active:scale-[0.98] transition-transform"
          whileTap={{ scale: 0.98 }}
        >
          <DecorativeGlyph position="top-left" type="square" />
          <div className="flex flex-col items-center text-center">
            <motion.div
              className="w-12 h-12 mb-3 rounded-full bg-accent/10 embossed flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <Brain className="w-6 h-6 text-accent" />
            </motion.div>
            <h3 className="font-semibold mb-1 text-sm">Smart Quiz</h3>
            <p className="text-xs text-muted-foreground">Interactive</p>
          </div>
        </motion.div>

        <motion.div
          className="col-span-2 relative glass-card texture-overlay rounded-3xl p-6 overflow-hidden active:scale-[0.98] transition-transform"
          whileTap={{ scale: 0.98 }}
        >
          <DecorativeGlyph position="bottom-left" type="star" />
          <div className="flex items-center gap-4">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-success to-accent embossed flex items-center justify-center flex-shrink-0 shadow-md"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <Trophy className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="font-semibold mb-1">Track Progress</h3>
              <p className="text-xs text-muted-foreground">
                See detailed statistics after each session
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="relative glass-card texture-overlay rounded-3xl p-6 text-center"
      >
        <DecorativeGlyph position="top-right" type="star" />
        <div className="flex items-center justify-center gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <Star className="w-5 h-5 text-secondary fill-secondary" />
          </motion.div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>Daily practice</strong> helps with retention. You&apos;ve
            got this!
          </p>
          <motion.div
            animate={{ rotate: [0, -360] }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <Star className="w-5 h-5 text-secondary fill-secondary" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
