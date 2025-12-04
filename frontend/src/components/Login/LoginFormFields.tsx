import type { ChangeEvent } from 'react';

interface LoginFormFieldsProps {
  email: string;
  password: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const LoginFormFields = ({ email, password, onChange }: LoginFormFieldsProps) => {
  return (
    <>
      {/* EMAIL */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Correo electrónico
        </label>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={onChange}
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          placeholder="usuario@correo.com"
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input
          type="password"
          name="password"
          required
          value={password}
          onChange={onChange}
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          placeholder="••••••••"
        />
      </div>
    </>
  );
};