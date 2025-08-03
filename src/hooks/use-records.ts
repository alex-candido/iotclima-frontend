// src/hooks/use-records.ts

import {
  useQuery,
  UseQueryOptions
} from "@tanstack/react-query";
import axios from 'axios';

import { API_BASE_URL } from "@/config/api";
import {
  getRecords,
} from "@/store/actions/record-actions";
import { Record, RecordListResponse } from "@/types/record";

export const RECORD_QUERY_KEYS = {
  LIST: "recordList",
  DETAIL: "recordDetail",
  LATEST: "latestRecord",
  STATION_RECORDS: "stationRecords"
};

export function useRecordList(params?: {
  page?: number;
  page_size?: number;
  customQueryKey?: string[];
  cacheTime?: number;
  [key: string]: unknown;
}) {
  const { customQueryKey, ...filters } = params || {};

  const queryKey = customQueryKey
    ? [...customQueryKey, filters]
    : [RECORD_QUERY_KEYS.LIST, filters];

  const query = useQuery<RecordListResponse, Error>({
    queryKey,
    queryFn: () => getRecords(filters),
    onError: (error: Error) => {
      console.error("Error fetching records:", error);
    },
  } as UseQueryOptions<RecordListResponse, Error>);
  return query;
}

export const useLatestRecord = (stationId: string) => {
  return useQuery<Record>({
    queryKey: [RECORD_QUERY_KEYS.LATEST, stationId],
    queryFn: async () => {
      const response = await axios.get<Record>(`${API_BASE_URL}/records/latest/?station_uuid=${stationId}`);
      return response.data;
    },
    refetchInterval: 5000, // Refetch every 30 seconds
    enabled: !!stationId, // Only run if stationId is provided
  });
};

export function useStationRecords(stationId: string | number) {
  return useQuery<RecordListResponse>({
    queryKey: [RECORD_QUERY_KEYS.STATION_RECORDS, stationId],
    queryFn: () => getRecords({ station__uuid: stationId, page_size: 50 }),
    enabled: !!stationId,
    staleTime: 5 * 60 * 1000, // Mantém os dados "frescos" por 5 minutos
  });
}