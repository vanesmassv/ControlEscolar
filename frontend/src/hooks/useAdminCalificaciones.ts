import { useState, useEffect } from 'react';
import { AdminCalificacionesApiRepository } from '../infraestructure/api/AdminCalificacionesApiRepository';
import { EliminarCalificacionUseCase } from '../domain/usecases/EliminarCalificacionUseCase';
import type { Alumno, Grupo, Materia } from '../types';



const repository = new AdminCalificacionesApiRepository();
const eliminarCalificacionUseCase = new EliminarCalificacionUseCase(repository);


export const useAdminCalificaciones = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [grupo, setGrupo] = useState<Grupo | null>(null);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const cargarDatos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await repository.getTodasLasCalificaciones();
      setGrupo(data.grupo);
      setAlumnos(data.alumnos);
      setMaterias(data.materias);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const eliminarCalificacion = async (calificacionId: number) => {
    setDeleting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await eliminarCalificacionUseCase.execute(calificacionId);
      setSuccessMessage('Calificación eliminada exitosamente');
      
      // Recargar datos
      await cargarDatos();
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar');
      return false;
    } finally {
      setDeleting(false);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccessMessage(null);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return {
    alumnos,
    grupo,
    materias,
    loading,
    error,
    deleting,
    successMessage,
    eliminarCalificacion,
    clearMessages,
    recargar: cargarDatos
  };
};