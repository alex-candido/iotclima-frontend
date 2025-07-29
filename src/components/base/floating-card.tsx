// src/components/base/floating-card.tsx
"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

interface FloatingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const FloatingCard = forwardRef<HTMLDivElement, FloatingCardProps>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg bg-background/80 shadow-lg backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
