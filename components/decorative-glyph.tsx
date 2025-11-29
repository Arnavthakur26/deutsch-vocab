"use client"

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

  // Use a single SVG and CSS-driven rotation/scale. This reduces the number
  // of concurrently-animated elements (fewer JS-driven animation layers).
  const baseSvg = (
    <svg width="40" height="40" viewBox="0 0 40 40" className="glyph-rotate">
      {/* keep inner shapes simple and static; rely on parent transform for motion */}
      {type === "circle" && (
        <>
          <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.12" />
          <circle cx="20" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.08" />
        </>
      )}
      {type === "square" && (
        <>
          <rect x="8" y="8" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.12" />
          <rect x="13" y="13" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.08" />
        </>
      )}
      {type === "triangle" && (
        <>
          <polygon points="20,8 32,32 8,32" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.12" />
          <polygon points="20,14 27,27 13,27" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.08" />
        </>
      )}
      {type === "star" && (
        <path d="M20 8 L23 17 L32 17 L25 23 L28 32 L20 26 L12 32 L15 23 L8 17 L17 17 Z" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.12" />
      )}
    </svg>
  )

  return <div className={`absolute ${positionClasses[position]} text-primary pointer-events-none`}>{baseSvg}</div>
}
