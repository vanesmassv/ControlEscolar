import { useEffect, useState } from "react";
import { alumnosService } from "../../services/alumnosService";

import type { Alumno, RespuestaMisAlumnos } from "../../types"; 
import RegistrarCalificacion from "../maestro/registrarCalificacion";


type AlumnosDataPayload = RespuestaMisAlumnos extends { data: infer T } ? T : never;


const RegistrarCalificacionPage = () => {

  const [data, setData] = useState<AlumnosDataPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAlumno, setSelectedAlumno] = useState<Alumno | null>(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        

        const response = await alumnosService.getMisAlumnos();
        

        setData(response.data as AlumnosDataPayload); 
        

        if (response.data.alumnos.length > 0) { 
          setSelectedAlumno(response.data.alumnos[0]); 
        }
      } catch (err) {
        console.error('Error cargando datos:', err);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  if (loading) return <p className="p-6">Cargando alumnos y materias...</p>;


  if (!data || data.alumnos.length === 0) {
    return <p className="p-6 text-xl font-semibold">No hay alumnos asignados a tu grupo ({data?.grupo.nombre}).</p>;
  }


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Registrar Calificación</h1>
      <p className="mb-6 text-gray-600">
        Grupo: <span className="font-semibold">{data.grupo.nombre}</span>
      </p>

      {/* 2. Selector de Alumno (Dropdown) */}
      <div className="mb-6">
        <label htmlFor="select-alumno" className="block text-sm font-medium text-gray-700 mb-1">
          Seleccionar Alumno:
        </label>
        <select
          id="select-alumno"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={selectedAlumno?.id || ''}
          // ✅ CORRECCIÓN 3: Tipar el parámetro del callback
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { 
            const alumnoId = parseInt(e.target.value);
            // El 'data' ya tiene la propiedad 'alumnos'
            const alumno = data.alumnos.find((a: Alumno) => a.id === alumnoId) || null; // ✅ Tipar 'a' como Alumno
            setSelectedAlumno(alumno);
          }}
        >
          {data.alumnos.map((alumno: Alumno) => ( // ✅ Tipar 'alumno' como Alumno
            <option key={alumno.id} value={alumno.id}>
              {alumno.nombre} (Matrícula: {alumno.matricula})
            </option>
          ))}
        </select>
      </div>

        {/* 3. Renderizar el Formulario (Componente hijo) */}
        {selectedAlumno ? (
            <div className="mt-8 p-6 bg-white shadow-xl rounded-lg">
              <RegistrarCalificacion 
                    alumno={selectedAlumno} 
                    materias={data.materias} // ✅ SOLUCIÓN: Añadir la prop requerida
                />
            </div>
        ) : (
          <p>Selecciona un alumno para registrar calificaciones.</p>
        )}
    </div>
  );
};

export default RegistrarCalificacionPage;