// src/actions/event-actions.ts

import { API_CONTENT_TYPE } from '@/config/api';
import api from '@/lib/api';
import { Event, EventListResponse } from '@/types/event'; // Assumindo que os tipos Event e EventListResponse estão aqui

// Tipos para dados de entrada (payloads de POST/PUT/PATCH)
export type EventInput = {
  title: string;
  description: string;
  occurred_at: string; // ISO string
  resolved_at?: string | null; // ISO string or null

  type: number; // EventType enum value (number)
  category: number; // EventCategory enum value (number)
  severity: number; // EventSeverity enum value (number)
  status?: number; // EventStatus enum value (number), optional for create
  
  user?: number | null; // User ID
  station_sensor?: number | null; // StationSensor ID
};

/**
 * Lists events with optional filtering and pagination.
 */
export async function getEvents(params?: {
  page?: number;
  page_size?: number;
  [key: string]: any; // Allow any other filter parameters
}): Promise<EventListResponse> {
  const response = await api.get<EventListResponse>('/events/', { params });
  return response.data; // Padronizado para retornar response.data
}

/**
 * Creates a new event.
 */
export async function createEvent(data: EventInput): Promise<Event> {
  const response = await api.post<Event>('/events/', data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data; // Padronizado para retornar response.data
}

/**
 * Retrieves a single event by its ID.
 */
export async function getEventById(id: number): Promise<Event> {
  const response = await api.get<Event>(`/events/${id}/`);
  return response.data; // Padronizado para retornar response.data
}

/**
 * Updates an event by its ID (full replacement).
 */
export async function updateEvent(id: number, data: EventInput): Promise<Event> {
  const response = await api.put<Event>(`/events/${id}/`, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data; // Padronizado para retornar response.data
}

/**
 * Partially updates an event by its ID.
 */
export async function partialUpdateEvent(id: number, data: Partial<EventInput>): Promise<Event> {
  const response = await api.patch<Event>(`/events/${id}/`, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data; // Padronizado para retornar response.data
}

/**
 * Deletes an event by its ID (soft delete).
 */
export async function deleteEvent(id: number): Promise<void> {
  await api.delete(`/events/${id}/`);
  return; // Retorno explícito para Promise<void>
}