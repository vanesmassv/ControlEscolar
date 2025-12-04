// src/presentation/components/auth/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import useAuth  from '../hooks/useAuth';

interface ProtectedRouteProps {
  allowedRole?: string;
  redirectTo?: string;
}

const ProtectedRoute = ({ 
  allowedRole, 
  redirectTo = '/' 
}: ProtectedRouteProps) => {
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRole && !hasRole(allowedRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;