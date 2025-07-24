import { useState } from "react";
import { login } from "../services/authservice";
import { useUser } from "../context/usercontext";
import { getUserProfile } from "../services/userservice";

export const useLogin = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const handleLogin = async (identifier: string, password: string, rememberMe = true) => {
    setLoading(true);
    setError("");

    try {
      const { message } = await login(identifier, password, rememberMe);
      
      const profile = await getUserProfile();
      setUser(profile);

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