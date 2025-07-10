"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../lib/api/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { useUserContext } from "@/contexts/UserContext";

// Auth hooks
export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { updateLoginState } = useUserContext();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      Cookies.set("auth_token", data.data.token, {
        expires: 1,
        secure: true,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
      });

      // Update query cache
      queryClient.setQueryData(["currentUser"], data.data.user);

      // Show success message
      toast.success(data.message || "تم تسجيل الدخول بنجاح");
      updateLoginState();

      // Redirect to dashboard
      setTimeout(() => {
        router.push("/");
      }, 2000);
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "حدث خطأ في تسجيل الدخول";
      toast.error(message);
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      // Show success message
      toast.success(data.message || "تم إنشاء الحساب بنجاح");

      // Redirect to dashboard or verification page
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "حدث خطأ في إنشاء الحساب";
      toast.error(message);
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { updateLogoutState } = useUserContext();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Clear local storage
      Cookies.remove("auth_token");
      Cookies.remove("refreshToken");

      // Clear query cache
      queryClient.clear();

      // Show success message
      toast.success("تم تسجيل الخروج بنجاح");
      updateLogoutState();

      // Redirect to login
      router.push("/auth/login");
    },
    onError: () => {
      // Even if logout fails on server, clear local data
      Cookies.remove("auth_token");
      Cookies.remove("refreshToken");
      queryClient.clear();
      updateLogoutState();
      router.push("/auth/login");
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: authApi.getCurrentUser,
    enabled:
      typeof window !== "undefined" && !!localStorage.getItem("auth_token"),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: (data) => {
      toast.success(data.message || "تم إرسال رابط إعادة تعيين كلمة المرور");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "حدث خطأ في إرسال البريد الإلكتروني";
      toast.error(message);
    },
  });
};

export const useResetPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: (data) => {
      toast.success(data.message || "تم إعادة تعيين كلمة المرور");
      router.push("/auth/login");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "حدث خطأ في إعادة تعيين كلمة المرور";
      toast.error(message);
    },
  });
};
