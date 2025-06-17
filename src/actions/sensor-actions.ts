// src/actions/sensor-actions.ts

import { API_CONTENT_TYPE } from '@/config/api';
import api from '@/lib/api';
import { Sensor, SensorListResponse } from '@/types/sensor'; // Assuming types Sensor, SensorListResponse

export type SensorInput = {
  type: number; // SensorType enum value
  model: string;
  unit: number; // UnitType enum value
  min_value: number;
  max_value: number;
  status?: number; // SensorStatus enum value
  user?: number | null; // User ID
};

/**
 * Lists sensors with optional filtering and pagination.
 */
export async function getSensors(params?: {
  page?: number;
  page_size?: number;
  [key: string]: any;
}): Promise<SensorListResponse> {
  const response = await api.get<SensorListResponse>('/sensors/', { params });
  return response.data;
}

/**
 * Creates a new sensor.
 */
export async function createSensor(data: SensorInput): Promise<Sensor> {
  const response = await api.post<Sensor>('/sensors/', data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

/**
 * Retrieves a single sensor by its ID.
 */
export async function getSensorById(id: number): Promise<Sensor> {
  const response = await api.get<Sensor>(`/sensors/${id}/`);
  return response.data;
}

/**
 * Updates a sensor by its ID (full replacement).
 */
export async function updateSensor(id: number, data: SensorInput): Promise<Sensor> {
  const response = await api.put<Sensor>(`/sensors/${id}/`, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

/**
 * Partially updates a sensor by its ID.
 */
export async function partialUpdateSensor(id: number, data: Partial<SensorInput>): Promise<Sensor> {
  const response = await api.patch<Sensor>(`/sensors/${id}/`, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

/**
 * Deletes a sensor by ID (soft delete).
 */
export async function deleteSensor(id: number): Promise<void> {
  await api.delete(`/sensors/${id}/`);
  return;
}