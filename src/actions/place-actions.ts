// src/actions/place-actions.ts

import { API_CONTENT_TYPE } from '@/config/api';
import api from '@/lib/api';
import { Place, PlaceListResponse } from '@/types/place'; // Assuming types Place, PlaceListResponse

export type PlaceInput = {
  name: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  
  latitude: number; // Number for coordinates
  longitude: number; // Number for coordinates

  status?: number; // PlaceStatus enum value (number)
  type?: number; // PlaceType enum value (number)
  
  user?: number | null; // User ID (PrimaryKeyRelatedField)
};

/**
 * Lists places with optional filtering and pagination.
 */
export async function getPlaces(params?: {
  page?: number;
  page_size?: number;
  [key: string]: any; // Allow any other filter parameters (including geospatial)
}): Promise<PlaceListResponse> {
  const response = await api.get<PlaceListResponse>('/places/', { params });
  return response.data;
}

/**
 * Creates a new place.
 */
export async function createPlace(data: PlaceInput): Promise<Place> {
  const response = await api.post<Place>('/places/', data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

/**
 * Retrieves a single place by its ID.
 */
export async function getPlaceById(id: number): Promise<Place> {
  const response = await api.get<Place>(`/places/${id}/`);
  return response.data;
}

/**
 * Updates a place by its ID (full replacement).
 */
export async function updatePlace(id: number, data: PlaceInput): Promise<Place> {
  const response = await api.put<Place>(`/places/${id}/`, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

/**
 * Partially updates a place by its ID.
 */
export async function partialUpdatePlace(id: number, data: Partial<PlaceInput>): Promise<Place> {
  const response = await api.patch<Place>(`/places/${id}/`, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

/**
 * Deletes a place by ID (soft delete).
 */
export async function deletePlace(id: number): Promise<void> {
  await api.delete(`/places/${id}/`);
  return;
}