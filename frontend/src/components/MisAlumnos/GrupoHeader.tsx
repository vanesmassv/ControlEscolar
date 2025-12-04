import type { Grupo } from '../../domain/entities/Grupo';

interface GrupoHeaderProps {
  grupo: Grupo | null;
}

export const GrupoHeader = ({ grupo }: GrupoHeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-white text-2xl font-bold mb-2">Mis Alumnos</h1>
      <p className="text-white">
        Grupo: <span className="font-semibold">{grupo?.nombre}</span>
      </p>
    </div>
  );
};