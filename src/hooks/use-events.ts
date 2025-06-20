// src/hooks/use-events.ts

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createEvent, deleteEvent, EventInput, getEventById, getEvents, partialUpdateEvent, updateEvent } from '@/actions/event-actions';
import { API_MESSAGES } from '@/data/messages';
import { AppEventListResponse } from '@/types/app-event';


export const EVENT_QUERY_KEYS = {
  LIST: 'eventList',
  DETAIL: 'eventDetail',
};

export function useEvents(params?: {
  page?: number;
  page_size?: number;
  [key: string]: unknown;
}) {
  const query = useQuery<AppEventListResponse, Error>({
    queryKey: [EVENT_QUERY_KEYS.LIST, params],
    queryFn: () => getEvents(params),
    onError: (error: Error) => {
      console.error('Error fetching events:', error);
      toast.error(API_MESSAGES.EVENT.FETCH_ERROR);
    },
  } as UseQueryOptions<AppEventListResponse, Error>);
  return query;
}

export function useEvent(id: number) {
  const query = useQuery<Event, Error>({
    queryKey: [EVENT_QUERY_KEYS.DETAIL, id],
    queryFn: () => getEventById(id),
    enabled: !!id,
    onError: (error: Error) => {
      console.error(`Error fetching event ${id}:`, error);
      toast.error(API_MESSAGES.EVENT.FETCH_ERROR);
    },
  } as UseQueryOptions<Event, Error>);

  return query;
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  const mutation = useMutation<Event, Error, EventInput>({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EVENT_QUERY_KEYS.LIST] });
      toast.success(API_MESSAGES.COMMON.CREATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error creating event:', error);
      toast.error(error.message || API_MESSAGES.EVENT.CREATE_ERROR);
    },
  });
  return mutation;
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();
  const mutation = useMutation<Event, Error, { id: number; data: EventInput }>({
    mutationFn: ({ id, data }) => updateEvent(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [EVENT_QUERY_KEYS.LIST] });
      queryClient.invalidateQueries({ queryKey: [EVENT_QUERY_KEYS.DETAIL, data.id] });
      toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error updating event:', error);
      toast.error(error.message || API_MESSAGES.EVENT.UPDATE_ERROR);
    },
  });
  return mutation;
}

export function usePartialUpdateEvent() {
  const queryClient = useQueryClient();
  const mutation = useMutation<Event, Error, { id: number; data: Partial<EventInput> }>({
    mutationFn: ({ id, data }) => partialUpdateEvent(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [EVENT_QUERY_KEYS.LIST] });
      queryClient.invalidateQueries({ queryKey: [EVENT_QUERY_KEYS.DETAIL, data.id] });
      toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error partially updating event:', error);
      toast.error(error.message || API_MESSAGES.EVENT.UPDATE_ERROR);
    },
  });
  return mutation;
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, number>({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EVENT_QUERY_KEYS.LIST] });
      toast.success(API_MESSAGES.COMMON.DELETE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error deleting event:', error);
      toast.error(error.message || API_MESSAGES.EVENT.DELETE_ERROR);
    },
  });
  return mutation;
}
