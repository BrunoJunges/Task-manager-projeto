import { api } from './api';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CreateTaskPayload {
  title: string;
  description: string;
  dueDate: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  userId: string;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;
}

export const taskService = {
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    return response.data;
  },

  getTaskById: async (id: string): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (payload: CreateTaskPayload): Promise<Task> => {
    const response = await api.post('/tasks', payload);
    return response.data;
  },

  updateTask: async (id: string, payload: UpdateTaskPayload): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, payload);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  completeTask: async (id: string): Promise<Task> => {
    const response = await api.patch(`/tasks/${id}/complete`);
    return response.data;
  },
};
