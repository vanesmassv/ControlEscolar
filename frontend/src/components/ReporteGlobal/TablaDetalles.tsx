// src/components/ReporteGlobal/TablaDetalles.tsx
import type { DetalleAlumnoMateria } from '../../types/reporte';

interface Props {
  detalles: DetalleAlumnoMateria[];
}

export const TablaDetalles = ({ detalles }: Props) => {
  const getColorNota = (promedio: string) => {
    const num = parseFloat(promedio);
    if (num >= 8) return 'text-green-600 font-bold';
    if (num >= 6) return 'text-yellow-600 font-semibold';
    return 'text-red-600 font-bold';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Detalles por Alumno y Materia</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Matrícula
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Alumno
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Materia
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Promedio
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {detalles.map((detalle, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {detalle.matricula}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {detalle.alumno}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {detalle.materia}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-center ${getColorNota(detalle.promedio)}`}>
                  {detalle.promedio}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};