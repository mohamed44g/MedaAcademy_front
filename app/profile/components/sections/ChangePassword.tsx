"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Grid2,
  IconButton,
  InputAdornment,
  Alert,
  LinearProgress,
} from "@mui/material";
import { Lock, Visibility, VisibilityOff, Security } from "@mui/icons-material";

export function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setMessage(null);
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const getStrengthColor = (strength: number) => {
    if (strength < 25) return "#f44336";
    if (strength < 50) return "#ff9800";
    if (strength < 75) return "#ffeb3b";
    return "#4caf50";
  };

  const getStrengthText = (strength: number) => {
    if (strength < 25) return "ضعيف";
    if (strength < 50) return "متوسط";
    if (strength < 75) return "جيد";
    return "قوي";
  };

  const handleSubmit = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({
        type: "error",
        text: "كلمة المرور الجديدة وتأكيدها غير متطابقين",
      });
      return;
    }

    if (formData.newPassword.length < 8) {
      setMessage({
        type: "error",
        text: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setMessage({ type: "success", text: "تم تغيير كلمة المرور بنجاح!" });
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setLoading(false);
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  return (
    <Box
      sx={{
        mt: 10,
        height: "100vh",
        width: { xss: "90%", sx: "80%" },
        mx: "auto",
        position: "relative",
        transform: "translateY(13%)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { sxx: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box
          sx={{
            width: { xss: 50, xs: 60 },
            height: { xss: 50, xs: 60 },
            borderRadius: 3,
            background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 3,
            ml: 1,
            boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
          }}
        >
          <Security sx={{ color: "white", fontSize: 28 }} />
        </Box>
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: "primary.main" }}
          >
            تغيير كلمة المرور
          </Typography>
          <Typography variant="body1" color="text.secondary">
            قم بتحديث كلمة المرور الخاصة بك لحماية حسابك
          </Typography>
        </Box>
      </Box>

      <Card>
        <CardContent sx={{ p: 4 }}>
          {message && (
            <Alert severity={message.type} sx={{ mb: 3, borderRadius: 2 }}>
              {message.text}
            </Alert>
          )}

          <Grid2 container spacing={4}>
            {/* Current Password */}
            <Grid2 size={{ xss: 12 }}>
              <TextField
                fullWidth
                label="كلمة المرور الحالية"
                type={showPasswords.current ? "text" : "password"}
                value={formData.currentPassword}
                onChange={(e) =>
                  handleChange("currentPassword", e.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility("current")}
                      >
                        {showPasswords.current ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />
            </Grid2>

            {/* New Password */}
            <Grid2 size={{ xss: 12, md: 6 }}>
              <TextField
                fullWidth
                label="كلمة المرور الجديدة"
                type={showPasswords.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) => handleChange("newPassword", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility("new")}
                      >
                        {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />
              {formData.newPassword && (
                <Box sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      قوة كلمة المرور
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: getStrengthColor(passwordStrength),
                        fontWeight: 600,
                      }}
                    >
                      {getStrengthText(passwordStrength)}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={passwordStrength}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 3,
                        backgroundColor: getStrengthColor(passwordStrength),
                      },
                    }}
                  />
                </Box>
              )}
            </Grid2>

            {/* Confirm Password */}
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="تأكيد كلمة المرور الجديدة"
                type={showPasswords.confirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility("confirm")}
                      >
                        {showPasswords.confirm ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={
                  formData.confirmPassword.length > 0 &&
                  formData.newPassword !== formData.confirmPassword
                }
                helperText={
                  formData.confirmPassword.length > 0 &&
                  formData.newPassword !== formData.confirmPassword
                    ? "كلمة المرور غير متطابقة"
                    : ""
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />
            </Grid2>

            {/* Submit Button */}
            <Grid2 size={{ xs: 12 }}>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  size="large"
                  disabled={
                    loading ||
                    !formData.currentPassword ||
                    !formData.newPassword ||
                    !formData.confirmPassword ||
                    formData.newPassword !== formData.confirmPassword
                  }
                  startIcon={<Lock />}
                  sx={{
                    borderRadius: 3,
                    px: 6,
                    py: 2,
                    background:
                      "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
                    boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px rgba(255, 107, 107, 0.4)",
                    },
                  }}
                >
                  {loading ? "جاري التغيير..." : "تغيير كلمة المرور"}
                </Button>
              </Box>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </Box>
  );
}
