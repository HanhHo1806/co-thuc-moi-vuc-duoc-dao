import { Sidebar } from "@/components/layout/sidebar";
import { PathCard } from "@/components/paths/path-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PathsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Learning Paths</h1>
            <p className="text-sm text-muted-foreground">
              Choose your certification journey 🗺️
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/stats">View Stats</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="list" aria-label="Learning paths">
          {/* Paths would be loaded dynamically */}
          <div className="col-span-full text-center py-12 text-muted-foreground">
            <p className="text-4xl mb-4">🗺️</p>
            <p className="text-lg font-semibold">No active learning paths</p>
            <p className="text-sm">
              Set up your database and seed data to see certification paths here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
