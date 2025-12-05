import type { AlumnosDataStructure } from '../../types';

export interface AdminCalificacionesRepository {
  getTodasLasCalificaciones(): Promise<AlumnosDataStructure>;
  eliminarCalificacion(calificacionId: number): Promise<void>;
}