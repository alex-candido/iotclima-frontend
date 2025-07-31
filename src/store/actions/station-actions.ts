// src/store/actions/station-actions.ts

import { API_ENDPOINTS } from '@/data/endpoints';
import api from '@/lib/api';
import { StationListResponse } from '@/types/station';

export async function getStations(params?: {
  page?: number;
  page_size?: number;
  [key: string]: unknown;
}): Promise<StationListResponse> {
  const response = await api.get<StationListResponse>(API_ENDPOINTS.STATIONS.LIST, { params });
  return response.data;
}
