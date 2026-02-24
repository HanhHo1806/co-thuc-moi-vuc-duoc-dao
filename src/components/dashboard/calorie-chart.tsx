"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WeeklyCalorieData } from "@/types";

interface CalorieChartProps {
  data: WeeklyCalorieData[];
}

export function CalorieChart({ data }: CalorieChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Weekly Calories Earned</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
            No data yet. Start studying to earn calories!
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#888", fontSize: 12 }}
                tickLine={false}
              />
              <YAxis tick={{ fill: "#888", fontSize: 12 }} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a2e",
                  border: "1px solid #333",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff" }}
                formatter={(value: number) => [`${value} cal`, "Calories"]}
              />
              <Bar
                dataKey="calories"
                fill="#DAA520"
                radius={[4, 4, 0, 0]}
                name="Calories"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
