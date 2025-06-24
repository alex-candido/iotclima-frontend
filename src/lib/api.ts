// src/lib/api.ts

import { API_BASE_URL, API_CONTENT_TYPE } from '@/config/api';
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// REMOVIDO: import { signOut } from 'next-auth/react';
// REMOVIDO: import { getSession } from 'next-auth/react';

/**
 * Creates and configures an Axios instance for API communication.
 * Includes basic request and response interceptors.
 * Authentication logic will be added here once NextAuth.js is configured.
 */
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': API_CONTENT_TYPE,
  },
});

/**
 * Request Interceptor (Authentication placeholder).
 * Currently does not attach any tokens. Authentication logic will be added later.
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // For now, no authentication token is attached.
    // Authentication logic with NextAuth.js will be added here later.
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor: Basic error handling.
 * Token refresh/re-authentication logic will be added here later.
 */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Basic error logging for now
    console.error('API request failed:', error.response?.status, error.message);
    
    // Future: Add 401 token refresh/sign out logic here after NextAuth.js setup.
    return Promise.reject(error);
  }
);

export default api;