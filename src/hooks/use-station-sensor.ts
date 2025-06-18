// src/hooks/use-station-sensor.ts

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  createStationSensor,
  deleteStationSensor,
  getStationSensorById,
  getStationSensors,
  partialUpdateStationSensor,
  StationSensorInput,
  updateStationSensor
} from '@/actions/station-sensor-actions';
import { API_MESSAGES } from '@/data/messages';
import { StationSensor, StationSensorListResponse } from '@/types/station-sensor';


export const STATION_SENSOR_QUERY_KEYS = {
  LIST: 'stationSensorList',
  DETAIL: 'stationSensorDetail',
};

export function useStationSensors(params?: {
  page?: number;
  page_size?: number;
  station__id?: number;
  sensor__model__icontains?: string;
  is_active?: boolean;
  installed_date__gt?: string;
  [key: string]: unknown;
}) {
  const query = useQuery<StationSensorListResponse, Error>({
    queryKey: [STATION_SENSOR_QUERY_KEYS.LIST, params],
    queryFn: () => getStationSensors(params),
    onError: (error: Error) => {
      console.error('Error fetching station sensors:', error);
      toast.error(API_MESSAGES.STATION_SENSOR.FETCH_ERROR);
    },
  } as UseQueryOptions<StationSensorListResponse, Error>);
  return query;
}

export function useStationSensor(id: number) {
  const query = useQuery<StationSensor, Error>({
    queryKey: [STATION_SENSOR_QUERY_KEYS.DETAIL, id],
    queryFn: () => getStationSensorById(id),
    enabled: !!id,
    onError: (error: Error) => {
      console.error(`Error fetching station sensor ${id}:`, error);
      toast.error(API_MESSAGES.STATION_SENSOR.FETCH_ERROR);
    },
  } as UseQueryOptions<StationSensor, Error>);
  return query;
}

export function useCreateStationSensor() {
  const queryClient = useQueryClient();
  const mutation = useMutation<StationSensor, Error, StationSensorInput>({
    mutationFn: createStationSensor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STATION_SENSOR_QUERY_KEYS.LIST] });
      toast.success(API_MESSAGES.COMMON.CREATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error creating station sensor:', error);
      toast.error(error.message || API_MESSAGES.STATION_SENSOR.CREATE_ERROR);
    },
  });
  return mutation;
}

export function useUpdateStationSensor() {
  const queryClient = useQueryClient();
  const mutation = useMutation<StationSensor, Error, { id: number; data: StationSensorInput }>({
    mutationFn: ({ id, data }) => updateStationSensor(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [STATION_SENSOR_QUERY_KEYS.LIST] });
      queryClient.invalidateQueries({ queryKey: [STATION_SENSOR_QUERY_KEYS.DETAIL, data.id] });
      toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error updating station sensor:', error);
      toast.error(error.message || API_MESSAGES.STATION_SENSOR.UPDATE_ERROR);
    },
  });
  return mutation;
}

export function usePartialUpdateStationSensor() {
  const queryClient = useQueryClient();
  const mutation = useMutation<StationSensor, Error, { id: number; data: Partial<StationSensorInput> }>({
    mutationFn: ({ id, data }) => partialUpdateStationSensor(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [STATION_SENSOR_QUERY_KEYS.LIST] });
      queryClient.invalidateQueries({ queryKey: [STATION_SENSOR_QUERY_KEYS.DETAIL, data.id] });
      toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error partially updating station sensor:', error);
      toast.error(error.message || API_MESSAGES.STATION_SENSOR.UPDATE_ERROR);
    },
  });
  return mutation;
}

export function useDeleteStationSensor() {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, number>({
    mutationFn: deleteStationSensor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STATION_SENSOR_QUERY_KEYS.LIST] });
      toast.success(API_MESSAGES.COMMON.DELETE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error deleting station sensor:', error);
      toast.error(error.message || API_MESSAGES.STATION_SENSOR.DELETE_ERROR);
    },
  });
  return mutation;
}
