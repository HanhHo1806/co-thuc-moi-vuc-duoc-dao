import { Sidebar } from "@/components/layout/sidebar";
import { FoodGrid } from "@/components/collection/food-grid";

export default function CollectionPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Food Collection</h1>
          <p className="text-sm text-muted-foreground">
            Earn food rewards through learning activities 🍜
          </p>
        </div>

        <FoodGrid foods={[]} />
      </div>
    </div>
  );
}
