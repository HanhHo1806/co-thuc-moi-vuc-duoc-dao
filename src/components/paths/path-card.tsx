import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { LearningPath, Certification } from "@prisma/client";

type PathWithCert = LearningPath & { certification: Certification };

const CUISINE_FLAGS: Record<string, string> = {
  Vietnamese: "🇻🇳",
  Japanese: "🇯🇵",
  Korean: "🇰🇷",
  Thai: "🇹🇭",
  Indian: "🇮🇳",
  Mexican: "🇲🇽",
};

const STATUS_COLORS: Record<string, string> = {
  NOT_STARTED: "bg-gray-700 text-gray-300",
  IN_PROGRESS: "bg-blue-900 text-blue-300",
  COMPLETED: "bg-green-900 text-green-300",
};

interface PathCardProps {
  path: PathWithCert;
}

export function PathCard({ path }: PathCardProps) {
  const { certification } = path;
  const flag = CUISINE_FLAGS[certification.cuisineTheme] ?? "🌍";
  const statusClass =
    STATUS_COLORS[path.status] ?? "bg-gray-700 text-gray-300";

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">
              {flag}
            </span>
            <div>
              <CardTitle className="text-base">
                {certification.name}
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                {certification.category} • {certification.cuisineTheme} cuisine
              </p>
            </div>
          </div>
          <Badge
            className={`text-xs ${statusClass}`}
            variant="secondary"
            aria-label={`Status: ${path.status.replace(/_/g, " ")}`}
          >
            {path.status.replace(/_/g, " ")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground line-clamp-2">
          {certification.description}
        </p>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(path.progressPercentage)}%</span>
          </div>
          <Progress
            value={path.progressPercentage}
            className="h-2"
            aria-label={`${certification.name} progress: ${Math.round(path.progressPercentage)}%`}
          />
        </div>
        <div className="flex gap-2 text-xs text-muted-foreground">
          <span>{certification.totalTopics} topics</span>
          <span>•</span>
          <span>12 weeks</span>
        </div>
      </CardContent>
    </Card>
  );
}
