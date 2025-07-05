"use client";
import { Button, Alert, CircularProgress, IconButton, InputAdornment } from "@mui/material";
import type React from "react";

import { Card, CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Grid2 } from "@mui/material";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useThemeContext } from "@/contexts/ThemeContext";
import { axiosInstance } from "@/lib/axiosClient";

export function ChangePassword() {
  const { isDarkMode } = useThemeContext();
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (formData.new_password !== formData.confirm_password) {
      setMessage({
        type: "error",
        text: "كلمة المرور الجديدة وتأكيدها غير متطابقين",
      });
      setLoading(false);
      return;
    }

    try {
      await axiosInstance.put("/user/change-password", {
        current_password: formData.current_password,
        new_password: formData.new_password,
      });
      setMessage({ type: "success", text: "تم تغيير كلمة المرور بنجاح!" });
      setFormData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (error) {
      setMessage({ type: "error", text: "حدث خطأ أثناء تغيير كلمة المرور" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          background: isDarkMode
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(255, 255, 255, 0.9)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: isDarkMode ? "#f9fafb" : "#1f2937",
              mb: 3,
              textAlign: "center",
            }}
          >
            تغيير كلمة المرور
          </Typography>

          {message && (
            <Alert
              severity={message.type}
              sx={{ mb: 3, borderRadius: 2 }}
              onClose={() => setMessage(null)}
            >
              {message.text}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid2 container spacing={3}>
              <Grid2 size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="كلمة المرور الحالية"
                  name="current_password"
                  type={showPasswords.current ? "text" : "password"}
                  value={formData.current_password}
                  onChange={handleChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility("current")}
                          edge="end"
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
              <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="كلمة المرور الجديدة"
                  name="new_password"
                  type={showPasswords.new ? "text" : "password"}
                  value={formData.new_password}
                  onChange={handleChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility("new")}
                          edge="end"
                        >
                          {showPasswords.new ? (
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
              <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="تأكيد كلمة المرور الجديدة"
                  name="confirm_password"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={formData.confirm_password}
                  onChange={handleChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility("confirm")}
                          edge="end"
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                    },
                  }}
                />
              </Grid2>
            </Grid2>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <Lock />}
                sx={{
                  borderRadius: 25,
                  px: 6,
                  py: 1.5,
                  background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
                  boxShadow: `0 8px 20px #1784ad30`,
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 12px 25px #1784ad40`,
                  },
                }}
              >
                {loading ? "جاري التغيير..." : "تغيير كلمة المرور"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
