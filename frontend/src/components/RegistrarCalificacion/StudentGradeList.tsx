// src/presentation/components/RegistrarCalificacion/StudentGradeList.tsx
import { StudentGradeCard } from './StudentGradeCard';
import type { Alumno, Materia } from '../../types';
import type { GradeInput } from '../../viewmodels/RegistrarCalificacionViewModel';

interface StudentGradeListProps {
  alumnos: Alumno[];
  materia: Materia;
  getGradeInput: (alumnoId: number) => GradeInput | undefined;
  onGradeChange: (input: GradeInput) => void;
  onCancel: (alumnoId: number) => void;
}

export const StudentGradeList = ({
  alumnos,
  materia,
  getGradeInput,
  onGradeChange,
  onCancel
}: StudentGradeListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white mb-4">
        Asignando calificaciones ({alumnos.length})
      </h3>
      {alumnos.map(alumno => (
        <StudentGradeCard
          key={alumno.id}
          alumno={alumno}
          materia={materia}
          gradeInput={getGradeInput(alumno.id)}
          onChange={onGradeChange}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
};