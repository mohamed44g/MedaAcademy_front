"use client";
import { useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
  Link,
  Alert,
  MenuItem,
  Grid2,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Phone,
  School,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { registerSchema } from "../../../lib/validations/auth";
import { useRegister } from "../../../hooks/useAuth";
import type { RegisterData } from "../../../lib/api/auth";
import NextLink from "next/link";
import { Specialty } from "../../../lib/api/specialties";
import { useThemeContext } from "../../../contexts/ThemeContext";

export default function RegisterForm({
  specialties,
}: {
  specialties: Specialty[];
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const theme = useTheme();
  const { isDarkMode } = useThemeContext();
  const registerMutation = useRegister();

  const formik = useFormik<RegisterData>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      specialty_id: 12,
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log("onSubmit called with values:", values); // Debug
      alert(JSON.stringify(values, null, 2));
      const submitValues = {
        ...values,
        specialty_id: values.specialty_id ? Number(values.specialty_id) : 0, // Handle optional field
      };
      registerMutation.mutate(submitValues);
    },
  });

  return (
    <CardContent
      sx={{
        p: 6,
        borderRadius: 4,
        background: isDarkMode
          ? "radial-gradient(circle at 20% 80%, #1784ad15 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4fa8c510 0%, transparent 50%)"
          : "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        overflow: "hidden",
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
          إنشاء حساب جديد
        </Typography>
        <Typography variant="body2" color="text.secondary">
          انضم إلى أكاديمية MedA+ وابدأ رحلتك في التعليم الطبي المتقدم
        </Typography>
      </Box>

      {/* Error Alert */}
      {registerMutation.isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {registerMutation.error?.response?.data?.message ||
            "حدث خطأ في إنشاء الحساب"}
        </Alert>
      )}

      {/* Register Form */}
      <form onSubmit={formik.handleSubmit}>
        <Grid2 container spacing={3}>
          {/* First Name */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              name="name"
              label="الاسم الأول"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid2>

          {/* Email */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
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
            />
          </Grid2>

          {/* Phone */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              name="phone"
              label="رقم الهاتف"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid2>

          {/* Specialization */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              select
              name="specialty_id"
              label="التخصص الطبي"
              value={formik.values.specialty_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.specialty_id &&
                Boolean(formik.errors.specialty_id)
              }
              helperText={
                formik.touched.specialty_id && formik.errors.specialty_id
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <School color="action" />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="">
                <em>اختر التخصص</em>
              </MenuItem>
              {specialties.map((spec) => (
                <MenuItem key={spec.id} value={spec.id}>
                  {spec.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid2>

          {/* Password */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
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
            />
          </Grid2>

          {/* Confirm Password */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              name="confirmPassword"
              label="تأكيد كلمة المرور"
              type={showConfirmPassword ? "text" : "password"}
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
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid2>
        </Grid2>

        {/* Register Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={registerMutation.isPending || !formik.isValid}
          sx={{
            py: 1.5,
            fontSize: "1.1rem",
            fontWeight: 600,
            borderRadius: 3,
            mt: 4,
            mb: 3,
          }}
        >
          {registerMutation.isPending ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
        </Button>

        {/* Divider */}
        <Divider sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            أو
          </Typography>
        </Divider>

        {/* Login Link */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            لديك حساب بالفعل؟{" "}
            <Link
              component={NextLink}
              href="/auth/login"
              sx={{
                color: theme.palette.primary.main,
                textDecoration: "none",
                fontWeight: 600,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              تسجيل الدخول
            </Link>
          </Typography>
        </Box>
      </form>
    </CardContent>
  );
}
