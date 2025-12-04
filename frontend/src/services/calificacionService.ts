import api from './api';
import type { CrearCalificacionDTO, RespuestaCrearCalificacion, Calificacion } from '../types';

type ActualizarCalificacionPayload = CrearCalificacionDTO;

export const calificacionService = {
  async crearCalificacion(payload: CrearCalificacionDTO): Promise<RespuestaCrearCalificacion> {
    const response = await api.post<RespuestaCrearCalificacion>('/maestros/calificacion', payload);
    return response.data;
  },
  async actualizarCalificacion(id: number, payload: ActualizarCalificacionPayload): 
        // El tipo de retorno es { message: string, calificacion: Calificacion }
        Promise<{ message: string, calificacion: Calificacion }> {
        
        // Endpoint: PUT /calificaciones/{id}
        const response = await api.put<{ message: string, calificacion: Calificacion }>(`/calificaciones/${id}`, payload); 
        return response.data;
    }
};

