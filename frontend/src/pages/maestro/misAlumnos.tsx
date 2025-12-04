import { useEffect, useState } from "react";
import { alumnosService } from "../../services/alumnosService";
import type { Alumno, Grupo } from "../../types";

const MisAlumnos = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [grupo, setGrupo] = useState<Grupo | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const cargar = async () => {
    try {
      const response = await alumnosService.getMisAlumnos();
      setGrupo(response.data.grupo);
      setAlumnos(response.data.alumnos);
    } catch (err) {
      console.error('Error cargando alumnos:', err);
    } finally {
      setLoading(false);
    }
  };

  cargar();
}, []);

  if (loading) return <p className="p-6">Cargando alumnos...</p>;

  return (
    <div className="p-6">
      <h1 className="text-white text-2xl font-bold mb-2">Mis Alumnos</h1>
      <p className="mb-6 text-white">
        Grupo: <span className="font-semibold">{grupo?.nombre}</span>
      </p>

      {alumnos.map((alumno) => (
        <div key={alumno.id} className="mb-6 bg-white shadow rounded-xl p-4">

          {/* INFO DEL ALUMNO */}
          <div className="mb-2">
            <p className="font-semibold text-lg">{alumno.nombre}</p>
            <p className="text-sm text-gray-500">
              Matrícula: {alumno.matricula}
            </p>
          </div>

          {/* SI TIENE CALIFICACIONES */}
          {alumno.calificaciones.length > 0 ? (
            <table className="w-full text-sm mt-3">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="p-2 text-left">Materia</th>
                  <th className="p-2 text-center">Calificación</th>
                  <th className="p-2 text-left">Observaciones</th>
                </tr>
              </thead>
              <tbody>
                {alumno.calificaciones.map((cal) => (
                  <tr key={cal.id} className="border-b">
                    <td className="p-2">{cal.materia.nombre}</td>
                    <td className="p-2 text-center font-semibold">
                      {cal.nota}
                    </td>
                    <td className="p-2">{cal.observaciones}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="mt-3 text-red-500 font-semibold">
              Sin calificaciones registradas
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default MisAlumnos;
