// src/hooks/use-sensors.ts

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createSensor, deleteSensor, getSensorById, getSensors, partialUpdateSensor, SensorInput, updateSensor } from '@/actions/sensor-actions';
import { API_MESSAGES } from '@/data/messages';
import { Sensor, SensorListResponse } from '@/types/sensor';


export const SENSOR_QUERY_KEYS = {
  LIST: 'sensorList',
  DETAIL: 'sensorDetail',
};

export function useSensors(params?: {
  page?: number;
  page_size?: number;
  customQueryKey?: string[];
  cacheTime?: number;
  [key: string]: unknown;
}) {
  const { customQueryKey, ...filters } = params || {};
    
  const queryKey = customQueryKey
    ? [...customQueryKey, filters]
    : [SENSOR_QUERY_KEYS.LIST, filters];

  const query = useQuery<SensorListResponse, Error>({
    queryKey,
    queryFn: () => getSensors(filters),
    cacheTime: params?.cacheTime || 1000 * 60 * 5,
    onError: (error: Error) => {
      console.error('Error fetching sensors:', error);
      toast.error(API_MESSAGES.SENSOR.FETCH_ERROR);
    },
  } as UseQueryOptions<SensorListResponse, Error>);
  return query;
}

export function useSensor(id: number | string) {
  const query = useQuery<Sensor, Error>({
    queryKey: [SENSOR_QUERY_KEYS.DETAIL, id],
    queryFn: () => getSensorById(id),
    enabled: !!id,
    onError: (error: Error) => {
      console.error(`Error fetching sensor ${id}:`, error);
      toast.error(API_MESSAGES.SENSOR.FETCH_ERROR);
    },
  } as UseQueryOptions<Sensor, Error>);
  return query;
}

export function useCreateSensor() {
  const queryClient = useQueryClient();
  const mutation = useMutation<Sensor, Error, SensorInput>({
    mutationFn: createSensor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SENSOR_QUERY_KEYS.LIST] });
      toast.success(API_MESSAGES.COMMON.CREATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error creating sensor:', error);
      toast.error(error.message || API_MESSAGES.SENSOR.CREATE_ERROR);
    },
  });
  return mutation;
}

export function useUpdateSensor() {
  const queryClient = useQueryClient();
  const mutation = useMutation<Sensor, Error, { id: number; data: SensorInput }>({
    mutationFn: ({ id, data }) => updateSensor(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [SENSOR_QUERY_KEYS.LIST] });
      queryClient.invalidateQueries({ queryKey: [SENSOR_QUERY_KEYS.DETAIL, data.id] });
      toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error updating sensor:', error);
      toast.error(error.message || API_MESSAGES.SENSOR.UPDATE_ERROR);
    },
  });
  return mutation;
}

export function usePartialUpdateSensor() {
  const queryClient = useQueryClient();
  const mutation = useMutation<Sensor, Error, { id: number; data: Partial<SensorInput> }>({
    mutationFn: ({ id, data }) => partialUpdateSensor(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [SENSOR_QUERY_KEYS.LIST] });
      queryClient.invalidateQueries({ queryKey: [SENSOR_QUERY_KEYS.DETAIL, data.id] });
      toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error partially updating sensor:', error);
      toast.error(error.message || API_MESSAGES.SENSOR.UPDATE_ERROR);
    },
  });
  return mutation;
}

export function useDeleteSensor() {
  const queryClient = useQueryClient();
  const  mutation = useMutation<void, Error, number>({
    mutationFn: deleteSensor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SENSOR_QUERY_KEYS.LIST] });
      toast.success(API_MESSAGES.COMMON.DELETE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error deleting sensor:', error);
      toast.error(error.message || API_MESSAGES.SENSOR.DELETE_ERROR);
    },
  });
  return mutation;
}
