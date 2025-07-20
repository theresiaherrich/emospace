import api from "../lib/axios";

export const login = async (
  identifier: string,
  password: string,
  rememberMe = true
) => {
  const res = await api.post("/login", {
    identifier,
    password,
    remember_me: rememberMe,
  });

  return res.data;
};

export const register = async (
  name: string,
  username: string,
  email: string,
  password: string,
  confirm_password: string,
  gender: string,
  birth_date: string,
  agree_to_terms: boolean
) => {
  const res = await api.post("/register", {
    name,
    username,
    email,
    password,
    confirm_password : confirm_password,
    gender,
    birth_date,
    agree_to_terms
  });

  return res.data;
}

export const forgotPassword = async (email: string) => {
  const res = await api.post("/forgot-password", {
    email,
  });

  return res.data;
}