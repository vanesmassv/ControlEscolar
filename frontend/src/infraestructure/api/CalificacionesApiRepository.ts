import api from '../../services/api';
import type { CalificacionesRepository } from '../../domain/repositories/CalificacionesRepository';
import { AxiosError } from 'axios';
import type { DetalleReporteAdmin } from '../../types';
import { adminService } from '../../services/adminService';

export class CalificacionesApiRepository implements CalificacionesRepository {
  
  
  async obtenerReporteGlobal(): Promise<DetalleReporteAdmin[]> {
    try {
      
      const response = await adminService.obtenerReporteGlobal(); 
      
      // Accedemos directamente a la propiedad 
      const detalles = response.detallesPorAlumnoYMateria; 
      
      if (Array.isArray(detalles)) {
        return detalles; 
      }
      
      return []; 

    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || 'Error al obtener el reporte global';
        throw new Error(errorMessage);
      }
      throw new Error('Error al obtener el reporte global');
    }
  }

  async asignarCalificacion(
    alumnoId: number,
    materiaId: number,
    calificacion: number,
    observaciones?: string
  ): Promise<void> {
    try {
      await api.post('/maestros/calificaciones', {
        alumnoid: alumnoId,
        materiaid: materiaId,
        Calificacion: calificacion,
        observaciones: observaciones || ''
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || 'Error al asignar calificación';
        throw new Error(errorMessage);
      }
      throw new Error('Error al asignar calificación');
    }
  }

  async actualizarCalificacion(
    calificacionId: number,
    calificacion: number,
    observaciones?: string
  ): Promise<void> {
    try {
      const payload = {
        Calificacion: calificacion,
        observaciones: observaciones || ''
      };
      
      await api.patch(`/maestros/calificacion/${calificacionId}`, payload);
      
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || 'Error al editar calificación';
        throw new Error(errorMessage);
      }
      throw new Error('Error al editar calificación');
    }
  }

  async eliminarCalificacion(id: number): Promise<void> {
    try {
        // Llama al endpoint exclusivo del Administrador
        await api.delete(`/admin/calificacion/${id}`); 
        
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || 'Error al eliminar calificación';
            throw new Error(errorMessage);
        }
        throw new Error('Error al eliminar calificación');
    }
  }
}