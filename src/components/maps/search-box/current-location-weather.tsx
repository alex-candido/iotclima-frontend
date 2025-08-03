// src/components/maps/search-box/current-location-weather.tsx
"use client";

import { WeatherInfoCard } from "@/components/base/weather-info-card";
import { openMeteoToWeatherCardData } from "@/lib/utils";
import { useMap } from "@/providers/map-provider";

export function CurrentLocationWeather() {
  const { weatherData, currentAddress } = useMap();

  if (!weatherData) {
    return null;
  }

  const weatherCardData = openMeteoToWeatherCardData(
    weatherData,
    currentAddress ?? undefined
  );

  return <WeatherInfoCard data={weatherCardData} isCurrentLocation={true} />;
}
