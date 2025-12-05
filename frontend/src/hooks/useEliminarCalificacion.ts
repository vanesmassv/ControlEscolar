import { useState, useCallback } from 'react';
import { EliminarCalificacionUseCase } from '../domain/usecases/EliminarCalificacionUseCase';
import { CalificacionesApiRepository } from '../infraestructure/api/CalificacionesApiRepository'; 


const calificacionesRepository = new CalificacionesApiRepository();
const eliminarCalificacionUseCase = new EliminarCalificacionUseCase(calificacionesRepository);

export const useEliminarCalificacion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const eliminarCalificacion = useCallback(async (calificacionId: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Ejecutamos el Use Case
      await eliminarCalificacionUseCase.execute(calificacionId);
      setSuccess('Calificación eliminada exitosamente.');
      return true; // Éxito
    } catch (err) {
      // Capturamos el error que fue lanzado desde el Repositorio o el Use Case
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al eliminar la calificación.';
      setError(errorMessage);
      return false; // Fallo
    } finally {
      setLoading(false);
    }
  }, []);

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  }

  return { eliminarCalificacion, loading, error, success, clearMessages };
};