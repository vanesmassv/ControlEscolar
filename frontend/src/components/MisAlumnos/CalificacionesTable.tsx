import type { Calificacion } from '../../domain/entities/Alumno';

interface CalificacionesTableProps {
  calificaciones: Calificacion[];
}

export const CalificacionesTable = ({ calificaciones }: CalificacionesTableProps) => {
  if (calificaciones.length === 0) {
    return (
      <p className="mt-3 text-red-500 font-semibold">
        Sin calificaciones registradas
      </p>
    );
  }

  return (
    <table className="w-full text-sm mt-3">
      <thead className="bg-indigo-600 text-white">
        <tr>
          <th className="p-2 text-left">Materia</th>
          <th className="p-2 text-center">Calificación</th>
          <th className="p-2 text-left">Observaciones</th>
        </tr>
      </thead>
      <tbody>
        {calificaciones.map((cal) => (
          <tr key={cal.id} className="border-b">
            <td className="p-2">{cal.materia.nombre}</td>
            <td className="p-2 text-center font-semibold">{cal.nota}</td>
            <td className="p-2">{cal.observaciones}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};