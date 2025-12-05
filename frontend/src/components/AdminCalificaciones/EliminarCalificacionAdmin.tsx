import { useEliminarCalificacion } from "../../hooks/useEliminarCalificacion";

interface Props {
  calificacionId: number;
  onEliminada?: () => void; // Para refrescar la tabla si quieres
}

export const EliminarCalificacionAdmin = ({ calificacionId, onEliminada }: Props) => {
  const {
    eliminarCalificacion,
    loading,
    error,
    success,
    //clearMessages
  } = useEliminarCalificacion();

  const handleEliminar = async () => {
    const confirmacion = confirm("¿Seguro que deseas eliminar esta calificación?");
    if (!confirmacion) return;

    const ok = await eliminarCalificacion(calificacionId);

    if (ok && onEliminada) {
      onEliminada(); // recargar lista
    }
  };

  return (
    <div>
      <button
        onClick={handleEliminar}
        disabled={loading}
        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? "Eliminando..." : "Eliminar"}
      </button>

      {error && (
        <p className="text-red-500 mt-2">{error}</p>
      )}

      {success && (
        <p className="text-green-600 mt-2">{success}</p>
      )}
    </div>
  );
};
