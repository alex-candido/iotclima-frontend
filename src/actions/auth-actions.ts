// src/actions/auth-actions.ts

import { API_CONTENT_TYPE } from '@/config/api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import api from '@/lib/api';

export type UserCredentials = {
  email?: string;
  username?: string;
  password: string;
};

export type AuthTokens = {
  access: string;
  refresh: string;
};

export type UserProfile = {
  id: number;
  uuid: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
  group_names: string[];
};

export type AuthResponse = AuthTokens & { user: UserProfile };

export type SignUpData = {
  username?: string;
  email: string;
  password: string;
  password2: string;
};

export async function login(credentials: UserCredentials): Promise<AuthResponse> {
  const payload = credentials.email ?
    { email: credentials.email, password: credentials.password } :
    { username: credentials.username, password: credentials.password };

  const response = await api.post<AuthResponse>('/auth/login/', payload, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function signup(userData: SignUpData): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, {
    username: userData.username,
    email: userData.email,
    password: userData.password,
    password2: userData.password2,
  }, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function requestPasswordReset(email: string): Promise<void> {
  await api.post(API_ENDPOINTS.AUTH.PASSWORD_RESET_REQUEST, { email }, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
}

export async function confirmPasswordReset(data: { token: string; uid: string; new_password1: string; new_password2: string }): Promise<void> {
  await api.post(API_ENDPOINTS.AUTH.PASSWORD_RESET_CONFIRM, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
}

export async function changePassword(data: { old_password: string; new_password1: string; new_password2: string }): Promise<void> {
  await api.post(API_ENDPOINTS.AUTH.PASSWORD_CHANGE, data, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
}

export async function getUserProfile(): Promise<UserProfile> {
  const response = await api.get<UserProfile>(API_ENDPOINTS.AUTH.USER_PROFILE, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function updateUserProfile(profileData: Partial<UserProfile>): Promise<UserProfile> {
  const response = await api.put<UserProfile>(API_ENDPOINTS.AUTH.USER_PROFILE, profileData, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function logout(refreshToken: string): Promise<void> {
  await api.post(API_ENDPOINTS.AUTH.LOGOUT, { refresh: refreshToken }, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
}

export async function refreshAccessToken(refreshToken: string): Promise<{ access: string }> {
  const response = await api.post<{ access: string }>(API_ENDPOINTS.AUTH.TOKEN_REFRESH, { refresh: refreshToken }, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
  return response.data;
}

export async function verifyAccessToken(accessToken: string): Promise<void> {
  await api.post(API_ENDPOINTS.AUTH.TOKEN_VERIFY, { token: accessToken }, {
    headers: { 'Content-Type': API_CONTENT_TYPE },
  });
}
