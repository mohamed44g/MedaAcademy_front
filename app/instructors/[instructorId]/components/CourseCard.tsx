"use client";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Rating,
  Stack,
} from "@mui/material";
import {
  PlayCircleOutline,
  People,
  AccessTime,
  ArrowForward,
} from "@mui/icons-material";
import { useThemeContext } from "@/contexts/ThemeContext";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  course: any;
  instructor: any;
}

export function CourseCard({ course, instructor }: CourseCardProps) {
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
              src={course.poster || "/placeholder.svg"}
              alt={course.title}
              fill
              style={{ objectFit: "cover" }}
            />

            {/* Badges */}
            <Box
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            ></Box>

            {/* Play Overlay */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                opacity: 0,
                transition: "opacity 0.3s ease",
                "&:hover": {
                  opacity: 1,
                },
              }}
            >
              <PlayCircleOutline sx={{ fontSize: 64, color: "white" }} />
            </Box>
          </Box>

          {/* Course Content */}
          <Box sx={{ p: 4 }}>
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

            {/* Course Stats */}
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
            </Box>

            {/* Price */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                }}
              >
                {course.price} جنيه
              </Typography>
            </Box>

            {/* Tags */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
              {course.speciality
                .slice(0, 3)
                .map((tag: string, index: number) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: "primary.main",
                      color: "primary.main",
                      "&:hover": {
                        backgroundColor: "primary.main",
                        color: "white",
                      },
                    }}
                  />
                ))}
            </Box>

            {/* Enroll Button */}
            <Button
              variant="contained"
              fullWidth
              endIcon={<ArrowForward />}
              component={Link}
              href={`/courses/${course.id}`}
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
              التسجيل في الكورس
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
