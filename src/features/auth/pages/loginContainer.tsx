import * as React from "react";
import LoginForm from "../components/loginForm";
import { useNavigate } from "react-router-dom";
import Logo from "/assets/logo.svg";

export const LoginContainer: React.FC = () => {
  const navigate = useNavigate();

  const onSubmit = (data: { email: string; password: string }) => {
    console.log(data);
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="bg-white bg-opacity-70 border-2 border-[#923CFF] rounded-[40px] w-full max-w-xl pb-6 pt-8 px-6 sm:px-10 md:px-12 flex flex-col gap-8 items-center justify-center font-lexend backdrop-blur-lg">
        <img src={Logo} alt="emoSpace Logo" className="h-14" />
        <h1 className="text-black text-3xl md:text-4xl font-bold text-center">Login</h1>
        <LoginForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};
