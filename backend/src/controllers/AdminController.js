import Admin from '../services/ControlService.js';
import NotFoundError from '../errors/NotFoundError.js';

export const eliminarCalificacion = async (req, res, next) => {
  try {
    const calificacion_id = req.params.id;
    const usuarioId = req.user.id;
    const rolUsuario = req.user.rol;

    console.log('=== CONTROLLER DEBUG ===');
    console.log('req.user:', req.user);
    console.log('rolUsuario:', rolUsuario);
    console.log('Tipo de rolUsuario:', typeof rolUsuario);
    console.log('=======================');

    await Admin.eliminarCalificacion(calificacion_id, usuarioId, rolUsuario);

    res.status(200).json({
      success: true,
      message: 'Calificación eliminada exitosamente'
    });
  } catch (error) {
    next(error);
  }
};