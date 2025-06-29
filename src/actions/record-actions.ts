// src/actions/record-actions.ts

import { API_CONTENT_TYPE } from '@/config/api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import api from '@/lib/api';
import { Record, RecordListResponse } from '@/types/record';

export type RecordInput = {
  recorded_at: string;
  temperature?: number | null;
  humidity?: number | null;
  wind_speed?: number | null;
  wind_direction?: number | null;
  pressure?: number | null;
  rainfall?: number | null;

  status?: number;

  station: number;
};

export async function getRecords(params?: {
  page?: number;
  page_size?: number;
  [key: string]: unknown;
}): Promise<RecordListResponse> {
  const response = await api.get<RecordListResponse>(API_ENDPOINTS.RECORDS.LIST, { params });
  return response.data;
}

export async function createRecord(data: RecordInput): Promise<Record> {
  const response = await api.post<Record>(API_ENDPOINTS.RECORDS.CREATE, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function getRecordById(id: number): Promise<Record> {
  const response = await api.get<Record>(API_ENDPOINTS.RECORDS.DETAIL(id));
  return response.data;
}

export async function updateRecord(id: number, data: RecordInput): Promise<Record> {
  const response = await api.put<Record>(API_ENDPOINTS.RECORDS.UPDATE(id), data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function partialUpdateRecord(id: number, data: Partial<RecordInput>): Promise<Record> {
  const response = await api.patch<Record>(API_ENDPOINTS.RECORDS.PARTIAL_UPDATE(id), data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function deleteRecord(id: number): Promise<void> {
  await api.delete(API_ENDPOINTS.RECORDS.DELETE(id));
  return;
}
