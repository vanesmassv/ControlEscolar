import api from './api';
import type { Usuario, LoginResponse } from '../types/index.ts';
import { AxiosError } from 'axios';

const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.error?.message || 'Error al iniciar sesión';
        throw new Error(errorMessage);
      }
      throw new Error('Error al iniciar sesión');
    }
  },

  // ✅ Logout
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // ✅ Obtener token
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  // ✅ Obtener usuario
  getUser: (): Usuario | null => {
    const user = localStorage.getItem('user');
    return user ? (JSON.parse(user) as Usuario) : null;
  },

  // ✅ Verificar autenticación
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
};


export default authService;