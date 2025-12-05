import type { Usuario } from '../domain/entities/auth';

export class NavigationService {
  getRedirectPath(user: Usuario): string {
    const routeMap: Record<string, string> = {
      'ADMIN': '/admin',
      'MAESTRO': '/maestro/dashboard',
      
    };

    const path = routeMap[user.rol];

    if (!path) {
      throw new Error('Rol no reconocido');
    }

    return path;
  }

  redirect(path: string): void {
    window.location.href = path;
  }
}