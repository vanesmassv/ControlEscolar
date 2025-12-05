export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
    token: string;
    user: Usuario;
}

export interface DecodedToken {
  id: number;
  email: string;
  roles: [[{
    nombre: string;
    rol_id: number;
  }]];
}

export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  rol: 'ADMIN' | 'MAESTRO' | 'CONTROL_ESCOLAR';
}