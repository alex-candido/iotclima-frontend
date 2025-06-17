// src/actions/station-actions.ts

import { API_CONTENT_TYPE } from '@/config/api';
import api from '@/lib/api';
import { Station, StationListResponse } from '@/types/station'; // Assuming types Station, StationListResponse

// Type for nested StationSensor data in input
export type StationSensorLinkInput = {
  sensor: number; // Sensor ID
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

  status?: number; // StationStatus enum value

  place: number; // Place ID
  user?: number | null; // User ID

  sensors_data?: StationSensorLinkInput[]; // Nested data for M2M sensors
};

/**
 * Lists stations with optional filtering and pagination.
 */
export async function getStations(params?: {
  page?: number;
  page_size?: number;
  [key: string]: any; // Allow any other filter parameters (including related sensors/places)
}): Promise<StationListResponse> {
  const response = await api.get<StationListResponse>('/stations/', { params });
  return response.data;
}

/**
 * Creates a new station.
 */
export async function createStation(data: StationInput): Promise<Station> {
  const response = await api.post<Station>('/stations/', data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

/**
 * Retrieves a single station by its ID.
 */
export async function getStationById(id: number): Promise<Station> {
  const response = await api.get<Station>(`/stations/${id}/`);
  return response.data;
}

/**
 * Updates a station by its ID (full replacement).
 */
export async function updateStation(id: number, data: StationInput): Promise<Station> {
  const response = await api.put<Station>(`/stations/${id}/`, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

/**
 * Partially updates a station by its ID.
 */
export async function partialUpdateStation(id: number, data: Partial<StationInput>): Promise<Station> {
  const response = await api.patch<Station>(`/stations/${id}/`, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

/**
 * Deletes a station by ID (soft delete).
 */
export async function deleteStation(id: number): Promise<void> {
  await api.delete(`/stations/${id}/`);
  return;
}