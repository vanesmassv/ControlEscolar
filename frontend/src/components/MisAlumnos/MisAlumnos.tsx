import { useMisAlumnos } from '../../hooks/useMisAlumnos';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { GrupoHeader } from './GrupoHeader';
import { AlumnoCard } from './AlumnoCard';

const MisAlumnos = () => {
  const { alumnos, grupo, loading, error } = useMisAlumnos();

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <GrupoHeader grupo={grupo} />
      
      {alumnos.length === 0 ? (
        <p className="text-white">No hay alumnos registrados</p>
      ) : (
        alumnos.map((alumno) => (
          <AlumnoCard key={alumno.id} alumno={alumno} />
        ))
      )}
    </div>
  );
};

export default MisAlumnos;