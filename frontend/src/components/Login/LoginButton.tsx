interface LoginButtonProps {
  isLoading: boolean;
}

export const LoginButton = ({ isLoading }: LoginButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
    >
      {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
    </button>
  );
};