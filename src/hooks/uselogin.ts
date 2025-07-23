import { useState } from "react";
import { login } from "../services/authservice";
import Cookies from "js-cookie";

export const useLogin = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (identifier: string, password: string, rememberMe = true) => {
    setLoading(true);
    setError("");

    try {
      const { token, message } = await login(identifier, password, rememberMe);
      Cookies.set("token", token, { expires: 7 });
      return message;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Login gagal";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, error, loading };
};
