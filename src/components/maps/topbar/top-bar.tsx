// src/components/maps/topbar/top-bar.tsx
"use client";

import { useMap } from "@/providers/map-provider";

export function TopBar({ children }: { children: React.ReactNode }) {
  const { sidebarWidth, asideWidth, activeAsidePanel } = useMap();

  const calculatedLeft = sidebarWidth + 16 + (activeAsidePanel ? asideWidth + 16 : 0);

  return (
    <header 
      className="top-bar absolute top-4 z-10 flex items-start justify-between gap-4"
      style={{
        left: `${calculatedLeft}px`,
        right: `16px`,
      }}
    >
      {children}
    </header>
  );
}
