"use client"

import { motion } from "framer-motion"

interface DecorativeGlyphProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  type?: "circle" | "square" | "triangle" | "star"
}

export function DecorativeGlyph({ position, type = "circle" }: DecorativeGlyphProps) {
  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  }

  const shapes = {
    circle: (
      <motion.svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <motion.circle
          cx="20"
          cy="20"
          r="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.12"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.circle
          cx="20"
          cy="20"
          r="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.08"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </motion.svg>
    ),
    square: (
      <motion.svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        animate={{ rotate: [0, 5, 0, -5, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <motion.rect
          x="8"
          y="8"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.12"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <rect x="13" y="13" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.08" />
      </motion.svg>
    ),
    triangle: (
      <motion.svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <motion.polygon
          points="20,8 32,32 8,32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.12"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <polygon points="20,14 27,27 13,27" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.08" />
      </motion.svg>
    ),
    star: (
      <motion.svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        animate={{ rotate: [0, 10, 0, -10, 0] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <motion.path
          d="M20 8 L23 17 L32 17 L25 23 L28 32 L20 26 L12 32 L15 23 L8 17 L17 17 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.12"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </motion.svg>
    ),
  }

  return <div className={`absolute ${positionClasses[position]} text-primary pointer-events-none`}>{shapes[type]}</div>
}
