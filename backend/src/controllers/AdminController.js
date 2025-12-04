import AdminService from '../services/ControlService.js';
import NotFoundError from '../errors/NotFoundError.js';

export const eliminarCalificacion = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioId = req.user.id;

        await AdminService.eliminarCalificacion(id, usuarioId);

        res.json({
            success: true,
            message: 'Calificación eliminada exitosamente'
        });

    } catch (error) {
        console.error('Error al eliminar calificación:', error);

        if (error instanceof NotFoundError) {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error al eliminar calificación'
        });
    }
};