// src/components/maps/map-view/custom-popup-content.tsx


"use client";

import { WeatherInfoCard } from "@/components/base/weather-info-card";
import { Button } from "@/components/ui/button";
import { useLatestRecord } from "@/hooks/use-records";
import { stationToWeatherCardData } from "@/lib/utils";
import { useMap } from "@/providers/map-provider";
import { Station } from "@/types/station";

interface CustomPopupContentProps {
  data: Station;
}

export function CustomPopupContent({ data }: CustomPopupContentProps) {
  const { setSelectedItemForSearch } = useMap();
  const { data: latestRecord, isLoading, error } = useLatestRecord(data.uuid);

  const weatherCardData = stationToWeatherCardData(data);

  const handleViewDetails = () => {
    setSelectedItemForSearch(data);
  };

  if (isLoading) {
    return <div>Carregando dados do sensor...</div>;
  }

  if (error) {
    return <div>Erro ao carregar dados do sensor: {error.message}</div>;
  }

  return (
    <WeatherInfoCard data={weatherCardData} latestRecord={latestRecord}>
      <Button onClick={handleViewDetails} size="sm" className="w-full cursor-pointer">
        Ver Detalhes
      </Button>
    </WeatherInfoCard>
  );
}
