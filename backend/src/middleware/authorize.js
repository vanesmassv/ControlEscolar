export function requireRole(roleId) {
  return async (req, res, next) => {
    if (!req.user) throw new UnauthorizedError('Token requerido');

    // CAMBIO AQUÍ: Usa req.user.id en vez de req.user.usuario_id
    // (A menos que al crear el token hayas guardado explícitamente "usuario_id")
    const has = await Usuarios.findOne({ 
        where: { 
            id: req.user.id, // <--- Verifica que esto coincida con tu DB
            rol_id: roleId 
        } 
    });
    
    if (!has) throw new ForbiddenError('Acceso denegado');
    next();
  };
}