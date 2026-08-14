import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    const isAuthEndpoint =
      config.url?.includes("auth/login/") ||
      config.url?.includes("auth/register/") ||
      config.url?.includes("token/refresh/");

    if (token && !isAuthEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      "Axios request:",
      config.method?.toUpperCase(),
      config.url,
      isAuthEndpoint ? "(no token)" : "(token attached)"
    );

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;