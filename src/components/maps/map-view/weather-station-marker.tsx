// src/components/maps/map-view/weather-station-marker.tsx
"use client";

import { cn } from "@/lib/utils";

interface WeatherStationMarkerProps {
  temperature: string;
  weatherIcon: string; // Unicode emoji or path to SVG/component
  className?: string;
}

export function WeatherStationMarker({ temperature, weatherIcon, className }: WeatherStationMarkerProps) {
  return (
    <div className={cn(
      "weather-station-marker flex items-center justify-center bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-semibold whitespace-nowrap",
      className
    )}>
      <span className="mr-1 text-lg leading-none">{weatherIcon}</span>
      <span>{temperature}</span>
    </div>
  );
}
