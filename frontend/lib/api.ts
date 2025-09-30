import axios from "axios";

let apiBaseUrl = "/api"; // default fallback

// Function to load config.json dynamically
async function loadConfig() {
  try {
    const res = await fetch("/config.json");
    const config = await res.json();
    if (config.apiBaseUrl) {
      apiBaseUrl = config.apiBaseUrl;
      console.log("Loaded apiBaseUrl from config.json:", apiBaseUrl);
    }
  } catch {
    console.warn("Could not load config.json, falling back to /api");
  }
}

// Kick off config load only in the browser
if (typeof window !== "undefined") {
  loadConfig();
}

export const api = axios.create({
  baseURL: apiBaseUrl,
});

api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
