// src/hooks/use-users.ts

import { useMutation, useQuery, useQueryClient, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  partialUpdateUser,
  updateUser,
  UserInput,
} from '@/actions/user-actions';
import { API_MESSAGES } from '@/data/messages';
import { User, UserListResponse } from '@/types/user';


export const USER_QUERY_KEYS = {
  LIST: 'userList',
  DETAIL: 'userDetail',
};

export function useUsers(params?: {
  page?: number;
  page_size?: number;
  customQueryKey?: string[];
  cacheTime?: number;
  [key: string]: unknown;
}): UseQueryResult<UserListResponse, Error> {
  const { customQueryKey, ...filters } = params || {};

  const queryKey = customQueryKey
    ? [...customQueryKey, filters]
    : [USER_QUERY_KEYS.LIST, filters];

  const query = useQuery<UserListResponse, Error>({
    queryKey,
    queryFn: () => getUsers(filters),
    cacheTime: params?.cacheTime || 1000 * 60 * 5,
    onError: (error: Error) => {
      console.error('Error fetching users:', error);
      toast.error(API_MESSAGES.USER.FETCH_ERROR);
    },
  } as UseQueryOptions<UserListResponse, Error>);

  return query;
}

export function useUser(id: number) {
  const query = useQuery<User, Error>({
    queryKey: [USER_QUERY_KEYS.DETAIL, id],
    queryFn: () => getUserById(id),
    enabled: !!id,
    onError: (error: Error) => {
      console.error(`Error fetching user ${id}:`, error);
      toast.error(API_MESSAGES.USER.FETCH_ERROR);
    },
  } as UseQueryOptions<User, Error>);
  return query;
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  const mutation = useMutation<User, Error, UserInput>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEYS.LIST] });
      toast.success(API_MESSAGES.COMMON.CREATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error creating user:', error);
      toast.error(error.message || API_MESSAGES.USER.CREATE_ERROR);
    },
  });
  return mutation;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const mutation = useMutation<User, Error, { id: number; data: UserInput }>({
    mutationFn: ({ id, data }) => updateUser(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEYS.LIST] });
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEYS.DETAIL, data.id] });
      toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error updating user:', error);
      toast.error(error.message || API_MESSAGES.USER.UPDATE_ERROR);
    },
  });
  return mutation;
}

export function usePartialUpdateUser() {
  const queryClient = useQueryClient();
  const mutation = useMutation<User, Error, { id: number; data: Partial<UserInput> }>({
    mutationFn: ({ id, data }) => partialUpdateUser(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEYS.LIST] });
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEYS.DETAIL, data.id] });
      toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error partially updating user:', error);
      toast.error(error.message || API_MESSAGES.USER.UPDATE_ERROR);
    },
  });
  return mutation;
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, number>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEYS.LIST] });
      toast.success(API_MESSAGES.COMMON.DELETE_SUCCESS);
    },
    onError: (error) => {
      console.error('Error deleting user:', error);
      toast.error(error.message || API_MESSAGES.USER.DELETE_ERROR);
    },
  });
  return mutation;
}
