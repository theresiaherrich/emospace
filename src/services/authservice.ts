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