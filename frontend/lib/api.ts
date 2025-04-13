import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5500/api",
});

api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
