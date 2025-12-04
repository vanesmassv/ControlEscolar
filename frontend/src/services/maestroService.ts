import api from './api';
import type { RespuestaMisAlumnos } from '../types';

export const alumnosService = {
  async getMisAlumnos(): Promise<RespuestaMisAlumnos> {
    const response = await api.get('/maestros/misalumnos'); 
    return response.data;
  }
};
