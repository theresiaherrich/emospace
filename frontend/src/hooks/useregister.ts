import { useState } from "react";
import { register } from "../services/authservice";
import Cookies from "js-cookie";

export const useRegister = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (
    name: string,
    username: string,
    email: string,
    password: string,
    confirm_password: string,
    gender: string,
    birth_date: string,
    agree_to_terms: boolean
  ) => {
    setLoading(true);
    setError("");

    try {
      const res = await register(
        name,
        username,
        email,
        password,
        confirm_password,
        gender,
        birth_date,
        agree_to_terms
      );
      if (res?.token) {
        Cookies.set("token", res.token, { expires: 7 });
      }
      return res.message;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Register gagal";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, error, loading };
};