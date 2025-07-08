"use client";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid2,
  LinearProgress,
  Button,
  Chip,
  Avatar,
} from "@mui/material";
import {
  School,
  PlayCircleOutline,
  Person,
  ArrowForward,
} from "@mui/icons-material";
import Link from "next/link";
import axiosInstance from "@/lib/axiosClient";
import Image from "next/image";

interface MyCoursesProps {
  courses: any[];
}

export function MyCourses({ courses }: MyCoursesProps) {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Box
          sx={{
            width: 45,
            height: 45,
            borderRadius: 3,
            background: "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 2,
            boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
          }}
        >
          <School sx={{ color: "white", fontSize: 28 }} />
        </Box>
        <Box sx={{ m: 2 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "primary.main" }}
          >
            كورساتي ({courses.length})
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            تابع تقدمك في الكورسات المسجل بها
          </Typography>
        </Box>
      </Box>

      {courses.length === 0 ? (
        <Card>
          <CardContent sx={{ p: 6, textAlign: "center" }}>
            <School sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              لم تسجل في أي كورس بعد
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 3, borderRadius: 3 }}
              component={Link}
              href="/courses"
            >
              تصفح الكورسات
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid2 container spacing={4} justifyContent={"center"}>
          {courses.map((course) => (
            <Grid2 size={{ xss: 11, md: 4 }} key={course.id}>
              <Card
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  {/* Course Image */}
                  <Box
                    sx={{
                      position: "relative",
                      height: 250,
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

                  {/* Course Content */}
                  <Box sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        lineHeight: 1.4,
                      }}
                    >
                      {course.title}
                    </Typography>

                    {/* Instructor */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <Avatar sx={{ width: 24, height: 24 }}>
                        <Person sx={{ fontSize: 16 }} />
                      </Avatar>
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

                    {/* Progress */}
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
                          label={`${course.completion_percentage}%`}
                          size="small"
                          sx={{
                            background:
                              course.completion_percentage === 100
                                ? "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)"
                                : "linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)",
                            color: "white",
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={course.completion_percentage}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 4,
                            background:
                              course.completion_percentage === 100
                                ? "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)"
                                : "linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)",
                          },
                        }}
                      />
                    </Box>

                    {/* Course Info */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        تاريخ التسجيل:{" "}
                        {new Date(course.enrolled_date).toLocaleDateString(
                          "ar-EG"
                        )}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        آخر مشاهدة:{" "}
                        {new Date(course.last_watched).toLocaleDateString(
                          "ar-EG"
                        )}
                      </Typography>
                    </Box>

                    {/* Continue Button */}
                    <Button
                      variant="contained"
                      fullWidth
                      endIcon={<ArrowForward sx={{ mr: 1 }} />}
                      component={Link}
                      href={`/courses/${course.id}/content`}
                      sx={{
                        borderRadius: 3,
                        py: 1.5,
                        background:
                          "linear-gradient(135deg, #1784ad 0%, #4fa8c5 100%)",
                        boxShadow: "0 4px 15px rgba(23, 132, 173, 0.3)",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 6px 20px rgba(23, 132, 173, 0.4)",
                        },
                      }}
                    >
                      {course.completion_percentage === 100
                        ? "مراجعة الكورس"
                        : "متابعة التعلم"}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      )}
    </Box>
  );
}
