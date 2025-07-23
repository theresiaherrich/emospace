import * as React from 'react';
import Input from '../../../components/ui/input';
import { useForm } from 'react-hook-form';
import Button from '../../../components/ui/button';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onSubmit: (data: {
    identifier: string;
    password: string;
    rememberMe: boolean;
  }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<{
    identifier: string;
    password: string;
    rememberMe: boolean;
  }>();
  const navigate = useNavigate();

  const handleLogin = (data: {
    identifier: string;
    password: string;
    rememberMe: boolean;
  }) => {
    onSubmit(data);
    navigate('/');
  };

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-sm font-lexend"
      onSubmit={handleSubmit(handleLogin)}
    >
      <Input
        type="email"
        placeholder="Enter your email..."
        title="Email"
        required
        {...register('identifier')}
      />
      <Input
        type="password"
        placeholder="Enter your password..."
        title="Password"
        required
        {...register('password')}
      />
      <div className="text-xs text-[#474747] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="accent-[#593187]" {...register('rememberMe')} />
          Remember me
        </label>
        <a href="#" className="text-right underline hover:text-[#341A55]">
          Forget Password?
        </a>
      </div>
      <Button type="submit" variant="primary" className="w-full">
        Continue
      </Button>
      <p className="text-xs font-medium text-[#474747] mx-auto text-center">
        No account yet?
        <a href="/register" className="text-[#341A55] ml-1">
          Sign up now!
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
