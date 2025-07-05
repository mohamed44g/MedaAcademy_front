"use client";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid2,
  LinearProgress,
  Button,
  Chip,
} from "@mui/material";
import {
  Person as PersonIcon,
  PlayCircleOutline,
  ArrowForward,
} from "@mui/icons-material";
import { useThemeContext } from "@/contexts/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "@/lib/axiosClient";

interface Course {
  id: number;
  title: string;
  instractor_name: string;
  specialty_name: string;
  poster: string;
  total_videos: number;
  completed_videos: number;
}

interface MyCoursesProps {
  courses: Course[];
}

export function MyCourses({ courses }: MyCoursesProps) {
  const { isDarkMode } = useThemeContext();

  if (!courses || courses.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ fontWeight: 500 }}
        >
          لم تسجل في أي كورس بعد
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: isDarkMode ? "#f9fafb" : "#1f2937",
          mb: 3,
          textAlign: "center",
        }}
      >
        كورساتي ({courses.length})
      </Typography>

      <Grid2 container spacing={3}>
        {courses.map((course) => {
          const completionPercentage =
            course.total_videos > 0
              ? Math.round(
                  (course.completed_videos / course.total_videos) * 100
                )
              : 0;

          return (
            <Grid2 size={{ xs: 12, md: 6, lg: 4 }} key={course.id}>
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
                  <Box
                    sx={{
                      position: "relative",
                      height: 200,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={`${axiosInstance.defaults.baseURL}${course.poster}`}
                      alt={course.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        background: `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: "white", fontWeight: 600 }}
                      >
                        {course.specialty_name}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 16,
                        left: 16,
                        background: "rgba(0, 0, 0, 0.7)",
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <PlayCircleOutline
                        sx={{ color: "white", fontSize: 16 }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: "white", fontWeight: 600 }}
                      >
                        {course.completed_videos}/{course.total_videos} فيديو
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: isDarkMode ? "#f9fafb" : "#1f2937",
                        mb: 2,
                      }}
                    >
                      {course.title}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <PersonIcon
                        sx={{
                          color: "primary.main",
                          fontSize: 18,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "primary.main",
                        }}
                      >
                        {course.instractor_name}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 1,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          نسبة الإنجاز
                        </Typography>
                        <Chip
                          label={`${completionPercentage}%`}
                          size="small"
                          sx={{
                            background:
                              completionPercentage === 100
                                ? `linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)`
                                : `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
                            color: "white",
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={completionPercentage}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: isDarkMode
                            ? "rgba(255, 255, 255, 0.1)"
                            : "rgba(0, 0, 0, 0.1)",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 4,
                            background:
                              completionPercentage === 100
                                ? `linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)`
                                : `linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)`,
                          },
                        }}
                      />
                    </Box>

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
                      متابعة الكورس
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid2>
          );
        })}
      </Grid2>
    </Box>
  );
}
