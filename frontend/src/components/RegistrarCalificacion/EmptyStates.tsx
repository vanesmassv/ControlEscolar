import React from 'react';
import { BookOpen, CheckCircle } from 'lucide-react';

interface EmptyStateProps {
  type: 'select-subject' | 'all-graded';
  subjectName?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type, subjectName }) => {
  if (type === 'select-subject') {
    return (
      <div className="bg-white rounded-lg shadow-lg p-12 text-center">
        <BookOpen className="w-20 h-20 text-purple-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Selecciona una materia
        </h3>
        <p className="text-gray-600 text-lg">
          Elige una materia para comenzar a registrar calificaciones
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-12 text-center">
      <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        ¡Todos calificados!
      </h3>
      <p className="text-gray-600 text-lg">
        Ya has calificado a todos los alumnos en{' '}
        <span className="font-semibold">{subjectName}</span>
      </p>
    </div>
  );
};