// src/store/actions/open-meteo-actions.ts
import api from '@/lib/api';

export type CurrentWeather = {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
};

export type HourlyData = {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  wind_speed_10m: number[];
  precipitation: number[];
};

export type DailyData = {
  time: string[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
};

export type OpenMeteoForecastResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather?: CurrentWeather;
  hourly_units?: {
    time: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
    precipitation: string;
  };
  hourly?: HourlyData;
  daily_units?: {
    time: string;
    weathercode: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    precipitation_sum: string;
  };
  daily?: DailyData;
};

export async function getOpenMeteoForecast(
  latitude: number,
  longitude: number,
  options?: {
    current_weather?: boolean;
    hourly?: string[];
    daily?: string[];
    timezone?: string;
    past_days?: number;
    forecast_days?: number;
    start_date?: string;
    end_date?: string;
  }
): Promise<OpenMeteoForecastResponse> {
  const params: Record<string, any> = {
    latitude: latitude,
    longitude: longitude,
    ...options,
  };

  if (params.hourly) params.hourly = params.hourly.join(',');
  if (params.daily) params.daily = params.daily.join(',');

  const response = await api.get<OpenMeteoForecastResponse>(
    'https://api.open-meteo.com/v1/forecast',
    { params: params }
  );
  return response.data;
}