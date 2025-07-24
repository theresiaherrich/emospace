import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const getToken = (): string | undefined => {
  return Cookies.get("token");
};

export const isTokenValid = (): boolean => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded: { exp: number } = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch {
    return false;
  }
};

export const isLoggedIn = (): boolean => {
  return isTokenValid();
};

export const logout = (): void => {
  Cookies.remove("token");
};