// src/hooks/use-stations.ts

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { getStations } from '@/store/actions/station-actions';
import { StationListResponse } from '@/types/station';

export const STATION_QUERY_KEYS = {
  LIST: 'stationList',
  DETAIL: 'stationDetail',
};

export function useStations(params?: {
  page?: number;
  page_size?: number;
  customQueryKey?: string[];
  cacheTime?: number;
  [key: string]: unknown;
}) {
    const { customQueryKey, ...filters } = params || {};
  
    const queryKey = customQueryKey
      ? [...customQueryKey, filters]
      : [STATION_QUERY_KEYS.LIST, filters];

  const query = useQuery<StationListResponse, Error>({
    queryKey,
    queryFn: () => getStations(filters),
    cacheTime: params?.cacheTime || 1000 * 60 * 5,
    onError: (error: Error) => {
      console.error('Error fetching stations:', error);
    },
  } as UseQueryOptions<StationListResponse, Error>);
  return query;
}