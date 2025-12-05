import { useState, useEffect } from 'react';
import type { Alumno, Materia, Calificacion } from '../../types'; 
import { useEditarCalificacion } from '../../hooks/useEditarCalificacion'; 

interface Props {
  alumno: Alumno;
  materias: Materia[];
}

interface CalificacionEditState {
    nota: string;
    observaciones: string;
    loading: boolean;
    error: string | null;
    success: string | null;
}

type EditStateMap = Record<number, CalificacionEditState>;

const EditarCalificacionForm = ({ alumno, materias }: Props) => {
    const { editarCalificacion } = useEditarCalificacion(); 
    
    
    const [editStates, setEditStates] = useState<EditStateMap>(() => {
        return alumno.calificaciones.reduce((acc, cal) => {
            acc[cal.id] = {
                nota: String(cal.nota || ''), 
                observaciones: cal.observaciones || '',
                loading: false,
                error: null,
                success: null,
            };
            return acc;
        }, {} as EditStateMap);
    });
    
    
    useEffect(() => {
        const initialEditStates: EditStateMap = alumno.calificaciones.reduce((acc, cal) => {
            acc[cal.id] = {
                nota: String(cal.nota || ''), 
                observaciones: cal.observaciones || '',
                loading: false,
                error: null,
                success: null,
            };
            return acc;
        }, {} as EditStateMap);
        
        setEditStates(initialEditStates);
    }, [alumno]);

    const findMateriaName = (materiaId?: number) => {
        return materias.find(m => m.id === materiaId)?.nombre || 'Materia Desconocida';
    };

    const handleChange = (calId: number, field: 'nota' | 'observaciones', value: string) => {
        setEditStates(prev => ({
            ...prev,
            [calId]: {
                ...prev[calId],
                [field]: value,
                error: null,
                success: null,
            }
        }));
    };

    const handleSubmit = async (calId: number) => {
        const state = editStates[calId];
        if (!state) return;

        setEditStates(prev => ({
            ...prev,
            [calId]: { ...prev[calId], loading: true, error: null, success: null }
        }));
        
        const notaNumerica = parseFloat(state.nota);

        try {
            await editarCalificacion(calId, notaNumerica, state.observaciones);
            
            setEditStates(prev => ({
                ...prev,
                [calId]: { ...prev[calId], success: '¡Editado!', loading: false }
            }));
            
            // ✅ Limpiar el mensaje de éxito después de 3 segundos
            setTimeout(() => {
                setEditStates(prev => ({
                    ...prev,
                    [calId]: { ...prev[calId], success: null }
                }));
            }, 3000);
            
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido al guardar.';
            setEditStates(prev => ({
                ...prev,
                [calId]: { ...prev[calId], error: errorMessage, loading: false }
            }));
        }
    };

    if (alumno.calificaciones.length === 0) {
        return <p className="text-gray-500">Este alumno no tiene calificaciones registradas.</p>;
    }

    return (
        <div className="space-y-6">
            {alumno.calificaciones.map((cal: Calificacion) => {
                // ✅ Verificar que el estado existe antes de usarlo
                const state = editStates[cal.id];
                
                // ✅ Si no existe el estado, no renderizar este item
                if (!state) {
                    return null;
                }

                const materiaName = findMateriaName(cal.materia?.id);
                const buttonText = state.loading ? 'Guardando...' : 'Actualizar';
                const isNotaValid = !isNaN(parseFloat(state.nota)) && parseFloat(state.nota) >= 0 && parseFloat(state.nota) <= 10;

                return (
                    <div 
                        key={cal.id} 
                        className={`p-4 border rounded-lg flex flex-col md:flex-row md:items-center justify-between transition-all ${
                            state.success 
                                ? 'border-green-400 bg-green-50' 
                                : 'border-gray-200 bg-white'
                        }`}
                    >
                        {/* Materia y Nota */}
                        <div className="flex-1 mb-2 md:mb-0">
                            <p className="font-semibold text-lg">{materiaName}</p>
                            <div className="flex items-center space-x-2 mt-1">
                                <label className="text-sm text-gray-600">Nota:</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    value={state.nota}
                                    onChange={e => handleChange(cal.id, 'nota', e.target.value)}
                                    className={`border p-1 rounded w-20 text-center focus:ring-indigo-500 focus:border-indigo-500 ${
                                        !isNotaValid ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    disabled={state.loading}
                                />
                            </div>
                            
                            {/* Observaciones */}
                            <div className="mt-2">
                                <label htmlFor={`obs-${cal.id}`} className="text-sm text-gray-600 block">
                                    Observaciones:
                                </label>
                                <textarea
                                    id={`obs-${cal.id}`}
                                    value={state.observaciones}
                                    onChange={e => handleChange(cal.id, 'observaciones', e.target.value)}
                                    className="border p-1 rounded w-full text-sm mt-1 focus:ring-indigo-500 focus:border-indigo-500"
                                    rows={2}
                                    disabled={state.loading}
                                />
                            </div>
                        </div>

                        {/* Acciones y Mensajes */}
                        <div className="flex flex-col items-end space-y-2 md:ml-4">
                            <button
                                onClick={() => handleSubmit(cal.id)}
                                disabled={state.loading || !isNotaValid}
                                className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
                                    state.loading || !isNotaValid 
                                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                }`}
                            >
                                {buttonText}
                            </button>
                            
                            {state.error && (
                                <p className="text-xs text-red-500 max-w-xs text-right">
                                    {state.error}
                                </p>
                            )}
                            
                            {state.success && (
                                <p className="text-xs text-green-600 max-w-xs text-right font-medium">
                                    {state.success}
                                </p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default EditarCalificacionForm;