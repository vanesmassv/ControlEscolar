const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">403</h1>
        <p className="text-xl text-gray-700 mb-4">No tienes permisos para acceder a esta página</p>
        <a href="/" className="text-blue-600 hover:underline">
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default UnauthorizedPage;