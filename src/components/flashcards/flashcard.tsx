"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Flashcard as FlashcardType } from "@prisma/client";

interface FlashcardProps {
  card: FlashcardType;
  onRate: (quality: number) => void;
}

const QUALITY_LABELS = [
  { value: 0, label: "0 - Blackout", className: "bg-red-900 hover:bg-red-800" },
  { value: 1, label: "1 - Wrong", className: "bg-red-800 hover:bg-red-700" },
  { value: 2, label: "2 - Familiar", className: "bg-orange-900 hover:bg-orange-800" },
  { value: 3, label: "3 - Hard", className: "bg-yellow-900 hover:bg-yellow-800" },
  { value: 4, label: "4 - Good", className: "bg-green-900 hover:bg-green-800" },
  { value: 5, label: "5 - Perfect", className: "bg-green-700 hover:bg-green-600" },
];

export function Flashcard({ card, onRate }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="space-y-4">
      {/* Card */}
      <div
        className="perspective-1000 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
        onKeyDown={(e) => e.key === "Enter" || e.key === " " ? setIsFlipped(!isFlipped) : undefined}
        role="button"
        tabIndex={0}
        aria-pressed={isFlipped}
        aria-label={isFlipped ? "Card answer (click to flip back)" : "Card question (click to reveal answer)"}
      >
        <motion.div
          className="relative h-48 w-full"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-xl border bg-card p-6 text-center backface-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div>
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                Question
              </p>
              <p className="text-lg font-medium">{card.front}</p>
              <p className="text-xs text-muted-foreground mt-4">
                Click to reveal answer
              </p>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-xl border bg-card p-6 text-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div>
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                Answer
              </p>
              <p className="text-lg font-medium">{card.back}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quality buttons (only show when flipped) */}
      {isFlipped && (
        <div>
          <p className="text-xs text-muted-foreground text-center mb-3">
            How well did you recall this?
          </p>
          <div className="grid grid-cols-3 gap-2">
            {QUALITY_LABELS.map((q) => (
              <Button
                key={q.value}
                size="sm"
                className={q.className}
                onClick={() => {
                  onRate(q.value);
                  setIsFlipped(false);
                }}
                aria-label={`Rate recall quality: ${q.label}`}
              >
                {q.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
