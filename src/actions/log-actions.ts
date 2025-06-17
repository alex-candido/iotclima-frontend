// src/actions/log-actions.ts

import { API_CONTENT_TYPE } from '@/config/api';
import api from '@/lib/api';
import { Log, LogListResponse, LogMetadata } from '@/types/log'; // Assumindo tipos Log, LogListResponse, LogMetadata

export type LogInput = {
  message: string;
  level: number; // LogSeverity enum value (number)
  metadata?: LogMetadata | null; // JSON object
  user?: number | null; // User ID
  station?: number | null; // Station ID
};

/**
 * Lists logs with optional filtering and pagination.
 */
export async function getLogs(params?: {
  page?: number;
  page_size?: number;
  [key: string]: any;
}): Promise<LogListResponse> {
  const response = await api.get<LogListResponse>('/logs/', { params });
  return response.data;
}

/**
 * Creates a new log entry.
 */
export async function createLog(data: LogInput): Promise<Log> {
  const response = await api.post<Log>('/logs/', data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

/**
 * Retrieves a single log by its ID.
 */
export async function getLogById(id: number): Promise<Log> {
  const response = await api.get<Log>(`/logs/${id}/`);
  return response.data;
}

/**
 * Updates a log by its ID (full replacement).
 */
export async function updateLog(id: number, data: LogInput): Promise<Log> {
  const response = await api.put<Log>(`/logs/${id}/`, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

/**
 * Partially updates a log by its ID.
 */
export async function partialUpdateLog(id: number, data: Partial<LogInput>): Promise<Log> {
  const response = await api.patch<Log>(`/logs/${id}/`, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

/**
 * Deletes a log by its ID (hard delete).
 */
export async function deleteLog(id: number): Promise<void> {
  await api.delete(`/logs/${id}/`);
  return;
}