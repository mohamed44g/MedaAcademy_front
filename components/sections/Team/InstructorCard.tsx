"use client";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import { LinkedIn, Twitter, Email, CalendarToday } from "@mui/icons-material";
import { useThemeContext } from "@/contexts/ThemeContext";
import axiosInstance from "@/lib/axiosClient";
import Image from "next/image";
import Link from "next/link";

interface InstructorCardProps {
  instructor: {
    id: number;
    name: string;
    specialization: string;
    avatar: string;
    bio: string;
    created_at: string;
  };
}

export function InstructorCard({ instructor }: InstructorCardProps) {
  const { isDarkMode } = useThemeContext();

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <Link href={`/instructors/${instructor.id}`} prefetch={false}>
      <Card
        sx={{
          height: "100%",
          textAlign: "center",
          borderRadius: 4,
          overflow: "hidden",
          background: isDarkMode
            ? "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          "&:hover": {
            transform: "translateY(-12px) scale(1.02)",
            boxShadow: "0 25px 50px rgba(23, 132, 173, 0.25)",
            "& .instructor-avatar": {
              transform: "scale(1.1)",
              boxShadow: "0 15px 35px rgba(23, 132, 173, 0.4)",
            },
            "& .social-icons": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #1784ad, #4fa8c5)",
          },
        }}
      >
        <CardContent sx={{ p: 4, position: "relative" }}>
          {/* Background Pattern */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "rgba(23, 132, 173, 0.05)",
              transform: "translate(30px, -30px)",
              zIndex: 0,
            }}
          />

          {/* Avatar */}
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              mb: 3,
              width: 150,
              height: 150,
              mx: "auto",
            }}
          >
            <Image
              src={`${axiosInstance.defaults.baseURL}${instructor.avatar}`}
              alt={instructor.name}
              className="instructor-avatar"
              fill
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                border: "4px solid rgba(23, 132, 173, 0.2)",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
              }}
            />
          </Box>

          {/* Name */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: isDarkMode ? "#f9fafb" : "#1f2937",
              mb: 1,
              fontSize: "1.25rem",
            }}
          >
            {instructor.name}
          </Typography>

          {/* Specialization */}
          <Typography
            variant="subtitle1"
            sx={{
              color: "#1784ad",
              mb: 2,
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            {instructor.specialization}
          </Typography>

          {/* Bio */}
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? "#e5e7eb" : "#6b7280",
              mb: 3,
              lineHeight: 1.6,
              fontSize: "0.9rem",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: "5.6em", // 4 lines * 1.4 line-height
            }}
          >
            {instructor.bio}
          </Typography>

          {/* Social Media Icons */}
          {/* <Box
          className="social-icons"
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            opacity: 0.7,
            transform: "translateY(10px)",
            transition: "all 0.3s ease",
          }}
        >
          <IconButton
            size="small"
            sx={{
              color: "#0077b5",
              backgroundColor: "rgba(0, 119, 181, 0.1)",
              "&:hover": {
                backgroundColor: "#0077b5",
                color: "white",
                transform: "scale(1.1)",
              },
            }}
          >
            <LinkedIn sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: "#1da1f2",
              backgroundColor: "rgba(29, 161, 242, 0.1)",
              "&:hover": {
                backgroundColor: "#1da1f2",
                color: "white",
                transform: "scale(1.1)",
              },
            }}
          >
            <Twitter sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: "#ea4335",
              backgroundColor: "rgba(234, 67, 53, 0.1)",
              "&:hover": {
                backgroundColor: "#ea4335",
                color: "white",
                transform: "scale(1.1)",
              },
            }}
          >
            <Email sx={{ fontSize: 18 }} />
          </IconButton>
        </Box> */}
        </CardContent>
      </Card>
    </Link>
  );
}
