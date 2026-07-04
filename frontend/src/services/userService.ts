import { api } from './api';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
}

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  createUser: async (payload: CreateUserPayload): Promise<User> => {
    const response = await api.post('/users', payload);
    return response.data;
  },
};
