// src/store/actions/geocoding-actions.ts

import axios from 'axios';

// Based on Nominatim's reverse geocoding response structure
export interface GeocodingAddress {
  road?: string;
  suburb?: string;
  city?: string;
  town?: string;
  village?: string;
  municipality?: string;
  state_district?: string;
  state?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
}

export interface ReverseGeocodingResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: GeocodingAddress;
}

export async function getReverseGeocoding(
  latitude: number,
  longitude: number
): Promise<ReverseGeocodingResponse> {
  const response = await axios.get<ReverseGeocodingResponse>(
    'https://nominatim.openstreetmap.org/reverse',
    {
      params: {
        lat: latitude,
        lon: longitude,
        format: 'jsonv2', // jsonv2 provides a more structured address object
      },
    }
  );
  return response.data;
}