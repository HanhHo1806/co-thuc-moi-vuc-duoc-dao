import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/layout/navbar";
import { Github } from "lucide-react";
import Link from "next/link";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  // In a real app, this would fetch from the database
  const profile = {
    displayName: username,
    avatarUrl: null as string | null,
    githubUsername: username,
    totalCaloriesEarned: 0,
    longestStreak: 0,
    currentLevel: 1,
    xpPoints: 0,
  };

  const initials = profile.displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="flex items-center gap-6 p-6">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={profile.avatarUrl ?? undefined}
                alt={profile.displayName}
              />
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{profile.displayName}</h1>
              {profile.githubUsername && (
                <Link
                  href={`https://github.com/${profile.githubUsername}`}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub profile: ${profile.githubUsername}`}
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  @{profile.githubUsername}
                </Link>
              )}
            </div>
            <Badge className="bg-yellow-900 text-yellow-300">
              Level {profile.currentLevel}
            </Badge>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-yellow-400">
                {profile.totalCaloriesEarned.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Total Calories</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-orange-400">
                {profile.longestStreak}
              </p>
              <p className="text-xs text-muted-foreground">Best Streak</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-400">
                {profile.xpPoints.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">XP Points</p>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Certification Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center py-4">
              No active certifications yet.
            </p>
          </CardContent>
        </Card>

        {/* Achievements Showcase */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center py-4">
              No achievements unlocked yet.
            </p>
          </CardContent>
        </Card>

        {/* Food highlights */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Rare Food Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center py-4">
              No rare foods earned yet.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
