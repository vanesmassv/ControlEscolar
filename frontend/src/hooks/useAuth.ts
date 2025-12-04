import authService from '../services/authService';

const useAuth = () => {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getUser();
  const token = authService.getToken();

  const hasRole = (role: string) => {
    return user?.rol === role;
  };

  return {
    isAuthenticated,
    user,
    token,
    hasRole,
  };
};

export default useAuth;