import { useState, useEffect } from 'react';
import { GetMisAlumnosUseCase } from '../domain/usecases/GetMisAlumnosUseCase';
import { AlumnosApiRepository } from '../infraestructure/api/AlumnosApiRepository';
import type { Alumno, Grupo, Materia } from '../types';

const alumnosRepository = new AlumnosApiRepository();
const getMisAlumnosUseCase = new GetMisAlumnosUseCase(alumnosRepository);

export const useMisAlumnos = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [grupo, setGrupo] = useState<Grupo | null>(null);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getMisAlumnosUseCase.execute();
        setGrupo(data.grupo);
        setAlumnos(data.alumnos);
        setMaterias(data.materias);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMessage);
        console.error('Error cargando alumnos:', err);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  return { alumnos, grupo, materias, loading, error };
};