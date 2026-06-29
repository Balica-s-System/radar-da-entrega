"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DataPoint = {
  name: string;
  income: number;
  expense: number;
};

type SummaryItem = {
  label: string;
  value: string;
  subtitle: string;
  trend: string;
};

type EarningChartProps = {
  title?: string;
  subtitle?: string;
  data?: DataPoint[];
  summary?: SummaryItem[];
  action?: React.ReactNode;
};

const defaultData: DataPoint[] = [
  { name: "Mon", income: 4200, expense: 2100 },
  { name: "Tue", income: 3800, expense: 1900 },
  { name: "Wed", income: 5100, expense: 2800 },
  { name: "Thu", income: 4600, expense: 2200 },
  { name: "Fri", income: 5400, expense: 2600 },
  { name: "Sat", income: 3200, expense: 1500 },
  { name: "Sun", income: 2800, expense: 1200 },
];

const defaultSummary: SummaryItem[] = [
  {
    label: "Net profit",
    value: "$1,623",
    subtitle: "Sales",
    trend: "20.3%",
  },
  {
    label: "Total income",
    value: "$5,600",
    subtitle: "Sales, Affiliation",
    trend: "16.2%",
  },
  {
    label: "Total expense",
    value: "$3,200",
    subtitle: "ADVT, Marketing",
    trend: "10.5%",
  },
];

export function EarningChart({
  title = "Earning Report",
  subtitle = "Weekly Earning overview",
  data = defaultData,
  summary = defaultSummary,
  action,
}: EarningChartProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          {action}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={4}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--card))",
                }}
              />
              <Bar
                dataKey="income"
                fill="hsl(var(--chart-1))"
                radius={[4, 4, 0, 0]}
                maxBarSize={36}
              />
              <Bar
                dataKey="expense"
                fill="hsl(var(--chart-2))"
                radius={[4, 4, 0, 0]}
                maxBarSize={36}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 border-t pt-4">
          {summary.map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-semibold">{item.value}</span>
                <span className="text-xs text-emerald-600">{item.trend}</span>
              </div>
              <p className="text-xs text-muted-foreground">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
