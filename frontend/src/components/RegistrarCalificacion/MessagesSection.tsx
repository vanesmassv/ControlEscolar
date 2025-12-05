// src/presentation/components/RegistrarCalificacion/MessagesSection.tsx
import { AlertMessage } from './AlertMessage';

interface MessagesSectionProps {
  errorAlumnos: string | null;
  errorSaving: string | null;
  success: string | null;
}

export const MessagesSection = ({ errorAlumnos, errorSaving, success }: MessagesSectionProps) => {
  const errorMessage = errorAlumnos || errorSaving;

  return (
    <>
      {errorMessage && (
        <AlertMessage type="error" message={errorMessage} />
      )}

      {success && (
        <AlertMessage type="success" message={success} />
      )}
    </>
  );
};