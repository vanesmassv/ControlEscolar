import api from '../../services/api';
import type { AuthRepository } from '../../domain/repositories/AuthRepository';
import type { LoginCredentials, LoginResponse, Usuario } from '../../domain/entities/auth';
import { AxiosError } from 'axios';

export class AuthApiRepository implements AuthRepository {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth/login', credentials);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.error?.message || 'Error al iniciar sesión';
        throw new Error(errorMessage);
      }
      throw new Error('Error de conexión');
    }
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  saveUser(user: Usuario): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): Usuario | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}