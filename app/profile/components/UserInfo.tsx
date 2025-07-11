"use client";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Grid2,
  Chip,
  Button,
} from "@mui/material";
import { Person, Email, Phone, Category } from "@mui/icons-material";
import { useThemeContext } from "@/contexts/ThemeContext";
import { EditUserModal } from "./modals/EditUserModal";
import { useState } from "react";

interface UserInfoProps {
  user: {
    name: string;
    email: string;
    phone: string;
    specialty_name: string;
  };
}

export function UserInfo({ user }: UserInfoProps) {
  const { isDarkMode } = useThemeContext();
  const [openModel, setOpenModel] = useState(false);
  const userFields = [
    { label: "الاسم", value: user.name, icon: <Person /> },
    { label: "البريد الإلكتروني", value: user.email, icon: <Email /> },
    { label: "رقم الهاتف", value: user.phone, icon: <Phone /> },
    { label: "التخصص", value: user.specialty_name, icon: <Category /> },
  ];

  return (
    <Box sx={{ p: { xss: 2, xs: 3 } }}>
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
        <CardContent sx={{ p: { xss: 2, xs: 4 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Avatar
              sx={{
                width: { xss: 100, xs: 120 },
                height: { xss: 100, xs: 120 },
                mb: 2,
                background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
                fontSize: "3rem",
                fontWeight: 700,
              }}
            >
              {user.name?.charAt(0) || "U"}
            </Avatar>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: isDarkMode ? "#f9fafb" : "#1f2937",
                mb: 1,
              }}
            >
              {user.name}
            </Typography>
            <Chip
              label={user.specialty_name}
              sx={{
                background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
                color: "white",
                fontWeight: 600,
              }}
            />
          </Box>

          <Grid2 container spacing={3} justifyContent={"center"}>
            {userFields.map((field, index) => (
              <Grid2 size={{ xss: 12, md: 6 }} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 3,
                    borderRadius: 3,
                    background: isDarkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(23, 132, 173, 0.05)",
                    border: "1px solid rgba(23, 132, 173, 0.1)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
                      color: "white",
                    }}
                  >
                    {field.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: 500 }}
                    >
                      {field.label}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        wordBreak: "break-word",
                        color: isDarkMode ? "#f9fafb" : "#1f2937",
                      }}
                    >
                      {field.value || "غير محدد"}
                    </Typography>
                  </Box>
                </Box>
              </Grid2>
            ))}

            {/* <Button
              variant="contained"
              sx={{
                py: 1,
                mt: 5,
              }}
              onClick={() => setOpenModel(true)}
            >
              تعديل البيانات
            </Button> */}
          </Grid2>
        </CardContent>
      </Card>

      <EditUserModal
        user={user}
        open={openModel}
        onClose={() => setOpenModel(false)}
      />
    </Box>
  );
}
