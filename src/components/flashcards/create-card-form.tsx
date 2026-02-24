"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CreateCardFormProps {
  onSubmit: (front: string, back: string) => Promise<void>;
}

export function CreateCardForm({ onSubmit }: CreateCardFormProps) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!front.trim() || !back.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(front, back);
      setFront("");
      setBack("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Create New Flashcard</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" aria-label="Create flashcard form">
          <div className="space-y-2">
            <Label htmlFor="card-front">Question (Front)</Label>
            <Textarea
              id="card-front"
              placeholder="Enter the question..."
              value={front}
              onChange={(e) => setFront(e.target.value)}
              required
              rows={3}
              aria-required="true"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-back">Answer (Back)</Label>
            <Textarea
              id="card-back"
              placeholder="Enter the answer..."
              value={back}
              onChange={(e) => setBack(e.target.value)}
              required
              rows={3}
              aria-required="true"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || !front.trim() || !back.trim()}
            className="w-full"
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Card"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
