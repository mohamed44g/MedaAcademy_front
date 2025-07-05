"use client"
import { useState } from "react"
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Grid2,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { Edit, Person, Email, Phone, School, CalendarToday, Verified } from "@mui/icons-material"
import { EditUserModal } from "../modals/EditUserModal"

interface UserInfoProps {
  user: any
}

export function UserInfo({ user }: UserInfoProps) {
  const [editModalOpen, setEditModalOpen] = useState(false)

  const userDetails = [
    { label: "الاسم", value: user.name, icon: <Person /> },
    { label: "البريد الإلكتروني", value: user.email, icon: <Email /> },
    { label: "رقم الهاتف", value: user.phone, icon: <Phone /> },
    { label: "التخصص", value: user.specialty_name, icon: <School /> },
    { label: "تاريخ الانضمام", value: new Date(user.joinDate).toLocaleDateString("ar-EG"), icon: <CalendarToday /> },
  ]

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "primary.main" }}>
          البيانات الشخصية
        </Typography>
        <Button
          variant="contained"
          startIcon={<Edit />}
          onClick={() => setEditModalOpen(true)}
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            background: "linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)",
            boxShadow: "0 4px 15px rgba(23, 132, 173, 0.3)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 6px 20px rgba(23, 132, 173, 0.4)",
            },
          }}
        >
          تعديل البيانات
        </Button>
      </Box>

      <Grid2 container spacing={4}>
        {/* Profile Card */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)",
              color: "white",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                right: 0,
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.1)",
                transform: "translate(50px, -50px)",
              },
            }}
          >
            <CardContent sx={{ p: 4, position: "relative", zIndex: 2 }}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <Box sx={{ position: "relative", mb: 3 }}>
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    sx={{
                      width: 120,
                      height: 120,
                      border: "4px solid rgba(255, 255, 255, 0.3)",
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 5,
                      right: 5,
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: "#4caf50",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "3px solid white",
                    }}
                  >
                    <Verified sx={{ fontSize: 18, color: "white" }} />
                  </Box>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                  {user.name}
                </Typography>
                <Chip
                  label={user.specialty_name}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1rem",
                    px: 2,
                    py: 1,
                    height: "auto",
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid2>

        {/* Details Card */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: "text.primary" }}>
                تفاصيل الحساب
              </Typography>
              <List sx={{ p: 0 }}>
                {userDetails.map((detail, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      px: 0,
                      py: 2,
                      borderBottom: index < userDetails.length - 1 ? "1px solid" : "none",
                      borderColor: "divider",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 50,
                        color: "primary.main",
                      }}
                    >
                      {detail.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={detail.label}
                      secondary={detail.value}
                      sx={{
                        "& .MuiListItemText-primary": {
                          fontWeight: 600,
                          color: "text.secondary",
                          fontSize: "0.9rem",
                        },
                        "& .MuiListItemText-secondary": {
                          fontWeight: 600,
                          color: "text.primary",
                          fontSize: "1.1rem",
                          mt: 0.5,
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      {/* Edit Modal */}
      <EditUserModal user={user} open={editModalOpen} onClose={() => setEditModalOpen(false)} />
    </Box>
  )
}
