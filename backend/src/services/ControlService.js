import models from '../models/index.js';
import { BadRequestError } from '../errors/BadRequest.js';
import NotFoundError from '../errors/NotFoundError.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';

class Admin {
    async eliminarCalificacion(calificacion_id, usuarioId, rolUsuario) {
        console.log('=== DEBUG ELIMINAR ===');
        console.log('calificacion_id:', calificacion_id);
        console.log('usuarioId:', usuarioId);
        console.log('rolUsuario:', rolUsuario);
        console.log('====================');

       
        const rolesAdmin = ['ADMIN', 'CONTROL_ESCOLAR'];
        
        if (!rolesAdmin.includes(rolUsuario)) {
            throw new UnauthorizedError('No tienes permisos para eliminar calificaciones.');
        }

        const calificacionExiste = await models.Calificaciones.findByPk(calificacion_id);

        if (!calificacionExiste) {
            throw new NotFoundError('Calificación no encontrada');
        }

        await calificacionExiste.destroy();

        return { success: true, message: 'Calificación eliminada correctamente' }; 
    }
}

export default new Admin();