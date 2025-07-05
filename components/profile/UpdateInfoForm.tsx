"use client";
import { Box, TextField, Button, Grid2 } from "@mui/material";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useState } from "react";
// import { axiosInstance } from "@/lib/axiosClient";
import { toast } from "react-hot-toast";

interface UpdateInfoFormProps {
  user: {
    name: string;
    email: string;
    phone: string;
    specialty_id: number;
  };
  specialties: { id: number; name: string }[];
}

export function UpdateInfoForm({ user, specialties }: UpdateInfoFormProps) {
  const { isDarkMode } = useThemeContext();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    specialty_id: user.specialty_id,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // try {
    //   await axiosInstance.put("/profile", formData);
    //   toast.success("تم تحديث البيانات بنجاح");
    // } catch (error) {
    //   toast.error("فشل تحديث البيانات");
    // }
    toast.success("تم تحديث البيانات بنجاح (محاكاة)");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="الاسم"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{ background: isDarkMode ? "#2a2a2a" : "#fff" }}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="البريد الإلكتروني"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ background: isDarkMode ? "#2a2a2a" : "#fff" }}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="رقم الهاتف"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            sx={{ background: isDarkMode ? "#2a2a2a" : "#fff" }}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            select
            label="التخصص"
            name="specialty_id"
            value={formData.specialty_id}
            onChange={handleChange}
            sx={{ background: isDarkMode ? "#2a2a2a" : "#fff" }}
            SelectProps={{ native: true }}
          >
            {specialties.map((specialty) => (
              <option key={specialty.id} value={specialty.id}>
                {specialty.name}
              </option>
            ))}
          </TextField>
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
            تحديث البيانات
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
}
