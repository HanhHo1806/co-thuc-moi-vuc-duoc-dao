import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { FeynmanEntry } from "@prisma/client";

interface EntryListProps {
  entries: FeynmanEntry[];
}

export function EntryList({ entries }: EntryListProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-4xl mb-4">✍️</p>
        <p>No entries yet. Write your first Feynman explanation!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4" role="list" aria-label="Feynman entries">
      {entries.map((entry) => (
        <Card key={entry.id} role="listitem">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-4">
              <CardTitle className="text-base">{entry.conceptName}</CardTitle>
              <div className="flex items-center gap-2 shrink-0">
                {entry.simplicityScore && (
                  <Badge variant="secondary">
                    Simplicity: {entry.simplicityScore}/10
                  </Badge>
                )}
                <Badge variant="outline">
                  Rev. ×{entry.revisionCount}
                </Badge>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {formatDate(entry.createdAt)}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {entry.explanation}
            </p>
            {entry.gapsIdentified.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Gaps identified:
                </p>
                <ul className="flex flex-wrap gap-1" aria-label="Knowledge gaps">
                  {entry.gapsIdentified.map((gap) => (
                    <li key={gap}>
                      <Badge
                        variant="destructive"
                        className="text-xs bg-red-950 text-red-300"
                      >
                        {gap}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
