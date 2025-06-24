// src/actions/place-actions.ts

import { API_CONTENT_TYPE } from '@/config/api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import api from '@/lib/api';
import { Place, PlaceListResponse } from '@/types/place';

export type PlaceInput = {
  name: string;
  description?: string | null;
  address: string;
  city: string;
  state: string;
  country: string;

  latitude: number;
  longitude: number;

  status?: number | string;
  type?: number | string;

  user?: number | null;
};

export async function getPlaces(params?: {
  page?: number;
  page_size?: number;
  [key: string]: unknown;
}): Promise<PlaceListResponse> {
  const response = await api.get<PlaceListResponse>(API_ENDPOINTS.PLACES.LIST, { params });
  return response.data;
}

export async function createPlace(data: PlaceInput): Promise<Place> {
  const response = await api.post<Place>(API_ENDPOINTS.PLACES.CREATE, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function getPlaceById(id: number | string): Promise<Place> {
  const response = await api.get<Place>(API_ENDPOINTS.PLACES.DETAIL(id));
  return response.data;
}

export async function updatePlace(id: number, data: PlaceInput): Promise<Place> {
  const response = await api.put<Place>(API_ENDPOINTS.PLACES.UPDATE(id), data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function partialUpdatePlace(id: number, data: Partial<PlaceInput>): Promise<Place> {
  const response = await api.patch<Place>(API_ENDPOINTS.PLACES.PARTIAL_UPDATE(id), data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function deletePlace(id: number): Promise<void> {
  await api.delete(API_ENDPOINTS.PLACES.DELETE(id));
  return;
}
