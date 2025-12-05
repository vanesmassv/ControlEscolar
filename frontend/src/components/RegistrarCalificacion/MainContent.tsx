import { EmptyState } from './EmptyStates';
import { SaveButton } from './SaveButton';
import { StudentSelector } from './StudentSelector';
import { StudentGradeList } from './StudentGradeList';
import type { Alumno, Materia } from '../../types';
import type { GradeInput } from '../../viewmodels/RegistrarCalificacionViewModel';

interface MainContentProps {
  selectedMateria: number | null;
  materiaSeleccionada: Materia | undefined;
  alumnosSinCalificar: Alumno[];
  alumnosSeleccionados: Alumno[];
  gradeInputsCount: number;
  saving: boolean;
  getGradeInput: (alumnoId: number) => GradeInput | undefined;
  onSelectStudent: (alumnoId: number) => void;
  onGradeChange: (input: GradeInput) => void;
  onCancelStudent: (alumnoId: number) => void;
  onSaveAll: () => void;
}

export const MainContent = ({
  selectedMateria,
  materiaSeleccionada,
  alumnosSinCalificar,
  alumnosSeleccionados,
  gradeInputsCount,
  saving,
  getGradeInput,
  onSelectStudent,
  onGradeChange,
  onCancelStudent,
  onSaveAll
}: MainContentProps) => {
  // Si no hay materia seleccionada
  if (!selectedMateria) {
    return <EmptyState type="select-subject" />;
  }

  // Si todos los alumnos ya tienen calificación
  if (alumnosSinCalificar.length === 0 && alumnosSeleccionados.length === 0) {
    return <EmptyState type="all-graded" subjectName={materiaSeleccionada?.nombre} />;
  }

  return (
    <>
      {/* Botón de guardar */}
      <SaveButton
        count={gradeInputsCount}
        loading={saving}
        onClick={onSaveAll}
      />

      {/* Selector de alumnos */}
      {alumnosSeleccionados.length === 0 && (
        <StudentSelector
          alumnos={alumnosSinCalificar}
          onSelect={onSelectStudent}
        />
      )}

      {/* Lista de calificaciones */}
      {alumnosSeleccionados.length > 0 && materiaSeleccionada && (
        <StudentGradeList
          alumnos={alumnosSeleccionados}
          materia={materiaSeleccionada}
          getGradeInput={getGradeInput}
          onGradeChange={onGradeChange}
          onCancel={onCancelStudent}
        />
      )}
    </>
  );
};