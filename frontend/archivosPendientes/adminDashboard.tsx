import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      <aside className="w-64 bg-white shadow-lg p-5">
        <h2 className="text-xl font-bold mb-6">Control Escolar</h2>

        <nav className="space-y-3">
          <Link to="reportes" className="block text-indigo-600 hover:underline">
            Reporte de promedios
          </Link>

          <Link to="eliminar" className="block text-indigo-600 hover:underline">
            Eliminar calificación
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
