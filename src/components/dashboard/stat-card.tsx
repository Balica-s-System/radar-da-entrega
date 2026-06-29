"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

type Trend = {
  value: string;
  direction: "up" | "down";
};

export type StatCardProps = {
  title: string;
  value: string;
  trend?: Trend;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
};

export function StatCard({
  title,
  value,
  trend,
  subtitle,
  icon,
  action,
}: StatCardProps) {
  return (
    <Card size="sm" className="relative">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {title}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold tracking-tight">
                {value}
              </span>
              {trend && (
                <span
                  className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                    trend.direction === "up"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {trend.direction === "up" ? (
                    <TrendingUp size={14} />
                  ) : (
                    <TrendingDown size={14} />
                  )}
                  {trend.value}
                </span>
              )}
            </div>
            {subtitle && (
              <span className="text-xs text-muted-foreground">
                {subtitle}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {icon && (
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {icon}
              </div>
            )}
            {action}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
