"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { ReviewDeck } from "@/components/flashcards/review-deck";
import { CreateCardForm } from "@/components/flashcards/create-card-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { FoodEarnedAnimation } from "@/components/gamification/food-earned-animation";

export default function FlashcardsPage() {
  const handleRate = async (_cardId: string, _quality: number) => {
    // In a real app, this would call the API
  };

  const handleComplete = () => {
    // Handle review session completion
  };

  const handleCreateCard = async (_front: string, _back: string) => {
    // In a real app, this would call the API
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold">Flashcards</h1>
          <p className="text-sm text-muted-foreground">
            Spaced repetition review powered by SM-2 algorithm 🧠
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-400">0</p>
              <p className="text-xs text-muted-foreground">Cards Due Today</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-400">0%</p>
              <p className="text-xs text-muted-foreground">Retention Rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-yellow-400">0</p>
              <p className="text-xs text-muted-foreground">Total Cards</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="review">
          <TabsList>
            <TabsTrigger value="review">Review Deck</TabsTrigger>
            <TabsTrigger value="create">Create Card</TabsTrigger>
          </TabsList>
          <TabsContent value="review" className="mt-4">
            <ReviewDeck
              cards={[]}
              onRate={handleRate}
              onComplete={handleComplete}
            />
          </TabsContent>
          <TabsContent value="create" className="mt-4">
            <CreateCardForm onSubmit={handleCreateCard} />
          </TabsContent>
        </Tabs>
      </div>
      <FoodEarnedAnimation />
    </div>
  );
}
