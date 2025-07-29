// src/components/maps/filter/weather-filter-tabs.tsx
"use client";

import { FloatingCard } from "@/components/base/floating-card";
import { useMap } from "@/providers/map-provider";
import { useState } from "react";

export function WeatherFilterTabs() {
  const { setSearchQuery, toggleSearchCollapse } = useMap();
  const tabs = ["Todos", "Ensolarado", "Nublado", "Chuvoso"];
  const [activeTab, setActiveTab] = useState(tabs[0]); // Initialize with the first tab as active

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setSearchQuery(tab);
    toggleSearchCollapse();
  };

  return (
    <FloatingCard className="weather-filter-tabs px-4 py-2">
      <nav className="weather-filter-tabs flex items-center space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => handleTabClick(tab)}
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}>
            {tab}
          </button>
        ))}
      </nav>
    </FloatingCard>
  );
}
