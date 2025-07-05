import { AppError } from "@/utils/AppError";
import axios from "axios";
import { cookies } from "next/headers";
// import toast from "react-hot-toast";
// Create axios instance
export const axiosInstance = axios.create({
  baseURL: "https://www.med-aplus.com/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    if (typeof window === "undefined") {
      // Server-side: Read token from cookies using next/headers
      const cookieStore = await cookies();
      const token = cookieStore.get("auth_token")?.value;
      console.log("token server", token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    throw error;
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const cookieStore = await cookies();
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      if (typeof window !== "undefined") {
        cookieStore.delete("auth_token");
        cookieStore.delete("user_data");
        window.location.href = "/auth/login";
      }
      // toast.error("سجل دخول من جديد.");
    }

    if (error.response?.status === 403) {
      // Forbidden
      // toast.error("غير مسموح لك الوصول.");
    }

    if (error.response?.status >= 500) {
      // Server error
      // toast.error("حدث خطا غير معروف حاول فى وقت لاحق.");
    }

    throw new AppError(error?.response?.data?.message, error?.status);
  }
);

export default axiosInstance;
