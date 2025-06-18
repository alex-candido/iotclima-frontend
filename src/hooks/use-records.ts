// src/hooks/use-records.ts

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createRecord, deleteRecord, getRecordById, getRecords, partialUpdateRecord, RecordInput, updateRecord } from '@/actions/record-actions';
import { API_MESSAGES } from '@/data/ui-content';
import { Record, RecordListResponse } from '@/types/record';


export const RECORD_QUERY_KEYS = {
  LIST: 'recordList',
  DETAIL: 'recordDetail',
};

export function useRecords(params?: {
  page?: number;
  page_size?: number;
  [key: string]: unknown;
}) {
  const query = useQuery<RecordListResponse, Error>({
    queryKey: [RECORD_QUERY_KEYS.LIST, params],
    queryFn: () => getRecords(params),
    onError: (error: Error) => {
      console.error('Error fetching records:', error);
      toast.error(API_MESSAGES.RECORDS.FETCH_ERROR);
    },
  } as UseQueryOptions<RecordListResponse, Error>);
  return query;
}

export function useRecord(id: number) {
  const query = useQuery<Record, Error>({
    queryKey: [RECORD_QUERY_KEYS.DETAIL, id],
    queryFn: () => getRecordById(id),
    enabled: !!id,
    onError: (error: Error) => {
      console.error(`Error fetching record ${id}:`, error);
      toast.error(API_MESSAGES.RECORDS.FETCH_ERROR);
    },
  } as UseQueryOptions<Record, Error>);
  return query;
}

export function useCreateRecord() {
  const queryClient = useQueryClient();
  const mutation = useMutation<Record, Error, RecordInput>({
    mutationFn: createRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RECORD_QUERY_KEYS.LIST] });
      toast.success(API_MESSAGES.COMMON.CREATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error creating record:', error);
      toast.error(error.message || API_MESSAGES.RECORDS.CREATE_ERROR);
    },
  });
  return mutation;
}

export function useUpdateRecord() {
  const queryClient = useQueryClient();
  const mutation = useMutation<Record, Error, { id: number; data: RecordInput }>({
    mutationFn: ({ id, data }) => updateRecord(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [RECORD_QUERY_KEYS.LIST] });
      queryClient.invalidateQueries({ queryKey: [RECORD_QUERY_KEYS.DETAIL, data.id] });
      toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error updating record:', error);
      toast.error(error.message || API_MESSAGES.RECORDS.UPDATE_ERROR);
    },
  });
  return mutation;
}

export function usePartialUpdateRecord() {
  const queryClient = useQueryClient();
  const mutation = useMutation<Record, Error, { id: number; data: Partial<RecordInput> }>({
    mutationFn: ({ id, data }) => partialUpdateRecord(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [RECORD_QUERY_KEYS.LIST] });
      queryClient.invalidateQueries({ queryKey: [RECORD_QUERY_KEYS.DETAIL, data.id] });
      toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error partially updating record:', error);
      toast.error(error.message || API_MESSAGES.RECORDS.UPDATE_ERROR);
    },
  });
  return mutation;
}

export function useDeleteRecord() {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, number>({
    mutationFn: deleteRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RECORD_QUERY_KEYS.LIST] });
      toast.success(API_MESSAGES.COMMON.DELETE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error deleting record:', error);
      toast.error(error.message || API_MESSAGES.RECORDS.DELETE_ERROR);
    },
  });
  return mutation;
}