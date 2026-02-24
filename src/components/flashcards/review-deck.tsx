"use client";

import { useState } from "react";
import { Flashcard } from "./flashcard";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Flashcard as FlashcardType } from "@prisma/client";

interface ReviewDeckProps {
  cards: FlashcardType[];
  onRate: (cardId: string, quality: number) => Promise<void>;
  onComplete: () => void;
}

export function ReviewDeck({ cards, onRate, onComplete }: ReviewDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewed, setReviewed] = useState(0);

  if (cards.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-4xl mb-4">🎉</p>
        <p className="text-lg font-semibold">All caught up!</p>
        <p className="text-sm">No cards due for review today.</p>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const progress = (reviewed / cards.length) * 100;

  if (currentIndex >= cards.length) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">✅</p>
        <p className="text-lg font-semibold">Review Complete!</p>
        <p className="text-sm text-muted-foreground">
          Reviewed {reviewed} cards
        </p>
      </div>
    );
  }

  const handleRate = async (quality: number) => {
    if (!currentCard) return;
    await onRate(currentCard.id, quality);
    setReviewed((r) => r + 1);
    if (currentIndex + 1 >= cards.length) {
      onComplete();
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">
              Card {currentIndex + 1} of {cards.length}
            </CardTitle>
            <span className="text-xs text-muted-foreground">
              {reviewed} reviewed
            </span>
          </div>
          <Progress value={progress} className="h-1" aria-label={`Review progress: ${Math.round(progress)}%`} />
        </CardHeader>
        <CardContent>
          {currentCard && (
            <Flashcard card={currentCard} onRate={handleRate} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
