"use client";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import { useThemeContext } from "@/contexts/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "@/lib/axiosClient";
import { ICourse } from "@/utils/types";

interface CourseCardProps {
  course: ICourse;
}

export function CourseCard({ course }: CourseCardProps) {
  const { isDarkMode } = useThemeContext();

  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        background: isDarkMode
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(255, 255, 255, 0.9)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: `0 20px 40px #1784ad20`,
        },
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Stack direction="column">
          {/* Course Image */}
          <Box
            sx={{
              position: "relative",
              height: 280,
              overflow: "hidden",
            }}
          >
            <Image
              src={`${axiosInstance.defaults.baseURL}${course.poster}`}
              alt={course.title}
              fill
              style={{ objectFit: "cover" }}
            />

            {/* Price Circle */}
            <Box
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              {course.price}
            </Box>
          </Box>

          {/* Course Content */}
          <Box sx={{ p: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: isDarkMode ? "#f9fafb" : "#1f2937",
                mb: 2,
                lineHeight: 1.4,
              }}
            >
              {course.title}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mb: 3,
                lineHeight: 1.6,
              }}
            >
              {course.description}
            </Typography>

            {/* Course Stats
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <AccessTime sx={{ fontSize: 16, color: "text.secondary" }} />
                <Typography variant="caption" color="text.secondary">
                  {course.duration}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <PlayCircleOutline
                  sx={{ fontSize: 16, color: "text.secondary" }}
                />
                <Typography variant="caption" color="text.secondary">
                  {course.videosCount} فيديو
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <People sx={{ fontSize: 16, color: "text.secondary" }} />
                <Typography variant="caption" color="text.secondary">
                  {course.studentsCount.toLocaleString()} طالب
                </Typography>
              </Box>
            </Box> */}

            {/* Price */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                }}
              >
                السعر : {course.price} ₪
              </Typography>
            </Box>

            {/* Tags */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
              {course.speciality.map((tag: string, index: number) => (
                <>
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: "primary.main",
                      color: "primary.main",
                      p: 1.8,
                      "&:hover": {
                        backgroundColor: "primary.main",
                        color: "white",
                      },
                    }}
                  />
                </>
              ))}
            </Box>

            {/* Enroll Button */}
            {course.isenrolled ? (
              <Link href={`/courses/${course.id}/content`} prefetch={false}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    borderRadius: 25,
                    py: 1.5,
                    background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
                    boxShadow: `0 8px 20px #1784ad30`,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 12px 25px #1784ad40`,
                    },
                  }}
                >
                  مشترك استكمل الكورس
                </Button>
              </Link>
            ) : (
              <Link href={`/courses/${course.id}`} prefetch={false}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    borderRadius: 25,
                    py: 1.5,
                    background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
                    boxShadow: `0 8px 20px #1784ad30`,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 12px 25px #1784ad40`,
                    },
                  }}
                >
                  اشترك الان
                </Button>
              </Link>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
