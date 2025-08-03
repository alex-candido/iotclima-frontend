// src/types/weather.d.ts


import { LucideIcon } from "lucide-react";

export interface SensorReading {
  icon: LucideIcon;
  value: string | number;
  unit: string;
  name: string;
}

export interface WeatherCardData {
  locationName: string;
  timestamp: string;
  mainTemperature: number | string;
  mainWeatherIcon: string;
  mainWeatherDescription: string;
  sensorReadings: SensorReading[];
  weatherCode?: number;
}
