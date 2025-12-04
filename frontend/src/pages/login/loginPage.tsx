// src/presentation/pages/login/LoginPage.tsx
import { LoginHeader } from '../../components/Login/LoginHeader';
import { LoginError } from '../../components/Login/LoginError';
import { LoginFormFields } from '../../components/Login/LoginFormFields';
import { LoginButton } from '../../components/Login/LoginButton';
import { useLogin } from '../../hooks/useLogin';
import { useLoginForm } from '../../hooks/useLoginForm';

const LoginPage = () => {
  const { login, isLoading, error, clearError } = useLogin();
  
  const { formData, handleChange, handleSubmit } = useLoginForm(async (data) => {
    await login(data);
  });

  const onChangeWithErrorClear = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    if (error) clearError();
  };

  return (
    <div className="min-h-screen flex items-center justify-center from-indigo-100 via-blue-100 to-purple-100 px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <LoginHeader />
          <LoginError message={error} />
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <LoginFormFields
              email={formData.email}
              password={formData.password}
              onChange={onChangeWithErrorClear}
            />
            <LoginButton isLoading={isLoading} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;