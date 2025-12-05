import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { LoginUseCase } from '../domain/usecases/LoginUseCase';
import { AuthApiRepository } from '../infraestructure/api/AuthApiRepository';
import type { LoginCredentials } from '../domain/entities/auth';

const authRepository = new AuthApiRepository();
const loginUseCase = new LoginUseCase(authRepository);

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // 2. Inicializar navegación
  const navigate = useNavigate();

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError('');

    try {
      
      const user = await loginUseCase.execute(credentials);
      
      console.log("Usuario logueado:", user);

      // 4. Redirigir según el rol
      setTimeout(() => {
        if (user.rol === 'ADMIN' || user.rol === 'CONTROL_ESCOLAR') {
          navigate('/admin');
        } else if (user.rol === 'MAESTRO') {
          navigate('/maestro/dashboard/alumnos');
        }
      }, 100);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error de conexión';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError('');

  return { login, isLoading, error, clearError };
};