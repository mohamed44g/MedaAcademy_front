"use client";
import { useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
  Link,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { loginSchema } from "../../../lib/validations/auth";
import { useLogin } from "../../../hooks/useAuth";
import type { LoginCredentials } from "../../../lib/api/auth";
import NextLink from "next/link";
import { useThemeContext } from "@/contexts/ThemeContext";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const loginMutation = useLogin();
  const { isDarkMode } = useThemeContext();

  const formik = useFormik<LoginCredentials>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      loginMutation.mutate(values);
    },
  });

  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      <CardContent
        sx={{
          p: 6,
          background: isDarkMode
            ? "radial-gradient(circle at 20% 80%, #1784ad15 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4fa8c510 0%, transparent 50%)"
            : "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        }}
      >
        {/* Logo and Title */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 1,
            }}
          >
            تسجيل الدخول
          </Typography>
          <Typography variant="body2" color="text.secondary">
            مرحباً بك في أكاديمية MedA+ للتعليم الطبي المتقدم
          </Typography>
        </Box>

        {/* Error Alert */}
        {loginMutation.isError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {loginMutation.error?.response?.data?.message ||
              "حدث خطأ في تسجيل الدخول"}
          </Alert>
        )}

        {/* Login Form */}
        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            name="email"
            label="البريد الإلكتروني"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            name="password"
            label="كلمة المرور"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          {/* Forgot Password Link */}
          <Box sx={{ textAlign: "right", mb: 3 }}>
            <Link
              component={NextLink}
              href="/auth/forgot-password"
              sx={{
                color: theme.palette.primary.main,
                textDecoration: "none",
                fontSize: "0.9rem",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              نسيت كلمة المرور؟
            </Link>
          </Box>

          {/* Login Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loginMutation.isPending}
            sx={{
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 600,
              borderRadius: 3,
              mb: 3,
            }}
          >
            {loginMutation.isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </Button>

          {/* Divider */}
          <Divider sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              أو
            </Typography>
          </Divider>
          {/* Register Link */}
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              ليس لديك حساب؟{" "}
              <Link
                component={NextLink}
                href="/auth/register"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  fontWeight: 600,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                إنشاء حساب جديد
              </Link>
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
