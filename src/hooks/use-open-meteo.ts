// src/hooks/use-open-meteo.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { getOpenMeteoForecast, OpenMeteoForecastResponse } from '@/store/actions/open-meteo-actions';

export const OPEN_METEO_QUERY_KEYS = {
  FORECAST: 'openMeteoForecast',
};

export function useOpenMeteoForecast(
  latitude: number | undefined,
  longitude: number | undefined,
  apiOptions?: {
    current_weather?: boolean;
    hourly?: string[];
    daily?: string[];
    timezone?: string;
    past_days?: number;
    forecast_days?: number;
    start_date?: string;
    end_date?: string;
  },
  queryOptions?: Omit<UseQueryOptions<OpenMeteoForecastResponse, Error>, 'queryKey' | 'queryFn'>
) {
  const query = useQuery<OpenMeteoForecastResponse, Error>({
    queryKey: [OPEN_METEO_QUERY_KEYS.FORECAST, latitude, longitude, apiOptions],
    queryFn: () => {
      if (latitude === undefined || longitude === undefined) {
        throw new Error("Latitude and Longitude must be provided.");
      }
      return getOpenMeteoForecast(latitude, longitude, apiOptions);
    },
    enabled: latitude !== undefined && longitude !== undefined,
    ...queryOptions,
  });
  return query;
}