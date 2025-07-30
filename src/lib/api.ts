// src/lib/api.ts

import axios, { AxiosInstance } from 'axios';

import { API_BASE_URL, API_CONTENT_TYPE } from '@/config/api';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': API_CONTENT_TYPE,
  },
});

export default api;