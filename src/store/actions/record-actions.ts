// src/store/actions/record-actions.ts


import { API_ENDPOINTS } from '@/data/endpoints';
import api from '@/lib/api';
import { RecordListResponse } from '@/types/record';

export async function getRecords(params?: {
  page?: number;
  page_size?: number;
  [key: string]: unknown;
}): Promise<RecordListResponse> {
  const response = await api.get<RecordListResponse>(API_ENDPOINTS.RECORDS.LIST, { params });
  return response.data;
}
