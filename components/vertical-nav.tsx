"use client"

import { ChevronUp, ChevronDown } from "lucide-react"

interface VerticalNavProps {
  currentCardIndex: number
  totalCards: number
  onPrev: () => void
  onNext: () => void
  isNextDisabled?: boolean
}

export function VerticalNav({
  currentCardIndex,
  totalCards,
  onPrev,
  onNext,
  isNextDisabled = false,
}: VerticalNavProps) {
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 flex flex-col gap-2">
      <button
        onClick={onPrev}
        disabled={currentCardIndex === 0}
        className={`rounded-full p-2 transition-all ${
          currentCardIndex === 0
            ? "opacity-30 cursor-not-allowed"
            : "opacity-80 hover:opacity-100 bg-slate-700/50 hover:bg-slate-700/80"
        }`}
      >
        <ChevronUp className="h-4 w-4" />
      </button>

      <div className="flex flex-col items-center gap-1.5">
        {Array.from({ length: totalCards }).map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all ${
              i === currentCardIndex ? "w-2 h-2 bg-white" : "w-1.5 h-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className={`rounded-full p-2 transition-all ${
          isNextDisabled
            ? "opacity-30 cursor-not-allowed"
            : "opacity-80 hover:opacity-100 bg-slate-700/50 hover:bg-slate-700/80"
        }`}
      >
        <ChevronDown className="h-4 w-4" />
      </button>
    </div>
  )
} 