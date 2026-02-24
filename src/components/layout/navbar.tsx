"use client";

import Link from "next/link";
import { Flame } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="text-xl">🍜</span>
          <span className="hidden sm:inline text-sm font-serif italic text-muted-foreground">
            Có Thực Mới Vực Được Đạo
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-orange-400">
            <Flame className="h-4 w-4" aria-hidden="true" />
            <span className="font-semibold">0 day streak</span>
          </div>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}
