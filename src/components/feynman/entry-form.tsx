"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FeynmanEntryFormData } from "@/types";

interface EntryFormProps {
  onSubmit: (data: FeynmanEntryFormData) => Promise<void>;
  initialData?: Partial<FeynmanEntryFormData>;
}

export function EntryForm({ onSubmit, initialData }: EntryFormProps) {
  const [conceptName, setConceptName] = useState(
    initialData?.conceptName ?? ""
  );
  const [explanation, setExplanation] = useState(
    initialData?.explanation ?? ""
  );
  const [simplicityScore, setSimplicityScore] = useState<number>(
    initialData?.simplicityScore ?? 5
  );
  const [gapInput, setGapInput] = useState("");
  const [gaps, setGaps] = useState<string[]>(
    initialData?.gapsIdentified ?? []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addGap = () => {
    if (gapInput.trim() && !gaps.includes(gapInput.trim())) {
      setGaps([...gaps, gapInput.trim()]);
      setGapInput("");
    }
  };

  const removeGap = (gap: string) => {
    setGaps(gaps.filter((g) => g !== gap));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!conceptName.trim() || !explanation.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        conceptName,
        explanation,
        simplicityScore,
        gapsIdentified: gaps,
      });
      setConceptName("");
      setExplanation("");
      setSimplicityScore(5);
      setGaps([]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">New Feynman Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" aria-label="Feynman entry form">
          <div className="space-y-2">
            <Label htmlFor="concept-name">Concept Name</Label>
            <Input
              id="concept-name"
              placeholder="e.g., TCP/IP Three-Way Handshake"
              value={conceptName}
              onChange={(e) => setConceptName(e.target.value)}
              required
              aria-required="true"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="explanation">
              Explain it simply (as if to a child)
            </Label>
            <Textarea
              id="explanation"
              placeholder="Write your explanation in the simplest terms possible..."
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              required
              rows={6}
              aria-required="true"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="simplicity-score">
              Simplicity Score: {simplicityScore}/10
            </Label>
            <input
              id="simplicity-score"
              type="range"
              min={1}
              max={10}
              value={simplicityScore}
              onChange={(e) => setSimplicityScore(Number(e.target.value))}
              className="w-full"
              aria-label={`Simplicity score: ${simplicityScore} out of 10`}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Complex</span>
              <span>Very Simple</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Knowledge Gaps Identified</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a gap in your understanding..."
                value={gapInput}
                onChange={(e) => setGapInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" ? (e.preventDefault(), addGap()) : undefined}
                aria-label="Knowledge gap to add"
              />
              <Button
                type="button"
                variant="outline"
                onClick={addGap}
                aria-label="Add knowledge gap"
              >
                Add
              </Button>
            </div>
            {gaps.length > 0 && (
              <ul className="flex flex-wrap gap-2 mt-2" aria-label="Knowledge gaps">
                {gaps.map((gap) => (
                  <li
                    key={gap}
                    className="flex items-center gap-1 bg-muted rounded-full px-3 py-1 text-xs"
                  >
                    {gap}
                    <button
                      type="button"
                      onClick={() => removeGap(gap)}
                      className="text-muted-foreground hover:text-foreground ml-1"
                      aria-label={`Remove gap: ${gap}`}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Button
            type="submit"
            disabled={
              isSubmitting || !conceptName.trim() || !explanation.trim()
            }
            className="w-full"
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Entry (+200 cal)"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
