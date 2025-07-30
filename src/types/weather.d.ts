// src/types/weather.d.ts


import { LucideIcon } from "lucide-react";

export interface SensorReading {
  icon: LucideIcon;
  value: string | number;
  unit: string;
}

export interface WeatherCardData {
  locationName: string;
  timestamp: string;
  mainTemperature: number;
  mainWeatherIcon: string;
  mainWeatherDescription: string;
  sensorReadings: SensorReading[];
}
