import type { ResumenMateria } from '../../types/reporte';

interface Props {
  materias: ResumenMateria[];
}

export const ResumenMaterias = ({ materias }: Props) => {
  const getColor = (promedio: string) => {
    const num = parseFloat(promedio);
    if (num >= 8) return 'bg-green-100 border-green-500 text-green-800';
    if (num >= 6) return 'bg-yellow-100 border-yellow-500 text-yellow-800';
    return 'bg-red-100 border-red-500 text-red-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Promedio por Materia</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {materias.map((materia) => (
          <div
            key={materia.materia}
            className={`p-4 rounded-lg border-l-4 ${getColor(materia.promedio)}`}
          >
            <p className="font-semibold text-sm mb-1">{materia.materia}</p>
            <p className="text-3xl font-bold">{materia.promedio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};