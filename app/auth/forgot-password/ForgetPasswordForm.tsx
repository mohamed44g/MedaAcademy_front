"use client";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { forgotPasswordSchema } from "../../../lib/validations/auth";
import type { forgotPasswordCredentials } from "../../../lib/api/auth";
import { useThemeContext } from "@/contexts/ThemeContext";
import { Email } from "@mui/icons-material";
import { useForgotPassword } from "../../../hooks/useAuth";


export default function LoginForm() {
  const theme = useTheme();
  const forgotPasswordMutation = useForgotPassword();
  const { isDarkMode } = useThemeContext();

  const formik = useFormik<forgotPasswordCredentials>({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      const submitValues = {
        email: values.email,
      };
      forgotPasswordMutation.mutate(submitValues.email);
    },
  });

  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        py: { xss: 2 },
      }}
    >
      <CardContent
        sx={{
          p: { xss: 2, sm: 6 },
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
            نسيت كلمة المرور؟
          </Typography>
          <Typography variant="body2" color="text.secondary">
            أدخل البريد الإلكتروني الخاص بك لاستعادة كلمة المرور
          </Typography>
        </Box>

        {/* Error Alert */}
        {forgotPasswordMutation.isError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {forgotPasswordMutation.error?.response?.data?.message ||
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

          {/* Login Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={forgotPasswordMutation.isPending}
            sx={{
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 600,
              borderRadius: 3,
              mb: 3,
            }}
          >
            {forgotPasswordMutation.isPending ? "جاري إرسال..." : "إرسال"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
