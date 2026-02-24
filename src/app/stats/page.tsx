"use client";

import { Sidebar } from "@/components/layout/sidebar";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsPage() {
  const COLORS = ["#DAA520", "#FF6B35", "#4ECDC4", "#FF9500", "#7B68EE"];

  const emptyChartMessage = (
    <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
      Start studying to see your stats!
    </div>
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Stats & Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Track your learning progress over time 📊
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calories over time */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Calories Earned Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>{emptyChartMessage}</CardContent>
          </Card>

          {/* Study hours by topic */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Study Hours by Topic</CardTitle>
            </CardHeader>
            <CardContent>{emptyChartMessage}</CardContent>
          </Card>

          {/* Session type distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Session Type Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie
                      data={[{ name: "No Data", value: 1 }]}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      dataKey="value"
                    >
                      <Cell fill="#333" />
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* SRS retention rate */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                SRS Retention Rate Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={[]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis tick={{ fill: "#888", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#888", fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a2e",
                      border: "1px solid #333",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="retention"
                    stroke="#DAA520"
                    strokeWidth={2}
                    name="Retention %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Streak history */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Streak History</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={[]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis tick={{ fill: "#888", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#888", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a2e",
                      border: "1px solid #333",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="streak" fill="#FF6B35" radius={[4, 4, 0, 0]} name="Streak Days" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
