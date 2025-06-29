// src/hooks/use-places.ts

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createPlace, deletePlace, getPlaceById, getPlaces, partialUpdatePlace, PlaceInput, updatePlace } from '@/actions/place-actions';
import { API_MESSAGES } from '@/data/messages';
import { Place, PlaceListResponse } from '@/types/place';


export const PLACE_QUERY_KEYS = {
  LIST: 'placeList',
  DETAIL: 'placeDetail',
};

export function usePlaces(params?: {
  page?: number;
  page_size?: number;
  customQueryKey?: string[];
  cacheTime?: number;
  [key: string]: unknown;
}) {
  const { customQueryKey, ...filters } = params || {};

  const queryKey = customQueryKey
    ? [...customQueryKey, filters]
    : [PLACE_QUERY_KEYS.LIST, filters];

  const query = useQuery<PlaceListResponse, Error>({
    queryKey,
    queryFn: () => getPlaces(filters),
    cacheTime: params?.cacheTime || 1000 * 60 * 5,
    onError: (error: Error) => {
      console.error('Error fetching places:', error);
      toast.error(API_MESSAGES.PLACE.FETCH_ERROR);
    },
  } as UseQueryOptions<PlaceListResponse, Error>);
  return query;
}

export function usePlace(id: number | string) {
  const query = useQuery<Place, Error>({
    queryKey: [PLACE_QUERY_KEYS.DETAIL, id],
    queryFn: () => getPlaceById(id),
    enabled: !!id,
    onError: (error: Error) => {
      console.error(`Error fetching place ${id}:`, error);
      toast.error(API_MESSAGES.PLACE.FETCH_ERROR);
    },
  } as UseQueryOptions<Place, Error>);
  return query;
}

export function useCreatePlace() {
  const queryClient = useQueryClient();
  const mutation = useMutation<Place, Error, PlaceInput>({
    mutationFn: createPlace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLACE_QUERY_KEYS.LIST] });
      toast.success(API_MESSAGES.COMMON.CREATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error creating place:', error);
      toast.error(error.message || API_MESSAGES.PLACE.CREATE_ERROR);
    },
  });
  return mutation;
}

export function useUpdatePlace() {
  const queryClient = useQueryClient();
  const mutation = useMutation<Place, Error, { id: number; data: PlaceInput }>({
    mutationFn: ({ id, data }) => updatePlace(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [PLACE_QUERY_KEYS.LIST] });
      queryClient.invalidateQueries({ queryKey: [PLACE_QUERY_KEYS.DETAIL, data.id] });
      toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error updating place:', error);
      toast.error(error.message || API_MESSAGES.PLACE.UPDATE_ERROR);
    },
  });
  return mutation;
}

export function usePartialUpdatePlace() {
  const queryClient = useQueryClient();
  const mutation = useMutation<Place, Error, { id: number; data: Partial<PlaceInput> }>({
    mutationFn: ({ id, data }) => partialUpdatePlace(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [PLACE_QUERY_KEYS.LIST] });
      queryClient.invalidateQueries({ queryKey: [PLACE_QUERY_KEYS.DETAIL, data.id] });
      toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error partially updating place:', error);
      toast.error(error.message || API_MESSAGES.PLACE.UPDATE_ERROR);
    },
  });
  return mutation;
}

export function useDeletePlace() {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, number>({
    mutationFn: deletePlace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLACE_QUERY_KEYS.LIST] });
      toast.success(API_MESSAGES.COMMON.DELETE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error deleting place:', error);
      toast.error(error.message || API_MESSAGES.PLACE.DELETE_ERROR);
    },
  });
  return mutation
}
