import { useState, useCallback } from 'react';
import { RegistrarCalificacionViewModel } from '../viewmodels/RegistrarCalificacionViewModel';
import type { GradeInput } from '../viewmodels/RegistrarCalificacionViewModel';

export const useRegistrarCalificacionForm = () => {
  const [viewModel] = useState(() => new RegistrarCalificacionViewModel());
  const [selectedMateria, setSelectedMateria] = useState<number | null>(null);
  const [, forceUpdate] = useState({});

  const refresh = useCallback(() => forceUpdate({}), []);

  const handleSelectMateria = useCallback((materiaId: number | null) => {
    setSelectedMateria(materiaId);
    viewModel.clearAllGradeInputs();
    refresh();
  }, [viewModel, refresh]);

  const handleGradeChange = useCallback((input: GradeInput) => {
    viewModel.setGradeInput(input);
    refresh();
  }, [viewModel, refresh]);

  const handleCancelStudent = useCallback((alumnoId: number) => {
    viewModel.removeGradeInput(alumnoId);
    refresh();
  }, [viewModel, refresh]);

  const handleSelectStudent = useCallback((alumnoId: number) => {
    if (selectedMateria) {
      handleGradeChange({
        alumnoId,
        materiaId: selectedMateria,
        calificacion: 0,
        observaciones: ''
      });
    }
  }, [selectedMateria, handleGradeChange]);

  const clearForm = useCallback(() => {
    viewModel.clearAllGradeInputs();
    refresh();
  }, [viewModel, refresh]);

  return {
    viewModel,
    selectedMateria,
    handleSelectMateria,
    handleGradeChange,
    handleCancelStudent,
    handleSelectStudent,
    clearForm
  };
};