// src/actions/station-sensor-actions.ts

import { API_CONTENT_TYPE } from '@/config/api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import api from '@/lib/api';
import { StationSensor, StationSensorListResponse } from '@/types/station-sensor';

export type StationSensorInput = {
  station_id: number;
  sensor_id: number;
  position?: string | null;
  installed_date?: string | null;
  removed_date?: string | null;
  is_active?: boolean;
  calibrated_at?: string | null;
};

export async function getStationSensors(params?: {
  page?: number;
  page_size?: number;
  [key: string]: unknown;
}): Promise<StationSensorListResponse> {
  const response = await api.get<StationSensorListResponse>(API_ENDPOINTS.STATION_SENSORS.LIST, { params });
  return response.data;
}

export async function createStationSensor(data: StationSensorInput): Promise<StationSensor> {
  const response = await api.post<StationSensor>(API_ENDPOINTS.STATION_SENSORS.CREATE, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function getStationSensorById(id: number | string): Promise<StationSensor> {
  const response = await api.get<StationSensor>(API_ENDPOINTS.STATION_SENSORS.DETAIL(id));
  return response.data;
}

export async function updateStationSensor(id: number | string, data: StationSensorInput): Promise<StationSensor> {
  const response = await api.put<StationSensor>(API_ENDPOINTS.STATION_SENSORS.UPDATE(id), data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function partialUpdateStationSensor(id: number | string, data: Partial<StationSensorInput>): Promise<StationSensor> {
  const response = await api.patch<StationSensor>(API_ENDPOINTS.STATION_SENSORS.PARTIAL_UPDATE(id), data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function deleteStationSensor(id: number | string): Promise<void> {
  await api.delete(API_ENDPOINTS.STATION_SENSORS.DELETE(id));
  return;
}
