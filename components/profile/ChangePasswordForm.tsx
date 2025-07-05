"use client";
import { Box, TextField, Button, Grid2 } from "@mui/material";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useState } from "react";
// import { axiosInstance } from "@/lib/axiosClient";
import { toast } from "react-hot-toast";

export function ChangePasswordForm() {
  const { isDarkMode } = useThemeContext();
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.new_password !== formData.confirm_password) {
      toast.error("كلمة المرور الجديدة لا تتطابق مع التأكيد");
      return;
    }
    // try {
    //   await axiosInstance.put("/profile/password", formData);
    //   toast.success("تم تغيير كلمة المرور بنجاح");
    // } catch (error) {
    //   toast.error("فشل تغيير كلمة المرور");
    // }
    toast.success("تم تغيير كلمة المرور بنجاح (محاكاة)");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <TextField
            fullWidth
            type="password"
            label="كلمة المرور الحالية"
            name="current_password"
            value={formData.current_password}
            onChange={handleChange}
            sx={{ background: isDarkMode ? "#2a2a2a" : "#fff" }}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type="password"
            label="كلمة المرور الجديدة"
            name="new_password"
            value={formData.new_password}
            onChange={handleChange}
            sx={{ background: isDarkMode ? "#2a2a2a" : "#fff" }}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            type="password"
            label="تأكيد كلمة المرور"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            sx={{ background: isDarkMode ? "#2a2a2a" : "#fff" }}
          />
        </Grid2>
        <Grid2 size={12}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              borderRadius: 25,
              px: 4,
              py: 1.5,
              background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: `0 12px 25px #1784ad40`,
              },
            }}
          >
            تغيير كلمة المرور
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
}
