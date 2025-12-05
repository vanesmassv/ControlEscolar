import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-700 via-slate-800 to-slate-900 p-6 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-12 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 text-lg">Cargando datos...</p>
      </div>
    </div>
  );
};