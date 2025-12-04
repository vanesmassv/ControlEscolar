import models from "../models/index.js";
import NotFoundError from "../errors/NotFoundError.js";
import UnauthorizedError from '../errors/UnauthorizedError.js'; 

class Admin {
    async eliminarCalificacion(calificacion_id, usuarioId) { 
        
        
        const usuario = await models.Usuarios.findByPk(usuarioId, {
            include: [{
                model: models.Rol,
                as: 'rol', 
                attributes: ['nombre']
            }]
        });

        if (!usuario || !usuario.rol || !usuario.rol.nombre) {
            
            throw new UnauthorizedError('Usuario no encontrado o rol no asignado.');
        }

        
        if (usuario.rol.nombre !== 'ADMIN') {
            throw new UnauthorizedError('Solo los administradores pueden eliminar calificaciones.');
        }
        
        const calificacionExiste = await models.Calificaciones.findByPk(calificacion_id);

        if (!calificacionExiste) {
            throw new NotFoundError('Calificación no encontrada');
        }

        
        await calificacionExiste.destroy();

        return true; 
    }
}



export default new Admin();

