import { useState } from 'react';
import { RegistrarCalificacionUseCase } from '../domain/usecases/RegistrarCalificacionUseCase';
import { CalificacionesApiRepository } from '../infraestructure/api/CalificacionesApiRepository';

const calificacionesRepository = new CalificacionesApiRepository();
const registrarCalificacionUseCase = new RegistrarCalificacionUseCase(calificacionesRepository);

interface GradeInput {
  alumnoId: number;
  materiaId: number;
  calificacion: number;
  observaciones: string;
}

export const useRegistrarCalificacion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const registrarCalificacion = async (input: GradeInput) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await registrarCalificacionUseCase.execute(
        input.alumnoId,
        input.materiaId,
        input.calificacion,
        input.observaciones
      );
      setSuccess('Calificación registrada exitosamente');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al registrar calificación';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const registrarMultiples = async (inputs: GradeInput[]) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      for (const input of inputs) {
        await registrarCalificacionUseCase.execute(
          input.alumnoId,
          input.materiaId,
          input.calificacion,
          input.observaciones
        );
      }
      setSuccess(`${inputs.length} calificación(es) registrada(s) exitosamente`);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al registrar calificaciones';
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

  return {
    registrarCalificacion,
    registrarMultiples,
    loading,
    error,
    success,
    clearMessages
  };
};