import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://emospace.bccdev.id/api",
  withCredentials: true,
});

export default api;
