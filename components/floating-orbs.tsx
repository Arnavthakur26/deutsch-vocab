"use client"

// Lightweight CSS-driven floating orbs. Using CSS transform-only keyframes
// reduces repaint pressure compared to multiple JS animation layers.
export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="orb orb-1"
        style={{
          background:
            "radial-gradient(circle, hsl(220, 40%, 35%) 0%, transparent 70%)",
        }}
      />

      <div
        className="orb orb-2"
        style={{
          background:
            "radial-gradient(circle, hsl(35, 70%, 55%) 0%, transparent 70%)",
        }}
      />
    </div>
  )
}
