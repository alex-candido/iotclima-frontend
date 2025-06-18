// src/hooks/use-logs.ts

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createLog, deleteLog, getLogById, getLogs, LogInput, partialUpdateLog, updateLog } from '@/actions/log-actions';
import { API_MESSAGES } from '@/data/messages';
import { Log, LogListResponse } from '@/types/log';


export const LOG_QUERY_KEYS = {
  LIST: 'logList',
  DETAIL: 'logDetail',
};

export function useLogs(params?: {
  page?: number;
  page_size?: number;
  [key: string]: unknown;
}) {
  const query = useQuery<LogListResponse, Error>({
    queryKey: [LOG_QUERY_KEYS.LIST, params],
    queryFn: () => getLogs(params),
    onError: (error: Error) => {
      console.error('Error fetching logs:', error);
      toast.error(API_MESSAGES.LOG.FETCH_ERROR);
    },
  } as UseQueryOptions<LogListResponse, Error>);
  return query;
}

export function useLog(id: number) {
  const query = useQuery<Log, Error>({
    queryKey: [LOG_QUERY_KEYS.DETAIL, id],
    queryFn: () => getLogById(id),
    enabled: !!id,
    onError: (error: Error) => {
      console.error(`Error fetching log ${id}:`, error);
      toast.error(API_MESSAGES.LOG.FETCH_ERROR);
    },
  } as UseQueryOptions<Log, Error>);
  return query;
}

export function useCreateLog() {
  const queryClient = useQueryClient();
  const mutation = useMutation<Log, Error, LogInput>({
    mutationFn: createLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LOG_QUERY_KEYS.LIST] });
      toast.success(API_MESSAGES.COMMON.CREATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error creating log:', error);
      toast.error(error.message || API_MESSAGES.LOG.CREATE_ERROR);
    },
  });
  return mutation;
}

export function useUpdateLog() {
  const queryClient = useQueryClient();
  const mutation = useMutation<Log, Error, { id: number; data: LogInput }>({
    mutationFn: ({ id, data }) => updateLog(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [LOG_QUERY_KEYS.LIST] });
      queryClient.invalidateQueries({ queryKey: [LOG_QUERY_KEYS.DETAIL, data.id] });
      toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error updating log:', error);
      toast.error(error.message || API_MESSAGES.LOG.UPDATE_ERROR);
    },
  });
  return mutation;
}

export function usePartialUpdateLog() {
  const queryClient = useQueryClient();
  const mutation = useMutation<Log, Error, { id: number; data: Partial<LogInput> }>({
    mutationFn: ({ id, data }) => partialUpdateLog(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [LOG_QUERY_KEYS.LIST] });
      queryClient.invalidateQueries({ queryKey: [LOG_QUERY_KEYS.DETAIL, data.id] });
      toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error partially updating log:', error);
      toast.error(error.message || API_MESSAGES.LOG.UPDATE_ERROR);
    },
  });
  return mutation;
}

export function useDeleteLog() {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, number>({
    mutationFn: deleteLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LOG_QUERY_KEYS.LIST] });
      toast.success(API_MESSAGES.COMMON.DELETE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error deleting log:', error);
      toast.error(error.message || API_MESSAGES.LOG.DELETE_ERROR);
    },
  });
  return mutation;
}
