"use client";
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
import { resetPasswordSchema } from "../../../lib/validations/auth";
import type { ResetPasswordCredentials } from "../../../lib/api/auth";
import { useThemeContext } from "@/contexts/ThemeContext";
import { Email } from "@mui/icons-material";
import { useResetPassword } from "../../../hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
  const theme = useTheme();
  const resetPasswordMutation = useResetPassword();
  const { isDarkMode } = useThemeContext();
  //get token from url
  const token = useSearchParams().get("token");

  const formik = useFormik<ResetPasswordCredentials>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      const submitValues = {
        password: values.password,
        confirmPassword: values.confirmPassword,
      };
      resetPasswordMutation.mutate({
        password: submitValues.password,
        token: token!,
      });
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
        {resetPasswordMutation.isError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {resetPasswordMutation.error?.response?.data?.message ||
              "حدث خطأ في تسجيل الدخول"}
          </Alert>
        )}

        {/* Login Form */}
        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            name="password"
            label="كلمة المرور"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
            name="confirmPassword"
            label="تأكيد كلمة المرور"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
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
            disabled={resetPasswordMutation.isPending}
            sx={{
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 600,
              borderRadius: 3,
              mb: 3,
            }}
          >
            {resetPasswordMutation.isPending
              ? "جاري إعادة تعيين..."
              : "إعادة تعيين"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
