import { Link, Outlet } from "react-router-dom";
import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    // Contenedor principal: color de fondo gris oscuro, ajusta a toda la pantalla
    <div className="bg-gray-700 flex min-h-screen rounded-2xl">
      
      {/* Sidebar (Menú Lateral) */}
      {/* Cambiamos el estilo para diferenciarlo del Maestro, usando azul oscuro y un borde */}
      <aside className="w-70 bg-gray-800 shadow-lg p-5 rounded-tl-2xl rounded-bl-2xl border-r-4 border-indigo-500">
        <h2 className="text-2xl  mb-8 text-white">Panel Administrador</h2>

        <nav className="space-y-4">
          
          <Link 
            
            to="reporte-global" 
            className="block text-white bg-indigo-600 py-3 px-4 rounded-lg font-semibold transition duration-300 hover:bg-indigo-700 hover:shadow-lg"
          >
            Reporte Global de Calificaciones
          </Link>

          <Link 
            
            to="eliminar-calificaciones" 
            className="block text-white bg-indigo-600 py-3 px-4 rounded-lg font-semibold transition duration-300 hover:bg-indigo-700 hover:shadow-lg"
          >
            Eliminar Calificacion
          </Link>

        </nav>
      </aside>
      
      {/* Área de Contenido Principal */}
      <main className="flex-1 p-8 text-white">
        
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;