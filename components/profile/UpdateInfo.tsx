"use client";
import { Button, CircularProgress, Typography } from "@mui/material";
import type React from "react";

import { Alert } from "@mui/material";
import { CardContent } from "@mui/material";
import { Card } from "@mui/material";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Grid2 } from "@mui/material";
import { Save } from "@mui/icons-material";
import { useState } from "react";
import { useThemeContext } from "@/contexts/ThemeContext";
import { axiosInstance } from "@/lib/axiosClient";

interface UpdateInfoProps {
  user: {
    name: string;
    email: string;
    phone: string;
  };
}

export function UpdateInfo({ user }: UpdateInfoProps) {
  const { isDarkMode } = useThemeContext();
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await axiosInstance.put("/user/profile", formData);
      setMessage({ type: "success", text: "تم تحديث البيانات بنجاح!" });
    } catch (error) {
      setMessage({ type: "error", text: "حدث خطأ أثناء تحديث البيانات" });
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
            تحديث البيانات الشخصية
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
              <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="الاسم"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
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
                  label="البريد الإلكتروني"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                    },
                  }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="رقم الهاتف"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
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
                startIcon={loading ? <CircularProgress size={20} /> : <Save />}
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
                {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
