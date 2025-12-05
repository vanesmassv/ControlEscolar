import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Alumno, Calificacion } from '../../types';

interface CalificacionCardProps {
  alumno: Alumno;
  onDelete: (calificacion: Calificacion, alumno: Alumno) => void;
}

export const CalificacionCard: React.FC<CalificacionCardProps> = ({ alumno, onDelete }) => {
  if (alumno.calificaciones.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{alumno.nombre}</h3>
            <p className="text-sm text-gray-500">Matrícula: {alumno.matricula}</p>
          </div>
        </div>
        <p className="text-red-500 text-sm mt-4">Sin calificaciones registradas</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-gray-200 hover:border-purple-300 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{alumno.nombre}</h3>
          <p className="text-sm text-gray-500">Matrícula: {alumno.matricula}</p>
        </div>
      </div>

      <div className="space-y-3">
        {alumno.calificaciones.map((cal) => {
          // ✅ Validar que la materia exista
          if (!cal.materia) {
            return null;
          }

          return (
            <div
              key={cal.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900">{cal.materia.nombre}</p>
                {cal.observaciones && (
                  <p className="text-sm text-gray-600 mt-1">{cal.observaciones}</p>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-purple-600">
                  {cal.nota}
                </span>
                
                <button
                  onClick={() => onDelete(cal, alumno)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Eliminar calificación"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};