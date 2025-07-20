import axios from "axios";

const api = axios.create({
  baseURL: "/api", //local development
  withCredentials: true,
});

export default api;
