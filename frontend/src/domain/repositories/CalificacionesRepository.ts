import type { DetalleReporteAdmin } from "../../types";


export interface CalificacionesRepository {
  asignarCalificacion(
    alumnoId: number,
    materiaId: number,
    calificacion: number,
    observaciones?: string
  ): Promise<void>;

  actualizarCalificacion(
    calificacionId: number, 
    calificacion: number,
    observaciones?: string
  ): Promise<void>;

  eliminarCalificacion(id: number): Promise<void>;
  obtenerReporteGlobal(): Promise<DetalleReporteAdmin[]>;
}

