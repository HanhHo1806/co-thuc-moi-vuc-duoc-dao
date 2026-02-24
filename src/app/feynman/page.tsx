"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { EntryForm } from "@/components/feynman/entry-form";
import { EntryList } from "@/components/feynman/entry-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FoodEarnedAnimation } from "@/components/gamification/food-earned-animation";
import type { FeynmanEntryFormData } from "@/types";

export default function FeynmanPage() {
  const handleSubmit = async (_data: FeynmanEntryFormData) => {
    // In a real app, this would call the API
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold">Feynman Journal</h1>
          <p className="text-sm text-muted-foreground">
            Deepen understanding by explaining concepts simply ✍️
          </p>
        </div>

        <Tabs defaultValue="new">
          <TabsList>
            <TabsTrigger value="new">New Entry</TabsTrigger>
            <TabsTrigger value="all">All Entries</TabsTrigger>
          </TabsList>
          <TabsContent value="new" className="mt-4">
            <EntryForm onSubmit={handleSubmit} />
          </TabsContent>
          <TabsContent value="all" className="mt-4">
            <EntryList entries={[]} />
          </TabsContent>
        </Tabs>
      </div>
      <FoodEarnedAnimation />
    </div>
  );
}
