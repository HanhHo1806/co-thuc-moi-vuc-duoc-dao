"use client";

import { usePomodoro } from "@/hooks/use-pomodoro";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/lib/learning/pomodoro-timer";
import { Play, Pause, RotateCcw } from "lucide-react";

interface PomodoroTimerProps {
  onSessionComplete?: (minutes: number, pomodoros: number) => void;
}

export function PomodoroTimer({ onSessionComplete }: PomodoroTimerProps) {
  const { state, start, pause, reset, progress } = usePomodoro();

  const phaseLabels = {
    work: "Focus Time",
    shortBreak: "Short Break",
    longBreak: "Long Break",
  };

  const phaseColors = {
    work: "stroke-orange-400",
    shortBreak: "stroke-green-400",
    longBreak: "stroke-blue-400",
  };

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference * (1 - progress);

  const handleStop = () => {
    if (state.totalWorkSeconds > 0 && onSessionComplete) {
      const minutes = Math.floor(state.totalWorkSeconds / 60);
      onSessionComplete(minutes, state.completedPomodoros);
    }
    reset();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Phase label */}
      <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {phaseLabels[state.phase]}
      </div>

      {/* Circular timer */}
      <div className="relative" role="timer" aria-label={`${phaseLabels[state.phase]}: ${formatTime(state.timeRemainingSeconds)} remaining`}>
        <svg width="220" height="220" className="transform -rotate-90" aria-hidden="true">
          {/* Background circle */}
          <circle
            cx="110"
            cy="110"
            r="90"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted"
          />
          {/* Progress circle */}
          <circle
            cx="110"
            cy="110"
            r="90"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-1000 ${phaseColors[state.phase]}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-mono font-bold">
            {formatTime(state.timeRemainingSeconds)}
          </span>
          <span className="text-sm text-muted-foreground mt-1">
            🍅 ×{state.completedPomodoros}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={reset}
          aria-label="Reset timer"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
        </Button>

        {state.isRunning ? (
          <Button
            size="lg"
            onClick={pause}
            className="bg-orange-700 hover:bg-orange-600 w-32"
            aria-label="Pause timer"
          >
            <Pause className="h-5 w-5 mr-2" aria-hidden="true" />
            Pause
          </Button>
        ) : (
          <Button
            size="lg"
            onClick={start}
            className="bg-orange-700 hover:bg-orange-600 w-32"
            aria-label="Start timer"
          >
            <Play className="h-5 w-5 mr-2" aria-hidden="true" />
            {state.totalWorkSeconds > 0 ? "Resume" : "Start"}
          </Button>
        )}

        {state.totalWorkSeconds > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleStop}
            aria-label="End session and save"
          >
            End Session
          </Button>
        )}
      </div>

      {/* Progress info */}
      <div className="text-xs text-muted-foreground text-center">
        <p>Work time: {Math.floor(state.totalWorkSeconds / 60)} min</p>
        <p>Until long break: {4 - (state.completedPomodoros % 4)} more 🍅</p>
      </div>
    </div>
  );
}
