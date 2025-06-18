// src/actions/station-actions.ts

import { API_CONTENT_TYPE } from '@/config/api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import api from '@/lib/api';
import { Station, StationListResponse } from '@/types/station';

export type StationSensorLinkInput = {
  sensor: number;
  position?: string | null;
  installed_date?: string | null;
  removed_date?: string | null;
  is_active?: boolean;
  calibrated_at?: string | null;
};

export type StationInput = {
  name: string;
  description?: string;
  model: string;
  firmware?: string | null;

  installed_at?: string | null;
  last_maintenance_at?: string | null;
  next_maintenance_at?: string | null;

  battery_level?: number | null;
  signal_strength?: number | null;

  status?: number;

  place: number;
  user?: number | null;

  sensors_data?: StationSensorLinkInput[];
};

export async function getStations(params?: {
  page?: number;
  page_size?: number;
  [key: string]: unknown;
}): Promise<StationListResponse> {
  const response = await api.get<StationListResponse>(API_ENDPOINTS.STATIONS.LIST, { params });
  return response.data;
}

export async function createStation(data: StationInput): Promise<Station> {
  const response = await api.post<Station>(API_ENDPOINTS.STATIONS.CREATE, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function getStationById(id: number): Promise<Station> {
  const response = await api.get<Station>(API_ENDPOINTS.STATIONS.DETAIL(id));
  return response.data;
}

export async function updateStation(id: number, data: StationInput): Promise<Station> {
  const response = await api.put<Station>(API_ENDPOINTS.STATIONS.UPDATE(id), data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function partialUpdateStation(id: number, data: Partial<StationInput>): Promise<Station> {
  const response = await api.patch<Station>(API_ENDPOINTS.STATIONS.PARTIAL_UPDATE(id), data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function deleteStation(id: number): Promise<void> {
  await api.delete(API_ENDPOINTS.STATIONS.DELETE(id));
  return;
}
