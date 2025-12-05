import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface AlertMessageProps {
  type: 'error' | 'success';
  message: string;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({ type, message }) => {
  const isError = type === 'error';
  
  return (
    <div className={`${isError ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'} border-2 rounded-lg p-4 mb-6 flex items-start gap-3`}>
      {isError ? (
        <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 shrink-0" />
      ) : (
        <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 shrink-0" />
      )}
      <div className="flex-1">
        <h3 className={`font-medium ${isError ? 'text-red-900' : 'text-green-900'} text-lg`}>
          {isError ? 'Error' : 'Éxito'}
        </h3>
        <p className={isError ? 'text-red-700' : 'text-green-700'}>{message}</p>
      </div>
    </div>
  );
};