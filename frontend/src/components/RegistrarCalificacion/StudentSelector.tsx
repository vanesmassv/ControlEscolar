import React from 'react';
import type { Alumno } from '../../types';

interface StudentSelectorProps {
  alumnos: Alumno[];
  onSelect: (alumnoId: number) => void;
}

export const StudentSelector: React.FC<StudentSelectorProps> = ({ alumnos, onSelect }) => {
  if (alumnos.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Selecciona un alumno para calificar
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {alumnos.map(alumno => (
          <button
            key={alumno.id}
            onClick={() => onSelect(alumno.id)}
            className="p-4 border-2 border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-left"
          >
            <p className="font-semibold text-gray-900">{alumno.nombre}</p>
            <p className="text-sm text-gray-500">Mat: {alumno.matricula}</p>
          </button>
        ))}
      </div>
    </div>
  );
};