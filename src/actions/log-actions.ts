// src/actions/log-actions.ts

import { API_CONTENT_TYPE } from '@/config/api';
import api from '@/lib/api';
import { Log, LogListResponse, LogMetadata } from '@/types/log'; 

export type LogInput = {
  message: string;
  level: number; 
  metadata?: LogMetadata | null; 
  user?: number | null; 
  station?: number | null; 
};

export async function getLogs(params?: {
  page?: number;
  page_size?: number;
  [key: string]: unknown;
}): Promise<LogListResponse> {
  const response = await api.get<LogListResponse>('/logs/', { params });
  return response.data;
}

export async function createLog(data: LogInput): Promise<Log> {
  const response = await api.post<Log>('/logs/', data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function getLogById(id: number): Promise<Log> {
  const response = await api.get<Log>(`/logs/${id}/`);
  return response.data;
}

export async function updateLog(id: number, data: LogInput): Promise<Log> {
  const response = await api.put<Log>(`/logs/${id}/`, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function partialUpdateLog(id: number, data: Partial<LogInput>): Promise<Log> {
  const response = await api.patch<Log>(`/logs/${id}/`, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function deleteLog(id: number): Promise<void> {
  await api.delete(`/logs/${id}/`);
  return;
}