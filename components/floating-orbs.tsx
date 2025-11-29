"use client"

import { motion } from "framer-motion"

export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, hsl(220, 40%, 35%) 0%, transparent 70%)",
        }}
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, hsl(35, 70%, 55%) 0%, transparent 70%)",
        }}
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
