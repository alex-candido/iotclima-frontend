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
import { RecordStatus, SensorRecord } from "@/types/record";
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

export function getStatusLabel(
  status: PlaceStatus | RecordStatus | SensorStatus | StationStatus | UserStatus
): string {
  const labels = {
    1: "Ativo",
    0: "Inativo",
  };
  return labels[status as keyof typeof labels] || "Unknown";
}

export function getSensorTypeLabel(type: SensorType): string {
  const labels: Record<SensorType, string> = {
    [SensorType.THERMOMETER]: "Termômetro",
    [SensorType.HYGROMETER]: "Higrômetro",
    [SensorType.ANEMOMETER]: "Anemômetro",
    [SensorType.PLUVIOMETER]: "Pluviômetro",
    [SensorType.SOLARIMETER]: "Solarímetro",
  };
  return labels[type] || "Unknown";
}

export function getUnitTypeLabel(type: UnitType): string {
  const labels: Record<UnitType, string> = {
    [UnitType.CELSIUS]: "Celsius",
    [UnitType.PERCENT]: "Porcento",
    [UnitType.METERS_PER_SECOND]: "Metros por Segundo",
    [UnitType.MILLIMETERS]: "Milímetros",
    [UnitType.WATTS_PER_METER_SQUARED]: "Watts por Metro Quadrado",
  };
  return labels[type] || "Unknown";
}

export function getUserRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    [UserRole.ADMIN]: "Administrador",
    [UserRole.OPERATOR]: "Operador",
    [UserRole.VIEWER]: "Visualizador",
  };
  return labels[role] || "Unknown";
}

export function getWeatherIconAndDescription(
  sensors: SensorRecord[]
): { icon: string; description: string } {
  const getNumericValue = (sensorRecord: SensorRecord | undefined) =>
    typeof sensorRecord?.value === 'string' ? parseFloat(sensorRecord.value) : sensorRecord?.value;

  const thermometer = sensors.find((s) => s.type === SensorType.THERMOMETER);
  const pluviometer = sensors.find((s) => s.type === SensorType.PLUVIOMETER);
  const hygrometer = sensors.find((s) => s.type === SensorType.HYGROMETER);
  const solarimeter = sensors.find((s) => s.type === SensorType.SOLARIMETER);

  const pluviometerValue = getNumericValue(pluviometer);
  const hygrometerValue = getNumericValue(hygrometer);
  const thermometerValue = getNumericValue(thermometer);
  const solarimeterValue = getNumericValue(solarimeter);

  if (pluviometerValue !== undefined && pluviometerValue > 0) {
    return { icon: "🌧️", description: "Chuva Forte" };
  }
  if (hygrometerValue !== undefined && hygrometerValue > 80 && (thermometerValue === undefined || thermometerValue < 20)) {
    return { icon: "🌫️", description: "Neblina/Úmido" };
  }
  if (thermometerValue !== undefined && thermometerValue > 30) {
    return { icon: "☀️", description: "Ensolarado" };
  }
  if (thermometerValue !== undefined && thermometerValue < 10) {
    return { icon: "❄️", description: "Frio" };
  }
  if (solarimeterValue !== undefined && solarimeterValue < 200) {
    return { icon: "☁️", description: "Nublado" };
  }
  if (solarimeterValue !== undefined && solarimeterValue >= 200 && solarimeterValue <= 600) {
    return { icon: "⛅", description: "Parcialmente Nublado" };
  }

  return { icon: "☀️", description: "Ensolarado" };
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

export function getWeatherInfoByCode(code: number | undefined): { icon: string; description: string } {
    if (code === undefined) return { icon: "🤷", description: "Desconhecido" };

    const weatherMap: Record<number, { icon: string; description: string }> = {
        0: { icon: "☀️", description: "Céu Limpo" },
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

  const { icon: weatherEmoji, description: weatherDescription } =
    getWeatherIconAndDescription(latestRecord?.sensors || []);

  const sensorReadings: SensorReading[] = latestRecord?.sensors.map((sensor) => {
    const displayInfo = sensorDisplayMap[sensor.type];
    const sensorValue = typeof sensor.value === 'string' ? parseFloat(sensor.value) : sensor.value;
    const sensorUnit = getUnitSymbol(sensor.unit);
    return {
      icon: displayInfo ? displayInfo.icon : Thermometer, // Fallback icon must be a LucideIcon
      value: sensorValue || 'N/A',
      unit: sensorUnit,
    };
  }) || [];

  // Find the temperature from the already processed sensorReadings
  const temperatureReading = sensorReadings.find(s => s.unit === '°C' && s.value !== 'N/A');
  const mainTemperatureValue = temperatureReading ? parseFloat(temperatureReading.value as string) : 'N/A';

  return {
    locationName: station.name,
    timestamp: latestRecord?.created_at ? format(new Date(latestRecord.created_at), "HH:mm:ss", { locale: ptBR }) : 'N/A',
    mainTemperature: mainTemperatureValue,
    mainWeatherIcon: weatherEmoji,
    mainWeatherDescription: weatherDescription,
    sensorReadings: sensorReadings,
  };
}

export function openMeteoToWeatherCardData(data: OpenMeteoForecastResponse, addressData?: ReverseGeocodingResponse): WeatherCardData {
    const { icon, description } = getWeatherInfoByCode(data.current_weather?.weathercode);
    
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
        timestamp: data.current_weather?.time ? format(new Date(data.current_weather.time), "HH:mm:ss", { locale: ptBR }) : 'N/A',
        mainTemperature: data.current_weather?.temperature || 0,
        mainWeatherIcon: icon,
        mainWeatherDescription: description,
        sensorReadings: [], // Open-Meteo data doesn't have the same sensor breakdown
    };
}
