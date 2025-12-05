import type { Alumno } from '../types';

export interface GradeInput {
  alumnoId: number;
  materiaId: number;
  calificacion: number;
  observaciones: string;
}

export class RegistrarCalificacionViewModel {
  private gradeInputsMap: Map<number, GradeInput>;

  constructor() {
    this.gradeInputsMap = new Map();
  }

  // Obtener alumnos sin calificar en una materia
  getAlumnosSinCalificar(alumnos: Alumno[], materiaId: number | null): Alumno[] {
    if (!materiaId) return [];
    
    return alumnos.filter(alumno => 
      !alumno.calificaciones.some(cal => cal.materia.id === materiaId)
    );
  }

  // Obtener alumnos seleccionados para calificar
  getAlumnosSeleccionados(alumnos: Alumno[]): Alumno[] {
    return alumnos.filter(a => this.gradeInputsMap.has(a.id));
  }

  // Agregar/actualizar calificación
  setGradeInput(input: GradeInput): void {
    this.gradeInputsMap.set(input.alumnoId, input);
  }

  // Obtener calificación de un alumno
  getGradeInput(alumnoId: number): GradeInput | undefined {
    return this.gradeInputsMap.get(alumnoId);
  }

  // Eliminar calificación
  removeGradeInput(alumnoId: number): void {
    this.gradeInputsMap.delete(alumnoId);
  }

  // Limpiar todas las calificaciones
  clearAllGradeInputs(): void {
    this.gradeInputsMap.clear();
  }

  // Obtener todas las calificaciones como array
  getAllGradeInputs(): GradeInput[] {
    return Array.from(this.gradeInputsMap.values());
  }

  // Obtener cantidad de calificaciones pendientes
  getGradeInputsCount(): number {
    return this.gradeInputsMap.size;
  }

  // Verificar si hay cambios pendientes
  hasChanges(): boolean {
    return this.gradeInputsMap.size > 0;
  }
}