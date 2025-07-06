import { axiosInstance } from "../axiosClient";

// Types
export interface LoginCredentials {
  email: string;
  password: string;
  fingerprint: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  specialty_id: number;
  fingerprint: string;
  confirmPassword?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    refreshToken: string;
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

// Auth API Functions
export const authApi = {
  // Login
  login: async (credentials: LoginCredentials): Promise<any> => {
    const response = await axiosInstance.post("/users/login", credentials);
    return response.data;
  },

  // Register
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await axiosInstance.post("/users/register", userData);
    return response.data;
  },

  // Logout
  logout: async (): Promise<{ success: boolean; message: string }> => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  },

  // Refresh Token
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await axiosInstance.post("/auth/refresh", {
      refreshToken,
    });
    return response.data;
  },

  // Forgot Password
  forgotPassword: async (
    email: string
  ): Promise<{ success: boolean; message: string }> => {
    const response = await axiosInstance.post("/auth/forgot-password", {
      email,
    });
    return response.data;
  },

  // Reset Password
  resetPassword: async (
    token: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    const response = await axiosInstance.post("/auth/reset-password", {
      token,
      password,
    });
    return response.data;
  },

  // Verify Email
  verifyEmail: async (
    token: string
  ): Promise<{ success: boolean; message: string }> => {
    const response = await axiosInstance.post("/auth/verify-email", { token });
    return response.data;
  },

  // Resend Verification Email
  resendVerification: async (
    email: string
  ): Promise<{ success: boolean; message: string }> => {
    const response = await axiosInstance.post("/auth/resend-verification", {
      email,
    });
    return response.data;
  },

  // Get Current User
  getCurrentUser: async (): Promise<any> => {
    const response = await axiosInstance.get("/auth/me");
    return response.data.data;
  },

  // Update Profile
  updateProfile: async (userData: Partial<RegisterData>): Promise<any> => {
    const response = await axiosInstance.put("/auth/profile", userData);
    return response.data.data;
  },

  // Change Password
  changePassword: async (
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string }> => {
    const response = await axiosInstance.put("/auth/change-password", {
      currentPassword,
      newPassword,
    });
    return response.data;
  },
};
