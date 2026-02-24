"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { PomodoroTimer } from "@/components/study/pomodoro-timer";
import { SessionForm } from "@/components/study/session-form";
import { SessionHistory } from "@/components/study/session-history";
import { FoodEarnedAnimation } from "@/components/gamification/food-earned-animation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StudyPage() {
  const handleSessionComplete = (_minutes: number, _pomodoros: number) => {
    // In a real app, this would save to the database
    console.log("Session complete:", _minutes, "min,", _pomodoros, "pomodoros");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold">Study Timer</h1>
          <p className="text-sm text-muted-foreground">
            Focus with Pomodoro technique and earn food rewards 🍅
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Timer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Pomodoro Timer</CardTitle>
            </CardHeader>
            <CardContent>
              <PomodoroTimer onSessionComplete={handleSessionComplete} />
            </CardContent>
          </Card>

          {/* Session form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Session Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <SessionForm currentStreak={0} previewMinutes={25} />
            </CardContent>
          </Card>
        </div>

        {/* Session history */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Sessions</h2>
          <Tabs defaultValue="today">
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
            </TabsList>
            <TabsContent value="today" className="mt-4">
              <SessionHistory sessions={[]} />
            </TabsContent>
            <TabsContent value="week" className="mt-4">
              <SessionHistory sessions={[]} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <FoodEarnedAnimation />
    </div>
  );
}
