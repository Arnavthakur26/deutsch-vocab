"use client"

import type { DifficultyLevel } from "@/types/session"
import { motion } from "framer-motion"

interface LevelSelectorProps {
  selectedLevel: DifficultyLevel
  onLevelChange: (level: DifficultyLevel) => void
}

const levels: { value: DifficultyLevel; label: string; description: string }[] = [
  { value: "A", label: "A (A1-A2)", description: "Beginner" },
  { value: "B", label: "B (B1-B2)", description: "Intermediate" },
  { value: "C", label: "C (C1-C2)", description: "Advanced" },
]

export function LevelSelector({ selectedLevel, onLevelChange }: LevelSelectorProps) {
  return (
    <div className="flex gap-2 p-2 glass-card embossed texture-overlay rounded-3xl w-fit mx-auto">
      {levels.map((level) => (
        <motion.button
          key={level.value}
          onClick={() => onLevelChange(level.value)}
          className={`relative px-6 py-3 rounded-2xl font-medium transition-all ${
            selectedLevel === level.value ? "text-white" : "text-foreground hover:text-primary"
          }`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {selectedLevel === level.value && (
            <motion.div
              layoutId="activeLevel"
              className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl embossed shadow-lg"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10 text-sm">{level.label}</span>
        </motion.button>
      ))}
    </div>
  )
}
