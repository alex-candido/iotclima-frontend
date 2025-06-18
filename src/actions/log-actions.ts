// src/actions/log-actions.ts

import { API_CONTENT_TYPE } from '@/config/api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
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
  const response = await api.get<LogListResponse>(API_ENDPOINTS.LOGS.LIST, { params });
  return response.data;
}

export async function createLog(data: LogInput): Promise<Log> {
  const response = await api.post<Log>(API_ENDPOINTS.LOGS.CREATE, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function getLogById(id: number): Promise<Log> {
  const response = await api.get<Log>(API_ENDPOINTS.LOGS.DETAIL(id));
  return response.data;
}

export async function updateLog(id: number, data: LogInput): Promise<Log> {
  const response = await api.put<Log>(API_ENDPOINTS.LOGS.UPDATE(id), data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function partialUpdateLog(id: number, data: Partial<LogInput>): Promise<Log> {
  const response = await api.patch<Log>(API_ENDPOINTS.LOGS.PARTIAL_UPDATE(id), data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function deleteLog(id: number): Promise<void> {
  await api.delete(API_ENDPOINTS.LOGS.DELETE(id));
  return;
}
