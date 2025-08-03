// src/components/maps/search-box/search-item-detail.tsx
"use client";

import { FloatingCard } from "@/components/base/floating-card";
import { WeatherInfoCard } from "@/components/base/weather-info-card";
import { useStationRecords } from "@/hooks/use-records"; // Importe o novo hook
import { stationToWeatherCardData } from "@/lib/utils";
import { Station } from "@/types/station";
import { HourlyForecastCard } from "./hourly-forecast-card";
import { SensorChartsCard } from "./sensor-charts-card";

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

    // Use o novo hook para buscar os registros da estação
    const { data: recordsData, isLoading: isRecordsLoading, isError: recordsError } = useStationRecords(item.uuid);
    const records = recordsData?.results;

    return (
      <div className="flex flex-col gap-4 p-4 overflow-y-auto max-h-[calc(100vh-100px)]">
        {/* Card de resumo do clima atual da estação */}
        <WeatherInfoCard data={weatherCardData} />
        
        {/* Card de previsão do tempo por hora */}
        <HourlyForecastCard station={item} />

        {/* Card de gráficos com dados históricos dos sensores */}
        <SensorChartsCard records={records} isLoading={isRecordsLoading} isError={recordsError} />
      </div>
    );
  }

  return (
    <FloatingCard className="p-4 border rounded-lg bg-card mt-2">
      <h3 className="font-semibold">Detalhes para: {item.name || 'Item'}</h3>
      <p>Mais detalhes sobre {item.name || 'este item'} serão exibidos aqui.</p>
    </FloatingCard>
  );
}