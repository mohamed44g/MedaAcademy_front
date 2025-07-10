import axios from "axios";
import jsCookie from "js-cookie";
import toast from "react-hot-toast";
// Create axios instance
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      // Client-side: Read token using js-cookie (handled in client component)
      const token = jsCookie.get("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      if (typeof window !== "undefined") {
        jsCookie.remove("auth_token");
        window.location.href = "/auth/login";
      }
    }

    if (error.response?.status === 403) {
      // Forbidden
      toast.error("Access forbidden");
    }

    if (error.response?.status >= 500) {
      // Server error
      console.error("Server error occurred");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
