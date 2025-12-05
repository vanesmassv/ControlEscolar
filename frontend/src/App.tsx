import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import MisAlumnos from './components/MisAlumnos/MisAlumnos';
import LoginPage from './pages/login/loginPage';
import { RegistrarCalificacionPage } from './pages/calificacion/RegistrarCalificacionPage';
import MaestroDashboard from './pages/maestro/maestroDashboard';
import UnauthorizedPage from './pages/NotFound';
import NotFoundPage from './pages/Unauthorized';
import AdminDashboard from './pages/admin/AdminDashboard';
import { ReporteGlobalPage } from './pages/admin/ReporteGlobalPage';
import { EditarCalificacionesPage } from './pages/admin/EditarCalifficacionesPage'; 
import { EditarCalificacionPage } from './pages/calificacion/EditarCalificacionPage'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Rutas protegidas para MAESTRO */}
        <Route element={<ProtectedRoute allowedRole="MAESTRO" />}>
          <Route path="/maestro/dashboard" element={<MaestroDashboard />}>
            <Route path="alumnos" element={<MisAlumnos />} />
            <Route path="registrar-calificacion" element={<RegistrarCalificacionPage />} />
            <Route path='editar-calificacion' element={<EditarCalificacionPage/>}/>
          </Route>
        </Route>

        {/* Rutas protegidas para ADMIN/CONTROL_ESCOLAR */}
        <Route element={<ProtectedRoute allowedRole="CONTROL_ESCOLAR" />}> 
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="reporte-global" element={<ReporteGlobalPage />} />
            <Route path="eliminar-calificaciones" element={<EditarCalificacionesPage />} /> 
          </Route>
        </Route>

        {/* Páginas de error */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;