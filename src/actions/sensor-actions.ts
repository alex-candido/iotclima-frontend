// src/actions/sensor-actions.ts

import { API_CONTENT_TYPE } from '@/config/api';
import api from '@/lib/api';
import { Sensor, SensorListResponse } from '@/types/sensor';

export type SensorInput = {
  type: number; 
  model: string;
  unit: number; 
  min_value: number;
  max_value: number;
  status?: number; 
  user?: number | null; 
};

export async function getSensors(params?: {
  page?: number;
  page_size?: number;
  [key: string]: unknown;
}): Promise<SensorListResponse> {
  const response = await api.get<SensorListResponse>('/sensors/', { params });
  return response.data;
}

export async function createSensor(data: SensorInput): Promise<Sensor> {
  const response = await api.post<Sensor>('/sensors/', data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function getSensorById(id: number): Promise<Sensor> {
  const response = await api.get<Sensor>(`/sensors/${id}/`);
  return response.data;
}

export async function updateSensor(id: number, data: SensorInput): Promise<Sensor> {
  const response = await api.put<Sensor>(`/sensors/${id}/`, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function partialUpdateSensor(id: number, data: Partial<SensorInput>): Promise<Sensor> {
  const response = await api.patch<Sensor>(`/sensors/${id}/`, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function deleteSensor(id: number): Promise<void> {
  await api.delete(`/sensors/${id}/`);
  return;
}