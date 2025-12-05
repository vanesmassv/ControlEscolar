// src/types/reporte.ts
export interface DetalleAlumnoMateria {
  alumno: string;
  matricula: string;
  materia: string;
  promedio: string;
}

export interface ResumenMateria {
  materia: string;
  promedio: string;
}

export interface ReporteGlobal {
  promedioGeneral: string;
  resumenPorMateria: ResumenMateria[];
  detallesPorAlumnoYMateria: DetalleAlumnoMateria[];
}

export interface ReporteGlobalResponse {
  success: boolean;
  message: string;
  data: ReporteGlobal;
}