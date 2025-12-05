// src/presentation/pages/RegistrarCalificacion/RegistrarCalificacionPage.tsx
import { useMisAlumnos } from '../../hooks/useMisAlumnos';
import { useRegistrarCalificacion } from '../../hooks/useRegistrarCalificacion';
import { useRegistrarCalificacionForm } from '../../hooks/useRegistrarCalificacionForm';
import { LoadingState } from '../../components/RegistrarCalificacion/LoadingState';
import { Header } from '../../components/RegistrarCalificacion/Header';
import { SubjectSelector } from '../../components/RegistrarCalificacion/SubjectSelector';
import { MessagesSection } from '../../components/RegistrarCalificacion/MessagesSection';
import { MainContent } from '../../components/RegistrarCalificacion/MainContent';

export const RegistrarCalificacionPage = () => {
  // Data hooks
  const {
    alumnos,
    grupo,
    materias,
    loading: loadingAlumnos,
    error: errorAlumnos
  } = useMisAlumnos();

  const {
    registrarMultiples,
    loading: saving,
    error: errorSaving,
    success,
    clearMessages
  } = useRegistrarCalificacion();

  // Form logic hook
  const {
    viewModel,
    selectedMateria,
    handleSelectMateria,
    handleGradeChange,
    handleCancelStudent,
    handleSelectStudent,
    clearForm
  } = useRegistrarCalificacionForm();

  // Handlers
  const handleMateriaChange = (materiaId: number | null) => {
    handleSelectMateria(materiaId);
    clearMessages();
  };

  const handleSaveAll = async () => {
    const inputs = viewModel.getAllGradeInputs();
    if (inputs.length === 0) return;

    const success = await registrarMultiples(inputs);

    if (success) {
      clearForm();
      window.location.reload();
    }
  };

  // Derived data
  const materiaSeleccionada = materias.find(m => m.id === selectedMateria);
  const alumnosSinCalificar = viewModel.getAlumnosSinCalificar(alumnos, selectedMateria);
  const alumnosSeleccionados = viewModel.getAlumnosSeleccionados(alumnos);

  // Loading state
  if (loadingAlumnos) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-700 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <Header grupo={grupo} />

        <SubjectSelector
          materias={materias}
          selectedMateria={selectedMateria}
          onChange={handleMateriaChange}
        />

        <MessagesSection
          errorAlumnos={errorAlumnos}
          errorSaving={errorSaving}
          success={success}
        />

        <MainContent
          selectedMateria={selectedMateria}
          materiaSeleccionada={materiaSeleccionada}
          alumnosSinCalificar={alumnosSinCalificar}
          alumnosSeleccionados={alumnosSeleccionados}
          gradeInputsCount={viewModel.getGradeInputsCount()}
          saving={saving}
          getGradeInput={(id) => viewModel.getGradeInput(id)}
          onSelectStudent={handleSelectStudent}
          onGradeChange={handleGradeChange}
          onCancelStudent={handleCancelStudent}
          onSaveAll={handleSaveAll}
        />
      </div>
    </div>
  );
};