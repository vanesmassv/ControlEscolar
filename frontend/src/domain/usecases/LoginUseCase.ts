import type { AuthRepository } from '../repositories/AuthRepository';
import { TokenService } from '../../services/TokenService';
// Quitamos NavigationService porque ya no lo usamos aquí
import type { Usuario, LoginCredentials } from '../../types'; 

// Definimos una interfaz para evitar el error de "Unexpected any"
interface LoginResponse {
  token?: string;
  data?: {
    token?: string;
  };
  user?: Usuario;
}

export class LoginUseCase {
  private authRepository: AuthRepository;
  // Quitamos tokenService y navigationService del constructor
  // porque usaremos los métodos estáticos directamente.

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(credentials: LoginCredentials): Promise<Usuario> {
    const { email, password } = credentials;

    if (!email || !password) {
      throw new Error('Email y contraseña son requeridos');
    }

    // 1. Login - Usamos "as LoginResponse" para evitar el error de "any"
    // Hacemos un casteo seguro para que TypeScript sepa qué esperar
    const response = (await this.authRepository.login(credentials)) as LoginResponse;
    console.log('✅ Respuesta del login:', response);

    // 2. Extraer token
    // Buscamos el token en ambas ubicaciones posibles
    const token = response.token || response.data?.token;

    if (!token) {
      throw new Error('El servidor no devolvió token');
    }

    // 3. Guardar token - CAMBIO CLAVE: Usamos TokenService directamente (Mayúscula)
    TokenService.setToken(token);
    console.log('✅ Token guardado:', token);

    // 4. Extraer y guardar usuario - CAMBIO CLAVE: TokenService estático
    const user = TokenService.extractUserFromToken(token);
    console.log('✅ Usuario extraído:', user);
    
    localStorage.setItem('user', JSON.stringify(user));

    // Devolvemos el usuario para que useLogin lo use
    return user; 
  }
}