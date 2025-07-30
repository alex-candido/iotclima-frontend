// src/components/maps/map-view/custom-popup-content.tsx


"use client";

import { WeatherInfoCard } from "@/components/base/weather-info-card";
import { Button } from "@/components/ui/button";
import { stationToWeatherCardData } from "@/lib/utils";
import { useMap } from "@/providers/map-provider";
import { Station } from "@/types/station";

interface CustomPopupContentProps {
  data: Station;
}

export function CustomPopupContent({ data }: CustomPopupContentProps) {
  const { setSelectedItemForSearch } = useMap();
  const weatherCardData = stationToWeatherCardData(data);

  const handleViewDetails = () => {
    setSelectedItemForSearch(data);
  };

  return (
    <WeatherInfoCard data={weatherCardData}>
      <Button onClick={handleViewDetails} size="sm" className="w-full">
        Ver Detalhes
      </Button>
    </WeatherInfoCard>
  );
}
