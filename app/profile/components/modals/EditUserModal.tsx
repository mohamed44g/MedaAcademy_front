"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid2,
  IconButton,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import { Close, PhotoCamera, Save } from "@mui/icons-material";

interface EditUserModalProps {
  user: any;
  open: boolean;
  onClose: () => void;
}

export function EditUserModal({ user, open, onClose }: EditUserModalProps) {
  // const [formData, setFormData] = useState({
  //   name: user.name,
  //   email: user.email,
  //   phone: user.phone,
  // });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any, formData: FormData) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Updated user data:", formData);
    setLoading(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
        },
      }}
    >
      <DialogTitle
        component={Box}
        sx={{
          background: "linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          تعديل البيانات الشخصية
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 5, mt: 10, overflowY: "visible" }}>
        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={4}>
            {/* Form Fields */}
            <Grid2 size={{ xs: 12, md: 12 }}>
              <TextField
                fullWidth
                label="الاسم"
                name="name"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, md: 12 }}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                type="email"
                name="email"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />

              <Button variant="contained" sx={{ mt: 3 }}>
                تحقق
              </Button>
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="رقم الهاتف"
                name="phone"
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
                label="كود التحقق"
                name="verifcation"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />
            </Grid2>
          </Grid2>
        </form>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
          }}
        >
          إلغاء
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={<Save />}
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            background: "linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: "0 4px 15px rgba(23, 132, 173, 0.3)",
            },
          }}
        >
          {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
