import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Timer, CreditCard, PenLine, HelpCircle } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      href: "/study",
      label: "Start Study Session",
      icon: Timer,
      variant: "default" as const,
      className: "bg-orange-700 hover:bg-orange-600",
    },
    {
      href: "/flashcards",
      label: "Review Flashcards",
      icon: CreditCard,
      variant: "outline" as const,
      className: "",
    },
    {
      href: "/feynman",
      label: "Write Feynman Entry",
      icon: PenLine,
      variant: "outline" as const,
      className: "",
    },
    {
      href: "/flashcards?mode=quiz",
      label: "Take a Quiz",
      icon: HelpCircle,
      variant: "outline" as const,
      className: "",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3" role="navigation" aria-label="Quick actions">
      {actions.map((action) => (
        <Button
          key={action.href}
          asChild
          variant={action.variant}
          className={`h-auto py-3 flex-col gap-2 ${action.className}`}
        >
          <Link href={action.href}>
            <action.icon className="h-5 w-5" aria-hidden="true" />
            <span className="text-xs">{action.label}</span>
          </Link>
        </Button>
      ))}
    </div>
  );
}
