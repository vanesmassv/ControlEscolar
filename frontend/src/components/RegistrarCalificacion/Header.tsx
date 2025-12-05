// src/presentation/components/RegistrarCalificacion/Header.tsx
import type { Grupo } from '../../types';

interface HeaderProps {
  grupo: Grupo | null;
}

export const Header = ({ grupo }: HeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-white mb-2">
        Registrar Calificación
      </h1>
      {grupo && (
        <p className="text-slate-300 text-lg">
          Grupo: <span className="font-semibold text-white">{grupo.nombre}</span>
        </p>
      )}
    </div>
  );
};