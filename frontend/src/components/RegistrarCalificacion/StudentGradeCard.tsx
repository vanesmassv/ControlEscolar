import React from 'react';
import { X } from 'lucide-react';
import type { Alumno, Materia } from '../../types';

interface GradeInput {
  alumnoId: number;
  materiaId: number;
  calificacion: number;
  observaciones: string;
}

interface StudentGradeCardProps {
  alumno: Alumno;
  materia: Materia;
  gradeInput: GradeInput | undefined;
  onChange: (input: GradeInput) => void;
  onCancel: (alumnoId: number) => void;
}

export const StudentGradeCard: React.FC<StudentGradeCardProps> = ({
  alumno,
  materia,
  gradeInput,
  onChange,
  onCancel
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-blue-100 hover:border-blue-300 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{alumno.nombre}</h3>
          <p className="text-sm text-gray-500">Matrícula: {alumno.matricula}</p>
        </div>
        <button
          onClick={() => onCancel(alumno.id)}
          className="text-gray-400 hover:text-red-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calificación (0-10)
          </label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={gradeInput?.calificacion ?? ''}
            onChange={(e) => {
              const val = e.target.value === '' ? 0 : Number(e.target.value);
              onChange({
                alumnoId: alumno.id,
                materiaId: materia.id,
                calificacion: val,
                observaciones: gradeInput?.observaciones || ''
              });
            }}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Escribe la calificación..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observaciones
          </label>
          <textarea
            value={gradeInput?.observaciones || ''}
            onChange={(e) => onChange({
              alumnoId: alumno.id,
              materiaId: materia.id,
              calificacion: gradeInput?.calificacion ?? 0,
              observaciones: e.target.value
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            placeholder="Comentarios sobre el desempeño del alumno..."
          />
        </div>
      </div>
    </div>
  );
};