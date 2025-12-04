import type { Alumno } from '../../domain/entities/Alumno';
import { AlumnoInfo } from './AlumnoInfo';
import { CalificacionesTable } from './CalificacionesTable';

interface AlumnoCardProps {
  alumno: Alumno;
}

export const AlumnoCard = ({ alumno }: AlumnoCardProps) => {
  return (
    <div className="mb-6 bg-white shadow rounded-xl p-4">
      <AlumnoInfo nombre={alumno.nombre} matricula={alumno.matricula} />
      <CalificacionesTable calificaciones={alumno.calificaciones} />
    </div>
  );
};