import { useState, useEffect } from 'react';
import { adminService } from '../services/adminService';
import type { ReporteGlobalResponse } from '../types'; 

export const useReporteGlobal = () => {
   
    const [reporte, setReporte] = useState<ReporteGlobalResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCalificaciones = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await adminService.obtenerReporteGlobal(); 
            
            
            setReporte(data); 
        } catch (err) {
            console.error("Error fetching global report:", err);
            setError("No se pudo cargar el reporte global de calificaciones.");
            setReporte(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCalificaciones();
    }, []);

    return {
        reporte, // Ahora retorna el objeto completo
        loading,
        error,
        refetch: fetchCalificaciones,
    };
};