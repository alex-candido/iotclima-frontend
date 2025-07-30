// src/components/maps/filter/weather-filter-tabs.tsx
"use client";

import { FloatingCard } from "@/components/base/floating-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMap } from "@/providers/map-provider";

export function WeatherTabs() {
  const {
    activeWeatherFilter,
    setActiveWeatherFilter,
    setSearchQuery,
    toggleSearchCollapse,
  } = useMap();

  const weatherFilters = [
    { id: "all", label: "Todos", icon: "🌍", count: 156 },
    { id: "sunny", label: "Sol", icon: "☀️", count: 45 },
    { id: "cloudy", label: "Nublado", icon: "⛅", count: 32 },
    { id: "rainy", label: "Chuva", icon: "️🌧️", count: 18 },
    { id: "windy", label: "Vento", icon: "💨", count: 28 },
    { id: "stormy", label: "Tempestade", icon: "⛈️", count: 5 },
  ];

  const handleTabClick = (filterId: string) => {
    setActiveWeatherFilter(filterId);
    setSearchQuery(filterId === "all" ? "" : filterId);
    toggleSearchCollapse();
  };

  return (
    <FloatingCard className="weather-filter-tabs px-4 py-2">
      <div className="flex items-center gap-1">
        {weatherFilters.map((filter) => (
          <Button
            key={filter.id}
            variant={activeWeatherFilter === filter.id ? "default" : "outline"}
            size="sm"
            onClick={() => handleTabClick(filter.id)}
            className="relative h-8 px-3"
          >
            <span className="mr-1">{filter.icon}</span>
            <span className="hidden sm:inline">{filter.label}</span>
            {activeWeatherFilter === filter.id && (
              <Badge variant="secondary" className="ml-1 h-4 px-1 text-xs">
                {filter.count}
              </Badge>
            )}
          </Button>
        ))}
      </div>
    </FloatingCard>
  );
}
