interface Props {
  promedio: string;
}

export const PromedioGeneralCard = ({ promedio }: Props) => {
  const promedioNum = parseFloat(promedio);
  const color = promedioNum >= 8 ? 'bg-green-500' : promedioNum >= 6 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <h3 className="text-gray-600 text-sm font-medium mb-2">Promedio General</h3>
      <div className={`${color} text-white rounded-full w-32 h-32 mx-auto flex items-center justify-center`}>
        <span className="text-4xl font-bold">{promedio}</span>
      </div>
    </div>
  );
};