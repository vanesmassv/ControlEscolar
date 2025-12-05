import { Link, Outlet } from "react-router-dom";

const MaestroDashboard = () => {
  return (
    <div className="bg-gray-700 flex min-h-screen rounded-2xl">
      <aside className="w-70 bg-white shadow-lg p-5 rounded-tl-2xl rounded-bl-2xl ">
        <h2 className="text-xl font-bold mb-6">Panel Maestro</h2>

        <nav className="space-y-3">
            <Link 
                to="alumnos" 
                
                className="block text-black bg-blue-400 py-2 px-3 rounded-md transition duration-300 hover:bg-indigo-700 hover:text-white"
            >
                Mis alumnos
            </Link>
            
            <Link 
                to="registrar-calificacion" 
                className="block text-black bg-blue-400 py-2 px-3 rounded-md transition duration-300 hover:bg-indigo-700 hover:text-white"
            >
                Registrar calificación
            </Link>

            <Link 
                to="editar-calificacion" 
                className="block text-black bg-blue-400 py-2 px-3 rounded-md transition duration-300 hover:bg-indigo-700 hover:text-white"
            >
                Editar calificaciones
            </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MaestroDashboard;
