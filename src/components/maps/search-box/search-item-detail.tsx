// src/components/maps/search-box/search-item-detail.tsx
"use client";

import { WeatherInfoCard } from "@/components/base/weather-info-card";
import { stationToWeatherCardData } from "@/lib/utils";
import { Station } from "@/types/station";

interface SearchItem {
  id: string | number;
  name: string;
  description: string;
}

interface SearchItemDetailProps {
  item: SearchItem;
}

export function SearchItemDetail({ item }: SearchItemDetailProps) {
  if (!item) return null;

  // Type guard to check if the item is a Station
  const isStation = (item: SearchItem): item is Station => {
    return (item as Station).place !== undefined && (item as Station).status !== undefined;
  };

  if (isStation(item)) {
    const weatherCardData = stationToWeatherCardData(item);
    return (
      <WeatherInfoCard data={weatherCardData} />
    );
  }

  return (
    <div className="p-4 border rounded-lg bg-card mt-2">
      <h3 className="font-semibold">Details for: {item.name || 'Item'}</h3>
      <p>More details about {item.name || 'this item'} will go here.</p>
    </div>
  );
}
