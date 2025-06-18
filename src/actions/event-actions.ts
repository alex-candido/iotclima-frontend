// src/actions/event-actions.ts

import { API_CONTENT_TYPE } from '@/config/api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import api from '@/lib/api';
import { Event, EventListResponse } from '@/types/event';

export type EventInput = {
  title: string;
  description: string;
  occurred_at: string;
  resolved_at?: string | null;

  type: number;
  category: number;
  severity: number;
  status?: number;

  user?: number | null;
  station_sensor?: number | null;
};

export async function getEvents(params?: {
  page?: number;
  page_size?: number;
  [key: string]: unknown;
}): Promise<EventListResponse> {
  const response = await api.get<EventListResponse>(API_ENDPOINTS.EVENTS.LIST, { params });
  return response.data;
}

export async function createEvent(data: EventInput): Promise<Event> {
  const response = await api.post<Event>(API_ENDPOINTS.EVENTS.CREATE, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function getEventById(id: number): Promise<Event> {
  const response = await api.get<Event>(API_ENDPOINTS.EVENTS.DETAIL(id));
  return response.data;
}

export async function updateEvent(id: number, data: EventInput): Promise<Event> {
  const response = await api.put<Event>(API_ENDPOINTS.EVENTS.UPDATE(id), data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function partialUpdateEvent(id: number, data: Partial<EventInput>): Promise<Event> {
  const response = await api.patch<Event>(API_ENDPOINTS.EVENTS.PARTIAL_UPDATE(id), data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function deleteEvent(id: number): Promise<void> {
  await api.delete(API_ENDPOINTS.EVENTS.DELETE(id));
  return;
}
