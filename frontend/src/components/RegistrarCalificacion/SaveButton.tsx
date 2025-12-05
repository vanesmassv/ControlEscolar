import React from 'react';
import { Save } from 'lucide-react';

interface SaveButtonProps {
  count: number;
  loading: boolean;
  onClick: () => void;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ count, loading, onClick }) => {
  if (count === 0) return null;

  return (
    <div className="sticky top-6 z-10 mb-6">
      <button
        onClick={onClick}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-lg text-lg font-semibold"
      >
        <Save className="w-6 h-6" />
        {loading ? 'Guardando...' : `Guardar ${count} calificación(es)`}
      </button>
    </div>
  );
};