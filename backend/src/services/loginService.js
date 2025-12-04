import models from "../models/index.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from "../database/env.js"; 
import NotFoundError from '../errors/NotFoundError.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';




export const findUserByEmail = async (email) => {
    return await models.Usuarios.findOne({ 
        where: { email },});
};

export const hashedPassword = async (password) => {
    return await bcrypt.hash(password, 8);
}

export const verifyPassword = async(password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
}

export const getRoles = async(id) => {
    return await models.Usuarios.findAll({ where: { id } });
}

class LoginService {
    async findById(id) {
        return models.Usuarios.findOne({ where: { id: id } });
    }

    async autenticarUsuario({ email, password }) {
        const user = await findUserByEmail(email);
        if (!user) throw new NotFoundError('No existe un usuario con ese correo');
        const roles = await getRoles(user.id);
        const verified = await verifyPassword(password, user.password_hash);
        if (!verified) throw new UnauthorizedError('Contraseña incorrecta');
        const token = jwt.sign({ id: user.id, email: user.email, roles: [roles] }, JWT_SECRET, {
            expiresIn: '30m',
        });
        const { password_hash: _, ...response } = user.toJSON();
        return { token, user: response };
    }
}

export default new LoginService();

