import React, { useState } from 'react';
import { AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { useAdminCalificaciones } from '../../hooks/useAdminCalificaciones';
import { CalificacionCard } from '../../components/AdminCalificaciones/CalificacionesCarda';
import { ConfirmDeleteModal } from '../../components/AdminCalificaciones/ConfirmDeleteModal';
import { FilterBar } from '../../components/AdminCalificaciones/FilterBar';
import { LoadingState } from '../../components/RegistrarCalificacion/LoadingState';
import type { Alumno, Calificacion } from '../../types';

export const EditarCalificacionesPage: React.FC = () => {
  const {
    alumnos,
    grupo,
    loading,
    error,
    deleting,
    successMessage,
    eliminarCalificacion,
    clearMessages,
    recargar
  } = useAdminCalificaciones();

  const [searchTerm, setSearchTerm] = useState('');
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    calificacion: Calificacion | null;
    alumno: Alumno | null;
  }>({
    isOpen: false,
    calificacion: null,
    alumno: null
  });

  // Filtrar alumnos por búsqueda
  const alumnosFiltrados = alumnos.filter(alumno =>
    alumno.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumno.matricula.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (calificacion: Calificacion, alumno: Alumno) => {
    setModalData({
      isOpen: true,
      calificacion,
      alumno
    });
  };

  const handleCloseModal = () => {
    setModalData({
      isOpen: false,
      calificacion: null,
      alumno: null
    });
  };

  const handleConfirmDelete = async () => {
    if (!modalData.calificacion) return;

    const success = await eliminarCalificacion(modalData.calificacion.id);
    
    if (success) {
      handleCloseModal();
      setTimeout(clearMessages, 3000);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-700 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl  text-white mb-2">
              Eliminar Calificaciones
            </h1>
            {grupo && (
              <p className="text-slate-300 text-lg">
                Grupo: <span className="font-semibold text-white">{grupo.nombre}</span>
              </p>
            )}
          </div>

          <button
            onClick={recargar}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            Recargar
          </button>
        </div>

        {/* Mensajes */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <h3 className="font-medium text-red-900 text-lg">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <h3 className="font-medium text-green-900 text-lg">Éxito</h3>
              <p className="text-green-700">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Barra de búsqueda */}
        <FilterBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {/* Lista de alumnos */}
        {alumnosFiltrados.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-600 text-lg">
              {searchTerm ? 'No se encontraron resultados' : 'No hay alumnos registrados'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {alumnosFiltrados.map((alumno) => (
              <CalificacionCard
                key={alumno.id}
                alumno={alumno}
                onDelete={handleOpenModal}
              />
            ))}
          </div>
        )}

        {/* Modal de confirmación */}
        <ConfirmDeleteModal
          isOpen={modalData.isOpen}
          studentName={modalData.alumno?.nombre || ''}
          subjectName={modalData.calificacion?.materia?.nombre || ''}
          grade={modalData.calificacion?.nota || ''}
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseModal}
          loading={deleting}
        />
      </div>
    </div>
  );
};