import { useState, useEffect } from 'react';
import { useMisAlumnos } from '../../hooks/useMisAlumnos';
import type { Alumno } from '../../types'; 
import EditarCalificacionForm from './EditarCalificacionForm'; 
import { LoadingState } from '../../components/RegistrarCalificacion/LoadingState'; 

export const EditarCalificacionPage = () => {

  const {
    alumnos,
    materias,
    loading: loadingAlumnos,
    error: errorAlumnos
  } = useMisAlumnos();

  const [selectedAlumno, setSelectedAlumno] = useState<Alumno | null>(null);

  useEffect(() => {
    if (alumnos.length > 0 && !selectedAlumno) {
      
      setSelectedAlumno(alumnos[0]); 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alumnos]); 


  const handleSelectAlumno = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const alumnoId = parseInt(e.target.value);
    const alumno = alumnos.find((a: Alumno) => a.id === alumnoId) || null;
    setSelectedAlumno(alumno);
  };
  

  if (loadingAlumnos) return <LoadingState />;

  if (errorAlumnos) return <p className="p-6 text-red-600">Error: {errorAlumnos}</p>;

  if (alumnos.length === 0) {
    return <p className="p-6 text-yellow-600">No tienes alumnos asignados para editar calificaciones.</p>;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-700 via-slate-800 to-slate-900 p-6 rounded-2xl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Editar Calificaciones
          </h1>
          <p className="text-slate-300 text-lg">
            Selecciona un alumno para revisar y actualizar sus calificaciones
          </p>
        </div>

        {/* Selector de Alumno */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <label htmlFor="select-alumno" className="block text-sm font-medium text-gray-700 mb-3">
            <svg className="inline w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Selecciona el alumno
          </label>
          <div className="relative">
            <select
              id="select-alumno"
              className="w-full px-4 py-3 text-base bg-linear-to-r from-purple-50 to-blue-50 border-2 border-purple-300 rounded-xl shadow-md appearance-none cursor-pointer hover:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200"
              value={selectedAlumno?.id || ''}
              onChange={handleSelectAlumno}
            >
              <option value="">Selecciona un alumno...</option>
              {alumnos.map((alumno: Alumno) => (
                <option key={alumno.id} value={alumno.id}>
                  {alumno.nombre} • Mat: {alumno.matricula}
                </option>
              ))}
            </select>
            
            {/* Icono personalizado */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Formulario de Edición por Alumno */}
        {selectedAlumno ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                Calificaciones de {selectedAlumno.nombre}
              </h2>
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                Mat: {selectedAlumno.matricula}
              </span>
            </div>
            
            <EditarCalificacionForm 
              key={selectedAlumno.id}
              alumno={selectedAlumno} 
              materias={materias} 
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Selecciona un alumno
            </h3>
            <p className="text-gray-600 text-lg">
              Elige un alumno del menú desplegable para comenzar a editar sus calificaciones
            </p>
          </div>
        )}
      </div>
    </div>
  );

}
export default EditarCalificacionPage;