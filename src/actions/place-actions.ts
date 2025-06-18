// src/actions/place-actions.ts

import { API_CONTENT_TYPE } from '@/config/api';
import api from '@/lib/api';
import { Place, PlaceListResponse } from '@/types/place'; 

export type PlaceInput = {
  name: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  
  latitude: number; 
  longitude: number; 

  status?: number; 
  type?: number; 
  
  user?: number | null; 
};

export async function getPlaces(params?: {
  page?: number;
  page_size?: number;
  [key: string]: unknown;
}): Promise<PlaceListResponse> {
  const response = await api.get<PlaceListResponse>('/places/', { params });
  return response.data;
}

export async function createPlace(data: PlaceInput): Promise<Place> {
  const response = await api.post<Place>('/places/', data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function getPlaceById(id: number): Promise<Place> {
  const response = await api.get<Place>(`/places/${id}/`);
  return response.data;
}

export async function updatePlace(id: number, data: PlaceInput): Promise<Place> {
  const response = await api.put<Place>(`/places/${id}/`, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function partialUpdatePlace(id: number, data: Partial<PlaceInput>): Promise<Place> {
  const response = await api.patch<Place>(`/places/${id}/`, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function deletePlace(id: number): Promise<void> {
  await api.delete(`/places/${id}/`);
  return;
}