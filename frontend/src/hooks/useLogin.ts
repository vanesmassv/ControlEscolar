// src/presentation/hooks/useLogin.ts
import { useState } from 'react';
import { LoginUseCase } from '../domain/usecases/LoginUseCase';
import { AuthApiRepository } from '../infraestructure/api/AuthApiRepository';
import type { LoginCredentials } from '../domain/entities/auth';

const authRepository = new AuthApiRepository();
const loginUseCase = new LoginUseCase(authRepository);

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError('');

    try {
      await loginUseCase.execute(credentials);
      // La redirección se hace automáticamente en el UseCase
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