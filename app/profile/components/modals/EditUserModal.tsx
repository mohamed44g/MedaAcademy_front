"use client"
import { useState } from "react"
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
} from "@mui/material"
import { Close, PhotoCamera, Save } from "@mui/icons-material"

interface EditUserModalProps {
  user: any
  open: boolean
  onClose: () => void
}

export function EditUserModal({ user, open, onClose }: EditUserModalProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Updated user data:", formData)
    setLoading(false)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          تعديل البيانات الشخصية
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        <Grid2 container spacing={4}>
          {/* Avatar Section */}
          <Grid2 size={{ xs: 12 }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
              <Box sx={{ position: "relative", mb: 2 }}>
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  sx={{
                    width: 100,
                    height: 100,
                    border: "3px solid",
                    borderColor: "primary.main",
                  }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: -5,
                    right: -5,
                    backgroundColor: "primary.main",
                    color: "white",
                    width: 35,
                    height: 35,
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  }}
                >
                  <PhotoCamera sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
              <Typography variant="body2" color="text.secondary">
                اضغط على الكاميرا لتغيير الصورة
              </Typography>
            </Box>
          </Grid2>

          {/* Form Fields */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="الاسم"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
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
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
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
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />
          </Grid2>
        </Grid2>
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
  )
}
