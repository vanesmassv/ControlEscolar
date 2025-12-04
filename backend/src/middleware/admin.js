import models from '../models/index.js';



export default async function admin(req, res, next) {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Acceso denegado. Token no proporcionado." });
    }

    try {
        // 1. Buscar el usuario e incluir el Rol
        const userWithRole = await models.Usuarios.findByPk(req.user.id, {
            include: [{
                model: models.Rol,
                as: 'rol',
                attributes: ['nombre']
            }]
        });

        if (!userWithRole || !userWithRole.rol) {
            return res.status(403).json({ error: "Acceso denegado. Rol no asignado." });
        }

        if (userWithRole.rol.nombre !== 'CONTROL_ESCOLAR') {
            return res.status(403).json({ error: "Acceso denegado. Requiere rol de Administrador (CONTROL_ESCOLAR)." });
        }

        // 3. Todo OK, continuar
        next();

    } catch (error) {
        console.error("Error en middleware admin:", error);
        return res.status(500).json({ error: "Error interno del servidor al verificar el rol." });
    }
}