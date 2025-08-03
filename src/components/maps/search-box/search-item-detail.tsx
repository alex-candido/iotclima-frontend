// src/components/maps/search-box/search-item-detail.tsx
"use client";

import { FloatingCard } from "@/components/base/floating-card";
import { WeatherInfoCard } from "@/components/base/weather-info-card";
import { useStationRecords } from "@/hooks/use-records";
import { stationToWeatherCardData } from "@/lib/utils";
import { Station } from "@/types/station";
import { HourlyForecastCard } from "./hourly-forecast-card";
import { SensorChartsCard } from "./sensor-charts-card";
import { SensorDetailsCard } from "./sensor-details-card";

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

  const isStation = (item: SearchItem): item is Station => {
    return (item as Station).place !== undefined && (item as Station).status !== undefined;
  };

  if (isStation(item)) {
    const weatherCardData = stationToWeatherCardData(item);
    const { data: recordsData, isLoading: isRecordsLoading, isError: recordsError } = useStationRecords(item.uuid);
    const records = recordsData?.results;

    // Adiciona uma verificação de segurança para as coordenadas
    const hasCoordinates = item.place?.latitude !== undefined && item.place?.longitude !== undefined;
    const stationCoordinates = hasCoordinates 
      ? { latitude: item.place.latitude, longitude: item.place.longitude } 
      : undefined;

    return (
      <div className="flex flex-col gap-4 p-4 overflow-y-auto max-h-[calc(100vh-100px)]">
        {/* Card de resumo do clima atual */}
        <WeatherInfoCard 
          data={weatherCardData}
          stationCoordinates={stationCoordinates} // Passa a nova variável
        />
        
        {/* Card de previsão do tempo por hora */}
        <HourlyForecastCard station={item} />

        {/* Card de gráficos com dados históricos */}
        <SensorChartsCard records={records} isLoading={isRecordsLoading} isError={recordsError} />

        {/* Card de detalhes dos sensores */}
        <SensorDetailsCard sensors={item.sensors} />
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