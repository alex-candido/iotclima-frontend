// src/hooks/use-stations.ts

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createStation, deleteStation, getStationById, getStations, partialUpdateStation, StationInput, updateStation } from '@/actions/station-actions';
import { API_MESSAGES } from '@/data/ui-content';
import { Station, StationListResponse } from '@/types/station';



export const STATION_QUERY_KEYS = {
  LIST: 'stationList',
  DETAIL: 'stationDetail',
};

export function useStations(params?: {
  page?: number;
  page_size?: number;
  [key: string]: unknown;
}) {
  const query = useQuery<StationListResponse, Error>({
    queryKey: [STATION_QUERY_KEYS.LIST, params],
    queryFn: () => getStations(params),
    onError: (error: Error) => {
      console.error('Error fetching stations:', error);
      toast.error(API_MESSAGES.STATION.FETCH_ERROR);
    },
  } as UseQueryOptions<StationListResponse, Error>);
  return query;
}

export function useStation(id: number) {
  const query = useQuery<Station, Error>({
    queryKey: [STATION_QUERY_KEYS.DETAIL, id],
    queryFn: () => getStationById(id),
    enabled: !!id,
    onError: (error: Error) => {
      console.error(`Error fetching station ${id}:`, error);
      toast.error(API_MESSAGES.STATION.FETCH_ERROR);
    },
  } as UseQueryOptions<Station, Error>);
  return query;
}

export function useCreateStation() {
  const queryClient = useQueryClient();
  const mutation = useMutation<Station, Error, StationInput>({
    mutationFn: createStation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STATION_QUERY_KEYS.LIST] });
      toast.success(API_MESSAGES.COMMON.CREATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error creating station:', error);
      toast.error(error.message || API_MESSAGES.STATION.CREATE_ERROR);
    },
  });
  return mutation;
}

export function useUpdateStation() {
  const queryClient = useQueryClient();
  const mutation = useMutation<Station, Error, { id: number; data: StationInput }>({
    mutationFn: ({ id, data }) => updateStation(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [STATION_QUERY_KEYS.LIST] });
      queryClient.invalidateQueries({ queryKey: [STATION_QUERY_KEYS.DETAIL, data.id] });
      toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error updating station:', error);
      toast.error(error.message || API_MESSAGES.STATION.UPDATE_ERROR);
    },
  });
  return mutation;
}

export function usePartialUpdateStation() {
  const queryClient = useQueryClient();
  const mutation = useMutation<Station, Error, { id: number; data: Partial<StationInput> }>({
    mutationFn: ({ id, data }) => partialUpdateStation(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [STATION_QUERY_KEYS.LIST] });
      queryClient.invalidateQueries({ queryKey: [STATION_QUERY_KEYS.DETAIL, data.id] });
      toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error partially updating station:', error);
      toast.error(error.message || API_MESSAGES.STATION.UPDATE_ERROR);
    },
  });
  return mutation;
}

export function useDeleteStation() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deleteStation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STATION_QUERY_KEYS.LIST] });
      toast.success(API_MESSAGES.COMMON.DELETE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error deleting station:', error);
      toast.error(error.message || API_MESSAGES.STATION.DELETE_ERROR);
    },
  });
}