import api from '../../services/api';

import type { AlumnosRepository } from '../../domain/repositories/AlumnosRepository';
import type { RespuestaMisAlumnos, AlumnosDataStructure } from '../../types';
import { AxiosError } from 'axios';

export class AlumnosApiRepository implements AlumnosRepository {
  async getMisAlumnos(): Promise<AlumnosDataStructure> {
    try {
      // La API responde con RespuestaMisAlumnos
      const response = await api.get<RespuestaMisAlumnos>('/maestros/misalumnos');
      
      // Extraemos solo la data que necesitamos
      return response.data.data; 
      
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || 'Error al cargar alumnos';
        throw new Error(errorMessage);
      }
      throw new Error('Error al cargar alumnos');
    }
  }
}