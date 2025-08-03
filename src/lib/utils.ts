// src/lib/utils.ts


import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  CloudRain,
  Droplet,
  LucideIcon,
  Sun,
  Thermometer,
  Wind
} from "lucide-react";
import { twMerge } from "tailwind-merge";

import { ReverseGeocodingResponse } from "@/store/actions/geocoding-actions";
import { OpenMeteoForecastResponse } from "@/store/actions/open-meteo-actions";
import { PlaceStatus } from "@/types/place";
import { RecordStatus } from "@/types/record";
import { SensorStatus, SensorType, UnitType } from "@/types/sensor";
import { Station, StationStatus } from "@/types/station";
import { UserRole, UserStatus } from "@/types/user";
import { SensorReading, WeatherCardData } from "@/types/weather";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLabelByEnumValue<T extends object>(
  enumObject: T,
  value: number
): string {
  const entry = Object.entries(enumObject).find(([_, v]) => v === value);
  return entry ? entry[0] : "Unknown";
}

export function getSensorTypeLabel(type: SensorType): string {
  const labels: Record<SensorType, string> = {
    [SensorType.THERMOMETER]: "thermometer",
    [SensorType.HYGROMETER]: "hygrometer",
    [SensorType.ANEMOMETER]: "anemometer",
    [SensorType.PLUVIOMETER]: "pluviometer",
    [SensorType.SOLARIMETER]: "solarimeter",
  };
  return labels[type] || "Unknown";
}

export function getUnitTypeLabel(type: UnitType): string {
  const labels: Record<UnitType, string> = {
    [UnitType.CELSIUS]: "celsius",
    [UnitType.PERCENT]: "percentage",
    [UnitType.METERS_PER_SECOND]: "meters per second",
    [UnitType.MILLIMETERS]: "millimeters",
    [UnitType.WATTS_PER_METER_SQUARED]: "watts per Square Meter ",
  };
  return labels[type] || "Unknown";
}

export function getStatusLabel(
  status: PlaceStatus | RecordStatus | SensorStatus | StationStatus | UserStatus
): string {
  const labels = {
    1: "active",
    0: "inactive",
  };
  return labels[status as keyof typeof labels] || "Unknown";
}

export function getUserRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    [UserRole.ADMIN]: "Administrador",
    [UserRole.OPERATOR]: "Operador",
    [UserRole.VIEWER]: "Visualizador",
  };
  return labels[role] || "Unknown";
}

export const getUnitSymbol = (unit: UnitType | undefined): string => {
    if (unit === undefined) return "";
    switch (unit) {
        case UnitType.CELSIUS: return "°C";
        case UnitType.PERCENT: return "%";
        case UnitType.METERS_PER_SECOND: return "m/s";
        case UnitType.MILLIMETERS: return "mm";
        case UnitType.WATTS_PER_METER_SQUARED: return "W/m²";
        default: return String(unit);
    }
};

export function getWeatherInfoByCode(code: number | undefined, isDay: boolean): { icon: string; description: string } {
    if (code === undefined) return { icon: "🤷", description: "Desconhecido" };

    const weatherMap: Record<number, { icon: string; description: string }> = {
        0: { icon: isDay ? "☀️" : "🌙", description: "Céu Limpo" },
        1: { icon: "🌤️", description: "Quase Limpo" },
        2: { icon: "⛅", description: "Parcialmente Nublado" },
        3: { icon: "☁️", description: "Nublado" },
        45: { icon: "🌫️", description: "Nevoeiro" },
        48: { icon: "🌫️", description: "Nevoeiro Congelante" },
        51: { icon: "🌦️", description: "Chuvisco Leve" },
        53: { icon: "🌦️", description: "Chuvisco Moderado" },
        55: { icon: "🌦️", description: "Chuvisco Forte" },
        56: { icon: "🌨️", description: "Chuvisco Congelante Leve" },
        57: { icon: "🌨️", description: "Chuvisco Congelante Forte" },
        61: { icon: "🌧️", description: "Chuva Leve" },
        63: { icon: "🌧️", description: "Chuva Moderada" },
        65: { icon: "🌧️", description: "Chuva Forte" },
        66: { icon: "🌨️", description: "Chuva Congelante Leve" },
        67: { icon: "🌨️", description: "Chuva Congelante Forte" },
        71: { icon: "❄️", description: "Neve Leve" },
        73: { icon: "❄️", description: "Neve Moderada" },
        75: { icon: "❄️", description: "Neve Forte" },
        77: { icon: "❄️", description: "Grãos de Neve" },
        80: { icon: "🌧️", description: "Pancadas de Chuva Leves" },
        81: { icon: "🌧️", description: "Pancadas de Chuva Moderadas" },
        82: { icon: "🌧️", description: "Pancadas de Chuva Violentas" },
        85: { icon: "🌨️", description: "Pancadas de Neve Leves" },
        86: { icon: "🌨️", description: "Pancadas de Neve Fortes" },
        95: { icon: "⛈️", description: "Trovoada" },
        96: { icon: "⛈️", description: "Trovoada com Granizo Leve" },
        99: { icon: "⛈️", description: "Trovoada com Granizo Forte" },
    };

    return weatherMap[code] || { icon: "🤷", description: "Desconhecido" };
}

const sensorDisplayMap: Record<SensorType, { name: string; icon: LucideIcon }> = {
  [SensorType.THERMOMETER]: { name: "Temperatura", icon: Thermometer },
  [SensorType.HYGROMETER]: { name: "Umidade", icon: Droplet },
  [SensorType.ANEMOMETER]: { name: "Vento", icon: Wind },
  [SensorType.PLUVIOMETER]: { name: "Chuva", icon: CloudRain },
  [SensorType.SOLARIMETER]: { name: "Radiação Solar", icon: Sun },
};

export function stationToWeatherCardData(station: Station): WeatherCardData {
  const latestRecord = station.records && station.records.length > 0
    ? station.records.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
    : null;
  
    const recordDate = latestRecord?.created_at ? new Date(latestRecord.created_at) : new Date();
    const hour = recordDate.getHours();
    const isDaytime = hour > 6 && hour < 18;

    // Utilize o weather_code do latestRecord
    const { icon: weatherEmoji, description: weatherDescription } =
    getWeatherInfoByCode(latestRecord?.weather_code, isDaytime);

  const sensorReadings: SensorReading[] = Array.isArray(latestRecord?.sensors)
    ? latestRecord.sensors.map((sensor) => {
        const displayInfo = sensorDisplayMap[sensor.type];
        const sensorValue = typeof sensor.value === 'string' ? parseFloat(sensor.value) : sensor.value;
        const sensorUnit = getUnitSymbol(sensor.unit);
        return {
          icon: displayInfo ? displayInfo.icon : Thermometer,
          value: (sensorValue === null || sensorValue === undefined) ? 'N/A' : sensorValue,
          unit: sensorUnit,
          name: displayInfo ? displayInfo.name : "Desconhecido",
        };
      })
    : [];

  const temperatureReading = sensorReadings.find(s => s.unit === '°C' && s.value !== 'N/A');
  const mainTemperatureValue = temperatureReading ? parseFloat(temperatureReading.value as string) : 'N/A';

  return {
    locationName: station.name,
    timestamp: latestRecord?.created_at 
      ? format(new Date(latestRecord.created_at), "dd/MM/yyyy HH:mm:ss", { locale: ptBR }) 
      : 'N/A',    mainTemperature: mainTemperatureValue,
    mainWeatherIcon: weatherEmoji,
    mainWeatherDescription: weatherDescription,
    sensorReadings: sensorReadings,
  };
}

export function openMeteoToWeatherCardData(data: OpenMeteoForecastResponse, addressData?: ReverseGeocodingResponse): WeatherCardData {
    const weatherTime = data.current_weather?.time ? new Date(data.current_weather.time) : new Date();
    const hour = weatherTime.getHours();
    const isDaytime = hour >= 6 && hour <= 18;

    const { icon, description } = getWeatherInfoByCode(data.current_weather?.weathercode, isDaytime);
    
    let locationName = "Localização Atual";
    if (addressData) {
        const city = addressData.address.city || addressData.address.town || addressData.address.village || addressData.address.municipality;
        if (city) {
            locationName = city;
        } else if (addressData.address.road) {
            locationName = addressData.address.road;
        }
    }

    return {
        locationName: locationName,
        timestamp: data.current_weather?.time 
        ? format(new Date(data.current_weather.time), "dd/MM/yyyy HH:mm:ss", { locale: ptBR }) 
        : 'N/A',        
        mainTemperature: data.current_weather?.temperature || 0,
        mainWeatherIcon: icon,
        mainWeatherDescription: description,
        sensorReadings: [], 
    };
}

export const weatherCodeToFilterId: Record<string, number[]> = {
  all: [],
  sunny: [0, 1],
  cloudy: [2, 3],
  rainy: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
  windy: [40, 41, 42],
  stormy: [95, 96, 99],
  foggy: [45, 48],
  snowy: [71, 73, 75, 77, 85, 86],
};