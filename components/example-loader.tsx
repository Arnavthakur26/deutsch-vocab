"use client"

import { motion } from "framer-motion"

export function ExampleLoader() {
  return (
    <div className="flex items-center justify-center py-8">
      <motion.div className="relative">
        <motion.svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <motion.path
            d="M10 8 C10 8, 14 6, 24 6 C34 6, 38 8, 38 8 L38 36 C38 36, 34 34, 24 34 C14 34, 10 36, 10 36 Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-primary"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.line
            x1="24"
            y1="6"
            x2="24"
            y2="34"
            stroke="currentColor"
            strokeWidth="2"
            className="text-secondary"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
          />
        </motion.svg>

        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full shadow-lg shadow-primary/50"
            style={{
              top: "50%",
              left: "50%",
            }}
            animate={{
              x: [0, Math.cos((i * 120 * Math.PI) / 180) * 35],
              y: [0, Math.sin((i * 120 * Math.PI) / 180) * 35],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
