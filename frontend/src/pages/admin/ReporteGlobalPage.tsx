import { useReporteGlobal } from '../../hooks/useReporteGlobal';
import { PromedioGeneralCard } from '../../components/ReporteGlobal/PromedioGeneralCard';
import { ResumenMaterias } from '../../components/ReporteGlobal/ResumenMaterias';
import { TablaDetalles } from '../../components/ReporteGlobal/TablaDetalles';

export const ReporteGlobalPage = () => {
  const {reporte: data, loading, error } = useReporteGlobal();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando reporte...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">No hay datos disponibles</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">📊 Reporte Global de Calificaciones</h1>
          <p className="text-gray-600 mt-2">Vista general del desempeño académico</p>
        </div>

        {/* Promedio General */}
        <div className="mb-6">
          <PromedioGeneralCard promedio={data.promedioGeneral} />
        </div>

        {/* Resumen por Materia */}
        <div className="mb-6">
          <ResumenMaterias materias={data.resumenPorMateria} />
        </div>

        {/* Tabla de Detalles */}
        <div>
          <TablaDetalles detalles={data.detallesPorAlumnoYMateria} />
        </div>
      </div>
    </div>
  );
};