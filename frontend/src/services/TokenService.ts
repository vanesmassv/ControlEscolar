// src/domain/services/TokenService.ts
import type { DecodedToken, Usuario } from '../domain/entities/auth';

export class TokenService {
  decodeToken(token: string): DecodedToken {
    try {
      const payloadBase64 = token.split('.')[1];
      return JSON.parse(atob(payloadBase64));
    } catch {
      throw new Error('Token inválido');
    }
  }

  extractUserFromToken(token: string): Usuario {
    const decoded = this.decodeToken(token);
    
    const rolData = decoded.roles?.[0]?.[0];
    
    if (!rolData) {
      throw new Error('El token no contiene información de rol');
    }

    return {
      id: String(decoded.id),
      email: decoded.email,
      nombre: rolData.nombre,
      rol: this.mapRoleIdToRoleName(rolData.rol_id)
    };
  }

  private mapRoleIdToRoleName(rolId: number): 'ADMIN' | 'MAESTRO' {
    const roleMap: Record<number, 'ADMIN' | 'MAESTRO'> = {
      1: 'ADMIN',
      2: 'MAESTRO',
    };

    const role = roleMap[rolId];
    
    if (!role) {
      throw new Error('Rol no reconocido');
    }

    return role;
  }
}