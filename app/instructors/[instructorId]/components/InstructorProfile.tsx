"use client";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Grid2,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Stack,
} from "@mui/material";
import {
  School,
  People,
  AccessTime,
  LinkedIn,
  Twitter,
  Language,
  YouTube,
} from "@mui/icons-material";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useState } from "react";
import axiosInstance from "@/lib/axiosClient";
import Image from "next/image";

interface InstructorProfileProps {
  instructor: any;
}

export function InstructorProfile({ instructor }: InstructorProfileProps) {
  const { isDarkMode } = useThemeContext();

  const statsData = [
    {
      icon: <School sx={{ fontSize: 28 }} />,
      value: instructor.stats.totalCourses,
      label: "كورس",
      color: "#1784ad",
      bgColor: "#1784ad10",
    },
    {
      icon: <People sx={{ fontSize: 28 }} />,
      value: instructor.stats.totalStudents.toLocaleString(),
      label: "طالب",
      color: "#ffa726",
      bgColor: "#ffa72610",
    },
    {
      icon: <AccessTime sx={{ fontSize: 28 }} />,
      value: instructor.stats.totalHours,
      label: "ساعة تدريس",
      color: "#66bb6a",
      bgColor: "#66bb6a10",
    },
  ];
  console.log(`${axiosInstance.defaults.baseURL}${instructor.avatar}`);

  // const socialLinks = [
  //   {
  //     icon: <LinkedIn />,
  //     url: instructor.socialLinks.linkedin,
  //     color: "#0077b5",
  //     name: "LinkedIn",
  //   },
  //   {
  //     icon: <Twitter />,
  //     url: instructor.socialLinks.twitter,
  //     color: "#1da1f2",
  //     name: "Twitter",
  //   },
  //   {
  //     icon: <YouTube />,
  //     url: instructor.socialLinks.youtube,
  //     color: "#ff0000",
  //     name: "YouTube",
  //   },
  //   {
  //     icon: <Language />,
  //     url: instructor.socialLinks.researchgate,
  //     color: "#00d4aa",
  //     name: "ResearchGate",
  //   },
  // ];

  return (
    <Box>
      {/* Enhanced Hero Section */}
      <Box
        sx={{
          position: "relative",
          background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 50%, #66d9ef 100%)`,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
            `,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "100px",
            background:
              "linear-gradient(to top, rgba(248, 250, 252, 1), transparent)",
          },
          py: 3,
        }}
      >
        {/* Floating Elements */}
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            right: "10%",
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            animation: "float 6s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": { transform: "translateY(0px)" },
              "50%": { transform: "translateY(-20px)" },
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "60%",
            left: "15%",
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.08)",
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
          <Grid2 container spacing={8} alignItems="center">
            <Grid2 size={{ xs: 12, lg: 5 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {/* Enhanced Avatar */}
                <Box
                  sx={{
                    position: "relative",
                    mb: 4,
                    width: 250,
                    height: 250,
                    borderRadius: "50%",
                  }}
                >
                  <Image
                    src={`${axiosInstance.defaults.baseURL}${instructor.avatar}`}
                    alt={instructor.name}
                    fill
                    style={{
                      objectFit: "cover",
                      border: "8px solid rgba(255, 255, 255, 0.2)",
                      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                      transition: "all 0.3s ease",
                    }}
                  />
                </Box>

                <Typography
                  variant="h2"
                  sx={{
                    color: "white",
                    fontWeight: 800,
                    mb: 2,
                    textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    fontSize: { xs: "2rem", md: "3rem" },
                  }}
                >
                  {instructor.name}
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    color: "rgba(255, 255, 255, 0.95)",
                    mb: 2,
                    fontWeight: 600,
                  }}
                >
                  {instructor.title}
                </Typography>

                <Chip
                  label={instructor.specialization}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    px: 3,
                    py: 2,
                    height: "auto",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    mb: 3,
                  }}
                />
              </Box>
            </Grid2>

            <Grid2 size={{ xs: 12, lg: 7 }}>
              <Box sx={{ color: "white" }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    mb: 4,
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  نبذة عن المدرس
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.2rem",
                    lineHeight: 2,
                    mb: 6,
                    color: "rgba(255, 255, 255, 0.95)",
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {instructor.bio}
                </Typography>

                {/* Social Links
                <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                  {socialLinks.map((social, index) => (
                    <IconButton
                      key={index}
                      sx={{
                        width: 56,
                        height: 56,
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        color: "white",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: social.color,
                          transform: "translateY(-4px) scale(1.1)",
                          boxShadow: `0 8px 25px ${social.color}40`,
                        },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Stack> */}
              </Box>
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      {/* Enhanced Stats Section */}
      <Box
        sx={{
          py: 8,
          background: isDarkMode
            ? "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
            : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 25% 25%, rgba(23, 132, 173, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(79, 168, 197, 0.05) 0%, transparent 50%)
            `,
          },
        }}
      >
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              fontWeight: 800,
              mb: 6,
              color: isDarkMode ? "#f9fafb" : "#1f2937",
            }}
          >
            إحصائيات المدرس
          </Typography>
          <Grid2
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            {statsData.map((stat, index) => (
              <Grid2 size={{ xs: 12, md: 3, lg: 3 }} key={index}>
                <Card
                  sx={{
                    textAlign: "center",
                    borderRadius: 6,
                    overflow: "hidden",
                    background: stat.bgColor,
                    border: `2px solid ${stat.color}20`,
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    "&:hover": {
                      transform: "translateY(-12px) scale(1.02)",
                      boxShadow: `0 25px 50px ${stat.color}30`,
                      border: `2px solid ${stat.color}40`,
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: `linear-gradient(90deg, ${stat.color}, ${stat.color}80)`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${stat.color}, ${stat.color}cc)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 3,
                        color: "white",
                        boxShadow: `0 8px 20px ${stat.color}40`,
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        mb: 1,
                        color: stat.color,
                        fontSize: { xs: "1.8rem", md: "2.5rem" },
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: isDarkMode ? "#e5e7eb" : "#6b7280",
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>
    </Box>
  );
}
