import { jwtDecode } from 'jwt-decode';
import type { Usuario } from '../types';

interface TokenPayload {
  id: number;
  email: string;
  nombre: string;
  rol: string;
  iat: number;
  exp: number;
}

export class TokenService {
  private static TOKEN_KEY = 'token';

  private static USER_KEY = 'user';

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }


  static setUser(user: Usuario): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }


  static getUser(): Usuario | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    
    localStorage.removeItem(this.USER_KEY); 
  }

  static extractUserFromToken(token: string): Usuario {
    try {
      const decoded = jwtDecode<TokenPayload>(token);

      // console.log('=== TOKEN DECODED ===');
      // console.log('Payload completo:', decoded);

      // Validación básica
      if (!decoded.rol) {
        throw new Error('El token no contiene información de rol');
      }

      return {
        id: String(decoded.id),
        email: decoded.email,
        // Usamos un fallback por si el token no trae nombre
        nombre: decoded.nombre || decoded.email, 
        rol: decoded.rol as 'ADMIN' | 'MAESTRO' | 'CONTROL_ESCOLAR'
      };
    } catch (error) {
      console.error('Error al decodificar token:', error);
      throw new Error('Token inválido');
    }
  }

  static isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const now = Date.now() / 1000;
      return decoded.exp > now;
    } catch {
      return false;
    }
  }
}