import { useState } from "react";
import { forgotPassword } from "../services/authservice";

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleForgotPassword = async (email: string) => {
    setLoading(true);
    setError("");
    try {
      const message = await forgotPassword(email);
      return message;
    } catch (err: any) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleForgotPassword, loading, error };
};