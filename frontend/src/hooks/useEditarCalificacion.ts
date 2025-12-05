import { useState } from 'react';
import { EditarCalificacionUseCase } from '../domain/usecases/EditarCalificacionUseCase';
import { CalificacionesApiRepository } from '../infraestructure/api/CalificacionesApiRepository'; 

const calificacionesRepository = new CalificacionesApiRepository();
const editarCalificacionUseCase = new EditarCalificacionUseCase(calificacionesRepository);

export const useEditarCalificacion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const editarCalificacion = async (
    calificacionId: number,
    calificacion: number,
    observaciones?: string
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await editarCalificacionUseCase.execute(
        calificacionId,
        calificacion,
        observaciones
      );
      setSuccess('Calificación editada exitosamente');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al editar calificación';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  return { loading, error, success, editarCalificacion, clearMessages };
};