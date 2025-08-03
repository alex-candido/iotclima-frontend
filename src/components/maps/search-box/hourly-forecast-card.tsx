// src/components/maps/search-box/hourly-forecast-card.tsx
"use client";

import { useOpenMeteoForecast } from "@/hooks/use-open-meteo";
import { getWeatherInfoByCode } from "@/lib/utils";
import { Station } from "@/types/station";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2 } from "lucide-react";

interface HourlyForecastCardProps {
  station: Station;
}

export function HourlyForecastCard({ station }: HourlyForecastCardProps) {
  const { data: hourlyForecast, isLoading, isError } = useOpenMeteoForecast(
    station.place.latitude,
    station.place.longitude,
    { hourly: ["temperature_2m", "precipitation", "weather_code"], forecast_days: 1 }
  );

  if (isLoading) {
    return (
      <div className="p-4 border rounded-lg bg-card flex items-center justify-center min-h-[120px]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  if (isError || !hourlyForecast?.hourly || hourlyForecast.hourly.time.length === 0) {
    return (
      <div className="p-4 border rounded-lg bg-card">
        <h3 className="font-semibold text-foreground mb-2">Previsão por Hora</h3>
        <p className="text-sm text-muted-foreground">Previsão por hora não disponível.</p>
      </div>
    );
  }
  
  const hourlyData = hourlyForecast.hourly;

  return (
    <div className="p-4 border rounded-lg bg-card">
      <h3 className="font-semibold text-foreground mb-2">Previsão por Hora</h3>
      <div className="flex overflow-x-auto gap-4 py-2 scrollbar-hide">
        {hourlyData.time.slice(0, 12).map((timestamp: string, index: number) => {
          const hour = new Date(timestamp);
          const isDaytime = hourlyForecast?.current_weather?.is_day === 1 || (hour.getHours() >= 6 && hour.getHours() < 18);
          
          const weatherCode = hourlyData.weather_code?.[index];
          const temperature = hourlyData.temperature_2m?.[index];

          if (weatherCode === undefined || temperature === undefined) {
            return null;
          }

          const { icon } = getWeatherInfoByCode(weatherCode, isDaytime);

          return (
            <div key={timestamp} className="flex-shrink-0 text-center">
              <p className="text-xs text-muted-foreground mb-1">
                {format(hour, "HH:mm", { locale: ptBR })}
              </p>
              <div className="text-xl leading-none">{icon}</div>
              <p className="font-semibold mt-1">{temperature}°</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}