// src/components/ui/stats-card.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import * as React from "react";

interface StatsCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  title: string;
  value: string | number;
  description: string;
  icon?: React.ElementType;
  iconColorClass?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  iconColorClass,
  className,
  ...props
}: StatsCardProps) {
  return (
    <Card className={cn("flex flex-col", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && (
          <Icon
            className={cn("h-4 w-4 text-muted-foreground", iconColorClass)}
          />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
