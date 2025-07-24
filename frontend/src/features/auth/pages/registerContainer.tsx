import * as React from "react";
import RegisterForm from "../components/registerForm";
import { useNavigate } from "react-router-dom";
import Logo from "/assets/logo.svg";
import { useRegister } from "../../../hooks/useregister";

export const RegisterContainer: React.FC = () => {
  const navigate = useNavigate();
  const { handleRegister, error } = useRegister();

  const onSubmit = async (data: {
    email: string;
    password: string;
    name: string;
    gender: string;
    birth_date: string;
    confirm_password: string;
    agree_to_terms: boolean;
    username?: string;
  }) => {
    const message = await handleRegister(
      data.name,
      data.username || data.email.split("@")[0],
      data.email,
      data.password,
      data.confirm_password,
      data.gender,
      data.birth_date,
      data.agree_to_terms
    );
    if (message) {
      alert(message);
      navigate("/login");
    } else {
      alert(error || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="bg-white bg-opacity-70 border-2 border-[#923CFF] rounded-[40px] w-full max-w-xl pb-6 pt-8 px-6 sm:px-10 md:px-12 flex flex-col gap-8 items-center justify-center font-lexend backdrop-blur-lg">
        <img src={Logo} alt="emoSpace Logo" className="h-14" />
        <h1 className="text-black text-3xl md:text-4xl font-bold text-center">Register</h1>
        <RegisterForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};
