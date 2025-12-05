import api from './api';
import type { RespuestaReporteGlobal, ReporteGlobalResponse } from '../types';

export const adminService = {
   
    async obtenerReporteGlobal(): Promise<ReporteGlobalResponse> {
        const response = await api.get<RespuestaReporteGlobal>('/admin/reporteGlobal'); 
        
        return response.data.data;
    },

    async eliminarCalificacion(id: number): Promise<{ message: string }> {
        const response = await api.delete<{ message: string }>(`/admin/calificacion/${id}`); 
        return response.data;
    }
};