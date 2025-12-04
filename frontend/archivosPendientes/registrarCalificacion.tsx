import { useState } from 'react';
// Asegúrate de importar Materia, Calificacion y Alumno
import type { Alumno, Materia} from '../../types'; 
import { calificacionService } from '../../services/calificacionService';
import axios from 'axios';

// ✅ CORRECCIÓN 1: La interfaz Props debe recibir la lista de materias.
interface Props {
  alumno: Alumno;
  materias: Materia[]; // Asumimos que la Materia tiene id y nombre
}

const RegistrarCalificacion = ({ alumno, materias }: Props) => {
  
  // Helper para buscar una calificación existente por ID de materia
  const findCalificacion = (materiaId: number) => {
    return alumno.calificaciones.find(cal => cal.materia?.id === materiaId);
  };

  // ✅ CORRECCIÓN 2: Inicializar el estado de notas usando TODAS las materias
  const [notas, setNotas] = useState<Record<number, string>>(() => 
    materias.reduce((acc, materia) => {
        const calExistente = findCalificacion(materia.id);
        // Usar la nota existente o cadena vacía si no existe
        acc[materia.id] = calExistente ? (calExistente.nota || '') : ''; 
        return acc;
    }, {} as Record<number, string>)
  );

  const [observaciones, setObservaciones] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (materiaId: number, value: string) => {
    setNotas(prev => ({ ...prev, [materiaId]: value }));
  };

  // ✅ CORRECCIÓN 3: El handler debe recibir el ID de calificación existente (si hay)
  const handleSubmit = async (materiaId: number, calificacionId?: number) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
        const payload = {
            alumno_id: alumno.id,
            materia_id: materiaId,
            nota: notas[materiaId],
            observaciones
        };

        

        // Determinar si es CREAR o ACTUALIZAR
        if (calificacionId) {
            // Asumimos que tienes un servicio para actualizar (PUT/PATCH)
            await calificacionService.actualizarCalificacion(calificacionId, payload); 
        } else {
            // Si no hay ID, es una creación (POST)
            await calificacionService.crearCalificacion(payload);
        }

        setSuccess(`Calificación ${calificacionId ? 'actualizada' : 'registrada'} correctamente`);
        
        // 💡 NOTA: En un caso real, aquí deberías actualizar el estado 'alumno'
        // con la calificación recién creada/actualizada para mantener la UI sincronizada.
        
    } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response?.data?.message) {
            setError(err.response.data.message);
        } else if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Error al registrar calificación');
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="font-bold mb-2">{alumno.nombre} - {alumno.matricula}</h2>

      {/* ✅ CORRECCIÓN 4: Iterar sobre la lista de MATERIAS */}
      {materias.length > 0 ? (
        materias.map(materia => {
          const calExistente = findCalificacion(materia.id);
          const calificacionId = calExistente?.id;
          const buttonText = calExistente ? 'Actualizar' : 'Guardar';
          
          return (
            <div key={materia.id} className="mb-4 flex items-center space-x-2">
              <label className="block font-semibold w-1/3">{materia.nombre}</label>
              
              <input
                type="text"
                value={notas[materia.id] || ''}
                onChange={e => handleChange(materia.id, e.target.value)}
                className="border p-1 rounded w-24"
                placeholder="Nota"
              />
              <button
                // Pasar el ID de la calificación existente o 'undefined'
                onClick={() => handleSubmit(materia.id, calificacionId)} 
                disabled={loading}
                className="bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700"
              >
                {loading ? 'Guardando...' : buttonText}
              </button>
            </div>
          );
        })
      ) : (
        <p className="mt-3 text-yellow-600 font-semibold">
          No hay materias asignadas a tu perfil para registrar.
        </p>
      )}

      {/* Observaciones input: se usa el mismo para todas las calificaciones */}
      <div className="mt-2">
        <label className="block font-semibold">Observaciones</label>
        <textarea
          value={observaciones}
          onChange={e => setObservaciones(e.target.value)}
          className="border p-1 rounded w-full"
          placeholder="Observaciones generales..."
        />
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};

export default RegistrarCalificacion;