// src/actions/user-actions.ts

import { API_CONTENT_TYPE } from '@/config/api';
import api from '@/lib/api';
import { User, UserListResponse } from '@/types/user'; // Assuming types User, UserListResponse

export type UserInput = {
  username: string;
  first_name?: string;
  last_name?: string;
  email: string;
  is_superuser?: boolean;
  is_staff?: boolean;
  is_active?: boolean;
  password?: string; // Only for creating/setting password if API supports it
};

/**
 * Lists users with optional filtering and pagination.
 */
export async function getUsers(params?: {
  page?: number;
  page_size?: number;
  [key: string]: any; // Allow any other filter parameters
}): Promise<UserListResponse> {
  const response = await api.get<UserListResponse>('/users/', { params });
  return response.data;
}

/**
 * Creates a new user.
 */
export async function createUser(data: UserInput): Promise<User> {
  // Note: For user creation, it's typically handled by auth/registration endpoint.
  // This endpoint might be for admin-level creation.
  const response = await api.post<User>('/users/', data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

/**
 * Retrieves a single user by its ID.
 */
export async function getUserById(id: number): Promise<User> {
  const response = await api.get<User>(`/users/${id}/`);
  return response.data;
}

/**
 * Updates a user by its ID (full replacement).
 */
export async function updateUser(id: number, data: UserInput): Promise<User> {
  const response = await api.put<User>(`/users/${id}/`, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

/**
 * Partially updates a user by its ID.
 */
export async function partialUpdateUser(id: number, data: Partial<UserInput>): Promise<User> {
  const response = await api.patch<User>(`/users/${id}/`, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

/**
 * Deletes a user by ID (soft delete).
 */
export async function deleteUser(id: number): Promise<void> {
  await api.delete(`/users/${id}/`);
  return;
}