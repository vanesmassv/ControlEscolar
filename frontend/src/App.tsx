import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import MisAlumnos from './components/MisAlumnos/MisAlumnos';
import LoginPage from './pages/login/loginPage';
import MaestroDashboard from './pages/maestro/maestroDashboard';
import UnauthorizedPage from './pages/NotFound';
import NotFoundPage from './pages/Unauthorized';

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
          </Route>
        </Route>

        
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
