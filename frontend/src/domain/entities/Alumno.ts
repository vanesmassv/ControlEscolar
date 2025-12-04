export interface Calificacion {
  id: string;
  nota: number;
  observaciones: string;
  materia: {
    id: string;
    nombre: string;
  };
}

export interface Alumno {
  id: string;
  nombre: string;
  matricula: string;
  calificaciones: Calificacion[];
}