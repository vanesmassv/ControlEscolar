// src/routes/ProtectedRoute.tsx (o donde lo tengas)
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRole?: string;
  redirectTo?: string;
}

const ProtectedRoute = ({ 
  allowedRole, 
  redirectTo = '/' 
}: ProtectedRouteProps) => {
  // Verificar autenticación
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');

  console.log('🔒 ProtectedRoute - Token:', token ? 'Existe' : 'No existe');
  console.log('🔒 ProtectedRoute - User:', userStr);

  if (!token) {
    console.log('❌ No hay token, redirigiendo a:', redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  // Verificar rol si es necesario
  if (allowedRole && userStr) {
    const user = JSON.parse(userStr);
    console.log('🔒 Verificando rol:', user.rol, 'vs', allowedRole);

    if (user.rol !== allowedRole) {
      console.log('❌ Rol no autorizado, redirigiendo a /unauthorized');
      return <Navigate to="/unauthorized" replace />;
    }
  }

  console.log('✅ Acceso permitido');
  return <Outlet />;
};

export default ProtectedRoute;