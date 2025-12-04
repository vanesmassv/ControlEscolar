export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: 'ADMIN' | 'MAESTRO';
}

export interface Alumno {
  id: number;
  nombre: string;
  matricula: string;
  calificaciones: Calificacion[];
}

export interface Materia {
  id: number;
  nombre: string;
  codigo: string;
}

export interface AuthUsuario {
    id?: string
    name?: string
    email?: string
}

export interface AuthContextValue {
    user: AuthUsuario | null
    token?: string | null
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

export interface LoginResponse {
  ok: boolean;
  data: {
    token: string;
    user: Usuario;
  };
}

export interface Rol {
  id: number;
  nombre: string;
  descripcion?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Grupo {
  id: number;
  nombre: string;
}


export interface Calificacion {
  id: number;
  alumno_id: number;
  nota: string;  
  observaciones?: string;
  materia: {
    id: number;
    nombre: string;
    codigo?: string;
  };
}

export interface Maestro {
  id: number;
  matricula: string;
  usuario_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface MateriaConCalificacion {
  materia_id: number;
  materia: string;
  calificacion: number | null;
}

export interface AlumnoConCalificaciones {
  alumno_id: number;
  matricula: string;
  nombre: string;
  grupo: string;
  materias: MateriaConCalificacion[];
}

export interface AlumnosDataStructure { 
    grupo: Grupo;
    alumnos: Alumno[];
    materias: Materia[]; 
}

export interface RespuestaMisAlumnos {
  succes: boolean;
  message: string;
  data: AlumnosDataStructure;
}


export interface CrearCalificacionDTO {
  alumno_id: number;
  materia_id: number;
  nota: string;
  observaciones?: string;
}

export interface RespuestaCrearCalificacion {
  succes: boolean;
  message: string;
  data: Calificacion;
}