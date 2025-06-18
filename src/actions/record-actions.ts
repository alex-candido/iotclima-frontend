// src/actions/record-actions.ts

import { API_CONTENT_TYPE } from '@/config/api';
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
  const response = await api.get<RecordListResponse>('/records/', { params });
  return response.data;
}

export async function createRecord(data: RecordInput): Promise<Record> {
  const response = await api.post<Record>('/records/', data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function getRecordById(id: number): Promise<Record> {
  const response = await api.get<Record>(`/records/${id}/`);
  return response.data;
}

export async function updateRecord(id: number, data: RecordInput): Promise<Record> {
  const response = await api.put<Record>(`/records/${id}/`, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function partialUpdateRecord(id: number, data: Partial<RecordInput>): Promise<Record> {
  const response = await api.patch<Record>(`/records/${id}/`, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function deleteRecord(id: number): Promise<void> {
  await api.delete(`/records/${id}/`);
  return;
}