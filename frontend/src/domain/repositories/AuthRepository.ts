import type { LoginCredentials, LoginResponse, Usuario } from '../entities/auth';

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<LoginResponse>;
  saveToken(token: string): void;
  saveUser(user: Usuario): void;
  getToken(): string | null;
  getUser(): Usuario | null;
  logout(): void;
}