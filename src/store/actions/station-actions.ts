// src/store/actions/station-actions.ts

import { API_ENDPOINTS } from '@/data/endpoints';
import api from '@/lib/api';
import { StationListResponse } from '@/types/station';

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
