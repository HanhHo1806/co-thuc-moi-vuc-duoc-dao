"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Timer,
  CreditCard,
  PenLine,
  Utensils,
  Map,
  Trophy,
  BarChart2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart2 },
  { href: "/study", label: "Study Timer", icon: Timer },
  { href: "/flashcards", label: "Flashcards", icon: CreditCard },
  { href: "/feynman", label: "Feynman Journal", icon: PenLine },
  { href: "/collection", label: "Food Collection", icon: Utensils },
  { href: "/paths", label: "Learning Paths", icon: Map },
  { href: "/achievements", label: "Achievements", icon: Trophy },
  { href: "/stats", label: "Stats", icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-card border-r border-border p-4">
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🍜</span>
          <div>
            <p className="text-xs text-muted-foreground font-serif italic">
              Có Thực Mới Vực Được Đạo
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1" aria-label="Main navigation">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
            aria-current={pathname === href ? "page" : undefined}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
