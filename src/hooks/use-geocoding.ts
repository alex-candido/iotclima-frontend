// src/hooks/use-geocoding.ts

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import {
  getReverseGeocoding,
  ReverseGeocodingResponse,
} from '@/store/actions/geocoding-actions';

export const GEOCODING_QUERY_KEYS = {
  REVERSE: 'reverseGeocoding',
};

export function useReverseGeocoding(
  latitude: number | undefined,
  longitude: number | undefined,
  queryOptions?: Omit<UseQueryOptions<ReverseGeocodingResponse, Error>, 'queryKey' | 'queryFn'>
) {
  const query = useQuery<ReverseGeocodingResponse, Error>({
    queryKey: [GEOCODING_QUERY_KEYS.REVERSE, latitude, longitude],
    queryFn: () => {
      if (latitude === undefined || longitude === undefined) {
        throw new Error("Latitude and Longitude must be provided.");
      }
      return getReverseGeocoding(latitude, longitude);
    },
    enabled: latitude !== undefined && longitude !== undefined,
    ...queryOptions,
  });
  return query;
}