interface AlumnoInfoProps {
  nombre: string;
  matricula: string;
}

export const AlumnoInfo = ({ nombre, matricula }: AlumnoInfoProps) => {
  return (
    <div className="mb-2">
      <p className="font-semibold text-lg">{nombre}</p>
      <p className="text-sm text-gray-500">Matrícula: {matricula}</p>
    </div>
  );
};