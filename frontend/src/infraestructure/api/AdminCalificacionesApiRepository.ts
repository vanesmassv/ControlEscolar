import api from '../../services/api';
import  type { AdminCalificacionesRepository } from '../../domain/repositories/AdminCalificacionesRepository';
import type { AlumnosDataStructure } from '../../types';
import { AxiosError } from 'axios';

export class AdminCalificacionesApiRepository implements AdminCalificacionesRepository {
  async getTodasLasCalificaciones(): Promise<AlumnosDataStructure> {
    try {
      const response = await api.get('/alumnos/allAlumnos');
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || 'Error al cargar calificaciones');
      }
      throw new Error('Error al cargar calificaciones');
    }
  }

  async eliminarCalificacion(calificacionId: number): Promise<void> {
    try {
      await api.delete(`/admin/calificacion/${calificacionId}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || 'Error al eliminar calificación');
      }
      throw new Error('Error al eliminar calificación');
    }
  }
}