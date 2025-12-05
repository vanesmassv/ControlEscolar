import React from 'react';
import { BookOpen } from 'lucide-react';
import type { Materia } from '../../types';

interface SubjectSelectorProps {
  materias: Materia[];
  selectedMateria: number | null;
  onChange: (materiaId: number | null) => void;
}

export const SubjectSelector: React.FC<SubjectSelectorProps> = ({
  materias,
  selectedMateria,
  onChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        <BookOpen className="inline w-5 h-5 mr-2 text-purple-600" />
        Selecciona la materia a calificar
      </label>
      <select
        value={selectedMateria ?? ''}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
      >
        <option value="">Seleccionar materia...</option>
        {materias.map(materia => (
          <option key={materia.id} value={materia.id}>
            {materia.nombre} {materia.codigo && `(${materia.codigo})`}
          </option>
        ))}
      </select>
    </div>
  );
};