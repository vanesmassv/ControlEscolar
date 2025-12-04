import  { useState, type ChangeEvent, type FormEvent } from 'react';

interface LoginFormData {
  email: string;
  password: string;
}

export const useLoginForm = (onSubmit: (data: LoginFormData) => Promise<void>) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const resetForm = () => {
    setFormData({ email: '', password: '' });
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    resetForm
  };
};