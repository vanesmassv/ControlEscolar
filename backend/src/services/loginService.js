import models from "../models/index.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from "../database/env.js"; 
import NotFoundError from '../errors/NotFoundError.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';

export const findUserByEmail = async (email) => {
    return await models.Usuarios.findOne({ 
        where: { email },
        include: [{
            model: models.Rol,
            as: 'rol',
            attributes: ['id', 'nombre']
        }]
    });
};

export const hashedPassword = async (password) => {
    return await bcrypt.hash(password, 8);
}

export const verifyPassword = async(password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
}

class LoginService {
    async findById(id) {
        return models.Usuarios.findOne({ 
            where: { id: id },
            include: [{
                model: models.Rol,
                as: 'rol',
                attributes: ['id', 'nombre']
            }]
        });
    }

    async autenticarUsuario({ email, password }) {
        const user = await findUserByEmail(email);
        
        if (!user) {
            throw new NotFoundError('No existe un usuario con ese correo');
        }

        const verified = await verifyPassword(password, user.password_hash);
        
        if (!verified) {
            throw new UnauthorizedError('Contraseña incorrecta');
        }

        // ✅ CORRECCIÓN: Extraer el nombre del rol correctamente
        const rolNombre = user.rol?.nombre || 'USUARIO';

        console.log('=== DEBUG LOGIN ===');
        console.log('user.rol:', user.rol);
        console.log('rolNombre extraído:', rolNombre);
        console.log('==================');

        // ✅ CORRECCIÓN: Generar token con el rol como STRING
        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email, 
                rol: rolNombre  // ← Solo el nombre como string
            }, 
            JWT_SECRET,
            { expiresIn: '30m' }
        );

        const { password_hash: _, ...response } = user.toJSON();
        
        return { 
            token, 
            user: {
                ...response,
                rol: rolNombre
            }
        };
    }
}

export default new LoginService();