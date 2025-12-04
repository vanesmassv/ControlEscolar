import type { AuthRepository } from '../repositories/AuthRepository';
import type { LoginCredentials } from '../entities/auth';
import { TokenService } from '../../services/TokenService';
import { NavigationService } from '../../services/NavigationService';

export class LoginUseCase {
  private authRepository: AuthRepository;
  private tokenService: TokenService;
  private navigationService: NavigationService;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
    this.tokenService = new TokenService();
    this.navigationService = new NavigationService();
  }

  async execute(credentials: LoginCredentials): Promise<void> {
    // 1. Llamar al login
    const response = await this.authRepository.login(credentials);

    // 2. Validar token
    const token = response?.data?.token;
    if (!token) {
      throw new Error('El servidor no devolvió token');
    }

    // 3. Guardar token
    this.authRepository.saveToken(token);

    // 4. Extraer usuario del token
    const user = this.tokenService.extractUserFromToken(token);

    // 5. Guardar usuario
    this.authRepository.saveUser(user);

    // 6. Redirigir según rol
    const redirectPath = this.navigationService.getRedirectPath(user);
    this.navigationService.redirect(redirectPath);
  }
}