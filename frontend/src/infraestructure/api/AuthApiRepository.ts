import api from '../../services/api';
import type { AuthRepository } from '../../domain/repositories/AuthRepository';
// Asegúrate de que LoginResponse esté importado, pero lo vamos a "redefinir" mentalmente
import type { LoginCredentials, LoginResponse, Usuario } from '../../domain/entities/auth';
import { AxiosError } from 'axios';

// 1. Creamos una interfaz AQUÍ que imite exactamente lo que envía tu Backend (loginController.js)
interface BackendResponse {
  ok: boolean;
  data: {               // Esta es la "data" que da problemas
    token: string;
    user: Usuario;
  }
}

export class AuthApiRepository implements AuthRepository {
  // 2. OJO: Aquí prometemos devolver LoginResponse. 
  // Para que esto no falle, LoginResponse debe ser SOLO { token, user }. Ver Paso 2.
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      // 3. Usamos la interfaz nueva para la petición HTTP
      const response = await api.post<BackendResponse>('/auth/login', credentials);
      
      // 4. Devolvemos "el relleno". 
      // Usamos 'as unknown as LoginResponse' temporalmente por si no has hecho el Paso 2 aún.
      return response.data.data as unknown as LoginResponse; 
      
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